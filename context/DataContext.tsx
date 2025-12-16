import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

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

interface DataContextType {
  posts: BlogPost[];
  jobs: JobPosting[];
  settings: SiteSettings;
  teamMembers: TeamMember[];
  clientLogos: ClientLogo[];
  companyStory: CompanyStory;
  strategicPartners: StrategicPartner[];
  standardPartners: StandardPartner[];
  
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial empty states (will be populated by API)
const defaultSettings: SiteSettings = {
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
    message: "",
    type: "info"
  }
};

const defaultStory: CompanyStory = {
    foundingYear: "2018",
    intro: "",
    mission: "",
    vision: ""
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [companyStory, setCompanyStory] = useState<CompanyStory>(defaultStory);
  const [strategicPartners, setStrategicPartners] = useState<StrategicPartner[]>([]);
  const [standardPartners, setStandardPartners] = useState<StandardPartner[]>([]);

  // FETCH ALL DATA ON LOAD
  useEffect(() => {
    const fetchAll = async () => {
        try {
            const [p, j, s, t, c, st, sp, std] = await Promise.all([
                fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
                fetch(`${API_BASE_URL}/jobs`).then(r => r.json()),
                fetch(`${API_BASE_URL}/settings`).then(r => r.json()),
                fetch(`${API_BASE_URL}/team`).then(r => r.json()),
                fetch(`${API_BASE_URL}/clients`).then(r => r.json()),
                fetch(`${API_BASE_URL}/story`).then(r => r.json()),
                fetch(`${API_BASE_URL}/partners/strategic`).then(r => r.json()),
                fetch(`${API_BASE_URL}/partners/standard`).then(r => r.json())
            ]);

            setPosts(p);
            setJobs(j);
            if(s.companyName) setSettings(s);
            setTeamMembers(t);
            setClientLogos(c);
            if(st.foundingYear) setCompanyStory(st);
            setStrategicPartners(sp);
            setStandardPartners(std);
        } catch (error) {
            console.error("Failed to fetch data from API (Is server running?)", error);
        }
    };
    fetchAll();
  }, []);

  // --- ACTIONS ---

  const addPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    const date = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric' });
    const payload = { ...post, date };
    try {
        const res = await fetch(`${API_BASE_URL}/posts`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
    } catch (e) { console.error(e); }
  };

  const deletePost = async (id: string) => {
    try {
        await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' });
        setPosts(posts.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const addJob = async (job: Omit<JobPosting, 'id'>) => {
    try {
        const res = await fetch(`${API_BASE_URL}/jobs`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(job) });
        const newJob = await res.json();
        setJobs([newJob, ...jobs]);
    } catch (e) { console.error(e); }
  };

  const deleteJob = async (id: string) => {
    try {
        await fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'DELETE' });
        setJobs(jobs.filter(j => j.id !== id));
    } catch (e) { console.error(e); }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
        await fetch(`${API_BASE_URL}/settings`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newSettings) });
        setSettings(newSettings);
    } catch (e) { console.error(e); }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    try {
        const res = await fetch(`${API_BASE_URL}/team`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(member) });
        const newMember = await res.json();
        setTeamMembers([...teamMembers, newMember]);
    } catch (e) { console.error(e); }
  };

  const deleteTeamMember = async (id: string) => {
    try {
        await fetch(`${API_BASE_URL}/team/${id}`, { method: 'DELETE' });
        setTeamMembers(teamMembers.filter(t => t.id !== id));
    } catch (e) { console.error(e); }
  };

  const addClientLogo = async (client: Omit<ClientLogo, 'id'>) => {
    try {
        const res = await fetch(`${API_BASE_URL}/clients`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(client) });
        const newClient = await res.json();
        setClientLogos([...clientLogos, newClient]);
    } catch (e) { console.error(e); }
  };

  const deleteClientLogo = async (id: string) => {
    try {
        await fetch(`${API_BASE_URL}/clients/${id}`, { method: 'DELETE' });
        setClientLogos(clientLogos.filter(c => c.id !== id));
    } catch (e) { console.error(e); }
  };

  const updateCompanyStory = async (story: CompanyStory) => {
    try {
        await fetch(`${API_BASE_URL}/story`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(story) });
        setCompanyStory(story);
    } catch (e) { console.error(e); }
  };

  const updateStrategicPartner = async (id: string, updatedPartner: StrategicPartner) => {
    try {
        await fetch(`${API_BASE_URL}/partners/strategic/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updatedPartner) });
        setStrategicPartners(strategicPartners.map(p => p.id === id ? updatedPartner : p));
    } catch (e) { console.error(e); }
  };

  const addStandardPartner = async (partner: Omit<StandardPartner, 'id'>) => {
    try {
        const res = await fetch(`${API_BASE_URL}/partners/standard`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(partner) });
        const newPartner = await res.json();
        setStandardPartners([...standardPartners, newPartner]);
    } catch (e) { console.error(e); }
  };

  const deleteStandardPartner = async (id: string) => {
    try {
        await fetch(`${API_BASE_URL}/partners/standard/${id}`, { method: 'DELETE' });
        setStandardPartners(standardPartners.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  return (
    <DataContext.Provider value={{ 
      posts, jobs, settings, teamMembers, companyStory, clientLogos, strategicPartners, standardPartners,
      addPost, deletePost, addJob, deleteJob, updateSettings, 
      addTeamMember, deleteTeamMember, addClientLogo, deleteClientLogo, updateCompanyStory,
      updateStrategicPartner, addStandardPartner, deleteStandardPartner
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