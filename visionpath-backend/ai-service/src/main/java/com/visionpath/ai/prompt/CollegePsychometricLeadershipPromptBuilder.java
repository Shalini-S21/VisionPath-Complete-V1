package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class CollegePsychometricLeadershipPromptBuilder {

    public String buildPrompt(String degree, String branch, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI College Psychometric & Leadership Assessment Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" scenario-based psychometric and leadership questions for a College Student (").append(degree != null ? degree : "College").append(").\n\n");
        prompt.append("DIMENSIONS TO COVER:\n");
        prompt.append("- Psychometric: Analytical Thinking, Adaptability, Resilience, Communication, Teamwork, Decision Making, Self Management.\n");
        prompt.append("- Leadership: Initiative, Responsibility, Delegation, Conflict Management, Accountability, Motivating Others, Handling Pressure.\n\n");
        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("1. Questions must be realistic college engineering projects, hackathons, team sprints, or industry internship scenarios.\n");
        prompt.append("2. Each question must have 4 options (A, B, C, D) mapping to scoring points (1-4) for the specific psychometric/leadership dimension.\n");
        prompt.append("3. Return ONLY valid JSON matching this exact structure without markdown formatting:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"COLLEGE_PSYCHOMETRIC_LEADERSHIP\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"dimension\": \"Conflict Management & Leadership\",\n");
        prompt.append("      \"question\": \"When leading a major technical project sprint with tight deadlines and conflicting architectural opinions among team members, how do you resolve the disagreement?\",\n");
        prompt.append("      \"options\": [\n");
        prompt.append("        \"Facilitate an objective technical review, evaluate trade-offs against project goals, and drive team consensus\",\n");
        prompt.append("        \"Impose your preferred solution without consulting the team\",\n");
        prompt.append("        \"Delay the decision and wait for an external advisor to intervene\",\n");
        prompt.append("        \"Step down from the leadership role to avoid conflict\"\n");
        prompt.append("      ],\n");
        prompt.append("      \"scoringMetadata\": {\"A\": 4, \"B\": 2, \"C\": 1, \"D\": 1}\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
