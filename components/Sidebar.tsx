import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ icon: JSX.Element, label: View, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    // FIX: Replaced custom theme colors with standard Tailwind classes
    className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-slate-100 hover:text-gray-800'
    }`}
  >
    {React.cloneElement(icon, { className: 'h-6 w-6' })}
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const DashboardIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* FIX: Replaced custom theme colors with standard Tailwind classes */}
      <aside className={`w-64 bg-white text-gray-800 p-4 flex flex-col h-screen fixed top-0 left-0 z-40 transform transition-transform md:static md:transform-none md:flex shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center space-x-2 mb-10 px-2">
          {/* FIX: Replaced custom theme color with standard Tailwind class */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
          {/* FIX: Replaced custom theme color with standard Tailwind class */}
          <h1 className="text-2xl font-bold text-gray-800">SOWER</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavItem 
            icon={DashboardIcon} 
            label={View.Dashboard} 
            isActive={currentView === View.Dashboard} 
            onClick={() => {
              setView(View.Dashboard);
              setIsOpen(false);
            }} 
          />
          {/* Add more NavItems here for future views */}
        </nav>
        {/* FIX: Replaced custom theme color with standard Tailwind class */}
        <div className="mt-auto text-xs text-center text-gray-500">
          <p>&copy; 2024 SOWER</p>
          <p>Gestion financière éclairée.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
