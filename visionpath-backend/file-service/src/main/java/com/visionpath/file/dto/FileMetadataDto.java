package com.visionpath.file.dto;

public class FileMetadataDto {
    private Long id;
    private String originalFilename;
    private String storedFilename;
    private String contentType;
    private Long size;
    private Long ownerId;
    private String ownerType;
    private String storagePath;

    public FileMetadataDto() {
    }

    public FileMetadataDto(Long id, String originalFilename, String storedFilename, String contentType, Long size, Long ownerId, String ownerType, String storagePath) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.storedFilename = storedFilename;
        this.contentType = contentType;
        this.size = size;
        this.ownerId = ownerId;
        this.ownerType = ownerType;
        this.storagePath = storagePath;
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

    public static FileMetadataDtoBuilder builder() {
        return new FileMetadataDtoBuilder();
    }

    public static class FileMetadataDtoBuilder {
        private Long id;
        private String originalFilename;
        private String storedFilename;
        private String contentType;
        private Long size;
        private Long ownerId;
        private String ownerType;
        private String storagePath;

        public FileMetadataDtoBuilder id(Long id) { this.id = id; return this; }
        public FileMetadataDtoBuilder originalFilename(String originalFilename) { this.originalFilename = originalFilename; return this; }
        public FileMetadataDtoBuilder storedFilename(String storedFilename) { this.storedFilename = storedFilename; return this; }
        public FileMetadataDtoBuilder contentType(String contentType) { this.contentType = contentType; return this; }
        public FileMetadataDtoBuilder size(Long size) { this.size = size; return this; }
        public FileMetadataDtoBuilder ownerId(Long ownerId) { this.ownerId = ownerId; return this; }
        public FileMetadataDtoBuilder ownerType(String ownerType) { this.ownerType = ownerType; return this; }
        public FileMetadataDtoBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }

        public FileMetadataDto build() {
            return new FileMetadataDto(id, originalFilename, storedFilename, contentType, size, ownerId, ownerType, storagePath);
        }
    }
}
