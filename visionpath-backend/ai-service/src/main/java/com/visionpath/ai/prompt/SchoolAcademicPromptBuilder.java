package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class SchoolAcademicPromptBuilder {

    public String buildPrompt(String standard, List<String> subjects, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI School Question Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" high-quality multiple choice academic questions for a School Student.\n\n");
        prompt.append("STUDENT STANDARD: ").append(standard != null ? standard : "Class 10").append("\n");
        prompt.append("STUDENT SUBJECTS: ").append(subjects != null && !subjects.isEmpty() ? String.join(", ", subjects) : "Mathematics, Science, English, Social Science, Computer Science").append("\n\n");
        
        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("1. Generate questions ONLY from the student's actual subjects listed above.\n");
        prompt.append("2. Distribute questions evenly across the subjects.\n");
        prompt.append("3. Match difficulty strictly to ").append(standard != null ? standard : "Class 10").append(" level. DO NOT include college or engineering questions.\n");
        prompt.append("4. Every question MUST have exactly one unambiguous correct answer.\n");
        prompt.append("5. Return ONLY valid JSON matching this exact structure without markdown or code fences:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"SCHOOL_ACADEMIC\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"category\": \"SUBJECT\",\n");
        prompt.append("      \"subject\": \"Mathematics\",\n");
        prompt.append("      \"question\": \"What is 15% of 200?\",\n");
        prompt.append("      \"options\": [\"20\", \"25\", \"30\", \"35\"],\n");
        prompt.append("      \"correctAnswer\": \"30\",\n");
        prompt.append("      \"explanation\": \"15% of 200 is 30.\",\n");
        prompt.append("      \"difficulty\": \"EASY\"\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
