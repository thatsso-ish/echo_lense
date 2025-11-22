import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../constants/projectData/projectsData";

import { FullProject } from "../types/ProjectDetailPage/types";

import HeaderSection from "../components/ProjectDetailPage/HeaderSection";
import InfoGrid from "../components/ProjectDetailPage/InfoGrid";
import AboutSection from "../components/ProjectDetailPage/AboutSection";
import ChallengesSection from "../components/ProjectDetailPage/ChallengesSection";
import GallerySection from "../components/ProjectDetailPage/GallerySection";
import CaseStudySection from "../components/ProjectDetailPage/CaseStudySection";
import ResultsSection from "../components/ProjectDetailPage/ResultsSection";
import Sidebar from "../components/ProjectDetailPage/Sidebar";
import RelatedProjects from "../components/ProjectDetailPage/RelatedProjects";

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (page: string, data?: any) => void;
}

 function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const [project, setProject] = useState<FullProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const p = getProjectBySlug(slug);
      setProject(p);
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-lime-400" />
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">Project not found</p>
          <button onClick={() => onNavigate("projects")} className="text-lime-400 underline">
            Back to Projects
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back Button */}
      <button
        onClick={() => onNavigate("projects")}
        className="fixed top-24 left-6 z-50 w-12 h-12 rounded-full bg-lime-400 text-zinc-900 flex items-center justify-center hover:bg-lime-300 transition-all hover:scale-110"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Hero Section */}
      <HeaderSection project={project} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="space-y-12 lg:col-span-3">
          <InfoGrid project={project} />
          <AboutSection project={project} />
          <ChallengesSection project={project} />
          <GallerySection project={project} />
          <CaseStudySection project={project} />
          <ResultsSection project={project} />
        </div>

        <Sidebar project={project} />
      </div>

      <RelatedProjects
        projects={project.relatedProjects || []}
        onNavigate={onNavigate}
      />
    </div>
  );
}
export { ProjectDetailPage };