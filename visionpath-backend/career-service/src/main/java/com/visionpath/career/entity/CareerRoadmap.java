package com.visionpath.career.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "career_roadmaps")
public class CareerRoadmap {

    @Id
    private String id; // rd_1

    private String title;
    private String role;
    private Integer matchPercentage;
    private String difficulty;
    private String duration;
    private Integer modulesCount;

    @Column(length = 1000)
    private String description;
    private String icon;

    @ElementCollection
    private List<String> keySkills;

    public CareerRoadmap() {
    }

    public CareerRoadmap(String id, String title, String role, Integer matchPercentage, String difficulty, String duration, Integer modulesCount, String description, String icon, List<String> keySkills) {
        this.id = id;
        this.title = title;
        this.role = role;
        this.matchPercentage = matchPercentage;
        this.difficulty = difficulty;
        this.duration = duration;
        this.modulesCount = modulesCount;
        this.description = description;
        this.icon = icon;
        this.keySkills = keySkills;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Integer matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getModulesCount() {
        return modulesCount;
    }

    public void setModulesCount(Integer modulesCount) {
        this.modulesCount = modulesCount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<String> getKeySkills() {
        return keySkills;
    }

    public void setKeySkills(List<String> keySkills) {
        this.keySkills = keySkills;
    }

    public static CareerRoadmapBuilder builder() {
        return new CareerRoadmapBuilder();
    }

    public static class CareerRoadmapBuilder {
        private String id;
        private String title;
        private String role;
        private Integer matchPercentage;
        private String difficulty;
        private String duration;
        private Integer modulesCount;
        private String description;
        private String icon;
        private List<String> keySkills;

        public CareerRoadmapBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CareerRoadmapBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CareerRoadmapBuilder role(String role) {
            this.role = role;
            return this;
        }

        public CareerRoadmapBuilder matchPercentage(Integer matchPercentage) {
            this.matchPercentage = matchPercentage;
            return this;
        }

        public CareerRoadmapBuilder difficulty(String difficulty) {
            this.difficulty = difficulty;
            return this;
        }

        public CareerRoadmapBuilder duration(String duration) {
            this.duration = duration;
            return this;
        }

        public CareerRoadmapBuilder modulesCount(Integer modulesCount) {
            this.modulesCount = modulesCount;
            return this;
        }

        public CareerRoadmapBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CareerRoadmapBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public CareerRoadmapBuilder keySkills(List<String> keySkills) {
            this.keySkills = keySkills;
            return this;
        }

        public CareerRoadmap build() {
            return new CareerRoadmap(id, title, role, matchPercentage, difficulty, duration, modulesCount, description, icon, keySkills);
        }
    }
}
