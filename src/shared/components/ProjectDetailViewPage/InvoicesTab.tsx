import { ExternalLink, Download } from "lucide-react";
import { Project } from "../../../data/mockProjects";

export default function InvoicesTab({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Invoices</h2>
        <button className="px-4 py-2 bg-lime-400 rounded-full text-zinc-900 hover:bg-lime-300">
          + Create Invoice
        </button>
      </div>

      <div className="space-y-4">
        {project.invoices.map(invoice => (
          <div
            key={invoice.id}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium text-white">
                  {invoice.invoiceNumber}
                </h3>
                <p className="text-gray-400 text-sm">
                  Issued: {new Date(invoice.issueDate).toLocaleDateString()} •
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-light text-white mb-2">
                  ${invoice.amount.toLocaleString()}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    invoice.status === "paid"
                      ? "bg-green-400/10 text-green-400"
                      : invoice.status === "pending"
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-4">
              {invoice.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm py-2 border-t border-zinc-800"
                >
                  <span className="text-gray-400">{item.description}</span>
                  <span className="text-white">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                View Invoice
              </button>

              <button className="flex-1 px-4 py-2 rounded-lg bg-lime-400 text-zinc-900 hover:bg-lime-300 flex items-center justify-center gap-2">
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
