'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Student data with photos and information
interface Student {
  id: number;
  name: string;
  course: string;
  image: string;
  company: string;
}

interface DisplayedStudent extends Student {
  position: { row: number; col: number };
  key: string;
}

const students: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    course: "Web Development",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    company: "Tech Corp"
  },
  {
    id: 2,
    name: "Sarah Chen",
    course: "Data Science",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612e672?w=300&h=300&fit=crop&crop=face",
    company: "Data Inc"
  },
  {
    id: 3,
    name: "Michael Brown",
    course: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    company: "Design Studio"
  },
  {
    id: 4,
    name: "Emily Davis",
    course: "Mobile Development",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    company: "App Solutions"
  },
  {
    id: 5,
    name: "David Wilson",
    course: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    company: "SecureNet"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    course: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    company: "Cloud Systems"
  },
  {
    id: 7,
    name: "James Garcia",
    course: "AI/ML",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    company: "AI Labs"
  },
  {
    id: 8,
    name: "Anna Rodriguez",
    course: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    company: "Marketing Pro"
  },
  {
    id: 9,
    name: "Kevin Lee",
    course: "DevOps",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    company: "DevOps Inc"
  },
  {
    id: 10,
    name: "Rachel Kim",
    course: "Product Management",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    company: "Product Hub"
  },
  {
    id: 11,
    name: "Tom Anderson",
    course: "Blockchain",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    company: "Crypto Solutions"
  },
  {
    id: 15,
    name: "Tom Anderson",
    course: "Blockchain",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    company: "Crypto Solutions"
  },
  {
    id: 14,
    name: "Tom Anderson",
    course: "Blockchain",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    company: "Crypto Solutions"
  },
  {
    id: 12,
    name: "Sofia Martinez",
    course: "Game Development",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face",
    company: "GameStudio"
  },
  {
    id: 13,
    name: "Sofia Martinez",
    course: "Game Development",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face",
    company: "GameStudio"
  }
];

// Grid positions for random placement
const gridPositions = [
  { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 },
  { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
  { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }
];

const StudentsShowcase = () => {
  const [displayedStudents, setDisplayedStudents] = useState<DisplayedStudent[]>([]);

  // Function to get random students for display
  const getRandomStudents = (): DisplayedStudent[] => {
    const shuffled = [...students].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15).map((student, index) => ({
      ...student,
      position: gridPositions[index],
      key: `${student.id}-${Date.now()}-${index}` // Unique key for animations
    }));
  };

  // Initialize and set up interval for changing students
  useEffect(() => {
    // Set initial students
    setDisplayedStudents(getRandomStudents());

    // Change students every 3 seconds
    const interval = setInterval(() => {
      setDisplayedStudents(getRandomStudents());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              40,000+
            </span>
            <span className="text-gray-900"> ambitious learners</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Already started growing their careers with us
          </motion.p>
        </motion.div>

        {/* Students Grid */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {displayedStudents.map((student) => (
                <motion.div
                  key={student.key}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative group"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Student Card */}
                  <div className="relative bg-white rounded-2xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                    {/* Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    
                    {/* Content */}
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      {/* Image */}
                      <div className="aspect-square relative overflow-hidden rounded-xl">
                        <Image
                          src={student.image}
                          alt={student.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        
                        {/* Overlay with info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <p className="font-semibold text-sm truncate">{student.name}</p>
                            <p className="text-xs opacity-90 truncate">{student.course}</p>
                            <p className="text-xs opacity-75 truncate">{student.company}</p>
                          </div>
                        </div>

                        {/* Success Badge */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ✓ Success
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Hiring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-pink-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentsShowcase;
