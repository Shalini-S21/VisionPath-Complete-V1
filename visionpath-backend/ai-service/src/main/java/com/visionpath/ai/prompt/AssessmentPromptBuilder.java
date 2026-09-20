package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class AssessmentPromptBuilder {

    public String buildPrompt(String category, String academicLevel, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Question Generator.\n");
        prompt.append("Generate ").append(count).append(" high-quality multiple choice assessment questions for academic/career evaluation.\n\n");
        prompt.append("CATEGORY: ").append(category != null ? category : "General Knowledge & Aptitude").append("\n");
        prompt.append("ACADEMIC LEVEL: ").append(academicLevel != null ? academicLevel : "College Undergraduate").append("\n\n");
        prompt.append("LEVEL GUIDELINES:\n");
        prompt.append("- IF SCHOOL STUDENT (High School / Grade 9-12 / Secondary): Generate foundational questions covering school subjects (Math, Science, Logic), personal interest analysis, or basic psychometric personality traits.\n");
        prompt.append("- IF COLLEGE STUDENT (Undergraduate / Graduate / B.Tech / B.E.): Generate advanced domain-specific technical questions (Data Structures, Microservices, Systems), quantitative/verbal aptitude, or career psychometric readiness.\n\n");
        prompt.append("CRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"category\": \"").append(category).append("\",\n");
        prompt.append("  \"academicLevel\": \"").append(academicLevel).append("\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"text\": \"Question text here?\",\n");
        prompt.append("      \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],\n");
        prompt.append("      \"correctAnswer\": \"Option A\",\n");
        prompt.append("      \"explanation\": \"Brief explanation of correct choice.\",\n");
        prompt.append("      \"difficulty\": \"EASY|MEDIUM|HARD\"\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
