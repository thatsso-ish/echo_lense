
import { mockProjects } from '../../../data/mockProjects';
import { DeveloperDashboardHeader } from '../components/DeveloperDashboardHeader';
import { DeveloperDashboardOverview } from '../components/DeveloperDashboardOverview';
import { DeveloperDashboardProjects } from '../components/DeveloperDashboardProjects';
import { DeveloperDashboardTasks } from '../components/DeveloperDashboardTasks';
import { DeveloperDashboardRepos } from '../components/DeveloperDashboardRepos';

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
      <DeveloperDashboardHeader />

      {activeView === 'overview' && (
        <DeveloperDashboardOverview projects={projects} tasksCount={tasksCount} />
      )}

      {activeView === 'projects' && (
        <DeveloperDashboardProjects projects={projects} tasksCount={tasksCount} onNavigate={onNavigate} />
      )}

      {activeView === 'tasks' && <DeveloperDashboardTasks />}

      {activeView === 'repos' && <DeveloperDashboardRepos />}
    </>
  );
}
