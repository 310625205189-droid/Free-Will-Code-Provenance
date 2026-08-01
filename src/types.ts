export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  institution: string;
  role: 'member' | 'lead' | 'admin';
  bio?: string;
  skills?: string[];
  interests?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  points?: number;
  joinedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Hackathon' | 'Workshop' | 'Webinar' | 'Guest Lecture' | 'Conference';
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  speaker?: string;
  speakerRole?: string;
  organizer: string;
  bannerUrl: string;
  maxCapacity: number;
  registeredUserIds: string[];
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  domain: 'AI / ML' | 'Web Development' | 'IoT & Embedded' | 'Robotics' | 'Cybersecurity' | 'Mobile App';
  authorId: string;
  authorName: string;
  authorInstitution: string;
  teamMembers: string[];
  githubUrl: string;
  demoUrl?: string;
  likes: number;
  likedByUserIds: string[];
  tags: string[];
  createdAt: string;
  imageUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Important' | 'Event Alert' | 'Achievement' | 'General';
  authorName: string;
  authorRole: string;
  date: string;
  pinned: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}
