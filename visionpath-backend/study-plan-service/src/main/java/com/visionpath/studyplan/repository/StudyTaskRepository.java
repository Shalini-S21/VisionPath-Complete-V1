package com.visionpath.studyplan.repository;

import com.visionpath.studyplan.entity.StudyTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyTaskRepository extends JpaRepository<StudyTask, Long> {
    List<StudyTask> findByStudyPlanId(Long studyPlanId);
}
