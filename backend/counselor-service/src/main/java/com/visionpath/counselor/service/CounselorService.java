package com.visionpath.counselor.service;

import com.visionpath.counselor.entity.Appointment;
import com.visionpath.counselor.entity.CounselorProfile;
import com.visionpath.counselor.repository.AppointmentRepository;
import com.visionpath.counselor.repository.CounselorProfileRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CounselorService {

    private static final Logger log = LoggerFactory.getLogger(CounselorService.class);

    private final CounselorProfileRepository profileRepository;
    private final AppointmentRepository appointmentRepository;

    public CounselorService(CounselorProfileRepository profileRepository, AppointmentRepository appointmentRepository) {
        this.profileRepository = profileRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @PostConstruct
    public void seedCounselors() {
        if (profileRepository.count() == 0) {
            CounselorProfile cp = new CounselorProfile();
            cp.setUserId(3L); // Assuming user 3 is Dr. Sarah from auth-service
            cp.setName("Dr. Sarah Counselor");
            cp.setTitle("Senior Career Advisor");
            cp.setSpecialization("Tech Careers, Study Abroad");
            cp.setBio("10+ years helping students transition into software engineering and data science.");
            cp.setExperienceYears(12);
            cp.setRating(4.9);
            cp.setTotalReviews(150);
            cp.setContactEmail("sarah@visionpath.com");
            cp.setContactPhone("9000000003");
            profileRepository.save(cp);
            log.info("Counselor seed data loaded.");
        }
    }

    public List<CounselorProfile> getAllCounselors() {
        return profileRepository.findAll();
    }

    public CounselorProfile getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    CounselorProfile cp = new CounselorProfile();
                    cp.setUserId(userId);
                    return profileRepository.save(cp);
                });
    }

    public CounselorProfile updateProfile(Long userId, CounselorProfile updated) {
        CounselorProfile cp = getProfile(userId);
        if (updated.getName() != null) cp.setName(updated.getName());
        if (updated.getTitle() != null) cp.setTitle(updated.getTitle());
        if (updated.getSpecialization() != null) cp.setSpecialization(updated.getSpecialization());
        if (updated.getBio() != null) cp.setBio(updated.getBio());
        if (updated.getExperienceYears() != null) cp.setExperienceYears(updated.getExperienceYears());
        if (updated.getContactEmail() != null) cp.setContactEmail(updated.getContactEmail());
        if (updated.getContactPhone() != null) cp.setContactPhone(updated.getContactPhone());
        if (updated.getInstitution() != null) cp.setInstitution(updated.getInstitution());
        if (updated.getQualification() != null) cp.setQualification(updated.getQualification());
        return profileRepository.save(cp);
    }


    // Appointments
    public Appointment bookAppointment(Appointment appointment) {
        appointment.setStatus("SCHEDULED");
        // Mock meeting link for demo
        appointment.setMeetingLink("https://meet.visionpath.com/apt-" + System.currentTimeMillis());
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getStudentAppointments(Long studentId) {
        return appointmentRepository.findByStudentId(studentId);
    }

    public List<Appointment> getCounselorAppointments(Long counselorId) {
        return appointmentRepository.findByCounselorId(counselorId);
    }

    public Appointment updateAppointmentStatus(Long id, String status) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        apt.setStatus(status);
        return appointmentRepository.save(apt);
    }
}
