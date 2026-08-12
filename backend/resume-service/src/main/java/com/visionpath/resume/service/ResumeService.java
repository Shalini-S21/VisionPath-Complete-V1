package com.visionpath.resume.service;

import com.visionpath.resume.dto.ResumeAnalysisDto;
import com.visionpath.resume.dto.ResumeDto;
import com.visionpath.resume.entity.Resume;
import com.visionpath.resume.exception.ResourceNotFoundException;
import com.visionpath.resume.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    @Transactional
    public ResumeDto uploadResume(Long studentId, MultipartFile file, String targetRole) {
        String filename = file != null ? file.getOriginalFilename() : "resume.pdf";
        Long size = file != null ? file.getSize() : 1024L;

        List<Resume> existing = resumeRepository.findByStudentIdOrderByVersionDesc(studentId);
        int version = existing.isEmpty() ? 1 : existing.get(0).getVersion() + 1;

        Resume resume = Resume.builder()
                .studentId(studentId)
                .filename(filename)
                .storagePath("/uploads/resumes/student_" + studentId + "_v" + version + "_" + filename)
                .contentType(file != null ? file.getContentType() : "application/pdf")
                .fileSize(size)
                .version(version)
                .targetRole(targetRole != null ? targetRole : "Full Stack AI Engineer")
                .atsScore(85)
                .analysisResult("Strong alignment with target role. Clean section formatting detected.")
                .build();

        Resume saved = resumeRepository.save(resume);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ResumeDto> getByStudentId(Long studentId) {
        return resumeRepository.findByStudentIdOrderByVersionDesc(studentId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ResumeDto getById(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found for ID: " + id));
        return mapToDto(resume);
    }

    @Transactional
    public ResumeAnalysisDto analyzeResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found for ID: " + id));

        resume.setAtsScore(88);
        resume.setAnalysisResult("ATS Score: 88/100. Excellent keyword coverage for " + resume.getTargetRole());
        resumeRepository.save(resume);

        return ResumeAnalysisDto.builder()
                .resumeId(resume.getId())
                .atsScore(resume.getAtsScore())
                .targetRole(resume.getTargetRole())
                .feedback("Strong formatting, proper action verbs, and clear project achievements.")
                .extractedSkills(List.of("Java 21", "Spring Boot", "React", "MySQL", "REST APIs", "Docker"))
                .recommendations(List.of("Add AWS Solutions Architect certification", "Highlight Microservices architecture impact"))
                .build();
    }

    private ResumeDto mapToDto(Resume r) {
        return ResumeDto.builder()
                .id(r.getId())
                .studentId(r.getStudentId())
                .filename(r.getFilename())
                .storagePath(r.getStoragePath())
                .version(r.getVersion())
                .atsScore(r.getAtsScore())
                .targetRole(r.getTargetRole())
                .analysisResult(r.getAnalysisResult())
                .build();
    }
}
