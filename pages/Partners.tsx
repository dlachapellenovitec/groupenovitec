import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Server, Monitor, Award, CheckCircle2, Handshake, Globe, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

const Partners: React.FC = () => {
  const { strategicPartners, standardPartners } = useData();

  // Helper to filter partners by category
  const getPartnersByCategory = (category: string) => {
    return standardPartners.filter(p => p.category === category);
  };

  // Maps theme colors to Tailwind classes
  const getThemeClasses = (color: string) => {
    switch(color) {
        case 'blue': return {
            gradient: 'from-blue-600 to-blue-800',
            bgIcon: 'bg-blue-50',
            iconColor: 'text-blue-600',
            badgeBg: 'bg-blue-50',
            badgeText: 'text-blue-700'
        };
        case 'purple': return {
            gradient: 'from-purple-600 to-indigo-800',
            bgIcon: 'bg-purple-50',
            iconColor: 'text-purple-600',
            badgeBg: 'bg-purple-50',
            badgeText: 'text-purple-700'
        };
         case 'cyan': return {
            gradient: 'from-cyan-600 to-blue-800',
            bgIcon: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            badgeBg: 'bg-cyan-50',
            badgeText: 'text-cyan-700'
        };
        case 'green': return {
            gradient: 'from-green-600 to-emerald-800',
            bgIcon: 'bg-green-50',
            iconColor: 'text-green-600',
            badgeBg: 'bg-green-50',
            badgeText: 'text-green-700'
        };
        default: return {
            gradient: 'from-slate-600 to-slate-800',
            bgIcon: 'bg-slate-50',
            iconColor: 'text-slate-600',
            badgeBg: 'bg-slate-50',
            badgeText: 'text-slate-700'
        };
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-40 pb-24 relative overflow-hidden">
        {/* Background Network Effect */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-blue-900/40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
             <Handshake className="w-4 h-4 text-blue-400" />
             <span className="text-sm font-medium text-blue-200">Un réseau de confiance</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Notre Écosystème <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">d'Excellence</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Groupe Novitec s'entoure des leaders mondiaux et des meilleurs distributeurs canadiens pour vous offrir une infrastructure TI robuste, sécurisée et performante.
          </p>
        </div>
      </section>

      {/* Strategic Alliances (Highlight) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="grid md:grid-cols-2 gap-8">
              {strategicPartners.map(partner => {
                  const theme = getThemeClasses(partner.themeColor);
                  return (
                    <div key={partner.id} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform flex flex-col h-full">
                        <div className={`absolute top-0 right-0 bg-gradient-to-bl ${theme.gradient} text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-lg z-10`}>
                            {partner.badgeText}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-24 h-16 ${theme.bgIcon} rounded-xl flex items-center justify-center overflow-hidden`}>
                                <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain p-2" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{partner.name}</h3>
                                <p className="text-slate-500 text-sm">{partner.role}</p>
                            </div>
                        </div>
                        <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                            {partner.description}
                        </p>
                        <div className={`flex items-center gap-2 text-sm ${theme.badgeText} font-bold ${theme.badgeBg} w-fit px-3 py-1 rounded-lg`}>
                            <Award className="w-4 h-4" /> Statut Vérifié
                        </div>
                    </div>
                  );
              })}
          </div>
      </section>

      {/* Technology Stack Categories */}
      <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Category 1: Infrastructure & Cloud */}
              <div className="mb-20">
                  <div className="flex items-center gap-3 mb-10">
                      <div className="bg-blue-100 p-2 rounded-lg"><Server className="w-6 h-6 text-blue-600" /></div>
                      <h2 className="text-3xl font-bold text-slate-900">Infrastructure & Cloud</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {getPartnersByCategory('Infrastructure & Cloud').map(partner => (
                          <div key={partner.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                              <div className="h-16 flex items-center justify-center mb-4 w-full">
                                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-[80%] object-contain" />
                              </div>
                              <h4 className="font-bold text-slate-900 mb-1">{partner.name}</h4>
                              <p className="text-sm text-slate-500">{partner.description}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Category 2: Cybersécurité & Gestion */}
              <div className="mb-20">
                  <div className="flex items-center gap-3 mb-10">
                      <div className="bg-red-100 p-2 rounded-lg"><ShieldCheck className="w-6 h-6 text-red-600" /></div>
                      <h2 className="text-3xl font-bold text-slate-900">Cybersécurité & Outils MSP</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                      {getPartnersByCategory('Cybersécurité & Outils MSP').map(partner => (
                          <div key={partner.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                              <div className="h-16 flex items-center justify-center mb-4 w-full">
                                   <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-[80%] object-contain" />
                              </div>
                              <h4 className="font-bold text-slate-900 mb-1">{partner.name}</h4>
                              <p className="text-sm text-slate-500">{partner.description}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Category 3: Matériel (Hardware) */}
              <div className="mb-20">
                  <div className="flex items-center gap-3 mb-10">
                      <div className="bg-gray-100 p-2 rounded-lg"><Monitor className="w-6 h-6 text-gray-600" /></div>
                      <h2 className="text-3xl font-bold text-slate-900">Matériel & Périphériques</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                       {getPartnersByCategory('Matériel & Périphériques').map(partner => (
                          <div key={partner.id} className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col items-center justify-center hover:border-blue-200 transition-colors">
                              <div className="h-12 flex items-center justify-center mb-4 w-full">
                                  <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-[90%] object-contain grayscale hover:grayscale-0 transition-all" />
                              </div>
                              <p className="text-xs text-slate-400 text-center">{partner.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* Why We Choose Section */}
      <section className="bg-white py-24 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Nous ne vendons pas n'importe quoi.</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="bg-slate-50 p-6 rounded-2xl">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Testé par Novitec</h4>
                      <p className="text-sm text-slate-600">Nous utilisons ces technologies à l'interne. Si ce n'est pas assez bon pour nous, ce n'est pas assez bon pour vous.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                          <Zap className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Support Prioritaire</h4>
                      <p className="text-sm text-slate-600">Nos statuts de partenaires (Elite, Gold) nous donnent un accès direct aux ingénieurs de niveau 3 chez ces manufacturiers.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                      <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                          <ShieldCheck className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Sécurité Validée</h4>
                      <p className="text-sm text-slate-600">Chaque fournisseur est audité pour sa conformité aux standards de sécurité et à la Loi 25.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 text-center px-4">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Bénéficiez de notre pouvoir d'achat</h2>
              <p className="text-slate-300 mb-10">
                  Grâce à nos volumes d'achat et nos partenariats, nous obtenons souvent des tarifs plus avantageux que le prix public.
              </p>
              <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-colors">
                  Demander une soumission matérielle
              </Link>
          </div>
      </section>
    </div>
  );
};

export default Partners;