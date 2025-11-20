
import { useAdminContext } from '../contexts/AdminContext';
import { AdminDashboardHeader } from '../components/AdminDashboardHeader';
import { AdminDashboardOverview } from '../components/AdminDashboardOverview';
import { AdminDashboardProjects } from '../components/AdminDashboardProjects';
import { AdminDashboardUsers } from '../components/AdminDashboardUsers';
import { AdminDashboardClients } from '../components/AdminDashboardClients';
import { AdminDashboardLogs } from '../components/AdminDashboardLogs';
import { AdminDashboardSettings } from '../components/AdminDashboardSettings';

interface AdminDashboardProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  displayName: string;
  activeView: string;
}

export function AdminDashboard({ onNavigate, displayName, activeView }: AdminDashboardProps) {
  const { activeView: contextActiveView } = useAdminContext();
  const view = activeView || contextActiveView;

  return (
    <>
      <AdminDashboardHeader />

      {view === 'overview' && <AdminDashboardOverview />}

      {view === 'projects' && <AdminDashboardProjects onNavigate={onNavigate} />}

      {view === 'users' && <AdminDashboardUsers />}

      {view === 'clients' && <AdminDashboardClients />}

      {view === 'logs' && <AdminDashboardLogs />}

      {view === 'settings' && <AdminDashboardSettings />}
    </>
  );
}
