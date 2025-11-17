import { FileText } from 'lucide-react';

export function ClientDashboardDocuments({ documents }: { documents: any[] }) {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-zinc-800">
              <FileText size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">{doc.name}</p>
              <p className="text-xs text-gray-500">{doc.type}</p>
            </div>
          </div>
          <button className="text-sm text-lime-400 hover:text-lime-300 transition-colors">
            View →
          </button>
        </div>
      ))}
    </div>
  );
}
