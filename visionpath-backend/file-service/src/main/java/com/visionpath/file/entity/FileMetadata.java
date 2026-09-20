package com.visionpath.file.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_metadata")
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false, unique = true)
    private String storedFilename;

    private String contentType;
    private Long size;

    private Long ownerId;
    private String ownerType; // STUDENT, COUNSELOR, SYSTEM

    @Column(nullable = false)
    private String storagePath;

    private LocalDateTime createdAt;

    public FileMetadata() {
    }

    public FileMetadata(Long id, String originalFilename, String storedFilename, String contentType, Long size, Long ownerId, String ownerType, String storagePath, LocalDateTime createdAt) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.storedFilename = storedFilename;
        this.contentType = contentType;
        this.size = size;
        this.ownerId = ownerId;
        this.ownerType = ownerType;
        this.storagePath = storagePath;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOriginalFilename() { return originalFilename; }
    public void setOriginalFilename(String originalFilename) { this.originalFilename = originalFilename; }

    public String getStoredFilename() { return storedFilename; }
    public void setStoredFilename(String storedFilename) { this.storedFilename = storedFilename; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }

    public String getOwnerType() { return ownerType; }
    public void setOwnerType(String ownerType) { this.ownerType = ownerType; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static FileMetadataBuilder builder() {
        return new FileMetadataBuilder();
    }

    public static class FileMetadataBuilder {
        private Long id;
        private String originalFilename;
        private String storedFilename;
        private String contentType;
        private Long size;
        private Long ownerId;
        private String ownerType;
        private String storagePath;
        private LocalDateTime createdAt;

        public FileMetadataBuilder id(Long id) { this.id = id; return this; }
        public FileMetadataBuilder originalFilename(String originalFilename) { this.originalFilename = originalFilename; return this; }
        public FileMetadataBuilder storedFilename(String storedFilename) { this.storedFilename = storedFilename; return this; }
        public FileMetadataBuilder contentType(String contentType) { this.contentType = contentType; return this; }
        public FileMetadataBuilder size(Long size) { this.size = size; return this; }
        public FileMetadataBuilder ownerId(Long ownerId) { this.ownerId = ownerId; return this; }
        public FileMetadataBuilder ownerType(String ownerType) { this.ownerType = ownerType; return this; }
        public FileMetadataBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public FileMetadataBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public FileMetadata build() {
            return new FileMetadata(id, originalFilename, storedFilename, contentType, size, ownerId, ownerType, storagePath, createdAt);
        }
    }
}
