package com.visionpath.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UpdateUserRequest {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    private String phone;
    private String avatarUrl;
    private String bio;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(String name, String email, String phone, String avatarUrl, String bio) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
