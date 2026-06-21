import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  TrendingUp,
  Award,
  Bookmark,
  GraduationCap,
  Flame,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookMarked,
  Layers,
  Clock,
  Volume2,
  Lock,
  ArrowRight,
  ListTodo,
  Crown,
  Headphones,
  PenTool,
  Mic,
  Play,
} from 'lucide-react';
import { ExamType, MockTest, SavedVocabulary, UserTestRecord } from './types';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ITPBot from './components/ITPBot';
import VocabularyPanel from './components/VocabularyPanel';
import InteractiveTestPanel from './components/InteractiveTestPanel';
import Footer from './components/Footer';
import StudyPlan from './components/StudyPlan';
import ToeflLessonsPage from './components/ToeflLessonsPage';
import BlogPage from './components/BlogPage';
import CommunityPage from './components/CommunityPage';
import FinderPage from './components/FinderPage';
import PlansPage from './components/PlansPage';
import VocabChartPage from './components/VocabChartPage';
import TestimonialsNeo from './components/TestimonialsNeo';

// Import data banks
import { IELTS_TESTS, TOEFL_TESTS, PTE_TESTS, STUDY_RESOURCES } from './data/questions';
import { CUSTOMER_REVIEWS } from './data/reviews';
import { PRACTICE_CARDS_DATA, getPracticeDrill, getToeflPracticeDrill, getToeflListeningDrill, getToeflWritingDrill, getToeflSpeakingDrill, LECTURES_DATA, LectureItem } from './data/practiceQuestions';

interface VegConfig {
  gradient: string;
  borderColor: string;
  textColor: string;
  takers: string;
  percentAboveSeven: string;
}

const VEGETABLE_THEMING: Record<string, VegConfig> = {
  'Captain Shield': {
    gradient: 'from-[#FFF0F0] to-[#FFE2E2]',
    borderColor: 'border-[#FFAEAE]',
    textColor: 'text-[#9E2A2B]',
    takers: '100,000+',
    percentAboveSeven: '20%'
  },
  'Crimson Bolt': {
    gradient: 'from-[#FFF8F2] to-[#FFECD5]',
    borderColor: 'border-[#FFC8A2]',
    textColor: 'text-[#D45B12]',
    takers: '48,000+',
    percentAboveSeven: '23%'
  },
  'Grand Sentinel': {
    gradient: 'from-[#FFFBEB] to-[#FEF3C7]',
    borderColor: 'border-[#FDE68A]',
    textColor: 'text-[#B45309]',
    takers: '48,000+',
    percentAboveSeven: '15%'
  },
  'Cosmic Force': {
    gradient: 'from-[#FAF7F2] to-[#F1ECE4]',
    borderColor: 'border-[#E2D8C9]',
    textColor: 'text-[#7A6348]',
    takers: '41,000+',
    percentAboveSeven: '23%'
  },
  'Aqua Strike': {
    gradient: 'from-[#F0FDF4] to-[#DCFCE7]',
    borderColor: 'border-[#BBF7D0]',
    textColor: 'text-[#15803D]',
    takers: '27,000+',
    percentAboveSeven: '20%'
  },
  'Cyber Titan': {
    gradient: 'from-[#FAF5FF] to-[#F3E8FF]',
    borderColor: 'border-[#E9D5FF]',
    textColor: 'text-[#7E22CE]',
    takers: '26,000+',
    percentAboveSeven: '17%'
  },
  'Blaze Vanguard': {
    gradient: 'from-[#FDF2F8] to-[#FCE7F3]',
    borderColor: 'border-[#FBCFE8]',
    textColor: 'text-[#BE185D]',
    takers: '23,000+',
    percentAboveSeven: '19%'
  },
  'Storm Ninja': {
    gradient: 'from-[#FDF4FF] to-[#FAE8FF]',
    borderColor: 'border-[#F5D0FE]',
    textColor: 'text-[#A21CAF]',
    takers: '18,000+',
    percentAboveSeven: '14%'
  },
  'Iron Dynamo': {
    gradient: 'from-[#F7FEE7] to-[#ECFCCB]',
    borderColor: 'border-[#D9F99D]',
    textColor: 'text-[#4D7C0F]',
    takers: '15,000+',
    percentAboveSeven: '25%'
  },
  'Shadow Ranger': {
    gradient: 'from-[#FFFDF5] to-[#F5EBE0]',
    borderColor: 'border-[#E6CCB2]',
    textColor: 'text-[#7F5539]',
    takers: '11,000+',
    percentAboveSeven: '20%'
  },
  'Apex Phoenix': {
    gradient: 'from-[#ECFDF5] to-[#D1FAE5]',
    borderColor: 'border-[#A7F3D0]',
    textColor: 'text-[#065F46]',
    takers: '7,700+',
    percentAboveSeven: '9%'
  },
};

interface FlowerTheme {
  bg: string;
  svg: React.ReactNode;
}

const renderSuperheroMascotSVG = (
  theme: 'blue' | 'rose' | 'amber' | 'emerald' | 'violet' | 'cyan' | 'indigo' | 'red' | 'orange' | 'fuchsia' | 'slate' | 'pink',
  headgear: 'cowl' | 'helmet' | 'wings' | 'visor' | 'crown' | 'goggles' | 'hood',
  emblem: 'star' | 'bolt' | 'shield' | 'heart' | 'atom' | 'leaf',
  size: 'small' | 'large' = 'small'
) => {
  const isLarge = size === 'large';
  const sizeClass = isLarge ? "w-20 h-20" : "w-12 h-12";
  
  const gradientId = `grad-${theme}-${headgear}-${emblem}-${isLarge ? 'l' : 's'}`;
  const faceGradId = `face-${theme}-${headgear}-${emblem}-${isLarge ? 'l' : 's'}`;
  const blushGradId = `blush-${theme}-${headgear}-${emblem}-${isLarge ? 'l' : 's'}`;
  const glassGradId = `glass-${theme}-${headgear}-${emblem}-${isLarge ? 'l' : 's'}`;

  const colors = {
    rose: { main: '#F43F5E', light: '#FB7185', dark: '#BE123C', eye: '#F43F5E' },
    blue: { main: '#3B82F6', light: '#60A5FA', dark: '#1E3A8A', eye: '#3B82F6' },
    amber: { main: '#F59E0B', light: '#FBBF24', dark: '#78350F', eye: '#F59E0B' },
    emerald: { main: '#10B981', light: '#34D399', dark: '#064E3B', eye: '#10B981' },
    violet: { main: '#8B5CF6', light: '#A78BFA', dark: '#4C1D95', eye: '#8B5CF6' },
    cyan: { main: '#06B6D4', light: '#22D3EE', dark: '#083344', eye: '#06B6D4' },
    indigo: { main: '#6366F1', light: '#818CF8', dark: '#312E81', eye: '#6366F1' },
    red: { main: '#EF4444', light: '#F87171', dark: '#991B1B', eye: '#EF4444' },
    orange: { main: '#F97316', light: '#FB923C', dark: '#7C2D12', eye: '#F97316' },
    fuchsia: { main: '#D946EF', light: '#E879F9', dark: '#701A75', eye: '#D946EF' },
    slate: { main: '#64748B', light: '#94A3B8', dark: '#334155', eye: '#64748B' },
    pink: { main: '#EC4899', light: '#F472B6', dark: '#831843', eye: '#EC4899' },
  }[theme];

  return (
    <svg className={`${sizeClass} drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] select-none`} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="60%" stopColor={colors.main} />
          <stop offset="100%" stopColor={colors.dark} />
        </linearGradient>
        <radialGradient id={faceGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2E8" />
          <stop offset="70%" stopColor="#FFE0CC" />
          <stop offset="100%" stopColor="#FFD2B8" />
        </radialGradient>
        <radialGradient id={blushGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF3366" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FF3366" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={glassGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F7FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#80D0FF" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Cape */}
      <path d="M 35 75 Q 15 105 50 112 Q 105 105 85 75 Z" fill={colors.dark} opacity="0.9" />
      <path d="M 40 78 Q 50 82 80 78" stroke={colors.light} strokeWidth="2.5" strokeLinecap="round" />

      {/* Body/Torso and shoulders */}
      <rect x="36" y="74" width="48" height="34" rx="16" fill={`url(#${gradientId})`} />
      
      {/* Arms on hips */}
      <path d="M 38 78 Q 24 88 34 94" stroke={`url(#${gradientId})`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 82 78 Q 96 88 86 94" stroke={`url(#${gradientId})`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

      {/* Face (Standard rounded head) */}
      <circle cx="60" cy="52" r="32" fill={`url(#${faceGradId})`} />

      {/* Rosy blush cheeks */}
      <circle cx="38" cy="62" r="8" fill={`url(#${blushGradId})`} />
      <circle cx="82" cy="62" r="8" fill={`url(#${blushGradId})`} />

      {/* Headgear/Mask details overlays */}
      {headgear === 'cowl' && (
        <>
          <path d="M 34 32 Q 22 2 34 18 Q 46 2 34 32" fill={colors.main} stroke={colors.dark} strokeWidth="1.5" />
          <path d="M 86 32 Q 98 2 86 18 Q 74 2 86 32" fill={colors.main} stroke={colors.dark} strokeWidth="1.5" />
          <path d="M 28 52 C 28 32, 92 32, 92 52 C 92 64, 82 64, 76 56 C 70 50, 50 50, 44 56 C 38 64, 28 64, 28 52 Z" fill={`url(#${gradientId})`} />
          <path d="M 44 32 Q 60 20 76 32" stroke={colors.light} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      {headgear === 'helmet' && (
        <>
          <path d="M 26 50 C 26 22, 94 22, 94 50 C 94 52, 26 52, 26 50 Z" fill={`url(#${gradientId})`} />
          <path d="M 26 48 L 34 68 Q 42 62 40 48" fill={colors.main} />
          <path d="M 94 48 L 86 68 Q 78 62 80 48" fill={colors.main} />
          <ellipse cx="60" cy="30" rx="20" ry="5" fill="#FFFFFF" opacity="0.35" />
        </>
      )}

      {headgear === 'wings' && (
        <>
          <path d="M 28 42 Q 6 36 12 18 Q 24 32 30 38" fill={colors.light} stroke={colors.dark} strokeWidth="2.5" />
          <path d="M 92 42 Q 114 36 108 18 Q 96 32 90 38" fill={colors.light} stroke={colors.dark} strokeWidth="2.5" />
          <path d="M 28 42 Q 60 30 92 42 L 86 54 Q 60 42 34 54 Z" fill={`url(#${gradientId})`} />
        </>
      )}

      {headgear === 'visor' && (
        <>
          <path d="M 28 40 C 28 20, 92 20, 92 40 Z" fill={colors.dark} />
          <path d="M 24 44 C 24 44, 40 41, 60 41 C 80 41, 96 44, 96 44 C 96 56, 80 58, 60 58 C 40 58, 24 56, 24 44 Z" fill={`url(#${glassGradId})`} stroke={colors.light} strokeWidth="2.5" />
          <path d="M 32 46 Q 60 44 88 46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </>
      )}

      {headgear === 'crown' && (
        <>
          <path d="M 30 38 L 42 16 L 60 28 L 78 16 L 90 38 Z" fill="url(#grad-amber-helmet-star-s)" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="42" cy="14" r="3" fill="#EF4444" />
          <circle cx="60" cy="26" r="3" fill="#3B82F6" />
          <circle cx="78" cy="14" r="3" fill="#10B981" />
          <path d="M 28 38 Q 60 44 92 38" stroke="url(#grad-amber-helmet-star-s)" strokeWidth="6" strokeLinecap="round" />
        </>
      )}

      {headgear === 'goggles' && (
        <>
          <path d="M 26 48 H 94" stroke="#1E293B" strokeWidth="4.5" />
          <circle cx="46" cy="48" r="16" fill={`url(#${glassGradId})`} stroke="#1E293B" strokeWidth="3" />
          <circle cx="74" cy="48" r="16" fill={`url(#${glassGradId})`} stroke="#1E293B" strokeWidth="3" />
          <circle cx="42" cy="42" r="3.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="70" cy="42" r="3.5" fill="#FFFFFF" opacity="0.9" />
        </>
      )}

      {headgear === 'hood' && (
        <>
          <path d="M 24 54 C 24 24, 96 24, 96 54 C 96 66, 88 64, 60 64 C 32 64, 24 66, 24 54 Z" fill={`url(#${gradientId})`} />
          <path d="M 34 52 C 34 32, 86 32, 86 52 Q 60 48 34 52 Z" fill="#FFEAE0" opacity="0.3" />
        </>
      )}

      {/* Eyes */}
      {headgear !== 'visor' && headgear !== 'goggles' && (
        <>
          <circle cx="48" cy="52" r="7.5" fill="#1A1A1A" />
          <circle cx="46.5" cy="49.5" r="3" fill="#FFFFFF" />
          <circle cx="50.5" cy="54.5" r="1" fill="#FFFFFF" />
          
          <circle cx="72" cy="52" r="7.5" fill="#1A1A1A" />
          <circle cx="70.5" cy="49.5" r="3" fill="#FFFFFF" />
          <circle cx="74.5" cy="54.5" r="1" fill="#FFFFFF" />
        </>
      )}

      {/* Mouth */}
      <path d="M 54 62 Q 60 66 66 62" stroke="#4A1E07" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 57 63.5 Q 60 68 63 63.5" fill="#FF5E7E" />

      {/* Chest Emblem badge */}
      <circle cx="60" cy="90" r="11" fill="#FFFFFF" />
      {emblem === 'star' && (
        <path d="M 60 84.5 L 61.6 88 L 65.3 88.3 L 62.5 90.7 L 63.3 94.4 L 60 92.5 L 56.7 94.4 L 57.5 90.7 L 54.7 88.3 L 58.4 88 Z" fill={colors.main} />
      )}
      {emblem === 'bolt' && (
        <polygon points="61,84 55,90 59,90 57,96 65,88 61,88" fill={colors.main} />
      )}
      {emblem === 'shield' && (
        <path d="M 55 86 C 55 86, 60 84, 65 86 C 65 91, 60 95, 60 95 C 60 95, 55 91, 55 86 Z" fill={colors.main} />
      )}
      {emblem === 'heart' && (
        <path d="M 60 94 C 60 94, 53 90, 53 87 C 53 84.5, 56.5 84.5, 60 87 C 63.5 84.5, 67 84.5, 67 87 L 67 87 C 67 90, 60 94, 60 94 Z" fill={colors.main} style={{ transformOrigin: "60px 89px" }} />
      )}
      {emblem === 'atom' && (
        <>
          <circle cx="60" cy="90" r="2.5" fill={colors.main} />
          <ellipse cx="60" cy="90" rx="7" ry="2.2" stroke={colors.main} strokeWidth="1" transform="rotate(30 60 90)" fill="none" />
          <ellipse cx="60" cy="90" rx="7" ry="2.2" stroke={colors.main} strokeWidth="1" transform="rotate(-30 60 90)" fill="none" />
        </>
      )}
      {emblem === 'leaf' && (
        <path d="M 60 84.5 C 64 84.5, 66 88.5, 60 94 C 54 88.5, 56 84.5, 60 84.5 Z" fill={colors.main} />
      )}
    </svg>
  );
};

const getFlowerStyle = (name: string): FlowerTheme => {
  switch (name) {
    case 'Spidey Kid':
      return { bg: 'bg-[#FFF0F3]', svg: renderSuperheroMascotSVG('rose', 'cowl', 'shield') };
    case 'Vortex':
      return { bg: 'bg-[#F3E8FF]', svg: renderSuperheroMascotSVG('violet', 'wings', 'atom') };
    case 'Zen Titan':
      return { bg: 'bg-[#EEF2FF]', svg: renderSuperheroMascotSVG('indigo', 'cowl', 'star') };
    case 'Glory Kid':
      return { bg: 'bg-[#FFFBEB]', svg: renderSuperheroMascotSVG('amber', 'goggles', 'heart') };
    case 'Vector Force':
      return { bg: 'bg-[#ECFDF5]', svg: renderSuperheroMascotSVG('cyan', 'visor', 'bolt') };
    case 'Steel Grip':
      return { bg: 'bg-[#F1F5F9]', svg: renderSuperheroMascotSVG('slate', 'helmet', 'shield') };
    case 'Frost Bite':
      return { bg: 'bg-[#E0F2FE]', svg: renderSuperheroMascotSVG('blue', 'hood', 'star') };
    case 'Ruby Ranger':
      return { bg: 'bg-[#FFF1F2]', svg: renderSuperheroMascotSVG('rose', 'cowl', 'heart') };
    case 'Nova Ray':
      return { bg: 'bg-[#FFF7ED]', svg: renderSuperheroMascotSVG('orange', 'visor', 'star') };
    case 'Aqua Jet':
      return { bg: 'bg-[#F0FDFA]', svg: renderSuperheroMascotSVG('cyan', 'goggles', 'leaf') };
    case 'Lumina':
      return { bg: 'bg-[#FFFDEB]', svg: renderSuperheroMascotSVG('amber', 'crown', 'heart') };
    default:
      return { bg: 'bg-slate-50', svg: renderSuperheroMascotSVG('slate', 'helmet', 'star') };
  }
};

const getPlanetStyle = (name: string): FlowerTheme => {
  switch (name) {
    case 'Hero Cadet':
      return { bg: 'bg-[#1F2937]', svg: renderSuperheroMascotSVG('blue', 'cowl', 'star') };
    case 'Aero Swift':
      return { bg: 'bg-[#ECFDF5]', svg: renderSuperheroMascotSVG('cyan', 'wings', 'bolt') };
    case 'Magma Guard':
      return { bg: 'bg-[#FEF2F2]', svg: renderSuperheroMascotSVG('red', 'helmet', 'shield') };
    case 'Sonic Wave':
      return { bg: 'bg-[#EEF2FF]', svg: renderSuperheroMascotSVG('blue', 'goggles', 'bolt') };
    case 'Solar Knight':
      return { bg: 'bg-[#FFFBEB]', svg: renderSuperheroMascotSVG('amber', 'crown', 'star') };
    case 'Bio Buster':
      return { bg: 'bg-[#FFF7ED]', svg: renderSuperheroMascotSVG('emerald', 'hood', 'leaf') };
    case 'Nebula Chaser':
      return { bg: 'bg-[#F8FAFC]', svg: renderSuperheroMascotSVG('violet', 'visor', 'star') };
    case 'Hyperion':
      return { bg: 'bg-[#FEF3C7]', svg: renderSuperheroMascotSVG('fuchsia', 'crown', 'atom') };
    case 'Infinity Star':
      return { bg: 'bg-[#F5F3FF]', svg: renderSuperheroMascotSVG('indigo', 'visor', 'star') };
    case 'Mirage':
      return { bg: 'bg-[#F1F5F9]', svg: renderSuperheroMascotSVG('slate', 'cowl', 'heart') };
    case 'Geo Titan':
      return { bg: 'bg-[#E0F2FE]', svg: renderSuperheroMascotSVG('emerald', 'helmet', 'atom') };
    case 'Bright Omega':
      return { bg: 'bg-[#FFFDEB]', svg: renderSuperheroMascotSVG('orange', 'crown', 'bolt') };
    default:
      return { bg: 'bg-slate-50', svg: renderSuperheroMascotSVG('slate', 'helmet', 'star') };
  }
};

const renderVegetableSVG = (name: string) => {
  switch (name) {
    case 'Captain Shield':
      return renderSuperheroMascotSVG('red', 'cowl', 'shield', 'large');
    case 'Crimson Bolt':
      return renderSuperheroMascotSVG('orange', 'wings', 'bolt', 'large');
    case 'Grand Sentinel':
      return renderSuperheroMascotSVG('amber', 'helmet', 'shield', 'large');
    case 'Cosmic Force':
      return renderSuperheroMascotSVG('indigo', 'visor', 'star', 'large');
    case 'Aqua Strike':
      return renderSuperheroMascotSVG('cyan', 'goggles', 'atom', 'large');
    case 'Cyber Titan':
      return renderSuperheroMascotSVG('violet', 'helmet', 'bolt', 'large');
    case 'Blaze Vanguard':
      return renderSuperheroMascotSVG('rose', 'hood', 'star', 'large');
    case 'Storm Ninja':
      return renderSuperheroMascotSVG('slate', 'cowl', 'bolt', 'large');
    case 'Iron Dynamo':
      return renderSuperheroMascotSVG('emerald', 'visor', 'atom', 'large');
    case 'Shadow Ranger':
      return renderSuperheroMascotSVG('slate', 'hood', 'shield', 'large');
    case 'Apex Phoenix':
      return renderSuperheroMascotSVG('fuchsia', 'wings', 'star', 'large');
    default:
      return renderSuperheroMascotSVG('slate', 'helmet', 'star', 'large');
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('Home');
  const [mockSubTab, setMockSubTab] = useState<'Mock Tests' | 'Real Reviews'>('Mock Tests');
  const [activeExam, setActiveExam] = useState<ExamType>('IELTS');
  const [selectedScoreRange, setSelectedScoreRange] = useState<string>('mid');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);

  // Reviews interactive states
  const [reviewsList, setReviewsList] = useState(CUSTOMER_REVIEWS);
  const [reviewExamFilter, setReviewExamFilter] = useState<'All' | 'IELTS' | 'TOEFL' | 'PTE'>('All');
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number>(0);
  const [newReviewFormOpen, setNewReviewFormOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewExam, setNewReviewExam] = useState<'IELTS' | 'TOEFL' | 'PTE'>('IELTS');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewScore, setNewReviewScore] = useState('');
  const [reviewPage, setReviewPage] = useState<number>(1);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  // Practice section interactive states
  const [practiceSection, setPracticeSection] = useState<'Listening' | 'Reading' | 'Writing' | 'Speaking'>('Reading');
  const [showAllPracticeCards, setShowAllPracticeCards] = useState<boolean>(true);

  // Topic-specific interactive slides & quiz lectures states
  const [selectedTopicLecture, setSelectedTopicLecture] = useState<LectureItem | null>(null);
  const [lectureSlideIdx, setLectureSlideIdx] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Other materials and purchase modal interactive states
  const [exercisesModalOpen, setExercisesModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [exerciseSlideIdx, setExerciseSlideIdx] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isExerciseAnswerSubmitted, setIsExerciseAnswerSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  
  const [selectedPurchaseTier, setSelectedPurchaseTier] = useState<'basic' | 'premium' | 'unlimited'>('premium');
  const [purchaseStep, setPurchaseStep] = useState<'tier' | 'checkout' | 'success'>('tier');
  const [promoCardNumber, setPromoCardNumber] = useState<string>('');

  // Test Records filters matching the screenshots
  const [logTypeFilter, setLogTypeFilter] = useState<'All Records' | 'Full Test' | 'Section Test' | 'Practice Question'>('All Records');
  const [logSectionFilter, setLogSectionFilter] = useState<'All Sections' | 'Reading' | 'Listening' | 'Writing' | 'Speaking'>('All Sections');

  // Floating chatbot itp states
  const [botChatOpen, setBotChatOpen] = useState(false);

  // In-depth Video Lectures virtual learning player modal states
  const [lectureModalOpen, setLectureModalOpen] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState<string>('l1');
  const [lecturePlaying, setLecturePlaying] = useState(false);

  // Persistent data states
  const [completedPracticeCount, setCompletedPracticeCount] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('itp_practice_completed_count');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [savedWords, setSavedWords] = useState<SavedVocabulary[]>(() => {
    const raw = localStorage.getItem('itp_saved_words');
    return raw ? JSON.parse(raw) : [];
  });

  const [userRecords, setUserRecords] = useState<UserTestRecord[]>(() => {
    const raw = localStorage.getItem('itp_user_records');
    return raw ? JSON.parse(raw) : [];
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    const raw = localStorage.getItem('itp_streak_count');
    return raw ? parseInt(raw, 10) : 5;
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(() => {
    return localStorage.getItem('itp_checked_in_today') === 'true';
  });

  // Track planner tasks checklists
  const [plannerChecked, setPlannerChecked] = useState<Record<string, Record<string, boolean>>>(() => {
    const raw = localStorage.getItem('itp_planner_checked');
    return raw ? JSON.parse(raw) : { IELTS: {}, TOEFL: {}, PTE: {} };
  });

  // Reading popup modal active resource State
  const [activeResource, setActiveResource] = useState<typeof STUDY_RESOURCES[number] | null>(null);

  // Sync states with localStorage
  useEffect(() => {
    localStorage.setItem('itp_saved_words', JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem('itp_user_records', JSON.stringify(userRecords));
  }, [userRecords]);

  useEffect(() => {
    localStorage.setItem('itp_streak_count', streakCount.toString());
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem('itp_planner_checked', JSON.stringify(plannerChecked));
  }, [plannerChecked]);

  useEffect(() => {
    localStorage.setItem('itp_practice_completed_count', JSON.stringify(completedPracticeCount));
  }, [completedPracticeCount]);

  // Handle adding custom flashcard vocabularies
  const handleAddWord = (newWord: SavedVocabulary) => {
    setSavedWords((prev) => [newWord, ...prev]);
  };

  // Archive mock test records successfully evaluated
  const handleAddNewRecord = (newRec: UserTestRecord) => {
    setUserRecords((prev) => [newRec, ...prev]);
    
    // Increment completed questions for local interactive practice sections if activeTest matches a drill
    if (activeTest && activeTest.title && activeTest.title.endsWith(' Drill')) {
      let topicTitle = activeTest.title.replace(' Drill', '').trim();
      if (topicTitle.startsWith('TOEFL Reading - ')) {
        topicTitle = topicTitle.replace('TOEFL Reading - ', '').trim();
      }
      setCompletedPracticeCount((prev) => {
        const currentCount = prev[topicTitle] || 0;
        return {
          ...prev,
          [topicTitle]: Math.min(8, currentCount + 1), // Clamp to maximum 8
        };
      });
    }
  };

  // Perform Daily Study Attendance Check-in action
  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      alert("Streak Verified: You have already checked in today! Keep studying.");
      return;
    }
    setStreakCount((prev) => prev + 1);
    setHasCheckedInToday(true);
    localStorage.setItem('itp_checked_in_today', 'true');
    alert("🌟 Attendance Logged! Streak incremented successfully. Claim your 100 bonus study tokens!");
  };

  // Planner configurations based on current selected exam & score level
  const getScoreRangePlanner = () => {
    const defaultTasks = [
      { id: '1', title: 'Memorize 25 academic verbs and active synonyms', desc: 'Focus on transitioning basic vocabulary to precise equivalents.' },
      { id: '2', title: 'Complete Section 1 Listening & Section 1 Reading Mock', desc: 'Acquire general pacing parameters under comfortable limits.' },
      { id: '3', title: 'Refine essay introduction using dynamic thesis statements', desc: 'Practice restructuring arguments for cohesive task achievement.' },
      { id: '4', title: 'Simulate Speaking Part 2 queue templates', desc: 'Utilize signposts contextually during 1-2 minutes audio segments.' }
    ];

    const plannerMap: Record<string, { week: string; tasks: { id: string; title: string; desc: string }[] }[]> = {
      low: [
        {
          week: 'Week 1-2: Foundation Mechanics',
          tasks: [
            { id: 'fl-1', title: 'Master grammar agreements and standard verb conjugations', desc: 'Minimize basic errors that sink target band limits.' },
            { id: 'fl-2', title: 'Review exam formats and list criteria benchmarks', desc: 'Familiarize yourself with parameters and timing guides.' },
            { id: 'fl-3', title: 'Practice daily 10-minute spelling exercises', desc: 'Prevent minor errors in listening blank-fills.' }
          ]
        },
        {
          week: 'Week 3-4: Skills Development',
          tasks: [
            { id: 'fl-4', title: 'Read simplified editorials and draft key points summaries', desc: 'Enhance general information extraction speeds.' },
            { id: 'fl-5', title: 'Practice speaking aloud along audio transcripts', desc: 'Enhance rhythmic phonetic pacing.' }
          ]
        },
        {
          week: 'Week 5-8: Evaluation Drills',
          tasks: [
            { id: 'fl-6', title: 'Complete 3 diagnostic Mock Tests under loose limits', desc: 'Get comfortable with sustained test length pressures.' },
            { id: 'fl-7', title: 'Save 2 Writing Task essays and study AI model answers', desc: 'Incorporate transition grammar structures.' }
          ]
        }
      ],
      mid: [
        {
          week: 'Week 1-2: Coherence & Structure',
          tasks: [
            { id: 'fm-1', title: 'Adopt transition and consequence adverbials', desc: 'Signpost ideas using terms like "Consequently" or "Unquestionably".' },
            { id: 'fm-2', title: 'Practice passage skimming & pronoun coreferencing', desc: 'Answer reading comprehension items under 12 minutes.' }
          ]
        },
        {
          week: 'Week 3-4: Depth & Vocabulary',
          tasks: [
            { id: 'fm-3', title: 'Collect 30 Academic List words and synonyms in flashcards', desc: 'Review card flips daily in the ITP study center.' },
            { id: 'fm-4', title: 'Draft fully parameterized opinion arguments', desc: 'Deliver paragraph balance inside writing submissions.' }
          ]
        },
        {
          week: 'Week 5-8: Simulation Prep',
          tasks: [
            { id: 'fm-5', title: 'Complete 5 multi-module complete mock tests', desc: 'Test yourself under rigorous standard examination countdowns.' },
            { id: 'fm-6', title: 'Use ITP speaking microphone simulation', desc: 'Analyze sound level and delivery metrics.' }
          ]
        }
      ],
      high: [
        {
          week: 'Week 1-2: Extreme Vocabulary & Nuance',
          tasks: [
            { id: 'fh-1', title: 'Commit 50 advanced C1-C2 academic idioms to memory', desc: 'Polish speaking and writing lexical scores with expert terminology.' },
            { id: 'fh-2', title: 'Identify attitude and inference in listening lectures', desc: 'Learn to isolate tone changes, sarcasm, and scientific intents.' }
          ]
        },
        {
          week: 'Week 3-4: Strict Timing Bounds',
          tasks: [
            { id: 'fh-3', title: 'Complete Reading sections under 15 minutes limit', desc: 'Generate ample time margin to verify complex multiple choices.' },
            { id: 'fh-4', title: 'Incorporate complex grammatical clauses in essay grids', desc: 'Use passive constructs, relative clauses, and subjunctive tenses.' }
          ]
        },
        {
          week: 'Week 5-8: Perfection Calibration',
          tasks: [
            { id: 'fh-5', title: 'Submit 5 Speaking responses for deep AI grading reviews', desc: 'Target flawless articulation, minimal filler words, and strong coherence.' },
            { id: 'fh-6', title: 'Earn at least 3 model evaluation marks above high thresholds', desc: 'Examine expert layouts and cross-verify with your own drafts.' }
          ]
        }
      ]
    };

    return plannerMap[selectedScoreRange] || [{ week: '2-Month Target Strategy', tasks: defaultTasks }];
  };

  const handleToggleTask = (weekTitle: string, taskId: string) => {
    setPlannerChecked((prev) => {
      const examObj = { ...prev[activeExam] };
      examObj[taskId] = !examObj[taskId];
      return {
        ...prev,
        [activeExam]: examObj,
      };
    });
  };

  // Launch a test or practice questions item
  const startTestEngine = (testItem: MockTest) => {
    setActiveTest(testItem);
  };

  // Standard lists filtered by current active exam
  const activeExamsMockTests =
    activeExam === 'IELTS'
      ? IELTS_TESTS
      : activeExam === 'TOEFL'
      ? TOEFL_TESTS
      : PTE_TESTS;

  const filteredStudyResources = STUDY_RESOURCES.filter((res) => res.exam === activeExam);

  // Get estimated score from past records
  const calculateEstimatedBandScore = (): string => {
    const matchedRecords = userRecords.filter((rec) => rec.exam === activeExam);
    if (matchedRecords.length === 0) {
      return 'Pending Calibration';
    }

    const sum = matchedRecords.reduce((acc, curr) => acc + curr.overallScore, 0);
    const avg = sum / matchedRecords.length;

    if (activeExam === 'IELTS') {
      // Round to nearest 0.5 band
      const val = Math.round(avg * 2) / 2;
      return `Band ${val.toFixed(1)}`;
    } else if (activeExam === 'TOEFL') {
      return `${Math.round(avg)} / 30`;
    } else {
      return `${Math.round(avg)} / 90`;
    }
  };

  // If inside active mock test sandbox, show the full simulated testing environment
  if (activeTest) {
    return (
      <div className="w-full min-h-screen bg-white">
        <InteractiveTestPanel
          test={activeTest}
          onClose={() => setActiveTest(null)}
          onSaveRecord={handleAddNewRecord}
          selectedScoreRange={selectedScoreRange}
        />
        {/* Tutor panel is still accessible inside test to help if needed */}
        <ITPBot
          activeExam={activeExam}
          selectedScoreRange={selectedScoreRange}
          isOpen={botChatOpen}
          setIsOpen={setBotChatOpen}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/40 text-slate-800 flex flex-col font-sans antialiased pb-12">
      {/* Dynamic Nav Bar */}
      {currentTab !== 'Blog' && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activeExam={activeExam}
          setActiveExam={setActiveExam}
          onReviewsClick={() => {
            setCurrentTab('Mock Tests');
            setMockSubTab('Real Reviews');
            setTimeout(() => {
              const el = document.getElementById('reviews-dashboard') || document.getElementById('reviews-list-container');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 150);
          }}
        />
      )}

      {/* Hero section shared in screenshot is displayed atop the Home template */}
      {currentTab === 'Home' && (
        <HeroSection
          activeExam={activeExam}
          selectedScoreRange={selectedScoreRange}
          setSelectedScoreRange={setSelectedScoreRange}
          onTakeMockTest={() => {
            // Find first available test for selected exam and launch it instantly!
            const firstTest = activeExamsMockTests[0] || null;
            if (firstTest) {
              startTestEngine(firstTest);
            } else {
              alert('Notice: Preparing exam packet, try again in a moment!');
            }
          }}
          onOpenChat={() => setBotChatOpen(true)}
          onNavigateToStudyPlan={() => {
            setCurrentTab('Study Center');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentTab === 'Blog' && (
        <BlogPage onNavigateTab={setCurrentTab} onSelectExam={setActiveExam} />
      )}

      {/* Main Core Container */}
      {currentTab !== 'Blog' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ==================== COMMUNITY FORUM VIEWER ==================== */}
        {currentTab === 'Community' && (
          <CommunityPage onNavigateTab={setCurrentTab} />
        )}

        {/* ==================== HOME TAB VIEW ==================== */}
        {/* Removed home-dashboard tracker section based on user request */}

        {/* ==================== STUDY CENTER VIEW ==================== */}
        {currentTab === 'Study Center' && (
          <div className="space-y-10 animate-fade-in" id="study-center-workspace">
            {activeExam === 'TOEFL' ? (
              <ToeflLessonsPage 
                onOpenPurchaseModal={() => setPurchaseModalOpen(true)} 
                onTakeMockTest={(test) => startTestEngine(test)}
              />
            ) : (
              <StudyPlan 
                activeExam={activeExam}
                                onTakeMockTest={() => {
                  const firstTest = activeExamsMockTests[0] || null;
                  if (firstTest) {
                    startTestEngine(firstTest);
                  }
                }}
                onStartExercise={(exercise: any) => {
                  startTestEngine(exercise);
                }}
                latestScore={
                  userRecords.filter((r) => r.exam === activeExam).length > 0
                    ? `${userRecords.filter((r) => r.exam === activeExam)[0].score}`
                    : "-"
                }
              />
            )}
          </div>
        )}

        {/* ==================== MOCK TESTS TAB VIEW ==================== */}
        {currentTab === 'Mock Tests' && (
          <div className="space-y-6 animate-fade-in" id="mock-tests-workspace">
            
            {/* Top Sub-Navigation Tabs */}
            <div className="flex border-b border-gray-200/80 mb-6 gap-6" id="mock-sub-tabs">
              <button
                onClick={() => setMockSubTab('Mock Tests')}
                className={`pb-3 text-sm font-black tracking-tight transition-all relative cursor-pointer ${
                  mockSubTab === 'Mock Tests'
                    ? 'text-blue-600 font-black'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Mock Tests
                {mockSubTab === 'Mock Tests' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setMockSubTab('Real Reviews')}
                className={`pb-3 text-sm font-black tracking-tight transition-all relative cursor-pointer ${
                  mockSubTab === 'Real Reviews'
                    ? 'text-blue-600 font-black'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Real Reviews
                {mockSubTab === 'Real Reviews' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {mockSubTab === 'Mock Tests' ? (
              activeExam === 'PTE' ? (
                <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans" id="pte-sc-mock-tests">
                  {/* Page Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none text-left">
                      AI-Scored PTE Mock Tests, Unlimited Practice
                    </h1>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <button className="p-2 border border-slate-105 hover:border-slate-300 rounded-lg transition-colors cursor-pointer bg-white">
                        &lt;
                      </button>
                      <button className="p-2 border border-slate-105 hover:border-slate-300 rounded-lg transition-colors cursor-pointer bg-white">
                        &gt;
                      </button>
                    </div>
                  </div>

                  {/* Section 1: Promotional four-column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="pte-promo-cards-grid">
                    {/* CARD 1: Unlimited Retakes */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs flex flex-col justify-between text-left space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl">
                          ∞
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-sm">Unlimited Retakes</h3>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          Review what you missed and retake the test anytime to track your progress and improvement.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          const firstTest = activeExamsMockTests[0] || null;
                          if (firstTest) startTestEngine(firstTest);
                        }}
                        className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors cursor-pointer self-start uppercase tracking-wider"
                      >
                        Start Test
                      </button>
                    </div>

                    {/* CARD 2: AI Grading in Just 3 Minutes */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs flex flex-col justify-between text-left space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center font-black">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-sm">AI Grading in Just 3 Minutes</h3>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          Even for open-ended questions—we provides accurate grading within 3 minutes.
                        </p>
                      </div>
                      <span className="text-[11px] font-black text-transparent select-none uppercase tracking-wider">
                        AI grading
                      </span>
                    </div>

                    {/* CARD 3: Unlimited AI Corrections */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs flex flex-col justify-between text-left space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-black">
                          <Award className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-sm">Unlimited AI Corrections</h3>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          Glidy helps improve your responses to boost your score.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          const chatBtn = document.getElementById('chat-toggle-floating-btn');
                          if (chatBtn) {
                            chatBtn.click();
                          } else {
                            alert('Glidy AI chatbot is active in your workspace page corner!');
                          }
                        }}
                        className="text-xs font-black text-[#5C6E84] hover:text-slate-950 transition-colors cursor-pointer self-start uppercase tracking-wider border-b border-dashed border-slate-200"
                      >
                        What is Glidy?
                      </button>
                    </div>

                    {/* CARD 4: Focus on Your Weak Areas */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs flex flex-col justify-between text-left space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-black">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-805 text-sm">Focus on Your Weak Areas</h3>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          You can choose to take only the sections you want to improve instead of taking a full test.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentTab('Practice Questions');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-black text-amber-600 hover:text-amber-700 transition-colors cursor-pointer self-start uppercase tracking-wider"
                      >
                        Practice Sections
                      </button>
                    </div>
                  </div>

                  {/* Section 2: Mock Tests List */}
                  <div className="space-y-4">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-2">
                      <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Mock Tests</h2>
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentTab('Test Records');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        View Mock Test Records &gt;
                      </button>
                    </div>
                    
                    {/* Subtitle study tip */}
                    <div className="text-left py-1 text-slate-500">
                      <p className="text-xs font-black text-[#5C6E84]">
                        <span className="text-blue-600 font-extrabold">Study Tip:</span> Complete all three sections in a single test with real-time limits.
                      </p>
                    </div>

                    {/* 2-Column Grid matching Flowers perfectly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" id="flower-test-grid">
                      {activeExamsMockTests.slice(0, 10).map((t) => {
                        const flowerStyle = getFlowerStyle(t.title);
                        return (
                          <div 
                            key={t.id}
                            onClick={() => startTestEngine(t)}
                            className="bg-white rounded-[32px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="text-left py-2 font-sans">
                              <h3 className="text-[22px] font-extrabold text-[#111827] tracking-tight group-hover:text-blue-600 transition-colors">
                                {t.title}
                              </h3>
                            </div>
                            <div className={`w-20 h-20 rounded-[28px] ${flowerStyle.bg} flex items-center justify-center transform group-hover:scale-110 duration-300 shadow-2xs`}>
                              {flowerStyle.svg}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: AI Standards Scoring Display */}
                  <div className="py-8 space-y-10" id="pte-scoring-standards">
                    <h2 className="text-2xl font-black text-slate-800 text-center tracking-tight">
                      See your true score based on the updated scoring standards
                    </h2>

                    <div className="space-y-12">
                      {/* ROW 1 */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="standard-row-1">
                        <div className="lg:col-span-5 text-left space-y-3">
                          <span className="inline-block bg-[#D1FAE5] text-[#065F46] font-black text-xs px-3 py-1.5 rounded-lg select-none">
                            01
                          </span>
                          <h3 className="text-lg font-black text-slate-800">Experience an Actual Test Environment</h3>
                          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                            Minimize the stress of the real exam! Take the mock tests in an environment similar to the actual PTE Academic Test.
                          </p>
                        </div>
                        
                        {/* Mock-up: Audio Recorder describe image */}
                        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden">
                          <div className="bg-white rounded-2xl border border-slate-150 p-4 space-y-4">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-400 tracking-wider">
                              <span>Describe image</span>
                              <span className="text-blue-600 font-mono">Question 1 of 4</span>
                            </div>
                            <p className="text-xs font-bold text-slate-705">
                              Look at the graph below. In 25 seconds, please speak into the microphone and describe what the graph is showing.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <div className="w-2/5 shrink-0 bg-white border border-slate-100 p-2 rounded-lg">
                                <div className="text-[9px] font-bold text-center text-slate-400 mb-1">Average Monthly Rainfall (mm)</div>
                                {/* Chart */}
                                <div className="h-20 flex items-end justify-between px-1 gap-1">
                                  <div className="w-2 bg-blue-500 rounded-t-xs" style={{ height: '30%' }}></div>
                                  <div className="w-2 bg-indigo-500 rounded-t-xs" style={{ height: '50%' }}></div>
                                  <div className="w-2 bg-purple-500 rounded-t-xs" style={{ height: '70%' }}></div>
                                  <div className="w-2 bg-pink-500 rounded-t-xs" style={{ height: '85%' }}></div>
                                  <div className="w-2 bg-red-500 rounded-t-xs" style={{ height: '55%' }}></div>
                                  <div className="w-2 bg-orange-500 rounded-t-xs" style={{ height: '40%' }}></div>
                                </div>
                              </div>
                              <div className="w-full text-left space-y-1.5">
                                <span className="text-[10px] font-black uppercase text-rose-500 block">Recording...</span>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                  <div className="bg-rose-500 h-full w-2/3"></div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold font-mono">
                                  <span>15 / 40s</span>
                                  <span>Status: Live mic feedback</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ROW 2 */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="standard-row-2">
                        <div className="lg:col-span-5 text-left space-y-3 lg:order-last">
                          <span className="inline-block bg-[#D1FAE5] text-[#065F46] font-black text-xs px-3 py-1.5 rounded-lg select-none">
                            02
                          </span>
                          <h3 className="text-lg font-black text-slate-800">Get Accurate Performance Evaluation</h3>
                          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                            What's my PTE Academic score? Receive a comprehensive report including your raw scores all based on the official PTE Academic scoring criteria, along with communicative skills scores and overall score.
                          </p>
                        </div>

                        {/* Mock-up: Score board list */}
                        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-xs">
                          <div className="bg-white rounded-2xl border border-slate-150 p-4 space-y-3 text-left">
                            <div className="flex border-b border-slate-100 pb-2 gap-4 text-xs font-black text-slate-400">
                              <span className="text-blue-600 border-b-2 border-blue-600 pb-2">Full Test Report</span>
                              <span>Part 1</span>
                              <span>Part 2</span>
                              <span>Part 3</span>
                            </div>
                            
                            <div className="divide-y divide-slate-100">
                              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="font-extrabold text-slate-950 block font-sans text-[13px]">Zen Titan Mock Test</span>
                                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">01 Jan 2026</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500">
                                    <span>L <span className="text-slate-800">83</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>R <span className="text-slate-800">89</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>S <span className="text-slate-800">89</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>W <span className="text-slate-800">90</span></span>
                                  </div>
                                  <span className="font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-[11px]">
                                    88 / 90
                                  </span>
                                  <button className="bg-[#1F2937] hover:bg-[#111827] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer">
                                    View Review
                                  </button>
                                </div>
                              </div>

                              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="font-extrabold text-slate-950 block font-sans text-[13px]">Glory Kid Mock Test</span>
                                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">28 Dec 2025</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500">
                                    <span>L <span className="text-slate-800">75</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>R <span className="text-slate-800">81</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>S <span className="text-slate-800">80</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>W <span className="text-slate-800">84</span></span>
                                  </div>
                                  <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg text-[11px]">
                                    80 / 90
                                  </span>
                                  <button className="bg-[#1F2937] hover:bg-[#111827] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer">
                                    View Review
                                  </button>
                                </div>
                              </div>

                              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="font-extrabold text-slate-950 block font-sans text-[13px]">Spidey Kid Mock Test</span>
                                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">21 Dec 2025</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500">
                                    <span>L <span className="text-slate-800">82</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>R <span className="text-slate-800">85</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>S <span className="text-slate-800">83</span></span>
                                    <span className="text-slate-200">|</span>
                                    <span>W <span className="text-slate-800">88</span></span>
                                  </div>
                                  <span className="font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-[11px]">
                                    85 / 90
                                  </span>
                                  <button className="bg-[#1F2937] hover:bg-[#111827] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer">
                                    View Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ROW 3 */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="standard-row-3">
                        <div className="lg:col-span-5 text-left space-y-3">
                          <span className="inline-block bg-[#D1FAE5] text-[#065F46] font-black text-xs px-3 py-1.5 rounded-lg select-none">
                            03
                          </span>
                          <h3 className="text-lg font-black text-slate-800">Self-Paced Mastery of PTE Academic</h3>
                          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                            Study independently, without the help of institutes or tutors! Detailed explanations and tips for each question type are provided.
                          </p>
                        </div>

                        {/* Mock-up: Explanations + Tips cards */}
                        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2">
                              <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider block">Explanations</span>
                              <p className="text-xs font-bold text-slate-800 leading-snug">
                                The term <span className="bg-emerald-50 text-emerald-700 px-1 rounded">"sustainable development"</span> is optimal here because it aligns with agricultural management strategies in paragraph 2.
                              </p>
                            </div>

                            <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">Tips</span>
                              <ul className="text-[11px] font-bold text-slate-600 list-disc list-inside space-y-1">
                                <li>Scan sentence blocks for cohesive context clues.</li>
                                <li>Identify context pronoun indicators.</li>
                                <li>Focus on fluency metrics!</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ROW 4 */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="standard-row-4">
                        <div className="lg:col-span-5 text-left space-y-3 lg:order-last">
                          <span className="inline-block bg-[#D1FAE5] text-[#065F46] font-black text-xs px-3 py-1.5 rounded-lg select-none">
                            04
                          </span>
                          <h3 className="text-lg font-black text-slate-800">Perfect Guide for Beginners</h3>
                          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                            Lack confidence in Speaking&Writing sections? Review the model answers to compare with your responses.
                          </p>
                        </div>

                        {/* Mock-up: My Answer vs Model Answer */}
                        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 shadow-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2">
                              <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider block">My Answer</span>
                              <div className="flex items-center space-x-1.5 bg-slate-50 p-2 rounded-lg">
                                <span className="text-xs">▶️</span>
                                <div className="w-full bg-slate-200 h-1 rounded-full">
                                  <div className="bg-orange-500 h-full w-2/5"></div>
                                </div>
                                <span className="text-[9px] font-mono text-slate-400">0:18</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-semibold leading-snug">
                                "This graph shows the monthly rain... we have peak rainfall in summer months..."
                              </p>
                            </div>

                            <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2">
                              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Model Answer</span>
                              <div className="flex items-center space-x-1.5 bg-slate-50 p-2 rounded-lg">
                                <span className="text-xs">▶️</span>
                                <div className="w-full bg-slate-200 h-1 rounded-full">
                                  <div className="bg-indigo-600 h-full w-3/4"></div>
                                </div>
                                <span className="text-[9px] font-mono text-slate-400">0:32</span>
                              </div>
                              <p className="text-[11px] text-slate-800 font-bold leading-snug">
                                "The illustration highlights that <span className="text-indigo-600 font-black">precipitation levels</span> peak significantly during mid-summer..."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Customer Testimonials */}
                  <div className="py-8 border-t border-slate-100 space-y-8" id="pte-testimonials">
                    <div className="text-center max-w-sm mx-auto">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-mono block">
                        Success stories
                      </span>
                      <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
                        Hear from candidates who achieved their goals
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-4xl">👩‍🎓</span>
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm">Evelyn</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-0.5 rounded-full mt-1 inline-block">
                              Study Abroad in New Zealand
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-2xs relative text-xs text-slate-505 font-semibold leading-relaxed text-left">
                          "I had a hard time finding PTE Academic practice tests, but this is exactly what I was looking for."
                        </div>
                      </div>

                      <div className="space-y-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-4xl">👨‍💻</span>
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm">Wangjae Lee</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full mt-1 inline-block">
                              Australian Skilled Migration
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-2xs relative text-xs text-slate-505 font-semibold leading-relaxed text-left">
                          "I was running out of time before the test, but thanks to this, I finished my prep in just two weeks."
                        </div>
                      </div>

                      <div className="space-y-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-4xl">👩‍⚕️</span>
                          <div>
                            <h4 className="font-extrabold text-slate-805 text-sm">Jinjoo Park</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 px-3 py-0.5 rounded-full mt-1 inline-block">
                              Nursing in Australia
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-2xs relative text-xs text-slate-505 font-semibold leading-relaxed text-left">
                          "I've used various online services, but the PTE mock test here is the most similar to the real thing."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeExam === 'TOEFL' ? (
                <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans" id="toefl-sc-mock-tests">
                  {/* Top Bento-style Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2" id="toefl-top-bento-grid">
                    {/* Practice Questions Portal */}
                    <div
                      onClick={() => {
                        setCurrentTab('Practice Questions');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white border border-gray-100 rounded-[32px] p-8 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-blue-100 transition-all group overflow-hidden relative"
                    >
                      <div className="space-y-2 z-10 text-left">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block font-mono">
                          Focus on Weak Areas
                        </span>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                          Practice Questions
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold max-w-[210px] sm:max-w-xs mt-1 leading-relaxed">
                          Select individual sub-modules to work on distinct question categories under zero-stress limits.
                        </p>
                      </div>
                      {/* Globe Illustration */}
                      <div className="relative w-28 h-28 flex items-center justify-center transform group-hover:rotate-6 transition-transform z-0">
                        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M35 85H65" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                          <path d="M50 72V85" stroke="#E2E8F0" strokeWidth="4" />
                          <path d="M22 50C22 65.464 34.536 78 50 78C65.464 78 78 65.464 78 50" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="50" cy="46" r="24" fill="#E0F2FE" stroke="#3B82F6" strokeWidth="2.5" />
                          {/* Landmasses */}
                          <path d="M42 32C44 32.5 45 35 44 37C43 39 40 40 38 38C36 36 36 33.5 38 32H42Z" fill="#86EFAC" />
                          <path d="M58 46C59 47 61 50 59 52C57 54 55 52 54 50C53 48 56 45 58 46Z" fill="#86EFAC" />
                          <path d="M46 54C47.5 56 49 58 48 60C47 62 43 62 42 60C41 58 44.5 55 46 54Z" fill="#86EFAC" />
                          <circle cx="50" cy="46" r="24" stroke="#2563EB" strokeWidth="1.5" fill="none" />
                        </svg>
                      </div>
                    </div>

                    {/* View All Records Portal */}
                    <div
                      onClick={() => {
                        setCurrentTab('Test Records');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white border border-gray-100 rounded-[32px] p-8 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-blue-105 transition-all group overflow-hidden relative"
                    >
                      <div className="space-y-2 z-10 text-left">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block font-mono">
                          Need to Review?
                        </span>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                          View All Records
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold max-w-[210px] sm:max-w-xs mt-1 leading-relaxed">
                          Access your saved grading reports, score history analytics and detailed examiner comments.
                        </p>
                      </div>
                      {/* Records Illustration */}
                      <div className="relative w-28 h-28 flex items-center justify-center transform group-hover:scale-105 transition-transform z-0">
                        <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <rect x="20" y="25" width="60" height="50" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
                          <path d="M30 40H70" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M30 50H70" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M30 60H55" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                          <rect x="62" y="55" width="16" height="16" rx="4" fill="#3B82F6" />
                          <path d="M67 63L70 66L75 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* ITP vs. Actual Score Chart Section */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-8 space-y-6" id="toefl-scores-tg-section">
                    <div className="text-left space-y-1">
                      <h3 className="text-lg font-black text-slate-800 tracking-tight">ITP vs. Actual Score</h3>
                      <p className="text-xs text-slate-400 font-semibold">Real statistics verifying score matching calibration across previous cohort test-takers.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="toefl-sub-charts-grid">
                      {/* ITP 4 Scorers */}
                      <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between space-y-4 font-sans">
                        <div className="text-left">
                          <h4 className="text-xs font-black text-slate-700">Real Scores for ITP <span className="text-blue-600 font-black">4</span> Scorers</h4>
                        </div>
                        <div className="h-28 flex items-end justify-between px-2 gap-1.5 pt-4 select-none relative">
                          {[
                            { label: '3', h: 10, val: '4%' },
                            { label: '3.5', h: 20, val: '8%' },
                            { label: '4', h: 75, val: '66.7%', active: true },
                            { label: '4.5', h: 32, val: '14%' },
                            { label: '5', h: 15, val: '6%' },
                            { label: '5.5', h: 6, val: '1%' },
                            { label: '6', h: 0, val: '0%' }
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                              {bar.active ? (
                                <span className="absolute -top-5 text-[9px] font-black text-blue-600 tracking-tighter bg-blue-50/90 px-1 py-0.5 rounded-sm shadow-2xs">66.7%</span>
                              ) : null}
                              <div 
                                className={`w-full rounded-t-xs transition-all duration-500 ${bar.active ? 'bg-blue-600 shadow-xs shadow-blue-200' : 'bg-[#94A3B8] opacity-35 hover:opacity-75'}`} 
                                style={{ height: `${bar.h}%` }}
                              ></div>
                              <span className="text-[9px] font-black text-slate-450 font-mono mt-1 pt-1 border-t border-slate-100 w-full text-center">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ITP 4.5 Scorers */}
                      <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between space-y-4 font-sans">
                        <div className="text-left">
                          <h4 className="text-xs font-black text-slate-700">Real Scores for ITP <span className="text-blue-600 font-black">4.5</span> Scorers</h4>
                        </div>
                        <div className="h-28 flex items-end justify-between px-2 gap-1.5 pt-4 select-none relative">
                          {[
                            { label: '3', h: 4, val: '1%' },
                            { label: '3.5', h: 10, val: '3%' },
                            { label: '4', h: 28, val: '12%' },
                            { label: '4.5', h: 65, val: '47.6%', active: true },
                            { label: '5', h: 42, val: '28%' },
                            { label: '5.5', h: 20, val: '8%' },
                            { label: '6', h: 4, val: '1%' }
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                              {bar.active ? (
                                <span className="absolute -top-5 text-[9px] font-black text-blue-600 tracking-tighter bg-blue-50/90 px-1 py-0.5 rounded-sm shadow-2xs">47.6%</span>
                              ) : null}
                              <div 
                                className={`w-full rounded-t-xs transition-all duration-500 ${bar.active ? 'bg-blue-500 shadow-xs shadow-blue-200' : 'bg-[#94A3B8] opacity-35 hover:opacity-75'}`} 
                                style={{ height: `${bar.h}%` }}
                              ></div>
                              <span className="text-[9px] font-black text-slate-450 font-mono mt-1 pt-1 border-t border-slate-100 w-full text-center">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ITP 5 Scorers */}
                      <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between space-y-4 font-sans">
                        <div className="text-left">
                          <h4 className="text-xs font-black text-slate-700">Real Scores for ITP <span className="text-blue-600 font-black">5</span> Scorers</h4>
                        </div>
                        <div className="h-28 flex items-end justify-between px-2 gap-1.5 pt-4 select-none relative">
                          {[
                            { label: '3', h: 0, val: '0%' },
                            { label: '3.5', h: 4, val: '1%' },
                            { label: '4', h: 8, val: '2%' },
                            { label: '4.5', h: 32, val: '15%' },
                            { label: '5', h: 68, val: '58%', active: true },
                            { label: '5.5', h: 36, val: '20%' },
                            { label: '6', h: 12, val: '4%' }
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                              {bar.active ? (
                                <span className="absolute -top-5 text-[9px] font-black text-blue-600 tracking-tighter bg-blue-50/90 px-1 py-0.5 rounded-sm shadow-2xs">58%</span>
                              ) : null}
                              <div 
                                className={`w-full rounded-t-xs transition-all duration-500 ${bar.active ? 'bg-blue-600 shadow-xs shadow-blue-200' : 'bg-[#94A3B8] opacity-35 hover:opacity-75'}`} 
                                style={{ height: `${bar.h}%` }}
                              ></div>
                              <span className="text-[9px] font-black text-slate-450 font-mono mt-1 pt-1 border-t border-slate-100 w-full text-center">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Mock Tests List */}
                  <div className="space-y-4">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-2">
                      <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Mock Tests</h2>
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentTab('Test Records');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        View Mock Test Records &gt;
                      </button>
                    </div>
                    
                    {/* Subtitle study tip */}
                    <div className="text-left py-1 text-slate-500">
                      <p className="text-xs font-black text-[#5C6E84]">
                        <span className="text-blue-600 font-extrabold">Study Tip:</span> Complete all four sections in a single test with real-time limits.
                      </p>
                    </div>

                    {/* 2-Column Grid matching Planets perfectly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" id="toefl-planet-test-grid">
                      {activeExamsMockTests.map((t) => {
                        const planetStyle = getPlanetStyle(t.title);
                        return (
                          <div 
                            key={t.id}
                            onClick={() => startTestEngine(t)}
                            className="bg-white rounded-[32px] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="text-left py-2 font-sans flex flex-col justify-between h-full">
                              <h3 className="text-[22px] font-extrabold text-[#111827] tracking-tight group-hover:text-blue-600 transition-colors">
                                {t.title}
                              </h3>
                              {t.title === 'Hero Cadet' && (
                                <span className="mt-3 bg-blue-600 text-white self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold select-none">
                                  Free Test
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span className="bg-blue-50/80 px-2.5 py-1 rounded-full text-[9px] font-black text-blue-600 tracking-wide flex items-center space-x-0.5 select-none shrink-0">
                                <span>⚡</span>
                                <span>graded in 1 min</span>
                              </span>
                              <div className={`w-20 h-20 rounded-[28px] ${planetStyle.bg} flex items-center justify-center transform group-hover:scale-115 duration-300 shadow-2xs relative`}>
                                {planetStyle.svg}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Marketing bottom banner */}
                  <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6" id="toefl-marketing-banner">
                    <div className="text-left space-y-1">
                      <span className="text-[10px] font-black text-slate-400 capitalize block tracking-wide">Sign up and take the free TOEFL mock tests</span>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight">Take the New 2026 Updated TOEFL</h3>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                      <button 
                        onClick={() => alert('Launching curriculum changes guide for the 2026 Updated TOEFL!')}
                        className="bg-white hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 transition-all shadow-2xs cursor-pointer"
                      >
                        View Changes
                      </button>
                      <button 
                        onClick={() => {
                          const freeTest = activeExamsMockTests.find(t => t.title === 'Hero Cadet') || activeExamsMockTests[0];
                          if (freeTest) startTestEngine(freeTest);
                        }}
                        className="bg-slate-900 hover:bg-slate-850 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Start for Free
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                {/* Top Bento-style Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2" id="mock-top-bento-grid">
                  
                  {/* Practice Questions Portal */}
                  <div
                    onClick={() => {
                      setCurrentTab('Practice Questions');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white border border-gray-100 rounded-[32px] p-8 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-blue-100 transition-all group overflow-hidden relative"
                  >
                    <div className="space-y-2 z-10 text-left">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block font-mono">
                        Focus on Weak Areas
                      </span>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                        Practice Questions
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold max-w-[210px] sm:max-w-xs mt-1 leading-relaxed">
                        Select individual sub-modules to work on distinct question categories under zero-stress limits.
                      </p>
                    </div>
                    {/* Globe Illustration */}
                    <div className="relative w-28 h-28 flex items-center justify-center transform group-hover:rotate-6 transition-transform z-0">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 85H65" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                        <path d="M50 72V85" stroke="#E2E8F0" strokeWidth="4" />
                        <path d="M22 50C22 65.464 34.536 78 50 78C65.464 78 78 65.464 78 50" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="50" cy="46" r="24" fill="#E0F2FE" stroke="#3B82F6" strokeWidth="2.5" />
                        {/* Landmasses */}
                        <path d="M42 32C44 32.5 45 35 44 37C43 39 40 40 38 38C36 36 36 33.5 38 32H42Z" fill="#86EFAC" />
                        <path d="M58 46C59 47 61 50 59 52C57 54 55 52 54 50C53 48 56 45 58 46Z" fill="#86EFAC" />
                        <path d="M46 54C47.5 56 49 58 48 60C47 62 43 62 42 60C41 58 44.5 55 46 54Z" fill="#86EFAC" />
                        <circle cx="50" cy="46" r="24" stroke="#2563EB" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Lectures Player Portal */}
                  <div
                    onClick={() => setLectureModalOpen(true)}
                    className="bg-white border border-gray-100 rounded-[32px] p-8 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-indigo-100 transition-all group overflow-hidden relative"
                  >
                    <div className="space-y-2 z-10 text-left">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block font-mono">
                        Getting Started with {activeExam}?
                      </span>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                        In-depth Video Lectures
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold max-w-[210px] sm:max-w-xs mt-1 leading-relaxed">
                        Watch premium pre-recorded modules curated by top-tier instructors to demystify {activeExam} structures.
                      </p>
                    </div>
                    {/* Video lectures Illustration */}
                    <div className="relative w-28 h-28 flex items-center justify-center transform group-hover:-translate-y-1 transition-transform z-0">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <rect x="15" y="20" width="70" height="58" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
                        <path d="M15 32H85" stroke="#94A3B8" strokeWidth="2.5" />
                        <circle cx="23" cy="26" r="2" fill="#EF4444" />
                        <circle cx="29" cy="26" r="2" fill="#F59E0B" />
                        <circle cx="35" cy="26" r="2" fill="#10B981" />
                        <rect x="25" y="38" width="50" height="32" rx="4" fill="#312E81" />
                        <polygon points="46,48 46,60 56,54" fill="#FBBF24" />
                        <circle cx="74" cy="66" r="10" fill="#FBBF24" stroke="#4F46E5" strokeWidth="1.5" />
                        <path d="M68 72C68 69.5 70.5 68 74 68C77.5 68 80 69.5 80 72" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="74" cy="63" r="3.5" fill="#4F46E5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* List Header */}
                <div className="pt-4 text-left">
                  <h2 className="text-[20px] font-bold text-slate-800 tracking-tight">List of Mock Tests</h2>
                </div>

                {/* Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="mocks-list-grid">
                  {activeExamsMockTests.map((t) => {
                    const vegTheme = VEGETABLE_THEMING[t.title] || {
                      gradient: 'from-[#F8FAFC] to-[#F1F5F9]',
                      borderColor: 'border-slate-200',
                      textColor: 'text-slate-800',
                      takers: '10,000+',
                      percentAboveSeven: '15%'
                    };

                    return (
                      <div
                        key={t.id}
                        onClick={() => startTestEngine(t)}
                        className={`bg-linear-to-b ${vegTheme.gradient} border ${vegTheme.borderColor} rounded-[32px] p-6 shadow-xs flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer relative overflow-hidden group`}
                      >
                        <div className="space-y-4">
                          {/* Top row with graded in 1 min badge and difficulty */}
                          <div className="flex justify-between items-center text-xs">
                            <span className="bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-700 tracking-wide flex items-center space-x-1 shadow-2xs border border-white/20 select-none">
                              <span className="text-amber-500">⚡</span>
                              <span>graded in 1 min</span>
                            </span>
                            
                            <span className={`text-[10px] font-black uppercase tracking-wider ${vegTheme.textColor} select-none`}>
                              {t.difficulty}
                            </span>
                          </div>

                          {/* Middle layout containing vegetable title, brief duration and vector */}
                          <div className="flex justify-between items-end pt-2">
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-2xl text-slate-900 tracking-tight">
                                {t.title}
                              </h4>
                              <p className="text-[11px] text-slate-500/80 font-black tracking-widest uppercase font-mono">
                                {t.duration}
                              </p>
                            </div>
                            
                            {/* Custom Vegetable vector illustrations */}
                            <div className="transform group-hover:scale-110 transition-transform duration-300 pb-1">
                              {renderVegetableSVG(t.title)}
                            </div>
                          </div>

                          {/* Translucent glassy summary statistics panel */}
                          <div className="bg-white/55 backdrop-blur-xs border border-white/40 rounded-2xl p-3.5 space-y-1.5 text-left text-[11px] font-bold text-slate-700 shadow-2xs select-none">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs">👤</span>
                              <span className="text-slate-600 font-semibold">test takers <span className="font-black text-slate-800">{vegTheme.takers}</span></span>
                            </div>
                            <div className="flex items-center space-x-2 leading-snug">
                              <span className="text-xs">🎯</span>
                              <span className="text-slate-600 font-semibold">
                                <span className="font-black text-slate-800">{vegTheme.percentAboveSeven}</span> of test takers got more than{' '}
                                <span className="font-black text-slate-900">
                                  {activeExam === 'IELTS' ? '7 points' : activeExam === 'TOEFL' ? '100 points' : '65 points'}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action overlay text visible on hover */}
                        <div className="mt-4 pt-1">
                          <div className={`w-full bg-slate-900/5 hover:bg-slate-900/10 text-center py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest ${vegTheme.textColor} transition-colors`}>
                            Start Simulated Test
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Real reviews tease banner matching layout */}
                <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-[32px] p-8 text-white flex flex-col md:flex-row justify-between items-center text-left gap-6 mt-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#93C5FD] font-mono">Join 45,000+ Successful Grads</span>
                    <h3 className="text-2xl font-black tracking-tight text-white leading-tight">Read authentic peer score evaluations</h3>
                    <p className="text-xs text-blue-100 max-w-xl font-medium leading-relaxed">
                      Check how previous IELTS, TOEFL, and PTE candidates successfully pushed through target scores using ITP.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMockSubTab('Real Reviews');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white text-blue-600 font-black text-xs px-6 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <span>View Customer Reviews</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )) : (
              <div className="space-y-8 animate-fade-in text-left">
                {/* STUNNING NEO-BRUTALIST TESTIMONIAL WIDGET MATCHING SCREENSHOT */}
                <TestimonialsNeo />

                {/* Score Reviews Summary Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8" id="reviews-dashboard">
                  <div className="flex flex-col items-center justify-center border-r border-gray-100/80 pr-6 space-y-2">
                    <span className="text-5xl font-black text-slate-800">4.9</span>
                    <div className="text-amber-400 text-base">★★★★★</div>
                    <span className="text-xs text-slate-400 font-bold block text-center">45,210+ Verified Student Evaluations</span>
                  </div>

                  <div className="lg:col-span-2 flex flex-col justify-center space-y-3.5 pl-0 lg:pl-6 pt-4 lg:pt-0">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">Review Score Breakdown</h4>
                    <div className="space-y-2 text-xs font-semibold">
                      <div className="flex items-center space-x-3">
                        <span className="w-14 font-black">5 Stars</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="w-10 text-right text-slate-400 font-bold">92%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-14 font-black">4 Stars</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: '7%' }}></div>
                        </div>
                        <span className="w-10 text-right text-slate-400 font-bold">7%</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-400">
                        <span className="w-14 font-bold">3 Stars</span>
                        <div className="flex-1 h-2 bg-slate-100/50 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: '1%' }}></div>
                        </div>
                        <span className="w-10 text-right font-bold">1%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Controls Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-100/60 p-4 rounded-2xl">
                  {/* Left filters */}
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono mr-2">Filter by:</span>
                    {(['All', 'IELTS', 'TOEFL', 'PTE'] as const).map((examOpt) => (
                      <button
                        key={examOpt}
                        onClick={() => setReviewExamFilter(examOpt)}
                        className={`text-xs font-black px-3.5 py-1.5 rounded-full transition-all ${
                          reviewExamFilter === examOpt
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-slate-600 hover:bg-gray-100 border border-slate-200/50'
                        }`}
                      >
                        {examOpt}
                      </button>
                    ))}
                  </div>

                  {/* Right reviews submit command */}
                  <button
                    onClick={() => setNewReviewFormOpen(!newReviewFormOpen)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                  >
                    {newReviewFormOpen ? 'Close Writer Panel' : 'Write a Review'}
                  </button>
                </div>

                {/* Write a review live form */}
                {newReviewFormOpen && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
                        alert('Please fill out your name and review text!');
                        return;
                      }
                      const created = {
                        id: `custom-rev-${Date.now()}`,
                        exam: newReviewExam,
                        author: `${newReviewAuthor.trim().substring(0, 2)}******`,
                        rating: newReviewRating,
                        date: new Date().toISOString().split('T')[0],
                        comment: newReviewComment.trim(),
                        scoreGained: newReviewScore.trim() || (newReviewExam === 'IELTS' ? 'Band 7.5' : newReviewExam === 'TOEFL' ? '102 / 120' : '76 / 90')
                      };
                      setReviewsList([created, ...reviewsList]);
                      setNewReviewFormOpen(false);
                      setNewReviewAuthor('');
                      setNewReviewComment('');
                      setNewReviewScore('');
                      alert('Thank you! Your feedback has been published below under Real Reviews.');
                    }}
                    className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 space-y-4 animate-fade-in"
                    id="new-review-form"
                  >
                    <div className="text-left">
                      <h4 className="font-extrabold text-slate-800 text-sm">Write Study Evaluation Feedback</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Submit your verified testimonial score inside the active session context.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500">Your Nickname</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. JohnD"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 font-semibold"
                        />
                      </div>

                      {/* Exam option selection */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500">Exam Taken</label>
                        <select
                          value={newReviewExam}
                          onChange={(e) => setNewReviewExam(e.target.value as 'IELTS' | 'TOEFL' | 'PTE')}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 font-semibold"
                        >
                          <option value="IELTS">IELTS Academic</option>
                          <option value="TOEFL">TOEFL iBT</option>
                          <option value="PTE">Pearson PTE Academic</option>
                        </select>
                      </div>

                      {/* Achieved score input */}
                      <div className="space-y-1 text-left">
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500">Score Achieved (Optional)</label>
                        <input
                          type="text"
                          value={newReviewScore}
                          onChange={(e) => setNewReviewScore(e.target.value)}
                          placeholder="e.g. Band 8.0, 112 / 120"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Rating option */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500">Rating Stars</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(parseInt(e.target.value, 10))}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 font-black text-amber-500"
                        >
                          <option value="5">★★★★★ (5 Stars)</option>
                          <option value="4">★★★★☆ (4 Stars)</option>
                          <option value="3">★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>

                      {/* Comment text area */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500">Review Text / Experience</label>
                        <textarea
                          required
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          rows={2}
                          placeholder="Share your exam preparation experience..."
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:translate-y-0.5"
                      >
                        Publish Verified Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-tabs List output */}
                <div className="space-y-6 font-sans" id="reviews-list-container">
                  {(() => {
                    const filtered = reviewsList.filter((r) => {
                      const matchesExam = reviewExamFilter === 'All' || r.exam === reviewExamFilter;
                      const matchesRating = reviewRatingFilter === 0 || r.rating === reviewRatingFilter;
                      return matchesExam && matchesRating;
                    });

                    const reviewsPerPage = 2;
                    const totalPages = Math.max(1, Math.ceil(filtered.length / reviewsPerPage));
                    const boundedPage = Math.min(reviewPage, totalPages);
                    const startIndex = (boundedPage - 1) * reviewsPerPage;
                    const paginated = filtered.slice(startIndex, startIndex + reviewsPerPage);

                    const formattedDate = (dateStr: string) => {
                      try {
                        const d = new Date(dateStr);
                        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
                      } catch (e) {
                        return dateStr;
                      }
                    };

                    if (filtered.length === 0) {
                      return (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-semibold text-xs">
                          No matching verified reviews found. Click "Write a Review" above to append yours!
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-6">
                        {/* List Items */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6 divide-y divide-gray-100">
                          {paginated.map((item, idx) => {
                            const isLong = item.comment.length > 165;
                            const isExpanded = !!expandedReviews[item.id];
                            return (
                              <div
                                key={item.id}
                                className={`flex flex-col sm:flex-row gap-6 items-start text-left ${
                                  idx > 0 ? 'pt-6' : ''
                                }`}
                              >
                                {/* Left Metadata Column */}
                                <div className="w-28 shrink-0 flex flex-col items-start select-none">
                                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider font-sans uppercase">
                                    2026 {item.exam}
                                  </span>
                                  <span className="mt-2 text-xs font-black text-slate-700">
                                    {item.author}
                                  </span>
                                  {/* Score indicator */}
                                  <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                    Score: <span className="font-extrabold text-emerald-600 block bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/30 text-center mt-1 select-all">{item.scoreGained}</span>
                                  </div>
                                </div>

                                {/* Right Content Column */}
                                <div className="flex-1 space-y-2.5">
                                  <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                    <span className="font-bold text-slate-400 font-mono">
                                      {formattedDate(item.date)}
                                    </span>
                                    <span className="font-bold text-rose-400 font-sans tracking-wide">
                                      AI Translated
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                    {isLong && !isExpanded
                                      ? `"${item.comment.substring(0, 165)}..."`
                                      : `"${item.comment}"`}
                                  </p>

                                  <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                                      <button
                                        type="button"
                                        onClick={() => alert('Thanks for the helpful rating report!')}
                                        className="hover:text-blue-600 transition-colors cursor-pointer select-none"
                                      >
                                        👍 Helpful (24)
                                      </button>
                                    </div>

                                    {isLong && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpandedReviews((prev) => ({
                                            ...prev,
                                            [item.id]: !prev[item.id],
                                          }))
                                        }
                                        className="bg-white hover:bg-slate-50 text-[10px] font-black text-slate-500 border border-slate-200 rounded-full px-3 py-1 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer select-none"
                                      >
                                        <span>{isExpanded ? 'Hide' : 'Show'}</span>
                                        <span className="text-[8px]">{isExpanded ? '▲' : '▼'}</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Experience Realistic Simulation Promo banner card */}
                        <div className="bg-linear-to-b from-[#F3F4F6] to-[#E5E7EB] border border-gray-200 rounded-[32px] p-8 text-center space-y-4 shadow-2xs select-none">
                          <div className="flex justify-center">
                            <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
                              <Crown className="w-5 h-5" />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest font-mono">
                              Experience Realistic
                            </p>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-tight">
                              TOEFL/IELTS/PTE Test Simulations
                            </h3>
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setMockSubTab('Mock Tests');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-8 py-3.5 rounded-full transition-all tracking-widest uppercase hover:shadow-md cursor-pointer select-none"
                            >
                              START NOW
                            </button>
                          </div>
                        </div>

                        {/* Pagination Component */}
                        <div className="flex items-center justify-center space-x-2 pt-4 select-none">
                          {/* First Page */}
                          <button
                            type="button"
                            disabled={boundedPage === 1}
                            onClick={() => setReviewPage(1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                              boundedPage === 1
                                ? 'text-slate-200 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100 cursor-pointer'
                            }`}
                          >
                            «
                          </button>
                          {/* Prev Page */}
                          <button
                            type="button"
                            disabled={boundedPage === 1}
                            onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                              boundedPage === 1
                                ? 'text-slate-200 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100 cursor-pointer'
                            }`}
                          >
                            ‹
                          </button>

                          {/* Numeric pages */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pn) => (
                            <button
                              key={pn}
                              type="button"
                              onClick={() => setReviewPage(pn)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                                boundedPage === pn
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'text-slate-400 hover:bg-slate-100'
                              }`}
                            >
                              {pn}
                            </button>
                          ))}

                          {/* Next Page */}
                          <button
                            type="button"
                            disabled={boundedPage === totalPages}
                            onClick={() => setReviewPage((p) => Math.min(totalPages, p + 1))}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                              boundedPage === totalPages
                                ? 'text-slate-200 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100 cursor-pointer'
                            }`}
                          >
                            ›
                          </button>
                          {/* Last Page */}
                          <button
                            type="button"
                            disabled={boundedPage === totalPages}
                            onClick={() => setReviewPage(totalPages)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                              boundedPage === totalPages
                                ? 'text-slate-200 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100 cursor-pointer'
                            }`}
                          >
                            »
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PRACTICE QUESTIONS VIEW ==================== */}
        {currentTab === 'Practice Questions' && (
          <div className="space-y-8 animate-fade-in text-center" id="practice-questions-workspace">
            {/* Top Sub-navigation Segment */}
            <div className="flex justify-center items-center py-2 border-b border-slate-100 bg-white rounded-3xl p-4 shadow-3xs max-w-2xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {[
                  { id: 'Listening', label: 'Listening', icon: Headphones, activeClass: 'bg-blue-50 border-blue-200 text-blue-600 font-extrabold' },
                  { id: 'Reading', label: 'Reading', icon: BookOpen, activeClass: 'bg-[#F2FDF4] border-[#BEEFD4] text-[#16A34A] font-extrabold shadow-3xs' },
                  { id: 'Writing', label: 'Writing', icon: PenTool, activeClass: 'bg-amber-50 border-amber-200 text-amber-600 font-extrabold' },
                  { id: 'Speaking', label: 'Speaking', icon: Mic, activeClass: 'bg-purple-50 border-purple-200 text-purple-600 font-extrabold' },
                ].map((sec) => {
                  const isActive = practiceSection === sec.id;
                  const IconComp = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        setPracticeSection(sec.id as any);
                      }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none border border-transparent ${
                        isActive 
                          ? sec.activeClass
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeExam === 'TOEFL' ? (
              /* ==================== TOEFL BESPOKE PRACTICE VIEW ==================== */
              <div className="space-y-10 animate-fade-in" id="toefl-practice-workspace">
                {practiceSection === 'Reading' ? (
                  <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans">
                    {/* Top Video Lecture Banner */}
                    <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-3xs" id="toefl-video-banner">
                      {/* Simulated Video Player Graphic */}
                      <div className="w-full lg:w-[400px] h-[225px] shrink-0 rounded-2xl relative overflow-hidden bg-[#1E3A8A] flex flex-col justify-between p-4 shadow-sm select-none group border border-slate-100">
                        {/* Elegant background graphics resembling waves/lecture board */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3c72] via-[#2a5298] to-[#2563EB] opacity-90 z-0" />
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-3xs">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-[10px] font-black text-white/90">TOEFL® prep</span>
                        </div>
                        
                        {/* Play button indicator overlay */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-10">
                          <button
                            type="button"
                            onClick={() => alert('Playing the 2026 TOEFL Reading Overview Lecture by Senior TOEFL Instructor Julie Vance.')}
                            className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Play className="w-6 h-6 fill-blue-600 pl-0.5" />
                          </button>
                        </div>

                        {/* Title text */}
                        <div className="z-10 mt-14">
                          <h4 className="text-[20px] font-black leading-tight text-white tracking-tight drop-shadow-sm">
                            TOEFL® 2026
                          </h4>
                          <h4 className="text-[20px] font-black leading-tight text-white/90 tracking-tight drop-shadow-sm">
                            Reading Section
                          </h4>
                        </div>

                        {/* Bottom Bar items */}
                        <div className="z-10 flex justify-between items-center w-full pt-2">
                          <div className="flex items-center space-x-1.5 text-white/80">
                            <span className="text-[10px] font-black font-mono">ITP</span>
                          </div>
                          <span className="bg-slate-950/70 text-[10px] font-mono text-white/90 font-black px-2 py-0.5 rounded shadow-2xs">
                            46:14
                          </span>
                        </div>
                      </div>

                      {/* Right-hand Description part */}
                      <div className="flex-1 space-y-4 text-left">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                          Reading
                        </h2>
                        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                          The Reading Section measures your ability to understand academic and everyday texts by identifying main ideas, key details, vocabulary in context, and relationships between ideas. Texts reflect both academic reading and real-life written communication.
                        </p>

                        {/* Flat pills scroll keys */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {[
                            { label: 'Complete the Words', targetId: 'toefl-complete-words' },
                            { label: 'Read in Daily Life', targetId: 'toefl-read-daily' },
                            { label: 'Read an Academic Passage', targetId: 'toefl-read-academic' }
                          ].map((pill, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                document.getElementById(pill.targetId)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[#64748B] hover:text-blue-600 hover:border-blue-300 text-[10.5px] font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-3xs"
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Read in Daily Life */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-read-daily">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Read in Daily Life
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [ 'Vietnam Project', 'Midtown Bridge', 'Clinic Hours', 'Holiday Extravaganza', 'Home Renovation' ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length * 2;
                            return `${solvedCount}/10 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Understand short real-world texts like emails and notices
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You read short, nonacademic texts (15–150 words) that reflect real-world written communication, such as emails, notices, schedules, messages, advertisements, forms, or social media posts. Each text is followed by 2–3 multiple-choice questions, depending on difficulty.
                          </p>
                        </div>

                        {/* List Items of Daily Life */}
                        <div className="space-y-3">
                          {[
                            'Vietnam Project',
                            'Midtown Bridge',
                            'Clinic Hours',
                            'Holiday Extravaganza',
                            'Home Renovation'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflPracticeDrill(title, 'Read in Daily Life'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Fetching more everyday-life reading diagnostics... Complete these 5 to unblock more!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Read an Academic Passage */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-read-academic">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Read an Academic Passage
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [ 'Book Scorpions', 'The 1920s', 'Animal Migration', 'Cold Welding', 'The Myth of the Child Prodigy' ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length * 2;
                            return `${solvedCount}/10 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Read an academic passage and answer comprehension questions
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You read a short academic passage (about 150 words) on topics drawn from fields such as science, history, business, art or social studies. Background knowledge is not required. Each passage is followed by five questions...
                          </p>
                        </div>

                        {/* List Items of Academic Reading */}
                        <div className="space-y-3">
                          {[
                            'Book Scorpions',
                            'The 1920s',
                            'Animal Migration',
                            'Cold Welding',
                            'The Myth of the Child Prodigy'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflPracticeDrill(title, 'Read an Academic Passage'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Fetching more academic research reading materials... Complete these 5 to unblock more!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>

                    {/* Section 3: Complete the Words */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-complete-words">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Complete the Words
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [ 'Human Perception', 'Sustainable Living', 'Bird Nests', 'Edible Gold', 'The Great Wall of China' ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length * 2;
                            return `${solvedCount}/10 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Fill in missing letters in an academic passage
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You read a short academic paragraph (about 200 words) on topics drawn from fields such as science, history, business, art or social studies. The first sentence is shown in full, and starting from the second sentence, the second half of every second word is removed. Your task is to complete the missing letters correctly...
                          </p>
                        </div>

                        {/* List Items of Word Completion */}
                        <div className="space-y-3">
                          {[
                            'Human Perception',
                            'Sustainable Living',
                            'Bird Nests',
                            'Edible Gold',
                            'The Great Wall of China'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflPracticeDrill(title, 'Complete the Words'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Fetching more lexical and orthographic C-test samples... Complete these 5 to unblock more!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>
                  </div>
                ) : practiceSection === 'Listening' ? (
                  <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans" id="toefl-listening-workspace">
                    {/* Top Video Lecture Banner */}
                    <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-3xs" id="toefl-listening-video-banner">
                      {/* Simulated Video Player Graphic */}
                      <div className="w-full lg:w-[400px] h-[225px] shrink-0 rounded-2xl relative overflow-hidden bg-[#0F172A] flex flex-col justify-between p-4 shadow-sm select-none group border border-slate-100">
                        {/* Elegant background graphics resembling waves/lecture board */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#3B82F6] opacity-90 z-0" />
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-3xs">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-[10px] font-black text-white/90">TOEFL® prep</span>
                        </div>
                        
                        {/* Play button indicator overlay */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-10">
                          <button
                            type="button"
                            onClick={() => alert('Playing the 2026 TOEFL Listening Strategic Overview Lecture by Senior Instructor Julie Vance.')}
                            className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Play className="w-6 h-6 fill-blue-600 pl-0.5" />
                          </button>
                        </div>

                        {/* Title text */}
                        <div className="z-10 mt-14">
                          <h4 className="text-[20px] font-black leading-tight text-white tracking-tight drop-shadow-sm">
                            TOEFL® 2026
                          </h4>
                          <h4 className="text-[20px] font-black leading-tight text-white/90 tracking-tight drop-shadow-sm">
                            Listening Section
                          </h4>
                        </div>

                        {/* Bottom Bar items */}
                        <div className="z-10 flex justify-between items-center w-full pt-2">
                          <div className="flex items-center space-x-1.5 text-white/80">
                            <span className="text-[10px] font-black font-mono">ITP</span>
                          </div>
                          <span className="bg-slate-950/70 text-[10px] font-mono text-white/90 font-black px-2 py-0.5 rounded shadow-2xs">
                            32:45
                          </span>
                        </div>
                      </div>

                      {/* Right-hand Description part */}
                      <div className="flex-1 space-y-4 text-left">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                          Listening
                        </h2>
                        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                          The Listening Section measures your ability to understand conversations and academic lectures in English. It assesses your capability to grasp main ideas, major details, speaker attitudes, and the relationships between pieces of information.
                        </p>

                        {/* Flat pills scroll keys */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {[
                            { label: 'Academic Lectures', targetId: 'toefl-listening-academic' },
                            { label: 'Office Conversations', targetId: 'toefl-listening-office' }
                          ].map((pill, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                document.getElementById(pill.targetId)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[#64748B] hover:text-blue-600 hover:border-blue-300 text-[10.5px] font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-3xs"
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Academic Lectures */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-listening-academic">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Academic Lectures
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [ 'Marine Bioluminescence', 'Behavioral Economics', 'Volcanic Basalt' ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/3 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Synthesize complex university-level lectures
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            Listen to academic presentations explaining scientific models, economic theories, and igneous cooling structures. Each drill tests your recall, note-taking, and semantic processing.
                          </p>
                        </div>

                        {/* List Items of Lectures */}
                        <div className="space-y-3">
                          {[
                            'Marine Bioluminescence',
                            'Behavioral Economics',
                            'Volcanic Basalt'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0">
                                    <Headphones className="w-4.5 h-4.5 text-blue-500" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflListeningDrill(title, 'Academic Lecture'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing more academic lecture records... Setup complete for active exercises!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More lectures
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Office Conversations */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-listening-office">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Office Conversations
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [ 'Meal Plan Upgrade', 'Library Fines Dispute', 'Lab Assistant Application' ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/3 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Understand typical campus life dialogue scenarios
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            Evaluate conversations with department coordinators, student accounts offices, and professors. Each drill tests student goals and administrative rules.
                          </p>
                        </div>

                        {/* List Items of Office Conversations */}
                        <div className="space-y-3">
                          {[
                            'Meal Plan Upgrade',
                            'Library Fines Dispute',
                            'Lab Assistant Application'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center shrink-0">
                                    <Volume2 className="w-4.5 h-4.5 text-indigo-500" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflListeningDrill(title, 'Office Conversation'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing student services registry logs... Setup complete for active exercises!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More conversations
                        </button>
                      </div>
                    </div>
                  </div>
                ) : practiceSection === 'Writing' ? (
                  <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans" id="toefl-writing-workspace">
                    {/* Top Video Lecture Banner */}
                    <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-3xs" id="toefl-writing-video-banner">
                      {/* Simulated Video Player Graphic */}
                      <div className="w-full lg:w-[400px] h-[225px] shrink-0 rounded-2xl relative overflow-hidden bg-[#1E1B4B] flex flex-col justify-between p-4 shadow-sm select-none group border border-purple-100">
                        {/* Elegant progress/background graphics resembling waves */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#120024] via-[#311042] to-[#7C3AED] opacity-90 z-0" />
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-3xs">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-[10px] font-black text-white/90">TOEFL® prep</span>
                        </div>
                        
                        {/* Play button indicator overlay */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-10">
                          <button
                            type="button"
                            onClick={() => alert('Playing the 2026 TOEFL Writing Strategy Seminar - Score Evaluation Masterclass.')}
                            className="w-14 h-14 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Play className="w-6 h-6 fill-purple-600 pl-0.5" />
                          </button>
                        </div>

                        {/* Title text */}
                        <div className="z-10 mt-14">
                          <h4 className="text-[20px] font-black leading-tight text-white tracking-tight drop-shadow-sm">
                            TOEFL® 2026
                          </h4>
                          <h4 className="text-[20px] font-black leading-tight text-white/90 tracking-tight drop-shadow-sm">
                            Writing Section
                          </h4>
                        </div>

                        {/* Bottom Bar items */}
                        <div className="z-10 flex justify-between items-center w-full pt-2">
                          <div className="flex items-center space-x-1.5 text-white/80">
                            <span className="text-[10px] font-black font-mono">ITP</span>
                          </div>
                          <span className="bg-slate-950/70 text-[10px] font-mono text-white/90 font-black px-2 py-0.5 rounded shadow-2xs">
                            44:11
                          </span>
                        </div>
                      </div>

                      {/* Right-hand Description part */}
                      <div className="flex-1 space-y-4 text-left">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                          Writing
                        </h2>
                        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                          The Writing Section tests how effectively you can communicate in writing across academic and everyday contexts.
                        </p>

                        {/* Navigation pills from image */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {[
                            { label: 'Build a Sentence', targetId: 'toefl-writing-sentence' },
                            { label: 'Write an Email', targetId: 'toefl-writing-email' },
                            { label: 'Write for an Academic Discussion', targetId: 'toefl-writing-academic' }
                          ].map((pill, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                document.getElementById(pill.targetId)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 hover:text-purple-600 hover:border-purple-300 text-[11px] font-bold px-4 py-2 rounded-full transition-all cursor-pointer shadow-3xs"
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Build a Sentence */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-writing-sentence">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                          Build a Sentence
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [
                              'Build a Sentence - 13',
                              'Build a Sentence - 12',
                              'Build a Sentence - 11',
                              'Build a Sentence - 10',
                              'Build a Sentence - 9'
                            ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/13 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Rearrange words to form a complete sentence
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You are given a short exchange between speakers. One sentence is shown in full, and the response sentence is presented with words or phrases missing. These missing chunks are provided in a separate list. Your task is to arrange these chunks to form a coherent, grammatical structure.
                          </p>
                        </div>

                        {/* List Items of Sentences */}
                        <div className="space-y-3">
                          {[
                            'Build a Sentence - 13',
                            'Build a Sentence - 12',
                            'Build a Sentence - 11',
                            'Build a Sentence - 10',
                            'Build a Sentence - 9'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-purple-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-purple-50/50 border border-purple-100/50 flex items-center justify-center shrink-0">
                                    <PenTool className="w-4.5 h-4.5 text-purple-600" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflWritingDrill(title, 'Build a Sentence'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Loading more scrambled syntax tests... Check back soon!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Write for an Academic Discussion */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-writing-academic">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                          Write for an Academic Discussion
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [
                              'Geographic Mobility',
                              'Online Classes',
                              'Relieving Stress',
                              'Extreme Sports',
                              'City Government Spending'
                            ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/8 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Write a response in an academic discussion forum
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You participate in a simulated online class discussion. A professor introduces a topic and poses a question, followed by short posts from two students expressing different views. Your task is to contribute your own response to the discussion, stating a clear argument and justifying your stance.
                          </p>
                        </div>

                        {/* List Items of Academic Discussions */}
                        <div className="space-y-3">
                          {[
                            'Geographic Mobility',
                            'Online Classes',
                            'Relieving Stress',
                            'Extreme Sports',
                            'City Government Spending'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-purple-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-purple-50/50 border border-purple-100/50 flex items-center justify-center shrink-0">
                                    <PenTool className="w-4.5 h-4.5 text-purple-600" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-md sm:ml-3 mt-1 sm:mt-0 border border-blue-100 w-fit">
                                      graded in 1 min
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide sm:ml-3 mt-1 sm:mt-0">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflWritingDrill(title, 'Write for an Academic Discussion'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing more academic forum arguments... Keep practicing!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>

                    {/* Section 3: Write an Email */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-writing-email">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                          Write an Email
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84]">
                          {(() => {
                            const solvedCount = [
                              'Camping Trip',
                              'Elevator out of Order',
                              'Carpooling Group',
                              'Cooking Class',
                              'Mentoring Program'
                            ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/6 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight">
                            Write an email for an academic or everyday situation
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                            You are given a short scenario set in an academic or everyday context, such as contacting an editor, instructor, or organization. You must write an email that clearly achieves a specific communicative purpose, such as requesting information, explaining a problem, or offering support, utilizing correct style levels.
                          </p>
                        </div>

                        {/* List Items of Emails */}
                        <div className="space-y-3">
                          {[
                            'Camping Trip',
                            'Elevator out of Order',
                            'Carpooling Group',
                            'Cooking Class',
                            'Mentoring Program'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-purple-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-purple-50/50 border border-purple-100/50 flex items-center justify-center shrink-0">
                                    <PenTool className="w-4.5 h-4.5 text-purple-600" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-[13px] font-black text-[#111827] block">
                                      {title}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-md sm:ml-3 mt-1 sm:mt-0 border border-blue-100 w-fit">
                                      graded in 1 min
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide sm:ml-3 mt-1 sm:mt-0">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflWritingDrill(title, 'Write an Email'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing student services registry logs... Setup complete for active exercises!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none"
                        >
                          More questions
                        </button>
                      </div>
                    </div>
                  </div>
                ) : practiceSection === 'Speaking' ? (
                  <div className="space-y-12 animate-fade-in text-left select-none pb-12 font-sans" id="toefl-speaking-workspace">
                    {/* Top Video/Interactive Lecture Banner */}
                    <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-3xs" id="toefl-speaking-video-banner">
                      {/* Simulated Video Player Graphic */}
                      <div className="w-full lg:w-[400px] h-[225px] shrink-0 rounded-2xl relative overflow-hidden bg-[#7C2D12] flex flex-col justify-between p-4 shadow-sm select-none group border border-amber-100">
                        {/* Elegant orange-infused progress/background graphics */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#431407] via-[#7C2D12] to-[#EA580C] opacity-90 z-0" />
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-3xs">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-[10px] font-black text-white/90 font-sans">TOEFL® prep</span>
                        </div>
                        
                        {/* Play button indicator overlay */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-10">
                          <button
                            type="button"
                            onClick={() => alert('Playing the 2026 TOEFL Speaking Strategy Seminar - Perfect Pronunciation Masterclass.')}
                            className="w-14 h-14 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Play className="w-6 h-6 fill-orange-600 pl-0.5" />
                          </button>
                        </div>

                        {/* Title text */}
                        <div className="z-10 mt-14">
                          <h4 className="text-[20px] font-black leading-tight text-white tracking-tight drop-shadow-sm font-sans">
                            TOEFL® 2026
                          </h4>
                          <h4 className="text-[20px] font-black leading-tight text-white/90 tracking-tight drop-shadow-sm font-sans">
                            Speaking Section
                          </h4>
                        </div>

                        {/* Bottom Bar items */}
                        <div className="z-10 flex justify-between items-center w-full pt-2">
                          <div className="flex items-center space-x-1.5 text-white/80">
                            <span className="text-[10px] font-black font-mono">ITP</span>
                          </div>
                          <span className="bg-slate-950/70 text-[10px] font-mono text-white/90 font-black px-2 py-0.5 rounded shadow-2xs">
                            28:09
                          </span>
                        </div>
                      </div>

                      {/* Right-hand Description part */}
                      <div className="flex-1 space-y-4 text-left">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight font-sans">
                          Speaking
                        </h2>
                        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed font-sans">
                          The Speaking Section assesses your ability to communicate clearly and effectively in spoken English across both academic and everyday situations. It measures foundational skills such as accurate listening and clear pronunciation, as well as communicative skills such as organizing ideas, expressing opinions, and responding appropriately in conversation.
                        </p>

                        {/* Navigation pills */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {[
                            { label: 'Listen and Repeat', targetId: 'toefl-speaking-repeat' },
                            { label: 'Take an Interview', targetId: 'toefl-speaking-interview' }
                          ].map((pill, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                document.getElementById(pill.targetId)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 hover:text-orange-600 hover:border-orange-300 text-[11px] font-bold px-4 py-2 rounded-full transition-all cursor-pointer shadow-3xs font-sans"
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Highly stylized orange Speaking Shadowing Card from the image */}
                    <div className="bg-[#FFF8F2] border border-[#FFECD5] rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-3xs" id="speaking-shadowing-ad">
                      <div className="space-y-1.5 text-left">
                        <h4 className="text-[15px] font-black text-orange-900 tracking-tight font-sans">
                          Speaking Shadowing Exercises
                        </h4>
                        <p className="text-xs text-orange-750 font-semibold leading-relaxed font-sans">
                          Each exercise includes one sentence. Listen to the sentence, then record your response one sentence at a time.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => startTestEngine(getToeflSpeakingDrill('Car Rental Agency', 'Speaking Shadowing'))}
                        className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-xl text-xs font-black px-6 py-3 transition-all shrink-0 cursor-pointer shadow-sm select-none font-sans"
                      >
                        Start Exercise
                      </button>
                    </div>

                    {/* Section 1: Listen and Repeat */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-speaking-repeat">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight font-sans">
                          Listen and Repeat
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84] font-sans">
                          {(() => {
                            const solvedCount = [
                              'Car Rental Agency',
                              'Furniture Store',
                              'Buffet Restaurant',
                              'Internet Cafe',
                              'Hotel'
                            ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/10 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                            Listen to sentences and repeat them clearly
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed font-sans">
                            You hear sentences within a short academic or campus-life scenario and must repeat each sentence exactly once. Sentences become progressively longer and more complex as the task continues, and you have a limited time (about 8-12 seconds) to record.
                          </p>
                        </div>

                        {/* List Items of Listen & Repeat */}
                        <div className="space-y-3">
                          {[
                            'Car Rental Agency',
                            'Furniture Store',
                            'Buffet Restaurant',
                            'Internet Cafe',
                            'Hotel'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-orange-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-orange-50/50 border border-orange-100/50 flex items-center justify-center shrink-0 animate-fade-in">
                                    <Volume2 className="w-4.5 h-4.5 text-orange-600" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-[13px] font-black text-[#111827] block font-sans">
                                      {title}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-md sm:ml-3 mt-1 sm:mt-0 border border-blue-100 w-fit font-sans">
                                      graded in 1 min
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide sm:ml-3 mt-1 sm:mt-0 font-sans">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflSpeakingDrill(title, 'Listen and Repeat'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs font-sans"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing more oral repetition templates... Check back soon!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none font-sans"
                        >
                          More questions
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Take an Interview */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 border-t border-slate-100 pt-8" id="toefl-speaking-interview font-sans">
                      {/* Left Header */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight font-sans">
                          Take an Interview
                        </h3>
                        <div className="text-xs font-black text-[#5C6E84] font-sans">
                          {(() => {
                            const solvedCount = [
                              'Favorite Item',
                              'Dream Home',
                              'Artistic Skill',
                              'Memories & Photographs',
                              'Fashion choices'
                            ].filter(t => completedPracticeCount[t] && completedPracticeCount[t] > 0).length;
                            return `${solvedCount}/8 Solved`;
                          })()}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                            Answer interview questions in a simulated conversation
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed font-sans">
                            You participate in a simulated interview with a prerecorded interviewer across everyday and academic contexts. You respond to questions, with 45 seconds to answer each one.
                          </p>
                        </div>

                        {/* List Items of Take an Interview */}
                        <div className="space-y-3">
                          {[
                            'Favorite Item',
                            'Dream Home',
                            'Artistic Skill',
                            'Memories & Photographs',
                            'Fashion choices'
                          ].map((title, idx) => {
                            const isCompleted = (completedPracticeCount[title] || 0) > 0;
                            return (
                              <div
                                key={idx}
                                className="bg-white border border-slate-100 hover:border-orange-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all"
                              >
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-10 h-10 rounded-xl bg-orange-50/50 border border-orange-100/50 flex items-center justify-center shrink-0">
                                    <Mic className="w-4.5 h-4.5 text-orange-600" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-[13px] font-black text-[#111827] block font-sans">
                                      {title}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-md sm:ml-3 mt-1 sm:mt-0 border border-blue-100 w-fit font-sans">
                                      graded in 1 min
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-black text-[#16A34A] leading-none uppercase tracking-wide sm:ml-3 mt-1 sm:mt-0 font-sans font-sans">
                                        ✓ Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => startTestEngine(getToeflSpeakingDrill(title, 'Take an Interview'))}
                                  className="bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black px-4 py-2 transition-all uppercase tracking-wider select-none cursor-pointer border border-[#1e293b]/20 shrink-0 shadow-3xs font-sans"
                                >
                                  Try now
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => alert('Accessing student services registry logs... Setup complete for active exercises!')}
                          className="w-full text-center py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-xs font-black text-slate-500 rounded-[12px] shadow-3xs cursor-pointer select-none font-sans"
                        >
                          More questions
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Other categories default fallback
                  <div className="space-y-8 animate-fade-in text-left">
                    <div className="space-y-2 max-w-4xl pt-4">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                        TOEFL® {practiceSection} Practice
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                        Improve your TOEFL® {practiceSection} scores using specialized full-evaluation interactive practice drills in standard formats.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {[
                        { title: 'Independent Choice Topic', tag: 'Independent Task', desc: 'State a clear, reasoned stance on campus dormitory housing policy shifts.' },
                        { title: 'Integrated Campus Lecture', tag: 'Integrated Task', desc: 'Listen to a natural science teacher explain bird predator cycles, then summarize.' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs flex flex-col justify-between text-left min-h-[160px]">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-black text-purple-600 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full select-none">{item.tag}</span>
                            <h3 className="font-black text-slate-800 text-sm pt-1 tracking-tight">{item.title}</h3>
                            <p className="text-[11.5px] text-[#5C6E84] font-semibold line-clamp-2 leading-tight">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const matchedTest = TOEFL_TESTS[0];
                              if (matchedTest) startTestEngine(matchedTest);
                            }}
                            className="mt-4 bg-[#1E293B] hover:bg-slate-800 text-white rounded-lg text-[10px] font-black py-2.5 text-center uppercase tracking-wider select-none shrink-0 cursor-pointer"
                          >
                            Start Section
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ==================== IELTS/PTE ORIGINAL PRACTICE VIEW ==================== */
              <>
                {/* Main Text & Instructions Header */}
                <div className="space-y-2 max-w-4xl mx-auto pt-4 text-center md:text-left select-none">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    Practice Questions
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                    ITP's AI recommends the question types you need to work on the most. By comparing your test data to that of other users with similar learning profiles, the AI predicts what question types you are most likely to struggle with.
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4" id="practice-cards-grid">
                  {(() => {
                    const filteredCards = PRACTICE_CARDS_DATA.filter((card) => card.section === practiceSection);
                    const visibleCards = showAllPracticeCards ? filteredCards : filteredCards.slice(0, 6);
                    return visibleCards.map((card) => {
                      const completedCount = completedPracticeCount[card.title] || 0;
                      return (
                        <div
                          key={card.id}
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs hover:shadow-xs hover:border-blue-100 transition-all flex flex-col justify-between text-left relative min-h-[175px]"
                        >
                          {/* Top Row: Title & Progress */}
                          <div className="flex justify-between items-start gap-3">
                            <h3
                              className="font-black text-slate-700 text-sm tracking-tight leading-tight select-none pr-12 line-clamp-1 truncate"
                              title={card.title}
                            >
                              {card.title}
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-200/40 rounded-full px-2.5 py-0.5 shrink-0 absolute top-6 right-6">
                              {completedCount}/{card.totalQuestions}
                            </span>
                          </div>

                          {/* Tags/Skill Pills Wrapper */}
                          <div className="flex flex-wrap gap-2 mt-4 flex-1 items-start content-start">
                            {card.tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                  // Dynamically load relevant practice question
                                  const testDrill = getPracticeDrill(card.title, tag);
                                  startTestEngine(testDrill);
                                }}
                                className="bg-slate-50/60 hover:bg-blue-50 border border-slate-200/50 text-[#64748B] hover:text-blue-600 hover:border-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer select-none"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Bottom Toggle Button matching screenshot "HIDE ^" or "SHOW MORE v" */}
                <div className="flex justify-center pt-6 select-none bg-white py-4 rounded-3xl max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setShowAllPracticeCards((p) => !p)}
                    className="text-xs font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer py-2 px-6 border border-slate-200/50 bg-slate-50 rounded-full shadow-3xs"
                  >
                    <span>{showAllPracticeCards ? 'Hide' : 'Show All'}</span>
                    <span className="text-[9px]">{showAllPracticeCards ? '▲' : '▼'}</span>
                  </button>
                </div>

                {/* Lectures Section */}
                <div className="space-y-6 pt-10 border-t border-slate-100 select-none text-left" id="lectures-wrapper">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 text-left tracking-tight">
                    Lectures
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="lectures-grid">
                    {LECTURES_DATA.filter((lec) => lec.section === practiceSection).map((lec) => (
                      <button
                        key={lec.id}
                        type="button"
                        onClick={() => {
                          setSelectedTopicLecture(lec);
                          setLectureSlideIdx(0);
                          setSelectedQuizOption(null);
                          setQuizSubmitted(false);
                        }}
                        className="bg-[#FCF5F5] hover:bg-[#FDF0F0] border border-[#F9E5E5] rounded-[22px] p-6 hover:shadow-xs hover:scale-[1.01] transition-all flex justify-between items-center text-left cursor-pointer group min-h-[96px] w-full"
                      >
                        <span className="font-extrabold text-slate-800 text-xs sm:text-[13px] leading-snug pr-4 group-hover:text-red-900 transition-colors">
                          {lec.title}
                        </span>
                        <div className="w-1.5 h-6 bg-[#CCE25D] group-hover:bg-[#BBE245] rounded-full shrink-0 transition-colors" style={{ backgroundColor: '#CCE25D' }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Materials Section */}
                <div className="space-y-6 pt-10 border-t border-slate-100 select-none text-left" id="other-materials-section">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    Other Materials
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setExercisesModalOpen(true)}
                      className="bg-white border border-slate-100 rounded-[24px] p-6 text-left flex justify-between items-center cursor-pointer hover:shadow-xs hover:border-slate-200 transition-all group min-h-[110px] w-full max-w-xl shadow-2xs relative overflow-hidden"
                    >
                      <div className="space-y-1 z-10">
                        <h3 className="font-black text-slate-800 text-base">
                          Exercises
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold max-w-sm">
                          Exercises to help you master various skills for IELTS
                        </p>
                      </div>
                      
                      {/* Decorative circle matching image with circle text */}
                      <div className="relative flex items-center justify-center shrink-0 ml-4">
                        <div className="w-16 h-16 rounded-full bg-linear-to-tr from-rose-500 to-pink-500 flex flex-col items-center justify-center text-white relative shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-[7.5px] font-black tracking-widest uppercase text-white/90">EXERCISE</span>
                          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 animate-pulse" />
                        </div>
                        {/* Animated Chevron Arrow indicator */}
                        <ChevronRight className="w-5 h-5 text-blue-500 ml-3 group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Red / Pink Elegant Premium Call-out Banner */}
                <div className="pt-8 select-none" id="mock-test-promo-banner">
                  <div className="bg-linear-to-b from-[#FFF5F5] to-[#FFEFEF] border border-red-100/40 rounded-[32px] p-8 sm:p-12 text-center flex flex-col justify-center items-center relative overflow-hidden shadow-2xs">
                    {/* Decorative background shapes */}
                    <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-red-100/30 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
                    
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-mono mb-2">
                      Think you got what it takes?
                    </span>
                    
                    <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight max-w-2xl">
                      Test your skills with our mock test!
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-500 font-bold mt-2.5 max-w-xl">
                      Purchase an IELTS plan and receive 11 Real Life Mock Tests!
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => setPurchaseModalOpen(true)}
                      className="mt-6 bg-[#ff4b55] hover:bg-rose-600 active:bg-rose-700 text-white font-black text-xs px-8 py-3.5 rounded-full cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-rose-500/15 uppercase tracking-widest"
                    >
                      Get Access
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== UNIVERSITY & SCHOLARSHIP FINDER VIEW ==================== */}
        {currentTab === 'Finder' && (
          <div className="space-y-8 animate-fade-in text-left select-none" id="finder-workspace">
            <FinderPage />
          </div>
        )}

        {/* ==================== PRICING PLANS VIEW ==================== */}
        {currentTab === 'Plans' && (
          <div className="space-y-8 animate-fade-in text-left select-none" id="plans-workspace">
            <PlansPage />
          </div>
        )}

        {/* ==================== INTERACTIVE VOCABULARY CHART VIEW ==================== */}
        {currentTab === 'Vocab Chart' && (
          <div className="space-y-8 animate-fade-in text-left select-none" id="vocab-chart-workspace-container">
            <VocabChartPage />
          </div>
        )}

        {/* ==================== TEST RECORDS VIEW ==================== */}
        {currentTab === 'Test Records' && (
          <div className="space-y-8 animate-fade-in text-left select-none" id="test-records-workspace">
            {/* Title & Filters Panel */}
            <div className="space-y-6 pt-2">
              <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-none">
                Practice Log
              </h1>
              
              {/* Responsive Pill Filter System */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 pb-3" id="filters-container">
                {/* Group 1: General Category type */}
                <div className="flex flex-wrap items-center gap-2" id="log-type-pills">
                  {(['All Records', 'Full Test', 'Section Test', 'Practice Question'] as const).map((typeOpt) => {
                    const isSelected = logTypeFilter === typeOpt;
                    let typeClass = '';
                    if (isSelected) {
                      switch (typeOpt) {
                        case 'All Records':
                          typeClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-105/40 scale-[1.02]';
                          break;
                        case 'Full Test':
                          typeClass = 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-105/40 scale-[1.02]';
                          break;
                        case 'Section Test':
                          typeClass = 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-105/40 scale-[1.02]';
                          break;
                        case 'Practice Question':
                          typeClass = 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-105/40 scale-[1.02]';
                          break;
                      }
                    } else {
                      switch (typeOpt) {
                        case 'All Records':
                          typeClass = 'bg-blue-50/60 text-blue-600 border border-blue-100/80 hover:bg-blue-100/80';
                          break;
                        case 'Full Test':
                          typeClass = 'bg-purple-50/60 text-purple-600 border border-purple-100/80 hover:bg-purple-100/80';
                          break;
                        case 'Section Test':
                          typeClass = 'bg-teal-50/60 text-teal-700 border border-teal-100/80 hover:bg-teal-100/80';
                          break;
                        case 'Practice Question':
                          typeClass = 'bg-amber-50/60 text-amber-700 border border-amber-100/80 hover:bg-amber-100/80';
                          break;
                      }
                    }

                    return (
                      <button
                        key={typeOpt}
                        type="button"
                        onClick={() => setLogTypeFilter(typeOpt)}
                        className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all ${typeClass}`}
                      >
                        {typeOpt}
                      </button>
                    );
                  })}
                </div>

                {/* Group 2: Skill Category selection */}
                <div className="flex flex-wrap items-center gap-2" id="log-section-pills">
                  {(['All Sections', 'Reading', 'Listening', 'Writing', 'Speaking'] as const).map((secOpt) => {
                    const isSelected = logSectionFilter === secOpt;
                    let secClass = '';
                    if (isSelected) {
                      switch (secOpt) {
                        case 'All Sections':
                          secClass = 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-105/40 scale-[1.02]';
                          break;
                        case 'Reading':
                          secClass = 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-105/40 scale-[1.02]';
                          break;
                        case 'Listening':
                          secClass = 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-105/40 scale-[1.02]';
                          break;
                        case 'Writing':
                          secClass = 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-105/40 scale-[1.02]';
                          break;
                        case 'Speaking':
                          secClass = 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-105/40 scale-[1.02]';
                          break;
                      }
                    } else {
                      switch (secOpt) {
                        case 'All Sections':
                          secClass = 'bg-violet-50/60 text-violet-600 border border-violet-100/80 hover:bg-violet-100/80';
                          break;
                        case 'Reading':
                          secClass = 'bg-emerald-50/60 text-emerald-700 border border-emerald-100/80 hover:bg-emerald-100/80';
                          break;
                        case 'Listening':
                          secClass = 'bg-sky-50/60 text-sky-700 border border-sky-100/80 hover:bg-sky-100/80';
                          break;
                        case 'Writing':
                          secClass = 'bg-orange-50/60 text-orange-755 border border-orange-100/80 hover:bg-orange-100/80';
                          break;
                        case 'Speaking':
                          secClass = 'bg-rose-50/60 text-rose-700 border border-rose-100/80 hover:bg-rose-100/80';
                          break;
                      }
                    }

                    return (
                      <button
                        key={secOpt}
                        type="button"
                        onClick={() => setLogSectionFilter(secOpt)}
                        className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all ${secClass}`}
                      >
                        {secOpt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Core Records evaluation display */}
            {(() => {
              // Internal helper to determine category / type classifications dynamically
              const getRecordType = (rec: UserTestRecord): 'Full Test' | 'Section Test' | 'Practice Question' => {
                const titleLower = rec.testTitle.toLowerCase();
                if (titleLower.includes('drill') || titleLower.includes('practice') || titleLower.includes('exercise')) {
                  return 'Practice Question';
                }
                if (titleLower.includes('mock') || titleLower.includes('full exam')) {
                  return 'Full Test';
                }
                return 'Section Test';
              };

              const getRecordSection = (rec: UserTestRecord): 'Reading' | 'Listening' | 'Writing' | 'Speaking' | 'General' => {
                const titleLower = rec.testTitle.toLowerCase();
                if (titleLower.includes('reading')) return 'Reading';
                if (titleLower.includes('listening')) return 'Listening';
                if (titleLower.includes('writing')) return 'Writing';
                if (titleLower.includes('speaking')) return 'Speaking';
                return 'General';
              };

              const filteredRecords = userRecords.filter((rec) => {
                // Type Filter
                if (logTypeFilter !== 'All Records') {
                  const recType = getRecordType(rec);
                  if (recType !== logTypeFilter) return false;
                }
                
                // Section Filter
                if (logSectionFilter !== 'All Sections') {
                  const recSection = getRecordSection(rec);
                  if (recSection !== logSectionFilter) return false;
                }
                
                return true;
              });

              if (filteredRecords.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-24 text-center select-none" id="empty-records-canvas">
                    <h2 className="text-base font-black text-slate-850 max-w-sm mb-1.5" id="no-records-title" style={{ color: '#1a1a1a' }}>
                      There are no records
                    </h2>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-6" id="no-records-sub">
                      Want to start studying?
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // Switch active tabs to encourage mock tests simulations
                        setCurrentTab('Mock Tests');
                      }}
                      className="bg-slate-900 hover:bg-black text-white text-[11px] font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer shadow-3xs hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Take a test
                    </button>
                  </div>
                );
              }

              return (
                <div className="space-y-6 animate-fade-in">
                  {/* Ledger Table listing filtered results */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs" id="ledger-history-table">
                    <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-6">
                      Historical Study Ledger ({filteredRecords.length} Match{filteredRecords.length !== 1 && 'es'})
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-semibold text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                            <th className="pb-3 pr-4">Test Title & Module</th>
                            <th className="pb-3 px-4">Exam Type</th>
                            <th className="pb-3 px-4">Classification</th>
                            <th className="pb-3 px-4">Submission Date</th>
                            <th className="pb-3 px-4">AI Score Achieved</th>
                            <th className="pb-3 pl-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-slate-700">
                          {filteredRecords.map((rec) => {
                            const recType = getRecordType(rec);
                            const recSec = getRecordSection(rec);
                            return (
                              <tr key={rec.id} className="hover:bg-slate-50/50">
                                <td className="py-4 pr-4">
                                  <span className="font-extrabold text-slate-800 block leading-tight">{rec.testTitle}</span>
                                  <span className="text-[10px] text-gray-400 block mt-0.5 font-medium">Session ID: #{rec.id.substring(0, 6)}</span>
                                </td>
                                <td className="py-4 px-4 font-black text-blue-600">{rec.exam}</td>
                                <td className="py-4 px-4">
                                  <span className="inline-flex items-center gap-1.5">
                                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">
                                      {recType}
                                    </span>
                                    {recSec !== 'General' && (
                                      <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-blue-50 rounded-md text-blue-600">
                                        {recSec}
                                      </span>
                                    )}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-gray-500 font-medium">{rec.date}</td>
                                <td className="py-4 px-4 font-extrabold">
                                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                                    {rec.overallScore} / {rec.overallOutOf}
                                  </span>
                                </td>
                                <td className="py-4 pl-4 text-right">
                                  <button
                                    onClick={() => {
                                      const sampleQuestion = {
                                        id: 're-read',
                                        section: rec.testTitle.split(' - ')[1] as any || 'Writing',
                                        title: rec.testTitle,
                                        prompt: rec.evaluation?.feedback?.generalFeedback || 'Saved practice session.',
                                        timeLimit: 120,
                                        type: 'text-input' as const,
                                      };

                                      const pseudoTest: MockTest = {
                                        id: `pseudo-${rec.id}`,
                                        exam: rec.exam,
                                        title: rec.testTitle,
                                        duration: 'Archived Record',
                                        questionsCount: 1,
                                        description: 'Reviewing archived AI results feedback report parameters.',
                                        difficulty: 'Medium',
                                        questions: [sampleQuestion],
                                      };

                                      startTestEngine(pseudoTest);
                                    }}
                                    className="text-white bg-slate-800 hover:bg-slate-900 border border-gray-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer text-[11px] font-bold uppercase tracking-wider"
                                  >
                                    Review Report
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>
      )}

      {/* Footer component */}
      {currentTab !== 'Blog' && (
        <Footer
          onTakeMockTest={() => {
            // Find first available test for selected exam and launch it instantly!
            const firstTest = activeExamsMockTests[0] || null;
            if (firstTest) {
              startTestEngine(firstTest);
            } else {
              alert('Notice: Preparing exam packet, try again in a moment!');
            }
          }}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Dynamic Video Lectures Learning Player Modal Overlay */}
      {lectureModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full border border-gray-100 shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[600px] animate-scale-in">
            {/* Left Column: List of Lectures */}
            <div className="w-full md:w-80 bg-slate-50 border-r border-slate-100 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-left">
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">
                      Level Up Strategy
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-800">Video Masterclass</h3>
                  </div>
                </div>

                <div className="space-y-2 mt-4 overflow-y-auto max-h-[40vh] md:max-h-[380px] pr-1">
                  {[
                    { id: 'l1', title: 'Intro to Academic Essay Writing', category: 'Writing', duration: '18 min' },
                    { id: 'l2', title: 'Dynamic Listening: Fact Mapping', category: 'Listening', duration: '12 min' },
                    { id: 'l3', title: 'IELTS Speaking part 2: Fluency secrets', category: 'Speaking', duration: '10 min' },
                    { id: 'l4', title: 'Academic Reading: Complex Skimming', category: 'Reading', duration: '15 min' }
                  ].map((lec) => {
                    const isActive = activeLectureId === lec.id;
                    return (
                      <div
                        key={lec.id}
                        onClick={() => {
                          setActiveLectureId(lec.id);
                          setLecturePlaying(false);
                        }}
                        className={`p-3.5 rounded-2xl cursor-pointer text-left transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-100/70 border border-slate-200/60'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {lec.category}
                          </span>
                          <span className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-400'} font-bold`}>
                            {lec.duration}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold leading-snug">
                          {lec.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bot Prompt CTA */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left mt-4 md:mt-0">
                <p className="text-[10px] font-bold text-indigo-900 leading-normal">
                  💡 <span className="font-extrabold">Tip:</span> Confused about study advice? Tell the chatbot "I am watching masterclass" to drill personalized grammar tasks matching what you learn.
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Interactive Player Simulator */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">
                      Exam Type: {activeExam} calibration
                    </span>
                    <h3 className="text-base font-black text-slate-800">
                      {activeLectureId === 'l1' && 'Intro to Academic Essay Writing'}
                      {activeLectureId === 'l2' && 'Dynamic Listening: Fact Mapping'}
                      {activeLectureId === 'l3' && 'IELTS Speaking part 2: Fluency secrets'}
                      {activeLectureId === 'l4' && 'Academic Reading: Complex Skimming'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setLectureModalOpen(false);
                      setLecturePlaying(false);
                    }}
                    className="p-1 px-3 text-[11px] font-bold text-gray-400 hover:text-slate-900 bg-slate-100 rounded-full cursor-pointer uppercase transition-all"
                  >
                    Close
                  </button>
                </div>

                {/* Simulated Custom Video Frame with animated waveform/play overlays */}
                <div className="aspect-video bg-slate-950 rounded-[24px] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner border border-slate-900 select-none">
                  <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950/20 z-0" />
                  
                  {/* Waveforms & dynamic elements while "playing" */}
                  {lecturePlaying ? (
                    <div className="z-10 space-y-4 w-full">
                      <div className="flex items-center justify-center space-x-1">
                        {[4, 10, 6, 8, 12, 16, 12, 8, 6, 12, 10, 4].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-indigo-500 rounded-full animate-pulse animate-duration-75"
                            style={{
                              height: `${h * 2}px`,
                              animationDelay: `${i * 0.15}s`
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-indigo-300 font-bold tracking-wider animate-pulse font-mono uppercase">
                        Streaming HD Media segment...
                      </p>
                    </div>
                  ) : (
                    <div className="z-10 space-y-3">
                      <button
                        onClick={() => setLecturePlaying(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-5 rounded-full shadow-lg transform hover:scale-105 transition-all outline-none border border-indigo-400 cursor-pointer text-xl"
                      >
                        ▶
                      </button>
                      <p className="text-xs text-slate-300/90 font-semibold">
                        Ready to level up? Click play to start simulation audio lectures
                      </p>
                    </div>
                  )}

                  {/* Absolute bottom bar of player */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/90 flex items-center justify-between z-10 border-t border-slate-900">
                    <button
                      onClick={() => setLecturePlaying(!lecturePlaying)}
                      className="text-[11px] font-bold uppercase text-slate-200 hover:text-white cursor-pointer"
                    >
                      {lecturePlaying ? 'Pause ⏸' : 'Play ▶'}
                    </button>
                    {/* Fake Slider */}
                    <div className="flex-1 mx-4 h-1 bg-slate-800 rounded-full relative overflow-hidden">
                      <div
                        className={`h-full bg-indigo-500 transition-all duration-[30s] rounded-full ${
                          lecturePlaying ? 'w-1/3' : 'w-1/12'
                        }`}
                      />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      1080p HD
                    </span>
                  </div>
                </div>
              </div>

              {/* Lesson insights */}
              <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-5 text-left text-xs text-slate-600 space-y-2 leading-relaxed">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">
                  Core Lecture Insights
                </span>
                {activeLectureId === 'l1' && (
                  <p className="font-semibold">
                    🔑 <span className="font-bold text-slate-800">Learn:</span> Every high-scoring Task 2 response needs an affirmative thesis statement. Write exactly 4 paragraphs: introduction with your viewpoint, two core body structures demonstrating critical synthesis, and a concluding reflection validating the primary points.
                  </p>
                )}
                {activeLectureId === 'l2' && (
                  <p className="font-semibold">
                    🔑 <span className="font-bold text-slate-800">Learn:</span> Distractors are the number one cause of lost marks. In Section 1 library or travel registration tasks, listen for correction cues: "It's 42 Garden Avenue... wait, sorry, that’s 42 Linden Gardens". Always wait for the final correction block!
                  </p>
                )}
                {activeLectureId === 'l3' && (
                  <p className="font-semibold">
                    🔑 <span className="font-bold text-slate-800">Learn:</span> Fluency does not mean talking rapidly without breathing. Instead, practice signposting. Connect ideas naturally using cohesive devices like "In terms of...", "Regarding...", or "To put it another way..." to buy extra cognitive thinking time.
                  </p>
                )}
                {activeLectureId === 'l4' && (
                  <p className="font-semibold">
                    🔑 <span className="font-bold text-slate-800">Learn:</span> Do not read every single word inside an academic passage. Scan paragraph headers first to construct an informational map. Tackle vocabulary-in-context questions first to gain visual familiarity with the core academic text topics!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== INTERACTIVE TOPIC LECTURE MODAL ==================== */}
      {selectedTopicLecture && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" id="topic-lecture-modal">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col animate-scale-in">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex justify-between items-center text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest block font-mono">
                  Mastery Class • {selectedTopicLecture.section} Section
                </span>
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug pr-4">
                  {selectedTopicLecture.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTopicLecture(null)}
                className="text-xs font-black text-slate-400 hover:text-slate-800 bg-slate-200/50 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-all uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {/* Progress indicator */}
            <div className="px-6 pt-5 flex items-center justify-between select-none">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                Step {lectureSlideIdx + 1} of {selectedTopicLecture.slides.length + (selectedTopicLecture.quiz ? 1 : 0)}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: selectedTopicLecture.slides.length + (selectedTopicLecture.quiz ? 1 : 0) }).map((_, stepIdx) => (
                  <div
                    key={stepIdx}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      stepIdx === lectureSlideIdx ? 'bg-[#16A34A]' : 'bg-slate-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Body Slide Container */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[50vh] text-left">
              {lectureSlideIdx < selectedTopicLecture.slides.length ? (
                // Concept slide view
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-base font-extrabold text-slate-800 leading-snug border-b border-dotted border-slate-200 pb-2">
                    {selectedTopicLecture.slides[lectureSlideIdx].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold whitespace-pre-line">
                    {selectedTopicLecture.slides[lectureSlideIdx].content}
                  </p>
                </div>
              ) : (
                // Quiz slide view
                selectedTopicLecture.quiz && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-[#FFF5F5] border border-red-50 rounded-2xl p-4 mb-4">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block font-mono mb-1">
                        Skill Check Quiz
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
                        {selectedTopicLecture.quiz.question}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {selectedTopicLecture.quiz.options.map((opt) => {
                        const isSelected = selectedQuizOption === opt;
                        const isCorrect = opt === selectedTopicLecture.quiz?.answer;
                        
                        let opClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-55 text-slate-700';
                        if (isSelected) {
                          opClass = 'border-blue-500 bg-blue-50/50 text-blue-900 border-2';
                        }
                        if (quizSubmitted) {
                          if (isCorrect) {
                            opClass = 'border-[#16A34A] bg-[#F2FDF4] text-green-900 border-2';
                          } else if (isSelected) {
                            opClass = 'border-red-500 bg-red-50/50 text-red-900 border-2';
                          } else {
                            opClass = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => setSelectedQuizOption(opt)}
                            className={`w-full border rounded-xl p-3 text-xs font-bold text-left transition-all ${opClass} ${
                              !quizSubmitted ? 'cursor-pointer' : 'cursor-default'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && (
                                <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider shrink-0 bg-[#E8F8EE] rounded-md px-2 py-0.5">
                                  Correct
                                </span>
                              )}
                              {quizSubmitted && isSelected && !isCorrect && (
                                <span className="text-[10px] font-black uppercase text-red-600 tracking-wider shrink-0 bg-red-50 rounded-md px-2 py-0.5">
                                  Incorrect
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && selectedTopicLecture.quiz && (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs font-semibold text-blue-900 leading-relaxed animate-fade-in">
                        <span className="font-extrabold block mb-1">💡 Instructor Explanation:</span>
                        {selectedTopicLecture.quiz.explanation}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Footer buttons */}
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                disabled={lectureSlideIdx === 0}
                onClick={() => {
                  setLectureSlideIdx((prev) => Math.max(0, prev - 1));
                  if (lectureSlideIdx - 1 < selectedTopicLecture.slides.length) {
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                  }
                }}
                className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  lectureSlideIdx === 0
                    ? 'text-slate-300 bg-slate-100 cursor-not-allowed text-[10px]'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-3xs cursor-pointer text-[10px]'
                }`}
              >
                Back
              </button>

              {lectureSlideIdx < selectedTopicLecture.slides.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setLectureSlideIdx((prev) => prev + 1);
                  }}
                  className="bg-[#16A34A] hover:bg-[#15803D] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  {lectureSlideIdx === selectedTopicLecture.slides.length - 1 && selectedTopicLecture.quiz
                    ? 'Take Skill Quiz'
                    : 'Next Slide'}
                </button>
              ) : !quizSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedQuizOption}
                  onClick={() => setQuizSubmitted(true)}
                  className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-xs ${
                    selectedQuizOption
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopicLecture(null);
                      const relatedTest = getPracticeDrill(selectedTopicLecture.title, 'Identifying');
                      startTestEngine(relatedTest);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    Start Real Drill
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopicLecture(null);
                    }}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== INTERACTIVE EXERCISES SKILL-BUILDER MODAL ==================== */}
      {exercisesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" id="exercises-interactive-modal">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col animate-scale-in">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex justify-between items-center text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block font-mono">
                  IELTS Core Gym • Skills Exercises
                </span>
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
                  Targeted Micro Exercises
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setExercisesModalOpen(false);
                  setSelectedExerciseType(null);
                }}
                className="text-xs font-black text-slate-400 hover:text-slate-800 bg-slate-200/50 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-all uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {/* Exercises selection list panel */}
            {!selectedExerciseType ? (
              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto text-left">
                <p className="text-xs text-slate-500 font-semibold mb-2">
                  Select a targeted skill workout below to practice difficult spelling nuances, listening dictations, or grammar structures instantly:
                </p>
                {[
                  {
                    type: 'Spelling',
                    title: 'IELTS Spelling Correction Gym',
                    desc: 'Train for tricky double letters and silent sounds common in IELTS listening forms.',
                    difficulty: 'Medium',
                  },
                  {
                    type: 'Dictation',
                    title: 'Interactive Travel Dictation Drill',
                    desc: 'Accurately map addresses, phone numbers, and codes directly onto answering lines without losing precision.',
                    difficulty: 'Hard',
                  },
                  {
                    type: 'Grammar',
                    title: 'Preposition & Collocation Repair',
                    desc: 'Fix common syntactic mistakes made by second-language essay writers immediately.',
                    difficulty: 'Easy',
                  }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      setSelectedExerciseType(item.type);
                      setExerciseSlideIdx(0);
                      setTypedInput('');
                      setIsExerciseAnswerSubmitted(false);
                      setCorrectAnswersCount(0);
                    }}
                    className="w-full text-left bg-slate-50/50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 rounded-[20px] p-5 transition-all cursor-pointer block group"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-[#111827] text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[9px] font-black uppercase text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 shrink-0">
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              // Active workout screen
              <div className="p-6 sm:p-8 text-left space-y-5">
                <button
                  type="button"
                  onClick={() => setSelectedExerciseType(null)}
                  className="text-[10px] font-black text-slate-400 hover:text-slate-700 uppercase tracking-widest flex items-center gap-1.5"
                >
                  ◀ Back to Selection
                </button>

                {/* Sub-exercise active workout element */}
                {selectedExerciseType === 'Spelling' && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-[#ff4b55] uppercase tracking-widest font-mono">
                      Spelling Challenge
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
                      "IELTS Listening forms are replete with words like <b>accommodation</b>, <b>environment</b>, and <b>necessary</b> where common errors occur. Please identify and type the correct spelling of the misspelled word: <b>'accomodation'</b> below."
                    </h4>

                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={typedInput}
                        disabled={isExerciseAnswerSubmitted}
                        onChange={(e) => setTypedInput(e.target.value)}
                        placeholder="Type spell correction here..."
                        className="w-full border border-slate-200 focus:outline-blue-500 rounded-xl p-3.5 text-xs font-bold leading-none"
                      />
                    </div>

                    {isExerciseAnswerSubmitted && (
                      <div className={`p-4 rounded-2xl border text-xs font-semibold leading-relaxed animate-fade-in ${
                        typedInput.trim().toLowerCase() === 'accommodation'
                          ? 'bg-[#F2FDF4] border-[#BEEFD4] text-green-900'
                          : 'bg-red-50 border-red-100 text-red-900'
                      }`}>
                        {typedInput.trim().toLowerCase() === 'accommodation' ? (
                          <span>🎉 <b>Excellent Spell Match!</b> You typed 'accommodation' correctly. The letters 'cc' and 'mm' are crucial to score listening points!</span>
                        ) : (
                          <span>❌ <b>Spelling Mistake:</b> The correct spelling is <b>accommodation</b> (with two "c"s and two "m"s). Always practice double-checking form spelling!</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedExerciseType === 'Dictation' && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest font-mono">
                      Dictation Challenge
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
                      "Please listen carefully to this simulated phrase read by a consultant: <i>'Yes, the office is located directly at <b>72 Linden Gardens, SW1</b>.'</i> Please type what you heard exactly to evaluate dictation formatting."
                    </h4>

                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={typedInput}
                        disabled={isExerciseAnswerSubmitted}
                        onChange={(e) => setTypedInput(e.target.value)}
                        placeholder="Type dictation matches exactly..."
                        className="w-full border border-slate-200 focus:outline-blue-500 rounded-xl p-3.5 text-xs font-bold leading-none"
                      />
                    </div>

                    {isExerciseAnswerSubmitted && (
                      <div className={`p-4 rounded-2xl border text-xs font-semibold leading-relaxed animate-fade-in ${
                        typedInput.trim().toLowerCase() === '72 linden gardens, sw1'
                          ? 'bg-[#F2FDF4] border-[#BEEFD4] text-green-900'
                          : 'bg-red-50 border-red-100 text-red-900'
                      }`}>
                        {typedInput.trim().toLowerCase() === '72 linden gardens, sw1' ? (
                          <span>🎉 <b>Perfect Map Calibration!</b> You wrote '72 Linden Gardens, SW1' exactly as written in standard forms.</span>
                        ) : (
                          <span>❌ <b>Dictation Mismatch:</b> You typed '{typedInput || '[Empty]'}'. The exact match is <b>72 Linden Gardens, SW1</b>. Keep practicing.</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedExerciseType === 'Grammar' && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest font-mono">
                      Grammar Repair Challenge
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
                      "Identify and fix the preposition mistake in this academic essay snippet: <i>'In terms with the research, output tripled...'</i> Please write the correct phrase replacing <b>'In terms with'</b>."
                    </h4>

                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={typedInput}
                        disabled={isExerciseAnswerSubmitted}
                        onChange={(e) => setTypedInput(e.target.value)}
                        placeholder="Type standard correction..."
                        className="w-full border border-slate-200 focus:outline-blue-500 rounded-xl p-3.5 text-xs font-bold leading-none"
                      />
                    </div>

                    {isExerciseAnswerSubmitted && (
                      <div className={`p-4 rounded-2xl border text-xs font-semibold leading-relaxed animate-fade-in ${
                        typedInput.trim().toLowerCase() === 'in terms of'
                          ? 'bg-[#F2FDF4] border-[#BEEFD4] text-green-900'
                          : 'bg-red-50 border-red-100 text-red-900'
                      }`}>
                        {typedInput.trim().toLowerCase() === 'in terms of' ? (
                          <span>🎉 <b>Superb Grammar Repair!</b> You selected 'In terms of' correctly. This preposition collocation matches Academic writing rubrics perfectly.</span>
                        ) : (
                          <span>❌ <b>Grammar Hint:</b> The correct idiom is <b>In terms of</b> instead of 'In terms with'. Always check collocations in Task 2 essays!</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Confirm Action Bar */}
                <div className="pt-4 flex justify-between items-center border-t border-slate-100 select-none">
                  {isExerciseAnswerSubmitted ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setTypedInput('');
                          setIsExerciseAnswerSubmitted(false);
                        }}
                        className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                      >
                        Reset Exercise
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedExerciseType(null)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                      >
                        Try Another Work-Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setTypedInput('')}
                        className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        disabled={!typedInput.trim()}
                        onClick={() => setIsExerciseAnswerSubmitted(true)}
                        className={`font-black text-xs px-6 py-2.5 rounded-xl ${
                          typedInput.trim()
                            ? 'bg-[#1e51da] hover:bg-blue-700 text-white cursor-pointer active:scale-95'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        Submit Answer
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== PREMIUM SUBSCRIPTION CHECKOUT MODAL ==================== */}
      {purchaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" id="purchase-plan-modal">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col animate-scale-in">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex justify-between items-center text-left">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
                  Unleash Ultimate IELTS Prep
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPurchaseModalOpen(false);
                  setPurchaseStep('tier');
                }}
                className="text-xs font-black text-slate-400 hover:text-slate-800 bg-slate-200/50 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-all uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {/* Step 1: Pick Study Tier */}
            {purchaseStep === 'tier' && (
              <div className="p-6 sm:p-8 space-y-5 text-left max-h-[60vh] overflow-y-auto">
                <div className="text-center md:text-left space-y-1 mb-2">
                  <h4 className="font-extrabold text-base text-slate-800">
                    Get access to live calibrated IELTS items
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Choose an AI Study package below to activate the complete simulation system:
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'basic',
                      title: '7-Day Crash Pass',
                      price: '$19.00',
                      features: ['3 real-life full mock-tests', 'Grammar diagnostics', 'AI Spontaneous Vocabulary Coach']
                    },
                    {
                      id: 'premium',
                      title: '30-Day IELTS Premium Pass',
                      price: '$41.00',
                      features: ['11 full real-life mock tests', 'Unlimited writing essay evaluations', 'AI conversational speaking score grades', 'Personalized daily skill plan matching'],
                      badge: 'Popular Value'
                    },
                    {
                      id: 'unlimited',
                      title: '90-Day Master Guide',
                      price: '$99.00',
                      features: ['All Mock Tests accessible', 'Direct video masterclasses unlocked', 'Priority feedback with personalized grammar notes']
                    },
                  ].map((tier) => {
                    const isSelected = selectedPurchaseTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedPurchaseTier(tier.id as any)}
                        className={`w-full text-left rounded-2xl p-5 border text-xs transition-all flex justify-between items-start cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-50/50 border-blue-400 shadow-xs ring-1 ring-blue-400'
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-800 text-sm">{tier.title}</span>
                            {tier.badge && (
                              <span className="text-[8px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-mono">
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          
                          <ul className="space-y-1 text-[10.5px] text-slate-500 font-semibold list-disc pl-4 leading-normal">
                            {tier.features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end self-stretch">
                          <span className="font-black text-rose-600 text-sm sm:text-base">{tier.price}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-auto ${
                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPurchaseStep('checkout')}
                    className="w-full bg-[#ff4b55] hover:bg-rose-600 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-colors text-center block"
                  >
                    Proceed to Simulated Checkout
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Simulated Checkout Card Page */}
            {purchaseStep === 'checkout' && (
              <div className="p-6 sm:p-8 space-y-5 text-left select-none animate-fade-in" id="checkout-card-view">
                <button
                  type="button"
                  onClick={() => setPurchaseStep('tier')}
                  className="text-[10px] font-black text-slate-400 hover:text-slate-700 uppercase tracking-widest"
                >
                  ◀ Change Plan
                </button>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">
                    Simulated Sandbox Payment
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Because this is an AI Studio sandbox preview, you can simulate a secure checkout. Enter promo code for 100% off or click checkout to instantly complete the evaluation.
                  </p>
                </div>

                {/* Promo Code Fields */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">
                      Promo Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCardNumber}
                        onChange={(e) => setPromoCardNumber(e.target.value)}
                        placeholder="e.g., ITP100"
                        className="flex-1 border border-slate-200 bg-white focus:outline-[#1e51da] rounded-xl p-2.5 text-xs font-bold leading-none uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (promoCardNumber.trim().toUpperCase() === 'ITP100') {
                            alert('Code ITP100 Applied Successfully! Sandbox checkout cost set to $0.00.');
                          } else {
                            alert('Hint: Type promo code "ITP100" to simulate a 100% free Sandbox discount code!');
                          }
                        }}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black px-4 rounded-xl cursor-pointer transition-colors uppercase tracking-wider"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-200/50 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Selected Plan:</span>
                    <span className="text-slate-800">
                      {selectedPurchaseTier === 'basic' ? '7-Day Crash Pass' : selectedPurchaseTier === 'premium' ? '30-Day IELTS Premium Pass' : '90-Day Master Guide'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Simulated Total:</span>
                    <span className="text-rose-600 font-black">
                      {promoCardNumber.trim().toUpperCase() === 'ITP100' ? '$0.00' : selectedPurchaseTier === 'basic' ? '$19.00' : selectedPurchaseTier === 'premium' ? '$41.00' : '$99.00'}
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseStep('success');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-colors text-center"
                  >
                    🚀 Lock in Sandbox Upgrade
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success page */}
            {purchaseStep === 'success' && (
              <div className="p-6 sm:p-10 space-y-6 text-center animate-fade-in select-none">
                <div className="w-16 h-16 rounded-full bg-linear-to-tr from-green-400 to-[#16A34A] flex items-center justify-center text-white text-3xl mx-auto shadow-md">
                  ✓
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-800">
                    Simulator Premium Unlocked!
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-sm mx-auto">
                    Excellent choice! Your sandbox account is upgraded to the <b>IELTS Premium Success tier</b>. All 11 real-life mock tests are now unlocked!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPurchaseModalOpen(false);
                    setPurchaseStep('tier');
                    setPromoCardNumber('');
                  }}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-black text-xs px-8 py-3 rounded-full cursor-pointer transition-colors uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Chatbot Coach Panel */}
      <ITPBot
        activeExam={activeExam}
        selectedScoreRange={selectedScoreRange}
        isOpen={botChatOpen}
        setIsOpen={setBotChatOpen}
      />

      {/* Floating Take Mock Test Button positioned at the bottom center, visible all the time when scrolling */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <button
          id="persistent-floating-take-mock-test-btn"
          onClick={() => {
            const firstTest = activeExamsMockTests[0] || null;
            if (firstTest) {
              startTestEngine(firstTest);
            } else {
              alert('Notice: Preparing exam packet, try again in a moment!');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs px-10 py-3.5 rounded-full cursor-pointer transition-all duration-150 select-none hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 border border-white/15 flex items-center justify-center tracking-wide uppercase whitespace-nowrap"
        >
          Take Mock Test
        </button>
      </div>
    </div>
  );
}
