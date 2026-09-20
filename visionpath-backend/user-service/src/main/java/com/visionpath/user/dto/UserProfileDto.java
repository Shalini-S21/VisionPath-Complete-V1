package com.visionpath.user.dto;

public class UserProfileDto {
    private Long id;
    private Long userId;
    private String username;
    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private String bio;
    private String role;
    private String status;

    public UserProfileDto() {
    }

    public UserProfileDto(Long id, Long userId, String username, String name, String email, String phone, String avatarUrl, String bio, String role, String status) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.role = role;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

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

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static UserProfileDtoBuilder builder() {
        return new UserProfileDtoBuilder();
    }

    public static class UserProfileDtoBuilder {
        private Long id;
        private Long userId;
        private String username;
        private String name;
        private String email;
        private String phone;
        private String avatarUrl;
        private String bio;
        private String role;
        private String status;

        public UserProfileDtoBuilder id(Long id) { this.id = id; return this; }
        public UserProfileDtoBuilder userId(Long userId) { this.userId = userId; return this; }
        public UserProfileDtoBuilder username(String username) { this.username = username; return this; }
        public UserProfileDtoBuilder name(String name) { this.name = name; return this; }
        public UserProfileDtoBuilder email(String email) { this.email = email; return this; }
        public UserProfileDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public UserProfileDtoBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserProfileDtoBuilder bio(String bio) { this.bio = bio; return this; }
        public UserProfileDtoBuilder role(String role) { this.role = role; return this; }
        public UserProfileDtoBuilder status(String status) { this.status = status; return this; }

        public UserProfileDto build() {
            return new UserProfileDto(id, userId, username, name, email, phone, avatarUrl, bio, role, status);
        }
    }
}
