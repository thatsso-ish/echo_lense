import { Shield, Mail, Phone, Plus } from 'lucide-react';
import { useAdminContext } from '../contexts/AdminContext';

import { StatCard } from '../components/StatCard';
import { ActivityItem } from '../components/ActivityItem';
import { HealthMetric } from '../components/HealthMetric';

import { mockUsers, mockClients } from '../../../data/mockData';
import { mockProjects } from '../../../data/mockProjects';

interface AdminDashboardProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  displayName: string;
  activeView: string;
}

export function AdminDashboard({ onNavigate, displayName, activeView }: AdminDashboardProps) {
  const { activeView: contextActiveView } = useAdminContext();
  const view = activeView || contextActiveView;

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
          <Shield size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">
            Admin <span className="font-semibold text-lime-400">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-400">Full system access</p>
        </div>
      </div>

      {view === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Projects" value="24" color="from-blue-500 to-cyan-400" />
            <StatCard title="Active Users" value="156" color="from-green-500 to-emerald-400" />
            <StatCard title="Total Clients" value="18" color="from-purple-500 to-pink-500" />
            <StatCard title="Revenue (MTD)" value="$45.2K" color="from-orange-500 to-red-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <ActivityItem text="New project created: E-commerce Platform" time="2 hours ago" />
                <ActivityItem text="User Sarah Chen joined as Developer" time="5 hours ago" />
                <ActivityItem text="Invoice #1024 generated for Acme Corp" time="1 day ago" />
                <ActivityItem text="Milestone completed: Mobile App Beta" time="2 days ago" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-lg font-medium text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <HealthMetric label="Database" status="Operational" percentage={98} />
                <HealthMetric label="API Services" status="Operational" percentage={100} />
                <HealthMetric label="Storage" status="Warning" percentage={85} />
                <HealthMetric label="Backup Systems" status="Operational" percentage={100} />
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'projects' && (
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
      )}

      {view === 'users' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white">All Users</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
              <Plus size={18} />
              <span>Add User</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
                <div className="flex items-start gap-4">
                  <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium">{user.name}</h3>
                        <p className="text-lime-400 text-sm">{user.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{user.specialty}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{user.userRole}</span>
                      <span>•</span>
                      <span>{user.projectsCount} projects</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'clients' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white">All Clients</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
              <Plus size={18} />
              <span>Add Client</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockClients.map((client) => (
              <div key={client.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
                <div className="flex items-start gap-4">
                  <img src={client.avatar} alt={client.name} className="w-14 h-14 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium">{client.name}</h3>
                        <p className="text-lime-400 text-sm">{client.company}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <Mail size={12} />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Phone size={12} />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <p className="text-gray-500">Projects</p>
                        <p className="text-white font-medium">{client.projectsCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Spent</p>
                        <p className="text-white font-medium">${(client.totalSpent / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'logs' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">System Logs</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">System logs viewer coming soon...</p>
          </div>
        </div>
      )}

      {view === 'settings' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">System Settings</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">System configuration coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
}
