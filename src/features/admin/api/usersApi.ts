import axios from 'axios';
import { User } from '../types/userTypes';

const API_BASE = 'http://localhost:4004/api';

// Create axios instance with credentials and auth token
const usersAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add token to requests
usersAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchUsers = async (): Promise<User[]> => {
  const res = await usersAxios.get('/users');
  return res.data;
};

export const fetchUser = async (id: string): Promise<User> => {
  const res = await usersAxios.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const res = await usersAxios.put(`/users/${id}`, data);
  return res.data;
};

export const deactivateUser = async (id: string): Promise<void> => {
  await usersAxios.patch(`/users/${id}/deactivate`);
};

export const reactivateUser = async (id: string): Promise<void> => {
  await usersAxios.patch(`/users/${id}/reactivate`);
};

export const deleteUser = async (id: string): Promise<void> => {
  await usersAxios.delete(`/users/${id}`);
};

export const inviteUsers = async (emails: string[]): Promise<void> => {
  await usersAxios.post('/users/invite', { emails });
};

export const resendInvite = async (id: string): Promise<void> => {
  await usersAxios.post(`/users/${id}/resend-invite`);
};

