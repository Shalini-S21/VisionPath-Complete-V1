package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class AssessmentAnalysisPromptBuilder {

    public String buildPrompt(String category, Double score, String details) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Assessment Evaluator.\n");
        prompt.append("Analyze student assessment performance data.\n\n");
        prompt.append("ASSESSMENT CATEGORY: ").append(category != null ? category : "General Evaluation").append("\n");
        if (score != null) {
            prompt.append("SCORE CALCULATED BY BACKEND: ").append(score).append("%\n");
        }
        if (details != null && !details.isBlank()) {
            prompt.append("ASSESSMENT DETAILS / SUBMISSIONS:\n").append(details).append("\n");
        }
        prompt.append("\nCRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"summary\": \"Detailed overview of performance\",\n");
        prompt.append("  \"strengths\": [\"Strength 1\", \"Strength 2\"],\n");
        prompt.append("  \"weaknesses\": [\"Weakness 1\", \"Weakness 2\"],\n");
        prompt.append("  \"areasToImprove\": [\"Area 1\", \"Area 2\"],\n");
        prompt.append("  \"recommendations\": [\"Recommendation 1\", \"Recommendation 2\"]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
