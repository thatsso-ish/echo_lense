import { Users, Target, DollarSign, FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { mockProjects } from '../../../data/mockProjects';

interface ClientDashboardProps {
  onNavigate: (page: string) => void;
  displayName: string;
  activeView: string;
}

export function ClientDashboard({ onNavigate, displayName, activeView }: ClientDashboardProps) {


  const projects = mockProjects;
  const activeProjects = projects.filter(p => p.status === 'in-progress');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const totalInvestment = projects.reduce((sum, p) => sum + p.spent, 0);

  const allInvoices = projects.flatMap(p => p.invoices.map(inv => ({
    ...inv,
    projectName: p.name
  })));

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Users size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-light text-white">
            Client <span className="font-semibold text-lime-400">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-400">Track your projects and deliverables</p>
        </div>
      </div>


      {activeView === 'overview' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Active Projects" value={activeProjects.length.toString()} />
            <StatCard title="Completed Projects" value={completedProjects.length.toString()} />
            <StatCard title="Total Investment" value={`$${(totalInvestment / 1000).toFixed(1)}K`} />
          </div>
        </div>
      )}

      {activeView === 'projects' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Active Projects" value={activeProjects.length.toString()} />
            <StatCard title="Completed Projects" value={completedProjects.length.toString()} />
            <StatCard title="Total Investment" value={`$${(totalInvestment / 1000).toFixed(1)}K`} />
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

                    {project.milestones.find(m => m.status === 'in-progress') && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-lime-400/5 border border-lime-400/20 mb-4">
                        <Calendar size={16} className="text-lime-400" />
                        <div className="flex-1">
                          <p className="text-sm text-white">{project.milestones.find(m => m.status === 'in-progress')?.name}</p>
                          <p className="text-xs text-gray-400">Due: {new Date(project.milestones.find(m => m.status === 'in-progress')?.endDate || '').toLocaleDateString()}</p>
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
            ))}
          </div>
        </div>
      )}

      {activeView === 'milestones' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Project Milestones</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Milestone timeline coming soon...</p>
          </div>
        </div>
      )}

      {activeView === 'invoices' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Invoices</h2>
          <div className="space-y-3">
            {allInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-zinc-800">
                    <DollarSign size={20} className="text-lime-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-400">{invoice.projectName}</p>
                    <p className="text-xs text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl text-white font-light">${invoice.amount.toLocaleString()}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'paid'
                      ? 'bg-green-400/10 text-green-400'
                      : 'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {invoice.status.toUpperCase()}
                  </span>
                  <button className="text-sm text-lime-400 hover:text-lime-300 transition-colors">
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'documents' && (
        <div>
          <h2 className="text-2xl font-light text-white mb-6">Documents</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <p className="text-gray-400 text-center py-8">Document library coming soon...</p>
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
