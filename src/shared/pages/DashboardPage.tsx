import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/features/auth/contexts/AuthContext';
import { Sidebar } from '../../shared/components/DashBoardPage/Sidebar';
import { LoadingScreen } from '../../shared/components/DashBoardPage/LoadingScreen';
import { getMenuItems } from '../../shared/utils/DashBoardPage/getMenuItems';
import { DashboardContent } from '../../shared/components/DashBoardPage/DashboardContent';

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
    if (!user) setDemoMode(true);
    setLoading(false);
  }, [user]);

  if (loading) return <LoadingScreen />;

  const previewRole = pageData?.previewRole || 'manager';
  const role = demoMode ? previewRole : (profile?.role || 'manager');
  const displayName = demoMode
    ? `${previewRole.charAt(0).toUpperCase() + previewRole.slice(1)} Preview`
    : (profile?.full_name || profile?.email || 'User');

  const menuItems = getMenuItems(role);

  const handleSignOut = () => {
    if (!demoMode) signOut();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <Sidebar
        role={role}
        displayName={displayName}
        demoMode={demoMode}
        menuItems={menuItems}
        activeView={activeView}
        setActiveView={setActiveView}
        onSignOut={handleSignOut}
        onNavigate={onNavigate}
      />

      <DashboardContent
        role={role}
        onNavigate={onNavigate}
        displayName={displayName}
        activeView={activeView}
      />
    </div>
  );
}
