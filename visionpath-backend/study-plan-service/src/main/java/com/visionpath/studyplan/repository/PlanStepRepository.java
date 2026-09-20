package com.visionpath.studyplan.repository;

import com.visionpath.studyplan.entity.PlanStep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanStepRepository extends JpaRepository<PlanStep, Long> {
}
