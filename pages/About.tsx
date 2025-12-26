import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, MapPin, Award, ArrowRight, Linkedin, Heart, ShieldCheck, Crosshair } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { teamMembers, companyStory } = useData();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-40 pb-24 border-b border-slate-800 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
                 alt="Meeting" 
                 className="w-full h-full object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-5 py-2 rounded-full mb-8 font-bold text-sm border border-blue-500/30">
            <MapPin className="w-4 h-4" />
            <span>Fier MSP 100% Québécois</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Plus qu'un fournisseur TI.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Votre partenaire d'affaires.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Groupe Novitec a été fondé avec une mission claire : apporter la rigueur, la sécurité et la technologie des grandes entreprises aux PME professionnelles du Québec.
          </p>
        </div>
      </section>

      {/* Mission & Story with Split Image */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative group">
               <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
               <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
                  alt="Réunion stratégique TI" 
                  loading="lazy"
                  className="relative rounded-3xl shadow-2xl z-10"
               />
               <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block z-20">
                  <p className="text-slate-900 font-bold text-2xl mb-1">Depuis {companyStory.foundingYear}</p>
                  <p className="text-slate-500 text-sm">Nous accompagnons la transformation numérique des cabinets et cliniques d'ici.</p>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Notre Histoire</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>{companyStory.intro}</p>
                <p><strong className="text-blue-700">{companyStory.mission}</strong></p>
                <p>{companyStory.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Block */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-overlay blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Stats */}
              <div>
                 <h3 className="text-3xl font-bold mb-10">Des résultats concrets</h3>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                       <div className="text-4xl font-black text-cyan-400 mb-2">98%</div>
                       <div className="text-sm font-medium text-slate-300">Taux de rétention client annuel</div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                       <div className="flex items-center gap-1 text-4xl font-black text-cyan-400 mb-2">
                          <span>15</span><span className="text-xl font-bold">min</span>
                       </div>
                       <div className="text-sm font-medium text-slate-300">Temps de réponse moyen</div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                       <div className="text-4xl font-black text-cyan-400 mb-2">100+</div>
                       <div className="text-sm font-medium text-slate-300">PME québécoises gérées</div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                       <div className="text-4xl font-black text-cyan-400 mb-2">100%</div>
                       <div className="text-sm font-medium text-slate-300">Données hébergées au Canada</div>
                    </div>
                 </div>
              </div>

              {/* Certifications / Logos */}
              <div>
                  <h3 className="text-3xl font-bold mb-10">Reconnaissances</h3>
                  <div className="bg-white rounded-3xl p-8 shadow-xl text-slate-900">
                      <div className="space-y-8">
                          <div className="flex items-start gap-5 border-b border-slate-100 pb-6">
                              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                  <svg className="w-8 h-8 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg>
                              </div>
                              <div>
                                  <h4 className="font-bold text-xl mb-1">Microsoft Solutions Partner</h4>
                                  <p className="text-slate-600 text-sm">Modern Work & Security. Nous sommes reconnus par Microsoft pour notre expertise technique.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-5 border-b border-slate-100 pb-6">
                              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                  <Shield className="w-8 h-8 text-blue-600" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-xl mb-1">Conformité Loi 25</h4>
                                  <p className="text-slate-600 text-sm">Experts certifiés en gouvernance des données personnelles et cybersécurité.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-5">
                              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                                  <Award className="w-8 h-8 text-purple-600" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-xl mb-1">SentinelOne & Fortinet</h4>
                                  <p className="text-slate-600 text-sm">Certifications techniques avancées (NSE4, S1) pour nos ingénieurs réseau.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

           </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-24 relative overflow-hidden border-t border-slate-200">
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
                 <Users className="w-4 h-4" />
                 <span>Expertise Locale</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">L'Humain derrière la Technologie</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Une équipe de direction accessible, transparente et dédiée au succès des PME québécoises.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member) => (
                <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="h-80 overflow-hidden bg-slate-200 relative flex items-center justify-center">
                      <img
                          src={member.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800';
                          }}
                      />
                      {member.quote && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-medium italic text-sm">"{member.quote}"</p>
                            </div>
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-2xl text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-bold text-sm mb-6 uppercase tracking-wide">{member.role}</p>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                          {member.bio}
                      </p>
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-5 h-5" /> <span className="text-xs font-bold">Connecter</span>
                        </a>
                      )}
                    </div>
                </div>
              ))}
            </div>

            {/* Recruitment Nudge */}
            <div className="mt-16 text-center">
                <p className="text-slate-500 mb-4">Vous partagez nos valeurs d'excellence ?</p>
                <Link to="/carrieres" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    Voir les postes disponibles dans l'équipe <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
          </div>
      </section>

      {/* Values - Added background pattern */}
      <section className="bg-slate-100 py-24 border-t border-slate-200 relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Nos Valeurs Fondamentales</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Ce qui guide nos décisions techniques et nos relations clients au quotidien.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Value 1: Security */}
                <div className="group bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
                        <ShieldCheck className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300 relative z-10 group-hover:scale-110 transform" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">Sécurité par Design</h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                        Nous ne faisons pas de compromis. Si une solution n'est pas sécuritaire, nous ne l'installons pas. Nous protégeons votre entreprise comme si c'était la nôtre.
                    </p>
                </div>

                {/* Value 2: Human */}
                <div className="group bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 relative">
                        <Heart className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300 group-hover:animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">Proximité & Humain</h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                        La technologie est froide, mais notre service est chaleureux. Nous parlons français, nous comprenons votre réalité d'affaires et nous répondons au téléphone.
                    </p>
                </div>

                {/* Value 3: Standards */}
                <div className="group bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 relative">
                         <Crosshair className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300 group-hover:rotate-180 transform duration-700 ease-in-out" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">Rigueur & Standards</h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                        Pas de bricolage. Nous utilisons des outils de classe entreprise (HaloPSA, Documentation ITGlue) pour assurer une gestion prévisible et standardisée.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-4xl font-bold mb-6">Envie de travailler avec une équipe dédiée ?</h2>
            <p className="text-xl text-blue-100 mb-10">
                Venez nous rencontrer. Nous sommes toujours heureux de discuter TI autour d'un café.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                    Nous contacter
                </Link>
                <Link to="/carrieres" className="bg-blue-700 border border-blue-400 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                    Voir nos offres d'emploi
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;