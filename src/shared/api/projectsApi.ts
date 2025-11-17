import axios from 'axios';

const API_BASE = 'http://localhost:4004/api';

const publicProjectsAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export const publicProjectsApi = {
  // Get project by slug (public endpoint)
  getBySlug: async (slug: string) => {
    const res = await publicProjectsAxios.get(`/projects/slug/${slug}`);
    return res.data;
  },

  // Get all published projects
  getAll: async () => {
    const res = await publicProjectsAxios.get('/projects');
    return res.data;
  },
};
