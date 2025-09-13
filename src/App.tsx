import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageContext";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Map from "./pages/Map";
import Monasteries from "./pages/Monasteries";
import MonasteryDetail from "./pages/MonasteryDetail";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Nearby from "./pages/Nearby";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://monastery360.app.n8n.cloud/webhook/e9ccba0c-b021-4f4b-aabd-88057ee26fa3/chat",
      initialMessages: [
        "Hello 👋 Welcome to Monastery360!",
        "I'm your virtual helpdesk assistant for exploring Sikkim's monasteries.",
        "How can I assist you today?",
      ],
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/monasteries" element={<Monasteries />} />
              <Route path="/monasteries/:slug" element={<MonasteryDetail />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/nearby" element={<Nearby />} />
              {/* <Route path="/chat" element={<Chat />} /> */}
              <Route path="/about" element={<About />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
