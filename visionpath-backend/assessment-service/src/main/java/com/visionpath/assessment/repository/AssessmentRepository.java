package com.visionpath.assessment.repository;

import com.visionpath.assessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByType(String type);
}
