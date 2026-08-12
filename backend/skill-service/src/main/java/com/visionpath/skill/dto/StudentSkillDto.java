package com.visionpath.skill.dto;

public class StudentSkillDto {
    private Long id;
    private Long studentId;
    private Long skillId;
    private String skillName;
    private String category;
    private String proficiencyLevel;
    private String source;

    public StudentSkillDto() {
    }

    public StudentSkillDto(Long id, Long studentId, Long skillId, String skillName, String category, String proficiencyLevel, String source) {
        this.id = id;
        this.studentId = studentId;
        this.skillId = skillId;
        this.skillName = skillName;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.source = source;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public static StudentSkillDtoBuilder builder() {
        return new StudentSkillDtoBuilder();
    }

    public static class StudentSkillDtoBuilder {
        private Long id;
        private Long studentId;
        private Long skillId;
        private String skillName;
        private String category;
        private String proficiencyLevel;
        private String source;

        public StudentSkillDtoBuilder id(Long id) { this.id = id; return this; }
        public StudentSkillDtoBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public StudentSkillDtoBuilder skillId(Long skillId) { this.skillId = skillId; return this; }
        public StudentSkillDtoBuilder skillName(String skillName) { this.skillName = skillName; return this; }
        public StudentSkillDtoBuilder category(String category) { this.category = category; return this; }
        public StudentSkillDtoBuilder proficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public StudentSkillDtoBuilder source(String source) { this.source = source; return this; }

        public StudentSkillDto build() {
            return new StudentSkillDto(id, studentId, skillId, skillName, category, proficiencyLevel, source);
        }
    }
}
