import { useState, useEffect } from "react";
import { projectsData } from "../constants/projectData/projectsData";

import { ProjectsHeader } from "../components/ProjectPage/ProjectsHeader";
import { ProjectsSearch } from "../components/ProjectPage/ProjectsSearch";
import { ProjectsCategories } from "../components/ProjectPage/ProjectsCategories";
import { ProjectsGrid } from "../components/ProjectPage/ProjectsGrid";
import { LoadingSpinner } from "../components/ProjectPage/LoadingSpinner";

export function ProjectsPage({ onNavigate }: any) {
  
const [projects, setProjects] = useState<any[]>([]);
const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "branding", name: "Branding" },
    { id: "ui-ux", name: "UI/UX Design" },
    { id: "3d-printing", name: "3D Printing" },
    { id: "animation", name: "Animation" },
    { id: "game-dev", name: "Game Development" },
    { id: "other", name: "Other" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category === selectedCategory ||
          p.project_type_detail?.toLowerCase().includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag:any) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <ProjectsHeader onNavigate={onNavigate} />

        <ProjectsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ProjectsCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {loading ? (
          <LoadingSpinner />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          <ProjectsGrid projects={filteredProjects} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}
