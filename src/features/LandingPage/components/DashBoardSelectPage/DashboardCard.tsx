interface DashboardCardProps {
  dashboard: {
    role: string;
    title: string;
    description: string;
    icon: any;
    color: string;
  };
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardCard({ dashboard, onNavigate }: DashboardCardProps) {
  const Icon = dashboard.icon;

  return (
    <button
      onClick={() => onNavigate('dashboard', { previewRole: dashboard.role })}
      className="group relative p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all hover:scale-105 transform text-left"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity ${dashboard.color}`}
      />

      <div className="relative">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${dashboard.color} mb-4`}>
          <Icon size={32} className="text-white" />
        </div>

        <h3 className="text-2xl font-light text-white mb-3">{dashboard.title}</h3>

        <p className="text-gray-400 leading-relaxed">{dashboard.description}</p>

        <div className="mt-6 flex items-center gap-2 text-lime-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Preview Dashboard</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </button>
  );
}
