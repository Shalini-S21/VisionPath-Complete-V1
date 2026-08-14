package com.visionpath.ai.service;

import com.visionpath.ai.dto.AiRequestDto;
import com.visionpath.ai.dto.AiResponseDto;
import com.visionpath.ai.dto.ChatMessageDto;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final LLMAIProvider llmAiProvider;

    public AiService(LLMAIProvider llmAiProvider) {
        this.llmAiProvider = llmAiProvider;
    }

    public AiResponseDto generateQuestions(AiRequestDto request) {
        return llmAiProvider.generateQuestions(request);
    }

    public AiResponseDto analyzeAssessment(AiRequestDto request) {
        return llmAiProvider.analyzeAssessment(request);
    }

    public AiResponseDto recommendCareers(AiRequestDto request) {
        return llmAiProvider.recommendCareers(request);
    }

    public AiResponseDto analyzeSkillGap(AiRequestDto request) {
        return llmAiProvider.analyzeSkillGap(request);
    }

    public AiResponseDto generateStudyPlan(AiRequestDto request) {
        return llmAiProvider.generateStudyPlan(request);
    }

    public AiResponseDto mentorChat(ChatMessageDto chatMessage) {
        return llmAiProvider.chat(chatMessage.getMessage());
    }

    public AiResponseDto analyzeResume(AiRequestDto request) {
        String text = request.getPrompt() != null ? request.getPrompt() : "Sample Resume Text";
        String role = request.getTargetRole() != null ? request.getTargetRole() : "Full Stack Engineer";
        return llmAiProvider.analyzeResume(text, role);
    }

    public AiResponseDto counselorSummary(Long studentId) {
        return llmAiProvider.counselorSummary(studentId);
    }
}
