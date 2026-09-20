package com.visionpath.studyplan.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "study_tasks")
public class StudyTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studyPlanId;

    @Column(nullable = false)
    private String taskName;

    @Column(columnDefinition = "TEXT")
    private String details;

    private LocalDate dueDate;
    private boolean completed = false;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudyPlanId() { return studyPlanId; }
    public void setStudyPlanId(Long studyPlanId) { this.studyPlanId = studyPlanId; }
    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
