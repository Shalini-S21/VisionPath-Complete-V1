package com.visionpath.user.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;
    private String avatarUrl;
    private String bio;

    @Column(nullable = false)
    private String role; // STUDENT, COUNSELOR, ADMIN

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE, PENDING, REJECTED, SUSPENDED

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserProfile() {
    }

    public UserProfile(Long id, Long userId, String username, String name, String email, String phone, String avatarUrl, String bio, String role, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static UserProfileBuilder builder() {
        return new UserProfileBuilder();
    }

    public static class UserProfileBuilder {
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
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public UserProfileBuilder id(Long id) { this.id = id; return this; }
        public UserProfileBuilder userId(Long userId) { this.userId = userId; return this; }
        public UserProfileBuilder username(String username) { this.username = username; return this; }
        public UserProfileBuilder name(String name) { this.name = name; return this; }
        public UserProfileBuilder email(String email) { this.email = email; return this; }
        public UserProfileBuilder phone(String phone) { this.phone = phone; return this; }
        public UserProfileBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserProfileBuilder bio(String bio) { this.bio = bio; return this; }
        public UserProfileBuilder role(String role) { this.role = role; return this; }
        public UserProfileBuilder status(String status) { this.status = status; return this; }
        public UserProfileBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserProfileBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public UserProfile build() {
            return new UserProfile(id, userId, username, name, email, phone, avatarUrl, bio, role, status, createdAt, updatedAt);
        }
    }
}
