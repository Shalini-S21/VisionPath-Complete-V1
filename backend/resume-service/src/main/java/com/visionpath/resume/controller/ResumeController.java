package com.visionpath.resume.controller;

import com.visionpath.resume.dto.*;
import com.visionpath.resume.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<ResumeDto>> uploadResume(
            @RequestParam("studentId") Long studentId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "targetRole", required = false) String targetRole) {
        ResumeDto dto = resumeService.uploadResume(studentId, file, targetRole);
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded successfully", dto));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<ResumeDto>>> getByStudentId(@PathVariable Long studentId) {
        List<ResumeDto> resumes = resumeService.getByStudentId(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student resumes retrieved successfully", resumes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeDto>> getById(@PathVariable Long id) {
        ResumeDto dto = resumeService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Resume retrieved successfully", dto));
    }

    @PostMapping("/{id}/analyze")
    public ResponseEntity<ApiResponse<ResumeAnalysisDto>> analyzeResume(@PathVariable Long id) {
        ResumeAnalysisDto analysis = resumeService.analyzeResume(id);
        return ResponseEntity.ok(ApiResponse.success("Resume analysis complete", analysis));
    }

    @GetMapping("/{id}/analysis")
    public ResponseEntity<ApiResponse<ResumeAnalysisDto>> getAnalysis(@PathVariable Long id) {
        ResumeAnalysisDto analysis = resumeService.analyzeResume(id);
        return ResponseEntity.ok(ApiResponse.success("Resume analysis retrieved", analysis));
    }
}
