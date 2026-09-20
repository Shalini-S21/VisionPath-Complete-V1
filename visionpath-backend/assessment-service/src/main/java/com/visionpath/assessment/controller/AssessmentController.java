package com.visionpath.assessment.controller;

import com.visionpath.assessment.entity.Assessment;
import com.visionpath.assessment.entity.AssessmentResult;
import com.visionpath.assessment.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        return ok("Assessments retrieved", assessmentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return ok("Assessment found", assessmentService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Assessment assessment) {
        return ok("Assessment created", assessmentService.create(assessment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Assessment assessment) {
        return ok("Assessment updated", assessmentService.update(id, assessment));
    }

    // GET /api/assessments/{id}/questions — returns questions without correct answers
    @GetMapping("/{id}/questions")
    public ResponseEntity<Map<String, Object>> getQuestions(@PathVariable Long id) {
        return ok("Questions retrieved", assessmentService.getQuestionsForStudent(id));
    }

    // POST /api/assessments/{id}/start — just returns assessment details
    @PostMapping("/{id}/start")
    public ResponseEntity<Map<String, Object>> start(@PathVariable Long id) {
        return ok("Assessment started", assessmentService.getById(id));
    }

    // POST /api/assessments/{id}/submit
    @PostMapping("/{id}/submit")
    public ResponseEntity<Map<String, Object>> submit(
            @PathVariable Long id,
            @RequestParam(required = false) Long userId,
            @RequestBody(required = false) Map<String, Object> body) {
        
        Long targetUserId = userId;
        if (targetUserId == null && body != null) {
            if (body.get("userId") != null) {
                targetUserId = Long.valueOf(body.get("userId").toString());
            } else if (body.get("studentId") != null) {
                targetUserId = Long.valueOf(body.get("studentId").toString());
            }
        }
        if (targetUserId == null) targetUserId = 1L;

        Map<Long, String> parsedAnswers = new java.util.HashMap<>();
        if (body != null) {
            Object answersObj = body.get("answers");
            if (answersObj instanceof Map<?, ?> map) {
                for (Map.Entry<?, ?> entry : map.entrySet()) {
                    try {
                        Long qId = Long.valueOf(entry.getKey().toString());
                        parsedAnswers.put(qId, entry.getValue() != null ? entry.getValue().toString() : "");
                    } catch (NumberFormatException ignored) {}
                }
            } else if (answersObj instanceof java.util.List<?> list) {
                for (Object item : list) {
                    if (item instanceof Map<?, ?> mapItem) {
                        Object qIdObj = mapItem.get("questionId");
                        Object selOptObj = mapItem.get("selectedOption");
                        if (qIdObj != null) {
                            try {
                                Long qId = Long.valueOf(qIdObj.toString());
                                parsedAnswers.put(qId, selOptObj != null ? selOptObj.toString() : "");
                            } catch (NumberFormatException ignored) {}
                        }
                    }
                }
            }
        }

        AssessmentResult result = assessmentService.submit(id, targetUserId, parsedAnswers);
        return ok("Assessment submitted. Score: " + result.getScore() + "/" + result.getTotalMarks(), result);
    }


    // GET /api/assessments/results or /api/assessments/results/{userId}
    @GetMapping({"/results", "/results/{userId}"})
    public ResponseEntity<Map<String, Object>> getResults(
            @PathVariable(required = false) Long userId,
            @RequestParam(required = false) Long queryUserId) {
        Long targetId = userId != null ? userId : (queryUserId != null ? queryUserId : 1L);
        return ok("Results retrieved", assessmentService.getResults(targetId));
    }


    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
