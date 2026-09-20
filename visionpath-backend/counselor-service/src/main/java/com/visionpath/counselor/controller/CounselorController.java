package com.visionpath.counselor.controller;

import com.visionpath.counselor.entity.Appointment;
import com.visionpath.counselor.entity.CounselorProfile;
import com.visionpath.counselor.service.CounselorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {

    private final CounselorService counselorService;

    public CounselorController(CounselorService counselorService) {
        this.counselorService = counselorService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        return ok("Counselors retrieved", counselorService.getAllCounselors());
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestParam(required = false) Long userId) {
        Long targetUserId = (userId != null) ? userId : 1L;
        return ok("Counselor profile retrieved", counselorService.getProfile(targetUserId));
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @RequestParam(required = false) Long userId,
            @RequestBody CounselorProfile profile) {
        Long targetUserId = (userId != null) ? userId : 1L;
        return ok("Profile updated", counselorService.updateProfile(targetUserId, profile));
    }

    @GetMapping("/assigned-students")
    public ResponseEntity<Map<String, Object>> getAssignedStudents() {
        return ok("Assigned students retrieved", counselorService.getAllCounselors());
    }

    @GetMapping("/students/{studentId}")
    public ResponseEntity<Map<String, Object>> getStudentDetails(@PathVariable Long studentId) {
        Map<String, Object> studentInfo = new HashMap<>();
        studentInfo.put("id", studentId);
        studentInfo.put("name", "Student #" + studentId);
        studentInfo.put("email", "student" + studentId + "@visionpath.com");
        studentInfo.put("collegeName", "Stanford University");
        studentInfo.put("degree", "B.Tech Computer Science");
        studentInfo.put("academicYear", "4th Year");
        return ok("Student details retrieved", studentInfo);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSessions", 12);
        stats.put("activeStudents", 5);
        stats.put("rating", 4.9);
        return ok("Stats retrieved", stats);
    }

    // Appointments
    @PostMapping("/appointments")
    public ResponseEntity<Map<String, Object>> bookAppointment(@RequestBody Appointment appointment) {
        return ok("Appointment booked", counselorService.bookAppointment(appointment));
    }

    @GetMapping("/appointments/student/{studentId}")
    public ResponseEntity<Map<String, Object>> getStudentAppointments(@PathVariable Long studentId) {
        return ok("Appointments retrieved", counselorService.getStudentAppointments(studentId));
    }

    @GetMapping("/appointments/counselor/{counselorId}")
    public ResponseEntity<Map<String, Object>> getCounselorAppointments(@PathVariable Long counselorId) {
        return ok("Appointments retrieved", counselorService.getCounselorAppointments(counselorId));
    }

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<Map<String, Object>> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ok("Appointment updated", counselorService.updateAppointmentStatus(id, body.get("status")));
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
