
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const getBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api';
  }
  return '/api';
};

const getSocketUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  return window.location.origin;
};

const API_BASE_URL = getBaseUrl();

export interface BlogPost { id: string; title: string; excerpt: string; content: string; category: string; author: string; date: string; imageUrl: string; }
export interface JobPosting { id: string; title: string; location: string; type: string; summary: string; }
export interface TeamMember { id: string; name: string; role: string; bio: string; imageUrl: string; linkedinUrl?: string; quote?: string; }
export interface ClientLogo { id: string; name: string; logoUrl: string; }
export interface CompanyStory { foundingYear: string; intro: string; mission: string; vision: string; }
export interface SiteSettings {
  companyName: string; logoUrl: string; phone: string; email: string; address: string; city: string; linkedinUrl: string; facebookUrl: string;
  announcement: { active: boolean; message: string; type: 'info' | 'warning' | 'danger'; };
}
export interface StrategicPartner { id: string; name: string; role: string; description: string; logoUrl: string; badgeText: string; themeColor: 'blue' | 'purple' | 'cyan' | 'green'; }
export interface StandardPartner { id: string; name: string; category: string; description: string; logoUrl: string; }
export interface SystemStatusItem { id: string; category: 'cloud' | 'voip' | 'security'; name: string; status: 'operational' | 'degraded' | 'down'; uptime: string; note?: string; }
export interface IncidentItem { id: string; date: string; title?: string; message: string; severity: 'good' | 'warning' | 'critical'; }

interface DataContextType {
  posts: BlogPost[]; jobs: JobPosting[]; settings: SiteSettings; teamMembers: TeamMember[]; clientLogos: ClientLogo[]; companyStory: CompanyStory; strategicPartners: StrategicPartner[]; standardPartners: StandardPartner[];
  systemStatus: SystemStatusItem[]; incidents: IncidentItem[];
  isQuizOpen: boolean; openQuiz: () => void; closeQuiz: () => void;
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>; updatePost: (id: string, post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>; deletePost: (id: string) => Promise<void>;
  addJob: (job: Omit<JobPosting, 'id'>) => Promise<void>; updateJob: (id: string, job: Omit<JobPosting, 'id'>) => Promise<void>; deleteJob: (id: string) => Promise<void>;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>; updateTeamMember: (id: string, member: Omit<TeamMember, 'id'>) => Promise<void>; deleteTeamMember: (id: string) => Promise<void>;
  addClientLogo: (client: Omit<ClientLogo, 'id'>) => Promise<void>; deleteClientLogo: (id: string) => Promise<void>;
  updateCompanyStory: (story: CompanyStory) => Promise<void>;
  updateStrategicPartner: (id: string, partner: StrategicPartner) => Promise<void>;
  addStandardPartner: (partner: Omit<StandardPartner, 'id'>) => Promise<void>; deleteStandardPartner: (id: string) => Promise<void>;
  updateSystemStatus: (id: string, status: 'operational' | 'degraded' | 'down', note?: string) => Promise<void>;
  addIncident: (incident: Omit<IncidentItem, 'id'>) => Promise<void>; deleteIncident: (id: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: "GROUPE NOVITEC", logoUrl: "", phone: "514-360-1757", email: "support@novitec.ca", address: "3361 avenue de la Gare, Suite 122", city: "Mascouche, Qc, J7K 3C1", linkedinUrl: "#", facebookUrl: "#",
    announcement: { active: false, message: "", type: "info" }
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [companyStory, setCompanyStory] = useState<CompanyStory>({ foundingYear: "2018", intro: "", mission: "", vision: "" });
  const [strategicPartners, setStrategicPartners] = useState<StrategicPartner[]>([]);
  const [standardPartners, setStandardPartners] = useState<StandardPartner[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatusItem[]>([]);
  const [incidents, setIncidents] = useState<IncidentItem[]>([]);

  const fetchAll = async () => {
    try {
      const endpoints = [
        'posts', 'jobs', 'settings', 'team', 'clients', 'story', 
        'partners/strategic', 'partners/standard', 'status', 'incidents'
      ];
      const responses = await Promise.all(
        endpoints.map(e => 
          fetch(`${API_BASE_URL}/${e}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      );
      
      if(responses[0]) setPosts(responses[0]);
      if(responses[1]) setJobs(responses[1]);
      if(responses[2]) setSettings(responses[2]);
      if(responses[3]) setTeamMembers(responses[3]);
      if(responses[4]) setClientLogos(responses[4]);
      if(responses[5]) setCompanyStory(responses[5]);
      if(responses[6]) setStrategicPartners(responses[6]);
      if(responses[7]) setStandardPartners(responses[7]);
      if(responses[8]) setSystemStatus(responses[8]);
      if(responses[9]) setIncidents(responses[9]);
    } catch (e) { 
      console.error("Fetch Error:", e);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // Socket.IO pour synchronisation temps réel
  useEffect(() => {
    const socket: Socket = io(getSocketUrl(), {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('🔌 Connected to real-time sync');
    });

    // Écouter les événements de mise à jour en temps réel
    socket.on('settings:updated', () => fetchAll());
    socket.on('posts:created', () => fetchAll());
    socket.on('posts:updated', () => fetchAll());
    socket.on('posts:deleted', () => fetchAll());
    socket.on('jobs:created', () => fetchAll());
    socket.on('jobs:deleted', () => fetchAll());
    socket.on('team:created', () => fetchAll());
    socket.on('team:deleted', () => fetchAll());
    socket.on('clients:created', () => fetchAll());
    socket.on('clients:deleted', () => fetchAll());
    socket.on('partners:updated', () => fetchAll());
    socket.on('partners:created', () => fetchAll());
    socket.on('partners:deleted', () => fetchAll());
    socket.on('status:updated', () => fetchAll());
    socket.on('incidents:created', () => fetchAll());
    socket.on('incidents:deleted', () => fetchAll());

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from real-time sync');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Helper pour obtenir le token d'authentification
  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const addPost = async (post: any) => {
    await fetch(`${API_BASE_URL}/posts`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(post) });
    await fetchAll();
  };
  const updatePost = async (id: string, post: any) => {
    await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(post) });
    await fetchAll();
  };
  const deletePost = async (id: string) => {
    await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };
  const addJob = async (job: any) => {
    await fetch(`${API_BASE_URL}/jobs`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(job) });
    await fetchAll();
  };
  const updateJob = async (id: string, job: any) => {
    await fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(job) });
    await fetchAll();
  };
  const deleteJob = async (id: string) => {
    await fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };
  const updateSettings = async (newSettings: SiteSettings) => {
    await fetch(`${API_BASE_URL}/settings`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(newSettings) });
    await fetchAll();
  };
  const updateCompanyStory = async (story: CompanyStory) => {
    // Note: l'API story n'était pas implémentée, on l'ajoute ou on utilise settings si besoin. Ici on assume l'existence du endpoint.
    await fetch(`${API_BASE_URL}/story`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(story) });
    await fetchAll();
  };
  const addTeamMember = async (member: any) => {
    await fetch(`${API_BASE_URL}/team`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(member) });
    await fetchAll();
  };
  const updateTeamMember = async (id: string, member: any) => {
    await fetch(`${API_BASE_URL}/team/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(member) });
    await fetchAll();
  };
  const deleteTeamMember = async (id: string) => {
    await fetch(`${API_BASE_URL}/team/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };
  const addClientLogo = async (client: any) => {
    await fetch(`${API_BASE_URL}/clients`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(client) });
    await fetchAll();
  };
  const deleteClientLogo = async (id: string) => {
    await fetch(`${API_BASE_URL}/clients/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };
  const updateStrategicPartner = async (id: string, partner: StrategicPartner) => {
    await fetch(`${API_BASE_URL}/partners/strategic/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(partner) });
    await fetchAll();
  };
  const addStandardPartner = async (partner: any) => {
    await fetch(`${API_BASE_URL}/partners/standard`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(partner) });
    await fetchAll();
  };
  const deleteStandardPartner = async (id: string) => {
    await fetch(`${API_BASE_URL}/partners/standard/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };
  const updateSystemStatus = async (id: string, status: string, note?: string) => {
    await fetch(`${API_BASE_URL}/status/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ status, note }) });
    await fetchAll();
  };
  const addIncident = async (incident: any) => {
    await fetch(`${API_BASE_URL}/incidents`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(incident) });
    await fetchAll();
  };
  const deleteIncident = async (id: string) => {
    await fetch(`${API_BASE_URL}/incidents/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    await fetchAll();
  };

  return (
    <DataContext.Provider value={{
      posts, jobs, settings, teamMembers, companyStory, clientLogos, strategicPartners, standardPartners,
      systemStatus, incidents, isQuizOpen, openQuiz, closeQuiz,
      addPost, updatePost, deletePost, addJob, updateJob, deleteJob, updateSettings,
      addTeamMember, updateTeamMember, deleteTeamMember, addClientLogo, deleteClientLogo, updateCompanyStory,
      updateStrategicPartner, addStandardPartner, deleteStandardPartner,
      updateSystemStatus, addIncident, deleteIncident,
      refreshAll: fetchAll
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
