package com.visionpath.career.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "counselor_bookings")
public class CounselorBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String studentId;
    private String studentName;
    private String counselorId;
    private String counselorName;

    private String sessionDate; // e.g. "2026-08-15"
    private String timeSlot;    // e.g. "10:00 AM"
    private String status;      // CONFIRMED, PENDING, COMPLETED, CANCELLED
    private String topic;
    private String notes;

    private LocalDateTime createdAt;

    public CounselorBooking() {
    }

    public CounselorBooking(String id, String studentId, String studentName, String counselorId, String counselorName, String sessionDate, String timeSlot, String status, String topic, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.counselorId = counselorId;
        this.counselorName = counselorName;
        this.sessionDate = sessionDate;
        this.timeSlot = timeSlot;
        this.status = status;
        this.topic = topic;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(String counselorId) {
        this.counselorId = counselorId;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }

    public String getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(String sessionDate) {
        this.sessionDate = sessionDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static CounselorBookingBuilder builder() {
        return new CounselorBookingBuilder();
    }

    public static class CounselorBookingBuilder {
        private String id;
        private String studentId;
        private String studentName;
        private String counselorId;
        private String counselorName;
        private String sessionDate;
        private String timeSlot;
        private String status;
        private String topic;
        private String notes;
        private LocalDateTime createdAt;

        public CounselorBookingBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CounselorBookingBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public CounselorBookingBuilder studentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public CounselorBookingBuilder counselorId(String counselorId) {
            this.counselorId = counselorId;
            return this;
        }

        public CounselorBookingBuilder counselorName(String counselorName) {
            this.counselorName = counselorName;
            return this;
        }

        public CounselorBookingBuilder sessionDate(String sessionDate) {
            this.sessionDate = sessionDate;
            return this;
        }

        public CounselorBookingBuilder timeSlot(String timeSlot) {
            this.timeSlot = timeSlot;
            return this;
        }

        public CounselorBookingBuilder status(String status) {
            this.status = status;
            return this;
        }

        public CounselorBookingBuilder topic(String topic) {
            this.topic = topic;
            return this;
        }

        public CounselorBookingBuilder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public CounselorBookingBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CounselorBooking build() {
            return new CounselorBooking(id, studentId, studentName, counselorId, counselorName, sessionDate, timeSlot, status, topic, notes, createdAt);
        }
    }
}
