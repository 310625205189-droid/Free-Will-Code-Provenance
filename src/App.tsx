import React, { useState, useEffect } from 'react';
import { User, Event, Project, Announcement, Opportunity, Resource } from './types';
import { api, removeStoredToken } from './api';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthView } from './components/AuthView';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { EventsView } from './components/EventsView';
import { ProjectsView } from './components/ProjectsView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { ResourcesView } from './components/ResourcesView';
import { MembersView } from './components/MembersView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Data state from Express backend
  const [events, setEvents] = useState<Event[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch initial data
  const loadAppData = async () => {
    try {
      const [evtRes, projRes, annRes, memRes, oppRes, resRes] = await Promise.all([
        api.getEvents(),
        api.getProjects(),
        api.getAnnouncements(),
        api.getMembers(),
        api.getOpportunities(),
        api.getResources()
      ]);

      if (evtRes.success) setEvents(evtRes.events);
      if (projRes.success) setProjects(projRes.projects);
      if (annRes.success) setAnnouncements(annRes.announcements);
      if (memRes.success) setMembers(memRes.members);
      if (oppRes.success) setOpportunities(oppRes.opportunities);
      if (resRes.success) setResources(resRes.resources);
    } catch (err) {
      console.error('Failed to load portal data from backend', err);
    }
  };


  // Check auth on boot
  useEffect(() => {
    const initAuth = async () => {
      try {
        const meRes = await api.getMe();
        if (meRes.success && meRes.user) {
          setCurrentUser(meRes.user);
        }
      } catch (err) {
        console.warn('No active auth session', err);
      } finally {
        setAuthChecking(false);
      }
    };

    initAuth();
    loadAppData();
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
    showToast(`Welcome to IET CONNECT, ${user.username}!`);
    loadAppData();
  };

  const handleLogout = () => {
    removeStoredToken();
    setCurrentUser(null);
    setActiveTab('auth');
    showToast('Signed out successfully.');
  };

  // Event Registration Handler
  const handleRegisterEvent = async (eventId: string) => {
    if (!currentUser) {
      setActiveTab('auth');
      showToast('Please sign in to register for events.', 'error');
      return;
    }

    try {
      const res = await api.registerEvent(eventId);
      if (res.success && res.event) {
        setEvents(events.map(e => e.id === eventId ? res.event! : e));
        showToast(res.message || 'Event status updated!');
      } else {
        showToast(res.message || 'Action failed', 'error');
      }
    } catch {
      showToast('Error communicating with backend server', 'error');
    }
  };

  // Like Project Handler
  const handleLikeProject = async (projectId: string) => {
    if (!currentUser) {
      setActiveTab('auth');
      showToast('Please sign in to star projects.', 'error');
      return;
    }

    try {
      const res = await api.toggleLikeProject(projectId);
      if (res.success && res.project) {
        setProjects(projects.map(p => p.id === projectId ? res.project! : p));
      }
    } catch {
      showToast('Error liking project', 'error');
    }
  };

  // Submit Project Handler
  const handleSubmitProject = async (projectData: Partial<Project>): Promise<boolean> => {
    try {
      const res = await api.submitProject(projectData);
      if (res.success && res.project) {
        setProjects([res.project, ...projects]);
        showToast('Project submitted to showcase!');
        return true;
      } else {
        showToast(res.message || 'Submission failed', 'error');
        return false;
      }
    } catch {
      showToast('Error submitting project', 'error');
      return false;
    }
  };

  // Create Event Handler
  const handleCreateEvent = async (eventData: Partial<Event>): Promise<boolean> => {
    try {
      const res = await api.createEvent(eventData);
      if (res.success && res.event) {
        setEvents([res.event, ...events]);
        showToast('Event hosted successfully!');
        return true;
      } else {
        showToast(res.message || 'Failed to create event', 'error');
        return false;
      }
    } catch {
      showToast('Server error creating event', 'error');
      return false;
    }
  };

  // Create Opportunity Handler
  const handleCreateOpportunity = async (oppData: Partial<Opportunity>): Promise<boolean> => {
    try {
      const res = await api.createOpportunity(oppData);
      if (res.success && res.opportunity) {
        setOpportunities([res.opportunity, ...opportunities]);
        showToast('Opportunity posted successfully!');
        return true;
      } else {
        showToast(res.message || 'Failed to post opportunity', 'error');
        return false;
      }
    } catch {
      showToast('Server error posting opportunity', 'error');
      return false;
    }
  };

  // Create Resource Handler
  const handleCreateResource = async (resData: Partial<Resource>): Promise<boolean> => {
    try {
      const res = await api.createResource(resData);
      if (res.success && res.resource) {
        setResources([res.resource, ...resources]);
        showToast('Resource shared successfully!');
        return true;
      } else {
        showToast(res.message || 'Failed to share resource', 'error');
        return false;
      }
    } catch {
      showToast('Server error sharing resource', 'error');
      return false;
    }
  };


  // Update Profile Handler
  const handleUpdateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      const res = await api.updateProfile(profileData);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        showToast('Profile updated successfully!');
        loadAppData();
        return true;
      } else {
        showToast(res.message || 'Profile update failed', 'error');
        return false;
      }
    } catch {
      showToast('Error updating profile', 'error');
      return false;
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <Loader2 className="w-8 h-8 text-[#9b51e0] animate-spin mb-3" />
        <p className="text-sm font-semibold tracking-wide font-['Poppins']">Connecting to IET Portal Backend...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-['Plus_Jakarta_Sans']">
      
      {/* Navbar */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Body */}
      <div className="flex flex-1 relative">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={currentUser}
          onLogout={handleLogout}
        />

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'auth' && (
            <AuthView onAuthSuccess={handleAuthSuccess} />
          )}

          {activeTab === 'dashboard' && (
            currentUser ? (
              <DashboardView
                user={currentUser}
                events={events}
                projects={projects}
                announcements={announcements}
                setActiveTab={setActiveTab}
                onRegisterEvent={handleRegisterEvent}
                onLikeProject={handleLikeProject}
              />
            ) : (
              <AuthView onAuthSuccess={handleAuthSuccess} />
            )
          )}

          {activeTab === 'events' && (
            <EventsView
              events={events}
              user={currentUser}
              onRegisterEvent={handleRegisterEvent}
              onCreateEvent={handleCreateEvent}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              user={currentUser}
              onLikeProject={handleLikeProject}
              onSubmitProject={handleSubmitProject}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              user={currentUser}
              onCreateOpportunity={handleCreateOpportunity}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'resources' && (
            <ResourcesView
              resources={resources}
              user={currentUser}
              onCreateResource={handleCreateResource}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'members' && (

            <MembersView
              members={members}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
            />
          )}

          {activeTab === 'profile' && (
            currentUser ? (
              <ProfileView
                user={currentUser}
                onUpdateProfile={handleUpdateProfile}
              />
            ) : (
              <AuthView onAuthSuccess={handleAuthSuccess} />
            )
          )}
        </main>
      </div>

      {/* Toast Notification Popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideUp">
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
