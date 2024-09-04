import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut, Menu } from "lucide-react";
import { navItems } from '../nav-items';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    console.log('Logging out');
    navigate('/');
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-0 md:w-20'} overflow-hidden`}>
        <div className="p-4 flex-grow overflow-y-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-4 w-full flex justify-end text-white hover:text-gray-300 md:hidden"
          >
            {isExpanded ? '←' : '→'}
          </Button>
          {navItems.map((item, index) => (
            <Link key={index} to={item.to} onClick={() => setIsExpanded(false)}>
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
        <div className="p-4">
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
    </>
  );
};

export default Sidebar;