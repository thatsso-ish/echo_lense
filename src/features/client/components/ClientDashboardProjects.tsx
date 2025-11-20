
import { DashboardProjectCard } from '../../../shared/components/DashboardProjectCard';

export function ClientDashboardProjects({ projects, onNavigate }: {
  projects: any[];
  onNavigate: (page: string, data: any) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
