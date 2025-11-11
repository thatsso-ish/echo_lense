import { Shield, Users, Code, Briefcase } from 'lucide-react';

export const dashboardsData = [
  {
    role: 'admin',
    title: 'Admin Dashboard',
    description: 'Full system access - manage all projects, users, clients, logs, and settings',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
  },
  {
    role: 'manager',
    title: 'Manager Dashboard',
    description: 'Manage projects, assign teams, track milestones, and oversee client communications',
    icon: Briefcase,
    color: 'from-lime-400 to-emerald-400',
  },
  {
    role: 'developer',
    title: 'Developer/Creative Dashboard',
    description: 'View assigned projects, manage tasks, access repos, and track your contributions',
    icon: Code,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    role: 'client',
    title: 'Client Dashboard',
    description: 'Track your projects, view milestones, manage invoices, and access documents',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
];
