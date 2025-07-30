"use client"

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Users, BarChart2, Settings, Bell, Menu, X, ChevronDown, ChevronLeft, UserPlus, ClipboardCheck } from 'lucide-react';

// --- MOCK DATA FOR ADMIN DASHBOARD ---
const adminUser = {
  avatarUrl: 'https://placehold.co/100x100/A0AEC0/4A5568?text=CT',
};

// --- UI COMPONENTS ---

// Sidebar Component
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
    { name: 'Courses', href: '/dashboard/manage-courses', icon: <BookOpen size={20} /> },
    { name: 'Students', href: '/students', icon: <Users size={20} /> },
    { name: 'Quizzes', href: '/dashboard/manage-quiz', icon: <ClipboardCheck size={20} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 288 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex flex-col h-screen bg-white border-r border-gray-200"
    >
      <div className="p-4 pb-2 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className={`font-bold text-2xl text-blue-600 overflow-hidden whitespace-nowrap ${isExpanded ? 'block' : 'hidden'}`}
        >
          Admin Panel
        </motion.h1>
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
          <ChevronLeft size={20} className={`transform transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </div>
      <nav className="flex-1 px-3 mt-4">
        <ul className="space-y-2">
          {sidebarItems.map(item => (
            <SidebarItem 
              key={item.name}
              icon={item.icon} 
              text={item.name} 
              href={item.href}
              active={pathname === item.href}
              isExpanded={isExpanded}
            />
          ))}
        </ul>
      </nav>
      <div className={`border-t border-gray-200 p-3 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        <img src={adminUser.avatarUrl} alt="Admin Avatar" className="w-10 h-10 rounded-full" />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              <p className="font-semibold text-sm text-gray-800">Chris Taylor</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

const SidebarItem = ({ icon, text, href, active, isExpanded }: { 
  icon: ReactNode, 
  text: string, 
  href: string,
  active?: boolean, 
  isExpanded: boolean 
}) => {
  return (
    <li className="relative">
      <Link href={href} className={`
        flex items-center py-2.5 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
          : "hover:bg-gray-100 text-gray-600"
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
        {!isExpanded && (
          <div className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-blue-100 text-blue-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-20
          `}>
            {text}
          </div>
        )}
      </Link>
    </li>
  );
};

// Header Component
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={24} />
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
          <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100">
            <img src={adminUser.avatarUrl} alt="Admin Avatar" className="w-9 h-9 rounded-full" />
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

// Mobile Sidebar
const MobileSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const pathname = usePathname();
  
  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Students', href: '/students', icon: <Users size={20} /> },
    { name: 'Quizzes', href: '/quizzes', icon: <ClipboardCheck size={20} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

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
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h1 className="font-bold text-2xl text-blue-600">Admin Panel</h1>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {sidebarItems.map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center py-2.5 px-3 my-1 font-medium rounded-md cursor-pointer
                        transition-colors
                        ${pathname === item.href
                          ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
                          : "hover:bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Layout Component
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}