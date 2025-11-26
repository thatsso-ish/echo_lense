import { Clock, Users } from "lucide-react";
import { FullProject } from "../../types/ProjectDetailPage/types";

export default function InfoGrid({ project }: { project: FullProject }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {project.projectTypeDetail && (
        <div>
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Type of Project</p>
          <p className="text-white font-medium">{project.projectTypeDetail}</p>
        </div>
      )}

      {project.industry && (
        <div>
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Industry</p>
          <p className="text-white font-medium">{project.industry}</p>
        </div>
      )}

      {project.hoursSpent && (
        <div>
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Hours Spent</p>
          <p className="text-white font-medium flex items-center gap-2">
            <Clock size={16} className="text-lime-400" />
            {project.hoursSpent}:00 hours
          </p>
        </div>
      )}

      {project.teamSize && (
        <div>
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Team Size</p>
          <p className="text-white font-medium flex items-center gap-2">
            <Users size={16} className="text-lime-400" />
            {project.teamSize} {project.teamSize === 1 ? "person" : "people"}
          </p>
        </div>
      )}
    </div>
  );
}
