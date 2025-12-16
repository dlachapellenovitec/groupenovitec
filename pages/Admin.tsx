import React, { useState } from 'react';
import { useData, BlogPost, JobPosting, SiteSettings, TeamMember, CompanyStory, ClientLogo, StrategicPartner, StandardPartner } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Plus, Trash2, Shield, ArrowLeft, Settings, Save, AlertTriangle, Users, Building, Handshake, Edit } from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    posts, jobs, settings, teamMembers, companyStory, clientLogos, strategicPartners, standardPartners,
    addPost, deletePost, addJob, deleteJob, updateSettings, 
    addTeamMember, deleteTeamMember, addClientLogo, deleteClientLogo, updateCompanyStory,
    updateStrategicPartner, addStandardPartner, deleteStandardPartner
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'blog' | 'careers' | 'about' | 'settings' | 'clients' | 'partners'>('blog');
  
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

  // Settings & Story Form State
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);
  const [tempStory, setTempStory] = useState<CompanyStory>(companyStory);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      addPost(newPost as Omit<BlogPost, 'id' | 'date'>);
      setNewPost({ title: '', category: 'Cybersécurité', author: 'Admin', content: '', excerpt: '', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' });
      alert('Article ajouté !');
    }
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.summary) {
      addJob(newJob as Omit<JobPosting, 'id'>);
      setNewJob({ title: '', location: 'Québec', type: 'Temps plein', summary: '' });
      alert('Poste ajouté !');
    }
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.name && newMember.role) {
      addTeamMember(newMember as Omit<TeamMember, 'id'>);
      setNewMember({ name: '', role: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800', linkedinUrl: '', quote: '' });
      alert('Membre ajouté !');
    }
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
        
        <nav className="flex-grow p-4 space-y-2">
            <button 
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <FileText className="w-5 h-5" /> Blog
            </button>
            <button 
                onClick={() => setActiveTab('careers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'careers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <Briefcase className="w-5 h-5" /> Carrières
            </button>
            <button 
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <Users className="w-5 h-5" /> Équipe & Histoire
            </button>
            <button 
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'clients' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <Building className="w-5 h-5" /> Clients / Trust Bar
            </button>
             <button 
                onClick={() => setActiveTab('partners')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'partners' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <Handshake className="w-5 h-5" /> Partenaires
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
                <Settings className="w-5 h-5" /> Configuration
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
         <header className="mb-10 flex justify-between items-center">
             <h1 className="text-3xl font-bold text-slate-900">
                 {activeTab === 'blog' && 'Gestion du Blog'}
                 {activeTab === 'careers' && 'Gestion des Carrières'}
                 {activeTab === 'about' && 'Gestion À Propos'}
                 {activeTab === 'clients' && 'Gestion des Clients (Barre Accueil)'}
                 {activeTab === 'partners' && 'Gestion des Partenaires (Page Dédiée)'}
                 {activeTab === 'settings' && 'Configuration Générale'}
             </h1>
             <div className="text-sm text-slate-500">Connecté en tant que Admin</div>
         </header>

         {/* BLOG SECTION */}
         {activeTab === 'blog' && (
             <div className="grid lg:grid-cols-3 gap-8">
                 {/* List */}
                 <div className="lg:col-span-2 space-y-4">
                     <h2 className="font-bold text-lg text-slate-700 mb-4">Articles existants</h2>
                     {posts.map(post => (
                         <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                             <div className="flex items-center gap-4">
                                 <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-slate-200" alt="thumb"/>
                                 <div>
                                     <h3 className="font-bold text-slate-900">{post.title}</h3>
                                     <span className="text-xs text-slate-500">{post.category} • {post.date}</span>
                                 </div>
                             </div>
                             <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         </div>
                     ))}
                 </div>

                 {/* Add Form */}
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                     <h2 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                         <Plus className="w-5 h-5" /> Ajouter un article
                     </h2>
                     <form onSubmit={handleAddPost} className="space-y-4">
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Titre</label>
                             <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                                <select className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})}>
                                    <option>Cybersécurité</option>
                                    <option>Conformité</option>
                                    <option>Technologie</option>
                                    <option>Cloud</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Auteur</label>
                                <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} />
                             </div>
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">URL Image</label>
                             <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900" value={newPost.imageUrl} onChange={e => setNewPost({...newPost, imageUrl: e.target.value})} />
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Extrait (Court)</label>
                             <textarea className="w-full p-2 bg-white border border-slate-300 rounded-lg h-20 text-slate-900" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} required></textarea>
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Contenu Complet</label>
                             <textarea className="w-full p-2 bg-white border border-slate-300 rounded-lg h-40 text-slate-900" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required></textarea>
                         </div>
                         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Publier</button>
                     </form>
                 </div>
             </div>
         )}

         {/* CAREERS SECTION */}
         {activeTab === 'careers' && (
             <div className="grid lg:grid-cols-3 gap-8">
                 {/* List */}
                 <div className="lg:col-span-2 space-y-4">
                     <h2 className="font-bold text-lg text-slate-700 mb-4">Postes ouverts</h2>
                     {jobs.map(job => (
                         <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                             <div>
                                 <h3 className="font-bold text-slate-900">{job.title}</h3>
                                 <span className="text-xs text-slate-500">{job.location} • {job.type}</span>
                             </div>
                             <button onClick={() => deleteJob(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         </div>
                     ))}
                 </div>

                 {/* Add Form */}
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
                     <h2 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                         <Plus className="w-5 h-5" /> Ajouter un poste
                     </h2>
                     <form onSubmit={handleAddJob} className="space-y-4">
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Titre du poste</label>
                             <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} required placeholder="ex: Technicien N1"/>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lieu</label>
                                <input type="text" className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                <select className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                                    <option>Temps plein</option>
                                    <option>Temps partiel</option>
                                    <option>Contractuel</option>
                                </select>
                             </div>
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Description sommaire</label>
                             <textarea className="w-full p-2 bg-white border border-slate-300 rounded-lg h-32 text-slate-900" value={newJob.summary} onChange={e => setNewJob({...newJob, summary: e.target.value})} required placeholder="Description attrayante..."></textarea>
                         </div>
                         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Publier l'offre</button>
                     </form>
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
      </div>
    </div>
  );
};

export default Admin;