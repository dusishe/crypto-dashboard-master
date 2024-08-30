import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems, loginRoute } from "./nav-items";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route
              path={loginRoute.to}
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  React.cloneElement(loginRoute.page, { setIsAuthenticated })
                )
              }
            />
            {navItems.map(({ to, page }) => (
              <Route
                key={to}
                path={to}
                element={
                  isAuthenticated ? (
                    page
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
