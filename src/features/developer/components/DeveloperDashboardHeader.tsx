import { Code } from 'lucide-react';

export function DeveloperDashboardHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
        <Code size={24} className="text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-light text-white">
          Developer <span className="font-semibold text-lime-400">Dashboard</span>
        </h2>
        <p className="text-sm text-gray-400">Your projects and tasks</p>
      </div>
    </div>
  );
}
