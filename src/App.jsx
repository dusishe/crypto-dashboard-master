import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { navItems } from "./nav-items";
import Sidebar from './components/Sidebar';

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 md:ml-64 transition-all duration-300 ease-in-out overflow-y-auto min-h-screen">
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;