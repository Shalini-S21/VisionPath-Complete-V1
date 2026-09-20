package com.visionpath.student.repository;

import com.visionpath.student.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
    List<StudentSkill> findByUserId(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
}
