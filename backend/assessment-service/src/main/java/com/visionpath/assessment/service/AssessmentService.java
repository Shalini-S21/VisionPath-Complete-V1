package com.visionpath.assessment.service;

import com.visionpath.assessment.entity.Assessment;
import com.visionpath.assessment.entity.AssessmentResult;
import com.visionpath.assessment.entity.Question;
import com.visionpath.assessment.repository.AssessmentRepository;
import com.visionpath.assessment.repository.AssessmentResultRepository;
import com.visionpath.assessment.repository.QuestionRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AssessmentService {

    private static final Logger log = LoggerFactory.getLogger(AssessmentService.class);

    private final AssessmentRepository assessmentRepository;
    private final QuestionRepository questionRepository;
    private final AssessmentResultRepository resultRepository;

    public AssessmentService(AssessmentRepository assessmentRepository,
                             QuestionRepository questionRepository,
                             AssessmentResultRepository resultRepository) {
        this.assessmentRepository = assessmentRepository;
        this.questionRepository = questionRepository;
        this.resultRepository = resultRepository;
    }

    @PostConstruct
    public void seedData() {
        if (assessmentRepository.count() == 0) {
            // Career Assessment
            Assessment career = new Assessment();
            career.setTitle("Career Interest Assessment");
            career.setDescription("Find the best career match based on your interests and skills");
            career.setType("CAREER");
            career.setDuration(20);
            career.setTotalQuestions(5);
            career = assessmentRepository.save(career);

            addQuestion(career.getId(), "Which activity do you enjoy most?",
                "Coding and solving technical problems", "Designing user interfaces",
                "Analyzing data and statistics", "Managing people and projects", "A");

            addQuestion(career.getId(), "What is your strongest subject?",
                "Mathematics and Logic", "Arts and Design",
                "Science and Research", "Communication and Leadership", "A");

            addQuestion(career.getId(), "Which environment do you prefer to work in?",
                "Startup with fast pace", "Large corporate company",
                "Remote freelancing", "Government / Research institution", "B");

            addQuestion(career.getId(), "What motivates you most at work?",
                "Building innovative products", "Earning a high salary",
                "Making social impact", "Continuous learning", "D");

            addQuestion(career.getId(), "How do you handle complex problems?",
                "Break them into smaller parts", "Ask for help immediately",
                "Try different approaches until it works", "Avoid them if possible", "A");

            // Aptitude Assessment
            Assessment aptitude = new Assessment();
            aptitude.setTitle("General Aptitude Test");
            aptitude.setDescription("Test your logical reasoning and numerical ability");
            aptitude.setType("APTITUDE");
            aptitude.setDuration(15);
            aptitude.setTotalQuestions(5);
            aptitude = assessmentRepository.save(aptitude);

            addQuestion(aptitude.getId(), "If 2x + 5 = 15, what is x?",
                "3", "5", "4", "10", "B");
            addQuestion(aptitude.getId(), "Which number comes next: 2, 4, 8, 16, ?",
                "20", "24", "32", "64", "C");
            addQuestion(aptitude.getId(), "A train travels 60 km in 1 hour. How far in 2.5 hours?",
                "120 km", "150 km", "180 km", "100 km", "B");
            addQuestion(aptitude.getId(), "What is 15% of 200?",
                "25", "30", "35", "40", "B");
            addQuestion(aptitude.getId(), "Which is the odd one out: Circle, Square, Triangle, Cylinder?",
                "Circle", "Square", "Triangle", "Cylinder", "D");

            log.info("Assessment seed data loaded.");
        }
    }

    private void addQuestion(Long assessmentId, String text, String a, String b, String c, String d, String correct) {
        Question q = new Question();
        q.setAssessmentId(assessmentId);
        q.setQuestionText(text);
        q.setOptionA(a);
        q.setOptionB(b);
        q.setOptionC(c);
        q.setOptionD(d);
        q.setCorrectAnswer(correct);
        questionRepository.save(q);
    }

    public List<Assessment> getAll() { return assessmentRepository.findAll(); }

    public Assessment getById(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found with id: " + id));
    }

    public Assessment create(Assessment assessment) { return assessmentRepository.save(assessment); }

    public Assessment update(Long id, Assessment assessment) {
        Assessment existing = getById(id);
        if (assessment.getTitle() != null) existing.setTitle(assessment.getTitle());
        if (assessment.getType() != null) existing.setType(assessment.getType());
        return assessmentRepository.save(existing);
    }

    // Return questions WITHOUT correctAnswer for student view
    public List<Map<String, Object>> getQuestionsForStudent(Long assessmentId) {
        List<Question> questions = questionRepository.findByAssessmentId(assessmentId);
        return questions.stream().map(q -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", q.getId());
            map.put("questionText", q.getQuestionText());
            map.put("optionA", q.getOptionA());
            map.put("optionB", q.getOptionB());
            map.put("optionC", q.getOptionC());
            map.put("optionD", q.getOptionD());
            return map;
        }).toList();
    }

    // Submit: answers = { questionId: "A", questionId: "B", ... }
    public AssessmentResult submit(Long assessmentId, Long userId, Map<Long, String> answers) {
        List<Question> questions = questionRepository.findByAssessmentId(assessmentId);

        int score = 0;
        int correctCount = 0;
        int incorrectCount = 0;
        int unansweredCount = 0;
        int totalMarks = questions.size() > 0 ? questions.size() : 10;

        for (Question q : questions) {
            String studentAnswer = answers.get(q.getId());
            if (studentAnswer == null || studentAnswer.trim().isEmpty()) {
                unansweredCount++;
            } else if (q.getCorrectAnswer() != null && (q.getCorrectAnswer().equalsIgnoreCase(studentAnswer.trim()) || isMatchingOption(q, studentAnswer.trim()))) {
                score++;
                correctCount++;
            } else {
                incorrectCount++;
            }
        }

        // If no questions in DB, evaluate based on submitted answers count vs correct
        if (questions.isEmpty() && answers != null && !answers.isEmpty()) {
            totalMarks = answers.size();
            for (String ans : answers.values()) {
                if (ans == null || ans.trim().isEmpty()) {
                    unansweredCount++;
                } else {
                    score++;
                    correctCount++;
                }
            }
        }

        int percentage = totalMarks > 0 ? (score * 100) / totalMarks : 0;
        String grade;
        if (percentage >= 90) grade = "A";
        else if (percentage >= 75) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 40) grade = "D";
        else grade = "F";

        AssessmentResult result = new AssessmentResult();
        result.setUserId(userId);
        result.setAssessmentId(assessmentId);
        result.setScore(score);
        result.setTotalMarks(totalMarks);
        result.setPercentage(percentage);
        result.setCorrectCount(correctCount);
        result.setIncorrectCount(incorrectCount);
        result.setUnansweredCount(unansweredCount);
        result.setGrade(grade);
        return resultRepository.save(result);
    }

    private boolean isMatchingOption(Question q, String studentAnswer) {
        if (studentAnswer == null) return false;
        String correct = q.getCorrectAnswer();
        if ("A".equalsIgnoreCase(correct) && q.getOptionA() != null && q.getOptionA().equalsIgnoreCase(studentAnswer)) return true;
        if ("B".equalsIgnoreCase(correct) && q.getOptionB() != null && q.getOptionB().equalsIgnoreCase(studentAnswer)) return true;
        if ("C".equalsIgnoreCase(correct) && q.getOptionC() != null && q.getOptionC().equalsIgnoreCase(studentAnswer)) return true;
        if ("D".equalsIgnoreCase(correct) && q.getOptionD() != null && q.getOptionD().equalsIgnoreCase(studentAnswer)) return true;
        return false;
    }

    public List<AssessmentResult> getResults(Long userId) {
        return resultRepository.findByUserId(userId);
    }
}
