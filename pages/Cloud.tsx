import React, { useState, useEffect } from 'react';
import { Server, Globe, Cpu, ShieldCheck, DollarSign, ArrowRight, Check, HardDrive, ClipboardCheck, PencilRuler, ArrowLeftRight, Rocket, MapPin, Lock, AlertOctagon, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cloud: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Auto-play for migration steps if user doesn't interact
  useEffect(() => {
    const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const migrationSteps = [
    {
        id: 0,
        title: "Audit & Inventaire",
        desc: "Analyse complète de vos VMs (VMware/Hyper-V). Identification des ressources critiques et nettoyage pré-migration.",
        icon: ClipboardCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        id: 1,
        title: "Architecture Dédiée",
        desc: "Déploiement de votre Cloud Privé sur infrastructure Bare Metal OVH. Configuration des VLANs et du pare-feu dédié.",
        icon: PencilRuler,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        id: 2,
        title: "Réplication à Chaud",
        desc: "Synchronisation des données via VPN sécurisé. Vos serveurs actuels continuent de fonctionner pendant le transfert.",
        icon: RefreshCw,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10"
    },
    {
        id: 3,
        title: "Bascule (Go Live)",
        desc: "Coupure finale (généralement la nuit). Modification DNS et redémarrage sur la nouvelle infrastructure haute performance.",
        icon: Rocket,
        color: "text-green-400",
        bg: "bg-green-400/10"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
       {/* Hero Section */}
       <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden min-h-[600px] flex items-center pt-32 lg:pt-0">
           <div className="absolute inset-0">
               <img 
                src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=2000" 
                alt="Datacenter Corridor" 
                fetchPriority="high"
                className="w-full h-full object-cover opacity-20" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50"></div>
           </div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
               <div className="lg:w-2/3">
                   <div className="inline-block bg-blue-500/10 border border-blue-500/50 rounded-lg px-4 py-2 mb-8 backdrop-blur-sm">
                       <span className="text-blue-300 font-mono font-bold tracking-wider flex items-center gap-2">
                           <Globe className="w-4 h-4" /> WWW.MONCLOUDPRIVE.CA
                       </span>
                   </div>
                   <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                       Cloud Privé & Sécurisé <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                           Données au Canada
                       </span>
                   </h1>
                   <p className="text-xl text-slate-300 max-w-2xl mb-12 border-l-4 border-cyan-500 pl-6">
                       Performance Bare Metal, conformité Loi 25 et infrastructure gérée par nos experts québécois.
                       La puissance mondiale d'OVHcloud, le service de proximité Novitec.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4">
                       <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                           Planifier ma migration
                           <ArrowRight className="w-5 h-5" />
                       </Link>
                       <a href="#specs" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/10 backdrop-blur-sm flex items-center justify-center">
                           Voir l'infrastructure
                       </a>
                   </div>
               </div>
           </div>
       </div>

       {/* Interactive Residency Map Section */}
       <div className="bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">La Résidence des Données : Un enjeu capital</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Pour respecter la Loi 25 et assurer une latence minimale, vos données doivent être proches de vous.
                    </p>
                </div>

                {/* The Interactive Map Container */}
                <div className="relative w-full h-[500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 mb-16 group select-none">
                    
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* Labels Areas */}
                    <div className="absolute top-4 left-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Zone Hébergement Local (Canada)
                    </div>
                    <div className="absolute bottom-4 right-4 bg-slate-700/50 border border-slate-600 text-slate-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                        Zone Internationale (Hors Juridiction)
                    </div>

                    {/* SVG Map Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        {/* The Border Line */}
                        <path d="M0 400 Q 400 380 800 420" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="10 5" />
                        
                        {/* Connection: Client -> Montreal */}
                        <path id="path-mtl" d="M150 250 Q 300 150 500 180" fill="none" stroke="url(#secureGradient)" strokeWidth="3" filter="url(#glow)" className="opacity-40" />
                        <circle r="4" fill="#22d3ee">
                            <animateMotion repeatCount="indefinite" dur="2s" keyPoints="0;1" keyTimes="0;1">
                                <mpath href="#path-mtl"/>
                            </animateMotion>
                        </circle>
                        <circle r="4" fill="#22d3ee">
                            <animateMotion repeatCount="indefinite" dur="2s" begin="1s" keyPoints="0;1" keyTimes="0;1">
                                <mpath href="#path-mtl"/>
                            </animateMotion>
                        </circle>

                        {/* Connection: Client -> USA (Blocked) */}
                        <path d="M150 250 Q 300 400 450 480" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 5" className="opacity-10" />
                        <g transform="translate(320, 390)">
                            <path d="M-10 -10 L10 10 M-10 10 L10 -10" stroke="#ef4444" strokeWidth="4" />
                        </g>
                    </svg>

                    {/* Interactive Nodes (HTML for easier styling/tooltips) */}
                    
                    {/* Node: CLIENT */}
                    <div 
                        className="absolute top-1/2 left-[15%] -translate-y-1/2 flex flex-col items-center cursor-pointer group/node"
                        onMouseEnter={() => setHoveredNode('client')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] z-10 transition-transform group-hover/node:scale-110">
                            <HardDrive className="text-white w-8 h-8" />
                        </div>
                        <div className="mt-4 bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 text-center">
                            <p className="text-white font-bold text-sm">Votre Entreprise</p>
                            <p className="text-slate-400 text-xs">Utilisateurs</p>
                        </div>
                    </div>

                    {/* Node: MONTREAL (Primary) */}
                    <div 
                        className="absolute top-[30%] right-[30%] flex flex-col items-center cursor-pointer group/node"
                        onMouseEnter={() => setHoveredNode('mtl')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
                            <div className="w-20 h-20 bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] z-10 transition-transform group-hover/node:scale-110">
                                <Server className="text-cyan-400 w-8 h-8" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-900">
                                QC
                            </div>
                        </div>
                        <div className="mt-4 bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg border border-cyan-500/30 text-center min-w-[150px]">
                            <p className="text-cyan-400 font-bold text-sm flex items-center justify-center gap-1">
                                <MapPin className="w-3 h-3"/> Montréal / BHS
                            </p>
                            <p className="text-slate-400 text-xs">Infrastructure Dédiée</p>
                            
                            {/* Hover Details */}
                            <div className={`absolute top-full left-0 right-0 mt-2 bg-slate-900 p-3 rounded-lg border border-slate-700 shadow-xl transition-all duration-300 ${hoveredNode === 'mtl' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                                <div className="space-y-2 text-xs text-left">
                                    <div className="flex justify-between"><span className="text-slate-400">Latence</span> <span className="text-green-400">~3ms</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Juridiction</span> <span className="text-green-400">Canada</span></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Backbone</span> <span className="text-green-400">OVHcloud</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Node: US CLOUD (Blocked) */}
                    <div className="absolute bottom-[5%] left-[40%] flex flex-col items-center opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all">
                         <div className="w-12 h-12 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center mb-2">
                             <AlertOctagon className="w-6 h-6 text-red-500" />
                         </div>
                         <p className="text-red-900 font-bold text-xs uppercase tracking-wider">Hébergement Étranger</p>
                    </div>

                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Résidence Canadienne</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Nous garantissons que vos données résident physiquement dans les centres de données de Beauharnois ou Montréal. Elles sont protégées par les lois canadiennes.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                            <DollarSign className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Zéro "Egress Fees"</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Contrairement aux hyperscalers (Azure/AWS), nous ne facturons pas la bande passante sortante. Votre facture est fixe, prévisible et en dollars canadiens.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                            <Cpu className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Performance Bare Metal</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Vos ressources ne sont pas partagées. Nous utilisons des serveurs dédiés (Bare Metal) orchestrés par Novitec pour une performance maximale.
                        </p>
                    </div>
                </div>
            </div>
       </div>

       {/* INTERACTIVE MIGRATION SECTION */}
       <div className="bg-slate-900 py-24 border-y border-slate-800 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 rounded-full mb-6">
                        <Rocket className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 text-sm font-bold uppercase tracking-wide">Processus Transparent</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Migration sans douleur en 4 étapes</h2>
                    <p className="text-slate-400">Cliquez sur les étapes pour découvrir comment nous déplaçons votre infrastructure.</p>
                </div>

                <div className="relative mt-20">
                    {/* Connecting Line - Background */}
                    <div className="absolute top-12 left-0 w-full h-1 bg-slate-800 rounded-full hidden md:block"></div>
                    
                    {/* Connecting Line - Progress (Animated) */}
                    <div 
                        className="absolute top-12 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full hidden md:block transition-all duration-700 ease-out"
                        style={{ width: `${(activeStep / (migrationSteps.length - 1)) * 100}%` }}
                    ></div>

                    {/* Steps Container */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {migrationSteps.map((step, index) => {
                            const isActive = index === activeStep;
                            const isPast = index < activeStep;
                            
                            return (
                                <div 
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`relative cursor-pointer group transition-all duration-300 ${isActive ? 'scale-105' : 'hover:scale-105'}`}
                                >
                                    {/* Icon Circle */}
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 transition-all duration-500 relative z-10
                                        ${isActive ? 'bg-slate-900 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 
                                          isPast ? 'bg-slate-800 border-blue-600' : 'bg-slate-900 border-slate-700 group-hover:border-slate-500'}
                                    `}>
                                        <step.icon className={`w-10 h-10 transition-all duration-300 
                                            ${isActive ? `${step.color} animate-pulse scale-110` : 
                                              isPast ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}
                                        `} />
                                    </div>

                                    {/* Text Card */}
                                    <div className={`text-center p-6 rounded-2xl border transition-all duration-500 min-h-[180px] flex flex-col justify-center
                                        ${isActive ? `bg-slate-800 border-cyan-500/50 shadow-xl` : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'}
                                    `}>
                                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block transition-colors
                                            ${isActive ? step.color : 'text-slate-500'}
                                        `}>
                                            Étape 0{index + 1}
                                        </span>
                                        <h3 className={`text-lg font-bold mb-3 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed transition-all duration-500 ${isActive ? 'text-slate-300 opacity-100' : 'text-slate-500 opacity-80'}`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Mobile connector (vertical) */}
                                    {index !== migrationSteps.length - 1 && (
                                        <div className="md:hidden absolute bottom-0 left-1/2 -ml-0.5 w-1 h-8 bg-slate-800 translate-y-full"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
       </div>

       {/* Comparison Table Section */}
       <div className="bg-white py-24 relative overflow-hidden">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">MonCloudPrive vs Les Géants</h2>
               
               <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
                   <div className="grid grid-cols-3 bg-slate-50 p-6 border-b border-slate-200 font-bold text-lg">
                       <div className="text-slate-500 flex items-center">Critères</div>
                       <div className="text-center text-red-500">Hyperscalers (Azure/AWS)</div>
                       <div className="text-center text-cyan-600">MonCloudPrive.ca</div>
                   </div>
                   
                   <div className="divide-y divide-slate-100">
                       <div className="grid grid-cols-3 p-6 items-center hover:bg-slate-50 transition-colors">
                           <div className="font-medium text-slate-700">Localisation des données</div>
                           <div className="text-center text-slate-500 text-sm">Régions vastes (Est du Canada)</div>
                           <div className="text-center font-bold text-cyan-600 flex justify-center items-center gap-2"><Check className="w-4 h-4"/> Beauharnois (Qc)</div>
                       </div>
                       <div className="grid grid-cols-3 p-6 items-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                           <div className="font-medium text-slate-700">Frais cachés (Egress)</div>
                           <div className="text-center text-red-500 font-bold">$$$ (Au Go)</div>
                           <div className="text-center font-bold text-green-600 flex justify-center items-center gap-2"><Check className="w-4 h-4"/> Inclus (Illimité)</div>
                       </div>
                       <div className="grid grid-cols-3 p-6 items-center hover:bg-slate-50 transition-colors">
                           <div className="font-medium text-slate-700">Support Technique</div>
                           <div className="text-center text-slate-500 text-sm">Ticket / Chatbot</div>
                           <div className="text-center font-bold text-cyan-600 flex justify-center items-center gap-2"><Check className="w-4 h-4"/> Ingénieur Novitec</div>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       {/* Technical Specs & Use Cases */}
       <div id="specs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                   <h2 className="text-4xl font-bold text-slate-900 mb-6">Une infrastructure robuste</h2>
                   <p className="text-slate-600 mb-10 text-lg">
                       Nous bâtissons votre environnement sur des serveurs dédiés de classe entreprise, sans "voisins bruyants" (Noisy Neighbors) qui ralentissent vos applications.
                   </p>
                   
                   <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="bg-slate-100 p-4 rounded-xl h-fit">
                                <Server className="w-8 h-8 text-slate-700" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">Serveurs Dédiés Gérés</h3>
                                <p className="text-slate-600 mt-2">Ressources garanties (CPU/RAM). Idéal pour contrôleurs de domaine, serveurs d'applications et bases de données SQL gourmandes.</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="bg-slate-100 p-4 rounded-xl h-fit">
                                <HardDrive className="w-8 h-8 text-slate-700" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">Stockage Objet S3 & Sauvegardes</h3>
                                <p className="text-slate-600 mt-2">Stockage compatible S3 pour vos archives. Cible de sauvegarde immuable pour Veeam ou Vinchin.</p>
                            </div>
                        </div>
                   </div>
               </div>
               
               <div className="bg-gradient-to-br from-blue-600 to-slate-900 p-1.5 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                   <div className="bg-slate-900 rounded-[22px] p-8 h-full">
                       <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3">
                           <ShieldCheck className="text-green-400 w-8 h-8"/>
                           Stack Technique Novitec
                       </h3>
                       <div className="space-y-5">
                           <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                               <span className="text-slate-400">Hyperviseur</span>
                               <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded">XCP-NG (Open Source)</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                               <span className="text-slate-400">Orchestration</span>
                               <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded">Xen Orchestra</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                               <span className="text-slate-400">Backbone Réseau</span>
                               <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded">OVHcloud (10 Gbps)</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                               <span className="text-slate-400">Stockage</span>
                               <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded">ZFS NVMe (Redondant)</span>
                           </div>
                       </div>
                       
                       <div className="mt-10 pt-6 border-t border-slate-700">
                           <Link to="/contact" className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white text-center font-bold py-4 rounded-xl transition-colors">
                               Parler à un architecte cloud
                           </Link>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       {/* CTA Banner with Image */}
       <div className="relative py-24 bg-blue-900 overflow-hidden">
            <div className="absolute inset-0">
                {/* Updated CTA Background Image */}
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20" alt="World connection"/>
            </div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">Vos données méritent un domicile sûr.</h2>
                <p className="text-xl text-blue-100 mb-10">
                    Déplacez votre infrastructure chez MonCloudPrive.ca et profitez de la tranquillité d'esprit d'un hébergement local géré par des experts.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-xl">
                    Demander une estimation d'hébergement <ArrowRight className="w-5 h-5"/>
                </Link>
            </div>
       </div>
    </div>
  );
};

export default Cloud;