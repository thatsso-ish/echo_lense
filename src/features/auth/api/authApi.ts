import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    permissions: string[];
  };
  token: string;
}

interface ProfileResponse {
  id: string;
  email: string;
  fullName: string;
  role: string;
  permissions: string[];
  avatar?: string;
  bio?: string;
}

// Create axios instance with credentials
const authAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add token to requests if available
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: async (
    email: string,
    password: string,
    fullName: string
  ): Promise<AuthResponse> => {
    const res = await authAxios.post('/auth/register', {
      email,
      password,
      fullName,
    });
    if (res.data.token) {
      localStorage.setItem('authToken', res.data.token);
    }
    return res.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await authAxios.post('/auth/login', {
      email,
      password,
    });
    if (res.data.token) {
      localStorage.setItem('authToken', res.data.token);
    }
    return res.data;
  },

  logout: async (): Promise<void> => {
    await authAxios.post('/auth/logout');
    localStorage.removeItem('authToken');
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const res = await authAxios.get('/auth/profile');
    return res.data;
  },

  updateProfile: async (data: Partial<ProfileResponse>): Promise<ProfileResponse> => {
    const res = await authAxios.put('/auth/profile', data);
    return res.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const res = await authAxios.post('/auth/refresh');
    if (res.data.token) {
      localStorage.setItem('authToken', res.data.token);
    }
    return res.data;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await authAxios.post('/auth/verify-email', { token });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await authAxios.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await authAxios.post('/auth/reset-password', { token, password });
  },
};
