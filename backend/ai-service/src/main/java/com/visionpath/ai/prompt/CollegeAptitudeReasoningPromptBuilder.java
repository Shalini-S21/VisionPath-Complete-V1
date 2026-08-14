package com.visionpath.ai.prompt;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class CollegeAptitudeReasoningPromptBuilder {

    public String buildPrompt(String degree, String branch, String year, List<String> coreSubjects, int count) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are VisionPath AI College Aptitude & Core Domain Question Generator.\n");
        prompt.append("Generate ").append(Math.max(count, 10)).append(" high-quality multiple choice questions for a College Student.\n\n");
        prompt.append("STUDENT DEGREE: ").append(degree != null ? degree : "B.Tech").append("\n");
        prompt.append("STUDENT BRANCH/MAJOR: ").append(branch != null ? branch : "Computer Science & Engineering").append("\n");
        prompt.append("STUDENT YEAR: ").append(year != null ? year : "3rd Year").append("\n");
        prompt.append("CORE SUBJECTS: ").append(coreSubjects != null && !coreSubjects.isEmpty() ? String.join(", ", coreSubjects) : "Data Structures, DBMS, Operating Systems, Computer Networks").append("\n\n");

        prompt.append("EXACT 10-QUESTION DISTRIBUTION MANDATE:\n");
        prompt.append("1. Quantitative Aptitude (3 questions): Percentages, Ratios, Speed & Distance, Probability, Work & Time.\n");
        prompt.append("2. Logical Reasoning (3 questions): Sequences, Analytical Deduction, Patterns, Verbal Reasoning.\n");
        prompt.append("3. Core Domain (4 questions): ONLY from the student's actual branch (").append(branch != null ? branch : "CSE").append(") and core subjects listed above. DO NOT give CSE questions to ECE/Mech/Civil students.\n\n");

        prompt.append("CRITICAL INSTRUCTIONS:\n");
        prompt.append("- Every question MUST have 4 options and exactly ONE authoritative correct answer.\n");
        prompt.append("- Difficulty must match college undergrad level.\n");
        prompt.append("- Return ONLY valid JSON matching this exact structure without markdown formatting:\n");
        prompt.append("{\n");
        prompt.append("  \"assessmentType\": \"COLLEGE_APTITUDE_DOMAIN\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"id\": 1,\n");
        prompt.append("      \"category\": \"APTITUDE\",\n");
        prompt.append("      \"subject\": \"Quantitative Aptitude\",\n");
        prompt.append("      \"question\": \"If a work item is completed by 6 engineers in 10 days, how many days will 15 engineers take at equal efficiency?\",\n");
        prompt.append("      \"options\": [\"4 Days\", \"5 Days\", \"3 Days\", \"6 Days\"],\n");
        prompt.append("      \"correctAnswer\": \"4 Days\",\n");
        prompt.append("      \"explanation\": \"Total Work = 6 * 10 = 60 man-days. Time = 60 / 15 = 4 Days.\",\n");
        prompt.append("      \"difficulty\": \"MEDIUM\"\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n");

        return prompt.toString();
    }
}
