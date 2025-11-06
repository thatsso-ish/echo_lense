import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  FileText,
  Clock,
  Users,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

interface FullProject {
  id: string;
  title: string;
  description: string;
  content: string | null;
  cover_image: string | null;
  client_name: string | null;
  category: string;
  completion_date: string | null;
  project_url: string | null;
  github_url: string | null;
  design_files_url: string | null;
  hours_spent: number | null;
  team_size: number | null;
  industry: string | null;
  project_type_detail: string | null;
  case_study: string | null;
  challenges: string | null;
  results: string | null;
}

interface ProjectImage {
  id: string;
  image_url: string;
  caption: string | null;
}

interface Technology {
  technology: string;
  category: string;
}

interface RelatedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string | null;
  category: string;
  hours_spent: number | null;
  project_type_detail: string | null;
  tags: string[];
}

export function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const [project, setProject] = useState<FullProject | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [slug]);

  const fetchProjectDetails = async () => {
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (projectData && !projectError) {
      setProject(projectData);

      const [imagesResult, techResult, tagsResult, relatedResult] = await Promise.all([
        supabase
          .from('project_images')
          .select('id, image_url, caption')
          .eq('project_id', projectData.id)
          .order('order_index', { ascending: true }),
        supabase
          .from('project_technologies')
          .select('technology, category')
          .eq('project_id', projectData.id),
        supabase
          .from('project_tags')
          .select('tag')
          .eq('project_id', projectData.id),
        supabase
          .from('related_projects')
          .select('related_project_id')
          .eq('project_id', projectData.id)
          .limit(3),
      ]);

      if (imagesResult.data) setImages(imagesResult.data);
      if (techResult.data) setTechnologies(techResult.data);
      if (tagsResult.data) setTags(tagsResult.data.map((t) => t.tag));

      if (relatedResult.data && relatedResult.data.length > 0) {
        const relatedIds = relatedResult.data.map((r) => r.related_project_id);
        const { data: relatedProjectsData } = await supabase
          .from('projects')
          .select('id, title, slug, description, cover_image, category, hours_spent, project_type_detail')
          .in('id', relatedIds)
          .eq('status', 'published');

        if (relatedProjectsData) {
          const projectsWithTags = await Promise.all(
            relatedProjectsData.map(async (p) => {
              const { data: tagsData } = await supabase
                .from('project_tags')
                .select('tag')
                .eq('project_id', p.id)
                .limit(3);
              return { ...p, tags: tagsData?.map((t) => t.tag) || [] };
            })
          );
          setRelatedProjects(projectsWithTags);
        }
      }
    }

    setLoading(false);
  };

  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech.technology);
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
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

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
              {project.project_type_detail && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Type of Project</p>
                  <p className="text-white font-medium">{project.project_type_detail}</p>
                </div>
              )}
              {project.industry && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Industry</p>
                  <p className="text-white font-medium">{project.industry}</p>
                </div>
              )}
              {project.hours_spent && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Hours Spent</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Clock size={16} className="text-lime-400" />
                    {project.hours_spent}:00 hours
                  </p>
                </div>
              )}
              {project.team_size && (
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Team Size</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Users size={16} className="text-lime-400" />
                    {project.team_size} {project.team_size === 1 ? 'person' : 'people'}
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

            {images.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-light text-white mb-6">Project Gallery</h2>
                {images.map((image) => (
                  <div key={image.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img
                      src={image.image_url}
                      alt={image.caption || project.title}
                      className="w-full"
                    />
                    {image.caption && (
                      <p className="p-6 text-gray-400">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {project.case_study && (
              <div>
                <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
                  <Target className="text-lime-400" size={32} />
                  <span>Case Study</span>
                </h2>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/5 to-emerald-400/5 border border-lime-400/20">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.case_study}
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

              {(project.project_url || project.github_url || project.design_files_url) && (
                <div className="space-y-3">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white transition-all group"
                    >
                      <span className="font-medium">Visit website</span>
                      <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 text-white transition-all group"
                    >
                      <span className="font-medium">View on GitHub</span>
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {project.design_files_url && (
                    <a
                      href={project.design_files_url}
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

              {tags.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
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

              {(project.completion_date || project.client_name) && (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-sm">
                  {project.client_name && (
                    <div>
                      <p className="text-gray-500 mb-1">Client</p>
                      <p className="text-white font-medium">{project.client_name}</p>
                    </div>
                  )}
                  {project.completion_date && (
                    <div>
                      <p className="text-gray-500 mb-1">Completed</p>
                      <p className="text-white font-medium">
                        {new Date(project.completion_date).toLocaleDateString('en-US', {
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

        {relatedProjects.length > 0 && (
          <div className="border-t border-zinc-800 pt-16">
            <h2 className="text-4xl font-light text-white mb-8">
              <span className="text-lime-400">Similar</span> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject.id}
                  project={relatedProject}
                  tags={relatedProject.tags}
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
