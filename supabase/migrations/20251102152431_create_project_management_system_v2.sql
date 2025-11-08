/*
  # Project Management System Schema

  ## Overview
  Complete project management system for clients, managers, and developers/creatives.
  Includes milestones, tasks, sprints, invoices, documents, and notifications.

  ## New Tables
  All tables with proper RLS policies for role-based access control.
*/

-- Client Projects
CREATE TABLE IF NOT EXISTS client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'on-hold', 'completed', 'cancelled')),
  start_date date,
  end_date date,
  budget numeric(10,2),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, client_id)
);

-- Project Team (create before policies that reference it)
CREATE TABLE IF NOT EXISTS project_team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'developer' CHECK (role IN ('manager', 'developer', 'creative', 'designer')),
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES profiles(id),
  UNIQUE(project_id, profile_id)
);

-- Project Milestones
CREATE TABLE IF NOT EXISTS project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'delayed')),
  start_date date,
  due_date date,
  completion_date date,
  order_index integer DEFAULT 0,
  design_images jsonb DEFAULT '[]'::jsonb,
  ci_cd_url text,
  created_at timestamptz DEFAULT now()
);

-- Sprints
CREATE TABLE IF NOT EXISTS sprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  goal text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  sprint_id uuid REFERENCES sprints(id) ON DELETE SET NULL,
  milestone_id uuid REFERENCES project_milestones(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'backlog' CHECK (status IN ('backlog', 'todo', 'in-progress', 'review', 'done')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  estimated_hours numeric(5,2),
  actual_hours numeric(5,2),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  invoice_number text UNIQUE NOT NULL,
  issue_date date NOT NULL,
  due_date date NOT NULL,
  amount numeric(10,2) NOT NULL,
  tax_amount numeric(10,2) DEFAULT 0,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  payment_date date,
  notes text,
  line_items jsonb DEFAULT '[]'::jsonb,
  pdf_url text,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Project Documents
CREATE TABLE IF NOT EXISTS project_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  milestone_id uuid REFERENCES project_milestones(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  uploaded_by uuid REFERENCES profiles(id) NOT NULL,
  visible_to_client boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  link text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_projects
CREATE POLICY "Users can view their client projects"
  ON client_projects FOR SELECT
  USING (
    auth.uid() = client_id OR
    EXISTS (SELECT 1 FROM project_team WHERE project_team.project_id = client_projects.project_id AND project_team.profile_id = auth.uid())
  );

CREATE POLICY "Managers can manage client projects"
  ON client_projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

-- RLS Policies for project_team
CREATE POLICY "Users can view team members for their projects"
  ON project_team FOR SELECT
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_team pt
      WHERE pt.project_id = project_team.project_id
      AND pt.profile_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM client_projects
      WHERE client_projects.project_id = project_team.project_id
      AND client_projects.client_id = auth.uid()
    )
  );

CREATE POLICY "Managers can manage project teams"
  ON project_team FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

-- RLS Policies for project_milestones
CREATE POLICY "Users can view milestones for their projects"
  ON project_milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM client_projects
      WHERE client_projects.project_id = project_milestones.project_id
      AND client_projects.client_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = project_milestones.project_id
      AND project_team.profile_id = auth.uid()
    )
  );

CREATE POLICY "Team members can manage milestones"
  ON project_milestones FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = project_milestones.project_id
      AND project_team.profile_id = auth.uid()
      AND project_team.role IN ('manager', 'developer', 'creative')
    )
  );

-- RLS Policies for sprints
CREATE POLICY "Users can view sprints for their projects"
  ON sprints FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM client_projects
      WHERE client_projects.project_id = sprints.project_id
      AND client_projects.client_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = sprints.project_id
      AND project_team.profile_id = auth.uid()
    )
  );

CREATE POLICY "Team members can manage sprints"
  ON sprints FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = sprints.project_id
      AND project_team.profile_id = auth.uid()
      AND project_team.role IN ('manager', 'developer')
    )
  );

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks for their projects"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = tasks.project_id
      AND project_team.profile_id = auth.uid()
    ) OR
    assigned_to = auth.uid()
  );

CREATE POLICY "Team members can create tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = tasks.project_id
      AND project_team.profile_id = auth.uid()
    )
  );

CREATE POLICY "Team members can update their project tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = tasks.project_id
      AND project_team.profile_id = auth.uid()
    ) OR
    assigned_to = auth.uid()
  );

CREATE POLICY "Managers can delete tasks"
  ON tasks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = tasks.project_id
      AND project_team.profile_id = auth.uid()
      AND project_team.role = 'manager'
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Users can view their invoices"
  ON invoices FOR SELECT
  USING (
    client_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

CREATE POLICY "Managers can manage invoices"
  ON invoices FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

-- RLS Policies for project_documents
CREATE POLICY "Users can view project documents"
  ON project_documents FOR SELECT
  USING (
    (visible_to_client = true AND EXISTS (
      SELECT 1 FROM client_projects
      WHERE client_projects.project_id = project_documents.project_id
      AND client_projects.client_id = auth.uid()
    )) OR
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = project_documents.project_id
      AND project_team.profile_id = auth.uid()
    )
  );

CREATE POLICY "Team members can manage documents"
  ON project_documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_team
      WHERE project_team.project_id = project_documents.project_id
      AND project_team.profile_id = auth.uid()
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_projects_project_id ON client_projects(project_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_client_id ON client_projects(client_id);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_sprints_project_id ON sprints(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON project_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_team_project_id ON project_team(project_id);
CREATE INDEX IF NOT EXISTS idx_team_profile_id ON project_team(profile_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);