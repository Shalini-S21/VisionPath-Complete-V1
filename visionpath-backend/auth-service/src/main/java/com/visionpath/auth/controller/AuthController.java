package com.visionpath.auth.controller;

import com.visionpath.auth.dto.*;
import com.visionpath.auth.entity.User;
import com.visionpath.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthDataResponse>> register(@RequestBody RegisterRequest request) {
        AuthDataResponse data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", data));
    }

    // GET /api/auth/users
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = authService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("All users retrieved successfully", users));
    }

    // POST /api/auth/register/student
    @PostMapping("/register/student")
    public ResponseEntity<ApiResponse<AuthDataResponse>> registerStudent(@RequestBody RegisterRequest request) {
        request.setRole("STUDENT");
        AuthDataResponse data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Student registration successful", data));
    }

    // POST /api/auth/register/counselor
    @PostMapping("/register/counselor")
    public ResponseEntity<ApiResponse<AuthDataResponse>> registerCounselor(@RequestBody RegisterRequest request) {
        request.setRole("COUNSELOR");
        AuthDataResponse data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Counselor registration submitted", data));
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDataResponse>> login(@RequestBody LoginRequest request) {
        AuthDataResponse data = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", data));
    }

    // GET /api/auth/me  — requires Authorization: Bearer <token>
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getMe(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        User user = authService.getMe(token);
        return ResponseEntity.ok(ApiResponse.success("User retrieved", user));
    }

    // POST /api/auth/change-password
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ChangePasswordRequest request) {
        String token = extractToken(authHeader);
        authService.changePassword(token, request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }

    // POST /api/auth/forgot-password
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success(
            "If an account with that email exists, a password reset link has been sent.", null));
    }

    // POST /api/auth/reset-password
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success(
            "Password reset successful. You can now log in with your new password.", null));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header missing or invalid");
        }
        return authHeader.substring(7);
    }
}
