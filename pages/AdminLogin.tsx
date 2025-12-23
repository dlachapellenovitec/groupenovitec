import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Hexagon, User, AlertCircle } from 'lucide-react';

// Détection automatique de l'URL de l'API
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Si on est sur localhost (dev), utiliser localhost:3001
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }

  // Sinon, utiliser le même host que la page actuelle avec le port 3001
  // Forcer HTTP car le port 3001 n'a pas de SSL configuré
  const hostname = window.location.hostname;
  return `http://${hostname}:3001`;
};

const API_BASE_URL = getApiUrl();

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Stocker le token JWT dans localStorage
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Rediriger vers le panneau d'administration
        navigate('/admin');
      } else {
        setError(data.error || 'Échec de la connexion');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré.');
    } finally {
      setLoading(false);
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
          <p className="text-slate-500">Connexion sécurisée</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nom d'utilisateur</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400"
                placeholder="admin"
                required
                disabled={loading}
              />
            </div>
          </div>

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
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connexion...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Connexion</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800 font-semibold mb-1">
            Premier démarrage :
          </p>
          <p className="text-xs text-blue-700">
            Utilisateur : <span className="font-mono font-bold">admin</span><br />
            Mot de passe : <span className="font-mono font-bold">admin123</span>
          </p>
          <p className="text-xs text-orange-600 mt-2 font-semibold">
            ⚠️ Changez ce mot de passe immédiatement après la première connexion !
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
