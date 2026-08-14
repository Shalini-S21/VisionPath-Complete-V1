package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class SkillGapPromptBuilder {

    public String buildPrompt(String targetCareer, List<String> currentSkills, String assessmentPerformance, String userDetails) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Skill & Career Gap Analyzer.\n");
        prompt.append("Perform a comprehensive Skill Gap Analysis combining User-Entered Skills and Verified Assessment Scores.\n\n");
        prompt.append("TARGET CAREER / GOAL: ").append(targetCareer != null ? targetCareer : "Full Stack Software Systems / AI Engineering").append("\n");
        prompt.append("USER ENTERED SKILLS: ").append(currentSkills != null && !currentSkills.isEmpty() ? String.join(", ", currentSkills) : "None registered manually").append("\n");
        prompt.append("VERIFIED ASSESSMENT PERFORMANCE & SCORES: ").append(assessmentPerformance != null ? assessmentPerformance : "Assessments Completed with strong aptitude").append("\n");
        prompt.append("STUDENT LEVEL: ").append(userDetails != null ? userDetails : "College/Higher Ed").append("\n\n");

        prompt.append("REQUIRED ANALYSIS SECTIONS:\n");
        prompt.append("1. **Analyzed Skill Profile**: Evaluate proficiency based on user-entered skills and assessment marks.\n");
        prompt.append("2. **Identified Skill Gaps**: Specific missing technical & soft skills needed to reach peak target performance.\n");
        prompt.append("3. **Recommended Career & Course Order**: Priority list of career tracks & specialization courses.\n");
        prompt.append("4. **Skill-to-Career/Course Mapping**: Clearly state why each missing skill is required for specific courses or careers.\n\n");

        prompt.append("FORMAT INSTRUCTION: Provide a structured, clear, and inspiring report with bullet points, ordered priority lists, and clear skill-to-career mappings. Do NOT return raw unformatted text.");

        return prompt.toString();
    }
}
