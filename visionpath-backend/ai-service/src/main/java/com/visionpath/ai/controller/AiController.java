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

    // 1. AI Mentor Chat
    @PostMapping("/mentor/chat")
    public ResponseEntity<ApiResponse<AiResponseDto>> mentorChat(@Valid @RequestBody ChatMessageDto chatMessage) {
        AiResponseDto res = aiService.mentorChat(chatMessage);
        return ResponseEntity.ok(ApiResponse.success("AI Mentor response generated", res));
    }

    // 2. AI Question Generation
    @PostMapping("/generate-questions")
    public ResponseEntity<ApiResponse<AiResponseDto>> generateQuestions(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.generateQuestions(request);
        return ResponseEntity.ok(ApiResponse.success("AI questions generated successfully", res));
    }

    // 3. AI Assessment Analysis
    @PostMapping("/analyze-assessment")
    public ResponseEntity<ApiResponse<AiResponseDto>> analyzeAssessment(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.analyzeAssessment(request);
        return ResponseEntity.ok(ApiResponse.success("Assessment analyzed successfully", res));
    }

    // 4. AI Career Recommendation
    @PostMapping("/recommend-careers")
    public ResponseEntity<ApiResponse<AiResponseDto>> recommendCareers(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.recommendCareers(request);
        return ResponseEntity.ok(ApiResponse.success("Career recommendations generated", res));
    }

    // 5. AI Skill Gap Analysis
    @PostMapping("/analyze-skill-gap")
    public ResponseEntity<ApiResponse<AiResponseDto>> analyzeSkillGap(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.analyzeSkillGap(request);
        return ResponseEntity.ok(ApiResponse.success("Skill gap analysis complete", res));
    }

    // 6. AI Study Plan Generation
    @PostMapping("/generate-study-plan")
    public ResponseEntity<ApiResponse<AiResponseDto>> generateStudyPlan(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.generateStudyPlan(request);
        return ResponseEntity.ok(ApiResponse.success("Study plan generated", res));
    }

    // 7. AI Resume Analysis
    @PostMapping("/analyze-resume")
    public ResponseEntity<ApiResponse<AiResponseDto>> analyzeResume(@RequestBody AiRequestDto request) {
        AiResponseDto res = aiService.analyzeResume(request);
        return ResponseEntity.ok(ApiResponse.success("Resume analysis complete", res));
    }

    // 8. Counselor Student Summary (POST & GET)
    @PostMapping("/counselor/student-summary")
    public ResponseEntity<ApiResponse<AiResponseDto>> counselorStudentSummaryPost(@RequestBody AiRequestDto request) {
        Long studentId = request.getStudentId() != null ? request.getStudentId() : 1L;
        AiResponseDto res = aiService.counselorSummary(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student summary generated", res));
    }

    @GetMapping("/counselor/student-summary/{studentId}")
    public ResponseEntity<ApiResponse<AiResponseDto>> counselorStudentSummaryGet(@PathVariable Long studentId) {
        AiResponseDto res = aiService.counselorSummary(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student summary generated", res));
    }
}
