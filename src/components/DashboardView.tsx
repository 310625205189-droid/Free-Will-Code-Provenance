import React from 'react';
import { User, Event, Project, Announcement } from '../types';
import { Calendar, FolderGit2, Award, ArrowUpRight, Megaphone, CheckCircle2, Sparkles, MapPin, Clock, PlusCircle, Briefcase, BookOpen } from 'lucide-react';


interface DashboardViewProps {
  user: User;
  events: Event[];
  projects: Project[];
  announcements: Announcement[];
  setActiveTab: (tab: string) => void;
  onRegisterEvent: (eventId: string) => void;
  onLikeProject: (projectId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  events,
  projects,
  announcements,
  setActiveTab,
  onRegisterEvent,
  onLikeProject,
}) => {
  const registeredEvents = events.filter(e => e.registeredUserIds.includes(user.id));
  const userProjects = projects.filter(p => p.authorId === user.id);
  const upcomingEvents = events.slice(0, 3);
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#622569] via-[#7d2f86] to-[#9b51e0] p-8 text-white shadow-xl shadow-purple-950/10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-purple-200 border border-white/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>IET Student Member Portal</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold font-['Poppins'] tracking-tight">
            Welcome back, {user.username}!
          </h1>
          <p className="text-purple-100/90 text-sm mt-2 max-w-2xl leading-relaxed">
            You are connected as an active member of <strong>{user.institution}</strong>. Stay updated with upcoming engineering workshops, submit your projects, and network with chapter peers.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('events')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#622569] hover:bg-purple-50 font-bold text-xs shadow transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#622569]" />
              <span>Explore Events</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Member Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-amber-300" />
              <span>Opportunities</span>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Learning Resources</span>
            </button>
          </div>

        </div>

        {/* Stats Grid Overlay */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <p className="text-xs text-purple-200 font-medium">Registered Events</p>
            <p className="text-2xl font-bold mt-1">{registeredEvents.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <p className="text-xs text-purple-200 font-medium">Projects Published</p>
            <p className="text-2xl font-bold mt-1">{userProjects.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <p className="text-xs text-purple-200 font-medium">Chapter Points</p>
            <p className="text-2xl font-bold mt-1 text-amber-300">{user.points || 100}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <p className="text-xs text-purple-200 font-medium">Role Badge</p>
            <p className="text-sm font-bold mt-2 capitalize text-purple-100">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Grid Section: Announcements & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Upcoming Events & Projects */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Events Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Poppins']">Upcoming Chapter Events</h3>
                <p className="text-xs text-slate-500">Register for workshops, guest lectures & hackathons</p>
              </div>
              <button
                onClick={() => setActiveTab('events')}
                className="text-xs font-semibold text-[#622569] hover:text-[#9b51e0] flex items-center gap-1"
              >
                <span>View All ({events.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map((evt) => {
                const isReg = evt.registeredUserIds.includes(user.id);
                return (
                  <div key={evt.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="h-32 relative overflow-hidden">
                        <img src={evt.bannerUrl} alt={evt.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-[#622569] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {evt.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{evt.title}</h4>
                        <div className="flex flex-col gap-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>{evt.date} • {evt.time}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="truncate">{evt.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => onRegisterEvent(evt.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isReg
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-[#622569] text-white hover:bg-[#9b51e0]'
                        }`}
                      >
                        {isReg ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Registered</span>
                          </>
                        ) : (
                          <span>Register Seat</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Projects Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Poppins']">Member Innovation Gallery</h3>
                <p className="text-xs text-slate-500">Recent projects engineered by chapter students</p>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-[#622569] hover:text-[#9b51e0] flex items-center gap-1"
              >
                <span>Explore Showcase</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProjects.map((proj) => {
                const isLiked = proj.likedByUserIds.includes(user.id);
                return (
                  <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#622569] bg-purple-100 px-2 py-0.5 rounded-md">
                          {proj.domain}
                        </span>
                        <button
                          onClick={() => onLikeProject(proj.id)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 ${
                            isLiked ? 'bg-purple-100 text-[#622569]' : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span>★ {proj.likes}</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{proj.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{proj.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                      <span>By <strong>{proj.authorName}</strong></span>
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[#622569] font-medium hover:underline">
                        GitHub →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Announcements & Quick Member Profile Summary */}
        <div className="space-y-6">
          
          {/* Chapter Announcements Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Official Notices</h3>
                <p className="text-[11px] text-slate-500">From Chapter Leadership</p>
              </div>
            </div>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ann.category === 'Important' ? 'bg-rose-100 text-rose-700' : 'bg-purple-100 text-[#622569]'
                    }`}>
                      {ann.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{ann.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Member Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#2b0f30] text-white p-6 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-400"
              />
              <div>
                <h4 className="font-bold text-sm text-white">{user.username}</h4>
                <p className="text-xs text-purple-200 truncate max-w-[180px]">{user.email}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10">
              <p>📍 <strong>City:</strong> {user.city || 'Not specified'}</p>
              <p>📱 <strong>Phone:</strong> {user.phone || 'Not specified'}</p>
              <p>🎓 <strong>Institution:</strong> {user.institution}</p>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow"
            >
              Manage Full Profile
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
