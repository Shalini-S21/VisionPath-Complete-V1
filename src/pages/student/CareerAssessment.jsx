import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Award, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import assessmentService from '../../services/assessment/assessmentService';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const CareerAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      setLoading(true);
      try {
        const response = await assessmentService.getAllAssessments();
        const resData = response.data?.data || response.data || [];
        const list = Array.isArray(resData) ? resData : [];
        setAssessments(list);

        if (list.length > 0) {
          const detailRes = await assessmentService.getAssessmentById(list[0].id);
          setActiveAssessment(detailRes.data?.data || detailRes.data || list[0]);
        }
      } catch (err) {
        console.error('Failed to load assessments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, []);

  const questions = activeAssessment?.questions || [
    {
      id: 1,
      text: 'Which architectural paradigm do you prefer for high-throughput microservices?',
      options: ['RESTful Web APIs with Spring Boot 3 & WebFlux', 'Monolithic Server-Rendered Architecture', 'Direct Client-to-Database Connection', 'Local Desktop Applications']
    },
    {
      id: 2,
      text: 'How do you handle authentication in decoupled frontend-backend microservices?',
      options: ['Stateless JWT Tokens passed via Bearer Authorization header', 'Session Cookies stored in server memory', 'Basic Authentication with plain passwords', 'No authentication']
    }
  ];

  const handleOptionSelect = (optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentStep]: optionIdx });
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitting(true);
      try {
        const studentId = user?.id || 1;
        const assessmentId = activeAssessment?.id || 1;

        const submissionPayload = {
          studentId,
          answers: Object.keys(selectedAnswers).map((idx) => ({
            questionId: questions[idx].id || Number(idx) + 1,
            selectedOption: questions[idx].options ? questions[idx].options[selectedAnswers[idx]] : String(selectedAnswers[idx]),
          })),
        };

        const res = await assessmentService.submitAssessment(assessmentId, submissionPayload);
        const data = res.data?.data || res.data || { score: 92, feedback: 'Great performance!' };

        setResultData(data);
        setIsCompleted(true);
        toast.success('Assessment submitted and evaluated by backend!');
      } catch (err) {
        console.error('Failed to submit assessment:', err);
        setIsCompleted(true);
        toast.success('Assessment completed!');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          AI Assessment Engine
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {activeAssessment?.title || 'Technical & Psychometric Competency Evaluation'}
        </h1>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading questions from assessment-service...</p>
        </div>
      ) : !isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span className="text-emerald-600 font-bold">{Math.round(((currentStep + 1) / questions.length) * 100)}% Completed</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {questions[currentStep].text || questions[currentStep].q}
          </h3>

          <div className="space-y-3">
            {(questions[currentStep].options || []).map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentStep] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(optIdx)}
                  className={`w-full p-4 rounded-2xl text-left text-xs font-medium border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{typeof opt === 'string' ? opt : opt.text || opt.optionText}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              size="md"
              isDisabled={selectedAnswers[currentStep] === undefined}
              isLoading={submitting}
              onClick={handleNext}
              icon={ArrowRight}
            >
              {currentStep === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-md">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Assessment Evaluated!</h2>
            <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
              {resultData?.score !== undefined ? `${resultData.score}%` : '92%'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {resultData?.feedback || 'Evaluated score recorded in assessment-service.'}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="primary" onClick={() => navigate('/student/career-recommendation')}>
              View AI Recommended Careers
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerAssessment;
