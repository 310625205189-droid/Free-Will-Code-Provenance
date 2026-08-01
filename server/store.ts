import fs from 'fs';
import path from 'path';
import { User, Event, Project, Announcement } from '../src/types.js';

interface DatabaseSchema {
  users: (User & { passwordHash: string })[];
  events: Event[];
  projects: Project[];
  announcements: Announcement[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_DATA: DatabaseSchema = {
  users: [
    {
      id: 'usr_demo',
      username: 'Venkat NS',
      email: 'venkatns2008@gmail.com',
      passwordHash: 'password123',
      phone: '+91 98765 43210',
      gender: 'Male',
      dob: '2004-05-15',
      city: 'Chennai',
      institution: 'IET Student Chapter - SRM Institute of Science and Technology',
      role: 'lead',
      bio: 'Full Stack Engineer & Tech Enthusiast passionate about building impactful community platforms and AI systems.',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Docker'],
      interests: ['AI Research', 'Open Source', 'Embedded Systems', 'IoT'],
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      points: 450,
      joinedAt: '2025-01-10'
    },
    {
      id: 'usr_sarah',
      username: 'Sarah Chen',
      email: 'sarah.chen@iet.org',
      passwordHash: 'password123',
      phone: '+91 91234 56789',
      gender: 'Female',
      dob: '2003-09-21',
      city: 'Bangalore',
      institution: 'IET Student Chapter - RV College of Engineering',
      role: 'member',
      bio: 'IoT Developer & Robotics enthusiast working on autonomous rover projects.',
      skills: ['Arduino', 'C++', 'Python', 'ROS', 'Circuit Design'],
      interests: ['Robotics', 'Space Tech', 'Autonomous Systems'],
      githubUrl: 'https://github.com',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      points: 320,
      joinedAt: '2025-02-01'
    }
  ],
  events: [
    {
      id: 'evt_1',
      title: 'IET National Hackathon 2026: AI for Social Good',
      description: 'A 36-hour nationwide hackathon bringing together students and engineers to tackle pressing challenges in healthcare, clean energy, and smart cities.',
      category: 'Hackathon',
      date: '2026-08-15',
      time: '09:00 AM - 09:00 PM',
      location: 'Auditorium A, Tech Campus & Online',
      isVirtual: false,
      speaker: 'Dr. Aris Thorne',
      speakerRole: 'Chief Innovation Officer, IET Global',
      organizer: 'IET Student Chapter Committee',
      bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      maxCapacity: 250,
      registeredUserIds: ['usr_demo', 'usr_sarah'],
      tags: ['AI/ML', 'Hackathon', 'Prizes', 'Networking'],
      status: 'upcoming'
    },
    {
      id: 'evt_2',
      title: 'Masterclass: Cloud Native Architecture & Microservices',
      description: 'Learn modern DevOps pipelines, Kubernetes orchestration, and scalable microservices patterns hands-on from industry architects.',
      category: 'Workshop',
      date: '2026-08-22',
      time: '02:00 PM - 05:00 PM',
      location: 'Zoom Virtual Hall 1',
      isVirtual: true,
      virtualLink: 'https://zoom.us/j/iet-connect-masterclass',
      speaker: 'Priya Sundaram',
      speakerRole: 'Principal Cloud Architect, AWS Tech Solutions',
      organizer: 'IET Technical Special Interest Group',
      bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      maxCapacity: 150,
      registeredUserIds: ['usr_demo'],
      tags: ['Cloud', 'DevOps', 'Kubernetes', 'Backend'],
      status: 'upcoming'
    },
    {
      id: 'evt_3',
      title: 'Robotics & Embedded Systems Hands-On Bootcamp',
      description: 'Build your own sensor-actuator feedback loop using ESP32 and MicroPython with live circuit debugging guidance.',
      category: 'Workshop',
      date: '2026-09-05',
      time: '10:00 AM - 04:00 PM',
      location: 'IoT Innovation Lab 302',
      isVirtual: false,
      speaker: 'Prof. Rajesh Kumar',
      speakerRole: 'Department of Mechatronics',
      organizer: 'IET Robotics Society',
      bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
      maxCapacity: 60,
      registeredUserIds: ['usr_sarah'],
      tags: ['Robotics', 'ESP32', 'MicroPython', 'Hardware'],
      status: 'upcoming'
    }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'Smart Solar-Powered Grid Monitor',
      tagline: 'An IoT telemetry system monitoring distributed solar panel efficiency in real-time.',
      description: 'Utilizes ESP32 microcontrollers with current sensors and MQTT protocol to stream voltage/current telemetry to a cloud dashboard with anomaly detection.',
      domain: 'IoT & Embedded',
      authorId: 'usr_sarah',
      authorName: 'Sarah Chen',
      authorInstitution: 'RV College of Engineering',
      teamMembers: ['Sarah Chen', 'Anand Kumar', 'Meera Nair'],
      githubUrl: 'https://github.com/iet-projects/smart-solar-grid',
      demoUrl: 'https://solar-monitor-demo.example.com',
      likes: 38,
      likedByUserIds: ['usr_demo'],
      tags: ['ESP32', 'MQTT', 'CleanEnergy', 'IoT'],
      createdAt: '2026-07-20',
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'proj_2',
      title: 'MedAssist AI: Emergency Triaging Assistant',
      tagline: 'AI-assisted medical symptom analyzer and preliminary triage router for rural clinics.',
      description: 'Leverages Gemini multimodal vision and NLP model to assist field healthcare workers in classifying medical urgency and generating diagnostic summaries.',
      domain: 'AI / ML',
      authorId: 'usr_demo',
      authorName: 'Venkat NS',
      authorInstitution: 'SRM Institute of Science and Technology',
      teamMembers: ['Venkat NS', 'Devi Prasad'],
      githubUrl: 'https://github.com/iet-projects/medassist-ai',
      demoUrl: 'https://medassist-ai-demo.example.com',
      likes: 64,
      likedByUserIds: ['usr_demo', 'usr_sarah'],
      tags: ['Gemini AI', 'Healthcare', 'React', 'NodeJS'],
      createdAt: '2026-07-28',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'
    }
  ],
  announcements: [
    {
      id: 'ann_1',
      title: 'Registration Open for Annual IET Student Paper Contest 2026',
      content: 'Submit your original engineering research papers by August 30th. Top papers will receive publication grants and presentation opportunities at the IET International Summit.',
      category: 'Important',
      authorName: 'IET Executive Council',
      authorRole: 'Chapter Management',
      date: '2026-07-29',
      pinned: true
    },
    {
      id: 'ann_2',
      title: 'New Member Mentorship Program Launched!',
      content: 'We are thrilled to launch the 1-on-1 industry mentorship drive. Senior members and alumni can now register as mentors to guide junior students in research and careers.',
      category: 'General',
      authorName: 'Student Activities Committee',
      authorRole: 'Mentorship Lead',
      date: '2026-07-25',
      pinned: false
    }
  ]
};

// Ensure data directory and file exist
export function initDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    return INITIAL_DATA;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse db.json, re-initializing', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    return INITIAL_DATA;
  }
}

export function saveDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db.json', err);
  }
}
