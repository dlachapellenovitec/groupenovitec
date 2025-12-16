import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Smartphone, Globe, Headphones, Wifi, CheckCircle2, ArrowRight, Mic, Users, LayoutGrid, Zap, MonitorSmartphone, Server, PhoneForwarded } from 'lucide-react';

const VoIP: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section UC365 Branding */}
      <section className="bg-indigo-950 text-white pt-40 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000" 
                alt="Unified Communications" 
                className="w-full h-full object-cover opacity-10 mix-blend-overlay"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900/95 to-purple-900/80"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-xl mb-8">
                        <span className="bg-white text-indigo-900 text-xs font-bold px-2 py-0.5 rounded">DIVISION UC365</span>
                        <span className="text-sm font-medium text-indigo-100">Solutions VoIP & PBX Cloud</span>
                    </div>
                    
                    {/* Brand Name / Logo Representation */}
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-6xl lg:text-7xl font-black tracking-tighter">
                            UC<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">365</span>
                        </h1>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                        La puissance de <span className="text-blue-400">3CX</span>.<br/>
                        La flexibilité du Cloud.
                    </h2>
                    
                    <p className="text-lg text-indigo-100 mb-10 leading-relaxed max-w-xl">
                        <strong>UC365</strong>, une division de Groupe Novitec, déploie des systèmes téléphoniques d'affaires basés sur la technologie leader <strong>3CX</strong>. Réduisez vos coûts tout en gagnant des fonctionnalités d'entreprise avancées.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/contact" className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:bg-indigo-50 flex items-center justify-center gap-2">
                            Démo 3CX Gratuite
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#solutions" className="bg-indigo-800/50 hover:bg-indigo-800 text-white px-8 py-4 rounded-xl font-bold transition-all border border-indigo-500/30 flex items-center justify-center gap-2">
                            Voir nos forfaits
                        </a>
                    </div>
                </div>

                {/* Right Visual - 3CX App Representation */}
                <div className="lg:w-1/2 relative">
                    <div className="relative mx-auto bg-white rounded-[2rem] shadow-2xl p-3 max-w-md transform -rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-200">
                        <div className="bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-200 h-[500px] flex flex-col relative">
                             {/* Mock 3CX Interface Header */}
                             <div className="bg-slate-900 p-6 flex items-center justify-between text-white relative z-10">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">3CX</div>
                                     <div>
                                        <span className="font-bold text-sm block">UC365 Softphone</span>
                                        <span className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Disponible</span>
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Keypad Body */}
                             <div className="flex-grow p-6 flex flex-col">
                                 <div className="flex-grow flex items-center justify-center mb-6">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <Users className="w-10 h-10 text-slate-400" />
                                        </div>
                                        <h3 className="text-2xl font-light text-slate-800">Composer...</h3>
                                    </div>
                                 </div>
                                 
                                 {/* Numpad Mockup */}
                                 <div className="grid grid-cols-3 gap-4 mb-6">
                                     {[1,2,3,4,5,6,7,8,9, '*', 0, '#'].map(n => (
                                         <div key={n} className="h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-xl text-slate-700 font-medium hover:bg-slate-50 cursor-pointer active:scale-95 transition-transform">{n}</div>
                                     ))}
                                 </div>
                                 
                                 <div className="flex gap-4">
                                     <div className="flex-grow bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-green-500/30 font-bold">
                                         <Phone className="w-5 h-5 fill-current" /> Appel
                                     </div>
                                 </div>
                             </div>

                             {/* Bottom Nav */}
                             <div className="bg-white border-t border-slate-200 p-4 flex justify-around">
                                 <Users className="w-6 h-6 text-slate-400" />
                                 <div className="w-6 h-6 text-blue-600"><LayoutGrid className="w-6 h-6" /></div>
                                 <PhoneForwarded className="w-6 h-6 text-slate-400" />
                                 <Zap className="w-6 h-6 text-slate-400" />
                             </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute bottom-10 -right-4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Partenaire 3CX</p>
                            <p className="text-xs text-slate-500">Certifié Gold</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Introduction Division */}
      <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Plus qu'un simple téléphone</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">La référence mondiale 3CX</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                  Pourquoi UC365 mise sur 3CX ? C'est la solution la plus <strong>complète</strong> et la plus <strong>économique</strong> du marché. 
                  Contrairement aux systèmes traditionnels où vous payez par utilisateur, notre offre 3CX vous permet d'ajouter des extensions illimitées. 
                  Idéal pour la croissance de votre PME.
              </p>
          </div>
      </section>

      {/* Main Benefits */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi migrer votre téléphonie vers UC365 ?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                  La fin des lignes terrestres (PRI/Analogique) est inévitable. Passez au Cloud.
              </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                      <LayoutGrid className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Extensions Illimitées</h3>
                  <p className="text-slate-600">
                      Ajoutez des employés sans augmenter votre facture de licence. Avec notre forfait 3CX, vous payez pour la capacité d'appels simultanés, pas par tête.
                  </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                      <Smartphone className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Mobilité Totale</h3>
                  <p className="text-slate-600">
                      L'application mobile 3CX est reconnue comme la meilleure de l'industrie. Votre bureau vous suit partout, sans manquer un appel.
                  </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                      <Server className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Hébergement Local</h3>
                  <p className="text-slate-600">
                      Votre système PBX est hébergé dans nos centres de données à Montréal (MonCloudPrive). Vos conversations restent au Québec.
                  </p>
              </div>
          </div>
      </section>

      {/* Solutions Comparison */}
      <section id="solutions" className="bg-slate-900 py-24 text-white relative overflow-hidden">
          {/* Abstract BG */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="text-3xl font-bold text-center mb-16">Nos forfaits UC365</h2>
              
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                  
                  {/* Solution 1: UC365 Flex (3CX) - PRIMARY */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-1 border border-blue-400 shadow-2xl transition-colors relative transform scale-105 z-10">
                      <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-2xl shadow-lg">RECOMMANDÉ</div>
                      <div className="bg-slate-900/50 rounded-[22px] p-8 h-full flex flex-col backdrop-blur-sm">
                          <div className="flex items-center gap-4 mb-6">
                              <div className="bg-blue-500 p-2 rounded-lg">
                                  <Zap className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                  <h3 className="text-2xl font-bold">UC365 Flex (3CX)</h3>
                                  <p className="text-blue-200 text-sm">PBX Cloud Hébergé Dédié</p>
                              </div>
                          </div>
                          <p className="text-slate-200 mb-8 flex-grow font-medium">
                              La solution ultime pour les PME. Fonctionnalités de centre d'appels incluses, application mobile performante et coûts réduits.
                          </p>
                          <ul className="space-y-6 mb-8">
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Économique (Pas de coût/usager)</span>
                                      <span className="text-blue-100 text-sm">Payez pour le système, pas le nombre d'employés. Ajoutez des extensions gratuitement.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Fonctionnalités Avancées Incluses</span>
                                      <span className="text-blue-100 text-sm">Files d'attente, Enregistrement des appels, Live Chat pour votre site web, Vidéoconférence.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Compatibilité Totale</span>
                                      <span className="text-blue-100 text-sm">Réutilisez vos téléphones IP existants (Yealink, Fanvil, Snom) sans problème.</span>
                                  </div>
                              </li>
                               <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Hébergement Privé Novitec</span>
                                      <span className="text-blue-100 text-sm">Données sécurisées au Québec.</span>
                                  </div>
                              </li>
                          </ul>
                          <Link to="/contact" className="block w-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-center py-4 rounded-xl transition-colors shadow-lg shadow-blue-900/50">
                              Obtenir une soumission 3CX
                          </Link>
                      </div>
                  </div>

                  {/* Solution 2: UC365 Teams - SECONDARY */}
                  <div className="bg-slate-800 rounded-3xl p-1 border border-slate-700 hover:border-indigo-500 transition-colors opacity-90 hover:opacity-100">
                      <div className="bg-slate-900 rounded-[22px] p-8 h-full flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                              <div className="bg-white p-2 rounded-lg">
                                  {/* Using text/icon instead of fragile wikimedia link */}
                                  <div className="w-8 h-8 flex items-center justify-center font-bold text-indigo-700">T</div>
                              </div>
                              <div>
                                  <h3 className="text-2xl font-bold">UC365 Teams Direct</h3>
                                  <p className="text-indigo-400 text-sm">Intégration Microsoft Native</p>
                              </div>
                          </div>
                          <p className="text-slate-300 mb-8 flex-grow">
                              Idéal si vous voulez absolument tout centraliser dans l'interface Microsoft Teams. Nécessite des licences Microsoft additionnelles.
                          </p>
                          <ul className="space-y-6 mb-8">
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Interface Unique</span>
                                      <span className="text-slate-400 text-sm">Vos appels se font directement dans l'application Teams que vous utilisez déjà.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Simplicité pour l'usager</span>
                                      <span className="text-slate-400 text-sm">Pas de nouvelle application à apprendre pour vos employés.</span>
                                  </div>
                              </li>
                              <li className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                                  <div>
                                      <span className="font-bold block text-white">Appels illimités Canada/USA</span>
                                      <span className="text-slate-400 text-sm">Forfaits d'appels inclus via notre trunk SIP direct.</span>
                                  </div>
                              </li>
                          </ul>
                          <Link to="/contact" className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-center py-4 rounded-xl transition-colors">
                              Choisir l'option Teams
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Equipment Banner */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Compatible avec vos équipements préférés</h3>
              <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-2xl font-black text-slate-800">Yealink</span>
                  <span className="text-2xl font-bold text-slate-800">Poly</span>
                  <span className="text-2xl font-bold text-slate-800 italic">Jabra</span>
                  <span className="text-2xl font-bold text-slate-800">Sennheiser</span>
                  <span className="text-2xl font-black text-slate-800">Fanvil</span>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20 relative overflow-hidden text-center text-white">
          <div className="max-w-3xl mx-auto px-4 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <MonitorSmartphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Prêt à moderniser vos communications ?</h2>
              <p className="text-xl text-indigo-100 mb-10">
                  Contactez l'équipe UC365 pour une démonstration de l'interface 3CX et une analyse de vos économies potentielles.
              </p>
              <Link to="/contact" className="inline-block bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-indigo-50 transition-colors">
                  Obtenir une soumission UC365
              </Link>
          </div>
      </section>
    </div>
  );
};

export default VoIP;