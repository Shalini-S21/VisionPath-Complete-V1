package com.visionpath.studyplan.controller;

import com.visionpath.studyplan.entity.StudyPlan;
import com.visionpath.studyplan.entity.StudyTask;
import com.visionpath.studyplan.service.StudyPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/study-plans")
public class StudyPlanController {

    private final StudyPlanService studyPlanService;

    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getByUser(@RequestParam Long userId) {
        return ok("Study plans retrieved", studyPlanService.getPlansByUser(userId));
    }

    @GetMapping("/student/{userId}/progress")
    public ResponseEntity<Map<String, Object>> getStudentProgress(@PathVariable Long userId) {
        return ok("Progress retrieved", studyPlanService.getStudentProgress(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return ok("Study plan found", studyPlanService.getPlanById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPlan(@RequestBody StudyPlan plan) {
        return ok("Study plan created", studyPlanService.createPlan(plan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updatePlan(@PathVariable Long id, @RequestBody StudyPlan plan) {
        return ok("Study plan updated", studyPlanService.updatePlan(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePlan(@PathVariable Long id) {
        studyPlanService.deletePlan(id);
        return ok("Study plan deleted", null);
    }

    // Tasks
    @PostMapping("/{planId}/tasks")
    public ResponseEntity<Map<String, Object>> addTask(@PathVariable Long planId, @RequestBody StudyTask task) {
        return ok("Task added", studyPlanService.addTask(planId, task));
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<Map<String, Object>> updateTask(@PathVariable Long taskId, @RequestBody StudyTask task) {
        return ok("Task updated", studyPlanService.updateTask(taskId, task));
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Map<String, Object>> deleteTask(@PathVariable Long taskId) {
        studyPlanService.deleteTask(taskId);
        return ok("Task deleted", null);
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
