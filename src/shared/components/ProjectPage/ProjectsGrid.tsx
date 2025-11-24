import { ProjectCard } from "../ProjectCard";

export function ProjectsGrid({ projects, onNavigate }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          project={project}
          tags={project.tags}
          onClick={() => onNavigate('project-detail', { slug: project.slug })}
        />
      ))}
    </div>
  );
}
