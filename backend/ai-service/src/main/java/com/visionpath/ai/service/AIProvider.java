package com.visionpath.ai.service;

import com.visionpath.ai.dto.AiRequestDto;
import com.visionpath.ai.dto.AiResponseDto;

public interface AIProvider {
    AiResponseDto generateQuestions(AiRequestDto request);
    AiResponseDto analyzeAssessment(AiRequestDto request);
    AiResponseDto recommendCareers(AiRequestDto request);
    AiResponseDto analyzeSkillGap(AiRequestDto request);
    AiResponseDto generateStudyPlan(AiRequestDto request);
    AiResponseDto chat(String userPrompt);
}
