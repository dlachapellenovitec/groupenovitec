import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  quote?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface CompanyStory {
  foundingYear: string;
  intro: string;
  mission: string;
  vision: string;
}

export interface SiteSettings {
  companyName: string;
  logoUrl: string; 
  phone: string;
  email: string;
  address: string;
  city: string;
  linkedinUrl: string;
  facebookUrl: string;
  announcement: {
    active: boolean;
    message: string;
    type: 'info' | 'warning' | 'danger';
  };
}

export interface StrategicPartner {
  id: string;
  name: string;
  role: string;
  description: string;
  logoUrl: string;
  badgeText: string;
  themeColor: 'blue' | 'purple' | 'cyan' | 'green';
}

export interface StandardPartner {
  id: string;
  name: string;
  category: 'Infrastructure & Cloud' | 'Cybersécurité & Outils MSP' | 'Matériel & Périphériques';
  description: string;
  logoUrl: string;
}

// --- STATUS PAGE TYPES ---
export interface SystemStatusItem {
    id: string;
    category: 'cloud' | 'voip' | 'security';
    name: string;
    status: 'operational' | 'degraded' | 'down';
    uptime: string;
    note?: string; // Optional note (e.g. "Microsoft reports slowness")
}

export interface IncidentItem {
    id: string;
    date: string;
    title?: string;
    message: string;
    severity: 'good' | 'warning' | 'critical'; // Maps to Green, Orange, Red
}

interface DataContextType {
  posts: BlogPost[];
  jobs: JobPosting[];
  settings: SiteSettings;
  teamMembers: TeamMember[];
  clientLogos: ClientLogo[];
  companyStory: CompanyStory;
  strategicPartners: StrategicPartner[];
  standardPartners: StandardPartner[];
  
  // Status Page Data
  systemStatus: SystemStatusItem[];
  incidents: IncidentItem[];
  
  // UI State for Quiz
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addJob: (job: Omit<JobPosting, 'id'>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addClientLogo: (client: Omit<ClientLogo, 'id'>) => Promise<void>;
  deleteClientLogo: (id: string) => Promise<void>;
  updateCompanyStory: (story: CompanyStory) => Promise<void>;
  updateStrategicPartner: (id: string, partner: StrategicPartner) => Promise<void>;
  addStandardPartner: (partner: Omit<StandardPartner, 'id'>) => Promise<void>;
  deleteStandardPartner: (id: string) => Promise<void>;
  
  // Status Page Actions
  updateSystemStatus: (id: string, status: 'operational' | 'degraded' | 'down', note?: string) => Promise<void>;
  addIncident: (incident: Omit<IncidentItem, 'id'>) => Promise<void>;
  deleteIncident: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- INITIAL MOCK DATA ---
const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: "Loi 25 : Ce que les PME du Québec doivent savoir en 2024",
    category: "Conformité",
    author: "Pierre Tremblay",
    date: "12 Oct 2023",
    excerpt: "Les nouvelles dispositions entrent en vigueur. Êtes-vous responsable des données de vos clients ? Voici la checklist pour éviter les amendes.",
    content: "La Loi 25 modernise les dispositions législatives en matière de protection des renseignements personnels. Pour une PME québécoise, cela signifie la nomination d'un responsable, la mise en place d'un registre d'incidents, et l'obligation de divulguer toute fuite de données...",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    title: "Ransomware : L'anatomie d'une attaque sur un cabinet comptable",
    category: "Cybersécurité",
    author: "Marc-André Côté",
    date: "28 Sept 2023",
    excerpt: "Étude de cas : comment un simple fichier Excel a paralysé une firme de 15 employés pendant 4 jours, et comment Novigard aurait pu l'éviter.",
    content: "Tout a commencé un mardi matin par un courriel semblant provenir d'un client fidèle. La pièce jointe 'Facture_Q3.xlsx' contenait en réalité une macro malveillante...",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '3',
    title: "Microsoft 365 Business Premium vs Standard : Lequel choisir ?",
    category: "Technologie",
    author: "Sophie Gagnon",
    date: "15 Sept 2023",
    excerpt: "Pourquoi l'économie de 5$ par mois sur la licence Standard pourrait vous coûter des milliers de dollars en sécurité.",
    content: "Beaucoup de PME optent pour la version Standard pour économiser. Cependant, la version Premium inclut Intune (gestion des appareils) et Defender for Business...",
    imageUrl: "https://images.unsplash.com/photo-1633419461186-7d40a2e50e38?auto=format&fit=crop&q=80&w=800"
  }
];

const initialJobs: JobPosting[] = [
  {
    id: '1',
    title: "Technicien Niveau 2 - Support MSP",
    location: "Québec (Hybride)",
    type: "Temps plein",
    summary: "Tu aimes résoudre des problèmes complexes et tu maitrises l'environnement Microsoft 365 ? On te veut dans l'équipe."
  },
  {
    id: '2',
    title: "Administrateur Système Sénior",
    location: "Montréal / Québec (Hybride)",
    type: "Temps plein",
    summary: "Expertise requise en virtualisation (VMware/XCP-NG) et réseautique (Fortinet). Leadership technique demandé."
  }
];

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: "Pierre Tremblay",
    role: "Président & Fondateur",
    bio: "Expert en sécurité avec 20 ans d'expérience. Il a fondé Novitec pour offrir une alternative locale robuste aux grandes firmes internationales.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "La sécurité n'est pas négociable. C'est la fondation de votre entreprise."
  },
  {
    id: '2',
    name: "Sophie Gagnon",
    role: "Directrice des Opérations (COO)",
    bio: "Elle s'assure que chaque ticket est résolu rapidement et que nos processus MSP respectent les standards ITIL les plus stricts.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "Chaque minute d'arrêt compte. Notre priorité est votre continuité."
  },
  {
    id: '3',
    name: "Marc-André Côté",
    role: "Architecte Solutions & vCIO",
    bio: "Le stratège derrière vos projets. Il aligne votre technologie avec vos objectifs d'affaires et planifie votre croissance à long terme.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "La technologie doit servir vos objectifs d'affaires, pas l'inverse."
  }
];

const initialClientLogos: ClientLogo[] = [
    { id: '1', name: "JURIDIQ INC", logoUrl: "https://placehold.co/200x80/transparent/1e293b?text=JURIDIQ+INC&font=montserrat" },
    { id: '2', name: "MEDI CLINIQUE", logoUrl: "https://placehold.co/200x80/transparent/1e293b?text=MEDI+CLINIQUE&font=roboto" },
    { id: '3', name: "COMPTABLES +", logoUrl: "https://placehold.co/200x80/transparent/1e293b?text=COMPTABLES%2B&font=playfair" },
    { id: '4', name: "CONSTRUCT", logoUrl: "https://placehold.co/200x80/transparent/1e293b?text=CONSTRUCT&font=oswald" },
    { id: '5', name: "TECHNOV", logoUrl: "https://placehold.co/200x80/transparent/1e293b?text=TECHNOV&font=lato" }
];

const initialStory: CompanyStory = {
  foundingYear: "2018",
  intro: "Tout a commencé par un constat frustrant : les PME québécoises (comptables, avocats, manufacturiers) étaient mal servies. Elles avaient le choix entre le \"voisin qui s'y connaît\" ou de grandes firmes TI impersonnelles et hors de prix.",
  mission: "Il manquait un juste milieu : un partenaire professionnel, structuré et sécuritaire, mais qui reste proche de ses clients.",
  vision: "C'est là que Groupe Novitec est né. Nous avons bâti notre offre autour de la cybersécurité (Novigard) et de la souveraineté des données, car nous croyons que l'économie locale doit être protégée avec les meilleurs standards mondiaux."
};

const initialSettings: SiteSettings = {
  companyName: "GROUPE NOVITEC",
  logoUrl: "", 
  phone: "514-360-1757",
  email: "support@novitec.ca",
  address: "3361 avenue de la Gare, Suite 122",
  city: "Mascouche, Qc, J7K 3C1",
  linkedinUrl: "#",
  facebookUrl: "#",
  announcement: {
    active: false,
    message: "Alerte : Maintenance planifiée des services Cloud ce samedi de 22h à 02h.",
    type: "info"
  }
};

const initialStrategicPartners: StrategicPartner[] = [
  {
    id: '1',
    name: "ItCloud.ca",
    role: "Distributeur Cloud Canadien",
    description: "Notre partenaire privilégié pour la distribution des solutions Microsoft et la sauvegarde cloud. ItCloud garantit que vos données transigent par des infrastructures 100% canadiennes, un atout majeur pour votre conformité.",
    logoUrl: "https://placehold.co/400x150/transparent/2563eb?text=ItCloud.ca&font=roboto",
    badgeText: "PARTENAIRE ÉLITE",
    themeColor: 'blue'
  },
  {
    id: '2',
    name: "SMCorp",
    role: "Alliance Stratégique",
    description: "En tant qu'ambassadeur SMCorp, Novitec bénéficie d'un réseau d'affaires et de ressources exclusives qui nous permettent d'élever nos standards de service et d'offrir une valeur ajoutée unique à nos clients.",
    logoUrl: "https://placehold.co/400x150/transparent/7e22ce?text=SMCorp&font=montserrat",
    badgeText: "MEMBRE AMBASSADEUR",
    themeColor: 'purple'
  }
];

const initialStandardPartners: StandardPartner[] = [
    { id: '1', name: "Microsoft 365", category: "Infrastructure & Cloud", description: "Productivité & Collaboration (Teams, SharePoint, Exchange)", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Microsoft" },
    { id: '2', name: "OVHcloud", category: "Infrastructure & Cloud", description: "Infrastructure Serveur Bare Metal & Hébergement Web", logoUrl: "https://placehold.co/100x100/transparent/334155?text=OVH" },
    { id: '3', name: "XCP-ng", category: "Infrastructure & Cloud", description: "Virtualisation Open Source & Souveraine (Alternative VMware)", logoUrl: "https://placehold.co/100x100/transparent/334155?text=XCP-ng" },
    { id: '4', name: "Datto", category: "Infrastructure & Cloud", description: "Continuité des affaires (BCDR) & Sauvegarde Serveur", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Datto" },
    { id: '5', name: "Huntress", category: "Cybersécurité & Outils MSP", description: "Détection et réponse gérée (MDR) contre les hackers humains.", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Huntress" },
    { id: '6', name: "Kaseya", category: "Cybersécurité & Outils MSP", description: "Gestion à distance (RMM) et automatisation TI.", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Kaseya" },
    { id: '7', name: "HaloPSA", category: "Cybersécurité & Outils MSP", description: "Plateforme de gestion des services et tickets clients.", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Halo" },
    { id: '8', name: "Lenovo", category: "Matériel & Périphériques", description: "Postes de travail et portables entreprise.", logoUrl: "https://placehold.co/100x100/transparent/334155?text=Lenovo" },
    { id: '9', name: "Dell", category: "Matériel & Périphériques", description: "Serveurs et infrastructure réseau.", logoUrl: "https://placehold.co/100x100/transparent/334155?text=DELL" },
];

const initialSystemStatus: SystemStatusItem[] = [
    { id: '1', category: 'cloud', name: "Montréal-BHS (Zone 1)", status: "operational", uptime: "99.998%" },
    { id: '2', category: 'cloud', name: "Québec-QC (Zone 2 - DR)", status: "operational", uptime: "100.00%" },
    { id: '3', category: 'cloud', name: "Stockage S3 Object", status: "operational", uptime: "99.999%" },
    { id: '4', category: 'voip', name: "Cluster VoIP Principal", status: "operational", uptime: "99.995%" },
    { id: '5', category: 'voip', name: "Passerelle Teams Direct Routing", status: "operational", uptime: "100.00%" },
    { id: '6', category: 'voip', name: "Services SMS & Fax", status: "operational", uptime: "99.950%" },
    { id: '7', category: 'security', name: "Relais SMTP Novigard", status: "operational", uptime: "100.00%" },
    { id: '8', category: 'security', name: "EDR / SentinelOne Cloud", status: "operational", uptime: "99.990%" },
    { id: '9', category: 'security', name: "Microsoft 365 (Global)", status: "degraded", uptime: "99.500%", note: "Microsoft rapporte des lenteurs sur Outlook Web pour l'Amérique du Nord. Nos ingénieurs surveillent." },
];

const initialIncidents: IncidentItem[] = [
    { id: '1', date: "14 Décembre 2024", message: "Aucun incident rapporté.", severity: "good" },
    { id: '2', date: "28 Novembre 2024", title: "Maintenance Planifiée - Cluster QC", message: "Mise à jour des hyperviseurs XCP-NG. Aucune interruption de service constatée (Failover automatique).", severity: "warning" }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  const [posts, setPosts] = useState<BlogPost[]>(() => {
      const saved = localStorage.getItem('novitec_posts');
      return saved ? JSON.parse(saved) : initialPosts;
  });
  
  const [jobs, setJobs] = useState<JobPosting[]>(() => {
      const saved = localStorage.getItem('novitec_jobs');
      return saved ? JSON.parse(saved) : initialJobs;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
      const saved = localStorage.getItem('novitec_settings');
      return saved ? JSON.parse(saved) : initialSettings;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
      const saved = localStorage.getItem('novitec_team');
      return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(() => {
      const saved = localStorage.getItem('novitec_clients');
      return saved ? JSON.parse(saved) : initialClientLogos;
  });

  const [companyStory, setCompanyStory] = useState<CompanyStory>(() => {
      const saved = localStorage.getItem('novitec_story');
      return saved ? JSON.parse(saved) : initialStory;
  });

  const [strategicPartners, setStrategicPartners] = useState<StrategicPartner[]>(() => {
      const saved = localStorage.getItem('novitec_strategic_partners');
      return saved ? JSON.parse(saved) : initialStrategicPartners;
  });

  const [standardPartners, setStandardPartners] = useState<StandardPartner[]>(() => {
      const saved = localStorage.getItem('novitec_standard_partners');
      return saved ? JSON.parse(saved) : initialStandardPartners;
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatusItem[]>(() => {
      const saved = localStorage.getItem('novitec_status');
      return saved ? JSON.parse(saved) : initialSystemStatus;
  });

  const [incidents, setIncidents] = useState<IncidentItem[]>(() => {
      const saved = localStorage.getItem('novitec_incidents');
      return saved ? JSON.parse(saved) : initialIncidents;
  });

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('novitec_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('novitec_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('novitec_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('novitec_team', JSON.stringify(teamMembers)); }, [teamMembers]);
  useEffect(() => { localStorage.setItem('novitec_clients', JSON.stringify(clientLogos)); }, [clientLogos]);
  useEffect(() => { localStorage.setItem('novitec_story', JSON.stringify(companyStory)); }, [companyStory]);
  useEffect(() => { localStorage.setItem('novitec_strategic_partners', JSON.stringify(strategicPartners)); }, [strategicPartners]);
  useEffect(() => { localStorage.setItem('novitec_standard_partners', JSON.stringify(standardPartners)); }, [standardPartners]);
  useEffect(() => { localStorage.setItem('novitec_status', JSON.stringify(systemStatus)); }, [systemStatus]);
  useEffect(() => { localStorage.setItem('novitec_incidents', JSON.stringify(incidents)); }, [incidents]);

  // Attempt to Fetch from API
  useEffect(() => {
    const fetchAll = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const [p, j, s, t, c, st, sp, std] = await Promise.all([
                fetch(`${API_BASE_URL}/posts`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/jobs`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/settings`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/team`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/clients`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/story`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/partners/strategic`, { signal: controller.signal }).then(r => r.json()),
                fetch(`${API_BASE_URL}/partners/standard`, { signal: controller.signal }).then(r => r.json())
            ]);
            
            clearTimeout(timeoutId);

            setPosts(p);
            setJobs(j);
            if(s.companyName) setSettings(s);
            setTeamMembers(t);
            setClientLogos(c);
            if(st.foundingYear) setCompanyStory(st);
            setStrategicPartners(sp);
            setStandardPartners(std);
        } catch (error) {
            console.warn("API unreachable. Using local data.");
        }
    };
    fetchAll();
  }, []);

  const addPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    const date = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric' });
    const newPost = { ...post, date, id: Date.now().toString() };
    setPosts([newPost, ...posts]);
  };

  const deletePost = async (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const addJob = async (job: Omit<JobPosting, 'id'>) => {
    const newJob = { ...job, id: Date.now().toString() };
    setJobs([newJob, ...jobs]);
  };

  const deleteJob = async (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeamMembers([...teamMembers, newMember]);
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers(teamMembers.filter(t => t.id !== id));
  };

  const addClientLogo = async (client: Omit<ClientLogo, 'id'>) => {
    const newClient = { ...client, id: Date.now().toString() };
    setClientLogos([...clientLogos, newClient]);
  };

  const deleteClientLogo = async (id: string) => {
    setClientLogos(clientLogos.filter(c => c.id !== id));
  };

  const updateCompanyStory = async (story: CompanyStory) => {
    setCompanyStory(story);
  };

  const updateStrategicPartner = async (id: string, updatedPartner: StrategicPartner) => {
    setStrategicPartners(strategicPartners.map(p => p.id === id ? updatedPartner : p));
  };

  const addStandardPartner = async (partner: Omit<StandardPartner, 'id'>) => {
    const newPartner = { ...partner, id: Date.now().toString() };
    setStandardPartners([...standardPartners, newPartner]);
  };

  const deleteStandardPartner = async (id: string) => {
    setStandardPartners(standardPartners.filter(p => p.id !== id));
  };

  const updateSystemStatus = async (id: string, status: 'operational' | 'degraded' | 'down', note?: string) => {
      setSystemStatus(systemStatus.map(s => 
          s.id === id ? { ...s, status, note } : s
      ));
  };

  const addIncident = async (incident: Omit<IncidentItem, 'id'>) => {
      const newIncident = { ...incident, id: Date.now().toString() };
      setIncidents([newIncident, ...incidents]);
  };

  const deleteIncident = async (id: string) => {
      setIncidents(incidents.filter(i => i.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      posts, jobs, settings, teamMembers, companyStory, clientLogos, strategicPartners, standardPartners,
      systemStatus, incidents,
      isQuizOpen, openQuiz, closeQuiz,
      addPost, deletePost, addJob, deleteJob, updateSettings, 
      addTeamMember, deleteTeamMember, addClientLogo, deleteClientLogo, updateCompanyStory,
      updateStrategicPartner, addStandardPartner, deleteStandardPartner,
      updateSystemStatus, addIncident, deleteIncident
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};