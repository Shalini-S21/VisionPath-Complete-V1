package com.visionpath.ai.service;

import com.visionpath.ai.dto.AiRequestDto;
import com.visionpath.ai.dto.AiResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LLMAIProvider implements AIProvider {

    @Value("${ai.api.key:default_key}")
    private String apiKey;

    @Override
    public AiResponseDto generateQuestions(AiRequestDto request) {
        return AiResponseDto.builder()
                .resultText("Generated 5 adaptive questions for " + request.getAcademicLevel() + " in " + request.getCategory())
                .suggestions(List.of("Question 1: System Design", "Question 2: Algorithms", "Question 3: Spring Boot", "Question 4: MySQL Architecture", "Question 5: Cloud Deployment"))
                .confidenceScore(0.95)
                .build();
    }

    @Override
    public AiResponseDto analyzeAssessment(AiRequestDto request) {
        return AiResponseDto.builder()
                .resultText("Assessment Analysis Complete: Strong analytical skills, potential growth area in Cloud Architecture.")
                .suggestions(List.of("Review Distributed Systems", "Practice Spring Cloud Patterns", "Build AWS Hands-On Labs"))
                .confidenceScore(0.92)
                .build();
    }

    @Override
    public AiResponseDto recommendCareers(AiRequestDto request) {
        return AiResponseDto.builder()
                .resultText("Top Recommended Career: Full Stack AI Engineer & Cloud Solutions Architect.")
                .suggestions(List.of("Full Stack AI Engineer (94% Match)", "Cloud Architect (88% Match)", "Data Engineer (82% Match)"))
                .confidenceScore(0.94)
                .build();
    }

    @Override
    public AiResponseDto analyzeSkillGap(AiRequestDto request) {
        return AiResponseDto.builder()
                .resultText("Skill Gap Identified: Advanced Kubernetes Deployment and Zero-Trust Security.")
                .suggestions(List.of("Complete Certified Kubernetes Administrator (CKA) track", "Study OWASP Top 10 Security Guidelines"))
                .confidenceScore(0.90)
                .build();
    }

    @Override
    public AiResponseDto generateStudyPlan(AiRequestDto request) {
        return AiResponseDto.builder()
                .resultText("Personalized 4-Week Action Plan Generated.")
                .suggestions(List.of("Week 1: Advanced JPA & Hibernate", "Week 2: Spring Cloud Gateway & Security", "Week 3: Microservices Communication", "Week 4: Docker & MySQL Optimization"))
                .confidenceScore(0.96)
                .build();
    }

    @Override
    public AiResponseDto chat(String userPrompt) {
        return AiResponseDto.builder()
                .resultText("VisionPath AI Mentor Response to: '" + userPrompt + "'. Focus on mastering Spring Boot 3.5.5 microservices, clean JPA entities, and REST API standards.")
                .suggestions(List.of("Explore Java 21 Virtual Threads", "Practice REST API Integration", "Check Career Recommendations"))
                .confidenceScore(0.98)
                .build();
    }
}
