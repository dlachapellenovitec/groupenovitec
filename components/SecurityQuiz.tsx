import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, Lock, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const questions = [
  {
    id: 1,
    text: "Utilisez-vous l'authentification multifacteur (MFA) sur TOUS vos comptes ?",
    options: [
      { text: "Oui, partout (Microsoft 365, VPN, Banques)", score: 20 },
      { text: "Seulement sur certains comptes", score: 10 },
      { text: "Non, c'est trop compliqué", score: 0 },
      { text: "Je ne sais pas", score: 0 }
    ]
  },
  {
    id: 2,
    text: "À quelle fréquence vos sauvegardes sont-elles testées ?",
    options: [
      { text: "Automatiquement chaque jour + Test mensuel", score: 20 },
      { text: "On a des backups, mais on ne les teste jamais", score: 5 },
      { text: "Je fais une copie sur disque dur parfois", score: 0 },
      { text: "Aucune idée", score: 0 }
    ]
  },
  {
    id: 3,
    text: "Vos employés sont-ils formés contre l'hameçonnage (Phishing) ?",
    options: [
      { text: "Oui, simulations et formations continues", score: 20 },
      { text: "Une fois à l'embauche", score: 10 },
      { text: "Non, on leur fait confiance", score: 0 },
      { text: "C'est quoi le Phishing ?", score: 0 }
    ]
  },
  {
    id: 4,
    text: "Gérez-vous les droits d'accès administrateur ?",
    options: [
      { text: "Oui, personne n'est admin local sur son PC", score: 20 },
      { text: "Quelques personnes ont les droits complets", score: 10 },
      { text: "Tout le monde peut installer ce qu'il veut", score: 0 },
      { text: "Je ne sais pas", score: 0 }
    ]
  },
  {
    id: 5,
    text: "Avez-vous un plan de réponse aux incidents écrit ?",
    options: [
      { text: "Oui, documenté et imprimé", score: 20 },
      { text: "On sait qui appeler (Novitec)", score: 15 },
      { text: "Non, on improvisera", score: 0 },
      { text: "Plan de quoi ?", score: 0 }
    ]
  }
];

const SecurityQuiz: React.FC = () => {
  const { isQuizOpen, openQuiz, closeQuiz } = useData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    closeQuiz();
  };

  const getResult = () => {
    if (score >= 90) return { title: "Forteresse Numérique", color: "text-green-500", bg: "bg-green-50", icon: CheckCircle, msg: "Excellent ! Vous prenez la sécurité au sérieux. Continuons de maintenir ce standard." };
    if (score >= 50) return { title: "Vulnérabilité Modérée", color: "text-orange-500", bg: "bg-orange-50", icon: AlertTriangle, msg: "Des bases sont là, mais des failles critiques exposent votre entreprise aux ransomwares." };
    return { title: "Danger Critique", color: "text-red-600", bg: "bg-red-50", icon: Shield, msg: "Votre entreprise est une cible facile. Une attaque pourrait être fatale à vos opérations." };
  };

  const resultData = getResult();

  if (!isQuizOpen) {
    return (
      <button 
        onClick={openQuiz}
        className="fixed bottom-6 left-6 z-[100] bg-slate-900 text-white p-4 rounded-full shadow-2xl border-2 border-cyan-500 hover:scale-110 transition-transform flex items-center gap-3 group animate-bounce"
        style={{ animationDuration: '3s' }} // Slower bounce inline override
      >
        <div className="relative">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </div>
        <div className="text-left hidden group-hover:block transition-all duration-300">
            <p className="text-xs font-bold text-cyan-400 uppercase">Test Gratuit</p>
            <p className="font-bold text-sm text-white whitespace-nowrap">Mon Score Cyber ?</p>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-700">
        <button onClick={closeQuiz} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
        </button>

        {!showResult ? (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    QUESTION {currentQuestion + 1} / {questions.length}
                </span>
                <Shield className="w-5 h-5 text-slate-300" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-8 min-h-[60px]">
                {questions[currentQuestion].text}
            </h3>

            <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 flex justify-between group"
                    >
                        {option.text}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                    </button>
                ))}
            </div>
            
            <div className="mt-8 bg-slate-100 rounded-full h-2 w-full overflow-hidden">
                <div 
                    className="bg-blue-600 h-full transition-all duration-500" 
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
             <div className={`w-24 h-24 ${resultData.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                 <resultData.icon className={`w-12 h-12 ${resultData.color}`} />
             </div>
             
             <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Votre Score de Sécurité</p>
             <h2 className={`text-6xl font-black mb-4 ${resultData.color}`}>{score}%</h2>
             
             <h3 className="text-xl font-bold text-slate-900 mb-2">{resultData.title}</h3>
             <p className="text-slate-600 mb-8">{resultData.msg}</p>

             <div className="space-y-3">
                 <Link to="/contact" onClick={closeQuiz} className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all">
                     Obtenir un Audit Complet (Gratuit)
                 </Link>
                 <button onClick={resetQuiz} className="block w-full text-slate-500 font-bold py-2 hover:text-slate-700 flex items-center justify-center gap-2">
                     <RefreshCw className="w-4 h-4" /> Recommencer
                 </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuiz;