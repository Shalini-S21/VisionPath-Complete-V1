package com.visionpath.assessment.repository;

import com.visionpath.assessment.entity.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, Long> {
    List<AssessmentResult> findByUserId(Long userId);
    List<AssessmentResult> findByUserIdAndAssessmentId(Long userId, Long assessmentId);
}
