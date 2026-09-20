package com.visionpath.assessment.config;
import io.swagger.v3.oas.models.*; import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.*;
@Configuration public class SwaggerConfig {
    @Bean public OpenAPI openAPI() { return new OpenAPI().info(new Info().title("VisionPath Assessment Service API").version("1.0.0")); }
}
