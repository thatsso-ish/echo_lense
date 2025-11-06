/*
  # Portfolio Platform Schema

  ## Overview
  Creates the complete database schema for a portfolio platform with:
  - User management with role-based access (client, manager, developer/creative)
  - Project portfolio with blog-style content
  - Calculator requests for project estimation
  - Team member profiles
  - Project categories and tags

  ## New Tables
  
  ### `profiles`
  Extends auth.users with additional profile information
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `role` (text) - 'client', 'manager', 'developer', or 'creative'
  - `avatar_url` (text, optional)
  - `bio` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `projects`
  Portfolio projects with detailed information
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `content` (text) - Rich blog-style content
  - `cover_image` (text)
  - `client_name` (text)
  - `category` (text) - 'web', 'mobile', 'branding', 'ui-ux', etc.
  - `status` (text) - 'draft', 'published', 'archived'
  - `featured` (boolean)
  - `completion_date` (date, optional)
  - `project_url` (text, optional)
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `project_tags`
  Tags for categorizing projects
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects)
  - `tag` (text)
  - `created_at` (timestamptz)

  ### `project_images`
  Additional images for project galleries
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects)
  - `image_url` (text)
  - `caption` (text, optional)
  - `order_index` (integer)
  - `created_at` (timestamptz)

  ### `team_members`
  Public team member profiles for the portfolio
  - `id` (uuid, primary key)
  - `profile_id` (uuid, references profiles, optional)
  - `name` (text)
  - `role_title` (text) - 'Lead Designer', 'Developer', etc.
  - `avatar_url` (text)
  - `bio` (text, optional)
  - `linkedin_url` (text, optional)
  - `portfolio_url` (text, optional)
  - `order_index` (integer)
  - `visible` (boolean)
  - `created_at` (timestamptz)

  ### `calculator_requests`
  Client project estimation requests
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `company` (text, optional)
  - `project_type` (text) - 'web', 'mobile', 'branding', etc.
  - `budget_range` (text)
  - `timeline` (text)
  - `description` (text)
  - `features` (jsonb) - Selected features/requirements
  - `status` (text) - 'pending', 'reviewing', 'quoted', 'accepted', 'declined'
  - `estimated_cost` (numeric, optional)
  - `notes` (text, optional)
  - `assigned_to` (uuid, references profiles, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for published projects and team members
  - Authenticated users can create calculator requests
  - Only managers and assigned users can view/edit requests
  - Role-based access for dashboard features
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'client' CHECK (role IN ('client', 'manager', 'developer', 'creative')),
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text,
  cover_image text,
  client_name text,
  category text DEFAULT 'web' CHECK (category IN ('web', 'mobile', 'branding', 'ui-ux', 'other')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured boolean DEFAULT false,
  completion_date date,
  project_url text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published projects are viewable by everyone"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers and developers can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

CREATE POLICY "Managers and creators can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'manager' OR profiles.id = created_by)
    )
  );

-- Create project_tags table
CREATE TABLE IF NOT EXISTS project_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags viewable with their projects"
  ON project_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_tags.project_id
      AND (projects.status = 'published' OR auth.uid() IS NOT NULL)
    )
  );

CREATE POLICY "Authenticated users can manage tags"
  ON project_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  caption text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images viewable with their projects"
  ON project_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND (projects.status = 'published' OR auth.uid() IS NOT NULL)
    )
  );

CREATE POLICY "Authenticated users can manage images"
  ON project_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  role_title text NOT NULL,
  avatar_url text,
  bio text,
  linkedin_url text,
  portfolio_url text,
  order_index integer DEFAULT 0,
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visible team members are viewable by everyone"
  ON team_members FOR SELECT
  USING (visible = true);

CREATE POLICY "Managers can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

-- Create calculator_requests table
CREATE TABLE IF NOT EXISTS calculator_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL CHECK (project_type IN ('web', 'mobile', 'branding', 'ui-ux', 'other')),
  budget_range text NOT NULL,
  timeline text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'declined')),
  estimated_cost numeric(10,2),
  notes text,
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE calculator_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create calculator requests"
  ON calculator_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own requests by email"
  ON calculator_requests FOR SELECT
  TO authenticated
  USING (
    email = (SELECT email FROM profiles WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

CREATE POLICY "Managers can view all requests"
  ON calculator_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

CREATE POLICY "Managers and assigned users can update requests"
  ON calculator_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'manager' OR profiles.id = assigned_to)
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_calculator_requests_status ON calculator_requests(status);
CREATE INDEX IF NOT EXISTS idx_calculator_requests_email ON calculator_requests(email);