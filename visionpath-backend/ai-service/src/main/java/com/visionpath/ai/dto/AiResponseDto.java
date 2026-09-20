package com.visionpath.ai.dto;

import java.util.List;

public class AiResponseDto {
    private String resultText;
    private List<String> suggestions;
    private Double confidenceScore;

    public AiResponseDto() {
    }

    public AiResponseDto(String resultText, List<String> suggestions, Double confidenceScore) {
        this.resultText = resultText;
        this.suggestions = suggestions;
        this.confidenceScore = confidenceScore;
    }

    public String getResultText() { return resultText; }
    public void setResultText(String resultText) { this.resultText = resultText; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }

    public static AiResponseDtoBuilder builder() {
        return new AiResponseDtoBuilder();
    }

    public static class AiResponseDtoBuilder {
        private String resultText;
        private List<String> suggestions;
        private Double confidenceScore;

        public AiResponseDtoBuilder resultText(String resultText) { this.resultText = resultText; return this; }
        public AiResponseDtoBuilder suggestions(List<String> suggestions) { this.suggestions = suggestions; return this; }
        public AiResponseDtoBuilder confidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; return this; }

        public AiResponseDto build() {
            return new AiResponseDto(resultText, suggestions, confidenceScore);
        }
    }
}
