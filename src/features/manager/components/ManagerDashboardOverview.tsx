import { StatCard } from './StatCard';

export function ManagerDashboardOverview({ projects }: { projects: any[] }) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Projects" value={projects.filter((p: any) => p.status === 'in-progress').length.toString()} />
        <StatCard title="Total Projects" value={projects.length.toString()} />
        <StatCard title="Pending Tasks" value={projects.reduce((sum: number, p: any) => sum + p.tasks.filter((t: any) => t.status === 'todo').length, 0).toString()} />
      </div>
    </div>
  );
}
