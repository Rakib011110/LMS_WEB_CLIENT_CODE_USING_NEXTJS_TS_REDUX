"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetQuizByIdQuery, useSubmitQuizAnswersMutation } from '@/app/redux/api/QuizApi/quizApi';
import { ArrowLeft, Clock, CheckCircle, Circle, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default function PublicQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  

  const { data, isLoading, error } = useGetQuizByIdQuery(quizId);
  const [submitQuizAnswers, { isLoading: isSubmitting }] = useSubmitQuizAnswersMutation();
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    if (!data) return;

    const { questions } = data;
    const unansweredQuestions = questions.filter(q => !selectedAnswers[q._id!]);
    
    if (unansweredQuestions?.length > 0) {
      const confirm = window.confirm(
        `You have ${unansweredQuestions?.length} unanswered questions. Submit anyway?`
      );
      if (!confirm) return;
    }

    try {
      const answers = Object.entries(selectedAnswers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId
      }));

      const result = await submitQuizAnswers({ quizId, answers }).unwrap();
      
      // Store result in sessionStorage for the result page
      sessionStorage.setItem('quizResult', JSON.stringify({
        quiz: data.quiz,
        result: result.result
      }));
      
      router.push(`/quiz-result/${quizId}`);
    } catch (error) {
      toast.error('Failed to submit quiz');
      console.error('Error submitting quiz:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-64 bg-gray-300 rounded-xl"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600">Error loading quiz. Please try again.</p>
          <Link href="/">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { quiz, questions } = data;
  const answeredCount = Object.keys(selectedAnswers)?.length;
  const totalQuestions = questions?.length;
  const totalMarks = questions?.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Progress: {answeredCount}/{totalQuestions}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Description */}
        <Card className="mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Quiz Instructions</h2>
            <div 
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: quiz.description }}
            />
            
            {quiz.descriptionImage && (
              <div className="mt-4">
                <img 
                  src={quiz.descriptionImage?.startsWith('http') ? quiz.descriptionImage : `http://localhost:5000/${quiz.descriptionImage}`} 
                  alt="Quiz Description" 
                  className="max-w-md rounded-lg shadow-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalMarks}</div>
                <div className="text-sm text-gray-600">Total Marks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{quiz.negativeMarkingPercentage}%</div>
                <div className="text-sm text-gray-600">Negative Marking</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-8 mb-8">
          {questions.map((question, index) => (
            <Card key={question._id} className="transition-all duration-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                  {selectedAnswers[question._id!] ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <Circle size={24} className="text-gray-400" />
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Question {index + 1} ({question.marks} marks)
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedAnswers[question._id!] 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedAnswers[question._id!] ? 'Answered' : 'Not Answered'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div 
                      className="text-gray-700 mb-3"
                      dangerouslySetInnerHTML={{ __html: question.questionText }}
                    />
                    {question.questionImage && (
                      <img 
                        src={question.questionImage?.startsWith('http') ? question.questionImage : `http://localhost:5000/${question.questionImage}`} 
                        alt={`Question ${index + 1}`}
                        className="max-w-md rounded-lg shadow-sm"
                      />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={option.id} 
                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedAnswers[question._id!] === option.id 
                            ? 'bg-blue-50 border-blue-300 shadow-sm' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleAnswerSelect(question._id!, option.id)}
                      >
                        <input 
                          type="radio" 
                          name={question._id} 
                          checked={selectedAnswers[question._id!] === option.id}
                          readOnly
                          className="form-radio text-blue-600 mt-1"
                        />
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <span className="font-medium text-gray-900">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <div className="ml-2 flex-grow">
                              <div 
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: option.text }}
                              />
                              {option.image && (
                                <img 
                                  src={option.image?.startsWith('http') ? option.image : `http://localhost:5000/${option.image}`} 
                                  alt={`Option ${optionIndex + 1}`}
                                  className="max-w-xs mt-2 rounded shadow-sm"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <Card className="sticky bottom-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} questions answered
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Quiz
                </>
              )}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
