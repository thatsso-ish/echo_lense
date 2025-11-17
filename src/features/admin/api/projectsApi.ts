import axios from 'axios';
import { Project } from '../types/projectTypes';

const API_BASE = 'http://localhost:4004/api';

// Create axios instance with credentials and auth token
const projectsAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add token to requests
projectsAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all projects
export const fetchProjects = async (): Promise<Project[]> => {
  const res = await projectsAxios.get('/projects');
  return res.data;
};

// Get single project by ID
export const fetchProject = async (id: string): Promise<Project> => {
  const res = await projectsAxios.get(`/projects/${id}`);
  return res.data;
};

// Get project by slug (public)
export const fetchProjectBySlug = async (slug: string) => {
  const res = await projectsAxios.get(`/projects/slug/${slug}`);
  return res.data;
};

// Create project
export const createProject = async (data: Partial<Project>): Promise<Project> => {
  const res = await projectsAxios.post('/projects', data);
  return res.data;
};

// Update project
export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  const res = await projectsAxios.put(`/projects/${id}`, data);
  return res.data;
};

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await projectsAxios.delete(`/projects/${id}`);
};

