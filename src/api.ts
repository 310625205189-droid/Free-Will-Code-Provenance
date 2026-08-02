import { User, Event, Project, Announcement, Opportunity, Resource, AuthResponse } from './types';


const TOKEN_KEY = 'iet_auth_token';

let memoryToken: string | null = null;

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || memoryToken;
  } catch (err) {
    console.warn('Storage access denied (running in sandboxed iframe?), falling back to memory storage:', err);
    return memoryToken;
  }
}

export function setStoredToken(token: string, remember: boolean = true): void {
  memoryToken = token;
  try {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  } catch (err) {
    console.warn('Storage write denied, using memory storage only:', err);
  }
}

export function removeStoredToken(): void {
  memoryToken = null;
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.warn('Storage delete denied, using memory storage only:', err);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Auth
  async register(data: {
    username: string;
    email: string;
    password: string;
    phone?: string;
    gender?: string;
    dob?: string;
    city?: string;
    institution?: string;
  }): Promise<AuthResponse> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success && json.token) {
      setStoredToken(json.token);
    }
    return json;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (json.success && json.token) {
      setStoredToken(json.token);
    }
    return json;
  },

  async getMe(): Promise<{ success: boolean; user?: User; message?: string }> {
    const token = getStoredToken();
    if (!token) return { success: false, message: 'No token' };

    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async updateProfile(profileData: Partial<User>): Promise<{ success: boolean; user?: User; message?: string }> {
    const res = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return res.json();
  },

  // Directory
  async getMembers(): Promise<{ success: boolean; members: User[] }> {
    const res = await fetch('/api/members');
    return res.json();
  },

  // Events
  async getEvents(): Promise<{ success: boolean; events: Event[] }> {
    const res = await fetch('/api/events');
    return res.json();
  },

  async registerEvent(eventId: string): Promise<{ success: boolean; registered?: boolean; event?: Event; message?: string }> {
    const res = await fetch(`/api/events/${eventId}/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async createEvent(eventData: Partial<Event>): Promise<{ success: boolean; event?: Event; message?: string }> {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return res.json();
  },

  // Projects
  async getProjects(): Promise<{ success: boolean; projects: Project[] }> {
    const res = await fetch('/api/projects');
    return res.json();
  },

  async submitProject(projectData: Partial<Project>): Promise<{ success: boolean; project?: Project; message?: string }> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  async toggleLikeProject(projectId: string): Promise<{ success: boolean; liked?: boolean; likesCount?: number; project?: Project }> {
    const res = await fetch(`/api/projects/${projectId}/like`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Announcements
  async getAnnouncements(): Promise<{ success: boolean; announcements: Announcement[] }> {
    const res = await fetch('/api/announcements');
    return res.json();
  },

  // Opportunities
  async getOpportunities(): Promise<{ success: boolean; opportunities: Opportunity[] }> {
    const res = await fetch('/api/opportunities');
    return res.json();
  },

  async createOpportunity(oppData: Partial<Opportunity>): Promise<{ success: boolean; opportunity?: Opportunity; message?: string }> {
    const res = await fetch('/api/opportunities', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(oppData),
    });
    return res.json();
  },

  // Resources
  async getResources(): Promise<{ success: boolean; resources: Resource[] }> {
    const res = await fetch('/api/resources');
    return res.json();
  },

  async createResource(resData: Partial<Resource>): Promise<{ success: boolean; resource?: Resource; message?: string }> {
    const res = await fetch('/api/resources', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resData),
    });
    return res.json();
  }
};

