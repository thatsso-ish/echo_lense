/*
  # Enhance Project Schema for Detailed Portfolio

  ## Overview
  Adds comprehensive fields to support detailed project pages including:
  - Technology stack tracking
  - Project metrics (hours spent, team size)
  - Multiple link types (website, GitHub, design files)
  - Design case studies
  - Similar/related projects

  ## Schema Changes
  
  ### Updated `projects` table
  Add new columns:
  - `hours_spent` (numeric) - Time invested in the project
  - `team_size` (integer) - Number of people who worked on it
  - `github_url` (text) - Repository link for code projects
  - `design_files_url` (text) - Link to Figma, Adobe files, etc.
  - `case_study` (text) - Detailed design/development case study
  - `challenges` (text) - Problems faced and solutions
  - `results` (text) - Project outcomes and metrics
  - `industry` (text) - Business industry/sector
  - `project_type_detail` (text) - Specific type (e.g., "3D Printing", "Animation")

  ### New `project_technologies` table
  Track tech stack used in projects
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects)
  - `technology` (text) - Name of technology/tool
  - `category` (text) - frontend, backend, design, 3d, animation, etc.
  - `created_at` (timestamptz)

  ### New `related_projects` table
  Link similar/related projects
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects)
  - `related_project_id` (uuid, references projects)
  - `relationship_type` (text) - 'similar', 'sequel', 'related'
  - `created_at` (timestamptz)

  ## Security
  - Maintain existing RLS policies
  - Public read access for published content
  - Authenticated write access for team members
*/

-- Add new columns to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'hours_spent'
  ) THEN
    ALTER TABLE projects ADD COLUMN hours_spent numeric(10,2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'team_size'
  ) THEN
    ALTER TABLE projects ADD COLUMN team_size integer DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'github_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN github_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'design_files_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN design_files_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'case_study'
  ) THEN
    ALTER TABLE projects ADD COLUMN case_study text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'challenges'
  ) THEN
    ALTER TABLE projects ADD COLUMN challenges text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'results'
  ) THEN
    ALTER TABLE projects ADD COLUMN results text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'industry'
  ) THEN
    ALTER TABLE projects ADD COLUMN industry text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'project_type_detail'
  ) THEN
    ALTER TABLE projects ADD COLUMN project_type_detail text;
  END IF;
END $$;

-- Create project_technologies table
CREATE TABLE IF NOT EXISTS project_technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  technology text NOT NULL,
  category text DEFAULT 'other' CHECK (category IN ('frontend', 'backend', 'design', '3d', 'animation', 'game-dev', 'mobile', 'database', 'devops', 'other')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Technologies viewable with their projects"
  ON project_technologies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_technologies.project_id
      AND (projects.status = 'published' OR auth.uid() IS NOT NULL)
    )
  );

CREATE POLICY "Authenticated users can manage technologies"
  ON project_technologies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

-- Create related_projects table
CREATE TABLE IF NOT EXISTS related_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  related_project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  relationship_type text DEFAULT 'similar' CHECK (relationship_type IN ('similar', 'sequel', 'related')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, related_project_id)
);

ALTER TABLE related_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Related projects viewable by everyone"
  ON related_projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = related_projects.project_id
      AND projects.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can manage related projects"
  ON related_projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('manager', 'developer', 'creative')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_category ON project_technologies(category);
CREATE INDEX IF NOT EXISTS idx_related_projects_project_id ON related_projects(project_id);
CREATE INDEX IF NOT EXISTS idx_related_projects_related_id ON related_projects(related_project_id);