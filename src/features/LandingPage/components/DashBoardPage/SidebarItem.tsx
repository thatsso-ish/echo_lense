export function SidebarItem({ item, activeView, onClick, isHovered }: any) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg transition-colors ${
        isHovered ? 'w-full px-4 py-3' : 'justify-center w-12 h-12'
      } ${
        activeView === item.id
          ? 'bg-lime-400 text-zinc-900'
          : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      {isHovered && <span className="font-medium">{item.label}</span>}
    </button>
  );
}
