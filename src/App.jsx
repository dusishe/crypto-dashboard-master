import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { navItems, loginRoute } from "./nav-items";
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row">
      {isAuthenticated && <Sidebar />}
      <div className={`flex-1 p-4 ${isAuthenticated ? 'md:ml-64' : ''} transition-all duration-300 ease-in-out overflow-y-auto min-h-screen`}>
        <Routes>
          <Route path={loginRoute.to} element={<Login />} />
          {navItems.map(({ to, page }) => (
            <Route
              key={to}
              path={to}
              element={<PrivateRoute>{page}</PrivateRoute>}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;