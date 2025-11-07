import { Shield } from 'lucide-react';
import { useAdminContext } from '../contexts/AdminContext';

import { StatCard } from '../components/StatCard';
import { ActivityItem } from '../components/ActivityItem';
import { HealthMetric } from '../components/HealthMetric';

import { mockUsers, mockClients } from '../../../data/mockData';
import { mockProjects } from '../../../data/mockProjects';

export function AdminDashboard({
  onNavigate,
  displayName,
}: {
  onNavigate: (page: string) => void;
  displayName: string;
}) {
  const { activeView } = useAdminContext();

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
          <Shield size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">
            Admin <span className="font-semibold text-lime-400">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-400">Full system access</p>
        </div>
      </div>

      {activeView === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Projects" value={mockProjects.length.toString()} color="from-blue-500 to-cyan-400" />
            <StatCard title="Active Users" value={mockUsers.length.toString()} color="from-green-500 to-emerald-400" />
            <StatCard title="Total Clients" value={mockClients.length.toString()} color="from-purple-500 to-pink-500" />
            <StatCard title="Revenue (MTD)" value="$45.2K" color="from-orange-500 to-red-500" />
          </div>
        </div>
      )}
    </>
  );
}
