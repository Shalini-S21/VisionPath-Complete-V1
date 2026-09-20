package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class CounselorSummaryPromptBuilder {

    public String buildPrompt(Long studentId, String studentDetails) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath Counselor AI Assistant.\n");
        prompt.append("Generate a executive summary and actionable recommendations for a academic counselor reviewing student ID #").append(studentId).append(".\n\n");
        if (studentDetails != null && !studentDetails.isBlank()) {
            prompt.append("STUDENT DOSSIER DETAILS:\n").append(studentDetails).append("\n");
        }

        prompt.append("\nCRITICAL INSTRUCTION: You MUST return ONLY valid JSON matching this exact structure without markdown formatting or code blocks:\n");
        prompt.append("{\n");
        prompt.append("  \"studentOverview\": \"Comprehensive summary of student status\",\n");
        prompt.append("  \"strengths\": [\"Strength A\", \"Strength B\"],\n");
        prompt.append("  \"weaknesses\": [\"Weakness A\"],\n");
        prompt.append("  \"interests\": [\"Interest A\"],\n");
        prompt.append("  \"careerDirection\": [\"Recommended Direction 1\"],\n");
        prompt.append("  \"recommendedFocusAreas\": [\"Focus Area 1\"],\n");
        prompt.append("  \"studyProgressSummary\": \"Progress summary text\",\n");
        prompt.append("  \"counselorSuggestions\": [\"Counselor Action 1\", \"Counselor Action 2\"]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
