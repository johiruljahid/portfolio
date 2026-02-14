
import React from 'react';
import { Project, Experience, Skill, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web App",
    description: "A full-stack commerce solution built with React and Node.js.",
    longDescription: "This high-performance E-Commerce platform features real-time inventory tracking, a secure Stripe-integrated checkout flow, and a custom-built administrative dashboard for product management. Optimized for speed and mobile responsiveness.",
    techStack: ["React", "Node.js", "Tailwind CSS", "Stripe API", "Redux"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "AI Dashboard",
    category: "UI Design",
    description: "Modern analytical dashboard with real-time data visualization.",
    longDescription: "A comprehensive data visualization suite designed for enterprise-level analytics. It includes dynamic charting using Recharts, dark-mode optimized aesthetics, and an intuitive layout that handles massive datasets with ease.",
    techStack: ["React", "Framer Motion", "Recharts", "TypeScript"],
    image: "https://images.unsplash.com/photo-1551288049-bb8c803er?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Social Connect",
    category: "Mobile App",
    description: "Connect with professionals across the globe seamlessly.",
    longDescription: "A cross-platform mobile experience focused on professional networking. Features include real-time messaging using Socket.io, AI-driven professional matching, and an encrypted profile storage system.",
    techStack: ["React Native", "Firebase", "Socket.io", "GraphQL"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Task Master",
    category: "Productivity",
    description: "A minimalist task management tool for agile teams.",
    longDescription: "Designed for developers, Task Master removes the clutter of traditional tools. It supports Kanban boards, time-tracking extensions, and deep integration with Git platforms for automated status updates.",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    id: 5,
    title: "Crypto Wallet",
    category: "Web3",
    description: "Secure and fast cryptocurrency management interface.",
    longDescription: "A decentralized wallet interface that allows users to manage multiple chains (Ethereum, Polygon, Solana) from a single view. Includes real-time gas fee estimation and secure private key management.",
    techStack: ["Web3.js", "React", "Ethers.js", "Solidify"],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    id: 6,
    title: "Health Tracker",
    category: "Healthcare",
    description: "IoT integrated fitness and health monitoring system.",
    longDescription: "A modern healthcare dashboard that syncs with wearable devices to provide real-time heart rate, sleep quality, and daily activity metrics. Features customized health goal setting and trend analysis.",
    techStack: ["TypeScript", "AWS IoT", "React", "Chart.js"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Giant Inc.",
    period: "2021 - Present",
    description: "Leading the UI/UX team in developing scalable design systems and high-performance React applications."
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "StartUp Hub",
    period: "2019 - 2021",
    description: "Built microservices and responsive web interfaces for a rapidly growing SaaS platform."
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Creative Agency",
    period: "2017 - 2019",
    description: "Developed custom WordPress themes and static landing pages for diverse client portfolios."
  }
];

export const SKILLS: Skill[] = [
  { name: "React", percentage: 95, icon: "⚛️" },
  { name: "TypeScript", percentage: 90, icon: "📘" },
  { name: "Tailwind CSS", percentage: 95, icon: "🎨" },
  { name: "Node.js", percentage: 85, icon: "🟢" },
  { name: "UI/UX Design", percentage: 88, icon: "✨" },
  { name: "Next.js", percentage: 92, icon: "🚀" }
];

export const SERVICES: Service[] = [
  {
    title: "Web Development",
    description: "Building fast, responsive, and SEO-optimized websites using modern frameworks like React and Next.js.",
    icon: "code"
  },
  {
    title: "Graphic Design",
    description: "Creating visually stunning brand identities, logos, and digital marketing materials that resonate.",
    icon: "pen"
  },
  {
    title: "Digital Marketing",
    description: "Driving growth through targeted social media campaigns, content strategy, and data-driven insights.",
    icon: "chart"
  }
];
