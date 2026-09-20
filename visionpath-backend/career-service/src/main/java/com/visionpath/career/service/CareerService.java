package com.visionpath.career.service;

import com.visionpath.career.entity.Career;
import com.visionpath.career.repository.CareerRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CareerService {

    private static final Logger log = LoggerFactory.getLogger(CareerService.class);

    private final CareerRepository careerRepository;

    public CareerService(CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    @PostConstruct
    public void seedCareers() {
        if (careerRepository.count() == 0) {
            List<Career> careers = Arrays.asList(
                createCareer("Java Developer", "Technology", "Java,Spring Boot,SQL,REST APIs",
                    "B.Tech/B.E. in CS or IT", "₹6L - ₹20L per year", "High",
                    "Design and develop Java-based enterprise applications"),
                createCareer("Python Developer", "Technology", "Python,Django,Flask,Machine Learning",
                    "B.Tech/B.E. in CS or IT", "₹5L - ₹18L per year", "High",
                    "Build automation scripts, web apps, and data pipelines"),
                createCareer("Data Scientist", "Data & AI", "Python,Machine Learning,Statistics,SQL,TensorFlow",
                    "B.Tech + M.Tech or MBA Analytics", "₹8L - ₹25L per year", "High",
                    "Analyze large datasets and build predictive models"),
                createCareer("Cybersecurity Analyst", "Security", "Networking,Ethical Hacking,SIEM,Python",
                    "B.Tech in CS or Cybersecurity Certification", "₹6L - ₹22L per year", "High",
                    "Protect systems and networks from cyber threats"),
                createCareer("Cloud Engineer", "Cloud", "AWS,Azure,GCP,Docker,Kubernetes,Terraform",
                    "B.Tech + Cloud Certifications (AWS/Azure)", "₹8L - ₹28L per year", "High",
                    "Design and manage cloud infrastructure"),
                createCareer("Frontend Developer", "Technology", "React,JavaScript,HTML,CSS,TypeScript",
                    "B.Tech or any degree with frontend skills", "₹4L - ₹16L per year", "High",
                    "Build user interfaces and web applications"),
                createCareer("Backend Developer", "Technology", "Node.js,Java,Python,Databases,REST APIs",
                    "B.Tech/B.E. in CS or IT", "₹5L - ₹18L per year", "High",
                    "Design server-side logic and APIs"),
                createCareer("UI/UX Designer", "Design", "Figma,Adobe XD,User Research,Prototyping",
                    "Any degree + Design courses", "₹4L - ₹15L per year", "Medium",
                    "Design user-friendly digital experiences")
            );
            careerRepository.saveAll(careers);
            log.info("Career seed data loaded.");
        }
    }

    private Career createCareer(String title, String category, String skills,
                                String education, String salary, String demand, String desc) {
        Career c = new Career();
        c.setTitle(title);
        c.setCategory(category);
        c.setRequiredSkills(skills);
        c.setEducation(education);
        c.setAverageSalary(salary);
        c.setDemandLevel(demand);
        c.setDescription(desc);
        c.setGrowthRate("15-20% annually");
        c.setFutureScope("Strong demand expected through 2030");
        return c;
    }

    public List<Career> getAll() {
        return careerRepository.findAll();
    }

    public Career getById(Long id) {
        return careerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));
    }

    public Career create(Career career) {
        return careerRepository.save(career);
    }

    public Career update(Long id, Career career) {
        Career existing = getById(id);
        if (career.getTitle() != null) existing.setTitle(career.getTitle());
        if (career.getDescription() != null) existing.setDescription(career.getDescription());
        if (career.getCategory() != null) existing.setCategory(career.getCategory());
        if (career.getRequiredSkills() != null) existing.setRequiredSkills(career.getRequiredSkills());
        if (career.getAverageSalary() != null) existing.setAverageSalary(career.getAverageSalary());
        if (career.getDemandLevel() != null) existing.setDemandLevel(career.getDemandLevel());
        return careerRepository.save(existing);
    }

    public void delete(Long id) {
        careerRepository.deleteById(id);
    }

    public List<Career> search(String keyword) {
        return careerRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    public List<String> getCategories() {
        return careerRepository.findAllCategories();
    }

    // Simple recommendation: match student's skills to career required skills
    public List<Career> getRecommendations(String studentSkills) {
        List<Career> allCareers = careerRepository.findAll();
        if (studentSkills == null || studentSkills.isBlank()) {
            return allCareers.subList(0, Math.min(3, allCareers.size()));
        }
        String[] skills = studentSkills.toLowerCase().split(",");
        return allCareers.stream()
                .filter(c -> {
                    String required = c.getRequiredSkills() != null ? c.getRequiredSkills().toLowerCase() : "";
                    for (String skill : skills) {
                        if (required.contains(skill.trim())) return true;
                    }
                    return false;
                })
                .toList();
    }
}
