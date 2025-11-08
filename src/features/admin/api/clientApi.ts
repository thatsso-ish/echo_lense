import axios from 'axios';
import { Client } from '../types/clientTypes.ts';

const API_BASE = '/api/admin';

export const fetchClients = async (): Promise<Client[]> => {
  const res = await axios.get(`${API_BASE}/clients`);
  return res.data;
};
