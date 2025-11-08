export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
  items: { description: string; amount: number }[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  deliverables: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: {
    name: string;
    company: string;
    email: string;
    phone: string;
    avatar: string;
  };
  manager: TeamMember;
  team: TeamMember[];
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  startDate: string;
  deadline: string;
  budget: number;
  spent: number;
  repoUrl?: string;
  liveUrl?: string;
  tasks: Task[];
  documents: Document[];
  invoices: Invoice[];
  milestones: Milestone[];
}

export const mockProjects : Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A comprehensive e-commerce platform with modern features including product catalog, shopping cart, checkout process, payment integration, user authentication, order management, and admin dashboard. Built with React, Node.js, and PostgreSQL.',
    client: {
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john.smith@acmecorp.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    manager: {
      id: 'm1',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      specialty: 'Agile & Scrum',
      avatar: 'https://i.pravatar.cc/150?img=47',
      email: 'sarah.j@creativehub.com',
    },
    team: [
      {
        id: 't1',
        name: 'Alex Chen',
        role: 'Lead Frontend Developer',
        specialty: 'React & TypeScript',
        avatar: 'https://i.pravatar.cc/150?img=33',
        email: 'alex.c@creativehub.com',
      },
      {
        id: 't2',
        name: 'Maria Garcia',
        role: 'Backend Developer',
        specialty: 'Node.js & PostgreSQL',
        avatar: 'https://i.pravatar.cc/150?img=44',
        email: 'maria.g@creativehub.com',
      },
      {
        id: 't3',
        name: 'James Wilson',
        role: 'UI/UX Designer',
        specialty: 'Product Design',
        avatar: 'https://i.pravatar.cc/150?img=15',
        email: 'james.w@creativehub.com',
      },
      {
        id: 't4',
        name: 'Lisa Anderson',
        role: 'QA Engineer',
        specialty: 'Test Automation',
        avatar: 'https://i.pravatar.cc/150?img=38',
        email: 'lisa.a@creativehub.com',
      },
    ],
    status: 'in-progress',
    progress: 65,
    startDate: '2025-10-01',
    deadline: '2025-12-15',
    budget: 125000,
    spent: 81250,
    repoUrl: 'https://github.com/creativehub/ecommerce-platform',
    liveUrl: 'https://staging.acme-store.com',
    tasks: [
      {
        id: 'task1',
        title: 'Design product detail page',
        description: 'Create wireframes and high-fidelity mockups for product detail page',
        assignee: 'James Wilson',
        status: 'done',
        priority: 'high',
        dueDate: '2025-10-15',
      },
      {
        id: 'task2',
        title: 'Implement shopping cart functionality',
        description: 'Build shopping cart with add/remove items, quantity updates',
        assignee: 'Alex Chen',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2025-11-10',
      },
      {
        id: 'task3',
        title: 'Setup payment gateway integration',
        description: 'Integrate Stripe payment processing',
        assignee: 'Maria Garcia',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2025-11-15',
      },
      {
        id: 'task4',
        title: 'Create order management API',
        description: 'Build REST API endpoints for order management',
        assignee: 'Maria Garcia',
        status: 'review',
        priority: 'medium',
        dueDate: '2025-11-05',
      },
      {
        id: 'task5',
        title: 'Implement user authentication',
        description: 'Setup JWT-based authentication system',
        assignee: 'Maria Garcia',
        status: 'done',
        priority: 'high',
        dueDate: '2025-10-20',
      },
      {
        id: 'task6',
        title: 'Write automated tests',
        description: 'Create end-to-end tests for checkout flow',
        assignee: 'Lisa Anderson',
        status: 'todo',
        priority: 'medium',
        dueDate: '2025-11-20',
      },
      {
        id: 'task7',
        title: 'Optimize product images',
        description: 'Implement lazy loading and image optimization',
        assignee: 'Alex Chen',
        status: 'todo',
        priority: 'low',
        dueDate: '2025-11-25',
      },
      {
        id: 'task8',
        title: 'Design checkout flow',
        description: 'Create multi-step checkout process design',
        assignee: 'James Wilson',
        status: 'backlog',
        priority: 'high',
        dueDate: '2025-11-08',
      },
    ],
    documents: [
      {
        id: 'doc1',
        name: 'Project Requirements',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/1234567890/edit',
        uploadedBy: 'Sarah Johnson',
        uploadedDate: '2025-10-01',
        size: '2.4 MB',
      },
      {
        id: 'doc2',
        name: 'Technical Specifications',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/0987654321/edit',
        uploadedBy: 'Alex Chen',
        uploadedDate: '2025-10-05',
        size: '3.1 MB',
      },
      {
        id: 'doc3',
        name: 'Design System',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/1122334455/edit',
        uploadedBy: 'James Wilson',
        uploadedDate: '2025-10-08',
        size: '5.2 MB',
      },
      {
        id: 'doc4',
        name: 'API Documentation',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/5544332211/edit',
        uploadedBy: 'Maria Garcia',
        uploadedDate: '2025-10-15',
        size: '1.8 MB',
      },
    ],
    invoices: [
      {
        id: 'inv1',
        invoiceNumber: 'INV-1024',
        amount: 31250,
        status: 'paid',
        dueDate: '2025-10-31',
        issueDate: '2025-10-15',
        items: [
          { description: 'Initial Development - Sprint 1', amount: 31250 },
        ],
      },
      {
        id: 'inv2',
        invoiceNumber: 'INV-1025',
        amount: 31250,
        status: 'paid',
        dueDate: '2025-11-15',
        issueDate: '2025-11-01',
        items: [
          { description: 'Development - Sprint 2', amount: 31250 },
        ],
      },
      {
        id: 'inv3',
        invoiceNumber: 'INV-1026',
        amount: 31250,
        status: 'pending',
        dueDate: '2025-11-30',
        issueDate: '2025-11-15',
        items: [
          { description: 'Development - Sprint 3', amount: 31250 },
        ],
      },
    ],
    milestones: [
      {
        id: 'ms1',
        name: 'Sprint 1: Foundation',
        description: 'Setup project infrastructure, database schema, authentication',
        startDate: '2025-10-01',
        endDate: '2025-10-20',
        status: 'completed',
        progress: 100,
        deliverables: ['Project setup', 'Database schema', 'User authentication', 'Basic UI components'],
      },
      {
        id: 'ms2',
        name: 'Sprint 2: Core Features',
        description: 'Product catalog, shopping cart, checkout flow',
        startDate: '2025-10-21',
        endDate: '2025-11-15',
        status: 'in-progress',
        progress: 70,
        deliverables: ['Product catalog', 'Shopping cart', 'Payment integration', 'Order management'],
      },
      {
        id: 'ms3',
        name: 'Sprint 3: Polish & Testing',
        description: 'UI refinements, testing, performance optimization',
        startDate: '2025-11-16',
        endDate: '2025-12-05',
        status: 'upcoming',
        progress: 0,
        deliverables: ['UI polish', 'Automated tests', 'Performance optimization', 'Bug fixes'],
      },
      {
        id: 'ms4',
        name: 'Sprint 4: Launch',
        description: 'Final testing, deployment, documentation',
        startDate: '2025-12-06',
        endDate: '2025-12-15',
        status: 'upcoming',
        progress: 0,
        deliverables: ['Final testing', 'Production deployment', 'User documentation', 'Handoff'],
      },
    ],
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    description: 'A secure mobile banking application for iOS and Android with features including account management, fund transfers, bill payments, transaction history, budgeting tools, and biometric authentication.',
    client: {
      name: 'Emily Davis',
      company: 'FinTech Solutions',
      email: 'emily.davis@fintechsolutions.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    manager: {
      id: 'm2',
      name: 'Michael Brown',
      role: 'Senior Project Manager',
      specialty: 'Mobile Development',
      avatar: 'https://i.pravatar.cc/150?img=14',
      email: 'michael.b@creativehub.com',
    },
    team: [
      {
        id: 't5',
        name: 'Rachel Kim',
        role: 'iOS Developer',
        specialty: 'Swift & SwiftUI',
        avatar: 'https://i.pravatar.cc/150?img=28',
        email: 'rachel.k@creativehub.com',
      },
      {
        id: 't6',
        name: 'David Martinez',
        role: 'Android Developer',
        specialty: 'Kotlin & Jetpack',
        avatar: 'https://i.pravatar.cc/150?img=52',
        email: 'david.m@creativehub.com',
      },
      {
        id: 't7',
        name: 'Sophie Turner',
        role: 'Mobile Designer',
        specialty: 'Mobile UX',
        avatar: 'https://i.pravatar.cc/150?img=31',
        email: 'sophie.t@creativehub.com',
      },
    ],
    status: 'in-progress',
    progress: 40,
    startDate: '2025-09-15',
    deadline: '2025-11-30',
    budget: 180000,
    spent: 72000,
    repoUrl: 'https://github.com/creativehub/banking-app',
    tasks: [
      {
        id: 'task9',
        title: 'Implement biometric authentication',
        description: 'Add Face ID and Touch ID support',
        assignee: 'Rachel Kim',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2025-11-08',
      },
      {
        id: 'task10',
        title: 'Build transaction history UI',
        description: 'Create transaction list with filtering',
        assignee: 'David Martinez',
        status: 'todo',
        priority: 'medium',
        dueDate: '2025-11-12',
      },
    ],
    documents: [
      {
        id: 'doc5',
        name: 'Security Guidelines',
        type: 'Google Docs',
        url: 'https://docs.google.com/document/d/2233445566/edit',
        uploadedBy: 'Michael Brown',
        uploadedDate: '2025-09-15',
        size: '1.5 MB',
      },
    ],
    invoices: [
      {
        id: 'inv4',
        invoiceNumber: 'INV-1027',
        amount: 45000,
        status: 'paid',
        dueDate: '2025-10-15',
        issueDate: '2025-10-01',
        items: [
          { description: 'Phase 1: Discovery & Design', amount: 45000 },
        ],
      },
    ],
    milestones: [
      {
        id: 'ms5',
        name: 'Phase 1: Design & Architecture',
        description: 'App design and technical architecture',
        startDate: '2025-09-15',
        endDate: '2025-10-05',
        status: 'completed',
        progress: 100,
        deliverables: ['App designs', 'Technical architecture', 'Security protocols'],
      },
      {
        id: 'ms6',
        name: 'Phase 2: Core Development',
        description: 'Build core banking features',
        startDate: '2025-10-06',
        endDate: '2025-11-10',
        status: 'in-progress',
        progress: 45,
        deliverables: ['Account management', 'Fund transfers', 'Bill payments'],
      },
    ],
  },
];
