import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Hexagon } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'novitec') {
      navigate('/admin');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-6 text-blue-900">
                 <div className="relative flex items-center justify-center">
                    <Hexagon className="w-16 h-16 text-blue-600 fill-blue-600 opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center font-black text-3xl">N</div>
                 </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Administration Novitec</h1>
            <p className="text-slate-500">Veuillez vous identifier.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {error && <div className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded-lg">{error}</div>}

            <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors">
                Connexion
            </button>
        </form>
        <p className="text-center mt-6 text-xs text-slate-400">
            Astuce démo: le mot de passe est "novitec"
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;