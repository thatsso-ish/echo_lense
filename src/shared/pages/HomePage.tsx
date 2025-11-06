import { ArrowRight, Sparkles, Zap, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectCard } from '../components/ProjectCard';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string | null;
  category: string;
  hours_spent: number | null;
  project_type_detail: string | null;
}

interface ProjectWithTags extends Project {
  tags: string[];
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectWithTags[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select('id, title, slug, description, cover_image, category, hours_spent, project_type_detail')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (projectsData && !error) {
      const projectsWithTags = await Promise.all(
        projectsData.map(async (project) => {
          const { data: tagsData } = await supabase
            .from('project_tags')
            .select('tag')
            .eq('project_id', project.id)
            .limit(3);

          return {
            ...project,
            tags: tagsData?.map((t) => t.tag) || [],
          };
        })
      );

      setFeaturedProjects(projectsWithTags);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-sm mb-8 animate-fade-in">
            <Sparkles size={16} />
            <span>Award-Winning Digital Experiences</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-light text-white mb-6 animate-slide-up">
            We build your
            <br />
            <span className="font-semibold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
              digital presence
            </span>
          </h1>

          <div className="relative inline-block mb-8">
            <svg className="absolute -inset-x-4 -inset-y-2" viewBox="0 0 600 60" fill="none">
              <path
                d="M10 30 Q 150 10, 300 30 T 590 30"
                stroke="#a3e635"
                strokeWidth="2"
                fill="none"
                className="animate-draw-line"
              />
            </svg>
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            We craft aesthetic, functional, and user-centric websites that help businesses thrive in the digital world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('calculator')}
              className="group px-8 py-4 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-all font-medium flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Get a Quote
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 rounded-full border-2 border-gray-700 text-white hover:border-lime-400 hover:text-lime-400 transition-all font-medium"
            >
              View Our Work
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => onNavigate('dashboard-select')}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors text-sm"
            >
              <span>Preview Dashboard Design</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Why Choose <span className="font-semibold text-lime-400">Us</span>
            </h2>
            <p className="text-gray-400 text-lg">Excellence in every pixel, performance in every interaction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} />,
                title: 'Lightning Fast',
                description: 'Optimized for speed and performance, ensuring your users get the best experience.',
              },
              {
                icon: <Award size={32} />,
                title: 'Award-Worthy Design',
                description: 'Creating beautiful, modern interfaces that stand out and win recognition.',
              },
              {
                icon: <Users size={32} />,
                title: 'User-Centric',
                description: 'Every decision is made with your users in mind, ensuring intuitive experiences.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700 hover:border-lime-400 transition-all hover:scale-105 transform"
              >
                <div className="text-lime-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                  Featured <span className="font-semibold text-lime-400">Projects</span>
                </h2>
                <p className="text-gray-400 text-lg">Our latest and greatest work</p>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="hidden md:flex items-center gap-2 text-lime-400 hover:gap-4 transition-all"
              >
                View All Projects
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tags={project.tags}
                  onClick={() => onNavigate('project-detail', { slug: project.slug })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-br from-lime-400 to-emerald-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 mb-6">
            Ready to start your <span className="font-semibold">project?</span>
          </h2>
          <p className="text-zinc-800 text-lg mb-8">
            Let's discuss your vision and create something amazing together.
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="group px-8 py-4 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all font-medium inline-flex items-center gap-2 hover:scale-105 transform"
          >
            Calculate Your Project
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
