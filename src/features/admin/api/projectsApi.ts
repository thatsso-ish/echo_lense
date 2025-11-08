import axios from 'axios';
import { Project } from '../types/projectTypes';

const API_BASE = '/api/admin';

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await axios.get(`${API_BASE}/projects`);
  return res.data;
};
