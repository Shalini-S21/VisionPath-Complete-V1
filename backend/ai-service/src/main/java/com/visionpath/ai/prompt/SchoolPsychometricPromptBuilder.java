package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class SchoolPsychometricPromptBuilder {

    public String buildPrompt(String standard, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI School Psychometric Assessment Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" scenario-based psychometric questions for a School Student (").append(standard != null ? standard : "High School").append(").\n\n");
        prompt.append("DIMENSIONS TO COVER: Learning Attitude, Persistence, Adaptability, Teamwork, Communication, Problem Solving, Confidence, Decision Making, Motivation.\n\n");
        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("1. Questions must be age-appropriate school/learning scenarios. NO corporate, workplace, or adult scenarios.\n");
        prompt.append("2. Each question must have 4 options (A, B, C, D) mapping to scoring points (1-4) for the specific dimension.\n");
        prompt.append("3. Return ONLY valid JSON matching this exact structure without markdown formatting:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"SCHOOL_PSYCHOMETRIC\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"dimension\": \"Persistence\",\n");
        prompt.append("      \"question\": \"You are given a difficult school assignment that you cannot solve immediately. What would you most likely do?\",\n");
        prompt.append("      \"options\": [\n");
        prompt.append("        \"Give up immediately and turn in blank work\",\n");
        prompt.append("        \"Try different methods and ask for guidance if needed\",\n");
        prompt.append("        \"Wait for someone else to complete it for you\",\n");
        prompt.append("        \"Skip the assignment and avoid the subject\"\n");
        prompt.append("      ],\n");
        prompt.append("      \"scoringMetadata\": {\"A\": 1, \"B\": 4, \"C\": 2, \"D\": 1}\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
