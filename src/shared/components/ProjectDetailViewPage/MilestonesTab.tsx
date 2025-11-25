import { Project } from "../../../data/mockProjects";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function MilestonesTab({ project }: { project: Project }) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Project Milestones</h2>

      <div className="space-y-6">
        {project.milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {index !== project.milestones.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-zinc-800" />
            )}

            <div className="flex gap-6">
              {/* Icon */}
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    milestone.status === "completed"
                      ? "bg-green-400/20"
                      : milestone.status === "in-progress"
                      ? "bg-lime-400/20"
                      : "bg-zinc-800"
                  }`}
                >
                  {milestone.status === "completed" ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock size={24} className="text-lime-400" />
                  ) : (
                    <AlertCircle size={24} className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-8">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">
                        {milestone.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(milestone.startDate).toLocaleDateString()} -{" "}
                        {new Date(milestone.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        milestone.status === "completed"
                          ? "bg-green-400/10 text-green-400"
                          : milestone.status === "in-progress"
                          ? "bg-lime-400/10 text-lime-400"
                          : "bg-gray-400/10 text-gray-400"
                      }`}
                    >
                      {milestone.status.replace("-", " ")}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{milestone.description}</p>

                  {/* Progress bar */}
                  {milestone.status !== "upcoming" && (
                    <>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-medium">
                          {milestone.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${
                            milestone.status === "completed"
                              ? "bg-green-400"
                              : "bg-lime-400"
                          }`}
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </>
                  )}

                  {/* Deliverables */}
                  <p className="text-sm text-gray-400 mb-2">Deliverables:</p>

                  <div className="flex flex-wrap gap-2">
                    {milestone.deliverables.map((d, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-zinc-800 text-gray-300 text-xs"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
