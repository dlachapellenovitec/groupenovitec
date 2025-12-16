import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, LifeBuoy, ArrowRight, MessageSquare, Clock, CheckCircle2, Building2, Scale, Stethoscope, HardHat, Briefcase } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { settings } = useData();
  const [sector, setSector] = useState('');
  const [need, setNeed] = useState('Services Gérés (MSP)');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [responseTime, setResponseTime] = useState(12); // Mock dynamic time

  // Simulation d'un temps de réponse qui change légèrement
  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime(prev => prev === 12 ? 15 : 12);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSector(selected);
    
    // Smart Autocomplete Logic
    if (selected === 'Juridique' || selected === 'Finance') {
        setNeed('Audit de Sécurité / Novigard');
    } else if (selected === 'Santé') {
        setNeed('Services Gérés (MSP)');
    } else if (selected === 'Construction') {
        setNeed('Projet Cloud / Migration');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
        setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20">
            {/* Sales Side */}
            <div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>Parlons affaires</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-bold text-sm animate-pulse">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>Réponse moy. : {responseTime} min</span>
                    </div>
                </div>

                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Discutons de vos TI</h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                    Vous cherchez un partenaire TI fiable ? Remplissez le formulaire pour une consultation gratuite ou un audit sommaire de votre sécurité.
                </p>

                {formStatus === 'success' ? (
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message reçu !</h3>
                        <p className="text-slate-600 mb-6">
                            Merci de votre intérêt. Un expert Novitec analysera votre demande et vous contactera d'ici quelques minutes.
                        </p>
                        <button onClick={() => setFormStatus('idle')} className="text-blue-600 font-bold hover:underline">
                            Envoyer une autre demande
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-200 space-y-6 relative overflow-hidden">
                        {formStatus === 'submitting' && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Prénom</label>
                                <input required type="text" className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Jean" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nom</label>
                                <input required type="text" className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Tremblay" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Courriel professionnel</label>
                            <input required type="email" className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="jean@entreprise.com" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Entreprise</label>
                                <input required type="text" className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Votre Société Inc." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Secteur d'activité</label>
                                <div className="relative">
                                    <select 
                                        required
                                        value={sector}
                                        onChange={handleSectorChange}
                                        className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                                    >
                                        <option value="" disabled>Sélectionner...</option>
                                        <option value="Juridique">Juridique / Avocat</option>
                                        <option value="Finance">Finance / Comptabilité</option>
                                        <option value="Santé">Santé / Clinique</option>
                                        <option value="Construction">Construction / Ingénierie</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                        {sector === 'Juridique' && <Scale className="w-4 h-4" />}
                                        {sector === 'Finance' && <Building2 className="w-4 h-4" />}
                                        {sector === 'Santé' && <Stethoscope className="w-4 h-4" />}
                                        {sector === 'Construction' && <HardHat className="w-4 h-4" />}
                                        {sector === '' && <Briefcase className="w-4 h-4" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Smart Feedback based on Sector */}
                        {sector === 'Juridique' && (
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3 text-sm text-blue-800 animate-fade-in">
                                <Scale className="w-5 h-5 shrink-0 mt-0.5" />
                                <span><strong>Note :</strong> Nous accompagnons déjà 15+ cabinets. Nous connaissons vos enjeux de confidentialité et la gestion des dossiers sous Maître/JurisConcept.</span>
                            </div>
                        )}
                        {sector === 'Finance' && (
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3 text-sm text-blue-800 animate-fade-in">
                                <Building2 className="w-5 h-5 shrink-0 mt-0.5" />
                                <span><strong>Note :</strong> Experts en Loi 25. Nous sécurisons vos données fiscales et clients (Taxprep, DT Max, Acomba).</span>
                            </div>
                        )}
                         {sector === 'Santé' && (
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3 text-sm text-blue-800 animate-fade-in">
                                <Stethoscope className="w-5 h-5 shrink-0 mt-0.5" />
                                <span><strong>Note :</strong> Nous assurons la continuité de vos opérations cliniques et la protection des dossiers patients (DMÉ).</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Besoin principal</label>
                            <div className="relative">
                                <select 
                                    value={need}
                                    onChange={(e) => setNeed(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                                >
                                    <option>Services Gérés (MSP)</option>
                                    <option>Audit de Sécurité / Novigard</option>
                                    <option>Projet Cloud / Migration</option>
                                    <option>Support Microsoft 365</option>
                                    <option>Autre</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            Envoyer la demande
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            Vos informations sont confidentielles. Aucune obligation d'achat.
                        </p>
                    </form>
                )}

                <div className="mt-10 space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Téléphone (Urgence 24/7)</p>
                            <a href={`tel:${settings.phone.replace(/\D/g,'')}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">{settings.phone}</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Courriel</p>
                            <a href={`mailto:${settings.email}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">{settings.email}</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Side */}
            <div className="lg:border-l lg:border-slate-200 lg:pl-20 flex flex-col justify-center">
                <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                                <LifeBuoy className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Déjà client ?</h2>
                                <p className="text-slate-400">Accès rapide au support.</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            Accédez à votre portail client HaloPSA pour ouvrir un ticket, suivre vos demandes ou consulter vos factures.
                        </p>
                        
                        <a href="#" className="block w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-center py-4 rounded-xl mb-8 transition-colors shadow-lg shadow-cyan-900/50 hover:shadow-cyan-500/50">
                            Accéder au Portail Client
                        </a>

                        <div className="border-t border-slate-700 pt-8">
                            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-400">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                Support d'urgence
                            </h3>
                            <p className="text-sm text-slate-400 mb-4">Pour les urgences critiques hors des heures de bureau (Forfaits Gold/Platinum).</p>
                            <div className="flex items-center gap-3 text-white font-mono text-xl bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <Phone className="w-5 h-5" /> {settings.phone}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                     <h3 className="font-bold text-slate-900 mb-6 text-xl">Notre bureau chef</h3>
                     <div className="flex items-start gap-4 text-slate-600 bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <MapPin className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                        <div>
                            <p className="font-bold text-slate-900 mb-1">{settings.city.split(',')[0]}</p>
                            <p className="leading-relaxed">
                                {settings.address}<br/>
                                {settings.city}
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

export default Contact;