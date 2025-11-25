import { Target } from "lucide-react";
import { FullProject } from "../../types/ProjectDetailPage/types";
export default function CaseStudySection({ project }: { project: FullProject }) {
  if (!project.caseStudy) return null;

  return (
    <div>
      <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
        <Target className="text-lime-400" size={32} />
        <span>Case Study</span>
      </h2>

      <div className="p-8 rounded-2xl bg-linear-to-br from-lime-400/5 to-emerald-400/5 border border-lime-400/20">
        <p className="text-gray-300 whitespace-pre-wrap">{project.caseStudy}</p>
      </div>
    </div>
  );
}
