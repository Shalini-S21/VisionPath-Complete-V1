package com.visionpath.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class ChatMessageDto {

    private Long userId;

    @NotBlank(message = "Message text cannot be blank")
    private String message;

    private String role; // STUDENT, COUNSELOR

    public ChatMessageDto() {
    }

    public ChatMessageDto(Long userId, String message, String role) {
        this.userId = userId;
        this.message = message;
        this.role = role;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
