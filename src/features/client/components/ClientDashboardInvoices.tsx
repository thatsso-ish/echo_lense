import { ClientInvoiceCard } from './ClientInvoiceCard';

export function ClientDashboardInvoices({ invoices }: { invoices: any[] }) {
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <ClientInvoiceCard key={invoice.invoiceNumber} invoice={invoice} />
      ))}
    </div>
  );
}
