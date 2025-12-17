import React from 'react';
import { Gavel, FileCheck, AlertCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="bg-slate-100 p-3 rounded-2xl">
              <Gavel className="w-8 h-8 text-slate-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Conditions d'Utilisation</h1>
              <p className="text-slate-500 text-sm">Dernière mise à jour : Janvier 2024</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptation des conditions</h2>
              <p>
                En accédant au site de Groupe Novitec ou en utilisant nos services gérés (MSP), vous acceptez d'être lié par les présentes conditions d'utilisation et par notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Services Professionnels</h2>
              <p>
                Groupe Novitec s'engage à fournir des services TI conformes aux règles de l'art. Toutefois, la sécurité informatique absolue n'existant pas, nos services de cybersécurité (Novigard) constituent une obligation de moyens et non de résultat.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" /> 3. Responsabilité de l'usager
              </h2>
              <p>
                L'utilisateur est responsable de la confidentialité de ses identifiants. Toute utilisation suspecte doit être signalée immédiatement à notre centre de support au 514-360-1757.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" /> 4. Limitation de responsabilité
              </h2>
              <p>
                Groupe Novitec ne pourra être tenu responsable des pertes de données ou interruptions d'affaires résultant de cas de force majeure, de cyberattaques sophistiquées ou de négligences de la part de l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Propriété Intellectuelle</h2>
              <p>
                Le contenu de ce site, incluant les logos, textes et visuels, est la propriété exclusive de Groupe Novitec. Toute reproduction sans autorisation est interdite.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;