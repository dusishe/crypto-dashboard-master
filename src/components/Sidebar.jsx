import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { navItems } from '../nav-items';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    console.log('Logging out');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isMobile && !isExpanded && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : isMobile ? 'w-0' : 'w-20'} overflow-hidden ${isMobile ? 'z-50' : ''}`}>
        <div className="p-4 flex flex-col h-full">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="self-end mb-4 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="self-end mb-4 text-white hover:text-gray-300"
            >
              {isExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </Button>
          )}
          <div className="flex-grow overflow-y-auto">
            {navItems.map((item, index) => (
              <Link key={index} to={item.to} onClick={() => isMobile && setIsExpanded(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start mb-2 ${isExpanded ? 'px-4' : 'px-2'} text-white hover:text-gray-300 hover:bg-gray-800`}
                >
                  {item.icon}
                  {isExpanded && <span className="ml-2">{item.title}</span>}
                </Button>
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start mb-2 text-white hover:text-gray-300 hover:bg-gray-800">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {isExpanded && <span className="ml-2">Toggle Theme</span>}
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start mb-2 text-white hover:text-gray-300 hover:bg-gray-800">
              <LogOut className="h-5 w-5" />
              {isExpanded && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;