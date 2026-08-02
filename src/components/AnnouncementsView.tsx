import React from 'react';
import { Announcement } from '../types';
import { Megaphone, Pin, Calendar, UserCheck } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ announcements }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-fadeIn font-mono">
      {/* Header */}
      <div className="bg-cyan-200 p-10 rounded-none border-8 border-dashed border-purple-900 shadow-2xl rotate-2 -ml-6 mr-4">
        <h1 className="text-4xl font-black text-black font-serif uppercase underline tracking-widest flex items-center gap-4">
          <Megaphone className="w-10 h-10 animate-bounce text-red-600" />
          <span>!!! Chapter Notices & Announcements !!!</span>
        </h1>
        <p className="text-sm font-bold text-red-600 mt-2 bg-yellow-100 p-2 border border-black rotate-1 inline-block">
          OFFICIAL CIRCULARS, COMPETITION ALERTS, AND CHAPTER MANAGEMENT NEWS FOR THE SLOPPY!
        </p>
      </div>

      <div className="space-y-12">
        {announcements.map((ann, idx) => (
          <div
            key={ann.id}
            className={`p-10 border-8 shadow-2xl transition-all relative overflow-visible ${
              ann.pinned 
                ? 'border-red-600 bg-yellow-100 rotate-3 -skew-y-1' 
                : 'border-black bg-pink-100 -rotate-3 skew-x-1'
            } ${idx % 3 === 0 ? 'bg-cyan-100' : idx % 3 === 1 ? 'bg-yellow-200' : 'bg-lime-200'}`}
            style={{
              borderStyle: idx % 3 === 0 ? 'dashed' : idx % 3 === 1 ? 'dotted' : 'double',
              borderRadius: idx % 2 === 0 ? '0px' : '40px 10px 50px 5px',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-black pb-4 -mt-4 bg-white p-4 rotate-1 border-dotted">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black px-4 py-2 border-2 border-black uppercase ${
                    ann.category === 'Important' ? 'bg-red-600 text-yellow-200 rotate-6' : 'bg-yellow-300 text-black -rotate-6'
                  }`}>
                    {ann.category}
                  </span>
                  {ann.pinned && (
                    <span className="text-xs font-black bg-purple-900 text-yellow-300 px-4 py-2 border-2 border-black flex items-center gap-2 -rotate-2">
                      <Pin className="w-4 h-4 text-pink-400 animate-pulse" /> PINNED !!!
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-black text-black font-serif uppercase tracking-tight -ml-2">{ann.title}</h2>
              </div>

              <span className="text-xs font-black text-white bg-black px-4 py-2 rotate-12">{ann.date}</span>
            </div>

            <p className="text-sm text-black leading-relaxed mt-6 bg-white p-6 border-4 border-dashed border-red-500 rotate-1">
              {ann.content}
            </p>

            <div className="mt-8 pt-4 border-t-4 border-black border-dotted flex items-center justify-between text-xs text-black font-extrabold bg-yellow-300 p-4 -mb-4 -mr-4 -rotate-2 border-double">
              <span className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-red-600" />
                <span>ISSUED BY: <strong className="underline text-purple-900">{ann.authorName}</strong> ({ann.authorRole})</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
