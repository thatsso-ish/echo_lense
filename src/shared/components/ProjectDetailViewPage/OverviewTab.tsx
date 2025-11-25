import { Calendar, DollarSign, Target, ExternalLink, GitBranch } from "lucide-react";
import { Project } from "../../../data/mockProjects";
import StatCard from "./StatCard";
import DetailRow from "./DetailRow";

export default function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Progress" value={`${project.progress}%`} />
        <StatCard icon={DollarSign} label="Budget" value={`$${(project.budget / 1000).toFixed(0)}K`} />
        <StatCard icon={DollarSign} label="Spent" value={`$${(project.spent / 1000).toFixed(0)}K`} />
        <StatCard
          icon={Calendar}
          label="Days Left"
          value={Math.ceil(
            (new Date(project.deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 rounded-full h-3 border border-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-400"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      {/* Details + Client */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Info */}
        <div className="p-6 rounded-2xl bg-zinc-900 border-zinc-800 border">
          <h3 className="text-lg font-medium text-white mb-4">Project Details</h3>

          <div className="space-y-3">
            <DetailRow label="Start Date" value={new Date(project.startDate).toLocaleDateString()} />
            <DetailRow label="Deadline" value={new Date(project.deadline).toLocaleDateString()} />
            <DetailRow label="Budget" value={`$${project.budget.toLocaleString()}`} />
            <DetailRow label="Spent" value={`$${project.spent.toLocaleString()}`} />
            <DetailRow label="Status" value={project.status.replace("-", " ")} />
          </div>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors"
            >
              <GitBranch size={16} />
              <span className="text-sm">View Repository</span>
              <ExternalLink size={14} />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-sm">View Live Site</span>
            </a>
          )}
        </div>

        {/* Client */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Client Information</h3>

          <div className="flex items-start gap-4 mb-4">
            <img src={project.client.avatar} className="w-16 h-16 rounded-full" />
            <div>
              <p className="text-white font-medium">{project.client.name}</p>
              <p className="text-gray-400 text-sm">{project.client.company}</p>
            </div>
          </div>

          <div className="space-y-2">
            <DetailRow label="Email" value={project.client.email} />
            <DetailRow label="Phone" value={project.client.phone} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-medium text-white mb-2">Description</h3>
        <p className="text-gray-400 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}
