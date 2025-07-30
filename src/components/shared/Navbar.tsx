"use client";


// You need to install lucide-react for icons: npm install lucide-react
import React, { useContext, useState } from 'react';
import { ChevronDown, Search, User, Phone, Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '@/lib/ThemeProvider/ThemeProvider';
import { Button } from '../ui/Button';

// Define the type for a navigation link
interface NavLink {
  name: string;
  href: string;
  dropdown?: NavLink[];
}

// Navigation links data
const navLinks: NavLink[] = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  {
    name: 'Pages',
    href: '#',
    dropdown: [
      { name: 'Page 1', href: '#' },
      { name: 'Page 2', href: '#' },
      { name: 'Page 3', href: '#' },
    ],
  },
  {
    name: 'Course',
    href: '#',
    dropdown: [
      { name: 'Course Catalog', href: '#' },
      { name: 'My Courses', href: '#' },
    ],
  },
  
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
];

// Logo Component
 export const CompanyLogo = () => (
  <div className="flex items-center space-x-3">
    <svg width="48" height="48" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M101.722 23.3333L121.5 4.55554L157.444 40.5L137.667 59.2778L101.722 23.3333Z" fill="#6366f1"/>
        <path d="M60.2778 138.667L40.5 157.444L4.55554 121.5L24.3333 102.722L60.2778 138.667Z" fill="#6366f1"/>
        <path d="M81 113.889C99.125 113.889 113.889 99.125 113.889 81C113.889 62.875 99.125 48.1111 81 48.1111C62.875 48.1111 48.1111 62.875 48.1111 81C48.1111 99.125 62.875 113.889 81 113.889Z" stroke="#4338ca" strokeWidth="15"/>
    </svg>
    <span className="text-2xl font-bold text-gray-900">Study</span>
  </div>
);

// Navigation Link Item Component
const NavItem: React.FC<{ link: NavLink; isActive: boolean }> = ({ link, isActive }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li className="relative group">
      <a
        href={link.href}
        className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg ${
          isActive 
            ? 'text-blue-600 bg-blue-50' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
        }`}
        onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
        onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
      >
        {link.name}
        {link.dropdown && (
          <ChevronDown 
            size={16} 
            className={`ml-2 transition-transform duration-300 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        )}
      </a>
      {link.dropdown && isDropdownOpen && (
        <ul 
          className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {link.dropdown.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Mobile Navigation Component
const MobileNav: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <CompanyLogo />
            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 p-2">
                <X size={24} />
            </button>
        </div>
        <ul className="flex flex-col mt-8 space-y-2 px-6">
            {navLinks.map((link) => (
                 <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="block py-3 px-4 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center space-y-4 px-6">
             <a href="#" className="w-full text-center px-6 py-3 border border-gray-300 rounded-full text-gray-700 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200">
                <User size={20} />
                <span>Sign in / Register</span>
            </a>
            <div className="text-center">
                <p className="text-gray-500 text-sm">Support</p>
                <p className="font-semibold text-gray-800">+1 (123) 456 78900</p>
            </div>
        </div>
    </div>
  );
};


const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeLink = 'Home';
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <CompanyLogo />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavItem key={link.name} link={link} isActive={link.name === activeLink} />
              ))}
            </ul>
          </div>

          {/* Right side icons and links for Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full hover:bg-muted/50"
            >
              {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <a href="#" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <User size={18} className="mr-2" />
              <div className="text-left">
                <span className="text-sm font-medium block">Sign in</span>
              </div>
            </a>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <Phone size={18} className="text-blue-600 dark:text-blue-400"/>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Support</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">+1 (123) 456 78900</p>
                </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Open main menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </header>
  );
};

export default Navbar;