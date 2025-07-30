
"use client";

import React, { useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, CheckSquare, BarChart2, Bell, User, Search, Menu, X, ChevronDown, ChevronLeft, Sun, Moon } from 'lucide-react';

// --- MOCK DATA ---
const user = {
  name: 'Alex Morgan',
  avatarUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AM',
};

const courses = [
  { id: 1, title: 'Advanced React Patterns', progress: 75, instructor: 'Jane Doe' },
  { id: 2, title: 'UI/UX Design Fundamentals', progress: 45, instructor: 'John Smith' },
  { id: 3, title: 'Next.js for Production', progress: 90, instructor: 'Sam Wilson' },
];

const assignments = [
  { id: 1, title: 'React Hooks Project', dueDate: '2024-08-15', course: 'Advanced React Patterns' },
  { id: 2, title: 'Design a Mobile App', dueDate: '2024-08-20', course: 'UI/UX Design Fundamentals' },
];

// --- THEME CONTEXT for Dark/Light Mode ---
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};


// --- UI COMPONENTS ---

// Sidebar Component
const SidebarContext = createContext<{ isExpanded: boolean }>({ isExpanded: true });

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ isExpanded }}>
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? 288 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className={`font-bold text-2xl text-blue-600 dark:text-blue-400 overflow-hidden whitespace-nowrap ${isExpanded ? 'block' : 'hidden'}`}
          >
            LMS Pro
          </motion.h1>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronLeft size={20} className={`transform transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
          </button>
        </div>
        <nav className="flex-1 px-3 mt-4">{children}</nav>
        <div className={`border-t border-gray-200 dark:border-gray-700 p-3 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
            <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
            <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 overflow-hidden whitespace-nowrap"
                >
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </motion.aside>
    </SidebarContext.Provider>
  );
};

const SidebarItem = ({ icon, text, active, alert }: { icon: ReactNode, text: string, active?: boolean, alert?: boolean }) => {
  const { isExpanded } = useContext(SidebarContext);
  return (
    <li className={`
      relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
      transition-colors group
      ${active
        ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800 dark:from-blue-800 dark:to-blue-900 dark:text-white"
        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
      }
    `}>
      {icon}
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="ml-3 overflow-hidden whitespace-nowrap"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
      {alert && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute right-2 w-2 h-2 rounded-full bg-blue-500 ${isExpanded ? '' : 'top-2'}`}
        />
      )}
      {!isExpanded && (
        <div className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          dark:bg-gray-800 dark:text-white
        `}>
          {text}
        </div>
      )}
    </li>
  );
};

// Header Component
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search courses, assignments..."
                    className="w-full md:w-64 lg:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <img src={user.avatarUrl} alt="User Avatar" className="w-9 h-9 rounded-full" />
            <div className="hidden lg:block">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Mobile Sidebar
const MobileSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 flex flex-col"
                    >
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                            <h1 className="font-bold text-2xl text-blue-600 dark:text-blue-400">LMS Pro</h1>
                            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 p-4">
                            <ul>
                                <SidebarItem icon={<Home size={20} />} text="Dashboard" active />
                                <SidebarItem icon={<BookOpen size={20} />} text="My Courses" />
                                <SidebarItem icon={<CheckSquare size={20} />} text="Assignments" alert />
                                <SidebarItem icon={<BarChart2 size={20} />} text="Progress" />
                            </ul>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Dashboard Card Component
const DashboardCard = ({ title, children, className }: { title: string, children: ReactNode, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
};

// Progress Bar Component
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <motion.div
        className="bg-blue-500 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

// Main Dashboard Content
const DashboardContent = () => {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Alex!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your learning snapshot for today.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses Section */}
        <DashboardCard title="My Courses" className="lg:col-span-2">
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{course.title}</h4>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Instructor: {course.instructor}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Assignments Section */}
        <DashboardCard title="Upcoming Assignments">
          <div className="space-y-4">
            {assignments.map(assignment => (
              <div key={assignment.id} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200">{assignment.title}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">{assignment.course}</p>
                <p className="text-xs font-medium text-red-500 dark:text-red-400 mt-2">Due: {assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Quick Stats Section */}
        <DashboardCard title="Overall Progress">
            <div className="flex items-center justify-center h-48">
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-gray-200 dark:text-gray-700"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3" />
                        <motion.path className="text-blue-500"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="70, 100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 30 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">70%</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
                    </div>
                </div>
            </div>
        </DashboardCard>
        
        <DashboardCard title="Activity Feed" className="lg:col-span-2">
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full"><CheckSquare size={16} className="text-green-600 dark:text-green-400" /></div>
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-200">You completed the "State Management" lesson.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full"><BookOpen size={16} className="text-purple-600 dark:text-purple-400" /></div>
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-200">New course "Advanced TypeScript" was added.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                    </div>
                </li>
            </ul>
        </DashboardCard>
      </div>
    </main>
  );
};

// Main App Component
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar>
          <ul className="space-y-1">
            <SidebarItem icon={<Home size={20} />} text="Dashboard" active />
            <SidebarItem icon={<BookOpen size={20} />} text="My Courses" />
            <SidebarItem icon={<CheckSquare size={20} />} text="Assignments" alert />
            <SidebarItem icon={<BarChart2 size={20} />} text="Progress" />
          </ul>
        </Sidebar>
        
        <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
          <DashboardContent />
        </div>
      </div>
    </ThemeProvider>
  );
}
