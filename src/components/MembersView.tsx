import React, { useState } from 'react';
import { User } from '../types';
import { Search, MapPin, Building, Mail, Github, Linkedin, ShieldCheck, User as UserIcon } from 'lucide-react';

interface MembersViewProps {
  members: User[];
  searchQuery: string;
}

export const MembersView: React.FC<MembersViewProps> = ({ members, searchQuery }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', ...Array.from(new Set(members.map(m => m.city).filter(Boolean)))];

  const filteredMembers = members.filter((m) => {
    const matchesCity = selectedCity === 'All' || m.city === selectedCity;
    const matchesSearch =
      !searchQuery ||
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.skills && m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-lime-200 p-10 rounded-none border-8 border-dashed border-red-500 shadow-2xl rotate-1 -ml-6 mr-4">
        <div>
          <h1 className="text-4xl font-black text-black font-serif uppercase underline tracking-wider">Member Directory !!!</h1>
          <p className="text-xs font-bold text-red-600 mt-2">Connect with student engineers, researchers & chapter leads in high-speed, messy style</p>
        </div>
      </div>

      {/* City Filters */}
      {cities.length > 1 && (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none rotate-1 ml-4 mr-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest border-4 border-black transition-all ${
                selectedCity === city
                  ? 'bg-purple-900 text-yellow-300 -rotate-3 translate-y-1 shadow-lg'
                  : 'bg-white text-black hover:bg-yellow-400 rotate-2'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredMembers.map((member, idx) => (
          <div
            key={member.id}
            className={`border-8 border-black p-8 shadow-2xl transition-all flex flex-col justify-between ${
              idx % 3 === 0 ? '-rotate-3 bg-pink-100' : idx % 3 === 1 ? 'rotate-3 bg-yellow-100' : '-rotate-1 bg-cyan-100'
            }`}
            style={{
              borderStyle: idx % 2 === 0 ? 'solid' : 'dashed',
              borderRadius: idx % 3 === 0 ? '0px' : idx % 3 === 1 ? '30px' : '15px 50px 0px 50px'
            }}
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <img
                  src={member.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={member.username}
                  className="w-20 h-20 rounded-none object-cover border-4 border-black -rotate-6 shadow-md"
                  referrerPolicy="no-referrer"
                />

                <span className={`text-xs font-black px-4 py-2 border-2 border-black rotate-12 uppercase ${
                  member.role === 'lead' ? 'bg-red-600 text-white' : 'bg-white text-black'
                }`}>
                  {member.role}
                </span>
              </div>

              <div className="bg-white p-4 border-2 border-dashed border-purple-900 -rotate-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-black text-xl font-serif uppercase tracking-tight">{member.username}</h3>
                  {member.role === 'lead' && (
                    <ShieldCheck className="w-6 h-6 text-red-600 animate-pulse shrink-0" title="Chapter Lead" />
                  )}
                </div>
                <p className="text-xs text-black font-mono font-bold mt-1 underline">{member.institution}</p>
              </div>

              <div className="space-y-2 text-xs text-black font-bold pt-4 border-t-4 border-black border-dotted">
                <p className="flex items-center gap-2 bg-yellow-200 p-2 border border-black rotate-1">
                  <Mail className="w-4 h-4 text-red-600 shrink-0 animate-bounce" />
                  <span className="truncate">{member.email}</span>
                </p>
                {member.city && (
                  <p className="flex items-center gap-2 bg-lime-300 p-2 border border-black -rotate-1">
                    <MapPin className="w-4 h-4 text-purple-900 shrink-0" />
                    <span>{member.city}</span>
                  </p>
                )}
              </div>

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {member.skills.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] font-black bg-black text-yellow-300 px-3 py-1 border border-black uppercase rotate-2">
                      #{s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="pt-6 mt-6 border-t-4 border-black border-dashed flex items-center justify-between text-xs text-black font-extrabold bg-white p-4 -mx-4 -mb-4 rotate-1 border-double">
              <span>Points: <strong className="text-red-600 text-lg underline font-black">{member.points || 50}</strong></span>

              <div className="flex items-center gap-3">
                {member.githubUrl && (
                  <a href={member.githubUrl} target="_blank" rel="noreferrer" className="text-black hover:text-red-600 transition-colors p-1 border-2 border-black bg-yellow-200 rotate-6">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="text-black hover:text-blue-600 transition-colors p-1 border-2 border-black bg-cyan-200 -rotate-6">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
