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

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-zinc-800 last:border-0">
      <div className="w-2 h-2 rounded-full bg-lime-400 mt-2" />
      <div className="flex-1">
        <p className="text-sm text-gray-300">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function HealthMetric({ label, status, percentage }: { label: string; status: string; percentage: number }) {
  const statusColor = status === 'Operational' ? 'text-green-400' : status === 'Warning' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className={`text-xs ${statusColor}`}>{status}</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${status === 'Operational' ? 'bg-green-400' : status === 'Warning' ? 'bg-yellow-400' : 'bg-red-400'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
