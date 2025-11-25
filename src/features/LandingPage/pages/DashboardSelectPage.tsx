import { DashboardGrid } from '../components/DashBoardSelectPage/DashboardGrid';
import { DashboardHeader } from '../components/DashBoardSelectPage//DashboardHeader';
import { dashboardsData } from '../../../shared/constants/DashBoardData/dashboardsData';

interface DashboardSelectPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardSelectPage({ onNavigate }: DashboardSelectPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader />

        <DashboardGrid dashboards={dashboardsData} onNavigate={onNavigate} />

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
