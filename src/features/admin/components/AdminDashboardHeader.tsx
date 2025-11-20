import { Shield } from 'lucide-react';

export function AdminDashboardHeader() {
  return (
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
  );
}
