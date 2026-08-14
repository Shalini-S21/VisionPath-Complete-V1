package com.visionpath.student.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId; // references auth-service user ID

    private String firstName;
    private String lastName;
    private String phone;
    private String college;
    private String degree;
    private String department;
    private Integer year;
    private Double cgpa;
    private String careerGoals;
    private String location;
    private String resumeUrl;
    private String counselorEmail;
    private Integer profileCompletion = 0;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public Integer getProfileCompletion() { return profileCompletion; }
    public void setProfileCompletion(Integer profileCompletion) { this.profileCompletion = profileCompletion; }

    public String getCounselorEmail() { return counselorEmail; }
    public void setCounselorEmail(String counselorEmail) { this.counselorEmail = counselorEmail; }
}
