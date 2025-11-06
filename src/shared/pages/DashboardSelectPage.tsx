import { Shield, Users, Code, Briefcase } from 'lucide-react';

interface DashboardSelectPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardSelectPage({ onNavigate }: DashboardSelectPageProps) {
  const dashboards = [
    {
      role: 'admin',
      title: 'Admin Dashboard',
      description: 'Full system access - manage all projects, users, clients, logs, and settings',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
    },
    {
      role: 'manager',
      title: 'Manager Dashboard',
      description: 'Manage projects, assign teams, track milestones, and oversee client communications',
      icon: Briefcase,
      color: 'from-lime-400 to-emerald-400',
    },
    {
      role: 'developer',
      title: 'Developer/Creative Dashboard',
      description: 'View assigned projects, manage tasks, access repos, and track your contributions',
      icon: Code,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      role: 'client',
      title: 'Client Dashboard',
      description: 'Track your projects, view milestones, manage invoices, and access documents',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-4">
            Choose <span className="font-semibold text-lime-400">Dashboard View</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Preview different dashboard experiences based on user roles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon;
            return (
              <button
                key={dashboard.role}
                onClick={() => onNavigate('dashboard', { previewRole: dashboard.role })}
                className="group relative p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all hover:scale-105 transform text-left"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity ${dashboard.color}`} />

                <div className="relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${dashboard.color} mb-4`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-light text-white mb-3">
                    {dashboard.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {dashboard.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-lime-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Preview Dashboard</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
