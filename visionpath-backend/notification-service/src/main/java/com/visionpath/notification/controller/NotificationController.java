package com.visionpath.notification.controller;

import com.visionpath.notification.entity.Notification;
import com.visionpath.notification.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createNotification(@RequestBody Notification notification) {
        return ok("Notification created", notificationService.createNotification(notification));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserNotifications(
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        Long targetUserId = (userId != null) ? userId : 1L;
        return ok("Notifications retrieved", notificationService.getUserNotifications(targetUserId, unreadOnly));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserNotificationsByPath(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        return ok("Notifications retrieved", notificationService.getUserNotifications(userId, unreadOnly));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long id) {
        return ok("Notification marked as read", notificationService.markAsRead(id));
    }

    @PutMapping("/read-all")
    public ResponseEntity<Map<String, Object>> markAllAsRead(@RequestParam(required = false) Long userId) {
        Long targetUserId = (userId != null) ? userId : 1L;
        notificationService.markAllAsRead(targetUserId);
        return ok("All notifications marked as read", null);
    }

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<Map<String, Object>> markAllAsReadByPath(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
        return ok("All notifications marked as read", null);
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
