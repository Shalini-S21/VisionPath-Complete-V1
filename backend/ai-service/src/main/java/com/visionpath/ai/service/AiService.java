package com.visionpath.ai.service;

import com.visionpath.ai.dto.AiRequestDto;
import com.visionpath.ai.dto.AiResponseDto;
import com.visionpath.ai.dto.ChatMessageDto;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final AIProvider aiProvider;

    public AiService(AIProvider aiProvider) {
        this.aiProvider = aiProvider;
    }

    public AiResponseDto generateQuestions(AiRequestDto request) {
        return aiProvider.generateQuestions(request);
    }

    public AiResponseDto analyzeAssessment(AiRequestDto request) {
        return aiProvider.analyzeAssessment(request);
    }

    public AiResponseDto recommendCareers(AiRequestDto request) {
        return aiProvider.recommendCareers(request);
    }

    public AiResponseDto analyzeSkillGap(AiRequestDto request) {
        return aiProvider.analyzeSkillGap(request);
    }

    public AiResponseDto generateStudyPlan(AiRequestDto request) {
        return aiProvider.generateStudyPlan(request);
    }

    public AiResponseDto mentorChat(ChatMessageDto chatMessage) {
        return aiProvider.chat(chatMessage.getMessage());
    }

    public AiResponseDto counselorSummary(Long studentId) {
        AiRequestDto req = AiRequestDto.builder()
                .studentId(studentId)
                .category("Counseling Overview")
                .build();
        return aiProvider.analyzeAssessment(req);
    }
}
