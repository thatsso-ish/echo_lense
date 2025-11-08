export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'client' | 'manager' | 'developer' | 'creative'
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'client' | 'manager' | 'developer' | 'creative'
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'client' | 'manager' | 'developer' | 'creative'
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          content: string | null
          cover_image: string | null
          client_name: string | null
          category: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          completion_date: string | null
          project_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          hours_spent: number | null
          team_size: number | null
          github_url: string | null
          design_files_url: string | null
          case_study: string | null
          challenges: string | null
          results: string | null
          industry: string | null
          project_type_detail: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          content?: string | null
          cover_image?: string | null
          client_name?: string | null
          category?: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          completion_date?: string | null
          project_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          hours_spent?: number | null
          team_size?: number | null
          github_url?: string | null
          design_files_url?: string | null
          case_study?: string | null
          challenges?: string | null
          results?: string | null
          industry?: string | null
          project_type_detail?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          content?: string | null
          cover_image?: string | null
          client_name?: string | null
          category?: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          completion_date?: string | null
          project_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          hours_spent?: number | null
          team_size?: number | null
          github_url?: string | null
          design_files_url?: string | null
          case_study?: string | null
          challenges?: string | null
          results?: string | null
          industry?: string | null
          project_type_detail?: string | null
        }
      }
      project_tags: {
        Row: {
          id: string
          project_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          tag?: string
          created_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          caption: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          caption?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          caption?: string | null
          order_index?: number
          created_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          profile_id: string | null
          name: string
          role_title: string
          avatar_url: string | null
          bio: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          order_index: number
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          name: string
          role_title: string
          avatar_url?: string | null
          bio?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          order_index?: number
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          name?: string
          role_title?: string
          avatar_url?: string | null
          bio?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          order_index?: number
          visible?: boolean
          created_at?: string
        }
      }
      project_technologies: {
        Row: {
          id: string
          project_id: string
          technology: string
          category: 'frontend' | 'backend' | 'design' | '3d' | 'animation' | 'game-dev' | 'mobile' | 'database' | 'devops' | 'other'
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          technology: string
          category?: 'frontend' | 'backend' | 'design' | '3d' | 'animation' | 'game-dev' | 'mobile' | 'database' | 'devops' | 'other'
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          technology?: string
          category?: 'frontend' | 'backend' | 'design' | '3d' | 'animation' | 'game-dev' | 'mobile' | 'database' | 'devops' | 'other'
          created_at?: string
        }
      }
      related_projects: {
        Row: {
          id: string
          project_id: string
          related_project_id: string
          relationship_type: 'similar' | 'sequel' | 'related'
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          related_project_id: string
          relationship_type?: 'similar' | 'sequel' | 'related'
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          related_project_id?: string
          relationship_type?: 'similar' | 'sequel' | 'related'
          created_at?: string
        }
      }
      client_projects: {
        Row: {
          id: string
          project_id: string
          client_id: string
          status: 'active' | 'on-hold' | 'completed' | 'cancelled'
          start_date: string | null
          end_date: string | null
          budget: number | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          client_id: string
          status?: 'active' | 'on-hold' | 'completed' | 'cancelled'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          client_id?: string
          status?: 'active' | 'on-hold' | 'completed' | 'cancelled'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          created_at?: string
        }
      }
      project_milestones: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          status: 'pending' | 'in-progress' | 'completed' | 'delayed'
          start_date: string | null
          due_date: string | null
          completion_date: string | null
          order_index: number
          design_images: Json
          ci_cd_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          status?: 'pending' | 'in-progress' | 'completed' | 'delayed'
          start_date?: string | null
          due_date?: string | null
          completion_date?: string | null
          order_index?: number
          design_images?: Json
          ci_cd_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'in-progress' | 'completed' | 'delayed'
          start_date?: string | null
          due_date?: string | null
          completion_date?: string | null
          order_index?: number
          design_images?: Json
          ci_cd_url?: string | null
          created_at?: string
        }
      }
      sprints: {
        Row: {
          id: string
          project_id: string
          name: string
          goal: string | null
          start_date: string
          end_date: string
          status: 'planning' | 'active' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          goal?: string | null
          start_date: string
          end_date: string
          status?: 'planning' | 'active' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          goal?: string | null
          start_date?: string
          end_date?: string
          status?: 'planning' | 'active' | 'completed'
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          sprint_id: string | null
          milestone_id: string | null
          title: string
          description: string | null
          status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to: string | null
          created_by: string
          estimated_hours: number | null
          actual_hours: number | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          sprint_id?: string | null
          milestone_id?: string | null
          title: string
          description?: string | null
          status?: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          created_by: string
          estimated_hours?: number | null
          actual_hours?: number | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          sprint_id?: string | null
          milestone_id?: string | null
          title?: string
          description?: string | null
          status?: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          created_by?: string
          estimated_hours?: number | null
          actual_hours?: number | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          project_id: string
          client_id: string
          invoice_number: string
          issue_date: string
          due_date: string
          amount: number
          tax_amount: number
          total_amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          payment_date: string | null
          notes: string | null
          line_items: Json
          pdf_url: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          client_id: string
          invoice_number: string
          issue_date: string
          due_date: string
          amount: number
          tax_amount?: number
          total_amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          payment_date?: string | null
          notes?: string | null
          line_items?: Json
          pdf_url?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          client_id?: string
          invoice_number?: string
          issue_date?: string
          due_date?: string
          amount?: number
          tax_amount?: number
          total_amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          payment_date?: string | null
          notes?: string | null
          line_items?: Json
          pdf_url?: string | null
          created_by?: string
          created_at?: string
        }
      }
      project_documents: {
        Row: {
          id: string
          project_id: string
          milestone_id: string | null
          title: string
          description: string | null
          file_url: string
          file_type: string | null
          file_size: number | null
          uploaded_by: string
          visible_to_client: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          milestone_id?: string | null
          title: string
          description?: string | null
          file_url: string
          file_type?: string | null
          file_size?: number | null
          uploaded_by: string
          visible_to_client?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          milestone_id?: string | null
          title?: string
          description?: string | null
          file_url?: string
          file_type?: string | null
          file_size?: number | null
          uploaded_by?: string
          visible_to_client?: boolean
          created_at?: string
        }
      }
      project_team: {
        Row: {
          id: string
          project_id: string
          profile_id: string
          role: 'manager' | 'developer' | 'creative' | 'designer'
          assigned_at: string
          assigned_by: string | null
        }
        Insert: {
          id?: string
          project_id: string
          profile_id: string
          role?: 'manager' | 'developer' | 'creative' | 'designer'
          assigned_at?: string
          assigned_by?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          profile_id?: string
          role?: 'manager' | 'developer' | 'creative' | 'designer'
          assigned_at?: string
          assigned_by?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          link: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          link?: string | null
          read?: boolean
          created_at?: string
        }
      }
      calculator_requests: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          project_type: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          budget_range: string
          timeline: string
          description: string
          features: Json
          status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'declined'
          estimated_cost: number | null
          notes: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          project_type: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          budget_range: string
          timeline: string
          description: string
          features?: Json
          status?: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'declined'
          estimated_cost?: number | null
          notes?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          project_type?: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other'
          budget_range?: string
          timeline?: string
          description?: string
          features?: Json
          status?: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'declined'
          estimated_cost?: number | null
          notes?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
