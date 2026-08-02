import React, { useState } from 'react';
import { Resource, User } from '../types';
import { BookOpen, Download, ExternalLink, PlusCircle, Search, Sparkles, X, FileText, Video, Bookmark, Layers, Award } from 'lucide-react';

interface ResourcesViewProps {
  resources: Resource[];
  user: User | null;
  onCreateResource: (resData: Partial<Resource>) => Promise<boolean>;
  searchQuery: string;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  user,
  onCreateResource,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeline, setSelectedTimeline] = useState<'all' | 'present' | 'past' | 'future'>('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeResModal, setActiveResModal] = useState<Resource | null>(null);

  // New Resource Form State
  const [newResData, setNewResData] = useState({
    title: '',
    description: '',
    category: 'Engineering & Tech' as Resource['category'],
    type: 'E-Book' as Resource['type'],
    authorOrProvider: '',
    url: '',
    thumbnailUrl: '',
    level: 'All Levels' as Resource['level'],
    tagsStr: '',
    timeline: 'present' as 'past' | 'present' | 'future',
  });

  const categories = ['All', 'Engineering & Tech', 'Academic & Research', 'Career & Skill', 'IET Standards', 'Project Templates'];
  const timelines: { id: 'all' | 'present' | 'past' | 'future'; label: string }[] = [
    { id: 'all', label: 'All Resources' },
    { id: 'present', label: 'Current Library (Present)' },
    { id: 'past', label: 'Historical & Classics (Past)' },
    { id: 'future', label: 'Upcoming Guides (Future)' },
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const resTime = res.timeline || 'present';
    const matchesTimeline = selectedTimeline === 'all' || resTime === selectedTimeline;
    const matchesSearch =
      !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.authorOrProvider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesTimeline && matchesSearch;
  });

  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResData.title || !newResData.description || !newResData.url) return;

    const tags = newResData.tagsStr
      ? newResData.tagsStr.split(',').map(s => s.trim()).filter(Boolean)
      : [newResData.category, newResData.type];

    const ok = await onCreateResource({
      ...newResData,
      authorOrProvider: newResData.authorOrProvider || (user ? user.username : 'IET Member'),
      tags,
    });

    if (ok) {
      setShowShareModal(false);
      setNewResData({
        title: '',
        description: '',
        category: 'Engineering & Tech',
        type: 'E-Book',
        authorOrProvider: '',
        url: '',
        thumbnailUrl: '',
        level: 'All Levels',
        tagsStr: '',
        timeline: 'present',
      });
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-12 bg-lime-200 p-10 rounded-none border-8 border-dashed border-purple-900 shadow-2xl rotate-2 -ml-8 mr-4">
        <div>
          <h1 className="text-4xl font-black text-black font-serif uppercase underline">Engineering & Academic Resources !!!</h1>
          <p className="text-xs font-bold text-red-600 mt-2">Access curated IET standards, e-books, templates, research papers, and video lectures in messy style</p>
        </div>

        {user && (
          <button
            onClick={() => setShowShareModal(true)}
            className="px-8 py-6 bg-red-600 hover:bg-black text-yellow-300 font-black text-base rounded-none border-4 border-black shadow-2xl -rotate-12 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-6 h-6 animate-spin" />
            <span>SHARE RESOURCE NOW!!</span>
          </button>
        )}
      </div>

      {/* Timeline & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rotate-1 -ml-4">
        <div className="flex items-center gap-2 bg-purple-900 p-2 border-4 border-black rotate-1">
          {timelines.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTimeline(t.id)}
              className={`px-4 py-2 rounded-none text-xs font-black uppercase transition-all ${
                selectedTimeline === t.id
                  ? 'bg-yellow-300 text-black border-2 border-black -rotate-3 shadow'
                  : 'text-white hover:text-yellow-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -rotate-1 mr-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-none text-xs font-black uppercase whitespace-nowrap border-4 border-black transition-all ${
                selectedCategory === cat
                  ? 'bg-pink-500 text-white rotate-2'
                  : 'bg-white text-black hover:bg-yellow-300 -rotate-2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredResources.map((res, idx) => {
          const resTime = res.timeline || 'present';

          return (
            <div
              key={res.id}
              className={`border-8 border-black overflow-visible shadow-2xl flex flex-col justify-between group transition-all duration-300 ${
                idx % 3 === 0 ? '-rotate-3 bg-pink-100' : idx % 3 === 1 ? 'rotate-2 bg-cyan-100' : '-rotate-1 bg-yellow-100'
              }`}
              style={{
                borderStyle: idx % 3 === 0 ? 'solid' : idx % 3 === 1 ? 'dashed' : 'dotted',
                borderRadius: idx % 2 === 0 ? '0px' : '40px 10px 50px 5px',
              }}
            >
              <div>
                {/* Image / Thumbnail Banner */}
                <div className="h-44 relative overflow-hidden bg-slate-900 border-b-4 border-dashed border-black">
                  <img
                    src={res.thumbnailUrl || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80'}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
                    <span className="bg-yellow-400 border border-black text-black text-[10px] font-black px-3 py-1 rounded-none uppercase tracking-wider rotate-3">
                      {res.type}
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-none border border-black -rotate-3 ${
                      resTime === 'present'
                        ? 'bg-green-400 text-black'
                        : resTime === 'past'
                        ? 'bg-red-600 text-white'
                        : 'bg-purple-600 text-white'
                    }`}>
                      {resTime === 'present' ? '📚 CURRENT' : resTime === 'past' ? '🏛️ ARCHIVE' : '🔮 UPCOMING'}
                    </span>
                  </div>

                  <span className="absolute top-2 right-2 bg-black border border-white text-white text-[10px] font-black px-2.5 py-1">
                    {res.level}
                  </span>

                  <div className="absolute bottom-2 left-2 right-2 text-white bg-black/70 p-1 border border-black">
                    <p className="text-[10px] text-purple-200 font-bold">By {res.authorOrProvider} {res.publishedYear ? `• (${res.publishedYear})` : ''}</p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <h3
                    onClick={() => setActiveResModal(res)}
                    className="font-black text-black text-lg font-serif uppercase tracking-tight hover:text-red-600 cursor-pointer line-clamp-2 underline"
                  >
                    {res.title}
                  </h3>

                  <p className="text-xs text-black font-mono leading-relaxed line-clamp-2">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {res.tags.map((t) => (
                      <span key={t} className="text-[10px] font-black bg-black text-white px-2 py-1 rotate-2">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 pt-0 border-t-4 border-black border-dashed flex items-center justify-between gap-3 mt-4 bg-yellow-300 p-4 -mx-4 -mb-4 rotate-1 border-double">
                <button
                  onClick={() => setActiveResModal(res)}
                  className="py-3 px-4 rounded-none text-xs font-black bg-white hover:bg-black hover:text-white border-2 border-black -rotate-3 shadow-lg"
                >
                  SUMMARY!!
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-5 rounded-none text-xs font-black bg-red-600 hover:bg-black text-white hover:text-yellow-300 border-2 border-black rotate-6 shadow-lg flex items-center gap-1.5"
                >
                  <span>{res.type === 'Video Course' ? 'WATCH COURSE' : res.type === 'Template' ? 'DOWNLOAD KIT' : 'ACCESS NOW!'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No resources match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try switching to "All Resources" or another category tab.</p>
        </div>
      )}

      {/* RESOURCE DETAILS MODAL */}
      {activeResModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveResModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#622569] bg-purple-100 px-3 py-1 rounded-full">
                  {activeResModal.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {activeResModal.type}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {activeResModal.level}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-['Poppins']">{activeResModal.title}</h2>
              <p className="text-xs font-semibold text-slate-500">By {activeResModal.authorOrProvider} {activeResModal.publishedYear ? `(${activeResModal.publishedYear})` : ''}</p>
            </div>

            <div className="h-56 rounded-2xl overflow-hidden relative border border-slate-200">
              <img src={activeResModal.thumbnailUrl} alt={activeResModal.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Overview & Learning Outcomes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{activeResModal.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeResModal.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveResModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
              <a
                href={activeResModal.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#622569] hover:bg-[#9b51e0] shadow-sm flex items-center gap-1.5"
              >
                <span>Access Resource Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SHARE RESOURCE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 font-['Poppins']">Share a Learning Resource</h2>

            <form onSubmit={handleShareSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={newResData.title}
                  onChange={(e) => setNewResData({ ...newResData, title: e.target.value })}
                  placeholder="e.g. Modern Power Electronics Design Handbook"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#9b51e0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newResData.category}
                    onChange={(e) => setNewResData({ ...newResData, category: e.target.value as Resource['category'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none"
                  >
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Academic & Research">Academic & Research</option>
                    <option value="Career & Skill">Career & Skill</option>
                    <option value="IET Standards">IET Standards</option>
                    <option value="Project Templates">Project Templates</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resource Type</label>
                  <select
                    value={newResData.type}
                    onChange={(e) => setNewResData({ ...newResData, type: e.target.value as Resource['type'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none"
                  >
                    <option value="E-Book">E-Book</option>
                    <option value="Video Course">Video Course</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Template">Template</option>
                    <option value="Kit">Kit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author / Publisher</label>
                  <input
                    type="text"
                    value={newResData.authorOrProvider}
                    onChange={(e) => setNewResData({ ...newResData, authorOrProvider: e.target.value })}
                    placeholder="e.g. Dr. R. Sharma / IET UK"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Level</label>
                  <select
                    value={newResData.level}
                    onChange={(e) => setNewResData({ ...newResData, level: e.target.value as Resource['level'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced / Research">Advanced / Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Link / URL *</label>
                <input
                  type="url"
                  required
                  value={newResData.url}
                  onChange={(e) => setNewResData({ ...newResData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover / Thumbnail Image URL</label>
                <input
                  type="url"
                  value={newResData.thumbnailUrl}
                  onChange={(e) => setNewResData({ ...newResData, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newResData.description}
                  onChange={(e) => setNewResData({ ...newResData, description: e.target.value })}
                  placeholder="Summarize the resource, table of contents, and who should read it..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#622569] hover:bg-[#9b51e0] shadow-sm"
                >
                  Share With Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
