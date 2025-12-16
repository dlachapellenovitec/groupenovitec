import React from 'react';
import { Briefcase, Coffee, Zap, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Careers: React.FC = () => {
  const { jobs } = useData();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
        {/* Header */}
        <div className="relative bg-blue-900 text-white pt-40 pb-32 overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h1 className="text-5xl font-bold mb-6">Rejoins l'équipe Novitec</h1>
                <p className="text-2xl text-blue-100 max-w-2xl mx-auto">
                    Pas juste "une autre job en TI". Viens bâtir le MSP le plus respecté du Québec.
                </p>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-16 grid md:grid-cols-3 gap-8 relative z-20">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <Coffee className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Équilibre Vie/Travail</h3>
                <p className="text-slate-600 leading-relaxed">On travaille fort, mais on respecte ton temps. Pas d'heures sup non payées ou de "on call" abusif.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Stack Techno Moderne</h3>
                <p className="text-slate-600 leading-relaxed">Fini de réparer des serveurs 2003. On travaille avec XCP-NG, HaloPSA, SentinelOne et Azure.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Développement</h3>
                <p className="text-slate-600 leading-relaxed">Budget de formation annuel et certifications payées (Microsoft, Cisco, Sécurité) pour booster ta carrière.</p>
            </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-4xl mx-auto px-4 mt-24">
            <div className="flex items-center gap-3 mb-10">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-slate-900">Postes ouverts</h2>
            </div>
            
            <div className="space-y-6">
                {jobs.length === 0 ? (
                    <p className="text-slate-500 italic">Aucun poste affiché pour le moment.</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition-all hover:border-blue-300 group cursor-pointer">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {job.type}</span>
                                    </div>
                                    <p className="mt-4 text-slate-600 text-sm max-w-xl">{job.summary}</p>
                                </div>
                                <button className="bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2 shrink-0">
                                    Postuler <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-16 bg-gradient-to-r from-slate-100 to-white p-10 rounded-3xl border border-slate-200 text-center">
                <h3 className="font-bold text-2xl text-slate-900 mb-3">Candidature spontanée ?</h3>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">On cherche toujours des talents passionnés. Si tu penses avoir ta place chez nous, ne sois pas gêné.</p>
                <a href="mailto:support@novitec.ca" className="inline-block bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 hover:text-blue-600 font-bold px-8 py-3 rounded-xl transition-all">
                    Envoyer mon CV à support@novitec.ca
                </a>
            </div>
        </div>
    </div>
  );
};

export default Careers;