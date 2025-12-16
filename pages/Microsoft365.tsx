import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cloud, Mail, CheckCircle2, AlertTriangle, RefreshCw, LayoutGrid, Lock, Zap, UserX, Link as LinkIcon, FileSearch, ArrowRight, Eye, FileCheck, ShieldCheck } from 'lucide-react';

const Microsoft365: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557853197-a2511f0e1344?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Partenaire Microsoft Solutions</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Microsoft 365 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Géré, Sécurisé & Sauvegardé.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Ne vous contentez pas d'acheter des licences. Obtenez un environnement de travail productif, configuré selon les meilleures pratiques de sécurité par nos experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2">
                Auditer mon Tenant 365
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#plans" className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-center backdrop-blur-sm">
                Voir les plans
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center perspective-1000">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-md shadow-2xl transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
               <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                  <div className="bg-blue-500 p-4 rounded-2xl shadow-lg">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Santé du Tenant</h3>
                    <p className="text-sm text-blue-200">Dernière analyse : Aujourd'hui</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                        <span>Score de sécurité</span>
                        <span className="text-green-400 font-bold">82% (Excellent)</span>
                    </div>
                    <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full w-[82%]"></div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg">
                        <div className="bg-green-500/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-400" /></div>
                        MFA Activé (Tous les utilisateurs)
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg">
                        <div className="bg-green-500/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-400" /></div>
                        Sauvegarde Cloud Active
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg">
                        <div className="bg-green-500/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-400" /></div>
                        Politiques Anti-Phishing
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Backup Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 lg:p-16 border border-slate-200 shadow-xl flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Attention requise</span>
                    </div>
                    <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Microsoft ne sauvegarde <span className="text-red-600">pas</span> vos données.
                    </h3>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        C'est le "Modèle de Responsabilité Partagée". Microsoft garantit que le service fonctionne (uptime), mais <strong>vous</strong> êtes responsable de vos données.
                    </p>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Si un employé efface un dossier SharePoint par erreur, ou si un pirate crypte votre OneDrive, Microsoft ne peut rien restaurer au-delà de la corbeille temporaire (30 jours).
                    </p>
                </div>
                <div className="lg:w-1/2 bg-white p-10 rounded-3xl shadow-lg border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                    
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                         <RefreshCw className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Sauvegarde Cloud-to-Cloud</h3>
                    <p className="text-slate-500 mb-8">Exchange, OneDrive, SharePoint & Teams.</p>
                    
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-5xl font-black text-slate-900">3,95$</span>
                        <span className="text-slate-500 font-medium">/mois</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-8">par utilisateur</p>
                    
                    <ul className="text-left space-y-3 mb-8 max-w-xs mx-auto">
                        <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0"/> Rétention illimitée</li>
                        <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0"/> Restauration granulaire</li>
                        <li className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0"/> Hébergé au Canada</li>
                    </ul>
                    <Link to="/contact" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-blue-600/30">
                        Activer ma sauvegarde
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="plans">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Plus que des licences, une gestion complète</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Nous auditons, sécurisons et gérons votre environnement pour que vous tiriez le maximum de votre investissement Microsoft.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Business Standard */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                    <LayoutGrid className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Business Standard</h3>
                <p className="text-sm text-slate-500 mb-8">L'essentiel pour travailler.</p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-slate-700 text-sm">Suite Office Desktop</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-slate-700 text-sm">Courriel Exchange (50 Go)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-slate-700 text-sm">Teams & SharePoint</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-slate-500 text-sm italic">Sécurité de base uniquement</span>
                    </li>
                </ul>
            </div>

            {/* Business Premium */}
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-600 relative shadow-2xl transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-xl">RECOMMANDÉ</div>
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Business Premium</h3>
                <p className="text-sm text-slate-500 mb-8">Le standard pour les PME sécurisées.</p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-slate-900 font-medium text-sm">Tout inclus dans Standard</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-slate-900 font-medium text-sm">Defender for Business</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-slate-900 font-medium text-sm">Intune (Gestion des appareils)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-slate-900 font-medium text-sm">Accès conditionnel & MFA</span>
                    </li>
                </ul>
            </div>

            {/* Gestion Novitec */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
                    <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">L'Ajout Novitec</h3>
                <p className="text-sm text-slate-400 mb-8">Notre valeur ajoutée sur vos licences.</p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-slate-300 text-sm">Support technique bilingue (QC)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-slate-300 text-sm">Configuration "Best Practice"</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-slate-300 text-sm">Gestion des départs/arrivées</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-slate-300 text-sm">Facture unique consolidée</span>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* Security Deep Dive Section (Novigard Extension) */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             
             <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-bold text-cyan-400 tracking-wide uppercase">Extension Novigard</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">Une forteresse autour de vos courriels</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                    90% des cyberattaques commencent par un courriel. Nous ajoutons une couche d'intelligence artificielle et de surveillance active pour bloquer ce que Microsoft laisse passer, avant même que cela n'atteigne votre boîte de réception.
                    </p>
                </div>

                {/* Advanced Data Protection Visual */}
                <div className="lg:w-1/2 flex justify-center">
                    <div className="relative w-96 h-96 flex items-center justify-center perspective-1000">
                        
                        {/* Spinning Shield Ring */}
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2 border border-cyan-500/50 rounded-full">
                                <Shield className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-900 p-2 border border-cyan-500/50 rounded-full">
                                <Lock className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2 border border-cyan-500/50 rounded-full">
                                <Eye className="w-4 h-4 text-cyan-400" />
                            </div>
                             <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2 border border-cyan-500/50 rounded-full">
                                <FileCheck className="w-4 h-4 text-cyan-400" />
                            </div>
                        </div>

                        {/* Counter-Spinning Data Ring */}
                        <div className="absolute w-72 h-72 border border-blue-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse]">
                        </div>

                        {/* Central Fortress */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            {/* Glowing Core */}
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                            
                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-600 shadow-2xl relative z-20 w-32 h-32 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-2">
                                     <div className="w-10 h-10 bg-[#0078D4] rounded-lg flex items-center justify-center text-white"><LayoutGrid className="w-6 h-6" /></div>
                                     <div className="w-10 h-10 bg-[#28A8EA] rounded-lg flex items-center justify-center text-white"><Mail className="w-6 h-6" /></div>
                                     <div className="w-10 h-10 bg-[#00B7C3] rounded-lg flex items-center justify-center text-white"><CheckCircle2 className="w-6 h-6" /></div>
                                     <div className="w-10 h-10 bg-[#036C70] rounded-lg flex items-center justify-center text-white"><Lock className="w-6 h-6" /></div>
                                </div>
                                {/* Status Dot */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-16 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg text-white border border-white/10 flex items-center gap-2 animate-bounce">
                                <ShieldCheck className="w-4 h-4" />
                                NOVIGARD ACTIVE
                            </div>
                        </div>

                        {/* Data Particles */}
                        <div className="absolute inset-0 overflow-hidden rounded-full opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                            <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-300"></div>
                        </div>

                    </div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group">
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                        <Zap className="w-7 h-7 text-yellow-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-white">Anti-Phishing IA</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Analyse linguistique avancée pour détecter l'impersonnation de PDG, les fausses factures et l'ingénierie sociale.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group">
                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                        <UserX className="w-7 h-7 text-red-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-white">Anti-Compromission</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Détection des connexions suspectes (voyage impossible, nouvelle IP risquée) et verrouillage automatique.
                    </p>
                </div>
                {/* Feature 3 */}
                 <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <LinkIcon className="w-7 h-7 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-white">Safe Links</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Analyse des liens au moment du clic. Si un site devient malveillant après réception, vous restez protégé.
                    </p>
                </div>
                {/* Feature 4 */}
                 <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group">
                    <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                        <FileSearch className="w-7 h-7 text-green-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-white">Scan SharePoint</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Analyse continue de vos fichiers OneDrive et Teams pour empêcher la propagation latérale de ransomwares.
                    </p>
                </div>
             </div>
          </div>
      </section>

      {/* Migration Banner */}
      <section className="bg-blue-50 py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Encore sur Gmail, Exchange serveur ou POP3 ?</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Nous gérons la migration complète de vos courriels et fichiers vers Microsoft 365 sans perte de données et avec un minimum d'interruption.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:bg-blue-100 px-6 py-3 rounded-lg transition-colors border border-blue-200 bg-white shadow-sm">
                  Demander un plan de migration <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-6">Payez-vous pour des licences que vous n'utilisez pas ?</h2>
            <p className="text-xl text-blue-100 mb-10">
                En moyenne, nos clients économisent 15% sur leur facture Microsoft après notre audit de licences.
            </p>
            <Link to="/contact" className="inline-block bg-white text-blue-700 font-bold py-4 px-12 rounded-xl shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
                Obtenir une soumission 365
            </Link>
          </div>
      </section>
    </div>
  );
};

export default Microsoft365;