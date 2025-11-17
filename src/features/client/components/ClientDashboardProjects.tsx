import { ClientProjectCard } from './ClientProjectCard';

export function ClientDashboardProjects({ projects, onNavigate }: {
  projects: any[];
  onNavigate: (page: string, data: any) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {projects.map((project) => (
          <ClientProjectCard key={project.id} project={project} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
