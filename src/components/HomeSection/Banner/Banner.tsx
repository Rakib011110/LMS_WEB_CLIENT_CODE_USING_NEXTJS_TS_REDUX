'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaPlay, 
  FaArrowRight, 
  FaStar, 
  FaGraduationCap, 
  FaBook, 
  FaLightbulb,
  FaUsers,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';


export default function Banner() {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [theme, setTheme] = useState('light');
// Image configuration - You can easily change these URLs
const BANNER_IMAGES = {

  student1: "/images/student-1.jpg", // Change to your image URL

  student2: "/images/istockphoto-1322844568-612x612.jpg", // Change to your image URL

  course: "https://res.cloudinary.com/dalpf8iip/image/upload/v1753857344/representations-user-experience-interface-design_tnfwmb.jpg", // Change to your image URL 

};
  // Effect to apply the theme class to the body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // You can replace this with actual video URL
    window.open('https://www.youtube.com/watch?v=Sklc_fQBmcs', '_blank');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 overflow-hidden transition-colors duration-500">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:scale-110 transition-transform"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>

      {/* Background Grid Pattern - Left Side Only */}
      <div className="absolute left-0 top-0 w-3/5 h-full opacity-10 dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, ${theme === 'light' ? 'rgba(139,69,193,0.3)' : 'rgba(209, 160, 255, 0.3)'} 1.5px, transparent 0)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Large Purple Burst - Top Right */}
      <div className="absolute top-16 right-16 w-40 h-40 ">
        <motion.div className="relative w-full h-full transform rotate-45"   animate={{
          rotate: [45, 225, 90],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}>
          {[...Array(16)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-12 bg-gradient-to-t from-purple-400 via-purple-500 to-purple-600 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 origin-bottom opacity-80 "
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </div>

      {/* Graduation Cap Icon - Left Side */}
      <motion.div
        className="absolute top-72 left-24 text-blue-500 dark:text-blue-400 opacity-70"
        animate={{
          y: [-8, 8, -8],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaGraduationCap size={56} />
      </motion.div>
      
      {/* Book Icon - Top Right */}
      <motion.div
        className="absolute top-72 right-48 w-10 h-10 text-pink-500 dark:text-pink-400 opacity-70"
      >
        <FaBookOpen className="w-full h-full" />
      </motion.div>

      {/* Additional Decorative Elements */}
      <div className="absolute top-48 right-32 w-5 h-5 bg-purple-300 dark:bg-purple-800 rounded-full opacity-50 shadow-sm"></div>
      <div className="absolute top-64 right-20 w-3 h-3 bg-blue-300 dark:bg-blue-800 rounded-full opacity-60"></div>
      <div className="absolute bottom-48 left-40 w-7 h-7 border-3 border-purple-300 dark:border-purple-700 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-pink-300 dark:bg-pink-800 rounded-full opacity-50"></div>
      
      {/* Floating Circles */}
      <motion.div
        className="absolute top-80 left-16 w-12 h-12 border-2 border-blue-300 dark:border-blue-700 rounded-full opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-40 w-8 h-8 bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-800 rounded-full opacity-40"
        animate={{
          y: [-5, 5, -5],
          x: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pink Play Button - Centered with animated rings */}
        <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400 dark:border-pink-500"
          animate={{
            scale: [1, 2, 3],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400 dark:border-purple-500"
          animate={{
            scale: [1, 2.5, 4],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
        
        <motion.button
          onClick={handlePlayVideo}
          className="relative w-20 h-20 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaPlay className="text-white text-2xl ml-1" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-50 blur-md"></div>
        </motion.button>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[600px]">
          
          {/* Left Side - Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8 lg:space-y-10 max-w-xl mx-auto lg:mx-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p 
              className="text-blue-500 dark:text-blue-400 font-medium italic text-base sm:text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              # Best Online Platform
            </motion.p>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-gray-900 dark:text-gray-100">Start Learning </span>
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Today
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Discover
              </span>
              <span className="text-gray-900 dark:text-gray-100"> Your Next</span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">Great </span>
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Skill
              </span>
            </motion.h1>

            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed max-w-lg font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Enhance your educational journey with our cutting-edge course platform.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center gap-3 sm:gap-4 font-semibold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight size={18} className="sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>

              <motion.div 
                className="flex items-center gap-3 sm:gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex -space-x-2 sm:-space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 sm:border-3 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                    <FaUsers className="text-white text-xs sm:text-sm" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 sm:border-3 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                    <FaUsers className="text-white text-xs sm:text-sm" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 border-2 sm:border-3 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                    <FaUsers className="text-white text-xs sm:text-sm" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl">2000+</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Success Student</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div 
            className="relative space-y-4 sm:space-y-6 pl-0 lg:pl-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                className="relative"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 shadow-2xl">
                  <div className="bg-gradient-to-br from-blue-300 via-purple-400 to-purple-500 dark:from-blue-800 dark:via-purple-900 dark:to-purple-950 rounded-2xl sm:rounded-3xl h-48 sm:h-60 relative overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={BANNER_IMAGES.student1}
                        alt="Woman learning with tablet"
                        fill
                        className="object-cover rounded-2xl sm:rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              >
                <div className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 shadow-2xl">
                  <div className="bg-gradient-to-br from-teal-300 via-cyan-400 to-blue-400 dark:from-teal-800 dark:via-cyan-900 dark:to-blue-950 rounded-2xl sm:rounded-3xl h-48 sm:h-60 relative overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={BANNER_IMAGES.student2}
                        alt="Woman with books studying"
                        fill
                        className="object-cover rounded-2xl sm:rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-5 relative col-span-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl">
                  -10% OFF
                </div>

                <div className="w-full h-20 sm:h-28 bg-gradient-to-br from-orange-300 via-pink-400 to-red-400 dark:from-orange-800 dark:via-pink-900 dark:to-red-950 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 relative overflow-hidden">
                  <Image
                    src={BANNER_IMAGES.course}
                    alt="UI/UX Design Course"
                    fill
                    className="object-cover rounded-xl sm:rounded-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <FaPlay className="text-white text-sm sm:text-lg ml-0.5" />
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-2 sm:mb-3 leading-tight">
                  UI/UX Design Enhancing User Experience Effectively
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-1">5.5/14</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-orange-500">$150.00</div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl h-40 sm:rounded-3xl shadow-2xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 col-span-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaLightbulb className="text-white text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100">35+ Years</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">of experience</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        </div>
      </motion.div>

      {/* Curved Line Connecting Elements */}
      <svg className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-[500px] h-40 opacity-20 dark:opacity-30" viewBox="0 0 500 160">
        <path 
          d="M 50 120 Q 250 40 450 120" 
          stroke="url(#gradient)" 
          strokeWidth="3" 
          fill="none"
          strokeDasharray="8,8"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="25%" stopColor="#ec4899" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Additional scattered dots with better positioning */}
      <div className="absolute top-36 right-24 w-3 h-3 bg-blue-400 dark:bg-blue-800 rounded-full opacity-50 shadow-sm"></div>
      <div className="absolute bottom-48 right-32 w-4 h-4 bg-pink-400 dark:bg-pink-800 rounded-full opacity-40 shadow-sm"></div>
      <div className="absolute top-2/3 right-16 w-2 h-2 bg-purple-400 dark:bg-purple-800 rounded-full opacity-60"></div>
      <div className="absolute bottom-64 left-8 w-5 h-5 border-2 border-cyan-300 dark:border-cyan-700 rounded-full opacity-30"></div>
      <div className="absolute top-80 left-8 w-3 h-3 bg-orange-300 dark:bg-orange-800 rounded-full opacity-50"></div>
    </div>
  );
}
