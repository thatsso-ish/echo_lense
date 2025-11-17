import { StatCard } from './StatCard';

export function ClientDashboardOverview({ activeProjects, completedProjects, totalInvestment }: {
  activeProjects: number;
  completedProjects: number;
  totalInvestment: number;
}) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Projects" value={activeProjects.toString()} />
        <StatCard title="Completed Projects" value={completedProjects.toString()} />
        <StatCard title="Total Investment" value={`$${(totalInvestment / 1000).toFixed(1)}K`} />
      </div>
    </div>
  );
}
