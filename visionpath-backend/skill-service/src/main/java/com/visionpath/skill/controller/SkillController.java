package com.visionpath.skill.controller;

import com.visionpath.skill.dto.*;
import com.visionpath.skill.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillDto>>> getAllSkills() {
        List<SkillDto> skills = skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.success("Skills retrieved successfully", skills));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<StudentSkillDto>>> getStudentSkills(@PathVariable Long studentId) {
        List<StudentSkillDto> skills = skillService.getStudentSkills(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student skills retrieved successfully", skills));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<StudentSkillDto>> addStudentSkill(
            @PathVariable Long studentId,
            @Valid @RequestBody AddStudentSkillRequest request) {
        StudentSkillDto dto = skillService.addStudentSkill(studentId, request);
        return ResponseEntity.ok(ApiResponse.success("Student skill updated successfully", dto));
    }

    @PutMapping("/student/{studentId}/{skillId}")
    public ResponseEntity<ApiResponse<StudentSkillDto>> updateStudentSkill(
            @PathVariable Long studentId,
            @PathVariable Long skillId,
            @Valid @RequestBody AddStudentSkillRequest request) {
        request.setSkillId(skillId);
        StudentSkillDto dto = skillService.addStudentSkill(studentId, request);
        return ResponseEntity.ok(ApiResponse.success("Student skill updated successfully", dto));
    }

    @DeleteMapping("/student/{studentId}/{skillId}")
    public ResponseEntity<ApiResponse<Void>> removeStudentSkill(
            @PathVariable Long studentId,
            @PathVariable Long skillId) {
        skillService.removeStudentSkill(studentId, skillId);
        return ResponseEntity.ok(ApiResponse.success("Student skill removed successfully", null));
    }

    @GetMapping("/student/{studentId}/gaps")
    public ResponseEntity<ApiResponse<List<StudentSkillDto>>> getSkillGaps(@PathVariable Long studentId) {
        List<StudentSkillDto> skills = skillService.getStudentSkills(studentId);
        return ResponseEntity.ok(ApiResponse.success("Skill gap analysis retrieved successfully", skills));
    }
}
