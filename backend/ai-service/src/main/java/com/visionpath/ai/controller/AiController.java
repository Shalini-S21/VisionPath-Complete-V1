package com.visionpath.ai.controller;

import com.visionpath.ai.dto.*;
import com.visionpath.ai.service.AiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate-questions")
    public ResponseEntity<ApiResponse<AiResponseDto>> generateQuestions(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.generateQuestions(request);
        return ResponseEntity.ok(ApiResponse.success("AI questions generated successfully", res));
    }

    @PostMapping("/analyze-assessment")
    public ResponseEntity<ApiResponse<AiResponseDto>> analyzeAssessment(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.analyzeAssessment(request);
        return ResponseEntity.ok(ApiResponse.success("Assessment analyzed successfully", res));
    }

    @PostMapping("/recommend-careers")
    public ResponseEntity<ApiResponse<AiResponseDto>> recommendCareers(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.recommendCareers(request);
        return ResponseEntity.ok(ApiResponse.success("Career recommendations generated", res));
    }

    @PostMapping("/analyze-skill-gap")
    public ResponseEntity<ApiResponse<AiResponseDto>> analyzeSkillGap(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.analyzeSkillGap(request);
        return ResponseEntity.ok(ApiResponse.success("Skill gap analysis complete", res));
    }

    @PostMapping("/generate-study-plan")
    public ResponseEntity<ApiResponse<AiResponseDto>> generateStudyPlan(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.generateStudyPlan(request);
        return ResponseEntity.ok(ApiResponse.success("Study plan generated", res));
    }

    @PostMapping("/mentor/chat")
    public ResponseEntity<ApiResponse<AiResponseDto>> mentorChat(@Valid @RequestBody ChatMessageDto chatMessage) {
        AiResponseDto res = aiService.mentorChat(chatMessage);
        return ResponseEntity.ok(ApiResponse.success("AI Mentor response generated", res));
    }

    @PostMapping("/counselor/student-summary")
    public ResponseEntity<ApiResponse<AiResponseDto>> counselorStudentSummary(@RequestParam Long studentId) {
        AiResponseDto res = aiService.counselorSummary(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student summary generated", res));
    }
}
