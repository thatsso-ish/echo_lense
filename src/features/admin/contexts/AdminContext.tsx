import { createContext, useContext, useState } from 'react';

interface AdminContextProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState('overview');
  return <AdminContext.Provider value={{ activeView, setActiveView }}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminContext must be used within AdminProvider');
  return ctx;
};
