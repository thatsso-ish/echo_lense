import { Plus } from 'lucide-react';
import { mockProjects } from '../../../data/mockProjects';

export function AdminDashboardProjects({ onNavigate }: { onNavigate: (page: string, data?: Record<string, unknown>) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">All Projects</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>
      <div className="space-y-3">
        {mockProjects.map((project) => (
          <div key={project.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all cursor-pointer" onClick={() => onNavigate('project-detail-view', { projectId: project.id })}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-1">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-3">Client: {project.client.company} • Manager: {project.manager.name}</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Progress</p>
                    <p className="text-sm text-white font-medium">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Team</p>
                    <p className="text-sm text-white font-medium">{project.team.length + 1} members</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm text-white font-medium">${(project.budget / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                project.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                project.status === 'in-progress' ? 'bg-lime-400/10 text-lime-400' :
                project.status === 'review' ? 'bg-blue-400/10 text-blue-400' :
                'bg-gray-400/10 text-gray-400'
              }`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
