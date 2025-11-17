import { Calendar } from 'lucide-react';

export function ClientProjectCard({ project, onNavigate }: {
  project: any;
  onNavigate: (page: string, data: any) => void;
}) {
  return (
    <div
      className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400">Started: {new Date(project.startDate).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          project.status === 'completed'
            ? 'bg-green-400/10 text-green-400'
            : 'bg-lime-400/10 text-lime-400'
        }`}>
          {project.status.replace('-', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Progress</p>
          <p className="text-sm text-white font-medium">{project.progress}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Team Size</p>
          <p className="text-sm text-white font-medium">{project.team.length + 1} members</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Est. Completion</p>
          <p className="text-sm text-white font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
        </div>
      </div>

      {project.status !== 'completed' && (
        <>
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          {project.milestones.find((m: any) => m.status === 'in-progress') && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-lime-400/5 border border-lime-400/20 mb-4">
              <Calendar size={16} className="text-lime-400" />
              <div className="flex-1">
                <p className="text-sm text-white">{project.milestones.find((m: any) => m.status === 'in-progress')?.name}</p>
                <p className="text-xs text-gray-400">Due: {new Date(project.milestones.find((m: any) => m.status === 'in-progress')?.endDate || '').toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </>
      )}

      <button
        onClick={() => onNavigate('project-detail-view', { projectId: project.id })}
        className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-medium"
      >
        View Project Details →
      </button>
    </div>
  );
}
