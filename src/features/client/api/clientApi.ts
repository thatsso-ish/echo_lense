import { supabase } from '../../../lib/supabase';
import { ClientProject } from '../types';

export async function getClientProjects(clientId: string): Promise<ClientProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getProjectMilestones(projectId: string) {
  const { data, error } = await supabase
    .from('project_milestones')
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getProjectInvoices(projectId: string) {
  const { data, error } = await supabase
    .from('project_invoices')
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getClientDocuments(clientId: string) {
  const { data, error } = await supabase
    .from('client_documents')
    .select('*')
    .eq('client_id', clientId);

  if (error) {
    throw error;
  }

  return data;
}