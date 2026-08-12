package com.visionpath.resume.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    private Long counselorId;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String storagePath;

    private String contentType;
    private Long fileSize;
    private Integer version = 1;

    private Integer atsScore;
    private String targetRole;

    @Column(length = 2000)
    private String analysisResult;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Resume() {
    }

    public Resume(Long id, Long studentId, Long counselorId, String filename, String storagePath, String contentType, Long fileSize, Integer version, Integer atsScore, String targetRole, String analysisResult, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.studentId = studentId;
        this.counselorId = counselorId;
        this.filename = filename;
        this.storagePath = storagePath;
        this.contentType = contentType;
        this.fileSize = fileSize;
        this.version = version != null ? version : 1;
        this.atsScore = atsScore;
        this.targetRole = targetRole;
        this.analysisResult = analysisResult;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public String getAnalysisResult() { return analysisResult; }
    public void setAnalysisResult(String analysisResult) { this.analysisResult = analysisResult; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ResumeBuilder builder() {
        return new ResumeBuilder();
    }

    public static class ResumeBuilder {
        private Long id;
        private Long studentId;
        private Long counselorId;
        private String filename;
        private String storagePath;
        private String contentType;
        private Long fileSize;
        private Integer version = 1;
        private Integer atsScore;
        private String targetRole;
        private String analysisResult;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ResumeBuilder id(Long id) { this.id = id; return this; }
        public ResumeBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public ResumeBuilder counselorId(Long counselorId) { this.counselorId = counselorId; return this; }
        public ResumeBuilder filename(String filename) { this.filename = filename; return this; }
        public ResumeBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public ResumeBuilder contentType(String contentType) { this.contentType = contentType; return this; }
        public ResumeBuilder fileSize(Long fileSize) { this.fileSize = fileSize; return this; }
        public ResumeBuilder version(Integer version) { this.version = version; return this; }
        public ResumeBuilder atsScore(Integer atsScore) { this.atsScore = atsScore; return this; }
        public ResumeBuilder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
        public ResumeBuilder analysisResult(String analysisResult) { this.analysisResult = analysisResult; return this; }
        public ResumeBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ResumeBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Resume build() {
            return new Resume(id, studentId, counselorId, filename, storagePath, contentType, fileSize, version, atsScore, targetRole, analysisResult, createdAt, updatedAt);
        }
    }
}
