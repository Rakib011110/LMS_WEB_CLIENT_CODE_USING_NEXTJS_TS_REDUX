"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const quizData = [
  { id: 1, title: 'React Fundamentals Quiz', course: 'Advanced React Patterns', questions: 15, status: 'Active' },
  { id: 2, title: 'UX Principles Assessment', course: 'UI/UX Design Fundamentals', questions: 20, status: 'Active' },
  { id: 3, title: 'Mid-term Next.js Exam', course: 'Next.js for Production', questions: 25, status: 'Draft' },
];

export default function QuizzesPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">Quizzes</h2>
    <Link href={"/dashboard/manage-quiz/create-quiz"} className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
      <PlusCircle size={20} />
      Create New Quiz
    </Link>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Quiz Title</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3 text-center">Questions</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map(quiz => (
                <tr key={quiz.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{quiz.title}</td>
                  <td className="px-4 py-3">{quiz.course}</td>
                  <td className="px-4 py-3 text-center">{quiz.questions}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
}