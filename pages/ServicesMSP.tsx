import React, { useState } from 'react';
import { Check, X, ShieldCheck, Zap, Laptop, ArrowRight, Calculator, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesMSP: React.FC = () => {
  // ROI Calculator State
  const [employees, setEmployees] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [downtimeHours, setDowntimeHours] = useState(4);

  const calculateLoss = () => {
    return employees * hourlyRate * downtimeHours;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative bg-slate-900 pt-40 pb-24">
          <div className="absolute inset-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
                alt="Team working" 
                fetchPriority="high"
                className="w-full h-full object-cover opacity-20" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-medium text-sm mb-6">
                 Tranquillité d'esprit incluse
             </div>
             <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Forfaits de Services Gérés</h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Une approche proactive pour transformer vos TI en centre de profit plutôt qu'en centre de coûts. Choisissez la paix d'esprit.
             </p>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Pricing Tables */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Silver Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-200"></div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Co-Gestion</h3>
                <p className="text-slate-500 text-sm mt-2">Pour les entreprises ayant déjà une ressource TI interne.</p>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mb-6 py-4 border-b border-slate-100">Sur mesure</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Accès aux outils Novitec (Ticketing, RMM)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Escalade niveau 2 et 3</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Projets spéciaux & Remplacements</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Licences Microsoft 365 incluses</span>
              </li>
               <li className="flex items-start gap-3 opacity-50">
                <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">Support usager illimité</span>
              </li>
            </ul>
            <Link to="/contact" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-center rounded-xl transition-colors">
              Demander une soumission
            </Link>
          </div>

          {/* Gold Plan (Recommended) */}
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-8 relative transform lg:-translate-y-6 flex flex-col h-full ring-4 ring-blue-500/20 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            
            <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold text-center py-2 rounded-t-xl uppercase tracking-wider shadow-lg relative z-10">
              Le choix des PME
            </div>
            <div className="mt-6 mb-4 relative z-10">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    Novitec Intégral <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </h3>
                <p className="text-slate-400 text-sm mt-2">Votre département TI complet, sécurisé et géré.</p>
            </div>
            
            <div className="relative h-32 rounded-xl overflow-hidden mb-4 border border-slate-700 group z-10">
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000" 
                    alt="Cybersécurité Active" 
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                 />
            </div>
            
            <div className="flex items-center gap-2 mb-6 z-10 relative">
                 <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-slate-800 px-2 py-1 rounded border border-cyan-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Protection Active
                 </div>
            </div>

            <div className="text-4xl font-extrabold text-white mb-6 py-4 border-b border-slate-700 relative z-10">
                <span className="text-lg font-normal text-slate-400">dès </span>
                125$
                <span className="text-lg font-normal text-slate-400"> /usager</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow relative z-10">
            <li className="flex items-start gap-3">
                <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-green-400 shrink-0" /></div>
                <span className="text-slate-200 font-medium text-sm">Support Illimité (7h-18h)</span>
            </li>
            <li className="flex items-start gap-3">
                <div className="bg-cyan-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-cyan-400 shrink-0" /></div>
                <span className="text-white font-bold text-sm">Pack Sécurité Novigard inclus</span>
            </li>
            <li className="flex items-start gap-3">
                <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-green-400 shrink-0" /></div>
                <span className="text-slate-200 font-medium text-sm">Licences Microsoft 365 Business Premium</span>
            </li>
            <li className="flex items-start gap-3">
                <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-green-400 shrink-0" /></div>
                <span className="text-slate-200 font-medium text-sm">Sauvegarde M365 incluse</span>
            </li>
            <li className="flex items-start gap-3">
                <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-green-400 shrink-0" /></div>
                <span className="text-slate-200 font-medium text-sm">Alignement vCIO trimestriel</span>
            </li>
            </ul>
            <Link to="/contact" className="block w-full py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 relative z-10">
            Démarrer maintenant
            </Link>
          </div>

          {/* Platinum Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-200"></div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Conformité +</h3>
                <p className="text-slate-500 text-sm mt-2">Pour les industries hautement régulées (Finance, Santé).</p>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mb-6 py-4 border-b border-slate-100">Sur devis</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm font-semibold">Tout ce qui est inclus dans Intégral</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Support 24/7 critique</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Audit de conformité annuel</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Tests d'intrusion (Pen-test)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">SOC dédié (Security Operations Center)</span>
              </li>
            </ul>
            <Link to="/contact" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-center rounded-xl transition-colors">
              Parler à un expert
            </Link>
          </div>
        </div>

        {/* Process Section with Icons - NOW DARK MODE */}
        <div className="mt-32 -mx-4 sm:-mx-6 lg:-mx-8 bg-slate-900 py-24 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">L'Onboarding Novitec</h2>
                    <p className="text-slate-400">Une transition en douceur, sans interruption de vos activités.</p>
                </div>
                
                <div className="relative">
                    {/* Connector Line */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-700 z-0"></div>

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 text-center group hover:-translate-y-1 transition-transform">
                            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700 shadow-sm group-hover:border-blue-500 transition-colors">
                                <Laptop className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">1. Audit & Nettoyage</h3>
                            <p className="text-sm text-slate-400">Inventaire complet, suppression des logiciels inutiles et revue de sécurité initiale.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 text-center group hover:-translate-y-1 transition-transform">
                            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700 shadow-sm group-hover:border-blue-500 transition-colors">
                                <ShieldCheck className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">2. Sécurisation</h3>
                            <p className="text-sm text-slate-400">Déploiement de Novigard, MFA obligatoire et chiffrement des disques.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 text-center group hover:-translate-y-1 transition-transform">
                            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700 shadow-sm group-hover:border-blue-500 transition-colors">
                                <Zap className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">3. Optimisation</h3>
                            <p className="text-sm text-slate-400">Migration des courriels vers 365, mise en place des sauvegardes cloud.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 text-center group hover:-translate-y-1 transition-transform">
                            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700 shadow-sm group-hover:border-blue-500 transition-colors">
                                <Check className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">4. Gestion Active</h3>
                            <p className="text-sm text-slate-400">Support usager ouvert, surveillance 24/7 active.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* IMPRESS ME FEATURE: ROI CALCULATOR */}
        <div className="mt-32 max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
             {/* Abstract Background */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-30"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-30"></div>

             <div className="relative z-10">
                 <div className="text-center mb-12">
                     <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-4">
                        <Calculator className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300 uppercase tracking-wide">Calculateur de Coûts</span>
                     </div>
                     <h2 className="text-3xl font-bold mb-4">Combien vous coûte réellement une panne ?</h2>
                     <p className="text-slate-400 max-w-2xl mx-auto">
                        Utilisez notre simulateur pour estimer les pertes financières liées à une interruption de service.
                     </p>
                 </div>

                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="space-y-8">
                         <div>
                             <div className="flex justify-between mb-2">
                                 <label className="text-sm font-bold text-slate-300">Nombre d'employés impactés</label>
                                 <span className="text-blue-400 font-bold">{employees}</span>
                             </div>
                             <input 
                                type="range" min="1" max="100" value={employees} 
                                onChange={(e) => setEmployees(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                             />
                         </div>
                         <div>
                             <div className="flex justify-between mb-2">
                                 <label className="text-sm font-bold text-slate-300">Salaire horaire moyen ($/h)</label>
                                 <span className="text-blue-400 font-bold">{hourlyRate}$</span>
                             </div>
                             <input 
                                type="range" min="20" max="200" step="5" value={hourlyRate} 
                                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                             />
                         </div>
                         <div>
                             <div className="flex justify-between mb-2">
                                 <label className="text-sm font-bold text-slate-300">Heures d'arrêt (Downtime)</label>
                                 <span className="text-blue-400 font-bold">{downtimeHours}h</span>
                             </div>
                             <input 
                                type="range" min="1" max="48" value={downtimeHours} 
                                onChange={(e) => setDowntimeHours(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                             />
                         </div>
                     </div>

                     <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                         <p className="text-slate-400 text-sm mb-2 font-medium uppercase tracking-widest">Coût estimé de la panne</p>
                         <div className="text-5xl font-black text-white mb-2 tracking-tight">
                            {calculateLoss().toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                         </div>
                         <div className="text-xs text-slate-500 mb-6 flex items-center justify-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-orange-500" />
                            Sans compter la perte de réputation
                         </div>
                         
                         <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl">
                             <div className="flex items-center justify-center gap-2 text-blue-400 font-bold mb-1">
                                <ShieldCheck className="w-5 h-5" />
                                Solution Novitec
                             </div>
                             <p className="text-sm text-slate-300">
                                 Avec nos plans MSP, ce montant est investi dans la prévention plutôt que perdu dans la réparation.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesMSP;