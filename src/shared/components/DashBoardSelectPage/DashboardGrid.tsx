import { DashboardCard } from './DashboardCard';

interface DashboardGridProps {
  dashboards: any[];
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardGrid({ dashboards, onNavigate }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dashboards.map((dashboard) => (
        <DashboardCard
          key={dashboard.role}
          dashboard={dashboard}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
