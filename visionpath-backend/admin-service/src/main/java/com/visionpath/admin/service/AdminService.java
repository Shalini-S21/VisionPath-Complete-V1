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
    
    @Value("${auth.service.url:http://localhost:8081}")
    private String authServiceUrl;

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
            ResponseEntity<Map> response = restTemplate.getForEntity(authServiceUrl + "/api/auth/users", Map.class);
            Map body = response.getBody();
            if (body != null && body.containsKey("data")) {
                Object dataObj = body.get("data");
                if (dataObj != null) {
                    return dataObj;
                }
            }
            if (body != null) {
                return body;
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch users from auth-service: " + e.getMessage());
        }
        return new ArrayList<>();
    }

    public Object getStudents() {
        Object all = getUsers();
        if (all instanceof List) {
            List<Map<String, Object>> students = new ArrayList<>();
            for (Object item : (List<?>) all) {
                if (item instanceof Map) {
                    Map<String, Object> u = (Map<String, Object>) item;
                    if ("STUDENT".equalsIgnoreCase(String.valueOf(u.get("role")))) {
                        students.add(u);
                    }
                }
            }
            return students;
        }
        return new ArrayList<>();
    }

    public Object getCounselors() {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(counselorServiceUrl + "/api/counselors", Map.class);
            Map body = response.getBody();
            if (body != null && body.containsKey("data")) {
                Object dataObj = body.get("data");
                if (dataObj != null) {
                    return dataObj;
                }
            }
            if (body != null) {
                return body;
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch counselors from counselor-service: " + e.getMessage());
        }
        return new ArrayList<>();
    }

    public Object getPendingCounselors() {
        return new ArrayList<>();
    }

    public Object approveCounselor(Long id) {
        return new HashMap<>();
    }

    public Object rejectCounselor(Long id) {
        return new HashMap<>();
    }
}
