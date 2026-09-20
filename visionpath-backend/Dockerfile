# ==============================================================================
# VisionPath Multi-Service Dockerfile Template
# Arguments:
#   SERVICE_NAME: The submodule folder name (e.g. api-gateway, auth-service, etc.)
# ==============================================================================

# Stage 1: Build with Maven and Eclipse Temurin JDK 21
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy parent and all module POMs to leverage Docker cache for dependencies
COPY pom.xml .
COPY api-gateway/pom.xml api-gateway/
COPY auth-service/pom.xml auth-service/
COPY user-service/pom.xml user-service/
COPY student-service/pom.xml student-service/
COPY counselor-service/pom.xml counselor-service/
COPY admin-service/pom.xml admin-service/
COPY assessment-service/pom.xml assessment-service/
COPY ai-service/pom.xml ai-service/
COPY career-service/pom.xml career-service/
COPY skill-service/pom.xml skill-service/
COPY study-plan-service/pom.xml study-plan-service/
COPY resume-service/pom.xml resume-service/
COPY notification-service/pom.xml notification-service/
COPY file-service/pom.xml file-service/

# Download dependencies in offline-friendly mode
RUN mvn dependency:go-offline -B || true

# Copy all source code
COPY . .

# Which microservice to build (passed as build-arg)
ARG SERVICE_NAME
RUN mvn clean package -pl ${SERVICE_NAME} -am -DskipTests

# Stage 2: Minimal JRE Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Add curl for healthcheck
RUN apk add --no-cache curl

ARG SERVICE_NAME
ENV SERVICE_NAME_ENV=${SERVICE_NAME}

# Copy the built jar
COPY --from=builder /build/${SERVICE_NAME}/target/*.jar app.jar

# JVM Performance & Container Optimizations
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
