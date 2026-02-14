
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  link: string;
  github?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}
