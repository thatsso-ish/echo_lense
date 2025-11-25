import { LogOut } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

export function Sidebar({
  role,
  displayName,
  demoMode,
  menuItems,
  activeView,
  setActiveView,
  onSignOut,
  onNavigate,
}: any) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <button
          onClick={() => onNavigate('home')}
          className="text-2xl font-light text-white hover:text-lime-400 transition-colors"
        >
          <span className="font-medium">creative</span>hub
        </button>
        <p className="text-sm text-gray-500 mt-2">{displayName}</p>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-medium capitalize">
          {role} {demoMode && '(Preview)'}
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item: any) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeView={activeView}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">{demoMode ? 'Exit Preview' : 'Sign Out'}</span>
        </button>
      </div>
    </div>
  );
}
