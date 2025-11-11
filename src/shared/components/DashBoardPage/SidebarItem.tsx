export function SidebarItem({ item, activeView, onClick }: any) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeView === item.id
          ? 'bg-lime-400 text-zinc-900'
          : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{item.label}</span>
    </button>
  );
}
