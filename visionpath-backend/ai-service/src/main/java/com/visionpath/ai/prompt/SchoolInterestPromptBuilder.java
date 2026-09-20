package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class SchoolInterestPromptBuilder {

    public String buildPrompt(String standard, String targetGroup, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI School Interest Assessment Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" career/stream interest exploration questions for a School Student (").append(standard != null ? standard : "High School").append(").\n\n");
        prompt.append("INTEREST DOMAINS TO EXPLORE: STEM & Engineering, Medical & Life Sciences, Business & Entrepreneurship, Arts & Humanities, Computer & AI Technology.\n\n");
        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("1. Do NOT test academic knowledge or right/wrong answers.\n");
        prompt.append("2. Questions must focus on preferred activities, curiosity, future stream choices, and problem-solving interests.\n");
        prompt.append("3. Each option must map to an interest dimension (e.g. Technology, Science, Business, Arts).\n");
        prompt.append("4. Return ONLY valid JSON matching this exact structure without markdown:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"SCHOOL_INTEREST\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"question\": \"Which real-world challenge would you be most excited to spend time working on?\",\n");
        prompt.append("      \"options\": [\n");
        prompt.append("        \"Building intelligent software algorithms & mobile apps\",\n");
        prompt.append("        \"Discovering medical treatments & biological research\",\n");
        prompt.append("        \"Managing business ventures & financial growth\",\n");
        prompt.append("        \"Designing creative media, literature, & public policy\"\n");
        prompt.append("      ],\n");
        prompt.append("      \"interestMapping\": {\n");
        prompt.append("        \"A\": \"Technology\",\n");
        prompt.append("        \"B\": \"Science & Healthcare\",\n");
        prompt.append("        \"C\": \"Business & Finance\",\n");
        prompt.append("        \"D\": \"Arts & Humanities\"\n");
        prompt.append("      }\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
