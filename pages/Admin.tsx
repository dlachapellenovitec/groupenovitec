
import React, { useState, useEffect } from 'react';
import { useData, BlogPost, JobPosting, SiteSettings, TeamMember, CompanyStory, ClientLogo, StrategicPartner, StandardPartner, IncidentItem } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Plus, Trash2, Shield, ArrowLeft, Settings, Save, AlertTriangle, Users, Building, Handshake, Edit, Activity, CheckCircle2, XCircle, Database, Server, Key, Copy, Check } from 'lucide-react';
import BlogEditor from '../components/BlogEditor';

const Admin: React.FC = () => {
  const {
    posts, jobs, settings, teamMembers, companyStory, clientLogos, strategicPartners, standardPartners,
    systemStatus, incidents,
    addPost, updatePost, deletePost, addJob, updateJob, deleteJob, updateSettings,
    addTeamMember, updateTeamMember, deleteTeamMember, addClientLogo, deleteClientLogo, updateCompanyStory,
    updateStrategicPartner, addStandardPartner, deleteStandardPartner,
    updateSystemStatus, addIncident, deleteIncident
  } = useData();

  const [activeTab, setActiveTab] = useState<'blog' | 'careers' | 'about' | 'settings' | 'clients' | 'partners' | 'status' | 'system' | 'security'>('blog');
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [showJobEditor, setShowJobEditor] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showMemberEditor, setShowMemberEditor] = useState(false);

  // Security/Password Change States
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Database Tab States
  const [dbConfig, setDbConfig] = useState({
      user: 'votre_utilisateur',
      pass: '••••••••',
      host: 'localhost',
      port: '5432',
      name: 'novitec_db'
  });
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState<{status: 'idle' | 'loading' | 'success' | 'error', msg: string}>({status: 'idle', msg: ''});
  const [copied, setCopied] = useState(false);

  // Helper pour obtenir l'URL de base de l'API
  const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    // Forcer HTTP car le port 3001 n'a pas de SSL configuré
    return `http://${window.location.hostname}:3001`;
  };

  // Vérifier la connexion à la base de données
  const checkDbHealth = async () => {
    try {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/api/health`);
      if (res.ok) setDbStatus('connected');
      else setDbStatus('error');
    } catch {
      setDbStatus('error');
    }
  };

  useEffect(() => {
    checkDbHealth();
    const interval = setInterval(checkDbHealth, 30000); // Re-vérifier toutes les 30s
    return () => clearInterval(interval);
  }, []);

  const handleTestConnection = async (e: React.FormEvent) => {
      e.preventDefault();
      setTestResult({status: 'loading', msg: 'Test en cours...'});
      try {
          const baseUrl = getBaseUrl();
          const res = await fetch(`${baseUrl}/api/test-db-connection`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: testUrl })
          });
          const data = await res.json();
          if (data.success) {
              setTestResult({status: 'success', msg: 'Connexion réussie !'});
          } else {
              setTestResult({status: 'error', msg: data.error || 'Échec de la connexion'});
          }
      } catch (err: any) {
          setTestResult({status: 'error', msg: err.message});
      }
  };

  const generateConnectionString = () => {
      return `postgres://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
  };

  const copyToClipboard = () => {
      const text = `DATABASE_URL=${generateConnectionString()}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };
  
  // Blog Form State
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '', category: 'Cybersécurité', author: 'Admin', content: '', excerpt: '', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  });

  // Job Form State
  const [newJob, setNewJob] = useState<Partial<JobPosting>>({
    title: '', location: 'Québec', type: 'Temps plein', summary: ''
  });

  // Team Form State
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '', role: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800', linkedinUrl: '', quote: ''
  });

  // Client Logo Form State
  const [newClient, setNewClient] = useState<Partial<ClientLogo>>({
    name: '', logoUrl: ''
  });

  // Partner Form States
  const [editingStrategic, setEditingStrategic] = useState<StrategicPartner | null>(null);
  const [newStandardPartner, setNewStandardPartner] = useState<Partial<StandardPartner>>({
      name: '', category: 'Infrastructure & Cloud', description: '', logoUrl: ''
  });

  // Status Incident Form
  const [newIncident, setNewIncident] = useState<Partial<IncidentItem>>({
      date: new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: '',
      message: '',
      severity: 'good'
  });

  // Settings & Story Form State
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);
  const [tempStory, setTempStory] = useState<CompanyStory>(companyStory);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      // Mode édition
      if (newPost.title && newPost.content) {
        updatePost(editingPost.id, newPost as Omit<BlogPost, 'id' | 'date'>);
        setNewPost({ title: '', category: 'Cybersécurité', author: 'Admin', content: '', excerpt: '', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' });
        setEditingPost(null);
        setShowBlogEditor(false);
        alert('Article mis à jour !');
      }
    } else {
      // Mode ajout
      if (newPost.title && newPost.content) {
        addPost(newPost as Omit<BlogPost, 'id' | 'date'>);
        setNewPost({ title: '', category: 'Cybersécurité', author: 'Admin', content: '', excerpt: '', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' });
        setShowBlogEditor(false);
        alert('Article ajouté !');
      }
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      category: post.category,
      author: post.author,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl
    });
    setShowBlogEditor(true);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setNewPost({ title: '', category: 'Cybersécurité', author: 'Admin', content: '', excerpt: '', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' });
    setShowBlogEditor(false);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      if (newJob.title && newJob.summary) {
        updateJob(editingJob.id, newJob as Omit<JobPosting, 'id'>);
        setNewJob({ title: '', location: 'Québec', type: 'Temps plein', summary: '' });
        setEditingJob(null);
        setShowJobEditor(false);
        alert('Poste mis à jour !');
      }
    } else {
      if (newJob.title && newJob.summary) {
        addJob(newJob as Omit<JobPosting, 'id'>);
        setNewJob({ title: '', location: 'Québec', type: 'Temps plein', summary: '' });
        setShowJobEditor(false);
        alert('Poste ajouté !');
      }
    }
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      location: job.location,
      type: job.type,
      summary: job.summary
    });
    setShowJobEditor(true);
  };

  const handleCancelJobEdit = () => {
    setEditingJob(null);
    setNewJob({ title: '', location: 'Québec', type: 'Temps plein', summary: '' });
    setShowJobEditor(false);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      if (newMember.name && newMember.role && newMember.bio) {
        updateTeamMember(editingMember.id, newMember as Omit<TeamMember, 'id'>);
        setNewMember({ name: '', role: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800', linkedinUrl: '', quote: '' });
        setEditingMember(null);
        setShowMemberEditor(false);
        alert('Membre mis à jour !');
      }
    } else {
      if (newMember.name && newMember.role) {
        addTeamMember(newMember as Omit<TeamMember, 'id'>);
        setNewMember({ name: '', role: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800', linkedinUrl: '', quote: '' });
        setShowMemberEditor(false);
        alert('Membre ajouté !');
      }
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
      linkedinUrl: member.linkedinUrl,
      quote: member.quote
    });
    setShowMemberEditor(true);
  };

  const handleCancelMemberEdit = () => {
    setEditingMember(null);
    setNewMember({ name: '', role: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800', linkedinUrl: '', quote: '' });
    setShowMemberEditor(false);
  };

  const handleAddClientLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClient.name && newClient.logoUrl) {
      addClientLogo(newClient as Omit<ClientLogo, 'id'>);
      setNewClient({ name: '', logoUrl: '' });
      alert('Client ajouté !');
    }
  };

  const handleSaveStrategic = (e: React.FormEvent) => {
      e.preventDefault();
      if(editingStrategic) {
          updateStrategicPartner(editingStrategic.id, editingStrategic);
          setEditingStrategic(null);
          alert('Partenaire stratégique mis à jour !');
      }
  };

  const handleAddStandardPartner = (e: React.FormEvent) => {
      e.preventDefault();
      if(newStandardPartner.name && newStandardPartner.logoUrl) {
          addStandardPartner(newStandardPartner as Omit<StandardPartner, 'id'>);
          setNewStandardPartner({ name: '', category: 'Infrastructure & Cloud', description: '', logoUrl: '' });
          alert('Partenaire ajouté !');
      }
  };

  const handleAddIncident = (e: React.FormEvent) => {
      e.preventDefault();
      if(newIncident.message) {
          addIncident(newIncident as Omit<IncidentItem, 'id'>);
          setNewIncident({
              date: new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' }),
              title: '',
              message: '',
              severity: 'good'
          });
          alert('Incident ajouté à l\'historique !');
      }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    setPasswordLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      const baseUrl = getBaseUrl();

      const response = await fetch(`${baseUrl}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess(true);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPasswordSuccess(false), 5000);
      } else {
        setPasswordError(data.error || 'Erreur lors du changement de mot de passe');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setPasswordError('Erreur de connexion au serveur');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(tempSettings);
    alert('Paramètres mis à jour avec succès !');
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyStory(tempStory);
    alert('Histoire mise à jour !');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
           <Shield className="w-6 h-6 text-blue-400" />
           <span className="font-bold text-lg tracking-tight">NOVITEC ADMIN</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <FileText className="w-5 h-5" /> Blog
            </button>
            <button onClick={() => setActiveTab('careers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'careers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Briefcase className="w-5 h-5" /> Carrières
            </button>
            <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Users className="w-5 h-5" /> Équipe & Histoire
            </button>
            <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'clients' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Building className="w-5 h-5" /> Clients / Trust Bar
            </button>
             <button onClick={() => setActiveTab('partners')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'partners' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Handshake className="w-5 h-5" /> Partenaires
            </button>
            <button onClick={() => setActiveTab('status')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'status' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Activity className="w-5 h-5" /> État des Services
            </button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Settings className="w-5 h-5" /> Configuration Site
            </button>
            <button onClick={() => setActiveTab('system')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'system' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Server className="w-5 h-5" /> Système & DB
            </button>
            <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <Key className="w-5 h-5" /> Sécurité
            </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
             <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-4 py-2">
                 <ArrowLeft className="w-4 h-4" /> Retour au site
             </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto p-10">
         <header className="mb-10 flex justify-between items-start">
             <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    {activeTab === 'blog' && 'Gestion du Blog'}
                    {activeTab === 'careers' && 'Gestion des Carrières'}
                    {activeTab === 'about' && 'Gestion À Propos'}
                    {activeTab === 'clients' && 'Gestion des Clients'}
                    {activeTab === 'partners' && 'Gestion des Partenaires'}
                    {activeTab === 'status' && 'État des Services'}
                    {activeTab === 'settings' && 'Configuration du Site'}
                    {activeTab === 'system' && 'Configuration Système (Base de données)'}
                    {activeTab === 'security' && 'Sécurité & Authentification'}
                </h1>
                <div className="text-sm text-slate-500 mt-1">Connecté en tant que Admin</div>
             </div>

             <div className="flex flex-col items-end gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
                  dbStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' : 
                  dbStatus === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                   <Database className={`w-3.5 h-3.5 ${dbStatus === 'checking' ? 'animate-spin' : ''}`} />
                   {dbStatus === 'connected' ? 'Base de données active' : 
                    dbStatus === 'error' ? 'Erreur de connexion' : 'Vérification...'}
                   <span className={`w-2 h-2 rounded-full ${
                     dbStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                     dbStatus === 'error' ? 'bg-red-500' : 'bg-slate-400'
                   }`}></span>
                </div>
             </div>
         </header>

         {/* SYSTEM & DATABASE SECTION */}
         {activeTab === 'system' && (
             <div className="space-y-8 max-w-5xl">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Configurateur DATABASE_URL</h2>
                            <p className="text-sm text-slate-500">Générez facilement votre chaîne de connexion PostgreSQL.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Utilisateur DB</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={dbConfig.user} onChange={e => setDbConfig({...dbConfig, user: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Mot de passe</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={dbConfig.pass} onChange={e => setDbConfig({...dbConfig, pass: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Hôte (Host)</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={dbConfig.host} onChange={e => setDbConfig({...dbConfig, host: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nom de la base (DB Name)</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={dbConfig.name} onChange={e => setDbConfig({...dbConfig, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Port</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={dbConfig.port} onChange={e => setDbConfig({...dbConfig, port: e.target.value})} />
                            </div>
                            <div className="h-full flex items-end">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-700 w-full italic">
                                    "Utilisez ces champs pour construire la ligne DATABASE_URL ci-dessous."
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Résultat DATABASE_URL (À copier dans votre .env)</label>
                        <div className="relative group">
                            <input 
                                readOnly 
                                type="text" 
                                className="w-full p-4 bg-slate-900 text-cyan-400 font-mono text-sm rounded-xl border border-slate-800 pr-12 shadow-inner" 
                                value={generateConnectionString()} 
                            />
                            <button 
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                title="Copier la valeur"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Format standard : postgres://[user]:[password]@[host]:[port]/[database]</p>
                    </div>
                 </div>

                 <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
                    
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" /> Testeur de connexion en direct
                    </h2>
                    
                    <form onSubmit={handleTestConnection} className="space-y-4 relative z-10">
                        <p className="text-sm text-slate-400">Collez une URL complète ci-dessous pour tester si le serveur peut s'y connecter avant de l'appliquer.</p>
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                className="flex-grow p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-blue-300 placeholder:text-slate-600" 
                                placeholder="postgres://user:pass@host:5432/db"
                                value={testUrl}
                                onChange={e => setTestUrl(e.target.value)}
                                required
                            />
                            <button 
                                type="submit" 
                                disabled={testResult.status === 'loading'}
                                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                                {testResult.status === 'loading' ? 'Test...' : 'Tester maintenant'}
                            </button>
                        </div>

                        {testResult.status !== 'idle' && (
                            <div className={`p-4 rounded-xl border flex items-start gap-3 animate-fade-in-up ${
                                testResult.status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}>
                                {testResult.status === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                                <div className="text-sm font-medium">
                                    <p className="font-bold">{testResult.status === 'success' ? 'Succès !' : 'Erreur :'}</p>
                                    <p className="opacity-80">{testResult.msg}</p>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 leading-relaxed">
                        <p className="font-bold text-slate-400 mb-1 uppercase tracking-wider">Note d'installation :</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Pour appliquer ces changements localement : Créez un fichier <strong>server/.env</strong></li>
                            <li>Sur votre hébergeur (cPanel / Render) : Allez dans la section <strong>Environment Variables</strong> et ajoutez <strong>DATABASE_URL</strong>.</li>
                            <li>Le serveur redémarrera automatiquement et créera les tables lors de la première connexion réussie.</li>
                        </ul>
                    </div>
                 </div>
             </div>
         )}

         {/* BLOG SECTION */}
         {activeTab === 'blog' && (
             <>
                 {!showBlogEditor ? (
                     /* Article List View */
                     <div className="space-y-6">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="font-bold text-xl text-slate-700">Articles du blog</h2>
                             <button
                                 onClick={() => setShowBlogEditor(true)}
                                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                             >
                                 <Plus className="w-5 h-5" />
                                 Nouvel Article
                             </button>
                         </div>

                         {posts.length === 0 ? (
                             <div className="bg-white p-16 text-center rounded-2xl border border-dashed border-slate-300">
                                 <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                 <p className="text-slate-400 text-lg font-medium">Aucun article trouvé</p>
                                 <p className="text-slate-400 text-sm mt-2">Commencez par créer votre premier article de blog</p>
                             </div>
                         ) : (
                             <div className="grid gap-4">
                                 {posts.map(post => (
                                     <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                         <div className="flex justify-between items-start gap-6">
                                             <div className="flex gap-6 flex-grow">
                                                 <img
                                                     src={post.imageUrl}
                                                     className="w-24 h-24 rounded-xl object-cover bg-slate-200 flex-shrink-0"
                                                     alt={post.title}
                                                 />
                                                 <div className="flex-grow">
                                                     <h3 className="font-bold text-xl text-slate-900 mb-2">{post.title}</h3>
                                                     <p className="text-sm text-slate-600 mb-3 line-clamp-2">{post.excerpt}</p>
                                                     <div className="flex items-center gap-4 text-xs text-slate-500">
                                                         <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">{post.category}</span>
                                                         <span>{post.author}</span>
                                                         <span>{post.date}</span>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div className="flex gap-2 flex-shrink-0">
                                                 <button
                                                     onClick={() => handleEditPost(post)}
                                                     className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                     title="Modifier"
                                                 >
                                                     <Edit className="w-5 h-5" />
                                                 </button>
                                                 <button
                                                     onClick={() => deletePost(post.id)}
                                                     className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                     title="Supprimer"
                                                 >
                                                     <Trash2 className="w-5 h-5" />
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                     </div>
                 ) : (
                     /* Full-Page Editor View */
                     <div className="max-w-7xl mx-auto">
                         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                             {/* Editor Header */}
                             <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                     {editingPost ? <Edit className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-blue-600" />}
                                     <div>
                                         <h2 className="text-2xl font-bold text-slate-900">
                                             {editingPost ? 'Modifier l\'article' : 'Nouvel article'}
                                         </h2>
                                         <p className="text-sm text-slate-500 mt-1">
                                             {editingPost ? 'Apportez vos modifications et enregistrez' : 'Créez un nouvel article pour votre blog'}
                                         </p>
                                     </div>
                                 </div>
                                 <button
                                     type="button"
                                     onClick={handleCancelEdit}
                                     className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
                                 >
                                     <ArrowLeft className="w-4 h-4" />
                                     Retour à la liste
                                 </button>
                             </div>

                             {/* Editor Form */}
                             <form onSubmit={handleAddPost} className="p-8 space-y-6">
                                 {/* Basic Info Row */}
                                 <div className="grid grid-cols-2 gap-6">
                                     <div className="col-span-2">
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Titre de l'article</label>
                                         <input
                                             type="text"
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newPost.title}
                                             onChange={e => setNewPost({...newPost, title: e.target.value})}
                                             placeholder="Ex: Les meilleures pratiques en cybersécurité pour 2025"
                                             required
                                         />
                                     </div>

                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                                         <select
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newPost.category}
                                             onChange={e => setNewPost({...newPost, category: e.target.value})}
                                         >
                                             <option>Cybersécurité</option>
                                             <option>Conformité</option>
                                             <option>Technologie</option>
                                             <option>Cloud</option>
                                         </select>
                                     </div>

                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Auteur</label>
                                         <input
                                             type="text"
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newPost.author}
                                             onChange={e => setNewPost({...newPost, author: e.target.value})}
                                             placeholder="Nom de l'auteur"
                                         />
                                     </div>

                                     <div className="col-span-2">
                                         <label className="block text-sm font-bold text-slate-700 mb-2">URL de l'image de couverture</label>
                                         <input
                                             type="text"
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newPost.imageUrl}
                                             onChange={e => setNewPost({...newPost, imageUrl: e.target.value})}
                                             placeholder="https://example.com/image.jpg"
                                         />
                                     </div>

                                     <div className="col-span-2">
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Extrait (Résumé court pour l'aperçu)</label>
                                         <textarea
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newPost.excerpt}
                                             onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                                             placeholder="Un bref résumé qui apparaîtra dans la liste des articles..."
                                             required
                                         />
                                     </div>
                                 </div>

                                 {/* Content Editor - Full Width */}
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 mb-3">Contenu de l'article (Markdown)</label>
                                     <BlogEditor
                                         value={newPost.content || ''}
                                         onChange={(content) => setNewPost({...newPost, content})}
                                         placeholder="Écrivez votre article en Markdown... Utilisez # pour les titres, ** pour le gras, - pour les listes, etc."
                                     />
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                                     <button
                                         type="button"
                                         onClick={handleCancelEdit}
                                         className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                                     >
                                         Annuler
                                     </button>
                                     <button
                                         type="submit"
                                         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                                     >
                                         <Save className="w-5 h-5" />
                                         {editingPost ? 'Mettre à jour l\'article' : 'Publier l\'article'}
                                     </button>
                                 </div>
                             </form>
                         </div>
                     </div>
                 )}
             </>
         )}

         {/* CAREERS SECTION */}
         {activeTab === 'careers' && (
             <>
                 {!showJobEditor ? (
                     /* Job List View */
                     <div className="space-y-6">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="font-bold text-xl text-slate-700">Postes ouverts</h2>
                             <button
                                 onClick={() => setShowJobEditor(true)}
                                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                             >
                                 <Plus className="w-5 h-5" />
                                 Nouveau Poste
                             </button>
                         </div>

                         {jobs.length === 0 ? (
                             <div className="bg-white p-16 text-center rounded-2xl border border-dashed border-slate-300">
                                 <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                 <p className="text-slate-400 text-lg font-medium">Aucun poste ouvert</p>
                                 <p className="text-slate-400 text-sm mt-2">Commencez par créer votre première offre d'emploi</p>
                             </div>
                         ) : (
                             <div className="grid gap-4">
                                 {jobs.map(job => (
                                     <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                         <div className="flex justify-between items-start gap-6">
                                             <div className="flex-grow">
                                                 <h3 className="font-bold text-xl text-slate-900 mb-2">{job.title}</h3>
                                                 <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                                     <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">{job.location}</span>
                                                     <span>{job.type}</span>
                                                 </div>
                                                 <p className="text-sm text-slate-600 line-clamp-2">{job.summary}</p>
                                             </div>
                                             <div className="flex gap-2 flex-shrink-0">
                                                 <button
                                                     onClick={() => handleEditJob(job)}
                                                     className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                     title="Modifier"
                                                 >
                                                     <Edit className="w-5 h-5" />
                                                 </button>
                                                 <button
                                                     onClick={() => deleteJob(job.id)}
                                                     className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                     title="Supprimer"
                                                 >
                                                     <Trash2 className="w-5 h-5" />
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                     </div>
                 ) : (
                     /* Full-Page Job Editor View */
                     <div className="max-w-6xl mx-auto">
                         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                             {/* Editor Header */}
                             <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                     {editingJob ? <Edit className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-blue-600" />}
                                     <div>
                                         <h2 className="text-2xl font-bold text-slate-900">
                                             {editingJob ? 'Modifier le poste' : 'Nouveau poste'}
                                         </h2>
                                         <p className="text-sm text-slate-500 mt-1">
                                             {editingJob ? 'Modifiez les détails du poste' : 'Créez une nouvelle offre d\'emploi'}
                                         </p>
                                     </div>
                                 </div>
                                 <button
                                     type="button"
                                     onClick={handleCancelJobEdit}
                                     className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
                                 >
                                     <ArrowLeft className="w-4 h-4" />
                                     Retour à la liste
                                 </button>
                             </div>

                             {/* Editor Form */}
                             <form onSubmit={handleAddJob} className="p-8 space-y-6">
                                 <div className="grid grid-cols-3 gap-6">
                                     <div className="col-span-3">
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Titre du poste</label>
                                         <input
                                             type="text"
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newJob.title}
                                             onChange={e => setNewJob({...newJob, title: e.target.value})}
                                             placeholder="ex: Technicien support N1"
                                             required
                                         />
                                     </div>

                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Lieu</label>
                                         <input
                                             type="text"
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newJob.location}
                                             onChange={e => setNewJob({...newJob, location: e.target.value})}
                                             placeholder="Québec, QC"
                                         />
                                     </div>

                                     <div className="col-span-2">
                                         <label className="block text-sm font-bold text-slate-700 mb-2">Type de contrat</label>
                                         <select
                                             className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                             value={newJob.type}
                                             onChange={e => setNewJob({...newJob, type: e.target.value})}
                                         >
                                             <option>Temps plein</option>
                                             <option>Temps partiel</option>
                                             <option>Contractuel</option>
                                         </select>
                                     </div>
                                 </div>

                                 {/* Description with Markdown Editor */}
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 mb-3">Description du poste (Markdown)</label>
                                     <BlogEditor
                                         value={newJob.summary || ''}
                                         onChange={(summary) => setNewJob({...newJob, summary})}
                                         placeholder="Décrivez le poste en détail avec Markdown... Responsabilités, qualifications, avantages..."
                                     />
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                                     <button
                                         type="button"
                                         onClick={handleCancelJobEdit}
                                         className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                                     >
                                         Annuler
                                     </button>
                                     <button
                                         type="submit"
                                         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
                                     >
                                         <Save className="w-5 h-5" />
                                         {editingJob ? 'Mettre à jour le poste' : 'Publier le poste'}
                                     </button>
                                 </div>
                             </form>
                         </div>
                     </div>
                 )}
             </>
         )}

         {/* STATUS PAGE MANAGEMENT */}
         {activeTab === 'status' && (
             <div className="space-y-12">
                 
                 {/* Section A: Services */}
                 <div className="space-y-6">
                     <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded-r-xl">
                         <h2 className="text-xl font-bold text-slate-900">1. État des Systèmes</h2>
                         <p className="text-slate-500 text-sm mt-1">Gérez le statut (Vert/Orange/Rouge) et les notes spécifiques à chaque service.</p>
                     </div>
                     
                     <div className="grid lg:grid-cols-2 gap-6">
                         {systemStatus.map(status => (
                             <div key={status.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                 <div className="flex justify-between items-center mb-4">
                                     <div className="flex items-center gap-3">
                                         <div className={`w-3 h-3 rounded-full ${status.status === 'operational' ? 'bg-green-500' : status.status === 'degraded' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                                         <h3 className="font-bold text-lg text-slate-900">{status.name}</h3>
                                     </div>
                                     <span className="text-xs uppercase bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">{status.category}</span>
                                 </div>
                                 
                                 <div className="space-y-4">
                                     <div>
                                         <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Statut Actuel</label>
                                         <select 
                                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium"
                                            value={status.status}
                                            onChange={(e) => updateSystemStatus(status.id, e.target.value as any, status.note)}
                                         >
                                             <option value="operational">🟢 Opérationnel</option>
                                             <option value="degraded">🟠 Performance Dégradée</option>
                                             <option value="down">🔴 Panne Majeure</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Note publique (Optionnel)</label>
                                         <input 
                                            type="text" 
                                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-300"
                                            placeholder="Ex: Lenteur détectée, investigation en cours..."
                                            value={status.note || ''}
                                            onChange={(e) => updateSystemStatus(status.id, status.status, e.target.value)}
                                         />
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Section B: Incident History */}
                 <div className="space-y-6">
                     <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                         <h2 className="text-xl font-bold text-slate-900">2. Historique & Alertes</h2>
                         <p className="text-slate-500 text-sm mt-1">Ajoutez des incidents passés ou des maintenances planifiées à l'historique.</p>
                     </div>

                     <div className="grid lg:grid-cols-3 gap-8">
                         <div className="lg:col-span-2 space-y-4">
                             {incidents.map(inc => (
                                 <div key={inc.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                                     <div>
                                         <div className="flex items-center gap-2 mb-1">
                                             <span className={`w-2 h-2 rounded-full ${inc.severity === 'good' ? 'bg-green-500' : inc.severity === 'warning' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                                             <span className="text-sm font-bold text-slate-500">{inc.date}</span>
                                         </div>
                                         {inc.title && <h4 className="font-bold text-slate-900">{inc.title}</h4>}
                                         <p className="text-sm text-slate-600">{inc.message}</p>
                                     </div>
                                     <button onClick={() => deleteIncident(inc.id)} className="text-red-400 hover:text-red-600 p-2">
                                         <Trash2 className="w-5 h-5" />
                                     </button>
                                 </div>
                             ))}
                         </div>

                         <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                             <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                                 <Plus className="w-5 h-5" /> Ajouter un événement
                             </h3>
                             <form onSubmit={handleAddIncident} className="space-y-4">
                                 <div>
                                     <label className="block text-xs font-bold text-slate-500 mb-1">Date (Texte libre)</label>
                                     <input 
                                        type="text" 
                                        className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                                        value={newIncident.date} 
                                        onChange={e => setNewIncident({...newIncident, date: e.target.value})}
                                     />
                                 </div>
                                 <div>
                                     <label className="block text-xs font-bold text-slate-500 mb-1">Type / Titre (Optionnel)</label>
                                     <input 
                                        type="text" 
                                        placeholder="Ex: Maintenance Planifiée"
                                        className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                                        value={newIncident.title} 
                                        onChange={e => setNewIncident({...newIncident, title: e.target.value})}
                                     />
                                 </div>
                                 <div>
                                     <label className="block text-xs font-bold text-slate-500 mb-1">Message</label>
                                     <textarea 
                                        className="w-full p-2 border border-slate-300 rounded-lg text-sm h-24" 
                                        value={newIncident.message} 
                                        onChange={e => setNewIncident({...newIncident, message: e.target.value})}
                                        required
                                     ></textarea>
                                 </div>
                                 <div>
                                     <label className="block text-xs font-bold text-slate-500 mb-1">Sévérité (Couleur)</label>
                                     <div className="flex gap-4">
                                         <label className="flex items-center gap-2 cursor-pointer">
                                             <input type="radio" name="severity" value="good" checked={newIncident.severity === 'good'} onChange={() => setNewIncident({...newIncident, severity: 'good'})} />
                                             <span className="text-sm text-green-600 font-bold">Vert</span>
                                         </label>
                                         <label className="flex items-center gap-2 cursor-pointer">
                                             <input type="radio" name="severity" value="warning" checked={newIncident.severity === 'warning'} onChange={() => setNewIncident({...newIncident, severity: 'warning'})} />
                                             <span className="text-sm text-orange-500 font-bold">Orange</span>
                                         </label>
                                         <label className="flex items-center gap-2 cursor-pointer">
                                             <input type="radio" name="severity" value="critical" checked={newIncident.severity === 'critical'} onChange={() => setNewIncident({...newIncident, severity: 'critical'})} />
                                             <span className="text-sm text-red-600 font-bold">Rouge</span>
                                         </label>
                                     </div>
                                 </div>
                                 <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">Ajouter</button>
                             </form>
                         </div>
                     </div>
                 </div>

             </div>
         )}

         {/* CLIENTS / TRUST BAR SECTION */}
         {activeTab === 'clients' && (
             <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-4">
                     <h2 className="font-bold text-lg text-slate-700 mb-4">Logos affichés (Barre de confiance)</h2>
                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                         <div className="p-4 bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                             Ces logos apparaissent sur la page d'accueil dans la section "Ils nous confient leur infrastructure critique".
                         </div>
                         <div className="divide-y divide-slate-100">
                            {clientLogos.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">Aucun logo configuré.</div>
                            ) : (
                                clientLogos.map(client => (
                                    <div key={client.id} className="p-4 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-32 bg-slate-100 rounded-lg flex items-center justify-center p-2 border border-slate-200">
                                                <img src={client.logoUrl} className="max-h-full max-w-full object-contain" alt={client.name}/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{client.name}</h3>
                                                <span className="text-xs text-slate-500 truncate max-w-[200px] block">{client.logoUrl}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteClientLogo(client.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))
                            )}
                         </div>
                     </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                     <h2 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                         <Plus className="w-5 h-5" /> Ajouter un client
                     </h2>
                     <form onSubmit={handleAddClientLogo} className="space-y-4">
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Nom du client</label>
                             <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} required placeholder="ex: Cabinet Juridique XYZ"/>
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">URL du Logo (Image)</label>
                             <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm" value={newClient.logoUrl} onChange={e => setNewClient({...newClient, logoUrl: e.target.value})} required placeholder="https://..."/>
                             <p className="text-xs text-slate-500 mt-1">Recommandé : PNG transparent ou SVG. Hauteur env. 80px.</p>
                         </div>
                         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Ajouter à la liste</button>
                     </form>
                 </div>
             </div>
         )}
         
         {/* PARTNERS MANAGEMENT SECTION */}
         {activeTab === 'partners' && (
             <div className="space-y-12">
                 
                 {/* Section 1: Strategic Partners */}
                 <div className="space-y-6">
                     <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                         <h2 className="text-xl font-bold text-slate-900">1. Alliances Stratégiques (Haut de page)</h2>
                         <p className="text-slate-500 text-sm mt-1">Ces deux partenaires sont mis en avant tout en haut de la page Partenaires.</p>
                     </div>
                     
                     <div className="grid lg:grid-cols-2 gap-8">
                         {strategicPartners.map(partner => (
                             <div key={partner.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                 <div className="flex justify-between items-start mb-4">
                                     <h3 className="font-bold text-lg text-slate-800">{partner.name}</h3>
                                     <button 
                                        onClick={() => setEditingStrategic(partner)}
                                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg text-sm font-bold flex items-center gap-1"
                                     >
                                         <Edit className="w-4 h-4" /> Modifier
                                     </button>
                                 </div>
                                 <div className="space-y-2 text-sm text-slate-600">
                                     <div className="flex gap-2"><span className="font-bold w-20">Rôle:</span> {partner.role}</div>
                                     <div className="flex gap-2"><span className="font-bold w-20">Badge:</span> <span className="bg-slate-100 px-2 rounded text-xs py-0.5">{partner.badgeText}</span></div>
                                     <div className="flex gap-2"><span className="font-bold w-20">Couleur:</span> {partner.themeColor}</div>
                                 </div>
                                 <p className="mt-4 text-xs text-slate-500 border-t border-slate-100 pt-3">{partner.description}</p>
                             </div>
                         ))}
                     </div>
                     
                     {/* Edit Modal for Strategic (Simplified as inline logic) */}
                     {editingStrategic && (
                         <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
                                 <h3 className="text-2xl font-bold mb-6">Modifier {editingStrategic.name}</h3>
                                 <form onSubmit={handleSaveStrategic} className="space-y-4">
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">Nom</label>
                                         <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" value={editingStrategic.name} onChange={e => setEditingStrategic({...editingStrategic, name: e.target.value})} />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">Rôle / Titre</label>
                                         <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" value={editingStrategic.role} onChange={e => setEditingStrategic({...editingStrategic, role: e.target.value})} />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">Texte du Badge</label>
                                         <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" value={editingStrategic.badgeText} onChange={e => setEditingStrategic({...editingStrategic, badgeText: e.target.value})} />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">Thème Couleur</label>
                                         <select className="w-full p-2 border border-slate-300 rounded-lg" value={editingStrategic.themeColor} onChange={e => setEditingStrategic({...editingStrategic, themeColor: e.target.value as any})}>
                                             <option value="blue">Bleu (Standard)</option>
                                             <option value="purple">Violet (Premium)</option>
                                             <option value="cyan">Cyan (Tech)</option>
                                             <option value="green">Vert (Success)</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">URL Logo</label>
                                         <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={editingStrategic.logoUrl} onChange={e => setEditingStrategic({...editingStrategic, logoUrl: e.target.value})} />
                                     </div>
                                     <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                                         <textarea className="w-full p-2 border border-slate-300 rounded-lg h-32" value={editingStrategic.description} onChange={e => setEditingStrategic({...editingStrategic, description: e.target.value})}></textarea>
                                     </div>
                                     <div className="flex justify-end gap-3 pt-4">
                                         <button type="button" onClick={() => setEditingStrategic(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Annuler</button>
                                         <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Sauvegarder</button>
                                     </div>
                                 </form>
                             </div>
                         </div>
                     )}
                 </div>

                 {/* Section 2: Standard Partners */}
                 <div className="grid lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-6">
                         <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded-r-xl">
                             <h2 className="text-xl font-bold text-slate-900">2. Partenaires Technologiques</h2>
                             <p className="text-slate-500 text-sm mt-1">Liste des partenaires affichés par catégorie.</p>
                         </div>
                         
                         {["Infrastructure & Cloud", "Cybersécurité & Outils MSP", "Matériel & Périphériques"].map(cat => (
                             <div key={cat} className="mb-8">
                                 <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">{cat}</h3>
                                 <div className="space-y-2">
                                     {standardPartners.filter(p => p.category === cat).map(p => (
                                         <div key={p.id} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm">
                                             <div className="flex items-center gap-3">
                                                 <img src={p.logoUrl} alt={p.name} className="w-8 h-8 object-contain bg-slate-50 rounded p-1"/>
                                                 <div>
                                                     <p className="font-bold text-sm text-slate-800">{p.name}</p>
                                                     <p className="text-xs text-slate-400 truncate max-w-xs">{p.description}</p>
                                                 </div>
                                             </div>
                                             <button onClick={() => deleteStandardPartner(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg hover:text-red-600">
                                                 <Trash2 className="w-4 h-4" />
                                             </button>
                                         </div>
                                     ))}
                                     {standardPartners.filter(p => p.category === cat).length === 0 && (
                                         <p className="text-sm italic text-slate-400 pl-2">Aucun partenaire dans cette catégorie.</p>
                                     )}
                                 </div>
                             </div>
                         ))}
                     </div>

                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                         <h2 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                             <Plus className="w-5 h-5" /> Ajouter un partenaire
                         </h2>
                         <form onSubmit={handleAddStandardPartner} className="space-y-4">
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newStandardPartner.name} onChange={e => setNewStandardPartner({...newStandardPartner, name: e.target.value})} required />
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                                 <select className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newStandardPartner.category} onChange={e => setNewStandardPartner({...newStandardPartner, category: e.target.value as any})}>
                                     <option>Infrastructure & Cloud</option>
                                     <option>Cybersécurité & Outils MSP</option>
                                     <option>Matériel & Périphériques</option>
                                 </select>
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">URL Logo</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900" value={newStandardPartner.logoUrl} onChange={e => setNewStandardPartner({...newStandardPartner, logoUrl: e.target.value})} placeholder="https://..." required/>
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Description courte</label>
                                 <textarea className="w-full p-2 bg-white border border-slate-300 rounded-lg h-24 text-slate-900" value={newStandardPartner.description} onChange={e => setNewStandardPartner({...newStandardPartner, description: e.target.value})} required></textarea>
                             </div>
                             <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Ajouter</button>
                         </form>
                     </div>
                 </div>

             </div>
         )}

         {/* ABOUT / TEAM SECTION */}
         {activeTab === 'about' && (
             <div className="space-y-12">
                 
                 {/* 1. History Form */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Histoire de l'entreprise</h2>
                     <form onSubmit={handleSaveStory} className="space-y-4">
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">Année de fondation</label>
                             <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempStory.foundingYear} onChange={e => setTempStory({...tempStory, foundingYear: e.target.value})} />
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">Paragraphe 1 (Intro)</label>
                             <textarea className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24" value={tempStory.intro} onChange={e => setTempStory({...tempStory, intro: e.target.value})} />
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">Paragraphe 2 (Mission - En gras)</label>
                             <textarea className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24" value={tempStory.mission} onChange={e => setTempStory({...tempStory, mission: e.target.value})} />
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">Paragraphe 3 (Vision)</label>
                             <textarea className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24" value={tempStory.vision} onChange={e => setTempStory({...tempStory, vision: e.target.value})} />
                         </div>
                         <div className="flex justify-end">
                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                                 <Save className="w-4 h-4" /> Sauvegarder Histoire
                             </button>
                         </div>
                     </form>
                 </div>

                 {/* 2. Team Management */}
                 <div className="grid lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-4">
                         <h2 className="font-bold text-lg text-slate-700 mb-4">Membres de l'équipe</h2>
                         {teamMembers.map(member => (
                             <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                                 <div className="flex items-center gap-4">
                                     <img src={member.imageUrl} className="w-12 h-12 rounded-full object-cover bg-slate-200" alt="avatar"/>
                                     <div>
                                         <h3 className="font-bold text-slate-900">{member.name}</h3>
                                         <span className="text-xs text-blue-600 font-bold uppercase">{member.role}</span>
                                     </div>
                                 </div>
                                 <button onClick={() => deleteTeamMember(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                     <Trash2 className="w-5 h-5" />
                                 </button>
                             </div>
                         ))}
                     </div>

                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                         <h2 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                             <Plus className="w-5 h-5" /> Ajouter un membre
                         </h2>
                         <form onSubmit={handleAddTeamMember} className="space-y-4">
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Nom Complet</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required placeholder="ex: Président" />
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Photo URL</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900" value={newMember.imageUrl} onChange={e => setNewMember({...newMember, imageUrl: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                                 <textarea className="w-full p-2 bg-white border border-slate-300 rounded-lg h-24 text-slate-900" value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} required></textarea>
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Citation (Optionnel)</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newMember.quote} onChange={e => setNewMember({...newMember, quote: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL (Optionnel)</label>
                                 <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newMember.linkedinUrl} onChange={e => setNewMember({...newMember, linkedinUrl: e.target.value})} />
                             </div>
                             <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Ajouter</button>
                         </form>
                     </div>
                 </div>
             </div>
         )}

         {/* SETTINGS SECTION */}
         {activeTab === 'settings' && (
             <div className="max-w-4xl mx-auto">
                 <form onSubmit={handleSaveSettings} className="space-y-8">
                     
                     {/* Identity */}
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                         <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Identité Visuelle</h2>
                         <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Nom de l'entreprise</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.companyName} onChange={e => setTempSettings({...tempSettings, companyName: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Logo URL (Optionnel)</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl placeholder:text-slate-400" placeholder="https://..." value={tempSettings.logoUrl} onChange={e => setTempSettings({...tempSettings, logoUrl: e.target.value})} />
                                 <p className="text-xs text-slate-500 mt-1">Laisser vide pour utiliser le logo vectoriel par défaut.</p>
                             </div>
                         </div>
                     </div>

                     {/* Contact */}
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                         <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Coordonnées</h2>
                         <div className="grid md:grid-cols-2 gap-6 mb-4">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone (Urgence)</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.phone} onChange={e => setTempSettings({...tempSettings, phone: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Courriel Support</label>
                                 <input type="email" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.email} onChange={e => setTempSettings({...tempSettings, email: e.target.value})} />
                             </div>
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Adresse</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.address} onChange={e => setTempSettings({...tempSettings, address: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Ville / Code Postal</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.city} onChange={e => setTempSettings({...tempSettings, city: e.target.value})} />
                             </div>
                         </div>
                     </div>

                     {/* Socials */}
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                         <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Réseaux Sociaux</h2>
                         <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn URL</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.linkedinUrl} onChange={e => setTempSettings({...tempSettings, linkedinUrl: e.target.value})} />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Facebook URL</label>
                                 <input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl" value={tempSettings.facebookUrl} onChange={e => setTempSettings({...tempSettings, facebookUrl: e.target.value})} />
                             </div>
                         </div>
                     </div>

                     {/* Announcement Banner */}
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                         <div className={`absolute top-0 right-0 p-4 ${tempSettings.announcement.active ? 'text-green-500' : 'text-slate-300'}`}>
                             <div className="flex items-center gap-2">
                                 <span className="text-sm font-bold">{tempSettings.announcement.active ? 'ACTIF' : 'INACTIF'}</span>
                                 <div className={`w-3 h-3 rounded-full ${tempSettings.announcement.active ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                             </div>
                         </div>
                         <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                             <AlertTriangle className="w-5 h-5 text-orange-500" />
                             Bandeau d'Alerte Globale
                         </h2>
                         
                         <div className="space-y-4">
                             <div className="flex items-center gap-2">
                                 <input 
                                    type="checkbox" 
                                    id="announcementActive"
                                    className="w-5 h-5 accent-blue-600"
                                    checked={tempSettings.announcement.active}
                                    onChange={e => setTempSettings({
                                        ...tempSettings, 
                                        announcement: { ...tempSettings.announcement, active: e.target.checked }
                                    })}
                                 />
                                 <label htmlFor="announcementActive" className="text-sm font-bold text-slate-700">Activer le bandeau en haut du site</label>
                             </div>
                             
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                 <input 
                                    type="text" 
                                    className="w-full p-3 bg-white border border-slate-300 rounded-xl" 
                                    value={tempSettings.announcement.message}
                                    onChange={e => setTempSettings({
                                        ...tempSettings, 
                                        announcement: { ...tempSettings.announcement, message: e.target.value }
                                    })}
                                 />
                             </div>

                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Type d'alerte</label>
                                 <select 
                                    className="w-full p-3 bg-white border border-slate-300 rounded-xl"
                                    value={tempSettings.announcement.type}
                                    onChange={e => setTempSettings({
                                        ...tempSettings, 
                                        announcement: { ...tempSettings.announcement, type: e.target.value as any }
                                    })}
                                 >
                                     <option value="info">Info (Bleu)</option>
                                     <option value="warning">Attention (Orange)</option>
                                     <option value="danger">Danger / Panne (Rouge)</option>
                                 </select>
                             </div>
                         </div>
                     </div>

                     <div className="sticky bottom-6 bg-white p-4 rounded-xl shadow-2xl border border-slate-200 flex justify-end">
                         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                             <Save className="w-5 h-5" /> Enregistrer les paramètres
                         </button>
                     </div>
                 </form>
             </div>
         )}

         {/* SECURITY SECTION */}
         {activeTab === 'security' && (
             <div className="space-y-8 max-w-3xl">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                         <div className="p-3 bg-blue-100 rounded-xl">
                             <Key className="w-6 h-6 text-blue-600" />
                         </div>
                         <div>
                             <h2 className="text-2xl font-bold text-slate-900">Changer le mot de passe</h2>
                             <p className="text-sm text-slate-500">Mettez à jour vos identifiants de connexion</p>
                         </div>
                     </div>

                     <form onSubmit={handleChangePassword} className="space-y-6">
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">
                                 Mot de passe actuel
                             </label>
                             <input
                                 type="password"
                                 value={passwordForm.currentPassword}
                                 onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                 className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                 required
                                 disabled={passwordLoading}
                             />
                         </div>

                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">
                                 Nouveau mot de passe
                             </label>
                             <input
                                 type="password"
                                 value={passwordForm.newPassword}
                                 onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                 className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                 required
                                 minLength={6}
                                 disabled={passwordLoading}
                             />
                             <p className="text-xs text-slate-500 mt-1">Minimum 6 caractères</p>
                         </div>

                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">
                                 Confirmer le nouveau mot de passe
                             </label>
                             <input
                                 type="password"
                                 value={passwordForm.confirmPassword}
                                 onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                 className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                 required
                                 disabled={passwordLoading}
                             />
                         </div>

                         {passwordError && (
                             <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                 <XCircle className="w-5 h-5 flex-shrink-0" />
                                 <span className="text-sm font-semibold">{passwordError}</span>
                             </div>
                         )}

                         {passwordSuccess && (
                             <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                 <span className="text-sm font-semibold">Mot de passe changé avec succès!</span>
                             </div>
                         )}

                         <button
                             type="submit"
                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                             disabled={passwordLoading}
                         >
                             {passwordLoading ? (
                                 <>
                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                     <span>Modification en cours...</span>
                                 </>
                             ) : (
                                 <>
                                     <Shield className="w-5 h-5" />
                                     <span>Changer le mot de passe</span>
                                 </>
                             )}
                         </button>
                     </form>
                 </div>

                 <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
                     <div className="flex items-start gap-3">
                         <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                         <div>
                             <h3 className="font-bold text-orange-900 mb-2">Conseils de sécurité</h3>
                             <ul className="text-sm text-orange-800 space-y-1">
                                 <li>• Utilisez un mot de passe unique et complexe</li>
                                 <li>• Changez votre mot de passe régulièrement</li>
                                 <li>• Ne partagez jamais vos identifiants</li>
                                 <li>• Utilisez un gestionnaire de mots de passe</li>
                             </ul>
                         </div>
                     </div>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default Admin;
