import { StatCard } from './StatCard';

export function DeveloperDashboardOverview({ projects, tasksCount }: { projects: any[]; tasksCount: any }) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Projects" value={projects.length.toString()} />
        <StatCard title="Tasks In Progress" value={tasksCount.inProgress.toString()} />
        <StatCard title="Completed This Month" value={tasksCount.done.toString()} />
      </div>
    </div>
  );
}
