import React from 'react';
import { Announcement } from '../types';
import { Megaphone, Pin, Calendar, UserCheck } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ announcements }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 font-['Poppins']">Chapter Notices & Announcements</h1>
        <p className="text-xs text-slate-500 mt-1">Official circulars, competition alerts, and chapter management news</p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`bg-white rounded-3xl p-6 border shadow-sm transition-all ${
              ann.pinned ? 'border-[#9b51e0] ring-1 ring-[#9b51e0]/20' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                    ann.category === 'Important' ? 'bg-rose-100 text-rose-700' : 'bg-purple-100 text-[#622569]'
                  }`}>
                    {ann.category}
                  </span>
                  {ann.pinned && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Pin className="w-3 h-3 text-amber-600" /> Pinned
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900 font-['Poppins']">{ann.title}</h2>
              </div>

              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{ann.date}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {ann.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Issued by: <strong>{ann.authorName}</strong> ({ann.authorRole})</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
