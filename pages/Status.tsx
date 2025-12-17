import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Server, Cloud, Phone, Mail, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const StatusItem = ({ name, status, uptime, note }: { name: string, status: 'operational' | 'degraded' | 'down', uptime: string, note?: string }) => {
    const statusConfig = {
        operational: { color: 'text-green-500', bg: 'bg-green-500', label: 'Opérationnel', icon: CheckCircle2 },
        degraded: { color: 'text-orange-500', bg: 'bg-orange-500', label: 'Performance dégradée', icon: AlertTriangle },
        down: { color: 'text-red-500', bg: 'bg-red-500', label: 'Panne majeure', icon: XCircle },
    };

    const config = statusConfig[status];

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h4 className="font-bold text-white text-lg mb-1">{name}</h4>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${config.bg} animate-pulse`}></span>
                        <span className={`text-sm ${config.color} font-medium`}>{config.label}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-1">Uptime (30j)</span>
                    <span className="text-white font-bold font-mono">{uptime}</span>
                </div>
            </div>
            {note && (
                <div className="mt-3 p-3 bg-slate-900/50 border-l-2 border-slate-600 text-sm text-slate-300">
                    <strong>Note :</strong> {note}
                </div>
            )}
        </div>
    );
};

const Status: React.FC = () => {
  const { systemStatus, incidents } = useData();

  // Helper filters
  const cloudServices = systemStatus.filter(s => s.category === 'cloud');
  const voipServices = systemStatus.filter(s => s.category === 'voip');
  const securityServices = systemStatus.filter(s => s.category === 'security');

  // Check global health
  const allOperational = systemStatus.every(s => s.status === 'operational');

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
              {allOperational ? (
                  <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full mb-6">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-bold text-sm">Tous les systèmes opérationnels</span>
                  </div>
              ) : (
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-6">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 font-bold text-sm">Incidents en cours</span>
                  </div>
              )}
              <h1 className="text-4xl font-bold mb-4">État des Services Novitec</h1>
              <p className="text-slate-400">
                  Transparence totale sur l'état de nos infrastructures Cloud, VoIP et Sécurité.
                  <br/>Dernière mise à jour : <span className="text-white font-mono">{new Date().toLocaleTimeString()}</span>
              </p>
          </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          
          {/* Section: Infrastructure */}
          <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Cloud className="w-6 h-6 text-blue-400" /> Infrastructure Cloud (MonCloudPrive)
              </h2>
              <div className="space-y-4">
                  {cloudServices.map(service => (
                      <StatusItem key={service.id} {...service} />
                  ))}
              </div>
          </div>

          {/* Section: Communication */}
          <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-indigo-400" /> Communications Unifiées (UC365)
              </h2>
              <div className="space-y-4">
                  {voipServices.map(service => (
                      <StatusItem key={service.id} {...service} />
                  ))}
              </div>
          </div>

           {/* Section: Microsoft & Security */}
           <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" /> Sécurité & Microsoft
              </h2>
              <div className="space-y-4">
                  {securityServices.map(service => (
                      <StatusItem key={service.id} {...service} />
                  ))}
              </div>
          </div>

          {/* Incident History */}
          <div className="pt-12 border-t border-slate-800">
              <h2 className="text-xl font-bold mb-6">Historique des incidents (30 jours)</h2>
              <div className="space-y-6">
                  {incidents.length === 0 ? (
                      <p className="text-slate-500 italic">Aucun incident récent à afficher.</p>
                  ) : (
                      incidents.map(inc => (
                          <div key={inc.id} className="relative pl-8 border-l border-slate-800 pb-6">
                              <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-slate-950 ${inc.severity === 'good' ? 'bg-green-500' : inc.severity === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                              <p className="text-slate-500 text-sm mb-1">{inc.date}</p>
                              {inc.title && <h4 className="font-bold text-white mb-2">{inc.title}</h4>}
                              <p className="text-slate-400 text-sm leading-relaxed">{inc.message}</p>
                          </div>
                      ))
                  )}
              </div>
          </div>

          <div className="text-center pt-12">
               <Link to="/contact" className="text-slate-400 hover:text-white transition-colors underline text-sm">
                   Signaler une panne non listée
               </Link>
          </div>
      </div>
    </div>
  );
};

export default Status;