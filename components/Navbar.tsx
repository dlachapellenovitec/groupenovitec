import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Shield, Phone, ChevronDown, 
  Cloud, LayoutGrid, Users, 
  LifeBuoy, FileText, Briefcase, 
  ArrowRight, Globe, Handshake, Hexagon, AlertCircle, PlayCircle 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const { settings, jobs, openQuiz } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const hasJobs = jobs.length > 0;

  // Check if we are on the home page to apply transparent styling
  const isHome = location.pathname === '/';

  // Handle scroll effect & Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  // Determine styles based on scroll and page
  const navBackgroundClass = (isHome && !scrolled) 
    ? 'bg-transparent border-transparent' 
    : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100';

  const textColorClass = (isHome && !scrolled) 
    ? 'text-white hover:text-blue-200' 
    : 'text-slate-700 hover:text-blue-600';

  // Logo colors change based on scroll
  const logoColorClass = (isHome && !scrolled)
    ? 'text-white'
    : 'text-blue-700';
    
  const logoTextClass = (isHome && !scrolled)
    ? 'text-white'
    : 'text-slate-900';

  const mobileButtonClass = (isHome && !scrolled)
    ? 'text-white hover:bg-white/10'
    : 'text-slate-700 hover:bg-slate-50';

  // Announcement Styles
  const announcementColors = {
    info: 'bg-blue-600 text-white',
    warning: 'bg-orange-500 text-white',
    danger: 'bg-red-600 text-white'
  };

  // Configuration du Mega Menu
  const solutions = [
    {
      title: "Services Gérés (MSP)",
      desc: "Délégation TI complète & Support usager",
      icon: Users,
      path: "/msp",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Cybersécurité Novigard",
      desc: "SOC 24/7, EDR & Protection Ransomware",
      icon: Shield,
      path: "/novigard",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      title: "Cloud Souverain",
      desc: "Hébergement privé au Québec (Loi 25)",
      icon: Cloud,
      path: "/cloud",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Microsoft 365",
      desc: "Licences, Sécurisation & Backup",
      icon: LayoutGrid,
      path: "/microsoft-365",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Téléphonie IP",
      desc: "Teams Phone & Systèmes VoIP Cloud",
      icon: Phone,
      path: "/telephonie",
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  const enterprise = [
    { title: "À Propos", icon: Globe, path: "/about" },
    { title: "Partenaires", icon: Handshake, path: "/partenaires" },
    { title: "Carrières", icon: Briefcase, path: "/carrieres", badge: hasJobs ? "On recrute" : undefined },
    { title: "Blog & Ressources", icon: FileText, path: "/blog" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 font-sans transition-all duration-300">
      
      {/* 0. ANNOUNCEMENT BAR (If Active) */}
      {settings.announcement.active && (
        <div className={`${announcementColors[settings.announcement.type]} py-2 px-4 text-center text-xs md:text-sm font-bold shadow-md relative z-50`}>
           <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
               <AlertCircle className="w-4 h-4" />
               {settings.announcement.message}
           </div>
        </div>
      )}

      {/* 1. TOP BAR - Pour la confiance et le support rapide */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden lg:block transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Systèmes Opérationnels
            </span>
            <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
          </div>
          <div className="flex space-x-6 items-center">
            <Link to="/support" className="hover:text-white transition-colors flex items-center gap-1">
                <LifeBuoy className="w-3 h-3" /> Portail Client / Support
            </Link>
            <a href={`tel:${settings.phone.replace(/\D/g,'')}`} className="font-bold text-white bg-slate-800 px-3 py-1 rounded hover:bg-slate-700 transition-colors">
                Urgence 24/7 : {settings.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className={`transition-all duration-500 py-4 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* LOGO */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt={settings.companyName} className="h-12 w-auto object-contain" />
              ) : (
                <>
                  <div className="relative flex items-center justify-center">
                    <Hexagon className={`w-10 h-10 ${logoColorClass} fill-current opacity-20`} />
                    <div className={`absolute inset-0 flex items-center justify-center font-black text-lg ${logoColorClass}`}>N</div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`text-xl font-black tracking-tighter leading-none ${logoTextClass}`}>
                        GROUPE <span className={isHome && !scrolled ? 'text-blue-300' : 'text-blue-600'}>NOVITEC</span>
                    </span>
                    <div className={`hidden sm:block h-0.5 w-full mt-1 ${isHome && !scrolled ? 'bg-blue-300/30' : 'bg-blue-600/30'}`}></div>
                    <span className={`hidden sm:block text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5 ${isHome && !scrolled ? 'text-blue-100' : 'text-slate-500'}`}>
                        MSP & Cyber Québec
                    </span>
                  </div>
                </>
              )}
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-8">
              
              {/* Mega Menu Trigger: SOLUTIONS */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold py-2 ${textColorClass} transition-colors`}>
                  Nos Solutions <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                </button>

                {/* The Mega Menu Dropdown */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 grid grid-cols-2 gap-2 transition-all duration-300 transform origin-top ${activeDropdown === 'solutions' ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}>
                   {solutions.map((item) => (
                     <Link 
                        key={item.title} 
                        to={item.path} 
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item text-left"
                     >
                        <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm group-hover/item:text-blue-700 flex items-center gap-1">
                                {item.title} <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                     </Link>
                   ))}
                   <div className="col-span-2 bg-slate-900 rounded-xl p-4 mt-2 flex justify-between items-center text-white">
                        <div className="text-left">
                            <p className="font-bold text-sm">Besoin d'un audit personnalisé ?</p>
                            <p className="text-xs text-slate-400">Nos experts analysent votre infra gratuitement.</p>
                        </div>
                        <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                            Réserver maintenant
                        </Link>
                   </div>
                </div>
              </div>

              {/* Dropdown: ENTREPRISE */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('enterprise')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold py-2 ${textColorClass} transition-colors`}>
                  L'Entreprise <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'enterprise' ? 'rotate-180' : ''}`} />
                </button>
                 <div className={`absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 transition-all duration-300 transform origin-top ${activeDropdown === 'enterprise' ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}>
                    {enterprise.map((item) => (
                        <Link key={item.title} to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700 hover:text-blue-700">
                            <item.icon className="w-4 h-4 text-slate-400" />
                            {item.title}
                            {item.badge && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
                        </Link>
                    ))}
                 </div>
              </div>

              {/* NEW: Quiz Trigger Button (Desktop) */}
               <button 
                  onClick={openQuiz}
                  className={`flex items-center gap-2 text-sm font-bold py-2 px-3 rounded-lg border transition-all hover:scale-105
                    ${(isHome && !scrolled) 
                        ? 'border-white/30 text-white hover:bg-white/10' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600'}`}
              >
                 <PlayCircle className="w-4 h-4" />
                 Test de Sécurité
              </button>

              {/* CTA Button */}
              <Link 
                to="/contact"
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5
                  ${(isHome && !scrolled) ? 'bg-white text-blue-900 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-600/30'}`}
              >
                <Phone className="w-4 h-4" />
                Audit Gratuit
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex items-center lg:hidden">
               <a href={`tel:${settings.phone.replace(/\D/g,'')}`} className={`mr-4 font-bold p-2 rounded-full transition-colors ${mobileButtonClass}`}>
                   <Phone className="w-5 h-5" />
               </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${mobileButtonClass}`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 z-50"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>

        {/* MOBILE MENU CONTENT */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl max-h-[90vh] overflow-y-auto text-left">
            <div className="px-4 py-4 space-y-2">
              <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nos Solutions</h3>
                  {solutions.map((item) => (
                    <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 mb-1"
                    >
                         <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
                            <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                    </Link>
                  ))}
              </div>
              
              <div className="border-t border-slate-100 pt-4 mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Entreprise</h3>
                   {enterprise.map((item) => (
                    <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700"
                    >
                         <item.icon className="w-4 h-4 text-slate-400" />
                        <span>{item.title}</span>
                         {item.badge && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
                    </Link>
                  ))}
              </div>

              {/* Mobile Quiz Button */}
              <button
                onClick={() => {
                    openQuiz();
                    setIsMobileMenuOpen(false);
                }}
                className="block w-full text-center bg-cyan-50 text-cyan-700 px-4 py-3 rounded-xl font-bold border border-cyan-100"
              >
                Lancer le Test de Sécurité
              </button>

               <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center mt-3 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg"
              >
                Demander un Audit Gratuit
              </Link>
              
               <div className="mt-6 bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-xs text-slate-500 mb-2">Déjà client ?</p>
                    <Link to="/support" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-bold text-sm flex items-center justify-center gap-2">
                        <LifeBuoy className="w-4 h-4"/> Accéder au support
                    </Link>
               </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;