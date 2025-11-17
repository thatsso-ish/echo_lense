import { StatCard } from './StatCard';
import { ManagerProjectCard } from './ManagerProjectCard';

export function ManagerDashboardProjects({ projects, onNavigate }: { projects: any[]; onNavigate: (page: string, params: any) => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Active Projects" value={projects.filter((p: any) => p.status === 'in-progress').length.toString()} />
        <StatCard title="Total Projects" value={projects.length.toString()} />
        <StatCard title="Pending Tasks" value={projects.reduce((sum: number, p: any) => sum + p.tasks.filter((t: any) => t.status === 'todo').length, 0).toString()} />
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <ManagerProjectCard key={project.id} project={project} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
