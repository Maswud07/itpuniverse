import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ArrowRight, 
  ExternalLink, 
  ArrowUp, 
  Volume2, 
  BookOpen, 
  Globe, 
  X,
  FileText,
  Bookmark,
  Heart,
  Share2,
  PenTool,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface BlogPost {
  id: string;
  category: string;
  tags: string[]; // e.g. ['TOEFL', 'PTE', 'IELTS', 'News'] for multi-filtering
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  readTime: string;
  imageUrl: string; // fallback if illustration isn't used
  illustrationType: 'new_toefl' | 'pte_event' | 'ielts_listening' | 'ielts_reading' | 'ielts_writing' | 'ielts_speaking' | 'toefl_speaking' | 'toefl_writing' | 'toefl_listening';
}

interface BlogPageProps {
  onNavigateTab: (tab: string) => void;
  onSelectExam: (exam: 'TOEFL' | 'IELTS' | 'PTE') => void;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'TOEFL',
    tags: ['TOEFL', 'NEWS'],
    title: 'ITP Starts New TOEFL Mock Tests!',
    summary: '🚀 ITP Starts New TOEFL Mock Tests! Starting January 2026, the TOEFL exam will be updated, and you can experience the New TOEFL in advance on ITP.',
    publishDate: 'Jan 10, 2026',
    readTime: '6 min read',
    imageUrl: '',
    illustrationType: 'new_toefl',
    content: `
# New TOEFL Exam structure is officially live on ITP!

ITP is proud to be the first global preparation platform to integrate the revised 2026 TOEFL iBT format. Educational Testing Service (ETS) has initiated streamlined upgrades to focus strictly on structural competency and communicative focus. 

## What Are the Big Changes in the 2026 TOEFL iBT?
The modern test has been shortened from over 3 hours to exactly **1 hour and 56 minutes**, completely removing non-scored experimental questions and administrative pause intervals. It focuses on:
- **Two unified Reading Passages** (instead of three or four), consisting of exactly 10 questions per passage.
- **High-speed Listening tracks** featuring academic lectures with natural speaker stuttering and realistic classroom pauses.
- **The revolutionary Academic Discussion writing task**, replacing the classical Independent Essay. You now have just 9 minutes to read a professor's prompt and write a structured 120-150 word post contributing to a classroom discussion board.

## How Can You Prepare in Advance?
At ITP, our research team works hand-in-hand with verified TOEFL item writers. We have successfully calibrated our proprietary AI grading rubrics. Our mock tests provide:
1. **Instant and Precise AI Scoring**: Receive your full out-of-120 feedback scores in less than 2 minutes.
2. **Grammar & Lexical Variations suggestions**: Learn which synonyms to use to lift your writing score over 25+ points.
3. **Speech clarity maps**: See exactly which vocal pauses and syllable stress anomalies are dragging down your speaking response marks.

Jump into our dedicated TOEFL Mock Test page today and check your current baseline starting position for free!
    `
  },
  {
    id: 'post-2',
    category: 'NEWS | PTE',
    tags: ['PTE', 'NEWS'],
    title: 'Get Free PTE mock tests! EVENT',
    summary: 'ITP PTE is here✨ ITP welcomes PTE, following TOEFL and IELTS ! By joining us, we are prepared to be very welcome.',
    publishDate: 'Feb 15, 2026',
    readTime: '4 min read',
    imageUrl: '',
    illustrationType: 'pte_event',
    content: `
# Exciting Announcement: ITP Officially Launches PTE Academic Support!

We have been listening closely to our global student community. In addition to our world-class IELTS and TOEFL training systems, **ITP PTE Academic has formally launched**! 

To celebrate this monumental product expansion, we are hosting a **100% Free PTE Mock Test Event** for all newly registered students this month.

## Why Prep for PTE Academic on ITP?
Pearson Test of English (PTE) is widely popular among university applicants and professional immigrants to Australia, New Zealand, Canada, and the UK. Because PTE is an entirely computer-scored exam, practicing on a high-fidelity simulator is absolutely vital to your final scoring outcome.

Our new PTE suite includes:
- **Real-Time Speech Transcription**: See exactly how the computer hears your "Read Aloud" and "Describe Image" prompts.
- **Automated Fill-in-the-Blanks diagnostics**: Pinpoint the precise prepositional and academic collocations you miss representing context.
- **Complete Full Mock Exams**: Hand-drafted mock modules running on the exact structural time schedules of the official exam.

### Special Launch Event:
For the next two weeks, you can run three full-length PTE Academic simulation packages. No payment cards or coupon codes required! Click "Purchase" or go to the "Mock Tests" section to load your free test packet instantly.
    `
  },
  {
    id: 'post-3',
    category: 'IELTS | LISTENING',
    tags: ['IELTS', 'LISTENING'],
    title: 'IELTS Listening – Complete Guide to All Question Types (2024)',
    summary: 'Overview of the IELTS Listening Section',
    publishDate: 'Dec 05, 2025',
    readTime: '8 min read',
    imageUrl: '',
    illustrationType: 'ielts_listening',
    content: `
# Mastering IELTS Listening: The Ultimate Complete Guide (2024 Version)

The IELTS Listening section demands high cognitive coordination. You must listen to audio, parse a written question paper, and write your answers simultaneously. 

## The Four Audio Environments
The section is divided into four parts with progressive vocabulary difficulty:
1. **Part 1**: A everyday social dialogue (e.g., booking a hotel room or rental lease discussion).
2. **Part 2**: A non-academic monologue (e.g., a local gym guide explaining new facility rules).
3. **Part 3**: An educational or coaching dialogue between 2 to 4 people (e.g., academic tutor advising a student about dissertation edits).
4. **Part 4**: An intense academic lecture on science, history, or humanities. No pauses inside!

## Top Tips for High Bands:
- **Avoid Singular/Plural Traps**: If a noun requires a plural suffix based on article agreement (e.g., "three apples" instead of "three apple"), writing the singular form gets scored as entirely incorrect.
- **Pre-read Questions during pause triggers**: Never sit idle during "You now have 30 seconds to look at questions..." Use this precious window to circle keywords and predict word categories (noun, number, adjective).
- **Master the Distractors**: Speakers often change their minds midway. *"Actually, let's schedule for Thursday. No, wait, Friday is better!"* Be prepared for sudden conversational shifts.
    `
  },
  {
    id: 'post-4',
    category: 'IELTS | READING',
    tags: ['IELTS', 'READING'],
    title: 'IELTS Reading – Complete Guide to All Question Types (2024)',
    summary: 'Overview of the IELTS Reading Section',
    publishDate: 'Nov 18, 2025',
    readTime: '9 min read',
    imageUrl: '',
    illustrationType: 'ielts_reading',
    content: `
# Cracking IELTS Reading: Skimming, Scanning, and Critical Logic

With 3 deep reading passages and 40 questions to resolve in only 60 minutes, time pressure is the biggest obstacle to a high reading band. 

## Key Question Type breakdowns:
### 1. True, False, Not Given (TFNG)
This is typically the most frequently failed question block.
- **TRUE**: The text explicitly supports the statement claim.
- **FALSE**: The text directly contradicts or negates the statement.
- **NOT GIVEN**: The text does not contain enough evidence to confirm or deny the statement. Never assume or extrapolate!

### 2. Heading Matching
You must match a list of summaries with designated paragraphs.
- **Strategy**: Read the first and last sentence of the paragraph first to find the primary theme. Avoid matching identical keywords; correct heads usually paraphrase high-level ideas.

### 3. Sentence Completion
You must extract words directly from the text to fit a summarized sentence gap. Adhere strictly to the word count limit (e.g., "NO MORE THAN TWO WORDS").
    `
  },
  {
    id: 'post-5',
    category: 'IELTS | WRITING',
    tags: ['IELTS', 'WRITING'],
    title: 'IELTS Writing – Complete Guide to All Question Types (2024)',
    summary: 'Overview of the IELTS Writing Section',
    publishDate: 'Oct 22, 2025',
    readTime: '10 min read',
    imageUrl: '',
    illustrationType: 'ielts_writing',
    content: `
# Advanced IELTS Writing Task 1 and Task 2 Formatting Strategy

Your essays are marked based on four metrics: Task Achievement (25%), Coherence and Cohesion (25%), Lexical Resource (25%), and Grammatical Range and Accuracy (25%).

## Academic Task 1: Data Synthesis
You are presented with a chart, graph, map, or mechanical cycle diagram.
- **Objective**: Identify the most significant global trends inside the chart and describe them with absolute precision.
- **No Personal Speculation**: Never explain *why* you think data increased. Stick strictly to physical numbers.

## Academic Task 2: Argue and Defend
A 40-minute descriptive essay.
- **The Four-Paragraph Structure**:
  1. **Intro**: Paraphrase the prompt + explicitly state your final stance (thesis).
  2. **Body Paragraph 1**: Give Argument A with structured explanation and a real-world study or country example.
  3. **Body Paragraph 2**: Give Argument B with illustrative details.
  4. **Conclusion**: Restate your core stance and summarize key highlights.
    `
  },
  {
    id: 'post-6',
    category: 'IELTS | SPEAKING',
    tags: ['IELTS', 'SPEAKING'],
    title: 'IELTS Speaking – Complete Guide to All Question Types (2024)',
    summary: 'Overview of the IELTS Speaking Section',
    publishDate: 'Sep 12, 2025',
    readTime: '7 min read',
    imageUrl: '',
    illustrationType: 'ielts_speaking',
    content: `
# IELTS Speaking Secrets to Overcome Anxiety and Secure Band 7.5+

Unlike other computer-based English exams, the IELTS Speaking test is a real face-to-face academic interview with a trained examiner. Your conversational fluency is assessed.

## The Three Test phases
- **Part 1 (Introduction & Familiar Topics)**: Short, low-pressure questions about your hometown, current job, hobbies, or breakfast routines. Aim for 2-3 clean, natural sentences.
- **Part 2 (The Cue Card Monologue)**: You have exactly 1 minute to plan a speech on a given card, and must speak continuously for 1 to 2 minutes. Write down 5 keywords during preparation.
- **Part 3 (The Abstract Discussion)**: Deep, analytical conversation branching off your Part 2 prompt. You must defend logic, discuss trends, and evaluate hypothetical scenarios.

## Important Tactics:
- **Avoid Over-memorized templates**: Examiners spot canned idioms instantly. Speak naturally.
- **The "PPF" speaking formula for Cue Cards**: If you run out of ideas, structure your talk through Past experience, Present status, and Future goals. It keeps you speaking effortlessly!
    `
  },
  {
    id: 'post-7',
    category: 'SPEAKING | TOEFL',
    tags: ['TOEFL', 'SPEAKING'],
    title: 'TOEFL Speaking – Complete Guide to All Question Types (2024)',
    summary: 'Overview of the TOEFL Speaking Section (post July 2023)',
    publishDate: 'Aug 04, 2025',
    readTime: '8 min read',
    imageUrl: '',
    illustrationType: 'toefl_speaking',
    content: `
# Standardized TOEFL Speaking Tasks: Structuring and Pronunciation

The TOEFL Speaking section tests how well you can communicate ideas in an academic environment. You speak into a standard microphone, and your audio files are analyzed by an integrated AI rating system and certified human review raters.

## Breakdown of the 4 Tasks
1. **Task 1: Independent Choice (Agree/Disagree)**: Pick one side of a social choice in 15 seconds and deliver a 45-second argumentative response.
2. **Task 2: Campus Announcement**: Read a short campus policy change announcement, listen to a dialogue of two students debating it, and summarize their arguments in 60 seconds.
3. **Task 3: Academic Concept**: Read a short definition of a scientific/business term, listen to a professor illustrative lecture, and explain how the lecture example reflects the general concept definition.
4. **Task 4: Academic Lecture Summary**: Listen to a mini college lecture detailing two aspects of a process, and summarize both sub-points in 60 seconds.
    `
  },
  {
    id: 'post-8',
    category: 'TOEFL | WRITING',
    tags: ['TOEFL', 'WRITING'],
    title: 'TOEFL Writing-Complete Guide to All Question Types (2024)',
    summary: 'Overview of the TOEFL Writing Section (post July 2023)',
    publishDate: 'Jul 21, 2025',
    readTime: '9 min read',
    imageUrl: '',
    illustrationType: 'toefl_writing',
    content: `
# Mastering the New TOEFL Writing: Academic Discussion Mastery

Since cellular updates in mid-2023, the old independent essay has ceased to exist. Focus completely on Task 1 (Integrated) and Task 2 (Writing for an Academic Discussion).

## Mastering Task 2
You have exactly 9 minutes. You are presented with:
- A professor’s question on an online post board.
- Diverse arguments by 2 students (e.g., Claire and Paul).

### Critical Scoring Formula:
- **Word Goal**: 120 - 150 words.
- **Layout**:
  1. **Direct Point**: State your exact argument immediately.
  2. **Contrast Critique**: Quote and challenge or build upon Claire's or Paul's point (e.g., *"Although Paul is correct about economic limits, he ignores the secondary health benefits..."*).
  3. **Unique elaboration**: Give a fresh personal perspective with a clear example.
    `
  },
  {
    id: 'post-9',
    category: 'LISTENING | TOEFL',
    tags: ['TOEFL', 'LISTENING'],
    title: 'TOEFL Listening-Complete Guide to All Question Types (2024)',
    summary: 'Overview of the TOEFL Listening Section (post July 2023)',
    publishDate: 'Jun 14, 2025',
    readTime: '7 min read',
    imageUrl: '',
    illustrationType: 'toefl_listening',
    content: `
# Excel in TOEFL Listening: Active Memory and Symbolic Note-Taking

TOEFL Listening contains complex academic context. You cannot look at the questions first; you must listen to a complete 5-minute biology or archeology lecture, taking pristine notes before any questions appear.

## Critical Tactics:
- **Recognize structural signals**: When the professor says *"This leads us to our next point..."* or *"What is particularly interesting about this is..."*, they are signaling a primary test question.
- **The "Speaker Stance" questions**: Pay deep attention to how the speaker delivers their ideas. If they sigh, correct themselves, or laugh, write down their contextual attitude immediately.
- **Avoid excessive typing**: Use basic symbols and shorthand. Track causes and consequences using simple arrow lines.
    `
  }
];

export default function BlogPage({ onNavigateTab, onSelectExam }: BlogPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Bookmark simulation
  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    const saved = localStorage.getItem('blog_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (bookmarked.includes(id)) {
      updated = bookmarked.filter(item => item !== id);
    } else {
      updated = [...bookmarked, id];
    }
    setBookmarked(updated);
    localStorage.setItem('blog_bookmarks', JSON.stringify(updated));
  };

  // Reset page when search or tag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag, searchQuery]);

  // Dynamically filter blog posts based on category tag and text search
  const filteredPosts = BLOG_POSTS.filter(post => {
    // Tag filter
    const matchesTag = selectedTag === 'All' || 
                       post.tags.includes(selectedTag.toUpperCase()) ||
                       post.category.toUpperCase().includes(selectedTag.toUpperCase());
    
    // Search filter
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchLower === '' || 
                          post.title.toLowerCase().includes(searchLower) ||
                          post.summary.toLowerCase().includes(searchLower) ||
                          post.category.toLowerCase().includes(searchLower) ||
                          post.content.toLowerCase().includes(searchLower);
    
    return matchesTag && matchesSearch;
  });

  // Calculate Paginated items (9 per page, perfectly fits)
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper inside mock illustration renderer to fetch matching color cards and visual text matching screenshot
  const renderIllustration = (type: string) => {
    switch(type) {
      case 'new_toefl':
        return (
          <div className="w-full h-full bg-[#111827] flex flex-col justify-between p-4 text-white relative select-none">
            {/* Top Logo */}
            <div className="flex items-center space-x-1.5 grayscale opacity-80">
               <span className="text-[10px] font-black tracking-tighter">ITP</span>
            </div>
            
            {/* Center Content */}
            <div className="space-y-1 my-auto text-left relative z-15">
              <h4 className="text-[18px] sm:text-[20px] font-black leading-tight tracking-tight text-white font-sans max-w-[170px]">
                ITP Starts New TOEFL Mock Tests!
              </h4>
            </div>

            {/* Mascot and Small Badge */}
            <div className="absolute right-4 bottom-3 w-20 h-20 flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-[#FDBA74] rounded-full flex items-center justify-center relative shadow-md">
                {/* Cute fox graphic with smile and bow-tie */}
                <span className="text-3xl">🦊</span>
                <div className="absolute -bottom-1 -left-2 bg-blue-600 text-[8px] font-black text-white px-1.5 py-0.2 rounded-md transform -rotate-12 uppercase">
                  New
                </div>
              </div>
            </div>

            {/* Small Brand label */}
            <div className="flex justify-between items-center z-10 text-[9px] font-bold text-slate-400 font-mono">
              <span>ITP</span>
              <span className="bg-blue-600 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">TOEFL®</span>
            </div>
          </div>
        );
      case 'pte_event':
        return (
          <div className="w-full h-full bg-[#E0F2FE] flex flex-col justify-between p-4 text-[#1E3A8A] relative select-none">
            {/* Green gradient matching PTE event theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-100 z-0 opacity-95" />
            
            {/* Free stamp header */}
            <div className="flex justify-between items-center z-10">
              <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-wider font-mono">NEWS | PTE</span>
              <div className="bg-red-500 text-white font-black text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-widest transform rotate-6 shadow-sm">
                FREE!
              </div>
            </div>

            {/* Title text */}
            <div className="text-left my-auto space-y-1 z-10 max-w-[180px]">
              <h4 className="text-[24px] sm:text-[26px] font-black text-[#065F46] leading-none tracking-tighter">
                Get FREE PTE Mock Tests!
              </h4>
            </div>

            <div className="absolute right-3 bottom-3 w-16 h-16 opacity-30 z-0">
              <span className="text-5xl">💻</span>
            </div>

            {/* Bottom metadata */}
            <div className="flex justify-between items-center z-10 pt-2 border-t border-emerald-200/50">
              <span className="text-[10px] font-black text-emerald-800 font-sans flex items-center space-x-1">
                <span>🎓</span>
                <span>Active Event</span>
              </span>
              <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-widest">ITP</span>
            </div>
          </div>
        );
      
      // Default placeholder with red targets consistent with screenshot types (Listening, Reading, Writing, Speaking)
      default:
        const isIelts = type.startsWith('ielts');
        const examName = isIelts ? 'IELTS' : 'TOEFL';
        const sectionName = type.replace('ielts_', '').replace('toefl_', '').toUpperCase();
        const cardBgColor = isIelts ? 'bg-indigo-50/60' : 'bg-sky-50/60';
        const labelColor = isIelts ? 'bg-[#991B1B] text-white' : 'bg-blue-600 text-white';

        return (
          <div className={`w-full h-full ${cardBgColor} flex flex-col justify-between p-4 text-slate-800 relative select-none border border-slate-100`}>
            {/* Top Exam identifier pill */}
            <div className="flex items-center justify-between z-10 w-full">
              <span className={`${labelColor} font-black text-[8.5px] px-2 py-0.5 rounded uppercase tracking-widest text-[#FFF] shadow-3xs`}>
                {examName}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                {sectionName} 🎙️
              </span>
            </div>

            {/* Center target graphic matching IELTS lists in screenshot */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center opacity-85 z-5">
              <div className="w-16 h-16 rounded-full border-4 border-red-500/10 flex items-center justify-center relative">
                {/* Consecutive concentric circles of target */}
                <div className="w-11 h-11 rounded-full border-2 border-red-500/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[8px] font-bold">
                    🎯
                  </div>
                </div>
                {/* Miniature diagonal Arrow representation */}
                <div className="absolute -top-3 -right-3 transform rotate-45 text-slate-400 font-extrabold text-xs">
                  ↗️
                </div>
              </div>
            </div>

            {/* Primary graphic Title text */}
            <div className="text-left my-auto space-y-1 z-10 max-w-[160px]">
              <span className="text-[10px] font-bold text-slate-400 font-sans tracking-wide block">
                {examName} {sectionName.charAt(0) + sectionName.slice(1).toLowerCase()} Overview
              </span>
              <h4 className="text-lg font-black text-slate-800 leading-tight tracking-tight">
                Complete Guide to All Question Types
              </h4>
            </div>

            {/* Brand footer signature */}
            <div className="flex items-center space-x-1 z-10 border-t border-slate-200/50 pt-2">
              <span className="text-[10px] font-black text-blue-600 tracking-tight">
                ITP
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 pb-16 animate-fade-in font-sans" id="itp-blog-page">
      
      {/* ==================== SCREENSHOT BLOG HEADER NAVIGATION BAR ==================== */}
      <div className="w-full bg-white border-b border-gray-100 py-3.5 px-4 sticky top-0 z-40 shadow-3xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Brand and logo identical to search page header */}
          <div 
            onClick={() => onNavigateTab('Home')} 
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            id="blog-nav-logo"
          >
            <span className="font-sans font-black text-lg tracking-tight text-slate-800">
              ITP
            </span>
          </div>

          {/* Central Pill navigations matching perfect screenshot links */}
          <div className="hidden md:flex items-center space-x-7 text-xs font-bold text-[#475569] tracking-normal" id="blog-nav-links">
            <button onClick={() => onNavigateTab('Home')} className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600 font-extrabold">
              Home
            </button>
            
            {/* Dropdown triggers simulating screen dropdown markers */}
            <div className="relative group cursor-pointer flex items-center space-x-1 hover:text-blue-600 transition-colors" onClick={() => { onSelectExam('TOEFL'); onNavigateTab('Mock Tests'); }}>
              <span>TOEFL</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
            </div>

            <div className="relative group cursor-pointer flex items-center space-x-1 hover:text-blue-600 transition-colors" onClick={() => { onSelectExam('IELTS'); onNavigateTab('Mock Tests'); }}>
              <span>IELTS</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
            </div>

            <div className="relative group cursor-pointer flex items-center space-x-1 hover:text-blue-600 transition-colors" onClick={() => { onSelectExam('PTE'); onNavigateTab('Mock Tests'); }}>
              <span>PTE</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
            </div>

            <button onClick={() => alert('Study Abroad Visa & Interview Prep launched!')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Study Abroad
            </button>
            <button onClick={() => alert('ITP by Databank is an official AI study engine with 1M+ active users.')} className="hover:text-blue-600 transition-colors cursor-pointer">
              About Us
            </button>
          </div>

          {/* Right Action Trigger with external label and search icon */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigateTab('Home')}
              className="text-[#475569] hover:text-blue-600 text-xs font-bold leading-none hidden lg:flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>Go to ITP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            
            <span className="h-4 w-px bg-slate-200 hidden md:block" />

            <div className="relative" id="blog-incremental-search-box">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-8.5 pr-3 py-1 bg-slate-100 rounded-full text-xs text-slate-800 placeholder-slate-400 border border-transparent focus:border-blue-200 focus:outline-hidden transition-all w-32 sm:w-44"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center text-[9px] text-[#475569]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== INTERACTIVE FILTER SHELF & LANDING TOPIC ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Welcome Section */}
        <div className="text-left space-y-2 mb-8">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-150">
            Official Blog
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none font-sans">
            ITP Study Lounge
          </h1>
          <p className="text-[#5C6E84] text-[13px] leading-relaxed max-w-2xl font-semibold">
            Unlock the ultimate list of guideposts, test update strategies, event notices, and actionable study materials authored by top-quartile certified specialists.
          </p>
        </div>

        {/* Categorization chips bar matching premium styles */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-5 mb-8" id="blog-tags-menu">
          {['All', 'TOEFL', 'IELTS', 'PTE', 'NEWS', 'LISTENING', 'READING', 'WRITING', 'SPEAKING'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer select-none ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 border border-transparent'
                  : 'bg-slate-50 text-[#334155] hover:bg-slate-100 border border-slate-200/50'
              }`}
            >
              {tag}
            </button>
          ))}

          {bookmarked.length > 0 && (
            <button
              onClick={() => setSelectedTag('Bookmarked')}
              className={`ml-auto px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedTag === 'Bookmarked'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 border border-rose-100'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Bookmarked ({bookmarked.length})</span>
            </button>
          )}
        </div>

        {/* Dynamic found counter indicator */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1 rounded-md">
            Articles found: {selectedTag === 'Bookmarked' ? bookmarked.length : filteredPosts.length}
          </span>
          {searchQuery && (
            <span className="text-xs text-blue-600 font-bold font-sans">
              Filtered by: "{searchQuery}"
            </span>
          )}
        </div>

        {/* ==================== THE NINE BLOG GRAPHICS GRID (PAGES) ==================== */}
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
            <span className="text-4xl text-slate-300">🕵️‍♂️</span>
            <h3 className="text-base font-black text-slate-700">No blog posts match your selection</h3>
            <p className="text-xs text-slate-400 font-semibold max-w-sm mx-auto">
              Try adjusting your query or category buttons to view our entire catalogue.
            </p>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
              className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left" id="blog-articles-grid">
            {(selectedTag === 'Bookmarked' 
              ? BLOG_POSTS.filter(p => bookmarked.includes(p.id)) 
              : paginatedPosts
            ).map(post => {
              const isSaved = bookmarked.includes(post.id);
              return (
                <article
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-white border border-slate-100 hover:border-slate-200/80 rounded-[28px] overflow-hidden shadow-3xs hover:shadow-2xs cursor-pointer group transition-all flex flex-col h-full"
                >
                  
                  {/* Aspect Video Card Graphic (Matches screenshot artwork precisely!) */}
                  <div className="aspect-video w-full overflow-hidden relative border-b border-slate-150">
                    {renderIllustration(post.illustrationType)}
                    
                    {/* Hover state overlay effect */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    
                    {/* Bookmark handle */}
                    <button
                      onClick={(e) => toggleBookmark(post.id, e)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer shadow-3xs"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Meta stamp */}
                      <span className="text-[10.5px] font-black text-blue-600 uppercase tracking-widest font-mono">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-[17px] font-black text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-sans">
                        {post.title}
                      </h3>

                      {/* Snippet */}
                      <p className="text-xs sm:text-[12.5px] text-[#475569] font-medium leading-relaxed font-sans line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-center space-x-2 text-[10.5px] text-slate-400 font-bold font-mono">
                        <span>{post.publishDate}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <button 
                        className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors flex items-center space-x-1"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* ==================== THE SCREENSHOT PAGINATION CONTROLS ==================== */}
        {selectedTag !== 'Bookmarked' && totalPages > 1 && (
          <div className="flex items-center justify-start space-x-2.5 mt-12 py-6 border-t border-slate-100" id="blog-pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors text-xs font-bold font-sans cursor-pointer"
            >
              Previous
            </button>

            {/* List pages dynamically up to simulated length from screenshot */}
            <button 
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-md text-xs font-bold transition-all cursor-pointer ${
                currentPage === 1 
                  ? 'bg-blue-600 text-white font-black' 
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              1
            </button>

            {totalPages >= 2 && (
              <button 
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 2 
                    ? 'bg-blue-600 text-white font-black' 
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                2
              </button>
            )}

            {totalPages >= 3 && (
              <button 
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 3 
                    ? 'bg-blue-600 text-white font-black' 
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                3
              </button>
            )}

            {/* Ellipsis matching screenshot layout precisely */}
            <span className="text-slate-400 font-bold text-xs px-1">...</span>

            {/* Simulated 15 key representing high density contents listed in screenshot */}
            <button 
              onClick={() => {
                alert('Simulated deep page query context loaded for catalog volume.');
                setCurrentPage(totalPages);
              }}
              className="w-8 h-8 rounded-md bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
            >
              15
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors text-xs font-bold font-sans cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* ==================== PERSISTENT BOTTOM LINKS SECTION MATCHING SCREENSHOT FOOTER ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12" id="blog-mini-directory-footer">
          
          {/* Quick links listed precisely in screenshot bottom line */}
          <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2 text-[11.5px] font-bold text-slate-500">
            <button onClick={() => onNavigateTab('Home')} className="hover:text-blue-600 cursor-pointer transition-colors">Home</button>
            <button onClick={() => { onSelectExam('TOEFL'); onNavigateTab('Study Center'); }} className="hover:text-blue-600 cursor-pointer transition-colors text-slate-600">TOEFL</button>
            <button onClick={() => { onSelectExam('IELTS'); onNavigateTab('Study Center'); }} className="hover:text-blue-600 cursor-pointer transition-colors text-slate-600">IELTS</button>
            <button onClick={() => { onSelectExam('PTE'); onNavigateTab('Mock Tests'); }} className="hover:text-blue-600 cursor-pointer transition-colors text-slate-600">PTE</button>
            <button onClick={() => alert('Study Abroad Consultations loaded!')} className="hover:text-blue-600 cursor-pointer transition-colors">Study Abroad</button>
            <button onClick={() => alert('Databank Inc. Headquarters in Gangnam, Seoul.')} className="hover:text-blue-600 cursor-pointer transition-colors">About Us</button>
          </div>

          {/* Back to top floating graphic link */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-blue-600 flex items-center justify-center transition-colors shadow-3xs cursor-pointer text-slate-500"
            title="Go up to screen top"
          >
            <ArrowUp className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

        {/* Translation tag lines from screenshot footer */}
        <div className="text-center font-sans font-bold text-[11px] text-slate-400 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            ITP Blog | © 2026 ITP. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Powered by</span>
            <span className="font-extrabold text-blue-500">Databank AI Study Grid</span>
          </div>
        </div>
      </div>

      {/* ==================== ACTIVE ARTICLE READER SLIDE DRAWER / DIALOG ==================== */}
      {activePost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="blog-article-full-reader">
          <div className="bg-white rounded-[32px] w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header / Cover slide */}
            <div className="h-[220px] relative overflow-hidden shrink-0 border-b border-slate-100">
              {renderIllustration(activePost.illustrationType)}
              
              {/* Blur gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              
              {/* Overlaid details */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-left text-white space-y-1">
                <span className="bg-blue-600 text-white text-[8.5px] px-2 py-0.5 rounded uppercase tracking-widest font-black select-none">
                  {activePost.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-md">
                  {activePost.title}
                </h3>
              </div>

              {/* Close handle button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Contents flow (Scrollable) */}
            <div className="p-8 overflow-y-auto flex-1 text-left space-y-6">
              
              {/* Share & actions banner bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-bold">
                  <span className="bg-slate-50 border border-slate-100 rounded px-2 py-1 text-[11px] text-[#475569] font-extrabold uppercase">
                    curated post
                  </span>
                  <span>{activePost.publishDate}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Copied article URL to clipboard!');
                    }}
                    className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Share link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(activePost.id, e)}
                    className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Bookmark"
                  >
                    <Heart className={`w-3.5 h-3.5 ${bookmarked.includes(activePost.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Rich Markdown Styled text content */}
              <div className="font-sans text-[13.5px] sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                {activePost.content.trim().split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={pIdx} className="text-xl sm:text-2xl font-black text-slate-900 border-b border-slate-100 pb-1 pt-4 first:pt-0">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={pIdx} className="text-base sm:text-lg font-black text-slate-800 pt-3">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-sm font-black text-slate-800 pt-2 flex items-center space-x-2">
                        <span className="w-1.5 h-3 bg-blue-600 rounded-xs" />
                        <span>{paragraph.replace('###', '')}</span>
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={pIdx} className="space-y-1.5 pl-2">
                        {paragraph.split('\n').map((li, liIdx) => (
                          <li key={liIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0 mt-2" />
                            <span className="font-semibold text-slate-700 text-xs sm:text-[13px]">
                              {li.replace('- ', '').replace('**', '').replace('**', '')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-600 font-semibold leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Author support banner */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex items-center space-x-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[20px] font-black shrink-0">
                  🦉
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-black text-slate-800">
                    ITP Editorial Council
                  </h4>
                  <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
                    This instruction content has been compiled and peer-reviewed by our double-certified test authors under ETS iBT and IELTS General Guidelines.
                  </p>
                </div>
              </div>

            </div>

            {/* Footer triggers */}
            <div className="bg-slate-50 border-t border-slate-100 p-5 flex items-center justify-between shrink-0">
              <span className="text-[11.5px] text-slate-500 font-bold font-mono">
                Was this article helpful to your training plan?
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    alert('Thank you for your response! Feedback captured successfully.');
                    setActivePost(null);
                  }}
                  className="px-4 py-2 hover:bg-slate-200/80 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                >
                  No, too simple
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Wonderful! We are adding deeper articles referencing the test curriculum soon.');
                    setActivePost(null);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shrink-0 cursor-pointer shadow-3xs"
                >
                  Yes, very much!
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
