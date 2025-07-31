"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, Award, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions?: number;
  totalMarks: number;
  obtainedMarks: number;
  negativeMarks: number;
  percentage: number;
  results: {
    questionId: string;
    questionText: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    marksAwarded: number;
    feedback?: string;
  }[];
}

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  overallFeedback: string;
}

interface StoredQuizResult {
  quiz: Quiz;
  result: QuizResult;
}

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default function QuizResultPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  const [resultData, setResultData] = useState<StoredQuizResult | null>(null);

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('quizResult');
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult);
        setResultData(parsed);
      } catch (error) {
        console.error('Error parsing quiz result:', error);
        router.push(`/dashboard/manage-quiz/quiz-details/${quizId}`);
      }
    } else {
      // If no result found, redirect back to quiz
      router.push(`/dashboard/manage-quiz/quiz-details/${quizId}`);
    }
  }, [quizId, router]);

  if (!resultData) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  const { quiz, result } = resultData;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard/manage-quiz')}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
          </div>
        </div>

        {/* Quiz Title */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
          <div 
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: quiz.description }}
          />
        </Card>

        {/* Score Summary */}
        <Card className="mb-8">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(result.percentage)} mb-4`}>
              <span className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
                {result.percentage.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Score</h3>
            <p className="text-lg text-gray-600">
              {result.obtainedMarks} out of {result.totalMarks} marks
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">{result.correctAnswers}</p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <XCircle className="text-red-600 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{result.incorrectAnswers}</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="text-gray-600 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Unanswered</p>
              <p className="text-2xl font-bold text-gray-600">{result.unansweredQuestions || 0}</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="text-blue-600 w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600">{result.totalQuestions}</p>
            </div>
          </div>

          {result.negativeMarks > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm">
                <strong>Negative Marking:</strong> -{result.negativeMarks} marks deducted for incorrect answers
              </p>
            </div>
          )}
        </Card>

        {/* Detailed Results */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h3>
          <div className="space-y-6">
            {result.results.map((questionResult, index) => (
              <div key={questionResult.questionId} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {questionResult.isCorrect ? (
                      <CheckCircle className="text-green-600 w-6 h-6" />
                    ) : questionResult.selectedOptionId ? (
                      <XCircle className="text-red-600 w-6 h-6" />
                    ) : (
                      <Clock className="text-gray-400 w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Question {index + 1}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        questionResult.isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : questionResult.selectedOptionId
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {questionResult.marksAwarded > 0 
                          ? `+${questionResult.marksAwarded}` 
                          : questionResult.marksAwarded < 0
                          ? questionResult.marksAwarded
                          : '0'} marks
                      </span>
                    </div>

                    <div 
                      className="text-gray-700 mb-3"
                      dangerouslySetInnerHTML={{ __html: questionResult.questionText }}
                    />

                    <div className="space-y-2">
                      {!questionResult.selectedOptionId && (
                        <p className="text-gray-500 italic">No answer selected</p>
                      )}
                      
                      {questionResult.selectedOptionId && !questionResult.isCorrect && (
                        <p className="text-red-600">
                          <strong>Your answer:</strong> Option {questionResult.selectedOptionId}
                        </p>
                      )}
                      
                      <p className="text-green-600">
                        <strong>Correct answer:</strong> Option {questionResult.correctOptionId}
                      </p>

                      {questionResult.feedback && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-blue-800 text-sm">
                            <strong>Feedback:</strong> {questionResult.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Overall Feedback */}
        {quiz.overallFeedback && (
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Feedback</h3>
            <div 
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: quiz.overallFeedback }}
            />
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/dashboard/manage-quiz/quiz-details/${quizId}`}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <RotateCcw size={20} />
              Retake Quiz
            </button>
          </Link>
          
          <Link href="/dashboard/manage-quiz">
            <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              View All Quizzes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
