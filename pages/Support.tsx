import React from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, Mail, Phone, Clock, Download, AlertTriangle, CheckCircle2, Search, ArrowRight, Monitor, Command } from 'lucide-react';
import { useData } from '../context/DataContext';

const Support: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Search Section */}
      <section className="bg-slate-900 text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Centre de Support {settings.companyName.split(' ')[1]}</h1>
            <p className="text-xl text-slate-300 mb-10">
                Nos techniciens sont prêts à vous aider. Choisissez votre méthode de contact préférée.
            </p>
            
            {/* Quick Action Cards */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
                {/* Method 1: Portal (Preferred) */}
                <div className="bg-blue-600 rounded-2xl p-6 shadow-xl border border-blue-500 hover:bg-blue-700 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-white/20 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMANDÉ</div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                        <LifeBuoy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Portail Client</h3>
                    <p className="text-blue-100 text-sm mb-4">Créez et suivez vos tickets, consultez vos factures et accès.</p>
                    <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                        Connexion <ArrowRight className="w-4 h-4" />
                    </span>
                </div>

                {/* Method 2: Email */}
                <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:bg-slate-750 transition-colors group">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Par Courriel</h3>
                    <p className="text-slate-400 text-sm mb-4">Un ticket est automatiquement créé dans notre système.</p>
                    <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {settings.email}
                    </a>
                </div>

                {/* Method 3: Phone */}
                <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:bg-slate-750 transition-colors group">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                        <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Urgence (24/7)</h3>
                    <p className="text-slate-400 text-sm mb-4">Pour les pannes critiques bloquant toute l'entreprise.</p>
                    <a href={`tel:${settings.phone.replace(/\D/g,'')}`} className="flex items-center gap-2 text-sm font-bold text-green-400 group-hover:text-green-300 transition-colors">
                        {settings.phone}
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Remote Support Download */}
      <section className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-6">
                      <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shrink-0 hidden sm:block">
                          <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <div>
                          <h2 className="text-2xl font-bold text-slate-900 mb-2">Prise en main à distance</h2>
                          <p className="text-slate-600">
                              Le technicien vous demande de télécharger l'outil de support rapide ? C'est ici.
                              <br/><span className="text-sm text-slate-500 italic">Aucune installation requise (SOS Splashtop / TeamViewer QS).</span>
                          </p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <button className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm group">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                             <Monitor className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-sm">Télécharger (Windows)</span>
                      </button>
                      <button className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-xl hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm group">
                          <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
                             <Command className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-sm">Télécharger (Mac)</span>
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* SLA & Status */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
              
              {/* SLA Table */}
              <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Niveaux de Service (SLA)</h2>
                  <p className="text-slate-600 mb-8">
                      Nous traitons les demandes selon leur niveau d'impact sur vos affaires. Voici nos cibles de réponse (Première réponse humaine).
                  </p>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 tracking-wider">
                                  <th className="p-4 font-bold">Priorité</th>
                                  <th className="p-4 font-bold">Description</th>
                                  <th className="p-4 font-bold">Délai Cible</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-sm">
                              <tr className="bg-red-50/50">
                                  <td className="p-4 font-bold text-red-600 flex items-center gap-2">
                                      <AlertTriangle className="w-4 h-4" /> P1 - Critique
                                  </td>
                                  <td className="p-4 text-slate-700">Arrêt complet de l'entreprise. Serveur en panne, panne réseau globale, ransomware.</td>
                                  <td className="p-4 font-bold text-slate-900">15 - 30 min</td>
                              </tr>
                              <tr>
                                  <td className="p-4 font-bold text-orange-500">P2 - Élevée</td>
                                  <td className="p-4 text-slate-700">Dégradation majeure. Un département bloqué, application critique lente.</td>
                                  <td className="p-4 font-bold text-slate-900">2 heures</td>
                              </tr>
                              <tr>
                                  <td className="p-4 font-bold text-blue-600">P3 - Normale</td>
                                  <td className="p-4 text-slate-700">Problème individuel. Ordinateur lent, impression impossible, erreur Outlook.</td>
                                  <td className="p-4 font-bold text-slate-900">8 heures</td>
                              </tr>
                              <tr>
                                  <td className="p-4 font-bold text-slate-500">P4 - Planifiée</td>
                                  <td className="p-4 text-slate-700">Demande de changement. Nouvel usager, installation logiciel, configuration.</td>
                                  <td className="p-4 font-bold text-slate-900">Planifié</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

              {/* Hours & Info */}
              <div className="space-y-8">
                  <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-400" /> Heures d'ouverture
                      </h3>
                      <div className="space-y-4 text-sm">
                          <div className="flex justify-between border-b border-slate-700 pb-2">
                              <span className="text-slate-300">Lundi - Vendredi</span>
                              <span className="font-bold">7:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-700 pb-2">
                              <span className="text-slate-300">Samedi - Dimanche</span>
                              <span className="font-bold text-orange-400">Urgence Seulement*</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-slate-300">Jours Fériés</span>
                              <span className="font-bold text-orange-400">Urgence Seulement*</span>
                          </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-6 italic">
                          *Des frais d'urgence peuvent s'appliquer pour les clients sans entente 24/7.
                      </p>
                  </div>

                  <div className="bg-green-50 border border-green-100 p-6 rounded-2xl">
                      <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> État des systèmes
                      </h3>
                      <p className="text-sm text-green-700 mb-4">Tous les systèmes (M365, Cloud, VoIP) sont opérationnels.</p>
                      <a href="#" className="text-xs font-bold text-green-800 underline hover:no-underline">Voir la page de statut</a>
                  </div>
              </div>
          </div>
      </section>

      {/* Ticket Process */}
      <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-12">Le cycle de vie d'un ticket</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-center relative">
                  {/* Line Connector */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 hidden md:block"></div>

                  <div className="bg-white p-4 w-64">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl border-4 border-white shadow-sm">1</div>
                      <h4 className="font-bold text-slate-900">Réception</h4>
                      <p className="text-xs text-slate-500 mt-1">Ticket créé et confirmation par courriel envoyée instantanément.</p>
                  </div>
                  <div className="bg-white p-4 w-64">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl border-4 border-white shadow-sm">2</div>
                      <h4 className="font-bold text-slate-900">Triage</h4>
                      <p className="text-xs text-slate-500 mt-1">Le répartiteur analyse l'urgence et assigne le meilleur technicien.</p>
                  </div>
                  <div className="bg-white p-4 w-64">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl border-4 border-white shadow-sm">3</div>
                      <h4 className="font-bold text-slate-900">Résolution</h4>
                      <p className="text-xs text-slate-500 mt-1">Intervention à distance ou sur place. Communication continue.</p>
                  </div>
                  <div className="bg-white p-4 w-64">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold text-xl border-4 border-white shadow-sm">4</div>
                      <h4 className="font-bold text-slate-900">Clôture</h4>
                      <p className="text-xs text-slate-500 mt-1">Confirmation du succès et sondage de satisfaction.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Support;