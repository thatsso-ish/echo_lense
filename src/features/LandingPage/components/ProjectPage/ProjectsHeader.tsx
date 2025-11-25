export function ProjectsHeader({ onNavigate }: { onNavigate: any }) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-6xl md:text-7xl font-light text-white mb-4">
          Latest <span className="font-semibold text-lime-400">projects</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Explore our diverse portfolio spanning web, mobile, design, 3D, animation, and beyond
        </p>
      </div>

      <button
        onClick={() => onNavigate('home')}
        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-zinc-900 transition-all font-medium"
      >
        See all projects
      </button>
    </div>
  );
}
