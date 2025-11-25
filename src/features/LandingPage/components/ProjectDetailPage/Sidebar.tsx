import { ExternalLink, Github, FileText } from "lucide-react";
import { FullProject } from "../../types/ProjectDetailPage/types";
import {TechnologyBadge} from "./TechnologyBadge";

export default function Sidebar({ project }: { project: FullProject }) {
  const groupedTech = (project.technologies || []).reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-6 sticky top-24">
      {/* Technologies */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Apps</h3>

        <div className="flex flex-wrap gap-2">
          {Object.entries(groupedTech).map(([category, techs]) =>
            techs.map((tech, i) => <TechnologyBadge key={`${category}-${i}`} text={tech} />)
          )}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-3">
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white transition-all"
          >
            <span className="font-medium">Visit website</span>
            <ExternalLink size={20} />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-white"
          >
            <span className="font-medium">View on GitHub</span>
            <Github size={20} />
          </a>
        )}

        {project.designFilesUrl && (
          <a
            href={project.designFilesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-white"
          >
            <span className="font-medium">Design Files</span>
            <FileText size={20} />
          </a>
        )}
      </div>

      {/* Tags */}
     {project.tags && project.tags.length > 0 && (
  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
      Tags
    </h3>

    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1.5 rounded-full bg-zinc-800 text-gray-400 text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)}


      {/* Client / Date */}
      {(project.clientName || project.completionDate) && (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-sm">
          {project.clientName && (
            <div>
              <p className="text-gray-500 mb-1">Client</p>
              <p className="text-white font-medium">{project.clientName}</p>
            </div>
          )}

          {project.completionDate && (
            <div>
              <p className="text-gray-500 mb-1">Completed</p>
              <p className="text-white font-medium">
                {new Date(project.completionDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
