"use client"

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Play, Clock, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDeleteQuizMutation, useGetQuizzesQuery } from '@/app/redux/api/QuizApi/quizApi';

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default function ManageQuizPage() {
  const { data, isLoading, error } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  const handleDeleteQuiz = async (quizId: string, quizTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${quizTitle}"?`)) {
      try {
        await deleteQuiz(quizId).unwrap();
        toast.success('Quiz deleted successfully');
      } catch (error) {
        toast.error('Failed to delete quiz');
      }
    }
  };

console.log(data)

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Error loading quizzes. Please try again.</p>
        </div>
      </div>
    );
  }

  const quizzes = data?.quizzes || [];
console.log("quizzes", quizzes)
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Quizzes</h1>
            <p className="text-gray-600 mt-2">Create, edit, and manage your quizzes</p>
          </div>
          <Link href="/dashboard/manage-quiz/create-quiz">
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              <PlusCircle size={20} />
              Create New Quiz
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Play className="text-green-600" size={24} />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quizzes.filter(quiz => {
                    const created = new Date(quiz.createdAt || '');
                    const daysDiff = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
                    return daysDiff <= 7;
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz List */}
        {quizzes.length === 0 ? (
          <Card className="p-12 text-center">
            <Award size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Quizzes Yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first quiz</p>
            <Link href="/dashboard/manage-quiz/create-quiz">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create Your First Quiz
              </button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {quiz.descriptionImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`http://localhost:5000/${quiz.descriptionImage}`} 
                      alt={quiz.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {quiz.title}
                  </h3>
                  
                  <div 
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: quiz.description }}
                  />
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Negative Marking: {quiz.negativeMarkingPercentage}%</span>
                    <span>
                      {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/dashboard/manage-quiz/quiz-details/${quiz._id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </Link>
                    
                    <button 
                      onClick={() => handleDeleteQuiz(quiz._id!, quiz.title)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete Quiz"
                    >
                      <Trash2 size={18} />
                    </button>
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