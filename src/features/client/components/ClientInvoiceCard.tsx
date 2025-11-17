import { DollarSign } from 'lucide-react';

export function ClientInvoiceCard({ invoice }: { invoice: any }) {
  return (
    <div
      className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-zinc-800">
          <DollarSign size={20} className="text-lime-400" />
        </div>
        <div>
          <p className="text-white font-medium">{invoice.invoiceNumber}</p>
          <p className="text-sm text-gray-400">{invoice.projectName}</p>
          <p className="text-xs text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xl text-white font-light">${invoice.amount.toLocaleString()}</p>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          invoice.status === 'paid'
            ? 'bg-green-400/10 text-green-400'
            : 'bg-yellow-400/10 text-yellow-400'
        }`}>
          {invoice.status.toUpperCase()}
        </span>
        <button className="text-sm text-lime-400 hover:text-lime-300 transition-colors">
          View →
        </button>
      </div>
    </div>
  );
}
