import { FullProject } from "../../types/ProjectDetailPage/types";

export default function AboutSection({ project }: { project: FullProject }) {
  if (!project.content) return null;

  return (
    <div>
      <h2 className="text-3xl font-light text-white mb-4 flex items-center gap-3">
        <span className="text-lime-400">About</span> the Project
      </h2>

      <div
        className="text-gray-300 leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </div>
  );
}
