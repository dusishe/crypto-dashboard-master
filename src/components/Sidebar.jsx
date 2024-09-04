import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut } from "lucide-react";
import { navItems } from '../nav-items';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out');
    navigate('/');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col`}>
      <div className="p-4 flex-grow overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 w-full flex justify-end"
        >
          {isExpanded ? '←' : '→'}
        </Button>
        {navItems.map((item, index) => (
          <Link key={index} to={item.to}>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${isExpanded ? 'px-4' : 'px-2'}`}
            >
              {item.icon}
              {isExpanded && <span className="ml-2">{item.title}</span>}
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-4">
        <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start mb-2">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {isExpanded && <span className="ml-2">Toggle Theme</span>}
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start mb-2">
          <LogOut className="h-5 w-5" />
          {isExpanded && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;