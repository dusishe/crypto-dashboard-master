import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, KeyIcon, SettingsIcon, BarChartIcon, ChevronRight, ChevronLeft } from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: <HomeIcon className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <KeyIcon className="h-5 w-5" />, label: 'API Keys', path: '/api-keys' },
    { icon: <SettingsIcon className="h-5 w-5" />, label: 'Account Settings', path: '/account-settings' },
    { icon: <BarChartIcon className="h-5 w-5" />, label: 'Statistics', path: '/statistics' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 w-full flex justify-end"
        >
          {isExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </Button>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${isExpanded ? 'px-4' : 'px-2'}`}
            >
              {item.icon}
              {isExpanded && <span className="ml-2">{item.label}</span>}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;