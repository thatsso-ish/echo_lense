import { mockProjects } from '../../../data/mockProjects';
import { ManagerDashboardHeader } from '../components/ManagerDashboardHeader';
import { ManagerDashboardOverview } from '../components/ManagerDashboardOverview';
import { ManagerDashboardProjects } from '../components/ManagerDashboardProjects';
import { ManagerDashboardTeam } from '../components/ManagerDashboardTeam';
import { ManagerDashboardActivity } from '../components/ManagerDashboardActivity';
import { ManagerDashboardCalendar } from '../components/ManagerDashboardCalendar';
import { ManagerDashboardInvoices } from '../components/ManagerDashboardInvoices';

interface ManagerDashboardProps {
  onNavigate: (page: string, params?: any) => void;
  displayName: string;
  activeView: string;
}

export function ManagerDashboard({ onNavigate, activeView }: ManagerDashboardProps) {
  const projects = mockProjects;

  return (
    <>
      <ManagerDashboardHeader />

      {activeView === 'overview' && <ManagerDashboardOverview projects={projects} />}

      {activeView === 'projects' && <ManagerDashboardProjects projects={projects} onNavigate={onNavigate} />}

      {activeView === 'team' && <ManagerDashboardTeam />}

      {activeView === 'activity' && <ManagerDashboardActivity />}

      {activeView === 'calendar' && <ManagerDashboardCalendar />}

      {activeView === 'invoices' && <ManagerDashboardInvoices />}
    </>
  );
}


