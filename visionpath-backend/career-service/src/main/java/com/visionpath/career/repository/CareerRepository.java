package com.visionpath.career.repository;

import com.visionpath.career.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String desc);
    List<Career> findByCategory(String category);

    @Query("SELECT DISTINCT c.category FROM Career c WHERE c.category IS NOT NULL")
    List<String> findAllCategories();
}
