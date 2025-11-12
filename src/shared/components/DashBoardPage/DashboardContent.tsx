import { AdminDashboard } from '../../../features/admin/pages/AdminDashboard';
import { AdminProvider } from '../../../features/admin/contexts/AdminContext';
import { ManagerDashboard } from '../../../features/manager/pages/ManagerDashboard';
import { DeveloperDashboard } from '../../../features/developer/pages/DeveloperDashboard';
import { ClientDashboard } from '../../../features/client/components/ClientDashboard';

export function DashboardContent({ role, onNavigate, displayName, activeView }: any) {
  return (
    <div className="ml-64 flex-1 p-8">
      {role === 'admin' && (
        <AdminProvider>
          <AdminDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />
        </AdminProvider>
      )}
      {role === 'manager' && <ManagerDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
      {(role === 'developer' || role === 'creative') && <DeveloperDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
      {role === 'client' && <ClientDashboard onNavigate={onNavigate} displayName={displayName} activeView={activeView} />}
    </div>
  );
}
