import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesMSP from './pages/ServicesMSP';
import Novigard from './pages/Novigard';
import Cloud from './pages/Cloud';
import Microsoft365 from './pages/Microsoft365';
import VoIP from './pages/VoIP';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Support from './pages/Support';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Partners from './pages/Partners';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Status from './pages/Status';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SecurityQuiz from './components/SecurityQuiz';
import AISecurityAssistant from './components/AISecurityAssistant';
import { MessageCircle, X } from 'lucide-react';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Floating Chat Widget
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 8000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Prompt Bubble */}
      {showPrompt && !isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 mb-4 max-w-xs animate-fade-in-up relative">
          <button onClick={() => setShowPrompt(false)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"><X className="w-3 h-3" /></button>
          <p className="text-sm text-slate-700 font-medium">👋 Bonjour ! Besoin d'une estimation rapide pour votre parc informatique ?</p>
        </div>
      )}

      {/* Main Button */}
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-slate-200 animate-fade-in-up">
           <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
             <h3 className="font-bold">Contact Rapide</h3>
             <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
           </div>
           <div className="p-4 space-y-3">
             <p className="text-sm text-slate-600">Choisissez une option :</p>
             <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors text-center">
               Demander une soumission
             </Link>
             <Link to="/support" onClick={() => setIsOpen(false)} className="block w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors text-center">
               Support Technique
             </Link>
             <a href="tel:5143601757" className="block w-full bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors text-center">
               Appeler l'urgence (24/7)
             </a>
           </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};


const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/partenaires" element={<Partners />} />
                    <Route path="/msp" element={<ServicesMSP />} />
                    <Route path="/novigard" element={<Novigard />} />
                    <Route path="/cloud" element={<Cloud />} />
                    <Route path="/microsoft-365" element={<Microsoft365 />} />
                    <Route path="/telephonie" element={<VoIP />} />
                    <Route path="/carrieres" element={<Careers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                  </Routes>
                </main>
                <Footer />
                <ChatWidget />
                <SecurityQuiz />
                <AISecurityAssistant />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;