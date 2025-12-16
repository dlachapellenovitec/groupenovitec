import React from 'react';
import { Shield, Lock, Eye, FileCheck, Fingerprint, Database, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';

const Novigard: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* Hero */}
      <div className="relative pt-40 pb-32 overflow-hidden flex items-center justify-center">
        {/* Updated Hero Background - More abstract/tech */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>
        
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 rounded-full backdrop-blur-md mb-8">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <span className="text-cyan-300 font-mono text-sm tracking-widest uppercase">Cyber Defense Active</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                NOVIGARD™
            </h1>
            <p className="text-2xl text-slate-300 max-w-2xl leading-relaxed mb-10">
                Le bouclier numérique des PME québécoises. <br/>
                <span className="text-cyan-400 font-bold">Détection, Protection et Réponse 24/7.</span>
            </p>
            
            <Link to="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 hover:bg-cyan-500">
                <div className="absolute -inset-3 rounded-xl bg-cyan-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
                <span>Auditer ma sécurité</span>
                <Shield className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform"/>
            </Link>
        </div>
      </div>

      {/* The Problem - Dark Cards */}
      <div className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">L'antivirus gratuit ne suffit plus.</h2>
                    <p className="text-slate-400 mb-6 leading-relaxed text-lg">
                        Les cybercriminels modernes n'attaquent pas les ordinateurs, ils attaquent les identités. Ils contournent les pare-feu traditionnels par des courriels d'hameçonnage sophistiqués.
                    </p>
                    <div className="space-y-4">
                         <div className="flex items-start gap-4">
                            <div className="bg-red-500/10 p-2 rounded-lg"><Siren className="w-6 h-6 text-red-500" /></div>
                            <div>
                                <h4 className="text-white font-bold">Ransomware Humain</h4>
                                <p className="text-sm text-slate-500">Des pirates négocient la rançon en direct. Le blocage automatique ne suffit pas.</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-orange-500/10 p-2 rounded-lg"><FileCheck className="w-6 h-6 text-orange-500" /></div>
                            <div>
                                <h4 className="text-white font-bold">Loi 25 & Amendes</h4>
                                <p className="text-sm text-slate-500">Vous êtes légalement responsable des données de vos clients. L'ignorance n'est plus une excuse.</p>
                            </div>
                         </div>
                    </div>
                </div>
                
                {/* Visual Representation of Attacks */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-sm text-slate-400 shadow-2xl">
                        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-auto text-xs opacity-50">security_log.txt</span>
                        </div>
                        <div className="space-y-2">
                            <p><span className="text-blue-400">09:14:22</span> <span className="text-red-400">[CRITICAL]</span> Unauthorized login attempt from IP 45.22.19.11 (Russia)</p>
                            <p><span className="text-blue-400">09:14:23</span> <span className="text-yellow-400">[WARN]</span> 50 failed password attempts for user 'admin'</p>
                            <p><span className="text-blue-400">09:14:25</span> <span className="text-green-400">[INFO]</span> NOVIGARD Agent: IP blocked automatically.</p>
                            <p><span className="text-blue-400">09:14:26</span> <span className="text-green-400">[INFO]</span> Alert sent to SOC team.</p>
                            <p className="animate-pulse text-cyan-400 mt-4">> System Secure.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">L'Arsenal Novigard</h2>
              <p className="text-slate-400">Une suite complète d'outils interconnectés.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Eye className="w-24 h-24 text-cyan-400" />
                  </div>
                  <Eye className="w-10 h-10 text-cyan-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">EDR & SOC 24/7</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                      Surveillance comportementale en temps réel. Si un fichier Excel commence à crypter votre disque dur, nous le tuons instantanément.
                  </p>
              </div>
              
              {/* Card 2 */}
              <div className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Fingerprint className="w-24 h-24 text-purple-400" />
                  </div>
                  <Fingerprint className="w-10 h-10 text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">Gestion des Identités</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                      MFA (Double facteur) forcé partout. Accès conditionnel géolocalisé. Gestion sécurisée des mots de passe d'entreprise.
                  </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Database className="w-24 h-24 text-blue-400" />
                  </div>
                  <Database className="w-10 h-10 text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-white">Sauvegarde Immuable</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                      Backups 365 et Serveurs stockés sur un stockage immuable (WORM). Même l'administrateur ne peut pas les effacer avant la fin de la rétention.
                  </p>
              </div>
          </div>
      </div>

      {/* CTA */}
      <div className="relative py-20 bg-slate-950 border-t border-slate-900">
           <div className="absolute inset-0 bg-cyan-900/10"></div>
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-8">Votre entreprise est-elle vulnérable ?</h2>
              <div className="flex justify-center">
                  <Link to="/contact" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-cyan-900/50 transition-all transform hover:scale-105">
                      Lancer un diagnostic gratuit
                  </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">Aucun engagement requis. Rapport PDF confidentiel inclus.</p>
           </div>
      </div>
    </div>
  );
};

export default Novigard;