package com.visionpath.ai.dto;

public class AiRequestDto {
    private Long studentId;
    private String prompt;
    private String category;
    private String academicLevel;
    private String targetRole;

    public AiRequestDto() {
    }

    public AiRequestDto(Long studentId, String prompt, String category, String academicLevel, String targetRole) {
        this.studentId = studentId;
        this.prompt = prompt;
        this.category = category;
        this.academicLevel = academicLevel;
        this.targetRole = targetRole;
    }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAcademicLevel() { return academicLevel; }
    public void setAcademicLevel(String academicLevel) { this.academicLevel = academicLevel; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public static AiRequestDtoBuilder builder() {
        return new AiRequestDtoBuilder();
    }

    public static class AiRequestDtoBuilder {
        private Long studentId;
        private String prompt;
        private String category;
        private String academicLevel;
        private String targetRole;

        public AiRequestDtoBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public AiRequestDtoBuilder prompt(String prompt) { this.prompt = prompt; return this; }
        public AiRequestDtoBuilder category(String category) { this.category = category; return this; }
        public AiRequestDtoBuilder academicLevel(String academicLevel) { this.academicLevel = academicLevel; return this; }
        public AiRequestDtoBuilder targetRole(String targetRole) { this.targetRole = targetRole; return this; }

        public AiRequestDto build() {
            return new AiRequestDto(studentId, prompt, category, academicLevel, targetRole);
        }
    }
}
