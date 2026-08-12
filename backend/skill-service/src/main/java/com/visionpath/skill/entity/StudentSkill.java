package com.visionpath.skill.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_skills")
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private Long skillId;

    @Column(nullable = false)
    private String proficiencyLevel; // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT

    @Column(nullable = false)
    private String source; // ASSESSMENT, RESUME, STUDY_PLAN, MANUAL, AI_ANALYSIS

    private LocalDateTime updatedAt;

    public StudentSkill() {
    }

    public StudentSkill(Long id, Long studentId, Long skillId, String proficiencyLevel, String source, LocalDateTime updatedAt) {
        this.id = id;
        this.studentId = studentId;
        this.skillId = skillId;
        this.proficiencyLevel = proficiencyLevel;
        this.source = source;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static StudentSkillBuilder builder() {
        return new StudentSkillBuilder();
    }

    public static class StudentSkillBuilder {
        private Long id;
        private Long studentId;
        private Long skillId;
        private String proficiencyLevel;
        private String source;
        private LocalDateTime updatedAt;

        public StudentSkillBuilder id(Long id) { this.id = id; return this; }
        public StudentSkillBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public StudentSkillBuilder skillId(Long skillId) { this.skillId = skillId; return this; }
        public StudentSkillBuilder proficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public StudentSkillBuilder source(String source) { this.source = source; return this; }
        public StudentSkillBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public StudentSkill build() {
            return new StudentSkill(id, studentId, skillId, proficiencyLevel, source, updatedAt);
        }
    }
}
