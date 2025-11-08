export interface ClientProject {
  id: string;
  name: string;
  startDate: string;
  deadline: string;
  status: string;
  progress: number;
  team: any[];
  spent: number;
  milestones: {
    name: string;
    status: string;
    endDate: string;
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: string;
    issueDate: string;
  }[];
}

export interface ClientDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  displayName: string;
  activeView: string;
}

export interface StatCardProps {
  title: string;
  value: string;
}