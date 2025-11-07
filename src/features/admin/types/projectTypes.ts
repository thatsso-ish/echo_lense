export interface Project {
  id: number;
  name: string;
  client: { company: string };
  manager: { name: string };
  progress: number;
  team: any[];
  budget: number;
  status: 'completed' | 'in-progress' | 'review' | 'pending';
}
