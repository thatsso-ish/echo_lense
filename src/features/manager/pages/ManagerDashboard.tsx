import { useState } from 'react';
import { Briefcase, Target, Users, DollarSign, Plus, Calendar } from 'lucide-react';
import { mockProjects } from '../../../data/mockProjects';

interface ManagerDashboardProps {
  onNavigate: (page: string) => void;
  displayName: string;
  activeView: string;
}

export function ManagerDashboard({ onNavigate, displayName, activeView }: ManagerDashboardProps) {


  const projects = mockProjects;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-400">
            <Briefcase size={24} className="text-zinc-900" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-white">
              Manager <span className="font-semibold text-lime-400">Dashboard</span>
            </h2>
            <p className="text-sm text-gray-400">Manage projects and teams</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>


      {activeView === 'overview' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Active Projects" value={projects.filter(p => p.status === 'in-progress').length.toString()} />
            <StatCard title="Total Projects" value={projects.length.toString()} />
            <StatCard title="Pending Tasks" value={projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'todo').length, 0).toString()} />
          </div>
        </div>
      )}

      {activeView === 'projects' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Active Projects" value={projects.filter(p => p.status === 'in-progress').length.toString()} />
            <StatCard title="Total Projects" value={projects.length.toString()} />
            <StatCard title="Pending Tasks" value={projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'todo').length, 0).toString()} />
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">Client: {project.client.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-medium capitalize">
                    {project.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Progress</p>
                    <p className="text-sm text-white font-medium">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Team Size</p>
                    <p className="text-sm text-white font-medium">{project.team.length + 1} members</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="text-sm text-white font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <button
                  onClick={() => onNavigate('project-detail-view', { projectId: project.id })}
                  className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-medium"
                >
                  View Project Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'team' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Team Management</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Team management interface coming soon...</p>
          </div>
        </div>
      )}

      {activeView === 'activity' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Recent Activity</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Activity timeline coming soon...</p>
          </div>
        </div>
      )}

      {activeView === 'calendar' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Project Calendar</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Calendar view coming soon...</p>
          </div>
        </div>
      )}

      {activeView === 'invoices' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Invoices</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Invoice management coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
  );
}
