package com.visionpath.resume.dto;

import java.util.List;

public class ResumeAnalysisDto {
    private Long resumeId;
    private Integer atsScore;
    private String targetRole;
    private String feedback;
    private List<String> extractedSkills;
    private List<String> recommendations;

    public ResumeAnalysisDto() {
    }

    public ResumeAnalysisDto(Long resumeId, Integer atsScore, String targetRole, String feedback, List<String> extractedSkills, List<String> recommendations) {
        this.resumeId = resumeId;
        this.atsScore = atsScore;
        this.targetRole = targetRole;
        this.feedback = feedback;
        this.extractedSkills = extractedSkills;
        this.recommendations = recommendations;
    }

    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }

    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public List<String> getExtractedSkills() { return extractedSkills; }
    public void setExtractedSkills(List<String> extractedSkills) { this.extractedSkills = extractedSkills; }

    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }

    public static ResumeAnalysisDtoBuilder builder() {
        return new ResumeAnalysisDtoBuilder();
    }

    public static class ResumeAnalysisDtoBuilder {
        private Long resumeId;
        private Integer atsScore;
        private String targetRole;
        private String feedback;
        private List<String> extractedSkills;
        private List<String> recommendations;

        public ResumeAnalysisDtoBuilder resumeId(Long resumeId) { this.resumeId = resumeId; return this; }
        public ResumeAnalysisDtoBuilder atsScore(Integer atsScore) { this.atsScore = atsScore; return this; }
        public ResumeAnalysisDtoBuilder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
        public ResumeAnalysisDtoBuilder feedback(String feedback) { this.feedback = feedback; return this; }
        public ResumeAnalysisDtoBuilder extractedSkills(List<String> extractedSkills) { this.extractedSkills = extractedSkills; return this; }
        public ResumeAnalysisDtoBuilder recommendations(List<String> recommendations) { this.recommendations = recommendations; return this; }

        public ResumeAnalysisDto build() {
            return new ResumeAnalysisDto(resumeId, atsScore, targetRole, feedback, extractedSkills, recommendations);
        }
    }
}
