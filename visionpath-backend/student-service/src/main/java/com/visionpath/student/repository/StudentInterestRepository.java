package com.visionpath.student.repository;

import com.visionpath.student.entity.StudentInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentInterestRepository extends JpaRepository<StudentInterest, Long> {
    List<StudentInterest> findByUserId(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
}
