package com.visionpath.skill.dto;

import jakarta.validation.constraints.NotNull;

public class AddStudentSkillRequest {

    @NotNull(message = "Skill ID is required")
    private Long skillId;

    private String proficiencyLevel = "BEGINNER";
    private String source = "MANUAL";

    public AddStudentSkillRequest() {
    }

    public AddStudentSkillRequest(Long skillId, String proficiencyLevel, String source) {
        this.skillId = skillId;
        this.proficiencyLevel = proficiencyLevel;
        this.source = source;
    }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
