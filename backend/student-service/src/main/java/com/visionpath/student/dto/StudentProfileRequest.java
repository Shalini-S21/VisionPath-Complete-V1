package com.visionpath.student.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class StudentProfileRequest {
    @JsonAlias({"name", "fullName"})
    private String name;
    
    private String firstName;
    private String lastName;
    private String phone;
    
    @JsonAlias({"collegeName", "schoolName", "institution"})
    private String college;
    
    private String degree;
    
    @JsonAlias({"branch"})
    private String department;
    
    @JsonAlias({"academicYear"})
    private String academicYearStr;
    private Integer year;
    
    private Double cgpa;
    private String careerGoals;
    private String location;
    private String resumeUrl;

    public String getName() { return name; }
    public void setName(String name) { 
        this.name = name; 
        if (name != null && !name.trim().isEmpty() && (firstName == null || firstName.isEmpty())) {
            String[] parts = name.trim().split("\\s+", 2);
            this.firstName = parts[0];
            this.lastName = parts.length > 1 ? parts[1] : "";
        }
    }

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

    public Integer getYear() { 
        if (year != null) return year;
        if (academicYearStr != null) {
            String digits = academicYearStr.replaceAll("[^0-9]", "");
            if (!digits.isEmpty()) {
                try { return Integer.parseInt(digits); } catch (NumberFormatException ignored) {}
            }
        }
        return null;
    }
    public void setYear(Integer year) { this.year = year; }

    public String getAcademicYearStr() { return academicYearStr; }
    public void setAcademicYearStr(String academicYearStr) { this.academicYearStr = academicYearStr; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
}

