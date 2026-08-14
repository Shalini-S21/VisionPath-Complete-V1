package com.visionpath.ai.dto;

public class AiRequestDto {
    private Long studentId;
    private String prompt;
    private String category;
    private String academicLevel;
    private String targetRole;
    private java.util.List<String> subjects;
    private String branch;
    private String year;

    public AiRequestDto() {
    }

    public AiRequestDto(Long studentId, String prompt, String category, String academicLevel, String targetRole, java.util.List<String> subjects, String branch, String year) {
        this.studentId = studentId;
        this.prompt = prompt;
        this.category = category;
        this.academicLevel = academicLevel;
        this.targetRole = targetRole;
        this.subjects = subjects;
        this.branch = branch;
        this.year = year;
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

    public java.util.List<String> getSubjects() { return subjects; }
    public void setSubjects(java.util.List<String> subjects) { this.subjects = subjects; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public static AiRequestDtoBuilder builder() {
        return new AiRequestDtoBuilder();
    }

    public static class AiRequestDtoBuilder {
        private Long studentId;
        private String prompt;
        private String category;
        private String academicLevel;
        private String targetRole;
        private java.util.List<String> subjects;
        private String branch;
        private String year;

        public AiRequestDtoBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public AiRequestDtoBuilder prompt(String prompt) { this.prompt = prompt; return this; }
        public AiRequestDtoBuilder category(String category) { this.category = category; return this; }
        public AiRequestDtoBuilder academicLevel(String academicLevel) { this.academicLevel = academicLevel; return this; }
        public AiRequestDtoBuilder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
        public AiRequestDtoBuilder subjects(java.util.List<String> subjects) { this.subjects = subjects; return this; }
        public AiRequestDtoBuilder branch(String branch) { this.branch = branch; return this; }
        public AiRequestDtoBuilder year(String year) { this.year = year; return this; }

        public AiRequestDto build() {
            return new AiRequestDto(studentId, prompt, category, academicLevel, targetRole, subjects, branch, year);
        }
    }
}
