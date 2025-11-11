import axios from 'axios';
import { User } from '../types/userTypes';

const API_BASE = '/api/admin';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};
