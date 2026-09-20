package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class StudyPlanPromptBuilder {

    public String buildPrompt(String targetGoal, String academicLevel, Integer durationWeeks) {
        StringBuilder prompt = new StringBuilder();
        int weeks = (durationWeeks != null && durationWeeks > 0) ? durationWeeks : 4;
        prompt.append("You are VisionPath AI Study Planner.\n");
        prompt.append("Generate a structured, week-by-week study roadmap for ").append(weeks).append(" weeks.\n\n");
        prompt.append("TARGET GOAL / EXAM: ").append(targetGoal != null ? targetGoal : "Software Engineering Mastery").append("\n");
        if (academicLevel != null) prompt.append("ACADEMIC LEVEL: ").append(academicLevel).append("\n");

        prompt.append("\nCRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"goal\": \"").append(targetGoal).append("\",\n");
        prompt.append("  \"durationWeeks\": ").append(weeks).append(",\n");
        prompt.append("  \"weeklyPlans\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"week\": 1,\n");
        prompt.append("      \"focus\": \"Main topic focus\",\n");
        prompt.append("      \"tasks\": [\n");
        prompt.append("        {\n");
        prompt.append("          \"title\": \"Task description\",\n");
        prompt.append("          \"estimatedMinutes\": 60,\n");
        prompt.append("          \"priority\": \"HIGH|MEDIUM|LOW\"\n");
        prompt.append("        }\n");
        prompt.append("      ]\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
