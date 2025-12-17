import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Linkedin, Facebook, Lock, Hexagon, Activity } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { settings, jobs } = useData();
  const hasJobs = jobs.length > 0;

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt={settings.companyName} className="h-10 w-auto object-contain brightness-0 invert" />
                ) : (
                    <>
                        <div className="relative flex items-center justify-center">
                            <Hexagon className="w-10 h-10 text-blue-600 fill-blue-600 opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-white">N</div>
                        </div>
                        <span className="text-lg font-black tracking-tighter text-white">
                            GROUPE <span className="text-blue-500">NOVITEC</span>
                        </span>
                    </>
                )}
             </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Votre partenaire TI de confiance au Québec. Nous sécurisons, gérons et optimisons votre infrastructure pour que vous puissiez vous concentrer sur votre entreprise.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/msp" className="hover:text-white transition-colors">Services Gérés (MSP)</Link></li>
              <li><Link to="/novigard" className="hover:text-white transition-colors">Novigard Cybersécurité</Link></li>
              <li><Link to="/cloud" className="hover:text-white transition-colors">MonCloudPrive.ca</Link></li>
              <li><Link to="/microsoft-365" className="hover:text-white transition-colors">Microsoft 365</Link></li>
              <li><Link to="/telephonie" className="hover:text-white transition-colors">Téléphonie IP</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">À Propos</Link></li>
              <li>
                <Link to="/carrieres" className="hover:text-white transition-colors flex items-center gap-2">
                  Carrières {hasJobs && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">On recrute!</span>}
                </Link>
              </li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Ressources</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Portail Client</Link></li>
              <li><Link to="/status" className="hover:text-green-400 transition-colors flex items-center gap-2"><Activity className="w-3 h-3 text-green-500" /> État des Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>{settings.address}<br/>{settings.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\D/g,'')}`} className="hover:text-white">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {settings.companyName}. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0 justify-center md:justify-end">
            <Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité (Loi 25)</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
            <Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-1 opacity-50 hover:opacity-100">
                <Lock className="w-3 h-3" /> Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;