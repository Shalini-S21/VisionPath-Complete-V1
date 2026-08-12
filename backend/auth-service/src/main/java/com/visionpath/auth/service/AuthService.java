package com.visionpath.auth.service;

import com.visionpath.auth.dto.*;
import com.visionpath.auth.entity.User;
import com.visionpath.auth.entity.User.Role;
import com.visionpath.auth.repository.UserRepository;
import com.visionpath.auth.security.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.visionpath.auth.entity.PasswordResetToken;
import com.visionpath.auth.repository.PasswordResetTokenRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    // Seed default users on startup
    @PostConstruct
    public void seedDefaultUsers() {
        createIfAbsent("Admin User", "admin@visionpath.com", "admin123", "9000000001", Role.ADMIN);
        createIfAbsent("John Student", "student@visionpath.com", "password123", "9000000002", Role.STUDENT);
        createIfAbsent("Dr. Sarah Counselor", "counselor@visionpath.com", "password123", "9000000003", Role.COUNSELOR);
        log.info("Default users seeded.");
    }

    private void createIfAbsent(String name, String email, String rawPassword, String phone, Role role) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User(name, email, passwordEncoder.encode(rawPassword), phone, role);
            userRepository.save(user);
        }
    }

    public AuthDataResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        Role role = Role.STUDENT;
        if (request.getRole() != null && !request.getRole().isBlank()) {
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role. Use: STUDENT, COUNSELOR, or ADMIN");
            }
        }

        User user = new User(
            request.getName() != null ? request.getName() : "New User",
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getPhone(),
            role
        );
        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return buildResponse(token, user);
    }

    public AuthDataResponse login(LoginRequest request) {
        String identifier = request.getEmail();
        if (identifier == null || identifier.isBlank()) {
            throw new RuntimeException("Email or username is required");
        }

        User user = userRepository.findByEmail(identifier)
                .orElseGet(() -> userRepository.findAll().stream()
                        .filter(u -> u.getEmail().equalsIgnoreCase(identifier) || u.getEmail().startsWith(identifier.toLowerCase()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Invalid email or password")));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account is disabled. Please contact admin.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return buildResponse(token, user);
    }

    public User getMe(String token) {
        String email = jwtTokenProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(null); // Never return password
        return user;
    }

    public void changePassword(String token, ChangePasswordRequest request) {
        String email = jwtTokenProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            String rawToken = UUID.randomUUID().toString();
            String hashedToken = hashToken(rawToken);
            LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(30);

            PasswordResetToken resetToken = new PasswordResetToken(user.getId(), hashedToken, expiryDate);
            passwordResetTokenRepository.save(resetToken);

            sendNotification(user.getId(), "Password Reset Request", 
                "Password reset requested. Use reset token: " + rawToken + " within 30 minutes.");
        });
    }

    public void resetPassword(ResetPasswordRequest request) {
        String hashedToken = hashToken(request.getToken());
        PasswordResetToken resetToken = passwordResetTokenRepository.findByHashedToken(hashedToken)
                .orElseThrow(() -> new RuntimeException("Invalid or expired password reset token"));

        if (resetToken.isUsed() || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired password reset token");
        }

        User user = userRepository.findById(resetToken.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error processing reset token", e);
        }
    }

    private void sendNotification(Long userId, String title, String message) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> req = new HashMap<>();
            req.put("userId", userId);
            req.put("title", title);
            req.put("message", message);
            req.put("type", "SECURITY");
            restTemplate.postForObject("http://localhost:8092/api/notifications", req, String.class);
        } catch (Exception e) {
            log.warn("Notification delivery warning: {}", e.getMessage());
        }
    }

    private AuthDataResponse buildResponse(String token, User user) {
        return new AuthDataResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
