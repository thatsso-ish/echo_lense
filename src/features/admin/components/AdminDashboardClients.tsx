import { Plus, Mail, Phone } from 'lucide-react';
import { mockClients } from '../../../data/mockData';

export function AdminDashboardClients() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">All Clients</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          <Plus size={18} />
          <span>Add Client</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockClients.map((client) => (
          <div key={client.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
            <div className="flex items-start gap-4">
              <img src={client.avatar} alt={client.name} className="w-14 h-14 rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{client.name}</h3>
                    <p className="text-lime-400 text-sm">{client.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <Mail size={12} />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Phone size={12} />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <p className="text-gray-500">Projects</p>
                    <p className="text-white font-medium">{client.projectsCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Spent</p>
                    <p className="text-white font-medium">${(client.totalSpent / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
