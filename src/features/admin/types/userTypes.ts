export interface User {
  id: string;
  name: string;
  email: string;
  role?: string; // "admin" | "user"
  createdAt?: string;
}
