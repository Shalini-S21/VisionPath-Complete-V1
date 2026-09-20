package com.visionpath.student.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_interests")
public class StudentInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String interest;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getInterest() { return interest; }
    public void setInterest(String interest) { this.interest = interest; }
}
