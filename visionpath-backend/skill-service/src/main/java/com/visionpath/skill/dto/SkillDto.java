package com.visionpath.skill.dto;

public class SkillDto {
    private Long id;
    private String name;
    private String category;
    private String description;

    public SkillDto() {
    }

    public SkillDto(Long id, String name, String category, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static SkillDtoBuilder builder() {
        return new SkillDtoBuilder();
    }

    public static class SkillDtoBuilder {
        private Long id;
        private String name;
        private String category;
        private String description;

        public SkillDtoBuilder id(Long id) { this.id = id; return this; }
        public SkillDtoBuilder name(String name) { this.name = name; return this; }
        public SkillDtoBuilder category(String category) { this.category = category; return this; }
        public SkillDtoBuilder description(String description) { this.description = description; return this; }

        public SkillDto build() {
            return new SkillDto(id, name, category, description);
        }
    }
}
