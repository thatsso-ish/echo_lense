import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className={`text-2xl font-light text-white hover:text-lime-400 transition-colors ${
            isHovered ? '' : 'mx-auto'
          }`}
        >
          <span className="font-medium">creative</span>hub
        </button>
        {isHovered && (
          <div className="ml-2">
            <p className="text-sm text-gray-500">{displayName}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-medium capitalize">
              {role} {demoMode && '(Preview)'}
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2 space-y-2">
        {/* render main items except account/settings */}
        {menuItems
          .filter((it: any) => it.id !== 'account' && it.id !== 'settings')
          .map((item: any) => (
            <SidebarItem
              key={item.id}
              item={item}
              activeView={activeView}
              isHovered={isHovered}
              onClick={() => setActiveView(item.id)}
            />
          ))}
      </nav>

      <div className="p-3 border-t border-zinc-800">
        <div className="mb-3">
          {/* Render account/settings at the bottom area */}
          {menuItems
            .filter((it: any) => it.id === 'account' || it.id === 'settings')
            .map((item: any) => (
              <div key={item.id} className="mb-2">
                <SidebarItem
                  item={item}
                  activeView={activeView}
                  isHovered={isHovered}
                  onClick={() => setActiveView(item.id)}
                />
              </div>
            ))}
        </div>

        <button
          onClick={onSignOut}
          className={`w-full flex items-center gap-3 rounded-lg text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors ${
            isHovered ? 'px-4 py-3' : 'justify-center w-12 h-12'
          }`}
        >
          <LogOut size={20} />
          {isHovered && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
