import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Politique de Confidentialité</h1>
              <p className="text-slate-500 text-sm">Dernière mise à jour : 24 Mai 2024 (Conformité Loi 25)</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" /> 1. Responsable de la protection des données
              </h2>
              <p>
                Conformément à la Loi 25, le Responsable de la protection des renseignements personnels pour Groupe Novitec est :
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4">
                <p className="font-bold text-slate-900">Pierre Tremblay</p>
                <p className="text-sm">Président</p>
                <p className="text-sm">Courriel : <a href="mailto:privacy@novitec.ca" className="text-blue-600 hover:underline">privacy@novitec.ca</a></p>
                <p className="text-sm">Téléphone : 514-360-1757</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> 2. Renseignements collectés
              </h2>
              <p>
                Nous collectons uniquement les renseignements personnels nécessaires à la prestation de nos services TI et de support. Cela peut inclure :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom, prénom et titre professionnel.</li>
                <li>Coordonnées (adresse courriel professionnelle, numéro de téléphone).</li>
                <li>Informations relatives aux accès systèmes (dans le cadre de nos mandats de support).</li>
                <li>Données de navigation via nos outils de support à distance (avec votre consentement explicite).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> 3. Finalité du traitement
              </h2>
              <p>
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir un support technique réactif et personnalisé.</li>
                <li>Gérer vos accès aux services Cloud et Microsoft 365.</li>
                <li>Assurer la sécurité de votre infrastructure via nos outils Novigard.</li>
                <li>Communiquer des alertes de sécurité critiques ou des maintenances planifiées.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Conservation et Sécurité</h2>
              <p>
                Nous appliquons les normes de sécurité les plus strictes de l'industrie pour protéger vos données contre tout accès non autorisé. Toutes nos données sont hébergées au Canada sur nos serveurs sécurisés (MonCloudPrive.ca).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Vos Droits</h2>
              <p>
                Vous avez le droit de demander l'accès à vos renseignements, leur rectification ou leur suppression. Pour toute demande, veuillez contacter notre responsable à l'adresse mentionnée ci-dessus.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;