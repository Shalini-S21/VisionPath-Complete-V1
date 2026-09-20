package com.visionpath.ai.client;

import com.visionpath.ai.dto.AiRequestDto;
import com.visionpath.ai.dto.AiResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@Component
public class FastApiClient {

    private static final Logger log = LoggerFactory.getLogger(FastApiClient.class);

    private final RestTemplate restTemplate;
    private final String fastApiBaseUrl;

    public FastApiClient(@Value("${fastapi.service.url:http://localhost:8000}") String fastApiBaseUrl) {
        this.restTemplate = new RestTemplate();
        this.fastApiBaseUrl = fastApiBaseUrl.endsWith("/") ? fastApiBaseUrl.substring(0, fastApiBaseUrl.length() - 1) : fastApiBaseUrl;
    }

    public boolean isFastApiHealthy() {
        try {
            ResponseEntity<Map> resp = restTemplate.getForEntity(fastApiBaseUrl + "/health", Map.class);
            return resp.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.debug("FastAPI health check failed: {}", e.getMessage());
            return false;
        }
    }

    public AiResponseDto postToBridge(String endpoint, Object requestBody) {
        try {
            String url = fastApiBaseUrl + "/api/ai" + (endpoint.startsWith("/") ? endpoint : "/" + endpoint);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<AiResponseDto> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    AiResponseDto.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            log.warn("FastAPI request failed for endpoint {}: {}", endpoint, e.getMessage());
        }
        return null;
    }

    public AiResponseDto getFromBridge(String endpoint) {
        try {
            String url = fastApiBaseUrl + "/api/ai" + (endpoint.startsWith("/") ? endpoint : "/" + endpoint);
            ResponseEntity<AiResponseDto> response = restTemplate.getForEntity(url, AiResponseDto.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            log.warn("FastAPI GET failed for endpoint {}: {}", endpoint, e.getMessage());
        }
        return null;
    }
}
