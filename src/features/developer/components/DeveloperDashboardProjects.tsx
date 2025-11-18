import { StatCard } from './StatCard';

import { DashboardProjectCard } from '../../../shared/components/DashboardProjectCard';

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
