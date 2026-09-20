package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;

@Component
public class MentorPromptBuilder {

    public String buildPrompt(String userMessage, String studentContext) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI Mentor, an expert educational and career guidance advisor.\n");
        prompt.append("Your mission is to provide clear, encouraging, accurate, and structured guidance to students.\n\n");

        if (studentContext != null && !studentContext.isBlank()) {
            prompt.append("STUDENT CONTEXT:\n").append(studentContext).append("\n\n");
        }

        prompt.append("STUDENT QUESTION:\n").append(userMessage).append("\n\n");
        prompt.append("INSTRUCTIONS:\n");
        prompt.append("1. Answer the question thoroughly and educationally.\n");
        prompt.append("2. Break down complex concepts into step-by-step points with practical examples.\n");
        prompt.append("3. Keep explanations structured, motivating, and actionable for career success.\n");
        prompt.append("4. Output clear formatted text.\n");

        return prompt.toString();
    }
}
