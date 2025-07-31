"use client"

import React from 'react';
import Link from 'next/link';
import { useGetQuizzesQuery } from '@/app/redux/api/QuizApi/quizApi';
import { Clock, Award, Users, Play } from 'lucide-react';

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default function QuizSelection() {
  const { data, isLoading, error } = useGetQuizzesQuery();
  console.log("quized",data);
  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Error loading quizzes. Please try again.</p>
        </div>
      </div>
    );
  }

  const quizzes = data.quizzes || [];
console.log("quizzes", quizzes);
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Test Your Knowledge</h2>
          <p className="text-xl text-gray-600">Choose from our available quizzes and challenge yourself</p>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No quizzes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz : any) => (
              <Card key={quiz._id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  {/* Quiz Image */}
                  {quiz.descriptionImage && (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <img 
                        src={quiz.descriptionImage?.startsWith('http') ? quiz.descriptionImage : `http://localhost:5000/${quiz.descriptionImage}`} 
                        alt={quiz.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Quiz Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{quiz.description}</p>
                  </div>

                  {/* Quiz Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1">
                        <Award className="text-blue-600" size={16} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Questions</p>
                      <p className="text-xs text-gray-500">Multiple</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mx-auto mb-1">
                        <Clock className="text-red-600" size={16} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{quiz.negativeMarkingPercentage}%</p>
                      <p className="text-xs text-gray-500">Negative</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link href={`/dashboard/manage-quiz/quiz-details/${quiz._id}`}>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        View Details
                      </button>
                    </Link>
                    
                    <Link href={`/give-quiz/${quiz._id}`}>
                      <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        <Play size={16} />
                        Take Quiz
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}