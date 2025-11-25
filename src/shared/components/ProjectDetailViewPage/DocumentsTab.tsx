import { ExternalLink, FileText, Download } from "lucide-react";
import { Project } from "../../../data/mockProjects";

export default function DocumentsTab({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Documents</h2>
        <button className="px-4 py-2 bg-lime-400 text-zinc-900 rounded-full hover:bg-lime-300">
          + Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {project.documents.map(doc => (
          <div
            key={doc.id}
            className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-lime-400/10 rounded-lg">
                  <FileText size={24} className="text-lime-400" />
                </div>

                <div>
                  <p className="text-white font-medium mb-1">{doc.name}</p>
                  <p className="text-gray-400 text-sm">
                    {doc.type} • Uploaded by {doc.uploadedBy} on{" "}
                    {new Date(doc.uploadedDate).toLocaleDateString()} • {doc.size}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-800 text-white rounded-lg flex gap-2 items-center hover:bg-zinc-700"
                >
                  <ExternalLink size={16} />
                  Open
                </a>

                <button className="p-2 bg-zinc-800 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-700">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
