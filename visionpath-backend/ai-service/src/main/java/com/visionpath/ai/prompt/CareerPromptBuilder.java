package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class CareerPromptBuilder {

    public String buildPrompt(String academicLevel, String category, String studentProfile) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Career Strategist.\n");
        prompt.append("Recommend personalized career paths based on student credentials and goals.\n\n");
        if (academicLevel != null) prompt.append("ACADEMIC LEVEL: ").append(academicLevel).append("\n");
        if (category != null) prompt.append("PREFERRED DOMAIN: ").append(category).append("\n");
        if (studentProfile != null && !studentProfile.isBlank()) {
            prompt.append("STUDENT PROFILE & SKILLS:\n").append(studentProfile).append("\n");
        }

        prompt.append("\nCRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"recommendations\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"career\": \"Career Title\",\n");
        prompt.append("      \"matchScore\": 90,\n");
        prompt.append("      \"reason\": \"Why this career is a strong recommendation based on profile.\",\n");
        prompt.append("      \"requiredSkills\": [\"Skill 1\", \"Skill 2\"],\n");
        prompt.append("      \"skillsToImprove\": [\"Skill A\", \"Skill B\"]\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
