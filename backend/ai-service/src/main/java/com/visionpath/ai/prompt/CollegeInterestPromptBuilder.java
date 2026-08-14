package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class CollegeInterestPromptBuilder {

    public String buildPrompt(String degree, String branch, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI College Career Interest & Specialization Assessment Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" career and course interest exploration questions for a College Student (").append(degree != null ? degree : "Engineering").append(" - ").append(branch != null ? branch : "Computer Science").append(").\n\n");
        prompt.append("INTEREST DOMAINS TO MAP: Full Stack Software Systems, AI/ML & Data Engineering, Cloud Infrastructure & DevOps, Cybersecurity, Tech Product Management & Consulting.\n\n");
        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("1. Do NOT test academic/technical knowledge with right/wrong answers.\n");
        prompt.append("2. Focus on preferred work roles, technical specializations, industry sectors, and post-graduation goals.\n");
        prompt.append("3. Each option must map to a career interest dimension.\n");
        prompt.append("4. Return ONLY valid JSON matching this exact structure without markdown formatting:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"COLLEGE_INTEREST\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"question\": \"Which technical career specialization matches your long-term professional ambitions?\",\n");
        prompt.append("      \"options\": [\n");
        prompt.append("        \"Architecting scalable Full-Stack web applications & cloud APIs\",\n");
        prompt.append("        \"Training Machine Learning models & Generative AI algorithms\",\n");
        prompt.append("        \"Securing network infrastructure & ethical hacking\",\n");
        prompt.append("        \"Leading tech product roadmaps & business strategy\"\n");
        prompt.append("      ],\n");
        prompt.append("      \"interestMapping\": {\n");
        prompt.append("        \"A\": \"Software Engineering\",\n");
        prompt.append("        \"B\": \"Artificial Intelligence\",\n");
        prompt.append("        \"C\": \"Cybersecurity\",\n");
        prompt.append("        \"D\": \"Product Management\"\n");
        prompt.append("      }\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
