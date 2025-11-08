import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsPageProps {
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

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'branding', name: 'Branding' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: '3d-printing', name: '3D Printing' },
  { id: 'animation', name: 'Animation' },
  { id: 'game-dev', name: 'Game Development' },
  { id: 'other', name: 'Other' },
];

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [projects, setProjects] = useState<ProjectWithTags[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithTags[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, searchQuery]);

  const fetchProjects = async () => {
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select('id, title, slug, description, cover_image, category, hours_spent, project_type_detail')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (projectsData && !error) {
      const projectsWithTags = await Promise.all(
        projectsData.map(async (project) => {
          const { data: tagsData } = await supabase
            .from('project_tags')
            .select('tag')
            .eq('project_id', project.id)
            .limit(5);

          return {
            ...project,
            tags: tagsData?.map((t) => t.tag) || [],
          };
        })
      );

      setProjects(projectsWithTags);
    }
    setLoading(false);
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (p) =>
          p.category === selectedCategory ||
          p.project_type_detail?.toLowerCase().includes(selectedCategory.replace('-', ' '))
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-6xl md:text-7xl font-light text-white mb-4">
                Latest <span className="font-semibold text-lime-400">projects</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Explore our diverse portfolio spanning web, mobile, design, 3D, animation, and beyond
              </p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-zinc-900 transition-all font-medium"
            >
              See all projects
            </button>
          </div>

          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-lime-400 text-zinc-900'
                    : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                tags={project.tags}
                onClick={() => onNavigate('project-detail', { slug: project.slug })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
