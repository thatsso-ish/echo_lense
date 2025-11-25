import { Search } from 'lucide-react';

export function ProjectsSearch({ searchQuery, setSearchQuery }: any) {
  return (
    <div className="relative max-w-xl mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
      />
    </div>
  );
}
