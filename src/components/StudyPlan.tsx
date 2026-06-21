import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  BookOpen, 
  Headphones, 
  Pencil, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Check, 
  Play, 
  Languages, 
  Award,
  Video,
  X,
  Bookmark,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { ExamType } from '../types';

interface StudyPlanProps {
  activeExam: ExamType;
  onTakeMockTest: () => void;
  onStartExercise: (exercise: any) => void;
  latestScore?: string;
}

interface Task {
  id: string;
  title: string;
  duration: string;
  type: 'speaking' | 'vocab' | 'lesson' | 'practice';
  iconType: 'mic' | 'vocab' | 'headphones' | 'book';
  details?: string;
  interactiveContent?: {
    videoUrl?: string;
    audioUrl?: string;
    practicePrompt?: string;
    vocabWords?: string[];
  };
}

interface Exercise {
  id: string;
  number: string;
  title: string;
  type: 'Free' | 'Paid';
  length: 'Short' | 'Middle' | 'Long';
  latestScore: string;
  bestScore: string;
  isLocked: boolean;
}

export default function StudyPlan({ activeExam, onTakeMockTest, onStartExercise, latestScore = "-" }: StudyPlanProps) {
  // Persistence state keys based on active exam
  const TEST_DATE_KEY = `itp_study_test_date_${activeExam}`;
  const TARGET_SCORE_KEY = `itp_study_target_score_${activeExam}`;
  const COMPLETED_TASKS_KEY = `itp_study_completed_tasks_v2_${activeExam}`;

  // State initialization
  const [testDate, setTestDate] = useState<string>(() => localStorage.getItem(TEST_DATE_KEY) || '');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [targetScore, setTargetScore] = useState<string>(() => localStorage.getItem(TARGET_SCORE_KEY) || '-');
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);
  const [tempTargetScore, setTempTargetScore] = useState<string>('');

  // Dual View Mode toggles
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({ 1: true });

  // Track completed task IDs
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    const raw = localStorage.getItem(COMPLETED_TASKS_KEY);
    return raw ? JSON.parse(raw) : {};
  });

  // Current selected day (1 to 56)
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [viewExercises, setViewExercises] = useState<boolean>(false);

  // Active interactive task modal state
  const [activeTaskModal, setActiveTaskModal] = useState<Task | null>(null);
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [userSpeechRecordState, setUserSpeechRecordState] = useState<'idle' | 'recording' | 'finished'>('idle');
  const [userSpeechText, setUserSpeechText] = useState<string>('');

  // Synchronize dynamic updates with localStorage
  useEffect(() => {
    localStorage.setItem(TEST_DATE_KEY, testDate);
  }, [testDate, TEST_DATE_KEY]);

  useEffect(() => {
    localStorage.setItem(TARGET_SCORE_KEY, targetScore);
  }, [targetScore, TARGET_SCORE_KEY]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(completedTasks));
  }, [completedTasks, COMPLETED_TASKS_KEY]);

  // Reset day when exam shifts
  useEffect(() => {
    setSelectedDay(1);
    setActiveTaskModal(null);
  }, [activeExam]);

  // 8-Week Course Metadata and Subtitles
  const weeksMetadata: Record<number, { title: string; range: string; description: string }> = {
    1: {
      title: "Foundations & diagnostic",
      range: "Day 1 - Day 7",
      description: "Get your bearings: meet each section, take your first mock test to establish a baseline. Don't worry about the score — focus on understanding the test format."
    },
    2: {
      title: "Building question-type fluency",
      range: "Day 8 - Day 14",
      description: "Dive deep into specific question types. Learn key techniques for sentence completion, matching headers, and speaking template drills."
    },
    3: {
      title: "Deeper question types",
      range: "Day 15 - Day 21",
      description: "Focus on advanced academic vocabulary, writing templates, and compound reading strategies to handle complex passages."
    },
    4: {
      title: "Mid-program checkpoint",
      range: "Day 22 - Day 28",
      description: "Learn to manage your pacing. Work on timing constraints for long-form essays and micro listening intervals."
    },
    5: {
      title: "Listening & Writing focus",
      range: "Day 29 - Day 35",
      description: "Tackle rare or tricky formats. Polish multi-view charts, double-panel speaking prompts and scientific content."
    },
    6: {
      title: "Synthesis & section tests",
      range: "Day 36 - Day 42",
      description: "Build mental stamina for long reading segments. Practice transition words and logical coherence in writing."
    },
    7: {
      title: "Refinement & speed",
      range: "Day 43 - Day 49",
      description: "Simulate exact examination parameters. Evaluate standard progress and fine-tune speaking pause structures."
    },
    8: {
      title: "Test readiness",
      range: "Day 50 - Day 56",
      description: "Perfect your execution rules. Eliminate weak spots, review your vocabulary logs, and step in with ultimate confidence."
    }
  };

  const mockExercises: Exercise[] = Array.from({ length: 20 }, (_, i) => ({
    id: `ex-${100 - i}`,
    number: `#${100 - i}`,
    title: `Exercise ${100 - i}`,
    type: i % 3 === 0 ? 'Free' : 'Paid',
    length: i % 3 === 0 ? 'Short' : i % 3 === 1 ? 'Middle' : 'Long',
    latestScore: '-',
    bestScore: '-',
    isLocked: i > 2
  }));

  // Generate study task list dynamically based on day index (1-based index)
  const getTasksForDay = (day: number): Task[] => {
    if (day === 1) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Shadowing exercises 1-5 (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Practise imitating native speaking flow rhythm and phonetic stresses. Record and compare your pronunciation waveform with our AI scoring standard.",
          interactiveContent: {
            practicePrompt: "The rapid development of modern transportation networks has fundamentally restructured global supply pipelines, allowing goods to flow seamlessly across regional borders.",
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck (~10 min)",
          duration: "10 min",
          type: "vocab",
          iconType: "vocab",
          details: "Master highly academic synonyms, word forms, and phrases tailored precisely for modern high-band criteria.",
          interactiveContent: {
            vocabWords: [
              "Ambivalent (adj.) - having mixed feelings or contradictory ideas about something.",
              "Pragmatic (adj.) - dealing with things sensibly and realistically in a practical way.",
              "Substantiate (verb) - provide evidence to support or prove the truth of.",
              "Epitome (noun) - a person or thing that is a perfect example of a particular quality or type.",
              "Cognizant (adj.) - having knowledge or being aware of."
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Completion (13 min video)",
          duration: "13 min",
          type: "lesson",
          iconType: "headphones",
          details: "In-depth dynamic breakdown of Sentence & Note Completion questions, analyzing signpost words, distractors, and grammatical alignment rule metrics.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Sentence Completion (6 min video)",
          duration: "6 min",
          type: "lesson",
          iconType: "headphones",
          details: "Essential tactics for tackling micro-gap fills under restrictive word counts (e.g. NO MORE THAN TWO WORDS AND/OR A NUMBER).",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: "Practice passage: Hotel Stay (audio + tasks + Review page)",
          duration: "15 min",
          type: "practice",
          iconType: "headphones",
          details: "Full IELTS listening practice set simulating a customer enquiry scenario at a luxury seaside resort. Match audio tokens with precise empty notes.",
          interactiveContent: {
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          }
        },
        {
          id: `day_${day}_t6`,
          title: "Practice passage: Levels of Management (audio + tasks + Review page)",
          duration: "15 min",
          type: "practice",
          iconType: "headphones",
          details: "Academic lecture snippet discussing corporate management hierarchies and decision-making filters.",
          interactiveContent: {
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
          }
        }
      ];
    }
    if (day === 2) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Part 1 question repetition (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Imitate full native question flows, building immediate oral confidence for IELTS Speaking Part 1.",
          interactiveContent: {
            practicePrompt: "Could you describe your hometown? What kind of facilities are available for tourists and visitors?"
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck (~10 min)",
          duration: "10 min",
          type: "vocab",
          iconType: "vocab",
          details: "Re-run essential synonyms with interactive flashcards. Refine pronunciation and usage logic.",
          interactiveContent: {
            vocabWords: [
              "Pragmatic (adj.) - realistic and functional handling of processes.",
              "Cognizant (adj.) - being aware of, fully understanding context.",
              "Corroborate (verb) - supply supporting proof or evidentiary standards."
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Identifying Information & Claim (15 min video)",
          duration: "15 min",
          type: "lesson",
          iconType: "book",
          details: "Demystifying True/False/Not Given questions. Find and compare strict text references with prompt statements.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Matching Headings (15 min video)",
          duration: "15 min",
          type: "lesson",
          iconType: "book",
          details: "Strategies to quickly isolate high-level paragraph topics and avoid nested distractor options.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: "Partial practice: Joseph Conrad — online reading block (~15 min)",
          duration: "15 min",
          type: "practice",
          iconType: "book",
          details: "Active reading pass on historical authors, matching headings to designated academic intervals.",
          interactiveContent: {
            practicePrompt: "Read the life story of maritime author Joseph Conrad, and assign paragraph headers matching true conceptual items."
          }
        }
      ];
    }
    if (day === 3) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Shadowing exercises 6-10 (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Work on natural sound links and syllable reductions. Practice continuous linking sequences.",
          interactiveContent: {
            practicePrompt: "A key variable is the integration of digital tools with traditional pedagogical methods."
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck (~10 min)",
          duration: "10 min",
          type: "vocab",
          iconType: "vocab",
          details: "Acquire three more premium synonym clusters for Speaking Part 3 and Writing tasks.",
          interactiveContent: {
            vocabWords: [
              "Ambivalent (adj.) - mixed or contradictory feelings and positions.",
              "Substantiate (verb) - prove true with reference data or robust facts."
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Task 1 - Trend Data (12 min video)",
          duration: "12 min",
          type: "lesson",
          iconType: "book",
          details: "Master essential vocabulary of increase, decrease, plateau, and fluctuating line charts.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Task 2 - Agree/Disagree (12 min video)",
          duration: "12 min",
          type: "lesson",
          iconType: "book",
          details: "How to draft your intro sentence, body templates, and final balance positions.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: "Practice prompt: Newspapers and internet (writing draft + AI check)",
          duration: "15 min",
          type: "practice",
          iconType: "book",
          details: "Outline a clear thesis statement comparing digital journals and printed tabloids under timer constraints.",
          interactiveContent: {
            practicePrompt: "Some believe newspapers are the best way to get news, while others think the internet is better. Discuss both views."
          }
        }
      ];
    }
    if (day === 4) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Part 1 question repetition (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Practice spontaneous replies on personal and daily topics to build initial speed and correct pacing rules.",
          interactiveContent: {
            practicePrompt: "What role does digital entertainment play in your family life?"
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck (~10 min)",
          duration: "10 min",
          type: "vocab",
          iconType: "vocab",
          details: "Confirm vocab lists and standard academic word forms.",
          interactiveContent: {
            vocabWords: [
              "Fluctuate (verb) - move erratically",
              "Formidable (adj.) - intimidating size, scope, or difficulty"
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Speaking Test Overview (8 min video)",
          duration: "8 min",
          type: "lesson",
          iconType: "book",
          details: "Step-by-step review of the three speaking parts, exam structure, and examiner cue patterns.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Speaking Bands Overview (7 min video)",
          duration: "7 min",
          type: "lesson",
          iconType: "book",
          details: "Understand band descriptors 6, 7, and 8 for Fluency, Lexis, Grammar, and Pronunciation.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: 'Speaking P1 practice: "Work or school" (record + transcription)',
          duration: "10 min",
          type: "practice",
          iconType: "mic",
          details: "Speak about your study/work routines.",
          interactiveContent: {
            practicePrompt: "Are you currently studying or do you have a full-time job?"
          }
        },
        {
          id: `day_${day}_t6`,
          title: 'Speaking P1 practice: "Tools" (record + transcription)',
          duration: "10 min",
          type: "practice",
          iconType: "mic",
          details: "Speak about standard tools or household equipment.",
          interactiveContent: {
            practicePrompt: "What kinds of tools do you use regularly at your workspace?"
          }
        },
        {
          id: `day_${day}_t7`,
          title: 'Speaking P1 practice: "Technology" (record + transcription)',
          duration: "10 min",
          type: "practice",
          iconType: "mic",
          details: "Evaluate your preference for consumer electronics.",
          interactiveContent: {
            practicePrompt: "Has technology helped you to work more efficiently recently?"
          }
        }
      ];
    }
    if (day === 5) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Shadowing exercises 11-15 (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Consolidate your high-frequency intonation flow patterns with academic accents shadow drills.",
          interactiveContent: {
            practicePrompt: "Many modern enterprises prioritize ecological indicators over absolute fiscal yields."
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck (~10 min)",
          duration: "10 min",
          type: "vocab",
          iconType: "vocab",
          details: "Confirm mastery of the secondary academic vocabs.",
          interactiveContent: {
            vocabWords: [
              "Epitome (noun) - absolute peerless representation",
              "Lucid (adj.) - easy to parse and digest"
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Multiple Choice (7 min video)",
          duration: "7 min",
          type: "lesson",
          iconType: "headphones",
          details: "Key audio indicators that hint at correct option letters, and how to ignore negative prompts.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Matching (5 min video)",
          duration: "5 min",
          type: "lesson",
          iconType: "headphones",
          details: "Handling multiple elements in a listening row quickly under time constraints.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: "Practice passage: Track Selection (audio + tasks)",
          duration: "15 min",
          type: "practice",
          iconType: "headphones",
          details: "Interactive lesson segment focusing on a client choice dialogue.",
          interactiveContent: {
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          }
        },
        {
          id: `day_${day}_t6`,
          title: "Practice passage: Musical Rehearsal Plan (audio + tasks)",
          duration: "15 min",
          type: "practice",
          iconType: "headphones",
          details: "Full listening sequence based on a musical group rehearsal itinerary.",
          interactiveContent: {
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
          }
        }
      ];
    }
    if (day === 6) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Speaking Warmup: Part 1 question repetition (~10 min)",
          duration: "10 min",
          type: "speaking",
          iconType: "mic",
          details: "Review linking elements and transitions in spontaneous queries.",
          interactiveContent: {
            practicePrompt: "Do you prefer spending your weekends outdoors or staying inside?"
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Vocab Review: Blaze Vanguard deck — master items (~12 min)",
          duration: "12 min",
          type: "vocab",
          iconType: "vocab",
          details: "Mastery drill checklist of high frequency synonyms.",
          interactiveContent: {
            vocabWords: [
              "Prerequisite (noun) - absolute requirement of state"
            ]
          }
        },
        {
          id: `day_${day}_t3`,
          title: "Lesson: Task 1 - Comparison Data (13 min video)",
          duration: "13 min",
          type: "lesson",
          iconType: "book",
          details: "Analyze and structure comparison points on pie charts and grids.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t4`,
          title: "Lesson: Task 2 - Discuss Both Views (14 min video)",
          duration: "14 min",
          type: "lesson",
          iconType: "book",
          details: "How to compose balanced arguments detailing two extreme spectrums.",
          interactiveContent: {
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
          }
        },
        {
          id: `day_${day}_t5`,
          title: "Practice prompt: Salaries of athletes (writing check)",
          duration: "20 min",
          type: "practice",
          iconType: "book",
          details: "Formulate a balanced argumentative framework detailing sports star payments.",
          interactiveContent: {
            practicePrompt: "Refined sports stars are paid immense funds. Is this a positive or negative element?"
          }
        }
      ];
    }
    if (day === 7) {
      return [
        {
          id: `day_${day}_t1`,
          title: "Mock Test: Blaze Vanguard — diagnostic mock — establishes your baseline band (~3 hrs, exam conditions)",
          duration: "180 min",
          type: "practice",
          iconType: "book",
          details: "Take the full realistic simulation suite under real timing constraints.",
          interactiveContent: {
            practicePrompt: "sit the full simulated setup to establish your real diagnostic score report card."
          }
        },
        {
          id: `day_${day}_t2`,
          title: "Blaze Vanguard Review: error log + Review page walkthrough (~1 hr)",
          duration: "60 min",
          type: "lesson",
          iconType: "book",
          details: "Re-analyze wrong flags, grammar mismatches, and listening gap errors.",
          interactiveContent: {
            practicePrompt: "Check wrong results inside mock dashboard reports."
          }
        }
      ];
    }

    // Default generators for other days (8 to 56)
    const week = Math.ceil(day / 7);
    const dayOfWeek = ((day - 1) % 7) + 1;
    const focusSections = ["Reading", "Listening", "Writing", "Speaking", "Vocab & Grammar", "Section Drill", "Mock Focus"];
    const currentSection = focusSections[(day - 1) % focusSections.length];

    if (dayOfWeek === 7) {
      // Mock test day
      return [
        {
          id: `day_${day}_t1`,
          title: `Diagnostic Check-in: Weekly Review (${currentSection})`,
          duration: "15 min",
          type: "lesson",
          iconType: "book",
          details: "Consolidate the strategies learned throughout this week. Make sure you revise all incorrect vocabulary logs."
        },
        {
          id: `day_${day}_t2`,
          title: `Full ${activeExam} Simulation Exam Block`,
          duration: "115 min",
          type: "practice",
          iconType: "headphones",
          details: "Sit the full realistic diagnostic mock test. Practice pacing under genuine exam pressure with immediate AI report scores.",
          interactiveContent: {
            practicePrompt: "Go ahead and trigger a persistent mock test suite via the persistent floating button below."
          }
        }
      ];
    }

    return [
      {
        id: `day_${day}_t1`,
        title: `Strategic Lesson: Advanced ${currentSection} Tactics`,
        duration: "12 min",
        type: "lesson",
        iconType: "book",
        details: `Detailed walkthrough of professional standards, grading systems, and outline blueprints for high ${currentSection} performance.`
      },
      {
        id: `day_${day}_t2`,
        title: `Academic Lexis: ${currentSection} Word List`,
        duration: "10 min",
        type: "vocab",
        iconType: "vocab",
        details: "Learn five high-frequency items and dynamic sentence contexts to raise lexical resource scores.",
        interactiveContent: {
          vocabWords: [
            "Prerequisite (noun) - a thing that is required as a prior condition for something else.",
            "Formidable (adj.) - inspiring fear or respect through being impressively large or powerful.",
            "Fluctuate (verb) - rise and fall irregularly in number or amount.",
            "Corroborate (verb) - confirm or give support to a statement or theory.",
            "Lucid (adj.) - expressed clearly; easy to understand."
          ]
        }
      },
      {
        id: `day_${day}_t3`,
        title: `Interactive Challenge: ${currentSection} Prompt Exercise`,
        duration: "20 min",
        type: "practice",
        iconType: dayOfWeek % 2 === 0 ? "mic" : "headphones",
        details: `Practice real task situations. Improve response clarity, formatting integrity, and accuracy score criteria.`,
        interactiveContent: {
          practicePrompt: `In modern society, it is argued that secondary educational institutions should emphasize technical skills development rather than artistic endeavors. Discuss this view and provide personal examples.`
        }
      }
    ];
  };

  const tasks = getTasksForDay(selectedDay);
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => completedTasks[t.id]).length;
  const isDayCompleted = totalTasks > 0 && completedCount === totalTasks;

  // Toggle completion status of a task
  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Helper code to check state of any calendar day from 1 to 56
  const getDayStatus = (dayNum: number): 'today' | 'done' | 'ongoing' | 'idle' => {
    if (dayNum === selectedDay) {
      return 'today';
    }
    const dayTasks = getTasksForDay(dayNum);
    const dayCompletedCount = dayTasks.filter(t => completedTasks[t.id]).length;
    if (dayCompletedCount === dayTasks.length && dayTasks.length > 0) {
      return 'done';
    }
    if (dayCompletedCount > 0) {
      return 'ongoing';
    }
    return 'idle';
  };

  // Get total progress on 7-day week bounds
  const getWeekProgress = (weekNum: number) => {
    const startDay = (weekNum - 1) * 7 + 1;
    let totalWeekTasks = 0;
    let completedWeekTasks = 0;
    for (let d = startDay; d < startDay + 7; d++) {
      const dayTasks = getTasksForDay(d);
      totalWeekTasks += dayTasks.length;
      completedWeekTasks += dayTasks.filter(t => completedTasks[t.id]).length;
    }
    return totalWeekTasks > 0 ? Math.round((completedWeekTasks / totalWeekTasks) * 100) : 0;
  };

  // Handle Carousel week shift
  const handlePrevDay = () => {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  };

  // Carousel current Week calculation
  const currentWeek = Math.ceil(selectedDay / 7);
  // Days of the active week segment
  const weekStartDay = (currentWeek - 1) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStartDay + i);

  const handleNextDay = () => {
    if (selectedDay < 56) {
      setSelectedDay(selectedDay + 1);
    }
  };

  // Helper date formatter
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full select-none text-left" id="study-plan-dashboard">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setViewExercises(false)} className={`text-sm font-bold ${!viewExercises ? 'text-blue-600' : 'text-slate-400'}`}>Study Plan</button>
        <button onClick={() => setViewExercises(true)} className={`text-sm font-bold ${viewExercises ? 'text-blue-600' : 'text-slate-400'}`}>Exercises</button>
      </div>
      
      {viewExercises ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockExercises.map(ex => (
                <div key={ex.id} className="p-4 border rounded-2xl flex flex-col items-center shadow-xs">
                    <span className="font-black text-lg">{ex.number}</span>
                    <span className="text-xs text-slate-500 mb-2">{ex.type} • {ex.length}</span>
                    <button 
                        onClick={() => onStartExercise(ex)}
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold"
                    >
                        Start Exercise
                    </button>
                </div>
            ))}
        </div>
      ) : null}

      {!viewExercises && (
          <>
          {/* 1. Header Information Panel */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-start justify-between gap-6 mb-8" id="study-plan-header">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-none">
            {activeExam} 8-Week Study Plan
          </h1>
          <p className="text-xs md:text-[13px] text-gray-500 font-medium leading-relaxed mt-3 max-w-4xl">
            Your 8-week journey to {activeExam} Academic. This plan covers all 4 sections (Listening, Reading, Writing, Speaking) with daily lessons, practice, mock tests, and vocabulary review. Each task takes 10–90 minutes. Aim for 1.5–2 hours per weekday and 3 hours on Sundays for the mock test. Stick with it. Show up daily. The plan adapts to your pace — what matters is consistency, not perfection.
          </p>
        </div>

        {/* Test Date Selector (Right upper) */}
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-start min-w-[240px] relative">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{activeExam} Test Date</span>
          {testDate ? (
            <div className="flex items-center justify-between w-full mt-2">
              <span className="text-sm font-bold text-slate-900">{formatDateDisplay(testDate)}</span>
              <button 
                onClick={() => setShowDatePicker(true)}
                className="text-blue-600 hover:text-blue-700 font-bold text-[11px] uppercase cursor-pointer"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mt-2">
              <span className="text-[11.5px] text-gray-400 font-medium">Please enter your test date</span>
              <button 
                onClick={() => setShowDatePicker(true)}
                className="bg-[#1f2123] hover:bg-slate-800 text-white font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer"
              >
                Enter Date
              </button>
            </div>
          )}

          {/* Simple Inline Date Picker Popover */}
          {showDatePicker && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 w-64" id="inline-date-picker">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-950">Select Test Date</span>
                <button onClick={() => setShowDatePicker(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
              </div>
              <input 
                type="date"
                value={testDate}
                onChange={(e) => {
                  setTestDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className="w-full text-xs font-medium border border-slate-100 rounded-xl p-2 focus:outline-none focus:border-blue-500 mb-2 font-mono bg-slate-50"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Today's Core Dashboard Panel - Grid style - Always rendered at top */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12" id="study-plan-core-grid">
        
        {/* LEFT CARD COLUMN - 7 columns */}
        <div className="lg:col-span-7 space-y-6" id="study-plan-checklist-column">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs">
            
            {/* Today's Schedule status bar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <div>
                <h3 className="font-sans font-extrabold text-lg text-slate-950 leading-none flex items-center gap-2">
                  Today's Schedule
                </h3>
                <span className="text-xs text-gray-400 font-bold block mt-1.5">Week {currentWeek} • Day {selectedDay}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-blue-600">{completedCount}</span>
                <span className="text-gray-400 font-bold text-sm"> / {totalTasks} Completed</span>
              </div>
            </div>

            {/* Carousel / Tabs for Weekdays inline selector */}
            <div className="flex items-center justify-between bg-slate-50/50 rounded-2xl p-2 mb-8 border border-slate-100/50" id="weekdays-carousel">
              <button 
                onClick={handlePrevDay}
                disabled={selectedDay === 1}
                className="p-1.5 rounded-full hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer shadow-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex-1 flex justify-around overflow-x-auto gap-1 px-2 scrollbar-none">
                {weekDays.map((dayNum) => {
                  const isActive = dayNum === selectedDay;
                  const dayIcon = '💧';
                  const isFinished = getTasksForDay(dayNum).every(t => completedTasks[t.id]);
                  
                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDay(dayNum)}
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer whitespace-nowrap min-w-[56px] select-none ${
                        isActive
                          ? 'bg-[#1f2123] text-white shadow-xs scale-102 font-extrabold'
                          : isFinished 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/40'
                            : 'text-gray-400 hover:text-slate-800 hover:bg-gray-100/50'
                      }`}
                    >
                      <span className="text-[13px]">{dayIcon}</span>
                      <span className="text-[10px] uppercase font-bold tracking-tight">Day {dayNum}</span>
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={handleNextDay}
                disabled={selectedDay === 56}
                className="p-1.5 rounded-full hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer shadow-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* List of Tasks for active day */}
            <div className="space-y-4" id="tasks-list">
              {tasks.map((task) => {
                const isChecked = !!completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between border rounded-2xl p-4 transition-all duration-200 hover:border-slate-300 ${
                      isChecked 
                        ? 'bg-emerald-50/15 border-emerald-100/60' 
                        : 'bg-white border-slate-100'
                    }`}
                  >
                    {/* Checkbox circle and task details (Left) */}
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-500' 
                            : 'border-slate-300 bg-white hover:border-blue-500'
                        }`}
                        title="Mark task completed"
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isChecked 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-50 text-slate-600'
                      }`}>
                        {task.iconType === 'mic' && <Mic className="w-5 h-5" />}
                        {task.iconType === 'vocab' && <Languages className="w-5 h-5" />}
                        {task.iconType === 'headphones' && <Headphones className="w-5 h-5" />}
                        {task.iconType === 'book' && <BookOpen className="w-5 h-5" />}
                      </div>

                      <div className="text-left pr-4">
                        <p className={`text-[12.5px] sm:text-[13.5px] font-extrabold tracking-tight leading-snug ${
                          isChecked 
                            ? 'line-through text-gray-400' 
                            : 'text-slate-900'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-1">Duration: {task.duration}</p>
                      </div>
                    </div>

                    {/* Action trigger button (Right) */}
                    <button
                      onClick={() => {
                        setActiveTaskModal(task);
                        setVocabIndex(0);
                        setUserSpeechText('');
                        setUserSpeechRecordState('idle');
                      }}
                      className={`text-xs font-black min-w-[76px] px-4 py-2 rounded-xl transition-all cursor-pointer text-center tracking-wider select-none ${
                        isChecked
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isChecked ? 'Review' : 'Start'}
                    </button>
                  </div>
                );
              })}

              {tasks.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="font-semibold text-xs">No tasks mapped on Day {selectedDay}</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT METRICS CARD PANEL - 5 columns */}
        <div className="lg:col-span-5 space-y-6" id="study-plan-sidebar-column">
          
          {/* Top side-by-side indicator panels */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-xs">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-2">Latest Full Test</span>
              <p className="text-xl font-black text-slate-950 flex items-center gap-1.5 leading-none">
                <FileText className="w-5 h-5 text-blue-600 inline shrink-0" />
                <span>{latestScore}</span>
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-xs relative">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-2">Target Score</span>
              {isEditingTarget ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempTargetScore}
                    onChange={(e) => setTempTargetScore(e.target.value)}
                    placeholder="e.g. 8.0"
                    className="w-16 border border-slate-100 p-1 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
                    maxLength={10}
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setTargetScore(tempTargetScore || '-');
                      setIsEditingTarget(false);
                    }}
                    className="bg-blue-600 text-white font-black text-[9px] px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black text-slate-950 leading-none">{targetScore}</p>
                  <button 
                    onClick={() => {
                      setTempTargetScore(targetScore === '-' ? '' : targetScore);
                      setIsEditingTarget(true);
                    }}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 cursor-pointer rounded-md"
                    title="Edit target score"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid Calendar of 56 Days (8 Weeks of 7 Days) */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <h4 className="font-extrabold text-[#1f2123] text-sm tracking-tight mb-5 leading-none">56-Day Course Calendar</h4>
            
            {/* Color coding Legend Bar */}
            <div className="flex items-center justify-start gap-4 mb-6 text-[11px] font-bold text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#1f2123] block"></span>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-blue-100 block"></span>
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100 block"></span>
                <span>Done</span>
              </div>
            </div>

            <p className="text-[10.5px] italic text-gray-400 font-medium mb-4">* Select a date to view your study plan.</p>

            {/* 56 Numbers Grid */}
            <div className="grid grid-cols-7 gap-2" id="calendar-56-grid">
              {Array.from({ length: 56 }, (_, index) => {
                const dayNum = index + 1;
                const status = getDayStatus(dayNum);
                
                let chipColorClass = 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100/40';
                if (status === 'today') {
                  chipColorClass = 'bg-[#1f2123] text-white font-black shadow-xs scale-105 z-10 border border-[#1f2123]';
                } else if (status === 'done') {
                  chipColorClass = 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-200/50 hover:bg-emerald-200/70';
                } else if (status === 'ongoing') {
                  chipColorClass = 'bg-blue-100 text-blue-800 font-extrabold border border-blue-200/50 hover:bg-blue-200/70';
                }

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-9 w-full flex items-center justify-center rounded-xl text-[11px] font-bold transition-all duration-150 cursor-pointer select-none ${chipColorClass}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* 3. View Mode Switching Navigation Bar (Toggle weekly curriculum layout below) */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 mt-12" id="study-plan-view-selector-bar">
        <div>
          <h2 className="text-lg md:text-xl font-black text-slate-950 tracking-tight">8-Week Study Plan</h2>
          <p className="text-[11px] text-gray-400 font-bold">Consolidated structured study goals and calendar tracker</p>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 shadow-inner shrink-0">
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'card' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* 4. Complete Accordion Weeks Curriculum (Always visible downstream) */}
      <div className="space-y-4 mb-24 animate-fade-in" id="study-plan-accordion-list-view">
        {Array.from({ length: 8 }, (_, wIndex) => {
          const weekNum = wIndex + 1;
          const weekMeta = weeksMetadata[weekNum];
          const isExpanded = !!expandedWeeks[weekNum];
          const weekProgress = getWeekProgress(weekNum);
          const startDay = (weekNum - 1) * 7 + 1;

          return (
            <div 
              key={weekNum} 
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs transition-all"
              id={`accordion-week-${weekNum}`}
            >
              {/* Header interactive row */}
              <div 
                onClick={() => setExpandedWeeks(prev => ({ ...prev, [weekNum]: !prev[weekNum] }))}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 select-none transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Visual Week Box Accent */}
                  <div className="bg-slate-100 text-slate-800 font-black text-sm w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-200/40">
                    W{weekNum}
                  </div>

                  {/* Titles */}
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-0.5">
                      {weekMeta?.range || `Day ${startDay} - Day ${startDay+6}`}
                    </span>
                    <h3 className="text-sm md:text-base font-black text-slate-900 leading-tight">
                      {weekMeta?.title || "Weekly Curriculum Block"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Mini Progress Bar Line */}
                  <div className="hidden sm:flex items-center gap-3 w-40 shrink-0">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                        style={{ width: `${weekProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 font-mono w-8 text-right shrink-0">{weekProgress}%</span>
                  </div>

                  {/* Chevron Indicator */}
                  <span className={`text-slate-400 p-1 bg-slate-50 rounded-xl hover:text-slate-800 transition-all ${isExpanded ? 'rotate-90 text-slate-950' : ''}`}>
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                  </span>
                </div>
              </div>

              {/* Collapsible Content Area */}
              {isExpanded && (
                <div className="px-5 pb-6 border-t border-slate-100/60 bg-slate-50/30 text-left animate-fade-in">
                  {/* Week Subtext description */}
                  <p className="text-xs text-gray-500 font-medium leading-relaxed my-5 max-w-5xl bg-white border border-slate-100/80 p-4 rounded-2xl shadow-xs">
                    {weekMeta?.description}
                  </p>

                  {/* Days listing (Adaptive to selected View Mode option) */}
                  {viewMode === 'card' ? (
                    /* CARD VIEW: Grid of day cards 1 to 6 */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                      {Array.from({ length: 6 }, (_, idx) => {
                        const dayNum = startDay + idx;
                        const dayTasks = getTasksForDay(dayNum);
                        const dayCompletedCount = dayTasks.filter(t => completedTasks[t.id]).length;
                        const totalDayCount = dayTasks.length;

                        return (
                          <div 
                            key={dayNum} 
                            className="bg-white border border-slate-100/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300/60 transition-all"
                          >
                            <div>
                              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                                <span className="text-xs font-black text-[#1f2123]">Day {dayNum}</span>
                                <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-extrabold shrink-0">
                                  {dayCompletedCount}/{totalDayCount} Completed
                                </span>
                              </div>
                              
                              <div className="space-y-2">
                                {dayTasks.map(task => {
                                  const checked = !!completedTasks[task.id];
                                  return (
                                    <div 
                                      key={task.id}
                                      onClick={() => {
                                        setSelectedDay(dayNum);
                                        setActiveTaskModal(task);
                                        setVocabIndex(0);
                                        setUserSpeechText('');
                                        setUserSpeechRecordState('idle');
                                      }}
                                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200/80 transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                          checked ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'border-slate-300 bg-white'
                                        }`}>
                                          {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                        </span>
                                        <span className={`text-[11px] font-bold truncate ${
                                          checked ? 'line-through text-gray-400' : 'text-slate-700'
                                        }`}>
                                          {task.title}
                                        </span>
                                      </div>
                                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-slate-600 shrink-0" />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* LIST VIEW: Compact vertical list of Day Rows */
                    <div className="space-y-4 animate-fade-in">
                      {Array.from({ length: 6 }, (_, idx) => {
                        const dayNum = startDay + idx;
                        const dayTasks = getTasksForDay(dayNum);
                        const dayCompletedCount = dayTasks.filter(t => completedTasks[t.id]).length;
                        const totalDayCount = dayTasks.length;

                        return (
                          <div 
                            key={dayNum} 
                            className="bg-white border border-slate-100/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:border-slate-300/60 transition-all text-left"
                          >
                            <div className="flex items-center gap-3 min-w-[120px] shrink-0">
                              <span className="text-xs font-black text-[#1f2123]">Day {dayNum}</span>
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-extrabold">
                                {dayCompletedCount}/{totalDayCount} Done
                              </span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                              {dayTasks.map(task => {
                                const checked = !!completedTasks[task.id];
                                return (
                                  <div 
                                    key={task.id}
                                    onClick={() => {
                                      setSelectedDay(dayNum);
                                      setActiveTaskModal(task);
                                      setVocabIndex(0);
                                      setUserSpeechText('');
                                      setUserSpeechRecordState('idle');
                                    }}
                                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200/80 transition-all cursor-pointer group"
                                  >
                                    <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
                                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                        checked ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'border-slate-300 bg-white'
                                      }`}>
                                        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                      </span>
                                      <span className={`text-[10px] font-bold truncate ${
                                        checked ? 'line-through text-gray-400' : 'text-slate-600'
                                      }`}>
                                        {task.title}
                                      </span>
                                    </div>
                                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-slate-600 shrink-0" />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Day 7 mock test footer card */}
                  {(() => {
                    const dayNum = startDay + 6;
                    const dayTasks = getTasksForDay(dayNum);
                    const dayCompletedCount = dayTasks.filter(t => completedTasks[t.id]).length;
                    const totalDayCount = dayTasks.length;

                    return (
                      <div className="bg-slate-100/50 border border-slate-200/45 rounded-2xl p-5 mt-6 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/50 mb-4 gap-2">
                          <div>
                            <span className="text-xs font-black text-[#1f2123] block">Day {dayNum} Simulation Block</span>
                            <span className="text-[10px] text-gray-400 font-bold block mt-0.5">End of week comprehensive review & diagnostic test</span>
                          </div>
                          <span className="text-[10px] bg-[#1f2123] text-white px-3 py-1 rounded-full font-extrabold self-start sm:self-auto shrink-0">
                            {dayCompletedCount}/{totalDayCount} Completed
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dayTasks.map(task => {
                            const checked = !!completedTasks[task.id];
                            return (
                              <div 
                                key={task.id}
                                onClick={() => {
                                  setSelectedDay(dayNum);
                                  setActiveTaskModal(task);
                                  setVocabIndex(0);
                                  setUserSpeechText('');
                                  setUserSpeechRecordState('idle');
                                }}
                                className="flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/30 hover:border-slate-300 transition-all cursor-pointer group shadow-xs"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                    checked ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'border-slate-300 bg-white'
                                  }`}>
                                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </span>
                                  <span className={`text-[11.5px] font-black truncate ${
                                    checked ? 'line-through text-gray-400' : 'text-slate-700'
                                  }`}>
                                    {task.title}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-slate-600 shrink-0" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Practice / Lesson Task Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 bg-slate-950/60 p-4 flex items-center justify-center z-50 animate-fade-in" id="active-task-simulator">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left">
            
            <button 
              onClick={() => {
                setActiveTaskModal(null);
                setUserSpeechRecordState('idle');
              }}
              className="absolute top-4 right-4 bg-slate-50 hover:bg-slate-100 text-gray-400 hover:text-slate-700 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading Header */}
            <div className="mb-6">
              <span className="text-[9px] bg-blue-50 text-blue-600 font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                {activeTaskModal.type} Simulator
              </span>
              <h3 className="font-extrabold text-lg text-slate-950 leading-tight mt-3">
                {activeTaskModal.title}
              </h3>
              <p className="text-[11.5px] text-gray-400 mt-1 leading-snug font-medium">Expected limit: {activeTaskModal.duration}</p>
            </div>

            {/* Modal Task Body */}
            <div className="space-y-5 text-xs text-slate-700">
              
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                <h4 className="font-extrabold text-[#1f2123] text-xs mb-1">Details & Guidelines</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{activeTaskModal.details}</p>
              </div>

              {/* VOCABULARY SIMULATOR CONTENT */}
              {activeTaskModal.interactiveContent?.vocabWords && (
                <div className="space-y-4" id="modal-vocab-container">
                  <div className="bg-amber-50/50 border border-amber-100/65 rounded-2xl p-6 text-center animate-fade-in">
                    <span className="text-[9px] text-amber-600 font-extrabold tracking-widest uppercase block mb-2">Word Card {vocabIndex + 1} of {activeTaskModal.interactiveContent.vocabWords.length}</span>
                    <p className="text-base font-extrabold text-amber-950 leading-normal">
                      {activeTaskModal.interactiveContent.vocabWords[vocabIndex]}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      disabled={vocabIndex === 0}
                      onClick={() => setVocabIndex(prev => prev - 1)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 font-extrabold text-[11px] rounded-xl hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                    >
                      Previous
                    </button>
                    
                    <button
                      disabled={vocabIndex === activeTaskModal.interactiveContent.vocabWords.length - 1}
                      onClick={() => setVocabIndex(prev => prev + 1)}
                      className="px-4 py-2 bg-[#1f2123] text-white font-extrabold text-[11px] rounded-xl hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      Next Card
                    </button>
                  </div>
                </div>
              )}

              {/* SPEAKING SHADOWING SIMULATOR */}
              {activeTaskModal.interactiveContent?.practicePrompt && activeTaskModal.type === 'speaking' && (
                <div className="space-y-4" id="modal-speaking-container">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 text-center">
                    <span className="text-[9px] text-blue-600 font-extrabold tracking-wide uppercase block mb-2">Practice shadow Prompt phrase</span>
                    <p className="text-sm font-extrabold text-blue-900 leading-relaxed italic">
                      "{activeTaskModal.interactiveContent.practicePrompt}"
                    </p>
                  </div>

                  {userSpeechRecordState === 'idle' && (
                    <button
                      onClick={() => {
                        setUserSpeechRecordState('recording');
                        setTimeout(() => {
                          setUserSpeechRecordState('finished');
                          setUserSpeechText("The rapid development of modern transportation networks has fundamentally restructured global supply pipelines, allowing goods to flow seamlessly across regional borders.");
                        }, 5000);
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs py-3 rounded-2xl cursor-pointer flex items-center justify-center space-x-2 animate-pulse"
                    >
                      <Mic className="w-4.5 h-4.5 animate-bounce" />
                      <span>Start Speaking (Imitate audio flow)</span>
                    </button>
                  )}

                  {userSpeechRecordState === 'recording' && (
                    <div className="flex flex-col items-center justify-center py-4 bg-red-50 rounded-2xl border border-red-100 text-red-700 space-y-2">
                      <div className="w-8.5 h-8.5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold animate-ping" />
                      <span className="font-extrabold text-[11px] uppercase tracking-widest">Listening... speak into your device now</span>
                    </div>
                  )}

                  {userSpeechRecordState === 'finished' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800">
                        <span className="font-extrabold text-[10px] uppercase block mb-1">AI Evaluator Speech Recognition Waveform</span>
                        <p className="text-[11.5px] italic font-medium">"{userSpeechText}"</p>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-extrabold uppercase">Pronunciation Accent accuracy score</p>
                          <p className="text-lg font-black text-slate-800">92% Match (Pristine stresses)</p>
                        </div>
                        <span className="font-black text-emerald-600 text-[11px] bg-white border border-emerald-100 rounded-full px-3 py-1">Passed!</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VIDEO LAYOUT */}
              {activeTaskModal.interactiveContent?.videoUrl && (
                <div className="space-y-3" id="modal-video-container">
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
                    <video className="w-full aspect-video" controls src={activeTaskModal.interactiveContent.videoUrl}></video>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium leading-normal italic text-center">* Tap Play to watch explanation tips formulated by expert evaluators.</p>
                </div>
              )}

              {/* PRACTICE SETS WITH AUDIO */}
              {activeTaskModal.interactiveContent?.audioUrl && (
                <div className="space-y-3" id="modal-audio-container">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 font-extrabold uppercase block leading-none">Practice Audio Snippet</span>
                        <span className="text-[11.5px] font-bold text-slate-800 mt-1 inline-block">Real-time examination conversation</span>
                      </div>
                    </div>
                    <audio src={activeTaskModal.interactiveContent.audioUrl} controls className="h-9 w-full sm:w-auto" />
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom confirmation footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => {
                  setActiveTaskModal(null);
                  setUserSpeechRecordState('idle');
                }}
                className="px-4 py-2 text-gray-500 hover:text-slate-800 text-xs font-bold font-sans cursor-pointer bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close Window
              </button>

              <button 
                onClick={() => {
                  setCompletedTasks(prev => ({
                    ...prev,
                    [activeTaskModal.id]: true
                  }));
                  setActiveTaskModal(null);
                  setUserSpeechRecordState('idle');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Complete Task
              </button>
            </div>

          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
