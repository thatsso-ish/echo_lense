import { Users } from 'lucide-react';

export function ClientDashboardHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
        <Users size={24} className="text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-light text-white">
          Client <span className="font-semibold text-lime-400">Dashboard</span>
        </h2>
        <p className="text-sm text-gray-400">Track your projects and deliverables</p>
      </div>
    </div>
  );
}
