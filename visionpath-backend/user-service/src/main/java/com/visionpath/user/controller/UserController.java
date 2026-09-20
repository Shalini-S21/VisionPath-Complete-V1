package com.visionpath.user.controller;

import com.visionpath.user.dto.ApiResponse;
import com.visionpath.user.dto.UpdateUserRequest;
import com.visionpath.user.dto.UserProfileDto;
import com.visionpath.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserProfileDto>>> getAllUsers() {
        List<UserProfileDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("All users retrieved successfully", users));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserProfileDto>> getByUserId(@PathVariable Long userId) {
        UserProfileDto dto = userService.getByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("User profile retrieved successfully", dto));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse<UserProfileDto>> getByUsername(@PathVariable String username) {
        UserProfileDto dto = userService.getByUsername(username);
        return ResponseEntity.ok(ApiResponse.success("User profile retrieved successfully", dto));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateUserRequest request) {
        UserProfileDto dto = userService.updateProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.success("User profile updated successfully", dto));
    }
}
