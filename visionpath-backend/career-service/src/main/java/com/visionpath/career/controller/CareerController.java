package com.visionpath.career.controller;

import com.visionpath.career.entity.Career;
import com.visionpath.career.service.CareerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/careers")
public class CareerController {

    private final CareerService careerService;

    public CareerController(CareerService careerService) {
        this.careerService = careerService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        return ok("Careers retrieved", careerService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return ok("Career found", careerService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Career career) {
        return ok("Career created", careerService.create(career));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Career career) {
        return ok("Career updated", careerService.update(id, career));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        careerService.delete(id);
        return ok("Career deleted", null);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword) {
        return ok("Search results", careerService.search(keyword));
    }

    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> categories() {
        return ok("Categories", careerService.getCategories());
    }

    // GET /api/careers/recommendations/{studentId}?skills=java,python
    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<Map<String, Object>> recommendations(
            @PathVariable Long studentId,
            @RequestParam(required = false) String skills) {
        List<Career> recs = careerService.getRecommendations(skills);
        return ok("Recommendations for student " + studentId, recs);
    }

    // GET /api/careers/compare?id1=1&id2=2
    @GetMapping("/compare")
    public ResponseEntity<Map<String, Object>> compare(@RequestParam Long id1, @RequestParam Long id2) {
        Map<String, Object> result = new HashMap<>();
        result.put("career1", careerService.getById(id1));
        result.put("career2", careerService.getById(id2));
        return ok("Comparison result", result);
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
