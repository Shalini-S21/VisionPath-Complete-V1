package com.visionpath.user.service;

import com.visionpath.user.dto.UpdateUserRequest;
import com.visionpath.user.dto.UserProfileDto;
import com.visionpath.user.entity.UserProfile;
import com.visionpath.user.exception.ResourceNotFoundException;
import com.visionpath.user.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserProfileRepository userRepository;

    public UserService(UserProfileRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileDto getByUserId(Long userId) {
        UserProfile user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found for ID: " + userId));
        return mapToDto(user);
    }

    @Transactional(readOnly = true)
    public UserProfileDto getByUsername(String username) {
        UserProfile user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found for username: " + username));
        return mapToDto(user);
    }

    @Transactional
    public UserProfileDto updateProfile(Long userId, UpdateUserRequest request) {
        UserProfile user = userRepository.findByUserId(userId)
                .orElseGet(() -> UserProfile.builder()
                        .userId(userId)
                        .username("user_" + userId)
                        .name(request.getName())
                        .email(request.getEmail())
                        .role("STUDENT")
                        .status("ACTIVE")
                        .build());

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getBio() != null) user.setBio(request.getBio());

        UserProfile saved = userRepository.save(user);
        return mapToDto(saved);
    }

    private UserProfileDto mapToDto(UserProfile user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }
}
