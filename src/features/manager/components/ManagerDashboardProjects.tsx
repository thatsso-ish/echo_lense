import { StatCard } from './StatCard';

import { DashboardProjectCard } from '../../../shared/components/DashboardProjectCard';

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
          <DashboardProjectCard
            key={project.id}
            name={project.name}
            client={project.client?.company}
            startDate={project.startDate}
            deadline={project.deadline}
            progress={project.progress}
            teamSize={project.team.length + 1}
            status={project.status}
            onClick={() => onNavigate('project-detail-view', { projectId: project.id })}
          />
        ))}
      </div>
    </div>
  );
}
