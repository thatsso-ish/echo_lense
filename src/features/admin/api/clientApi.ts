import axios from 'axios';
import { Client } from '../types/clientTypes.ts';

const API_BASE = 'http://localhost:4004/api';

// Create axios instance with credentials and auth token
const clientAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add token to requests
clientAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all clients (users with role 'client')
export const fetchClients = async (): Promise<Client[]> => {
  const res = await clientAxios.get('/users?role=client');
  return res.data;
};

// Get single client
export const fetchClient = async (id: string): Promise<Client> => {
  const res = await clientAxios.get(`/users/${id}`);
  return res.data;
};

// Invite a client
export const inviteClient = async (email: string): Promise<void> => {
  await clientAxios.post('/users/invite', { emails: [email] });
};

