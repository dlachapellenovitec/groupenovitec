import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Server, Users, ArrowRight, Lock, Cloud, Star, Activity, MousePointerClick, ChevronDown, ChevronUp, LayoutGrid } from 'lucide-react';
import { useData } from '../context/DataContext';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
      >
        {question}
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
          {answer}
        </div>
      )}
    </div>
  );
}

const Home: React.FC = () => {
  const { clientLogos, openQuiz } = useData();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 20,
            y: (e.clientY / window.innerHeight - 0.5) * 20
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-slate-50 overflow-x-hidden font-sans">
      {/* Hero Section Immersive */}
      <section className="relative min-h-screen flex items-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
                className={`absolute inset-0 w-full h-[120%] -top-[10%] transition-transform duration-[800ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                    transform: `translateY(${scrollY * 0.2}px) translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) scale(1.05)` 
                }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                    alt="Modern Office Background" 
                    fetchPriority="high"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-900/40"></div>
        </div>

        {/* Animated Background Shapes */}
        <div 
            className={`absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl transition-all duration-[3000ms] ${isLoaded ? 'opacity-20' : 'opacity-0'} animate-pulse`}
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        ></div>
        <div 
            className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl transition-all duration-[3000ms] ${isLoaded ? 'opacity-20' : 'opacity-0'} animate-pulse delay-1000`}
            style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-40 lg:pt-48 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 space-y-8">
            <div 
              className={`inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-lg hover:bg-white/20 transition-all duration-1000 ease-out cursor-default ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-50 tracking-wide">Votre département TI externe au Québec</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className={`block transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                L'informatique
              </span>
              <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 drop-shadow-sm transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
                Sécurisée & Prévisible
              </span>
            </h1>
            
            <p 
              className={`text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed border-l-4 border-blue-500 pl-6 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '600ms' }}
            >
              Groupe Novitec protège et gère l'infrastructure TI des PME professionnelles. Cybersécurité avancée, Cloud souverain et Support réactif <strong>100% Québécois</strong>.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <button onClick={openQuiz} className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 flex items-center justify-center gap-2">
                Auditer ma sécurité (Quiz)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/msp" className="group bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-center transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:border-white/40">
                Voir nos Forfaits
                <MousePointerClick className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"/>
              </Link>
            </div>
            
            <div 
              className={`flex items-center gap-4 text-sm text-slate-400 pt-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1000ms' }}
            >
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">JD</div>
                    <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">AL</div>
                    <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">MS</div>
                </div>
                <p>Rejoignez +100 PME satisfaites</p>
            </div>
          </div>
          
          {/* Hero Card Visual */}
          <div 
            className={`lg:w-2/5 w-full flex justify-center perspective-1000 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ 
                transitionDelay: '800ms',
                transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`
            }}
          >
             <div className="relative group w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1">
                    <div className="flex items-center justify-between mb-8">
                        <Shield className="w-12 h-12 text-blue-500" />
                        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Actif</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Protection Novigard™</h3>
                    <p className="text-slate-400 text-sm mb-6">Standard de sécurité par défaut.</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <Activity className="w-5 h-5 text-cyan-400" />
                                <span className="text-sm font-medium">Surveillance EDR</span>
                            </div>
                            <span className="text-green-400 text-xs font-mono">24/7 OK</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <Cloud className="w-5 h-5 text-blue-400" />
                                <span className="text-sm font-medium">Backup 365</span>
                            </div>
                            <span className="text-green-400 text-xs font-mono">SYNC 100%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-purple-400" />
                                <span className="text-sm font-medium">Identité MFA</span>
                            </div>
                            <span className="text-green-400 text-xs font-mono">SÉCURISÉ</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Improved contrast and spacing */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-12">Ils nous confient leur infrastructure critique</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
             {clientLogos.length > 0 ? (
                 clientLogos.map((client) => (
                    <img 
                        key={client.id}
                        src={client.logoUrl} 
                        alt={client.name}
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                 ))
             ) : (
                <div className="text-slate-400 text-center italic">Aucun partenaire affiché</div>
             )}
          </div>
        </div>
      </section>

      {/* Bento Grid Services Section - Added Background Pattern */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Tout pour votre TI</h2>
          <p className="text-lg text-slate-600">
            Une suite complète de services pour transformer votre technologie en levier de croissance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* MSP Card - Large */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
                
                {/* Content Side */}
                <div className="relative p-8 flex flex-col justify-between w-full md:w-3/5 z-10 bg-white">
                    <div>
                        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Services Gérés (MSP)</h3>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Déléguez 100% de votre gestion informatique. Support usager illimité, maintenance proactive et direction technique (vCIO).
                        </p>
                    </div>
                    <Link to="/msp" className="inline-flex items-center gap-2 text-blue-600 font-bold mt-8 group-hover:translate-x-2 transition-transform">
                        Voir les forfaits <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Image Side */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-transparent to-white z-10"></div>
                     <img 
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                        alt="MSP Team" 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                </div>
            </div>

            {/* Novigard Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                <div className="relative p-8 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Shield className="w-10 h-10 text-cyan-400" />
                            <Lock className="w-5 h-5 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Novigard™ Cyber</h3>
                        <p className="text-slate-400 text-sm">SOC 24/7, EDR et protection contre les ransomwares.</p>
                    </div>
                    <Link to="/novigard" className="text-cyan-400 text-sm font-bold mt-4 hover:underline">Explorer la sécurité &rarr;</Link>
                </div>
            </div>

            {/* Cloud Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Cloud className="w-32 h-32" />
                </div>
                <div className="relative p-8 h-full flex flex-col justify-between">
                    <div>
                        <Server className="w-10 h-10 text-purple-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Cloud</h3>
                        <p className="text-slate-600 text-sm">Vos données hébergées ici, au Québec. Performance NVMe.</p>
                    </div>
                    <Link to="/cloud" className="text-purple-600 text-sm font-bold mt-4 hover:underline">Découvrir MonCloudPrive &rarr;</Link>
                </div>
            </div>

             {/* Microsoft 365 Card */}
             <div className="md:col-span-3 group relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom translate-x-10"></div>
                <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                            <LayoutGrid className="w-8 h-8 text-white opacity-90" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1">Expertise Microsoft 365</h3>
                            <p className="text-blue-100">Licences, Sécurisation (Hardening) et Sauvegarde externe.</p>
                        </div>
                    </div>
                    <Link to="/microsoft-365" className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                        Optimiser mon 365
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Feature Split Section with Image and Gradient Background */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-24 border-t border-slate-100 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2 relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1600" 
                        alt="Techniciens Novitec" 
                        loading="lazy"
                        className="relative rounded-2xl shadow-2xl z-10 w-full object-cover h-[500px]"
                    />
                    <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border border-slate-100">
                         <div className="flex items-center gap-4 mb-2">
                             <div className="flex -space-x-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                             </div>
                             <span className="font-bold text-slate-900">4.9/5</span>
                         </div>
                         <p className="text-slate-500 text-sm">Satisfaction client moyenne</p>
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">Pourquoi les PME d'ici choisissent Novitec ?</h2>
                    <p className="text-slate-600 mb-10 text-lg">Nous combinons l'expertise technique de pointe avec la chaleur humaine d'une équipe locale.</p>
                    
                    <div className="space-y-8">
                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:bg-blue-600 transition-colors">
                                <Lock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">Sécurité par Design</h4>
                                <p className="text-slate-600 leading-relaxed">Nous n'attendons pas les problèmes. Novigard est inclus dans notre ADN pour prévenir les ransomwares avant qu'ils ne frappent.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:bg-blue-600 transition-colors">
                                <Server className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">Outils de Classe Entreprise</h4>
                                <p className="text-slate-600 leading-relaxed">Nous utilisons les mêmes outils que les grandes corporations (HaloPSA, SentinelOne, XCP-NG) adaptés à votre réalité PME.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:bg-blue-600 transition-colors">
                                <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">100% Humain & Local</h4>
                                <p className="text-slate-600 leading-relaxed">Pas de centre d'appel à l'étranger. Nos techniciens parlent votre langue et sont basés à Québec et Montréal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* FAQ Section with Background Element */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
              <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes (FAQ)</h2>
              <div className="space-y-4">
                  <FAQItem 
                    question="Quelle est la différence entre vous et un technicien informatique indépendant ?"
                    answer="Novitec est une équipe structurée. Nous ne tombons pas malades, nous ne partons pas en vacances tous en même temps, et nous avons des outils de surveillance 24/7 qu'un indépendant ne peut pas s'offrir."
                  />
                  <FAQItem 
                    question="Est-ce que je suis obligé de signer un contrat long terme ?"
                    answer="Non. Nous croyons en notre service. Nos ententes de services gérés sont généralement annuelles pour garantir les meilleurs tarifs, mais nous avons des clauses de sortie claires."
                  />
                  <FAQItem 
                    question="Intervenez-vous sur place ou seulement à distance ?"
                    answer="Les deux. Nous résolvons 90% des problèmes à distance en quelques minutes, mais nous nous déplaçons physiquement pour les pannes matérielles ou les installations."
                  />
                  <FAQItem 
                    question="Mes données restent-elles au Canada ?"
                    answer="Absolument. Avec MonCloudPrive.ca et nos solutions de sauvegarde, nous garantissons la souveraineté des données, un point crucial pour la conformité à la Loi 25."
                  />
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Abstract BG */}
          <div className="absolute inset-0">
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <div className="absolute -left-20 -bottom-20 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
             <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">Prêt à sécuriser votre entreprise ?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                Obtenez une rencontre exploratoire gratuite de 30 minutes. Pas de vente sous pression, juste des conseils d'experts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:shadow-blue-600/50 hover:bg-blue-500 transition-all transform hover:-translate-y-1">
                    Planifier une rencontre
                </Link>
                <Link to="/msp" className="inline-block bg-transparent border border-slate-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all">
                    Comparer nos plans
                </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;