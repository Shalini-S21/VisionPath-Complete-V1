package com.visionpath.assessment.repository;

import com.visionpath.assessment.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByAssessmentId(Long assessmentId);
    long countByAssessmentId(Long assessmentId);
}
