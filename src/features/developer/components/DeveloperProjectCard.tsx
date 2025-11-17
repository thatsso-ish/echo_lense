import { GitBranch } from 'lucide-react';

export function DeveloperProjectCard({ project, onNavigate }: { project: any; onNavigate: (page: string) => void }) {
  return (
    <div
      className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400">Client: {project.client.company}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs font-medium capitalize">
          {project.status.replace('-', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-zinc-800">
          <p className="text-xs text-gray-500 mb-1">To Do</p>
          <p className="text-lg text-white font-medium">
            {project.tasks.filter((t: any) => t.status === 'todo').length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800">
          <p className="text-xs text-gray-500 mb-1">In Progress</p>
          <p className="text-lg text-white font-medium">
            {project.tasks.filter((t: any) => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800">
          <p className="text-xs text-gray-500 mb-1">Done</p>
          <p className="text-lg text-white font-medium">
            {project.tasks.filter((t: any) => t.status === 'done').length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
        <button
          onClick={() => onNavigate('project-detail-view')}
          className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-medium"
        >
          View Project Details →
        </button>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <GitBranch size={14} />
            <span>Repository</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Live Preview →
          </a>
        )}
      </div>
    </div>
  );
}
