package com.visionpath.studyplan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plan_steps")
public class PlanStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String status; // completed, in-progress, pending
    private String duration;
    private Integer stepOrder;

    public PlanStep() {
    }

    public PlanStep(Long id, String title, String status, String duration, Integer stepOrder) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.duration = duration;
        this.stepOrder = stepOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public static PlanStepBuilder builder() {
        return new PlanStepBuilder();
    }

    public static class PlanStepBuilder {
        private Long id;
        private String title;
        private String status;
        private String duration;
        private Integer stepOrder;

        public PlanStepBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PlanStepBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PlanStepBuilder status(String status) {
            this.status = status;
            return this;
        }

        public PlanStepBuilder duration(String duration) {
            this.duration = duration;
            return this;
        }

        public PlanStepBuilder stepOrder(Integer stepOrder) {
            this.stepOrder = stepOrder;
            return this;
        }

        public PlanStep build() {
            return new PlanStep(id, title, status, duration, stepOrder);
        }
    }
}
