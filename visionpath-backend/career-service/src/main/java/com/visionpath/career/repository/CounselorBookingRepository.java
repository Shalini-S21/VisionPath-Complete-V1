package com.visionpath.career.repository;

import com.visionpath.career.entity.CounselorBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CounselorBookingRepository extends JpaRepository<CounselorBooking, String> {
    List<CounselorBooking> findByStudentId(String studentId);
    List<CounselorBooking> findByCounselorId(String counselorId);
}
