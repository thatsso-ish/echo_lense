import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { mockProjects} from "../../../data/mockProjects";

import OverviewTab from "../components/ProjectDetailViewPage/OverviewTab";
import TasksTab from "../components/ProjectDetailViewPage/TasksTab";
import TeamTab from "../components/ProjectDetailViewPage/TeamTab";
import DocumentsTab from "../components/ProjectDetailViewPage/DocumentsTab";
import InvoicesTab from "../components/ProjectDetailViewPage/InvoicesTab";
import MilestonesTab from "../components/ProjectDetailViewPage/MilestonesTab";

interface Props {
  projectId: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function ProjectDetailViewPage({ projectId }: Props) {
  const project = mockProjects.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-gray-400">Project not found</p>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "team", label: "Team" },
    { id: "documents", label: "Documents" },
    { id: "invoices", label: "Invoices" },
    { id: "milestones", label: "Milestones" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">
                {project.name}
              </h1>
              <p className="text-gray-400">{project.client.company}</p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                project.status === "completed"
                  ? "bg-green-400/10 text-green-400"
                  : project.status === "in-progress"
                  ? "bg-lime-400/10 text-lime-400"
                  : project.status === "review"
                  ? "bg-blue-400/10 text-blue-400"
                  : "bg-gray-400/10 text-gray-400"
              }`}
            >
              {project.status.replace("-", " ")}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-lime-400 text-zinc-900"
                    : "bg-zinc-800 text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && <OverviewTab project={project} />}
        {activeTab === "tasks" && <TasksTab project={project} />}
        {activeTab === "team" && <TeamTab project={project} />}
        {activeTab === "documents" && <DocumentsTab project={project} />}
        {activeTab === "invoices" && <InvoicesTab project={project} />}
        {activeTab === "milestones" && <MilestonesTab project={project} />}
      </div>
    </div>
  );
}
