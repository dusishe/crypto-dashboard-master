import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { navItems, loginRoute } from "./nav-items";
import Sidebar from './components/Sidebar';

const queryClient = new QueryClient();

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="flex flex-col md:flex-row">
              <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
              <div className={`flex-1 p-4 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300 ease-in-out overflow-y-auto min-h-screen`}>
                <Routes>
                  <Route path={loginRoute.to} element={loginRoute.page} />
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={page} />
                  ))}
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;