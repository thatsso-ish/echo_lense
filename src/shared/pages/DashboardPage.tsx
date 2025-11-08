import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/features/auth/contexts/AuthContext';

import { LogOut, LayoutDashboard, Target, Users, User, FileText, Settings, Activity } from 'lucide-react';
import { AdminDashboard } from '../../../src/features/developer/pages/AdminDashboard';
import { ManagerDashboard } from '../../../src/features/developer/pages/ManagerDashboard';
import { DeveloperDashboard } from '../../../src/features/developer/pages/DeveloperDashboard';
import { ClientDashboard } from '../../../src/features/developer/pages/ClientDashboard';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  pageData?: any;
}

export function DashboardPage({ onNavigate, pageData }: DashboardPageProps) {
  const { user, profile, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    if (!user) {
      setDemoMode(true);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400" />
      </div>
    );
  }

  const previewRole = pageData?.previewRole || 'manager';
  const role = demoMode ? previewRole : (profile?.role || 'manager');
  const displayName = demoMode ? `${previewRole.charAt(0).toUpperCase() + previewRole.slice(1)} Preview` : (profile?.full_name || profile?.email || 'User');

  const getMenuItems = () => {
    const commonItems = [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'projects', label: 'Projects', icon: Target },
    ];

    if (role === 'admin') {
      return [
        ...commonItems,
        { id: 'users', label: 'All Users', icon: Users },
        { id: 'clients', label: 'All Clients', icon: User },
        { id: 'logs', label: 'System Logs', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (role === 'manager') {
      return [
        ...commonItems,
        { id: 'team', label: 'Team', icon: Users },
        { id: 'activity', label: 'Activity', icon: Activity },
      ];
    }

    if (role === 'developer' || role === 'creative') {
      return [
        ...commonItems,
        { id: 'tasks', label: 'My Tasks', icon: FileText },
      ];
    }

    if (role === 'client') {
      return [
        ...commonItems,
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'documents', label: 'Documents', icon: FileText },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-light text-white hover:text-lime-400 transition-colors"
          >
            <span className="font-medium">creative</span>hub
          </button>
          <p className="text-sm text-gray-500 mt-2">
            {displayName}
          </p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-medium capitalize">
            {role} {demoMode && '(Preview)'}
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-lime-400 text-zinc-900'
                    : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => {
              if (!demoMode) signOut();
              onNavigate('home');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">{demoMode ? 'Exit Preview' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      <div className="ml-64 flex-1 p-8">
        {role === 'admin' && <AdminDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
        {role === 'manager' && <ManagerDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
        {(role === 'developer' || role === 'creative') && <DeveloperDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
        {role === 'client' && <ClientDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
      </div>
    </div>
  );
}
