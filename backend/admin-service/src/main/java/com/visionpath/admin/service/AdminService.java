package com.visionpath.admin.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final RestTemplate restTemplate;
    
    @Value("${user.service.url:http://localhost:8082}")
    private String userServiceUrl;
    
    @Value("${counselor.service.url:http://localhost:8084}")
    private String counselorServiceUrl;

    public AdminService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", 1542);
        data.put("activeUsersToday", 320);
        data.put("assessmentsTaken", 4890);
        data.put("jobsApplied", 1230);
        data.put("counselingAppointments", 85);
        data.put("popularCareers", new String[]{"Software Engineer", "Data Scientist", "UI/UX Designer"});
        return data;
    }

    public Object getUsers() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(userServiceUrl + "/api/users/all", Map.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public Object getStudents() {
        // Just return all users for now, frontend might filter, or we can filter here
        return getUsers();
    }

    public Object getCounselors() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(counselorServiceUrl + "/api/counselors", Map.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public Object getPendingCounselors() {
        // Mock pending counselors since counselor-service doesn't have a pending endpoint
        return new ArrayList<>();
    }

    public Object approveCounselor(Long id) {
        return new HashMap<>();
    }

    public Object rejectCounselor(Long id) {
        return new HashMap<>();
    }
}
