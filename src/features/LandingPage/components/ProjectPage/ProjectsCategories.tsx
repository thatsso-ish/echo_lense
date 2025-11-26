export function ProjectsCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category: any) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category.id
              ? 'bg-lime-400 text-zinc-900'
              : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
