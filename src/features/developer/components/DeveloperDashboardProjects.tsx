import { StatCard } from './StatCard';
import { DeveloperProjectCard } from './DeveloperProjectCard';

export function DeveloperDashboardProjects({ projects, tasksCount, onNavigate }: { projects: any[]; tasksCount: any; onNavigate: (page: string) => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Active Projects" value={projects.length.toString()} />
        <StatCard title="Tasks In Progress" value={tasksCount.inProgress.toString()} />
        <StatCard title="Completed This Month" value={tasksCount.done.toString()} />
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <DeveloperProjectCard key={project.id} project={project} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
