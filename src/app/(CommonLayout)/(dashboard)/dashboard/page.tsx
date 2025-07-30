"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserPlus, BarChart2, ArrowUpRight, PlusCircle } from 'lucide-react';

// Mock data
const statsCards = [
  { title: 'Total Students', value: '1,250', change: '+15%', icon: <Users size={24} className="text-blue-500" /> },
  { title: 'Active Courses', value: '48', change: '+5', icon: <BookOpen size={24} className="text-green-500" /> },
  { title: 'New Sign-ups (Month)', value: '82', change: '+22%', icon: <UserPlus size={24} className="text-indigo-500" /> },
  { title: 'Completion Rate', value: '78%', change: '-2%', icon: <BarChart2 size={24} className="text-amber-500" /> },
];

const recentStudents = [
  { id: 1, name: 'Eva Green', email: 'eva.g@example.com', joined: '2 days ago', avatarUrl: 'https://placehold.co/100x100/FEEBC8/9C4221?text=EG' },
  { id: 2, name: 'Leo Martinez', email: 'leo.m@example.com', joined: '3 days ago', avatarUrl: 'https://placehold.co/100x100/C6F6D5/2F855A?text=LM' },
  { id: 3, name: 'Mia Thompson', email: 'mia.t@example.com', joined: '5 days ago', avatarUrl: 'https://placehold.co/100x100/BEE3F8/2A4365?text=MT' },
];

const courseOverview = [
  { id: 1, title: 'Advanced React Patterns', enrolled: 120, instructor: 'Jane Doe', status: 'Published' },
  { id: 2, title: 'UI/UX Design Fundamentals', enrolled: 250, instructor: 'John Smith', status: 'Published' },
  { id: 3, title: 'Next.js for Production', enrolled: 95, instructor: 'Sam Wilson', status: 'Draft' },
];

const DashboardCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <DashboardCard key={index}>
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">{card.icon}</div>
            </div>
            <div className={`flex items-center text-sm mt-4 ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              <ArrowUpRight size={16} className={`${card.change.startsWith('+') ? '' : 'rotate-90'}`} />
              <span>{card.change} this month</span>
            </div>
          </DashboardCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <DashboardCard className="xl:col-span-2">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Course Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Course Title</th>
                  <th className="px-4 py-3">Instructor</th>
                  <th className="px-4 py-3 text-center">Enrolled</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {courseOverview.map(course => (
                  <tr key={course.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{course.title}</td>
                    <td className="px-4 py-3">{course.instructor}</td>
                    <td className="px-4 py-3 text-center">{course.enrolled}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">New Students</h3>
          <ul className="space-y-4">
            {recentStudents.map(student => (
              <li key={student.id} className="flex items-center gap-4">
                <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-sm text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.email}</p>
                </div>
                <p className="text-xs text-gray-500 ml-auto">{student.joined}</p>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </main>
  );
}