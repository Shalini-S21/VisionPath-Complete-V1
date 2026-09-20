package com.visionpath.student.service;

import com.visionpath.student.dto.StudentProfileRequest;
import com.visionpath.student.entity.StudentInterest;
import com.visionpath.student.entity.StudentProfile;
import com.visionpath.student.entity.StudentSkill;
import com.visionpath.student.repository.StudentInterestRepository;
import com.visionpath.student.repository.StudentProfileRepository;
import com.visionpath.student.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentProfileRepository profileRepository;
    private final StudentSkillRepository skillRepository;
    private final StudentInterestRepository interestRepository;

    public StudentService(StudentProfileRepository profileRepository,
                          StudentSkillRepository skillRepository,
                          StudentInterestRepository interestRepository) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.interestRepository = interestRepository;
    }

    public StudentProfile getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    // Auto-create an empty profile
                    StudentProfile profile = new StudentProfile();
                    profile.setUserId(userId);
                    return profileRepository.save(profile);
                });
    }

    public StudentProfile updateProfile(Long userId, StudentProfileRequest request) {
        StudentProfile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile p = new StudentProfile();
                    p.setUserId(userId);
                    return p;
                });

        if (request.getFirstName() != null) profile.setFirstName(request.getFirstName());
        if (request.getLastName() != null) profile.setLastName(request.getLastName());
        if (request.getPhone() != null) profile.setPhone(request.getPhone());
        if (request.getCollege() != null) profile.setCollege(request.getCollege());
        if (request.getDegree() != null) profile.setDegree(request.getDegree());
        if (request.getDepartment() != null) profile.setDepartment(request.getDepartment());
        if (request.getYear() != null) profile.setYear(request.getYear());
        if (request.getCgpa() != null) profile.setCgpa(request.getCgpa());
        if (request.getCareerGoals() != null) profile.setCareerGoals(request.getCareerGoals());
        if (request.getLocation() != null) profile.setLocation(request.getLocation());
        if (request.getResumeUrl() != null) profile.setResumeUrl(request.getResumeUrl());
        if (request.getCounselorEmail() != null) profile.setCounselorEmail(request.getCounselorEmail());

        profile.setProfileCompletion(calculateCompletion(profile));
        return profileRepository.save(profile);
    }

    public StudentProfile getById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student profile not found with id: " + id));
    }

    @Transactional
    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }

    // Skills
    public StudentSkill addSkill(Long userId, String skillName, String proficiency) {
        StudentSkill skill = new StudentSkill();
        skill.setUserId(userId);
        skill.setSkillName(skillName);
        skill.setProficiency(proficiency);
        return skillRepository.save(skill);
    }

    public List<StudentSkill> getSkills(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    @Transactional
    public void deleteSkill(Long skillId, Long userId) {
        skillRepository.deleteByIdAndUserId(skillId, userId);
    }

    // Interests
    public StudentInterest addInterest(Long userId, String interest) {
        StudentInterest si = new StudentInterest();
        si.setUserId(userId);
        si.setInterest(interest);
        return interestRepository.save(si);
    }

    public List<StudentInterest> getInterests(Long userId) {
        return interestRepository.findByUserId(userId);
    }

    @Transactional
    public void deleteInterest(Long interestId, Long userId) {
        interestRepository.deleteByIdAndUserId(interestId, userId);
    }

    private int calculateCompletion(StudentProfile p) {
        int count = 0;
        if (p.getFirstName() != null) count++;
        if (p.getLastName() != null) count++;
        if (p.getCollege() != null) count++;
        if (p.getDegree() != null) count++;
        if (p.getDepartment() != null) count++;
        if (p.getCgpa() != null) count++;
        if (p.getCareerGoals() != null) count++;
        if (p.getLocation() != null) count++;
        if (p.getResumeUrl() != null) count++;
        return (count * 100) / 9;
    }
}
