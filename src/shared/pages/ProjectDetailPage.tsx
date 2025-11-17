import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  Clock,
  Users,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { publicProjectsApi } from '../api/projectsApi';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (page: string, data?: any) => void;
}

interface FullProject {
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

export function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const [project, setProject] = useState<FullProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [slug]);

  const fetchProjectDetails = async () => {
    try {
      const data = await publicProjectsApi.getBySlug(slug);
      setProject(data);
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedTech = (project?.technologies || []).reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech.name);
    return acc;
  }, {} as Record<string, string[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Project not found</h2>
          <button
            onClick={() => onNavigate('projects')}
            className="text-lime-400 hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <button
        onClick={() => onNavigate('projects')}
        className="fixed top-24 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-all hover:scale-110 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="relative h-[60vh] overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-zinc-800 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
          <h1 className="text-6xl md:text-7xl font-light text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-3 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.projectTypeDetail && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Type of Project</p>
                  <p className="text-white font-medium">{project.projectTypeDetail}</p>
                </div>
              )}
              {project.industry && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Industry</p>
                  <p className="text-white font-medium">{project.industry}</p>
                </div>
              )}
              {project.hoursSpent && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Hours Spent</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Clock size={16} className="text-lime-400" />
                    {project.hoursSpent}:00 hours
                  </p>
                </div>
              )}
              {project.teamSize && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Team Size</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Users size={16} className="text-lime-400" />
                    {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                  </p>
                </div>
              )}
            </div>

            {project.content && (
              <div className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-3xl font-light text-white mb-4 flex items-center gap-3">
                  <span className="text-lime-400">About</span> the Project
                </h2>
                <div
                  className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            )}

            {project.challenges && (
              <div>
                <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="text-lime-400" size={32} />
                  <span>Challenges & Solutions</span>
                </h2>
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.challenges}
                  </p>
                </div>
              </div>
            )}

            {(project.images && project.images.length > 0) && (
              <div className="space-y-8">
                <h2 className="text-3xl font-light text-white mb-6">Project Gallery</h2>
                {project.images.map((imageUrl, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {project.caseStudy && (
              <div>
                <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
                  <Target className="text-lime-400" size={32} />
                  <span>Case Study</span>
                </h2>
                <div className="p-8 rounded-2xl bg-linear-to-br from-lime-400/5 to-emerald-400/5 border border-lime-400/20">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.caseStudy}
                  </p>
                </div>
              </div>
            )}

            {project.results && (
              <div>
                <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="text-lime-400" size={32} />
                  <span>Results & Impact</span>
                </h2>
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.results}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Apps</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(groupedTech).map(([category, techs]) =>
                    techs.map((tech, i) => (
                      <span
                        key={`${category}-${i}`}
                        className="px-3 py-1.5 rounded-full border border-lime-400/30 text-lime-400 text-xs font-medium uppercase"
                      >
                        {tech}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {(project.projectUrl || project.githubUrl || project.designFilesUrl) && (
                <div className="space-y-3">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white transition-all group"
                    >
                      <span className="font-medium">Visit website</span>
                      <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-white transition-all group"
                    >
                      <span className="font-medium">View on GitHub</span>
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {project.designFilesUrl && (
                    <a
                      href={project.designFilesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-white transition-all group"
                    >
                      <span className="font-medium">Design Files</span>
                      <FileText size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              )}

              {(project.tags && project.tags.length > 0) && (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-zinc-800 text-gray-400 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.completionDate || project.clientName) && (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-sm">
                  {project.clientName && (
                    <div>
                      <p className="text-gray-500 mb-1">Client</p>
                      <p className="text-white font-medium">{project.clientName}</p>
                    </div>
                  )}
                  {project.completionDate && (
                    <div>
                      <p className="text-gray-500 mb-1">Completed</p>
                      <p className="text-white font-medium">
                        {new Date(project.completionDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {(project.relatedProjects && project.relatedProjects.length > 0) && (
          <div className="border-t border-zinc-800 pt-16">
            <h2 className="text-4xl font-light text-white mb-8">
              <span className="text-lime-400">Similar</span> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject._id}
                  project={relatedProject}
                  tags={relatedProject.tags || []}
                  onClick={() => onNavigate('project-detail', { slug: relatedProject.slug })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
