package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class ResumePromptBuilder {

    public String buildPrompt(String resumeText, String targetRole) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Resume Auditor.\n");
        prompt.append("Perform a comprehensive ATS audit and skill extraction on the provided resume content.\n\n");
        if (targetRole != null && !targetRole.isBlank()) {
            prompt.append("TARGET CAREER ROLE: ").append(targetRole).append("\n");
        }
        prompt.append("RESUME CONTENT:\n").append(resumeText != null ? resumeText : "Sample Resume").append("\n");

        prompt.append("\nCRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"score\": 85,\n");
        prompt.append("  \"skills\": [\"Extracted Skill 1\", \"Extracted Skill 2\"],\n");
        prompt.append("  \"strengths\": [\"Strength 1\", \"Strength 2\"],\n");
        prompt.append("  \"weaknesses\": [\"Weakness 1\", \"Weakness 2\"],\n");
        prompt.append("  \"missingSections\": [\"Missing Section 1\"],\n");
        prompt.append("  \"suggestions\": [\"Actionable Suggestion 1\", \"Actionable Suggestion 2\"]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
