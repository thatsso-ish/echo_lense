import { Code, GitBranch } from 'lucide-react';
import { mockProjects } from '../../../data/mockProjects';
import { StatCard } from '../components/StatCard';

interface DeveloperDashboardProps {
  onNavigate: (page: string) => void;
  displayName: string;
  activeView: string;
}

export function DeveloperDashboard({ onNavigate, displayName, activeView }: DeveloperDashboardProps) {
  const projects = mockProjects;

  const tasksCount = {
    todo: projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'todo').length, 0),
    inProgress: projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'in-progress').length, 0),
    done: projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0),
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
          <Code size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">
            Developer <span className="font-semibold text-lime-400">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-400">Your projects and tasks</p>
        </div>
      </div>

      {activeView === 'overview' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Active Projects" value={projects.length.toString()} />
            <StatCard title="Tasks In Progress" value={tasksCount.inProgress.toString()} />
            <StatCard title="Completed This Month" value={tasksCount.done.toString()} />
          </div>
        </div>
      )}

      {activeView === 'projects' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Active Projects" value={projects.length.toString()} />
            <StatCard title="Tasks In Progress" value={tasksCount.inProgress.toString()} />
            <StatCard title="Completed This Month" value={tasksCount.done.toString()} />
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
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
                      {project.tasks.filter(t => t.status === 'todo').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800">
                    <p className="text-xs text-gray-500 mb-1">In Progress</p>
                    <p className="text-lg text-white font-medium">
                      {project.tasks.filter(t => t.status === 'in-progress').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800">
                    <p className="text-xs text-gray-500 mb-1">Done</p>
                    <p className="text-lg text-white font-medium">
                      {project.tasks.filter(t => t.status === 'done').length}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => onNavigate('project-detail-view')}
                    className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-medium"
                  >
                    View Project Details →
                  </button>s
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
            ))}
          </div>
        </div>
      )}

      {activeView === 'tasks' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">My Tasks</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Task board coming soon...</p>
          </div>
        </div>
      )}

      {activeView === 'repos' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Repositories</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Repository list coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
}
