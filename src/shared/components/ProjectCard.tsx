import { Clock, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    cover_image: string | null;
    category: string;
    hours_spent: number | null;
    project_type_detail: string | null;
  };
  tags: string[];
  onClick: () => void;
}

export function ProjectCard({ project, tags, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group block text-left bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-lime-400 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-zinc-700 uppercase">
              {project.title.substring(0, 2)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60" />

        {project.hours_spent && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-sm text-lime-400 text-sm font-medium">
            <Clock size={14} />
            <span>{project.hours_spent}:00</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full border border-lime-400/30 text-lime-400 text-xs font-medium uppercase tracking-wide">
            {project.project_type_detail || project.category}
          </span>
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-zinc-800 text-gray-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-2 text-lime-400 text-sm font-medium group-hover:gap-3 transition-all">
          <span>Discover more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}
