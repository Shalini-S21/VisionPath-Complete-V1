package com.visionpath.studyplan.service;

import com.visionpath.studyplan.entity.StudyPlan;
import com.visionpath.studyplan.entity.StudyTask;
import com.visionpath.studyplan.repository.StudyPlanRepository;
import com.visionpath.studyplan.repository.StudyTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyPlanService {

    private final StudyPlanRepository planRepository;
    private final StudyTaskRepository taskRepository;

    public StudyPlanService(StudyPlanRepository planRepository, StudyTaskRepository taskRepository) {
        this.planRepository = planRepository;
        this.taskRepository = taskRepository;
    }

    public List<StudyPlan> getPlansByUser(Long userId) {
        return planRepository.findByUserId(userId);
    }

    public java.util.Map<String, Object> getStudentProgress(Long userId) {
        List<StudyPlan> plans = planRepository.findByUserId(userId);
        int totalTasks = 0;
        int completedTasks = 0;

        for(StudyPlan p : plans) {
            List<StudyTask> tasks = taskRepository.findByStudyPlanId(p.getId());
            totalTasks += tasks.size();
            completedTasks += (int) tasks.stream().filter(StudyTask::isCompleted).count();
        }

        java.util.Map<String, Object> progress = new java.util.HashMap<>();
        progress.put("totalTasks", totalTasks);
        progress.put("completedTasks", completedTasks);
        progress.put("overallProgress", totalTasks == 0 ? 0 : (completedTasks * 100) / totalTasks);
        return progress;
    }

    public StudyPlan getPlanById(Long id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Study plan not found"));
    }

    public StudyPlan createPlan(StudyPlan plan) {
        List<StudyTask> tasksToSave = plan.getTasks();
        plan.setTasks(new java.util.ArrayList<>());
        StudyPlan savedPlan = planRepository.save(plan);

        if (tasksToSave != null && !tasksToSave.isEmpty()) {
            for (StudyTask task : tasksToSave) {
                task.setStudyPlanId(savedPlan.getId());
                taskRepository.save(task);
            }
            updateProgress(savedPlan);
        }
        return getPlanById(savedPlan.getId());
    }

    public StudyPlan updatePlan(Long id, StudyPlan updated) {
        StudyPlan existing = getPlanById(id);
        if (updated.getTitle() != null) existing.setTitle(updated.getTitle());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        if (updated.getTargetGoal() != null) existing.setTargetGoal(updated.getTargetGoal());
        if (updated.getStartDate() != null) existing.setStartDate(updated.getStartDate());
        if (updated.getEndDate() != null) existing.setEndDate(updated.getEndDate());
        return planRepository.save(existing);
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    // Tasks
    public StudyTask addTask(Long planId, StudyTask task) {
        StudyPlan plan = getPlanById(planId);
        task.setStudyPlanId(plan.getId());
        StudyTask saved = taskRepository.save(task);
        updateProgress(plan);
        return saved;
    }

    public StudyTask updateTask(Long taskId, StudyTask updated) {
        StudyTask existing = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (updated.getTaskName() != null) existing.setTaskName(updated.getTaskName());
        if (updated.getDetails() != null) existing.setDetails(updated.getDetails());
        if (updated.getDueDate() != null) existing.setDueDate(updated.getDueDate());

        // Update completion status and progress
        boolean statusChanged = existing.isCompleted() != updated.isCompleted();
        existing.setCompleted(updated.isCompleted());
        StudyTask saved = taskRepository.save(existing);

        if (statusChanged) {
            StudyPlan plan = getPlanById(existing.getStudyPlanId());
            updateProgress(plan);
        }

        return saved;
    }

    public void deleteTask(Long taskId) {
        StudyTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        Long planId = task.getStudyPlanId();
        taskRepository.deleteById(taskId);
        updateProgress(getPlanById(planId));
    }

    private void updateProgress(StudyPlan plan) {
        List<StudyTask> tasks = taskRepository.findByStudyPlanId(plan.getId());
        if (tasks.isEmpty()) {
            plan.setProgressPercentage(0);
        } else {
            long completed = tasks.stream().filter(StudyTask::isCompleted).count();
            int percent = (int) ((completed * 100) / tasks.size());
            plan.setProgressPercentage(percent);
        }
        planRepository.save(plan);
    }
}
