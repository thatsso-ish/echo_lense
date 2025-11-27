import { LayoutDashboard, Target, Users, User, FileText, Settings, Activity, UserCircle } from 'lucide-react';

export const getMenuItems = (role: string) => {
  const commonItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Target },
  ];

  switch (role) {
    case 'admin':
      return [
        ...commonItems,
        { id: 'users', label: 'All Users', icon: Users },
        { id: 'clients', label: 'All Clients', icon: User },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'logs', label: 'System Logs', icon: FileText },
        { id: 'account', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'manager':
      return [
        ...commonItems,
        { id: 'team', label: 'Team', icon: Users },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'account', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'developer':
    case 'creative':
      return [
        ...commonItems,
        { id: 'tasks', label: 'My Tasks', icon: FileText },
        { id: 'account', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'client':
      return [
        ...commonItems,
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'account', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    default:
      return [
        ...commonItems,
        { id: 'account', label: 'Profile', icon: UserCircle },
      ];
  }
};