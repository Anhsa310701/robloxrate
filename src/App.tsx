
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Admin from "./pages/Admin";
import AdminGameCategories from "./pages/AdminGameCategories";
import AdminGames from "./pages/AdminGames";
import AdminGameItems from "./pages/AdminGameItems";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValueResult from "./pages/ValueResult";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Policy from "./pages/Policy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/value" element={<ValueResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policy" element={<Policy />} />
          </Route>
          
          {/* Admin Layout Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="game-categories" element={<AdminGameCategories />} />
            <Route path="games" element={<AdminGames />} />
            <Route path="game-items" element={<AdminGameItems />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
