import { FullProject } from "../../types/ProjectDetailPage/types";

export default function GallerySection({ project }: { project: FullProject }) {
  if (!project.images || project.images.length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-light text-white mb-6">Project Gallery</h2>

      {project.images.map((img, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <img src={img} alt={project.title} className="w-full" />
        </div>
      ))}
    </div>
  );
}
