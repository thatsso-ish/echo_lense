import { useState, useEffect } from 'react';
import { getClientProjects, getProjectMilestones, getProjectInvoices } from '../api/clientApi';
import { ClientProject } from '../types';

export function useClientData(clientId: string) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const projectsData = await getClientProjects(clientId);
        
        // Fetch milestones and invoices for each project
        const projectsWithDetails = await Promise.all(
          projectsData.map(async (project) => {
            const [milestones, invoices] = await Promise.all([
              getProjectMilestones(project.id),
              getProjectInvoices(project.id)
            ]);

            return {
              ...project,
              milestones,
              invoices
            };
          })
        );

        setProjects(projectsWithDetails);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [clientId]);

  return {
    loading,
    projects,
    error,
    activeProjects: projects.filter(p => p.status === 'in-progress'),
    completedProjects: projects.filter(p => p.status === 'completed'),
    totalInvestment: projects.reduce((sum, p) => sum + p.spent, 0)
  };
}