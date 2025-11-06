import { useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, Users, Target, FileText, GitBranch, ExternalLink, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { mockProjects, Project, Task } from '../../data/mockProjects';

interface ProjectDetailViewPageProps {
  projectId: string;
  onNavigate: (page: string, data?: any) => void;
}

export function ProjectDetailViewPage({ projectId, onNavigate }: ProjectDetailViewPageProps) {
  const project = mockProjects.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-gray-400">Project not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'team', label: 'Team' },
    { id: 'documents', label: 'Documents' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'milestones', label: 'Milestones' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">{project.name}</h1>
              <p className="text-gray-400">{project.client.company}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              project.status === 'completed' ? 'bg-green-400/10 text-green-400' :
              project.status === 'in-progress' ? 'bg-lime-400/10 text-lime-400' :
              project.status === 'review' ? 'bg-blue-400/10 text-blue-400' :
              'bg-gray-400/10 text-gray-400'
            }`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-lime-400 text-zinc-900'
                    : 'bg-zinc-800 text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab project={project} />}
        {activeTab === 'tasks' && <TasksTab project={project} />}
        {activeTab === 'team' && <TeamTab project={project} />}
        {activeTab === 'documents' && <DocumentsTab project={project} />}
        {activeTab === 'invoices' && <InvoicesTab project={project} />}
        {activeTab === 'milestones' && <MilestonesTab project={project} />}
      </div>
    </div>
  );
}

function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Progress" value={`${project.progress}%`} />
        <StatCard icon={DollarSign} label="Budget" value={`$${(project.budget / 1000).toFixed(0)}K`} />
        <StatCard icon={DollarSign} label="Spent" value={`$${(project.spent / 1000).toFixed(0)}K`} />
        <StatCard icon={Calendar} label="Days Left" value={Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} />
      </div>

      <div className="w-full bg-zinc-900 rounded-full h-3 border border-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-400"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Project Details</h3>
          <div className="space-y-3">
            <DetailRow label="Start Date" value={new Date(project.startDate).toLocaleDateString()} />
            <DetailRow label="Deadline" value={new Date(project.deadline).toLocaleDateString()} />
            <DetailRow label="Budget" value={`$${project.budget.toLocaleString()}`} />
            <DetailRow label="Spent" value={`$${project.spent.toLocaleString()}`} />
            <DetailRow label="Status" value={project.status.replace('-', ' ')} />
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

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Client Information</h3>
          <div className="flex items-start gap-4 mb-4">
            <img src={project.client.avatar} alt={project.client.name} className="w-16 h-16 rounded-full" />
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

      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-medium text-white mb-2">Description</h3>
        <p className="text-gray-400 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}

function TasksTab({ project }: { project: Project }) {
  const tasksByStatus = {
    backlog: project.tasks.filter(t => t.status === 'backlog'),
    todo: project.tasks.filter(t => t.status === 'todo'),
    'in-progress': project.tasks.filter(t => t.status === 'in-progress'),
    review: project.tasks.filter(t => t.status === 'review'),
    done: project.tasks.filter(t => t.status === 'done'),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Task Board</h2>
        <button className="px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TaskColumn title="Backlog" tasks={tasksByStatus.backlog} color="gray" />
        <TaskColumn title="To Do" tasks={tasksByStatus.todo} color="blue" />
        <TaskColumn title="In Progress" tasks={tasksByStatus['in-progress']} color="yellow" />
        <TaskColumn title="Review" tasks={tasksByStatus.review} color="purple" />
        <TaskColumn title="Done" tasks={tasksByStatus.done} color="green" />
      </div>
    </div>
  );
}

function TaskColumn({ title, tasks, color }: { title: string; tasks: Task[]; color: string }) {
  const colorClasses = {
    gray: 'bg-gray-400/10 text-gray-400',
    blue: 'bg-blue-400/10 text-blue-400',
    yellow: 'bg-yellow-400/10 text-yellow-400',
    purple: 'bg-purple-400/10 text-purple-400',
    green: 'bg-green-400/10 text-green-400',
  };

  return (
    <div className="flex flex-col">
      <div className={`flex items-center justify-between p-3 rounded-t-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm">{tasks.length}</span>
      </div>
      <div className="flex-1 p-3 bg-zinc-900 rounded-b-xl border border-zinc-800 border-t-0 space-y-3 min-h-[500px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: 'text-gray-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-lime-400/50 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-white text-sm font-medium">{task.title}</h4>
        <span className={`text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{task.assignee}</span>
        <span className="text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function TeamTab({ project }: { project: Project }) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Project Team</h2>

      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/20">
        <p className="text-sm text-gray-400 mb-3">PROJECT MANAGER</p>
        <div className="flex items-center gap-4">
          <img src={project.manager.avatar} alt={project.manager.name} className="w-16 h-16 rounded-full" />
          <div>
            <p className="text-white text-lg font-medium">{project.manager.name}</p>
            <p className="text-lime-400">{project.manager.role}</p>
            <p className="text-gray-400 text-sm">{project.manager.specialty}</p>
            <p className="text-gray-500 text-sm mt-1">{project.manager.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.team.map((member) => (
          <div key={member.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
            <div className="flex items-start gap-4">
              <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full" />
              <div className="flex-1">
                <p className="text-white font-medium mb-1">{member.name}</p>
                <p className="text-lime-400 text-sm mb-1">{member.role}</p>
                <p className="text-gray-400 text-sm mb-2">{member.specialty}</p>
                <p className="text-gray-500 text-xs">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsTab({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Documents</h2>
        <button className="px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          + Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {project.documents.map((doc) => (
          <div key={doc.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-lime-400/10">
                  <FileText size={24} className="text-lime-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">{doc.name}</p>
                  <p className="text-gray-400 text-sm">
                    {doc.type} • Uploaded by {doc.uploadedBy} on {new Date(doc.uploadedDate).toLocaleDateString()} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors text-sm flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Open
                </a>
                <button className="p-2 rounded-lg bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoicesTab({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Invoices</h2>
        <button className="px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          + Create Invoice
        </button>
      </div>

      <div className="space-y-4">
        {project.invoices.map((invoice) => (
          <div key={invoice.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{invoice.invoiceNumber}</h3>
                <p className="text-gray-400 text-sm">
                  Issued: {new Date(invoice.issueDate).toLocaleDateString()} • Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light text-white mb-2">${invoice.amount.toLocaleString()}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  invoice.status === 'paid' ? 'bg-green-400/10 text-green-400' :
                  invoice.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' :
                  'bg-red-400/10 text-red-400'
                }`}>
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm py-2 border-t border-zinc-800">
                  <span className="text-gray-400">{item.description}</span>
                  <span className="text-white">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                View Invoice
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors text-sm flex items-center justify-center gap-2">
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestonesTab({ project }: { project: Project }) {
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
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-400/20' :
                  milestone.status === 'in-progress' ? 'bg-lime-400/20' :
                  'bg-zinc-800'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : milestone.status === 'in-progress' ? (
                    <Clock size={24} className="text-lime-400" />
                  ) : (
                    <AlertCircle size={24} className="text-gray-500" />
                  )}
                </div>
              </div>

              <div className="flex-1 pb-8">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">{milestone.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      milestone.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                      milestone.status === 'in-progress' ? 'bg-lime-400/10 text-lime-400' :
                      'bg-gray-400/10 text-gray-400'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{milestone.description}</p>

                  {milestone.status !== 'upcoming' && (
                    <>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-medium">{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-400' : 'bg-lime-400'
                          }`}
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Deliverables:</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.deliverables.map((deliverable, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-zinc-800 text-gray-300 text-xs"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
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

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className="text-lime-400" />
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
      <p className="text-2xl font-light text-white">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-zinc-800 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}
