package com.visionpath.skill.service;

import com.visionpath.skill.dto.*;
import com.visionpath.skill.entity.Skill;
import com.visionpath.skill.entity.StudentSkill;
import com.visionpath.skill.exception.ResourceNotFoundException;
import com.visionpath.skill.repository.SkillRepository;
import com.visionpath.skill.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;

    public SkillService(SkillRepository skillRepository, StudentSkillRepository studentSkillRepository) {
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(s -> SkillDto.builder()
                        .id(s.getId())
                        .name(s.getName())
                        .category(s.getCategory())
                        .description(s.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<StudentSkillDto> getStudentSkills(Long studentId) {
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);
        return studentSkills.stream().map(ss -> {
            Skill skill = skillRepository.findById(ss.getSkillId()).orElse(null);
            return StudentSkillDto.builder()
                    .id(ss.getId())
                    .studentId(ss.getStudentId())
                    .skillId(ss.getSkillId())
                    .skillName(skill != null ? skill.getName() : "Skill #" + ss.getSkillId())
                    .category(skill != null ? skill.getCategory() : "General")
                    .proficiencyLevel(ss.getProficiencyLevel())
                    .source(ss.getSource())
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public StudentSkillDto addStudentSkill(Long studentId, AddStudentSkillRequest request) {
        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found for ID: " + request.getSkillId()));

        StudentSkill studentSkill = studentSkillRepository.findByStudentIdAndSkillId(studentId, request.getSkillId())
                .orElseGet(() -> StudentSkill.builder()
                        .studentId(studentId)
                        .skillId(request.getSkillId())
                        .build());

        studentSkill.setProficiencyLevel(request.getProficiencyLevel());
        studentSkill.setSource(request.getSource());

        StudentSkill saved = studentSkillRepository.save(studentSkill);

        return StudentSkillDto.builder()
                .id(saved.getId())
                .studentId(saved.getStudentId())
                .skillId(saved.getSkillId())
                .skillName(skill.getName())
                .category(skill.getCategory())
                .proficiencyLevel(saved.getProficiencyLevel())
                .source(saved.getSource())
                .build();
    }

    @Transactional
    public void removeStudentSkill(Long studentId, Long skillId) {
        studentSkillRepository.deleteByStudentIdAndSkillId(studentId, skillId);
    }
}
