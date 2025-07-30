"use client"

import React from 'react';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">Courses</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
      >
        <p className="text-gray-500">Content for the Courses page will be displayed here.</p>
      </motion.div>
    </main>
  );
}