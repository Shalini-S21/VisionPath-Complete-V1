package com.visionpath.resume.dto;

public class ResumeDto {
    private Long id;
    private Long studentId;
    private String filename;
    private String storagePath;
    private Integer version;
    private Integer atsScore;
    private String targetRole;
    private String analysisResult;

    public ResumeDto() {
    }

    public ResumeDto(Long id, Long studentId, String filename, String storagePath, Integer version, Integer atsScore, String targetRole, String analysisResult) {
        this.id = id;
        this.studentId = studentId;
        this.filename = filename;
        this.storagePath = storagePath;
        this.version = version;
        this.atsScore = atsScore;
        this.targetRole = targetRole;
        this.analysisResult = analysisResult;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public String getAnalysisResult() { return analysisResult; }
    public void setAnalysisResult(String analysisResult) { this.analysisResult = analysisResult; }

    public static ResumeDtoBuilder builder() {
        return new ResumeDtoBuilder();
    }

    public static class ResumeDtoBuilder {
        private Long id;
        private Long studentId;
        private String filename;
        private String storagePath;
        private Integer version;
        private Integer atsScore;
        private String targetRole;
        private String analysisResult;

        public ResumeDtoBuilder id(Long id) { this.id = id; return this; }
        public ResumeDtoBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public ResumeDtoBuilder filename(String filename) { this.filename = filename; return this; }
        public ResumeDtoBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public ResumeDtoBuilder version(Integer version) { this.version = version; return this; }
        public ResumeDtoBuilder atsScore(Integer atsScore) { this.atsScore = atsScore; return this; }
        public ResumeDtoBuilder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
        public ResumeDtoBuilder analysisResult(String analysisResult) { this.analysisResult = analysisResult; return this; }

        public ResumeDto build() {
            return new ResumeDto(id, studentId, filename, storagePath, version, atsScore, targetRole, analysisResult);
        }
    }
}
