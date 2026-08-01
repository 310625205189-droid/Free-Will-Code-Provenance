import React from 'react';
import { User } from '../types';
import { ShieldCheck, LogOut, Search, Bell, Sparkles, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand & Mobile Title */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#622569] to-[#9b51e0] flex items-center justify-center text-white font-bold shadow-md shadow-purple-900/10 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5.5 h-5.5 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-none font-['Poppins']">IET CONNECT</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-purple-100 text-[#622569] rounded">Portal</span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">Institution of Engineering and Technology</p>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events, projects, members..."
          className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-[#9b51e0] focus:ring-2 focus:ring-[#9b51e0]/20 outline-none transition-all"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button
              onClick={() => setActiveTab('announcements')}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full ring-2 ring-white"></span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors text-left group"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={user.username}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-purple-100 group-hover:ring-[#9b51e0] transition-all"
                />
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{user.username}</p>
                    {user.role === 'lead' && (
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" title="Chapter Lead" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[130px]">{user.institution.split('-')[0]}</p>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setActiveTab('auth')}
            className="flex items-center gap-2 bg-[#622569] hover:bg-[#9b51e0] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            <UserIcon className="w-4 h-4" />
            <span>Login / Register</span>
          </button>
        )}
      </div>
    </header>
  );
};
