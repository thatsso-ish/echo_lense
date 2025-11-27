import { ExternalLink, FileText, Download } from "lucide-react";
import { useRef, useState } from "react";
import { Project } from "../../../../data/mockProjects";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function DocumentsTab({ project }: { project: Project }) {
  const [docs, setDocs] = useState(project.documents || []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const uploadedBy = project.manager?.name || "Unknown";
    const now = new Date().toISOString();

    const newDocs = Array.from(files).map((f) => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      type: f.type || "Unknown",
      url: URL.createObjectURL(f),
      uploadedBy,
      uploadedDate: now,
      size: formatBytes(f.size),
    }));

    // prepend new docs so they appear at top
    setDocs((prev) => [...newDocs, ...prev]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Documents</h2>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            id="doc-upload"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-lime-400 text-zinc-900 rounded-full hover:bg-lime-300"
          >
            + Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {docs.map((doc) => (
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
                    {doc.type} • Uploaded by {doc.uploadedBy} on {new Date(doc.uploadedDate).toLocaleDateString()} • {doc.size}
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

                <a
                  href={doc.url}
                  download={doc.name}
                  className="p-2 bg-zinc-800 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-700"
                >
                  <Download size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
