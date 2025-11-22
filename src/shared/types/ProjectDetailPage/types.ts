export interface FullProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  coverImage?: string;
  clientName?: string;
  category: string;
  completionDate?: string;
  projectUrl?: string;
  githubUrl?: string;
  designFilesUrl?: string;
  hoursSpent?: number;
  teamSize?: number;
  industry?: string;
  projectTypeDetail?: string;
  caseStudy?: string;
  challenges?: string;
  results?: string;
  images?: string[];
  technologies?: Array<{
    name: string;
    category: string;
  }>;
  tags?: string[];
  relatedProjects?: FullProject[];
}