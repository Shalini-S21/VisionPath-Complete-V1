package com.visionpath.file.service;

import com.visionpath.file.dto.FileMetadataDto;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    FileMetadataDto uploadFile(MultipartFile file, Long ownerId, String ownerType);
    FileMetadataDto getFile(Long id);
    void deleteFile(Long id);
}
