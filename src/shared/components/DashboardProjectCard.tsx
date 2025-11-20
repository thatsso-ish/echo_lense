import { ReactNode } from 'react';

export interface DashboardProjectCardProps {
  name: string;
  client?: string;
  manager?: string;
  startDate?: string;
  deadline?: string;
  progress?: number;
  teamSize?: number;
  status: string;
  budget?: number;
  children?: ReactNode;
  onClick?: () => void;
  extra?: ReactNode;
}

export function DashboardProjectCard({ name, client, manager, startDate, deadline, progress, teamSize, status, budget, children, onClick, extra }: DashboardProjectCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">{name}</h3>
          {client && <p className="text-sm text-gray-400">Client: {client}{manager ? ` • Manager: ${manager}` : ''}</p>}
          {startDate && <p className="text-sm text-gray-400">Started: {new Date(startDate).toLocaleDateString()}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          status === 'completed' ? 'bg-green-400/10 text-green-400' :
          status === 'in-progress' ? 'bg-lime-400/10 text-lime-400' :
          status === 'review' ? 'bg-blue-400/10 text-blue-400' :
          'bg-gray-400/10 text-gray-400'
        }`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {progress !== undefined && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Progress</p>
            <p className="text-sm text-white font-medium">{progress}%</p>
          </div>
        )}
        {teamSize !== undefined && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Team Size</p>
            <p className="text-sm text-white font-medium">{teamSize} members</p>
          </div>
        )}
        {deadline && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Deadline</p>
            <p className="text-sm text-white font-medium">{new Date(deadline).toLocaleDateString()}</p>
          </div>
        )}
        {budget !== undefined && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="text-sm text-white font-medium">${(budget / 1000).toFixed(0)}K</p>
          </div>
        )}
      </div>
      {children}
      {extra}
    </div>
  );
}
