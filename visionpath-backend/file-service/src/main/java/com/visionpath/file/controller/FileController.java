package com.visionpath.file.controller;

import com.visionpath.file.dto.ApiResponse;
import com.visionpath.file.dto.FileMetadataDto;
import com.visionpath.file.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<FileMetadataDto>> uploadFile(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "ownerId", required = false) Long ownerId,
            @RequestParam(value = "ownerType", required = false) String ownerType) {
        FileMetadataDto dto = fileStorageService.uploadFile(file, ownerId, ownerType);
        return ResponseEntity.ok(ApiResponse.success("File uploaded successfully", dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FileMetadataDto>> getFile(@PathVariable Long id) {
        FileMetadataDto dto = fileStorageService.getFile(id);
        return ResponseEntity.ok(ApiResponse.success("File metadata retrieved", dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFile(@PathVariable Long id) {
        fileStorageService.deleteFile(id);
        return ResponseEntity.ok(ApiResponse.success("File deleted successfully", null));
    }
}
