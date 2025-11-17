import { Briefcase, Plus } from 'lucide-react';

export function ManagerDashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-400">
          <Briefcase size={24} className="text-zinc-900" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">
            Manager <span className="font-semibold text-lime-400">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-400">Manage projects and teams</p>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
        <Plus size={18} />
        <span>New Project</span>
      </button>
    </div>
  );
}
