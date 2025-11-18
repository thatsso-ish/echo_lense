import { Plus } from 'lucide-react';
import { mockUsers } from '../../../data/mockData';

export function AdminDashboardUsers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">All Users</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors font-medium">
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
            <div className="flex items-start gap-4">
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <p className="text-lime-400 text-sm">{user.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{user.specialty}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{user.userRole}</span>
                  <span>•</span>
                  <span>{user.projectsCount} projects</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
