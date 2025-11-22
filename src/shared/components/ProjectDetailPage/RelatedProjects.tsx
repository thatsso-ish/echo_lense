import { FullProject } from "../../types/ProjectDetailPage/types";
import { ProjectCard } from "../../components/ProjectCard";

export default function RelatedProjects({
  projects,
  onNavigate,
}: {
  projects: FullProject[];
  onNavigate: (page: string, data?: any) => void;
}) {
  if (!projects.length) return null;

  return (
    <div className="border-t border-zinc-800 pt-16 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-light text-white mb-8">
        <span className="text-lime-400">Similar</span> Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            tags={p.tags || []}
            onClick={() => onNavigate("project-detail", { slug: p.slug })}
          />
        ))}
      </div>
    </div>
  );
}
