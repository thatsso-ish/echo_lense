import { TrendingUp } from "lucide-react";
import { FullProject } from "../../types/ProjectDetailPage/types";

export default function ResultsSection({ project }: { project: FullProject }) {
  if (!project.results) return null;

  return (
    <div>
      <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
        <TrendingUp size={32} className="text-lime-400" />
        <span>Results & Impact</span>
      </h2>

      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
        <p className="text-gray-300 whitespace-pre-wrap">{project.results}</p>
      </div>
    </div>
  );
}
