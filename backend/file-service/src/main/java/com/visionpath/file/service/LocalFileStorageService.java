package com.visionpath.file.service;

import com.visionpath.file.dto.FileMetadataDto;
import com.visionpath.file.entity.FileMetadata;
import com.visionpath.file.exception.ResourceNotFoundException;
import com.visionpath.file.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    private final FileMetadataRepository repository;

    @Value("${file.upload.dir:./uploads}")
    private String uploadDir;

    public LocalFileStorageService(FileMetadataRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public FileMetadataDto uploadFile(MultipartFile file, Long ownerId, String ownerType) {
        String originalName = file != null ? file.getOriginalFilename() : "document.pdf";
        String storedName = UUID.randomUUID().toString() + "_" + originalName;
        Long size = file != null ? file.getSize() : 2048L;
        String contentType = file != null ? file.getContentType() : "application/pdf";

        FileMetadata metadata = FileMetadata.builder()
                .originalFilename(originalName)
                .storedFilename(storedName)
                .contentType(contentType)
                .size(size)
                .ownerId(ownerId != null ? ownerId : 1L)
                .ownerType(ownerType != null ? ownerType : "STUDENT")
                .storagePath(uploadDir + "/" + storedName)
                .build();

        FileMetadata saved = repository.save(metadata);
        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public FileMetadataDto getFile(Long id) {
        FileMetadata metadata = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("File metadata not found for ID: " + id));
        return mapToDto(metadata);
    }

    @Override
    @Transactional
    public void deleteFile(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("File metadata not found for ID: " + id);
        }
        repository.deleteById(id);
    }

    private FileMetadataDto mapToDto(FileMetadata m) {
        return FileMetadataDto.builder()
                .id(m.getId())
                .originalFilename(m.getOriginalFilename())
                .storedFilename(m.getStoredFilename())
                .contentType(m.getContentType())
                .size(m.getSize())
                .ownerId(m.getOwnerId())
                .ownerType(m.getOwnerType())
                .storagePath(m.getStoragePath())
                .build();
    }
}
