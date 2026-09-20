"""
NLP Resume Parser Module for VisionPath.
Extracts text from PDF/bytes/text, segments sections, extracts contact details,
identifies technical/soft skills, and computes an algorithmic ATS alignment score.
"""

import io
import re
from typing import Any, Dict, List, Optional
from nlp.skill_extractor import skill_extractor

EMAIL_REGEX = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_REGEX = re.compile(r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}")
LINKEDIN_REGEX = re.compile(r"linkedin\.com/in/[a-zA-Z0-9_-]+", re.IGNORECASE)
GITHUB_REGEX = re.compile(r"github\.com/[a-zA-Z0-9_-]+", re.IGNORECASE)

SECTION_HEADERS = {
    "education": [
        "education", "academic background", "academics", "qualifications", "educational details"
    ],
    "experience": [
        "experience", "work experience", "professional experience", "employment history", "internships"
    ],
    "projects": [
        "projects", "academic projects", "personal projects", "key projects", "technical projects"
    ],
    "skills": [
        "skills", "technical skills", "core competencies", "technologies", "key skills", "proficiencies"
    ],
    "certifications": [
        "certifications", "certificates", "licenses", "courses & certifications", "achievements"
    ]
}


class ResumeParser:
    """Extracts structured data from resume text or PDF documents."""

    def __init__(self):
        self.skill_extractor = skill_extractor

    def extract_text_from_pdf(self, pdf_bytes: bytes) -> str:
        """Extract plain text from PDF bytes using PyMuPDF (fitz) or fallback."""
        try:
            import fitz  # PyMuPDF
            doc = fitz.open(stream=pdf_bytes, filetype="pdf")
            text_chunks = []
            for page in doc:
                text_chunks.append(page.get_text())
            doc.close()
            return "\n".join(text_chunks)
        except Exception as e:
            try:
                return pdf_bytes.decode("utf-8", errors="ignore")
            except Exception:
                return f"[PDF Extraction Error: {str(e)}]"

    def clean_text(self, text: str) -> str:
        """Clean noise, multiple blank lines, and non-ASCII artifacts."""
        if not text:
            return ""
        cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]", "", text)
        cleaned = re.sub(r"[•●▪◆\t]", " ", cleaned)
        lines = [re.sub(r"\s+", " ", line).strip() for line in cleaned.splitlines()]
        non_empty = [line for line in lines if line]
        return "\n".join(non_empty)

    def extract_contact_info(self, text: str) -> Dict[str, Optional[str]]:
        """Extract candidate email, phone, LinkedIn, and GitHub links."""
        email_match = EMAIL_REGEX.search(text)
        phone_match = PHONE_REGEX.search(text)
        linkedin_match = LINKEDIN_REGEX.search(text)
        github_match = GITHUB_REGEX.search(text)

        lines = [l.strip() for l in text.splitlines() if l.strip()]
        candidate_name = lines[0] if lines and len(lines[0].split()) <= 4 and not "@" in lines[0] else None

        return {
            "name": candidate_name,
            "email": email_match.group(0) if email_match else None,
            "phone": phone_match.group(0) if phone_match else None,
            "linkedin": linkedin_match.group(0) if linkedin_match else None,
            "github": github_match.group(0) if github_match else None,
        }

    def segment_sections(self, text: str) -> Dict[str, str]:
        """Segment resume text into standard sections."""
        lines = text.splitlines()
        current_section = "general"
        sections: Dict[str, List[str]] = {
            "general": [],
            "education": [],
            "experience": [],
            "projects": [],
            "skills": [],
            "certifications": []
        }

        for line in lines:
            lower_line = line.lower().strip()
            stripped_header = re.sub(r"[:\-_]+$", "", lower_line).strip()

            matched_section = None
            for sec_name, aliases in SECTION_HEADERS.items():
                if stripped_header in aliases or any(stripped_header == a for a in aliases):
                    matched_section = sec_name
                    break
            
            if matched_section:
                current_section = matched_section
            else:
                sections[current_section].append(line)

        return {k: "\n".join(v).strip() for k, v in sections.items()}

    def compute_deterministic_ats_score(
        self,
        extracted_skills: List[str],
        sections: Dict[str, str],
        target_role_required_skills: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Calculate explainable, deterministic ATS compliance score."""
        section_score = 0
        section_breakdown = {}

        for sec in ["education", "experience", "projects", "skills"]:
            has_content = len(sections.get(sec, "")) > 20
            score_gain = 7.5 if has_content else 0
            section_score += score_gain
            section_breakdown[sec] = "Present" if has_content else "Missing"

        skill_score = 0
        matched_required = []
        missing_required = []

        if target_role_required_skills:
            norm_extracted = [s.lower().strip() for s in extracted_skills]
            for req in target_role_required_skills:
                if req.lower().strip() in norm_extracted:
                    matched_required.append(req)
                else:
                    missing_required.append(req)

            match_ratio = len(matched_required) / max(1, len(target_role_required_skills))
            skill_score = round(match_ratio * 50, 1)
        else:
            skill_count = len(extracted_skills)
            skill_score = min(50, skill_count * 5)

        contact_score = 20 if (len(extracted_skills) > 0 and len(sections.get("skills", "")) > 0) else 10
        total_score = min(100, int(round(section_score + skill_score + contact_score)))

        return {
            "ats_score": total_score,
            "section_completeness": section_score,
            "skill_alignment_score": skill_score,
            "matched_required_skills": matched_required,
            "missing_required_skills": missing_required,
            "section_status": section_breakdown
        }

    def parse_resume(self, raw_text_or_bytes: Any, target_role_skills: Optional[List[str]] = None) -> Dict[str, Any]:
        """Complete resume analysis pipeline."""
        if isinstance(raw_text_or_bytes, bytes):
            text = self.extract_text_from_pdf(raw_text_or_bytes)
        else:
            text = str(raw_text_or_bytes or "")

        cleaned_text = self.clean_text(text)
        contacts = self.extract_contact_info(cleaned_text)
        sections = self.segment_sections(cleaned_text)
        skills = self.skill_extractor.extract_skills(cleaned_text)
        scoring = self.compute_deterministic_ats_score(skills["all"], sections, target_role_skills)

        return {
            "candidate_name": contacts["name"],
            "contact_info": contacts,
            "sections": sections,
            "extracted_skills": skills,
            "scoring": scoring,
            "raw_text_length": len(cleaned_text)
        }


# Global resume parser instance
resume_parser = ResumeParser()
