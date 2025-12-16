export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceTier {
  name: string;
  price?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface JobPosting {
  title: string;
  location: string;
  type: string;
  summary: string;
}