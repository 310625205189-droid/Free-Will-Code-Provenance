import React from 'react';
import { LayoutDashboard, Calendar, FolderGit2, Users, User, Megaphone, LogOut, Award, Briefcase, BookOpen } from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserType | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events & Workshops', icon: Calendar },
    { id: 'projects', label: 'Member Projects', icon: FolderGit2 },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'resources', label: 'Learning Resources', icon: BookOpen },
    { id: 'members', label: 'Member Directory', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'profile', label: 'My Profile', icon: User },
  ];


  return (
    <aside className="w-72 bg-gradient-to-b from-purple-900 via-lime-400 to-pink-600 text-black flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)] shadow-2xl hidden md:flex border-r-8 border-dashed border-red-600 rotate-1 -ml-4 z-20 font-mono">
      <div className="p-2 space-y-10">
        {/* Chapter Info Badge */}
        <div className="bg-yellow-300 rounded-none p-6 border-8 border-dotted border-black -rotate-6 ml-4 shadow-xl">
          <div className="flex items-center gap-2 text-black text-xs font-black uppercase mb-2">
            <Award className="w-6 h-6 text-red-600 animate-bounce" />
            <span>IET Student Chapter (SLOPPY)</span>
          </div>
          <p className="text-base font-black text-purple-950 uppercase underline">
            {user ? user.institution : 'Connect & Collaborate'}
          </p>
          {user && (
            <div className="mt-4 pt-2 border-t-4 border-black flex items-center justify-between text-xs text-black font-extrabold">
              <span>Points: <strong className="text-red-600 font-black text-lg">{user.points || 100}</strong></span>
              <span className="capitalize px-3 py-1 rounded-none bg-black text-yellow-300 text-xs font-black rotate-6">{user.role}</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-4 pr-4">
          <p className="px-4 text-xs font-black text-black uppercase tracking-widest mb-4 bg-white p-2 border-2 border-black rotate-3 inline-block">*** MAIN NAVIGATION !!! ***</p>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-none text-base font-black uppercase transition-all text-left border-4 border-black ${
                  isActive
                    ? 'bg-yellow-300 text-black font-black shadow-2xl translate-x-6 -rotate-3'
                    : 'bg-white/80 text-purple-950 hover:bg-black hover:text-yellow-300 rotate-2'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-red-600' : 'text-black'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-6 border-t-8 border-black bg-yellow-400 rotate-2">
        {user ? (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-none bg-red-600 hover:bg-black text-yellow-300 border-4 border-black text-sm font-black uppercase transition-all -rotate-3 shadow-2xl"
          >
            <LogOut className="w-6 h-6" />
            <span>SIGN OUT ACCOUNT NOW</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('auth')}
            className="w-full py-4 rounded-none bg-black text-yellow-300 font-black text-sm hover:bg-red-600 transition-colors shadow-2xl border-4 border-white rotate-3"
          >
            SIGN IN TO PORTAL NOW!
          </button>
        )}
      </div>
    </aside>
  );
};
