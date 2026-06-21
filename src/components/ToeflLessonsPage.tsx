import React, { useState, useEffect } from 'react';
import { TOEFL_TESTS } from '../data/questions';
import { MockTest } from '../types';
import { 
  Play, 
  Search, 
  Info, 
  Lock, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  FileText, 
  Volume2, 
  Award, 
  X, 
  Pencil, 
  Languages, 
  LockKeyhole,
  Download,
  Notebook,
  Heart
} from 'lucide-react';

interface ToeflLessonsPageProps {
  onOpenPurchaseModal: () => void;
  onTakeMockTest: (test: MockTest) => void;
}

interface QuizData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ToeflLesson {
  id: string;
  title: string;
  section: 'Overview' | 'Reading' | 'Listening' | 'Writing' | 'Speaking';
  description: string;
  duration: string;
  instructor: string;
  themeColor: {
    gradient: string;
    border: string;
    text: string;
    bgText: string;
  };
  details: {
    objectives: string[];
    cheatSheet: string;
    highScoreTips: string[];
  };
  quiz: QuizData;
}

const TOEFL_LESSONS_DATA: ToeflLesson[] = [
  {
    id: 'toefl-overview',
    title: '2026 TOEFL Test Overview',
    section: 'Overview',
    description: 'TOEFL 2026 Overview: Understand the key changes, scoring system, test structure, and what to know before the test. Master baseline prep.',
    duration: '18 min',
    instructor: 'Giselle',
    themeColor: {
      gradient: 'from-emerald-800 via-emerald-600 to-emerald-400',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      bgText: 'text-emerald-500/10'
    },
    details: {
      objectives: [
        'Recognize the full structure of the shortened 1 hour 56 minutes TOEFL exam',
        'Learn the comprehensive 0-120 band scoring algorithm used by universities globally',
        'Understand exactly what AI-assisted graders look for in human verbal and written prompts',
        'Acquire structural pacing tips to maintain focus under strict time-interval boundaries'
      ],
      cheatSheet: `### TOEFL Exam Quick Summary
* **Total Time**: 1 hour 56 minutes (No break!)
* **Total Score**: 0 to 120 points (Divided evenly with 30 pts per section)
* **Reading Section**: 2 passages, 20 total questions, 35 minutes
* **Listening Section**: 3 academic lectures, 2 campus conversations, 28 questions, 36 minutes
* **Speaking Section**: 1 independent task, 3 integrated tasks, 4 total tasks, 16 minutes
* **Writing Section**: 1 integrated task (20m), 1 academic discussion task (9m), 29 minutes`,
      highScoreTips: [
        'Never spend more than 90 seconds on any single Reading question. Skip and flag to return.',
        'Always take brief, symbol-rich notes. Listening forms the foundation of Speaking and Writing as well.',
        'Ensure you practice Speaking directly into a headset. Room echo reduces speech grading accuracy.'
      ]
    },
    quiz: {
      question: 'Which of the following describes the correct timing and task count of the modern TOEFL Writing section?',
      options: [
        'A. 2 tasks (Integrated and Academic Discussion) in 29 minutes',
        'B. 3 tasks in 50 minutes with an independent essay writing layout',
        'C. 1 task in 15 minutes with no interactive reading or audio materials'
      ],
      correctAnswer: 0,
      explanation: 'The modern TOEFL Writing section consists of exactly 2 tasks: the Integrated Writing Task (20 minutes) and the newer Academic Discussion Task (9 minutes), for a total duration of 29 minutes.'
    }
  },
  {
    id: 'toefl-reading',
    title: '2026 TOEFL Reading Section',
    section: 'Reading',
    description: 'TOEFL 2026 Reading: Understand the section structure, passage styles, complex question formats, and core skimming/scanning strategies for each task.',
    duration: '22 min',
    instructor: 'Giselle',
    themeColor: {
      gradient: 'from-blue-900 via-blue-600 to-blue-400',
      border: 'border-blue-200',
      text: 'text-blue-700',
      bgText: 'text-blue-500/10'
    },
    details: {
      objectives: [
        'Decode advanced prose passages containing high-level biology, history, and physical science',
        'Master structural scanning techniques to answer vocabulary and reference questions instantly',
        'Develop critical logical frameworks to separate core claims from minor illustrative details',
        'Synthesize standard paragraphs to secure maximum points on complex Prose Summary questions'
      ],
      cheatSheet: `### TOEFL Reading Scoring Strategies
* **The 10-Question Structure**: Each passage contains 10 questions. Most are worth 1 point.
* **Prose Summary Question**: Worth up to 2 points. You must choose 3 statements that capture the main argumentative architecture of the passage.
* **Scanning vs Reading**: Do NOT read the entire passage first. Go straight to the first question; it will point you to Paragraph 1. Read strategically.
* **Tone Analysis**: Academic passages are objective. Eliminate choices written in overly emotional, speculative, or colloquial language.`,
      highScoreTips: [
        'A statement can be factually true according to the passage but still be INCORRECT on Prose Summary if it only represents a minor detail.',
        'Watch closely for absolute words like "always", "entirely", "never" or "solely". They usually signal a trap.',
        'Remember that the questions always follow the physical paragraph order of the passage!'
      ]
    },
    quiz: {
      question: 'When approaching a TOEFL Reading Prose Summary question, which strategy gets you the maximum score?',
      options: [
        'A. Selecting statements that contain highly precise but minor details from single sentences to show accuracy',
        'B. Choosing major structural points that synthesize key arguments of entire multi-paragraph sections',
        'C. Picking the absolute longest statements containing complex scientific or editorial vocabulary'
      ],
      correctAnswer: 1,
      explanation: 'Prose summary questions reward capturing the grand layout of the text. Minor factual details, even if true, should be excluded because they do not summarize the central arguments.'
    }
  },
  {
    id: 'toefl-listening',
    title: '2026 TOEFL Listening Section',
    section: 'Listening',
    description: 'TOEFL 2026 Listening: Understand the conversational and academic lecture types, audio structures, and high-efficiency note-taking strategies.',
    duration: '16 min',
    instructor: 'Giselle',
    themeColor: {
      gradient: 'from-slate-800 via-slate-600 to-slate-400',
      border: 'border-slate-200',
      text: 'text-slate-705',
      bgText: 'text-slate-500/10'
    },
    details: {
      objectives: [
        'Discern between academic lectures and campus life service conversations',
        'Adopt high-speed abbreviation rules to write notes without losing audio tracking focus',
        'Identify transitional phrases professors use to signal key definitions and test answers',
        'Decode tone, sarcasm, and speaker attitudes to secure Speaker Stance points'
      ],
      cheatSheet: `### Note-Taking Architecture
1. **The T-Chart Split**: For conversations, split your page into "Student" & "Advisor". Track who says what.
2. **Definitional Markers**: When a professor says *"Let me qualify that"* or *"Contrary to popular belief"*, a core test question is coming. Write down what follows immediately!
3. **Symbols Code**: Use simple symbols to accelerate:
   * **↑** (increase/grow)
   * **↓** (decrease/drop)
   * **w/** (with)
   * **b/c** (because)
   * **★** (critical conclusion)`,
      highScoreTips: [
        'Do NOT try to write down every word. Focus heavily on nouns, causes, effects, and emotional tone shifts.',
        'Detail questions will test relationships. Be sure to note WHY the professor mentions a historical anecdote.',
        'Pace yourself — once you submit an answer in TOEFL Listening, you cannot return to modify it.'
      ]
    },
    quiz: {
      question: 'In TOEFL Lecture passages, what does a sudden personal digression by the professor (e.g., a short personal joke or anecdote) typically signify?',
      options: [
        'A. It is purely conversational noise and you can block it out completely without taking keys.',
        'B. It is an illustration of a concept, or is targeted by a "Speaker Attitude/Function" question.',
        'C. It contains the primary scientific thesis statement that you must write down verbatim.'
      ],
      correctAnswer: 1,
      explanation: 'Professors’ anecdotes of personal experiences are frequently targeted by function questions to check if you can analyze why the speaker added that illustration and what rhetorical purpose it serves.'
    }
  },
  {
    id: 'toefl-writing',
    title: '2026 TOEFL Writing Section',
    section: 'Writing',
    description: 'TOEFL 2026 Writing: Understand the task types, scoring parameters, and access core academic discussion templates to raise your score above 27+.',
    duration: '21 min',
    instructor: 'Giselle',
    themeColor: {
      gradient: 'from-blue-950 via-blue-700 to-blue-400',
      border: 'border-blue-200',
      text: 'text-blue-800',
      bgText: 'text-blue-500/10'
    },
    details: {
      objectives: [
        'Perfect the Integrated essay structure linking a 3-minute academic passage with a 2-minute lecture',
        'Format contrast points clearly using transition words (e.g., "In contrast", "Conversely", "Refutes")',
        'Formulate a highly compelling 100-word response for the modern Academic Discussion Board task',
        'Ensure lexical variation and correct grammar mechanics to satisfy AI checking criteria'
      ],
      cheatSheet: `### Academic Discussion Checklist
* **Time**: 9 minutes total
* **Length**: At least 100–120 words (Aim for 120–150 words for safety!)
* **Core structure**:
  1. **Direct Thesis (30w)**: State clearly where you stand on the professor's prompt.
  2. **Student Critique (40w)**: Refute or build upon Student A or Student B (e.g., *"While Jessica claims X is valid, she overlooks..."*).
  3. **Personal Construct (50w)**: Deliver a fresh argument supported by a short, realistic example.
  4. **Conclusion (15w)**: A simple closing synthesis.`,
      highScoreTips: [
        'In Task 1 (Integrated), the lecture always contradicts the reading points. Focus 80% of your notes on the LECTURER\'S arguments.',
        'Avoid repeating words. Instead of "believes", use "asserts", "contends", "propounds", or "maintains".',
        'Save at least 2 minutes at the end to check for typical typos, subject-verb agreement, and basic spelling mistakes.'
      ]
    },
    quiz: {
      question: 'In the TOEFL Academic Discussion writing task, what is the best way to structure your 9-minute contribution?',
      options: [
        'A. Copy the other school students\' comments word-for-word and add a generic introductory line.',
        'B. Clearly state your stance, address/respond to another student\'s opinion, and present a novel argument supported by clear reasoning.',
        'C. Plainly write a general essay about your background without addressing the professor\'s custom prompt.'
      ],
      correctAnswer: 1,
      explanation: 'Top-tier marks are granted to students who actively participate in the academic conversation. This involves referencing other posts (e.g., "While Jessica arguments hold merit...") and contributing unique reasoning.'
    }
  },
  {
    id: 'toefl-speaking',
    title: '2026 TOEFL Speaking Section',
    section: 'Speaking',
    description: 'TOEFL 2026 Speaking: Understand the task types and core structural speech pacing templates for academic lectures and campus situations.',
    duration: '25 min',
    instructor: 'Giselle',
    themeColor: {
      gradient: 'from-emerald-900 via-emerald-600 to-emerald-400',
      border: 'border-emerald-250',
      text: 'text-emerald-800',
      bgText: 'text-emerald-500/10'
    },
    details: {
      objectives: [
        'Structure responses in 15 seconds using flexible, mnemonics-rooted academic speaking templates',
        'Practice transitions to connect written passages smoothly with spoken lecture quotes',
        'Acquire breath-control methods to eliminate vocal fillers such as "um", "ah", or "like"',
        'Maintain even volume pacing and clear syllable pronunciation to hit a 26+ speaking band'
      ],
      cheatSheet: `### Speaking Section Roadmap
* **Task 1: Independent**: Choice between two choices (e.g., agree/disagree). 15s prep, 45s talk.
* **Task 2: Campus Integrated**: Reading (announcement) + Audio (discussion on it). 30s prep, 60s talk.
* **Task 3: Academic Term**: Reading (definition) + Lecture (illustration with 1-2 examples). 30s prep, 60s talk.
* **Task 4: Academic Lecture**: Audio (academic lecture with 2 sub-points). 20s prep, 60s talk.`,
      highScoreTips: [
        'Never stop talking until the timer expires. If you complete early, round off with a summary sentence or add minor detail.',
        'Do not speak super fast. AI graders penalize slurred pronunciation. Speak at a confident, expressive, calm conversation pace.',
        'Vary your tone. Speaking in a pure monotone level triggers lower speech assessment values.'
      ]
    },
    quiz: {
      question: 'If you run out of time during an Integrated Speaking task before explaining the secondary point, what is the best strategy?',
      options: [
        'A. Stop speaking immediately and stay completely silent to wait for the system to change.',
        'B. Deliver a clear, brief concluding sentence that rounds off your current point smoothly and professionally.',
        'C. Start speaking twice as fast in the last 3 seconds to try to squeeze all leftover vocabulary in.'
      ],
      correctAnswer: 1,
      explanation: 'Finishing with a complete, coherent sentence demonstrates high control of delivery structure. Monologues that break off mid-word or are rushed are penalized by both human and AI evaluators.'
    }
  }
];

export default function ToeflLessonsPage({ onOpenPurchaseModal, onTakeMockTest }: ToeflLessonsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<ToeflLesson | null>(null);

  // Video modal simulation states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'objectives' | 'cheatsheet' | 'quiz' | 'notes'>('objectives');
  
  // Note-taking persistence state
  const [notes, setNotes] = useState<string>('');
  
  // Quiz evaluation state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Filter lessons
  const filteredLessons = selectedCategory === 'All' 
    ? TOEFL_LESSONS_DATA 
    : TOEFL_LESSONS_DATA.filter(l => l.section === selectedCategory);

  // Timer simulation for video progression
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Load saved notes when active lesson changes
  useEffect(() => {
    if (activeLesson) {
      const saved = localStorage.getItem(`toefl_notes_${activeLesson.id}`);
      setNotes(saved || '');
      setSelectedOption(null);
      setQuizSubmitted(false);
      setProgress(0);
      setIsPlaying(false);
      setActiveTab('objectives');
    }
  }, [activeLesson]);

  // Save notes handler
  const handleSaveNotes = () => {
    if (activeLesson) {
      localStorage.setItem(`toefl_notes_${activeLesson.id}`, notes);
      alert('Your lecture notes have been successfully saved to your Study Lounge profile!');
    }
  };

  const currentCategories = [
    { name: 'All', count: TOEFL_LESSONS_DATA.length },
    { name: 'Reading', count: 1 },
    { name: 'Listening', count: 1 },
    { name: 'Writing', count: 1 },
    { name: 'Speaking', count: 1 }
  ];

  return (
    <div className="w-full text-slate-800 pb-12" id="toefl-lessons-module">
      
      {/* Top Breadcrumb/Header area */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 mt-4">
        
        {/* Left Navigation Workspace Column from Screenshot */}
        <div className="space-y-6 text-left" id="toefl-lessons-sidebar">
          <div>
            <h1 className="text-[25px] font-black text-slate-800 tracking-tight leading-none font-sans select-none">
              Lessons
            </h1>
          </div>
          
          {/* Category Filter Menu Lists */}
          <div className="flex flex-col space-y-1" id="lessons-nav-menu">
            {currentCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                    : 'text-[#475569] hover:bg-slate-50'
                }`}
              >
                <span>{cat.name === 'All' ? 'All Sections' : cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedCategory === cat.name ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-[18px] border border-slate-100 space-y-3">
            <div className="flex items-center space-x-2 text-blue-600">
              <Award className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-wider">Premium Access</span>
            </div>
            <p className="text-[10.5px] text-[#5C6E84] leading-relaxed font-semibold">
              Unlock our complete curriculum of 45+ lectures, micro-task template downloads, and direct human correction feedback.
            </p>
            <button
              onClick={onOpenPurchaseModal}
              className="w-full py-1.5 bg-[#1E293B] hover:bg-slate-800 text-white rounded-md text-[10px] font-black uppercase transition-colors"
            >
              Get Full License
            </button>
          </div>
        </div>

        {/* Right Main Column */}
        <div className="space-y-6 text-left">
          
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3" id="toefl-lessons-title-header">
            <h2 className="text-xl font-black text-[#111827] tracking-tight font-sans">
              Section Lessons
            </h2>
            <span className="text-xs font-black text-slate-500 font-sans uppercase tracking-wide bg-slate-50 border border-slate-100 px-3 py-1 rounded-md">
              Found: {filteredLessons.length}
            </span>
          </div>

          {/* Core Banner Alert matching the blue premium bar from search screenshot */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl py-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs" id="toefl-lessons-membership-banner">
            <div className="flex items-center space-x-2.5 text-blue-800 text-left">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black tracking-tight font-sans">
                Purchase a TOEFL membership to watch all TOEFL lessons!
              </span>
            </div>
            <button
              onClick={onOpenPurchaseModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-4 py-2 rounded-full cursor-pointer shadow-3xs transition-transform hover:scale-102 select-none font-sans"
              id="view-memberships-action-btn"
            >
              View Memberships
            </button>
          </div>

          {/* Lessons List Grid matching style from screenshot */}
          <div className="space-y-4" id="lessons-card-grid">
            {filteredLessons.map(lesson => {
              return (
                <div 
                  key={lesson.id}
                  className="bg-white border border-[#E2E8F0] hover:border-blue-200 rounded-[24px] p-5 flex flex-col md:flex-row items-center gap-6 shadow-3xs hover:shadow-2xs transition-all relative overflow-hidden"
                >
                  {/* Left Mocked Video Thumbnail */}
                  <div className="w-full md:w-[200px] h-[120px] shrink-0 rounded-2xl relative overflow-hidden flex flex-col justify-between p-3 select-none border border-slate-100" id={`thumb-${lesson.id}`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${lesson.themeColor.gradient} opacity-95 z-0`} />
                    
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      <span className="text-[8.5px] font-black text-white uppercase tracking-wider">
                        TOEFL® prep
                      </span>
                    </div>

                    {/* Miniature Play trigger */}
                    <button
                      onClick={() => setActiveLesson(lesson)}
                      className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:scale-105 transition-transform z-10 cursor-pointer"
                    >
                      <Play className="w-4.5 h-4.5 fill-current text-[#1E293B] translate-x-0.5" />
                    </button>

                    {/* Footer text of thumbnail */}
                    <div className="z-10 mt-auto flex justify-between items-center w-full">
                      <span className="text-[10px] font-black text-white/9 text-sans">
                        {lesson.duration}
                      </span>
                      <span className="text-[9px] font-bold text-white/8 font-mono bg-black/30 px-1.5 py-0.2 rounded">
                        Giselle
                      </span>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1 text-left space-y-2">
                    <h3 className="text-base font-black text-slate-800 leading-tight tracking-tight font-sans hover:text-blue-600 cursor-pointer" onClick={() => setActiveLesson(lesson)}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-[#475569] font-medium leading-relaxed font-sans line-clamp-2">
                      {lesson.description}
                    </p>
                    
                    {/* Instructor profile */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold font-sans">
                      <span className="text-[12px] font-extrabold text-slate-800">{lesson.instructor}</span>
                      <span className="text-[10px] font-semibold text-slate-400 px-1.5 py-0.2 bg-slate-50 border border-slate-200 rounded text-[9.5px] uppercase tracking-wide">instructor</span>
                      <button
                        onClick={() => alert(`Instructor Giselle holds a TOEFL 120 certified record and works directly under ITP academic research team.`)}
                        className="w-4 h-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full flex items-center justify-center border border-slate-200 transition-colors cursor-pointer"
                        title="Instructor Credentials"
                      >
                        <Search className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Watch Action */}
                  <div className="shrink-0 w-full md:w-auto flex md:flex-col justify-end" id={`action-${lesson.id}`}>
                    <button
                      type="button"
                      onClick={() => {
                        if (lesson.id === 'toefl-speaking') {
                           // Attempt to trigger the speaking test
                           // I'll search for the speaking test ID or just pass the first one for now
                           onTakeMockTest(TOEFL_TESTS[0]);
                        } else {
                           setActiveLesson(lesson);
                        }
                      }}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-all w-full md:w-28 text-center cursor-pointer shadow-3xs hover:scale-102 flex items-center justify-center space-x-1 font-sans"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{lesson.id === 'toefl-speaking' ? 'Start' : 'Watch'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Main Interactive Masterclass Modal Player Overlay */}
      {activeLesson && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="toefl-lesson-masterclass-player">
          <div className="bg-white rounded-[32px] w-full max-w-5xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className={`bg-gradient-to-r ${activeLesson.themeColor.gradient} p-6 text-white flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Play className="w-4.5 h-4.5 text-white fill-current translate-x-0.5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-85 font-sans">
                    TOEFL® Masterclass • Instructor {activeLesson.instructor}
                  </span>
                  <h3 className="text-lg font-black tracking-tight leading-tight font-sans">
                    {activeLesson.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body Pane (Scrollable on smaller heights) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] flex-1 overflow-y-auto">
              
              {/* Left Column: Simulated Video Screen and Primary player */}
              <div className="p-6 border-r border-[#E2E8F0] space-y-6 flex flex-col bg-slate-50/50">
                
                {/* Simulated Core Player Graphic */}
                <div className="bg-slate-950 rounded-2xl aspect-video overflow-hidden relative group shadow-lg border border-slate-800" id="lecture-screen-box">
                  {/* Beautiful customized graphic background of lecture slide matching color */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${activeLesson.themeColor.gradient} opacity-85 z-0 flex flex-col justify-between p-6 text-white`} />
                  
                  {/* Video Graphic elements */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white z-10 select-none">
                    <div className="flex justify-between items-center">
                      <span className="bg-black/30 border border-white/10 backdrop-blur-md text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                        Stream: 1080p Ultra-HD
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">Simulated Feed</span>
                      </div>
                    </div>

                    {/* Center title graphic overlay */}
                    <div className="text-center space-y-2 max-w-md mx-auto">
                      <h4 className="text-2xl font-black drop-shadow-md tracking-tight font-sans leading-tight">
                        {activeLesson.title}
                      </h4>
                      <p className="text-xs text-white/85 font-semibold font-mono">
                        Presented by Giselle • TOEFL® Specialist Team
                      </p>
                      
                      {/* Big Circle Play button overlay */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="mx-auto w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all mt-4 cursor-pointer"
                      >
                        {isPlaying ? (
                          <span className="flex space-x-1.5 justify-center items-center">
                            <span className="w-2.5 h-5 bg-slate-900 rounded-sm" />
                            <span className="w-2.5 h-5 bg-slate-900 rounded-sm" />
                          </span>
                        ) : (
                          <Play className="w-6 h-6 fill-current text-slate-900 translate-x-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Status text overlay */}
                    <div className="flex justify-between items-center text-xs text-white/90 font-bold bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5 font-sans">
                      <div className="flex items-center space-x-1">
                        <Volume2 className="w-4 h-4 text-white" />
                        <span>Interactive Waveform Active</span>
                      </div>
                      <span className="font-mono">Paced Slide: {progress === 100 ? 'Completed' : `${progress}% Played`}</span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 h-1.5 bg-blue-500 transition-all duration-300 z-20" style={{ width: `${progress}%` }} />
                </div>

                {/* Simulated Custom Video Control Buttons Bar */}
                <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl flex items-center justify-between gap-4 shadow-3xs" id="toefl-lecture-controls">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                      }}
                      className="text-slate-800 hover:text-blue-600 transition-colors font-extrabold text-xs flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer shadow-3xs"
                    >
                      {isPlaying ? 'Pause Lecture' : 'Resume Lecture'}
                    </button>
                    <button
                      onClick={() => {
                        setProgress(0);
                        setIsPlaying(true);
                      }}
                      className="text-slate-500 hover:text-slate-800 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer shadow-3xs"
                    >
                      Restart Slide
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 font-bold font-sans">
                    Estimated RunTime: <span className="font-mono text-slate-800 font-extrabold">{activeLesson.duration}</span>
                  </div>
                </div>

                {/* Objectives description */}
                <div className="space-y-3 text-left">
                  <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wide font-sans flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Active Lesson Syllabus</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeLesson.details.objectives.map((obj, i) => (
                      <li key={i} className="bg-white border border-slate-200/80 p-3 rounded-xl flex items-start space-x-2 shadow-3xs text-[11.5px] font-semibold text-[#475569] leading-tight">
                        <span className="w-4.5 h-4.5 text-[10px] text-blue-700 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center font-black shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Interaction Hub (Cheatsheets, Quizzes, Notes) */}
              <div className="p-6 flex flex-col space-y-6 max-h-full overflow-y-auto">
                
                {/* Mini Interaction Navigation */}
                <div className="flex bg-slate-100 p-1 rounded-xl" id="interaction-tabs">
                  {[
                    { id: 'objectives', label: 'Tactics' },
                    { id: 'cheatsheet', label: 'Cheat Sheet' },
                    { id: 'quiz', label: 'Lecture Quiz' },
                    { id: 'notes', label: 'My Notes' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-2 text-center rounded-lg text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-white text-slate-800 shadow-3xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT: Tactics */}
                {activeTab === 'objectives' && (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                        Giselle's High-Score Pointers
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                        These are selected master-level protocols curated from top-percentile academic candidates. Keep them at the center of your drills.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {activeLesson.details.highScoreTips.map((tip, idx) => (
                        <div key={idx} className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex items-start space-x-3 text-emerald-950 font-sans">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-3xs">
                            <Check className="w-3.5 h-3.5 stroke-[4px]" />
                          </span>
                          <span className="text-[12px] font-bold leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#FFF8F2] border border-[#FFECD5] p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] font-black text-[#C2410C] uppercase tracking-wide">Pro Tip</span>
                      <p className="text-[11.5px] text-orange-950 leading-relaxed font-semibold">
                        "Your accent doesn't need to be perfect to score high in Speaking. Standard pronunciation rhythm and logical transitions carry more raw scoring weight in the TOEFL rubrics."
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Cheatsheet */}
                {activeTab === 'cheatsheet' && (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                        Reference Sheet
                      </h4>
                      <button
                        onClick={() => {
                          alert(`Downloading Cheat Sheet Guide - ${activeLesson.title}.pdf (Simulated File generation)`);
                        }}
                        className="text-[10.5px] font-black text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] leading-relaxed whitespace-pre-line overflow-x-auto border border-slate-800">
                      {activeLesson.details.cheatSheet}
                    </div>

                    <div className="text-xs text-slate-400 font-semibold leading-relaxed">
                      Download this visual cheat sheet to your local storage device or print it out as a desktop cheat sheet reference during test simulator mock drills.
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Quiz */}
                {activeTab === 'quiz' && (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                        Lecture Assessment Drill
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                        Verify your memory and understanding of key criteria presented in this TOEFL lesson module.
                      </p>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-4 shadow-3xs">
                      <p className="text-xs sm:text-[13px] font-black text-slate-800 leading-snug">
                        {activeLesson.quiz.question}
                      </p>

                      <div className="space-y-2.5">
                        {activeLesson.quiz.options.map((opt, keyIdx) => {
                          const isSelected = selectedOption === keyIdx;
                          return (
                            <button
                              key={keyIdx}
                              disabled={quizSubmitted}
                              onClick={() => setSelectedOption(keyIdx)}
                              className={`w-full text-left p-3 rounded-xl text-xs font-bold leading-relaxed transition-all flex items-start gap-2.5 border cursor-pointer ${
                                isSelected 
                                  ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-3xs'
                                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 text-[#475569]'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Score Verification actions */}
                      {!quizSubmitted ? (
                        <button
                          type="button"
                          disabled={selectedOption === null}
                          onClick={() => setQuizSubmitted(true)}
                          className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <div className="space-y-3 animate-fade-in pt-1 border-t border-slate-100">
                          {selectedOption === activeLesson.quiz.correctAnswer ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3 rounded-xl flex gap-2.5 items-start text-xs font-bold leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-emerald-800 font-extrabold block">Correct Answer!</span>
                                <span>Excellent work. You successfully extracted the core guideline.</span>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-rose-50 border border-rose-200 text-rose-950 p-3 rounded-xl flex gap-2.5 items-start text-xs font-bold leading-relaxed">
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-rose-800 font-extrabold block">Incorrect Answer</span>
                                <span>The option you chose does not align with the standard test guidelines.</span>
                              </div>
                            </div>
                          )}

                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs">
                            <span className="font-extrabold text-slate-800 block">Instructor Explanation:</span>
                            <p className="text-slate-600 font-medium leading-relaxed">
                              {activeLesson.quiz.explanation}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOption(null);
                              setQuizSubmitted(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 font-black cursor-pointer uppercase tracking-wider text-left block"
                          >
                            Reset Quiz Drill
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Notes */}
                {activeTab === 'notes' && (
                  <div className="space-y-4 animate-fade-in text-left flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-800 tracking-tight font-sans">
                        My Lecture Notes Log
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                        Brainstorm ideas, write down template structures, or note specific words to remember. Saved locally.
                      </p>
                    </div>

                    <textarea
                      placeholder="Type your strategic notes here..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full flex-1 min-h-[160px] p-4 text-xs font-mono border border-slate-200 rounded-2xl focus:outline-hidden focus:border-blue-400 bg-slate-50/50 resize-none leading-relaxed"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          setNotes('');
                          localStorage.removeItem(`toefl_notes_${activeLesson.id}`);
                        }}
                        className="text-[#5C6E84] hover:text-slate-800 text-xs font-bold px-3 py-2 cursor-pointer"
                      >
                        Clear Notes
                      </button>
                      <button
                        onClick={handleSaveNotes}
                        className="bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-3xs"
                      >
                        Save to Profile
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
