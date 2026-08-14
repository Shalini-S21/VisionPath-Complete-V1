package com.visionpath.admin.controller;

import com.visionpath.admin.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping({"/analytics", "/stats"})
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ok("Analytics retrieved", adminService.getAnalytics());
    }

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUsers() {
        return ok("Users retrieved", adminService.getUsers());
    }

    @GetMapping("/students")
    public ResponseEntity<Map<String, Object>> getStudents() {
        return ok("Students retrieved", adminService.getStudents());
    }

    @GetMapping("/counselors")
    public ResponseEntity<Map<String, Object>> getCounselors() {
        return ok("Counselors retrieved", adminService.getCounselors());
    }

    @GetMapping("/counselors/pending")
    public ResponseEntity<Map<String, Object>> getPendingCounselors() {
        return ok("Pending counselors retrieved", adminService.getPendingCounselors());
    }

    @PutMapping("/counselors/{id}/approve")
    public ResponseEntity<Map<String, Object>> approveCounselor(@PathVariable Long id) {
        return ok("Counselor approved", adminService.approveCounselor(id));
    }

    @PutMapping("/counselors/{id}/reject")
    public ResponseEntity<Map<String, Object>> rejectCounselor(@PathVariable Long id) {
        return ok("Counselor rejected", adminService.rejectCounselor(id));
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
