import React from 'react';
import { ExamType } from '../types';
import { Volume2, BookOpen, Mic, PenTool, ChevronRight, ChevronLeft, Shield, Zap, Crown, Award, MessageSquare, Clock, CheckSquare, Globe, RefreshCw, Headphones, Star, Quote, ChevronDown, ChevronUp, HelpCircle, CheckCircle } from 'lucide-react';
import { CountUp } from './CountUp';
import DynamicSuperhero from './DynamicSuperhero';
import TestimonialsNeo from './TestimonialsNeo';


interface HeroSectionProps {
  activeExam: ExamType;
  selectedScoreRange: string;
  setSelectedScoreRange: (range: string) => void;
  onTakeMockTest: () => void;
  onOpenChat: () => void;
  onNavigateToStudyPlan: () => void;
}

export default function HeroSection({
  activeExam,
  selectedScoreRange,
  setSelectedScoreRange,
  onTakeMockTest,
  onOpenChat,
  onNavigateToStudyPlan,
}: HeroSectionProps) {

  // Define custom ranges based on academic targets
  const optionsMap: Record<
    ExamType,
    { id: string; label: string; subLabel: string; iconKey: 'low' | 'mid' | 'high' }[]
  > = {
    IELTS: [
      { id: 'low', label: 'Band 5 or below', subLabel: 'Foundation', iconKey: 'low' },
      { id: 'mid', label: 'Band 5.5 to Band 7', subLabel: 'Intermediate', iconKey: 'mid' },
      { id: 'high', label: 'Band 7.5 ~ Band 9', subLabel: 'Advanced / Expert', iconKey: 'high' },
    ],
    TOEFL: [
      { id: 'low', label: '60 points or below', subLabel: 'Foundation', iconKey: 'low' },
      { id: 'mid', label: '61 to 95 points', subLabel: 'Intermediate', iconKey: 'mid' },
      { id: 'high', label: '96 to 120 points', subLabel: 'Advanced / Expert', iconKey: 'high' },
    ],
    PTE: [
      { id: 'low', label: 'Score 50 or below', subLabel: 'Foundation', iconKey: 'low' },
      { id: 'mid', label: 'Score 51 to 75', subLabel: 'Intermediate', iconKey: 'mid' },
      { id: 'high', label: 'Score 76 to 90', subLabel: 'Advanced / Expert', iconKey: 'high' },
    ],
  };

  const currentOptions = optionsMap[activeExam] || optionsMap.IELTS;

  const renderSuperheroIcon = (iconKey: 'low' | 'mid' | 'high', isSelected: boolean) => {
    return <DynamicSuperhero iconKey={iconKey} isSelected={isSelected} />;
  };

  // Define content variations based on selected exam
  const examLabel = activeExam;

  // Corrections interactive visual mockup states
  const [correctionsTab, setCorrectionsTab] = React.useState<'writing' | 'speaking'>('writing');
  const [correctionsTask, setCorrectionsTask] = React.useState<number>(1);
  const [correctionsRightSubTab, setCorrectionsRightSubTab] = React.useState<'correction' | 'model' | 'lecture' | 'passage'>('correction');
  const [activeExplanation, setActiveExplanation] = React.useState<{ label: string; correct: string; note: string } | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [activeWhyTab, setActiveWhyTab] = React.useState<number>(0);

  // Success Dashboard States
  const [studentName, setStudentName] = React.useState('Tahsin Amin');
  const [targetDashCountry, setTargetDashCountry] = React.useState('Canada');
  const [currentIeltsScore, setCurrentIeltsScore] = React.useState('6.0');
  const [targetIeltsScore, setTargetIeltsScore] = React.useState('7.5');
  const [isDashEditing, setIsDashEditing] = React.useState(false);

  // Dynamic stats calculation for Dashboard
  const getDashStats = () => {
    const scoreVal = parseFloat(currentIeltsScore) || 6.0;
    let eligibleUnis = 12;
    let eligibleScholarships = 8;
    
    if (targetDashCountry === 'Canada') {
      eligibleUnis = scoreVal >= 7.0 ? 11 : scoreVal >= 6.5 ? 8 : 4;
      eligibleScholarships = scoreVal >= 7.0 ? 9 : scoreVal >= 6.5 ? 5 : 2;
    } else if (targetDashCountry === 'Germany') {
      eligibleUnis = scoreVal >= 6.5 ? 14 : 6;
      eligibleScholarships = scoreVal >= 6.5 ? 7 : 3;
    } else if (targetDashCountry === 'United States') {
      eligibleUnis = scoreVal >= 7.0 ? 15 : scoreVal >= 6.0 ? 9 : 3;
      eligibleScholarships = scoreVal >= 7.0 ? 11 : scoreVal >= 6.0 ? 5 : 1;
    } else if (targetDashCountry === 'United Kingdom') {
      eligibleUnis = scoreVal >= 7.0 ? 16 : scoreVal >= 6.0 ? 10 : 4;
      eligibleScholarships = scoreVal >= 7.0 ? 12 : scoreVal >= 6.0 ? 6 : 2;
    } else if (targetDashCountry === 'Australia') {
      eligibleUnis = scoreVal >= 7.0 ? 13 : scoreVal >= 6.0 ? 8 : 3;
      eligibleScholarships = scoreVal >= 7.0 ? 10 : scoreVal >= 6.0 ? 4 : 1;
    }
    
    return { eligibleUnis, eligibleScholarships };
  };
  
  const { eligibleUnis, eligibleScholarships } = getDashStats();
  const isIELTS = activeExam === 'IELTS';
  const isTOEFL = activeExam === 'TOEFL';
  const isPTE = activeExam === 'PTE';

  const defaultOverallScore = isIELTS ? '5.5' : isTOEFL ? '87' : '71';
  const totalOverallScoreScale = isIELTS ? '9.0' : isTOEFL ? '120' : '90';

  const dreamScoreLead = isIELTS ? '7.5 Band Score' : isTOEFL ? '106 points Score' : '79 points Score';

  // Testimonials values
  const testimonial1Text = isIELTS
    ? "I was able to reach my target score for the IELTS exam by exclusively using ITP Universe. I highly recommend this service to anyone preparing for the IELTS test!"
    : isTOEFL
    ? "I was able to reach my target score of 110 for the TOEFL exam by exclusively using ITP Universe's fast AI feedback. The practice runs are so similar!"
    : "I was able to reach my target score of 79 for the PTE Academic exam by exclusively using ITP Universe. It grades speaking and writing within seconds!";

  const testimonial2Text = isIELTS
    ? "Thanks to ITP Universe, I was able to practice for the exam in a real-life setting right at home. The questions provided by ITP Universe were very similar to those on the actual IELTS exam, and the difficulty level was almost identical, which surprised me. Because of this, I could tackle the questions with confidence."
    : isTOEFL
    ? "Thanks to ITP Universe, I was able to practice for the exam in a real-time TOEFL layout right at home. The timer pressure and question structure are identical to real ETS tests."
    : "Thanks to ITP Universe, I was able to practice for PTE Academic in its exact layout at home. Re-order paragraphs and Describe Image sections are modeled perfectly!";

  const testimonial3Title = isIELTS ? "1:1 IELTS Tutor" : isTOEFL ? "1:1 TOEFL Tutor" : "PTE AI Tutor Expert";
  const testimonial3Text = isIELTS
    ? "I was recommended by many people around me, and trying it out exceeded my expectations. The grading is prompt, and the explanations are detailed, so it meticulously covers the areas I overlooked. Thanks to ITP Universe, I was able to achieve a Band 7.5."
    : isTOEFL
    ? "The instant TOEFL essay scores and audio comments are like having a personal coach. No other tool handles the complex integrated writing section this well. I secured 104 with ease!"
    : "The PTE scoring here is extremely prompt—under 3 minutes! Speech fluency analytics helped me find my exact reading/speaking pronunciation weaknesses. I achieved my 79+ target!";

  const testimonial3User = isIELTS
    ? "- ITP Universe User Jeon"
    : isTOEFL
    ? "- ITP Universe User Jeon"
    : "- ITP Universe User Jeon";

  // Card 1: Listening details
  const cardListeningScore = isIELTS ? '7.5' : isTOEFL ? '28' : '80';
  const cardListeningScaleStr = 'score';
  const cardListeningTotalMsg = isIELTS ? 'Total Questions: 40' : isTOEFL ? 'Score out of 30' : 'Score out of 90';
  const cardListeningWeaknesses = isIELTS 
    ? [{ name: 'Rhetorical Purpose', val: '60%' }, { name: 'Summary', val: '25%' }]
    : isTOEFL
    ? [{ name: 'Campus Conversations', val: '75%' }, { name: 'Connecting Content', val: '30%' }]
    : [{ name: 'Write from Dictation', val: '65%' }, { name: 'Highlight Incorrect Words', val: '20%' }];

  // Card 2: Reading details
  const cardReadingScore = isIELTS ? '8' : isTOEFL ? '26' : '76';
  const cardReadingTotalMsg = isIELTS ? 'Total Questions: 40' : isTOEFL ? 'Score out of 30' : 'Score out of 90';
  const cardReadingWeaknesses = isIELTS
    ? [{ name: 'Rhetorical Purpose', p: '80%' }, { name: 'Negative Factual Info', p: '15%' }, { name: 'Summary', p: '5%' }, { name: 'Factual Info', p: '5%' }]
    : isTOEFL
    ? [{ name: 'Inference questions', p: '70%' }, { name: 'Insert Text', p: '20%' }, { name: 'Prose Summary', p: '10%' }, { name: 'Vocabulary', p: '5%' }]
    : [{ name: 'Reading: Fill in Blanks', p: '85%' }, { name: 'Re-order Paragraphs', p: '35%' }, { name: 'Multiple Choice', p: '10%' }, { name: 'Collocations', p: '5%' }];

  // Card 3: Speaking details
  const cardSpeakingScore = isIELTS ? '6' : isTOEFL ? '24' : '68';
  const cardSpeakingTotalMsg = isIELTS ? 'Total Questions: 11' : isTOEFL ? 'Task Types: 4' : 'Item Modules: 5';
  const cardSpeakingItems = isIELTS
    ? [
        { score: '6.5', max: '/ 9', name: 'Introduction and Short Interview' },
        { score: '6', max: '/ 9', name: 'Cue Card' },
        { score: '5.5', max: '/ 9', name: 'Discussion' }
      ]
    : isTOEFL
    ? [
        { score: '26', max: '/ 30', name: 'Independent Task (Choice)' },
        { score: '24', max: '/ 30', name: 'Integrated (Campus Life)' },
        { score: '22', max: '/ 30', name: 'Integrated (Academic Lecture)' }
      ]
    : [
        { score: '72', max: '/ 90', name: 'Read Aloud practice' },
        { score: '65', max: '/ 90', name: 'Describe Image segment' },
        { score: '60', max: '/ 90', name: 'Retell Lecture recording' }
      ];

  // Card 4: Writing details
  const cardWritingScore = isIELTS ? '6.5' : isTOEFL ? '22' : '72';
  const cardWritingTotalMsg = isIELTS ? 'Total Questions: 2' : isTOEFL ? 'Task Types: 2' : 'Task Types: 2';
  const cardWritingItems = isIELTS
    ? [
        { score: '3.5', max: '/ 5', name: 'Independent Essay' },
        { score: '4.0', max: '/ 5', name: 'Integrated Report' }
      ]
    : isTOEFL
    ? [
        { score: '4.0', max: '/ 5', name: 'Writing for academic discussion' },
        { score: '3.5', max: '/ 5', name: 'Integrated Writing Task' }
      ]
    : [
        { score: '75', max: '/ 90', name: 'Summarize Written Text' },
        { score: '70', max: '/ 90', name: 'Write Essay prompt' }
      ];

  // AI Grader Dashboard (Tomato/Pumpkin/Sunflower Mockup) details
  const dashboardBadgeList = isIELTS
    ? [
        { score: '8.0' },
        { score: '6.5' },
        { score: '4.0' },
        { score: '3.5' }
      ]
    : isTOEFL
    ? [
        { score: '26' },
        { score: '23' },
        { score: '20' },
        { score: '18' }
      ]
    : [
        { score: '80' },
        { score: '68' },
        { score: '70' },
        { score: '64' }
      ];

  // Banner name / emoji
  const bannerName = isIELTS ? 'Captain Shield' : isTOEFL ? 'Hero Cadet' : 'Spidey Kid';
  const bannerEmoji = isIELTS ? '🛡️' : isTOEFL ? '⚡' : '🕷️';
  const bannerBgColor = isIELTS ? 'bg-[#ffe4e6]/50 text-rose-900' : isTOEFL ? 'bg-indigo-50 text-indigo-900' : 'bg-pink-50 text-pink-905';

  // 4-Column Diagnostic Grid layout
  const l_score = isIELTS ? '8.0' : isTOEFL ? '26' : '80';
  const l_title = isIELTS ? 'Listening' : isTOEFL ? 'Listening' : 'Listening';
  const l_total = isIELTS ? 'Total Questions: 40' : isTOEFL ? 'Score: 26 / 30' : 'Score: 80 / 90';
  const l_weaknesses = isIELTS
    ? [{ name: 'Rhetorical Purpose', p: '80%' }, { name: 'Negative Factual Info', p: '20%' }]
    : isTOEFL
    ? [{ name: 'Conversation Detail', p: '70%' }, { name: 'Connecting Content', p: '25%' }]
    : [{ name: 'Write from Dictation', p: '75%' }, { name: 'Highlight Incorrect Words', p: '15%' }];

  const r_score = isIELTS ? '6.5' : isTOEFL ? '23' : '68';
  const r_title = isIELTS ? 'Reading' : isTOEFL ? 'Reading' : 'Reading';
  const r_total = isIELTS ? 'Total Questions: 40' : isTOEFL ? 'Score: 23 / 30' : 'Score: 68 / 90';
  const r_weaknesses = isIELTS
    ? [{ name: 'Rhetorical Purpose', p: '50%' }, { name: 'Negative Factual Info', p: '25%' }]
    : isTOEFL
    ? [{ name: 'Inference questions', p: '60%' }, { name: 'Prose Summary', p: '30%' }]
    : [{ name: 'Reading: Fill in Blanks', p: '65%' }, { name: 'Re-order Paragraphs', p: '40%' }];

  const w_score = isIELTS ? '4.0' : isTOEFL ? '20' : '70';
  const w_total = isIELTS ? 'Total Questions: 2' : isTOEFL ? 'Score: 20 / 30' : 'Score: 70 / 90';
  const w_title = isIELTS ? 'Writing' : isTOEFL ? 'Writing' : 'Writing';
  const w_items = isIELTS
    ? [{ label: 'Integrated Task', val: '4.5 / 5.0' }, { label: 'Independent Task', val: '3.5 / 5.0' }]
    : isTOEFL
    ? [{ label: 'Writing for Academic Discussion', val: '3.5 / 5.0' }, { label: 'Integrated Writing Task', val: '3.5 / 5.0' }]
    : [{ label: 'Summarize Written Text', val: '75 / 90' }, { label: 'Write Essay prompt', val: '70 / 90' }];

  const s_score = isIELTS ? '3.5' : isTOEFL ? '18' : '64';
  const s_total = isIELTS ? 'Total Questions: 3' : isTOEFL ? 'Score: 18 / 30' : 'Score: 64 / 90';
  const s_title = isIELTS ? 'Speaking' : isTOEFL ? 'Speaking' : 'Speaking';
  const s_items = isIELTS
    ? [{ label: 'Introduction & Short Interview', val: '3.5 / 9.0' }, { label: 'Cue Card / Long Turn', val: '3.5 / 9.0' }]
    : isTOEFL
    ? [{ label: 'Independent Choice Task', val: '3.0 / 4.0' }, { label: 'Integrated Campus Life', val: '2.5 / 4.0' }]
    : [{ label: 'Read Aloud speaking', val: '68 / 90' }, { label: 'Describe Image fluency', val: '60 / 90' }];

  // Detailed check list titles
  const practiceQuestionTitles = isIELTS
    ? ['Hieronymus Bosch', 'Dinosaur Colouration', 'Joseph Conrad']
    : isTOEFL
    ? ['The Mayan Collapse', 'Glacial Landforms', 'Marine Symbiosis']
    : ['Urban Heat Islands', 'Artificial Intelligence in Arts', 'Macroeconomics in Dev countries'];

  const practiceQuestionSectionTag = isIELTS ? 'Reading' : isTOEFL ? 'Reading' : 'PTE Reading';

  const detailPrepTitle1 = isIELTS ? 'IELTS READING' : isTOEFL ? 'TOEFL READING' : 'PTE READING';
  const detailPrepDesc1 = isIELTS ? 'Identifying Information & Claims' : isTOEFL ? 'Inference and Prose Summaries' : 'Reading Fill in the Blanks';

  // Interactive corrections helper functions
  const getCurrentPrompt = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType) => {
    if (exam === 'IELTS') {
      if (tab === 'writing') {
        return taskNum === 1
          ? "The maps below show changes that took place at Brighton College between 1970 and 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
          : "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. Discuss both views and give your opinion.";
      } else {
        return taskNum === 1
          ? "[Part 1] Do you work or study? What do you like most about your profession or courses?"
          : "[Part 2] Describe a memorable journey that you took. Explain where you went, why, and how you felt.";
      }
    } else if (exam === 'TOEFL') {
      if (tab === 'writing') {
        return taskNum === 1
          ? "Academic Discussion: Governments should allocate resources to environmental protection rather than space exploration. Express your perspective."
          : "Vertical farming has the potential to solve sustainable agriculture challenges, but has high energy demands. Express your summary of the critique.";
      } else {
        return taskNum === 1
          ? "Choice Task: Do you prefer studying alone in quiet environments or in lively group sessions? Explain your reasons."
          : "Announcement: The campus library plans to restrict access over exams; summarize the arguments and explain the student response.";
      }
    } else {
      if (tab === 'writing') {
        return taskNum === 1
          ? "Write Essay: Some countries report high rates of youth unemployment. Is encouraging STEM subjects the primary remedy?"
          : "Summarize Text: Prepare a structured, unified response summarizing globalization trends on natural resource depletion.";
      } else {
        return taskNum === 1
          ? "Read Aloud: Fluently pronounce complex technical terms with appropriate emphasis and sound connections."
          : "Describe Image: Summarize the primary developments in the visual graph plotting regional GDP against education benchmarks.";
      }
    }
  };

  const getCurrentWordCount = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType, type: 'my' | 'correction') => {
    if (exam === 'IELTS') {
      if (tab === 'writing') {
        return taskNum === 1 ? (type === 'my' ? 218 : 182) : (type === 'my' ? 260 : 230);
      } else {
        return type === 'my' ? 64 : 58;
      }
    } else if (exam === 'TOEFL') {
      return taskNum === 1 ? (type === 'my' ? 125 : 138) : (type === 'my' ? 190 : 172);
    } else {
      return taskNum === 1 ? (type === 'my' ? 210 : 215) : (type === 'my' ? 45 : 38);
    }
  };

  const getRightScore = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType) => {
    if (exam === 'IELTS') {
      return tab === 'writing' ? (taskNum === 1 ? "5.0 / 9.0" : "5.5 / 9.0") : (taskNum === 1 ? "4.5 / 9.0" : "5.5 / 9.0");
    } else if (exam === 'TOEFL') {
      return tab === 'writing' ? (taskNum === 1 ? "20 / 30" : "22 / 30") : (taskNum === 1 ? "18 / 30" : "21 / 30");
    } else {
      return tab === 'writing' ? (taskNum === 1 ? "68 / 90" : "74 / 90") : (taskNum === 1 ? "60 / 90" : "72 / 90");
    }
  };

  const getCorrectionsCount = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType) => {
    return exam === 'IELTS' ? 6 : 5;
  };

  const renderMyAnswerTextHTML = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType, setExp: (v: any) => void) => {
    if (exam === 'IELTS') {
      if (tab === 'writing') {
        if (taskNum === 1) {
          return (
            <p className="leading-relaxed">
              The map illustrates the changes that{' '}
              <span onClick={() => setExp({ label: 'occured', correct: 'occurred', note: 'Spelling mistake. Double "r" is required behind the stressed syllable.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">occured</span>{' '}
              <span onClick={() => setExp({ label: 'to Brighton college', correct: 'to Brighton College', note: 'Capitalization. Institution names are proper nouns.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">to Brighton college</span>{' '}
              from 1970 to 2010{' '}
              <span onClick={() => setExp({ label: 'where it became a university', correct: ', transitioning into a university', note: 'Style. Participle clauses provide better flow than a relative clause in reports.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">where it became a university</span>.
              <br /><br />
              Overall,{' '}
              <span onClick={() => setExp({ label: 'some departmnets were added', correct: 'several modifications occurred, and departments were built', note: 'Spelling error. Additionally, "some" is repetitive.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">some departmnets were added</span>{' '}
              and others were removed.{' '}
              <span onClick={() => setExp({ label: 'The was five sections', correct: 'There were five sections', note: 'Grammar agreement error. entities are plural past: "there were".' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">The was five sections</span>{' '}
              in 1970 and this number increased. It{' '}
              <span onClick={() => setExp({ label: 'seems', correct: 'appears', note: 'Conjecture style. "Seems" is conversational.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">seems</span>{' '}
              that they expanded the science laboratories next to the Granger block.
            </p>
          );
        } else {
          return (
            <p className="leading-relaxed">
              To begin with, studying is{' '}
              <span onClick={() => setExp({ label: 'a very big role', correct: 'a fundamental aspect', note: 'Weak vocabulary. "Very big role" is colloquial.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">a very big role</span>{' '}
              for young people to obtain jobs later. I believe that universities must teach job skills{' '}
              <span onClick={() => setExp({ label: 'because is easy', correct: 'because it eases', note: 'Syntax. Pronoun subject is missing.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">because is easy</span>{' '}
              to get employed.{' '}
              <span onClick={() => setExp({ label: 'I reckon', correct: 'Others argue', note: 'Informative pronoun error. "I reckon" is an overly subjective, casual expression.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">I reckon</span>{' '}
              that learning pure theory is okay, but job skills should take absolute priority.
            </p>
          );
        }
      } else {
        // Speaking
        return (
          <p className="leading-relaxed">
            Honestly speaking, I{' '}
            <span onClick={() => setExp({ label: 'am work', correct: 'work', note: 'Grammar conjugation error. Combine only with active progressive participle.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">am work</span>{' '}
            as a junior developer.{' '}
            <span onClick={() => setExp({ label: 'I did choose', correct: 'I chose', note: 'Auxiliary usage error. Do not use emphatic "did" on simple affirmative statements.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">I did choose</span>{' '}
            this path because{' '}
            <span onClick={() => setExp({ label: 'is super fast growing', correct: 'it is a rapidly growing field', note: 'Informal tone. Remove colloquial intensifier: "super fast".' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">is super fast growing</span>.
          </p>
        );
      }
    } else if (exam === 'TOEFL') {
      if (tab === 'writing') {
        return (
          <p className="leading-relaxed">
            I strongly suggest that preserving nature is{' '}
            <span onClick={() => setExp({ label: 'the most best way', correct: 'the ultimate solution', note: 'Double superlative error. "most best" is ungrammatical.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">the most best way</span>{' '}
            to allocate our finite cash.{' '}
            <span onClick={() => setExp({ label: 'Governments is sleeping', correct: 'Governments should take decisive steps', note: 'Subject agreement error. It is also highly colloquial.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">Governments is sleeping</span>{' '}
            on climate issues, and space exploration feels like{' '}
            <span onClick={() => setExp({ label: 'a waste of cash', correct: 'excessive and inefficient', note: 'Vocabulary tone. Cash is informal for writing prompts.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">a waste of cash</span>.
          </p>
        );
      } else {
        return (
          <p className="leading-relaxed">
            I prefer studying alone{' '}
            <span onClick={() => setExp({ label: 'because has no noise', correct: 'due to the absence of distractions', note: 'Grammar agreement. Subject pronoun is missing.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">because has no noise</span>.{' '}
            <span onClick={() => setExp({ label: 'Group study make me tired', correct: 'Study groups tend to diminish efficiency', note: 'Agreement error. Plural study must match zero-suffix.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">Group study make me tired</span>{' '}
            and people chat too much.
          </p>
        );
      }
    } else {
      // PTE
      return (
        <p className="leading-relaxed">
          Unemployment is{' '}
          <span onClick={() => setExp({ label: 'a major threating', correct: 'a looming threat', note: 'Spelling and syntax. Adjective format mismatch.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">a major threating</span>{' '}
          for future developments.{' '}
          <span onClick={() => setExp({ label: 'encouraging science courses help', correct: 'favoring STEM courses helps', note: 'Conjugation issue. Gerund actions are treated as singular.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">encouraging science courses help</span>{' '}
          to solve youth career tasks. If we don't,{' '}
          <span onClick={() => setExp({ label: 'there is no vacancies', correct: 'there are no vacancies available', note: 'Lacks plural construction agreement.' })} className="bg-pink-100/80 text-red-700 font-extrabold px-1.5 py-0.5 rounded cursor-pointer hover:bg-pink-200 transition-colors select-none border-b border-pink-200">there is no vacancies</span>.
        </p>
      );
    }
  };

  const renderCorrectedTextHTML = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType) => {
    if (exam === 'IELTS') {
      if (tab === 'writing') {
        if (taskNum === 1) {
          return (
            <p className="leading-relaxed">
              The maps <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">demonstrate</span> the{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">alterations that occurred</span> at{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">Brighton College</span> between 1970 and 2010,{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">transitioning the school into a university</span>.
              <br /><br />
              Overall,{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">several modifications took place, and departments were built</span>.{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">There were five sections</span>{' '}
              originally. It{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">appears that they expanded operations</span>.
            </p>
          );
        } else {
          return (
            <p className="leading-relaxed">
              Primarily, academic exploration serves{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">a fundamental role</span>{' '}
              in equipping individuals. I believe universities must provide vital skill sets{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">as it drastically improves</span>{' '}
              employability.{' '}
              <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">Other sources argue</span>{' '}
              that pure academic pursuits are highly valuable, though practical training remains essential.
            </p>
          );
        }
      } else {
        return (
          <p className="leading-relaxed">
            Truthfully, I{' '}
            <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">currently work</span>{' '}
            as a software developer.{' '}
            <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">I spent time choosing</span>{' '}
            this career pathway primarily because{' '}
            <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">it represents a rapidly industrializing field</span>.
          </p>
        );
      }
    } else if (exam === 'TOEFL') {
      return (
        <p className="leading-relaxed">
          I strongly argue that preserving environmental integrity is{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">the paramount priority</span>{' '}
          to focus our public spending on.{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">Indeed, governments must act decisively</span>{' '}
          on environmental issues rather than routing limited reserves to outer-space research, which can be{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">considered excessive and ineffective</span>.
        </p>
      );
    } else {
      return (
        <p className="leading-relaxed">
          Unemployment acts as{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">a looming threat</span>{' '}
          to socio-economic developments. Ultimately,{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">promoting specialized STEM coursework assists</span>{' '}
          in mitigating youth career challenges. Without such steps,{' '}
          <span className="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded select-none">there will be a scarcity of vacancies</span>.
        </p>
      );
    }
  };

  const getModelAnswerText = (tab: 'writing' | 'speaking', taskNum: number, exam: ExamType) => {
    if (exam === 'IELTS') {
      if (tab === 'writing') {
        return taskNum === 1
          ? "The maps describe the layout alterations of Brighton College from 1970 to 2010. It is immediately clear that the campus underwent massive structural changes over the forty-year timeline.\n\nIn 1970, five key structures comprised the campus layout: three large classrooms arranged to the east, Delapore Library to the north-west, and a playing field spreading across the northern side. By 2010, the field shriveled in size to accommodate a separate sports center. The classroom capacity also expanded extensively, with additional courses on design introduced in the east courtyard, as the historical Hall of Medicine was permanently replaced by the Granger School of Business."
          : "The primary purpose of academic institutions remains a controversial topic. While some individuals argue that higher education should prioritize pure theoretical inquiry, I firmly subscribe to the perspective that job-oriented vocational skills are essential for graduate placement and stability.\n\nOn the one hand, learning academic concepts trains the intellect, allowing students to think critically and approach problems systematically. However, in the contemporary job market, employers increasingly look for real operational experience. Therefore, universities should strive to strike an optimal balance between theoretical teachings and hands-on skill workshops.";
      } else {
        return "I currently operate as an apprentice developer at a rising fintech company. My job primarily revolves around debugging user interfaces and deploying small dashboard features. What I appreciate most is the collaborative atmosphere and the opportunity to tackle real-world puzzles every single day.";
      }
    } else {
      return "Governments must tackle immediate climatic crises before pursuing celestial discoveries. Environmental degradation poses a profound threat to public health and biodiversity. It is counterproductive to fund space exploration initiatives when our primary ecosystem demands vital restoration and resources.";
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-20 flex flex-col justify-center items-center" id="hero-section">
      {/* Decorative Top Wreath & Partner Info */}
      <div className="flex flex-col items-center justify-center mb-8 max-w-lg text-center" id="partnership-laurel">
        <div className="flex items-center space-x-3 mb-2">
          {/* Left Laurel */}
          <svg className="w-8 h-8 text-yellow-500 fill-current opacity-80" viewBox="0 0 24 24">
            <path d="M6 14.5c0-2.8 2.2-5 5-5 .3 0 .5 0 .8.1-.5-2.1-2.4-3.6-4.6-3.6-2.6 0-4.7 2.1-4.7 4.7 0 2.2 1.5 4.1 3.5 4.6V14.5zm8 0c2 0 3.5-1.5 3.5-3.5 0-2.6-2.1-4.7-4.7-4.7-2.2 0-4.1 1.5-4.6 3.6.3-.1.5-.1.8-.1 2.8 0 5 2.2 5 5v-.3z" />
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-2.2C5.5 17.5 4 15 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3-1.5 5.5-4 6.9v2.2c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10z" />
          </svg>

          <div className="flex items-center space-x-2">
            {activeExam === 'IELTS' ? (
              <div className="flex items-center space-x-2">
                <span className="font-extrabold bg-linear-to-r from-red-500 to-amber-600 bg-clip-text text-transparent text-lg tracking-tight">idp</span>
                <span className="font-black text-slate-800 text-lg">IELTS</span>
              </div>
            ) : activeExam === 'TOEFL' ? (
              <div className="flex items-center space-x-2 text-teal-600 font-extrabold text-lg">
                <span>ETS TOEFL Academy</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-orange-600 font-extrabold text-lg">
                <span>Pearson PTE Global</span>
              </div>
            )}

            <span className="text-gray-300 font-normal">×</span>

            <span className="font-sans font-extrabold text-lg tracking-tight text-slate-800">
              ITP Universe
            </span>
          </div>

          {/* Right Laurel */}
          <svg className="w-8 h-8 text-yellow-500 fill-current opacity-80 transform scale-x-[-1]" viewBox="0 0 24 24">
            <path d="M6 14.5c0-2.8 2.2-5 5-5 .3 0 .5 0 .8.1-.5-2.1-2.4-3.6-4.6-3.6-2.6 0-4.7 2.1-4.7 4.7 0 2.2 1.5 4.1 3.5 4.6V14.5zm8 0c2 0 3.5-1.5 3.5-3.5 0-2.6-2.1-4.7-4.7-4.7-2.2 0-4.1 1.5-4.6 3.6.3-.1.5-.1.8-.1 2.8 0 5 2.2 5 5v-.3z" />
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-2.2C5.5 17.5 4 15 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3-1.5 5.5-4 6.9v2.2c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10z" />
          </svg>
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Official Partner</p>
      </div>

      {/* ================= SUCCESS COCKPIT DASHBOARD (KILLER USP) ================= */}
      <div className="w-full max-w-4xl px-4 mb-12" id="success-cockpit-dashboard">
        <div className="bg-[#f8fafc] border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-5 mb-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/15 font-black text-lg shrink-0">
                🚀
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-905 flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-800">Welcome Back,</span>
                  {isDashEditing ? (
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      onBlur={() => setIsDashEditing(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsDashEditing(false)}
                      className="border-b border-blue-500 bg-transparent text-slate-900 outline-none font-black px-1 py-0 w-32 focus:ring-0 text-sm sm:text-base"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setIsDashEditing(true)}
                      className="text-blue-600 cursor-pointer underline decoration-dotted hover:text-blue-700 transition"
                      title="Click to edit name"
                    >
                      {studentName} ✏️
                    </span>
                  )}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  Student Study Dashboard • Active Prep Tracker
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white border border-slate-150 px-3.5 py-2 rounded-2xl self-start sm:self-center">
              <Clock className="w-4 h-4 text-emerald-500 animate-pulse shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Admission Deadline</p>
                <p className="text-xs font-black text-slate-800 mt-0.5 leading-none">84 Days Left (Fall Cycle)</p>
              </div>
            </div>
          </div>

          {/* Core profile parameters cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            
            {/* Country target */}
            <div className="bg-white border border-slate-200/65 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Target Country</p>
              <select
                value={targetDashCountry}
                onChange={(e) => setTargetDashCountry(e.target.value)}
                className="w-full text-xs font-black text-slate-800 bg-transparent outline-none cursor-pointer border-none p-0 focus:ring-0 mt-0.5"
              >
                {['Canada', 'United States', 'United Kingdom', 'Australia', 'Germany'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Current score */}
            <div className="bg-white border border-slate-200/65 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Current IELTS</p>
              <select
                value={currentIeltsScore}
                onChange={(e) => setCurrentIeltsScore(e.target.value)}
                className="w-full text-xs font-black text-slate-800 bg-transparent outline-none cursor-pointer border-none p-0 focus:ring-0 mt-0.5"
              >
                {['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'].map(score => (
                  <option key={score} value={score}>{score} Band</option>
                ))}
              </select>
            </div>

            {/* Target score */}
            <div className="bg-white border border-slate-200/65 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Target IELTS</p>
              <select
                value={targetIeltsScore}
                onChange={(e) => setTargetIeltsScore(e.target.value)}
                className="w-full text-xs font-black text-blue-600 bg-transparent outline-none cursor-pointer border-none p-0 focus:ring-0 mt-0.5"
              >
                {['6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(score => (
                  <option key={score} value={score}>{score} Band</option>
                ))}
              </select>
            </div>

            {/* Est Prep time */}
            <div className="bg-white border border-slate-200/65 p-4 rounded-2xl flex flex-col justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Preparation Time</p>
              <p className="text-xs font-black text-slate-800 leading-none pb-0.5 mt-2">
                {Math.max(4, Math.round((parseFloat(targetIeltsScore) - parseFloat(currentIeltsScore)) * 8) || 4)} Weeks
              </p>
            </div>
          </div>

          {/* Recommendation insights metrics bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* Match output indicators */}
            <div className="md:col-span-8 bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between gap-2 flex-col sm:flex-row">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Your Target Match Index</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    Dynamic institutional matches based on your active profile selections.
                  </p>
                </div>
                {/* Score improvement advice callout */}
                {parseFloat(currentIeltsScore) < parseFloat(targetIeltsScore) && (
                  <span className="text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 animate-pulse self-start sm:self-center">
                    Score gap detected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{eligibleUnis} Universities</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Matching Admissions</span>
                  </div>
                  <Globe className="w-5 h-5 text-blue-500 opacity-60 shrink-0 ml-2" />
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{eligibleScholarships} Scholarships</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Eligible Funding</span>
                  </div>
                  <Award className="w-5 h-5 text-emerald-500 opacity-60 shrink-0 ml-2" />
                </div>
              </div>

              {/* Notice text */}
              <p className="text-[10px] font-semibold text-slate-400 italic">
                ⭐ Increase score to {targetIeltsScore} to unlock {Math.round(eligibleUnis * 1.5)} schools and full tuition waivers!
              </p>
            </div>

            {/* Next task card */}
            <div className="md:col-span-4 bg-slate-900 text-white p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-black uppercase text-emerald-400 tracking-widest block mb-1">
                  Upcoming Task
                </span>
                <h5 className="text-xs font-black tracking-tight leading-tight">
                  Complete Speaking Challenge #3
                </h5>
                <p className="text-[10px] font-semibold text-slate-400 leading-snug mt-1.5">
                  Get instant automated band diagnostic scoring in under 60 seconds!
                </p>
              </div>

              <button
                onClick={onNavigateToStudyPlan}
                className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 font-extrabold text-[#022c22] py-2 px-3 rounded-lg text-3xs font-black uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer select-none active:scale-95 transition-all text-center border-none"
              >
                <span>Launch Challenge</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#022c22] stroke-[3]" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Headings */}
      <div className="text-center px-4 max-w-4xl mb-12">
        <h1 className="text-3xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          Targeting your score in 2 months?
        </h1>
        <h2 className="text-2xl md:text-[38px] font-extrabold text-slate-800 tracking-tight mb-8">
          Just Follow <span className="text-blue-600">ITP Universe!</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 font-semibold tracking-wide">
          What's your current score range?
        </p>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 max-w-4xl w-full mb-12" id="score-range-selector">
        {currentOptions.map((opt) => {
          const isSelected = selectedScoreRange === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedScoreRange(opt.id)}
              className={`flex flex-col items-center justify-center p-8 bg-white rounded-3xl transition-all duration-300 group cursor-pointer shadow-xs ${
                isSelected
                  ? 'ring-4 ring-blue-500/20 bg-blue-50/10 shadow-lg scale-102'
                  : 'hover:bg-slate-50/40 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Plant / Flower / Tree Container */}
              <div
                className={`w-28 h-28 rounded-2xl flex items-center justify-center mb-6 text-5xl transition-transform duration-300 ${
                  isSelected ? 'bg-blue-50 scale-110' : 'bg-gray-50/70 group-hover:scale-105'
                }`}
              >
                {renderSuperheroIcon(opt.iconKey, isSelected)}
              </div>
              <span className={`text-base font-bold transition-colors ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                {opt.label}
              </span>
              <span className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest block">
                {opt.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* ==================== EXAM OVERVIEW (WHAT IS IELTS?) SECTION ==================== */}
      <div className="w-full max-w-5xl px-4 mb-20 relative z-10" id="exam-overview-info-section">
        {/* Modern Bento Container */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-slate-100/80 shadow-xs hover:shadow-sm transition-shadow duration-300">
          
          {/* Top Label/Title Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1 text-left">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-wider font-mono bg-blue-50 px-2.5 py-1 rounded-md">
                EXAM OVERVIEW
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight font-sans">
                {activeExam === 'IELTS' ? (
                  <>What is <span className="text-[#1e51da]">IELTS</span>?</>
                ) : activeExam === 'TOEFL' ? (
                  <>What is <span className="text-teal-600">TOEFL</span>?</>
                ) : (
                  <>What is <span className="text-orange-600">PTE</span>?</>
                )}
              </h2>
            </div>
            
            <div className="bg-white/90 border border-slate-100 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-3xs">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700">
                Total Duration: {activeExam === 'IELTS' ? '2 hours 40 mins' : activeExam === 'TOEFL' ? 'approx. 2 hours' : 'approx. 2 hours'}
              </span>
            </div>
          </div>

          {/* Detailed Paragraph with Modern Accenting */}
          <div className="text-left mb-10 pb-8 border-b border-dashed border-slate-200/60">
            {activeExam === 'IELTS' ? (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                <span className="text-slate-900 font-extrabold font-sans">IELTS (International English Language Testing System)</span> is one of the globally recognized English proficiency tests taken by millions worldwide for education and immigration purposes. IELTS offers two modules: <strong className="text-[#1e51da] font-black">IELTS Academic</strong> (for undergraduate or postgraduate study) and <strong className="text-slate-800 font-extrabold">IELTS General Training</strong> (for work or immigration). Additionally, <strong className="text-slate-800 font-extrabold">IELTS for UKVI</strong> (United Kingdom Visa & Immigration) is specifically for proving English proficiency for UK visa and immigration purposes. The IELTS Academic module consists of four sections and takes approximately <strong className="text-[#1e51da] font-black">2 hours and 40 minutes</strong> to complete.
              </p>
            ) : activeExam === 'TOEFL' ? (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                <span className="text-slate-900 font-extrabold font-sans">TOEFL iBT (Test of English as a Foreign Language)</span> is an internationally trusted academic English evaluation accepted by more than 12,000 universities in over 160 countries. TOEFL measures your integrated communication skills at the university level. It is completely computer-delivered with synchronized task combinations mimicking physical lecture rooms. The test consists of four sections and takes approximately <strong className="text-teal-600 font-black">2 hours</strong> to complete.
              </p>
            ) : (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                <span className="text-slate-900 font-extrabold font-sans">PTE Academic (Pearson Test of English)</span> is a faster, highly convenient computer-based test of English proficiency trusted by universities, colleges, and governments worldwide. PTE Academic utilizes state-of-the-art unbiased automated AI scoring mechanics to evaluate all skills safely. The entire assessment is held under a unified session concluding in approximately <strong className="text-orange-600 font-black">2 hours</strong>.
              </p>
            )}
          </div>

          {/* Section structures grid */}
          <div className="text-left mb-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
              TEST STRUCTURE & MODULE BREAKDOWN
            </h3>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${activeExam === 'PTE' ? 'md:grid-cols-3' : 'lg:grid-cols-4'} gap-5`}>
              
              {/* READING CARD */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                    <span className="text-base font-black text-slate-900 font-sans">Reading</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">No. of Questions</span>
                      <span className="text-slate-800 font-black bg-slate-50 px-2 py-0.5 rounded">
                        {activeExam === 'IELTS' ? '40' : activeExam === 'TOEFL' ? '20' : '13 – 18'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Expected time</span>
                      <span className="text-indigo-600 font-black bg-indigo-50/50 px-2.5 py-0.5 rounded border border-indigo-100">
                        {activeExam === 'IELTS' ? '60 mins' : activeExam === 'TOEFL' ? '35 mins' : '29 – 30 mins'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {activeExam === 'IELTS' ? '3 academic passages' : activeExam === 'TOEFL' ? '2 long passages' : 'fill-in blanks & MCQs'}
                </div>
              </div>

              {/* LISTENING CARD */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs hover:border-sky-200 hover:shadow-md hover:shadow-sky-50/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                    <span className="text-base font-black text-slate-900 font-sans">Listening</span>
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-sky-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">No. of Questions</span>
                      <span className="text-slate-800 font-black bg-slate-50 px-2 py-0.5 rounded">
                        {activeExam === 'IELTS' ? '40' : activeExam === 'TOEFL' ? '28' : '12 – 20'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Expected time</span>
                      <span className="text-sky-600 font-black bg-sky-50/50 px-2.5 py-0.5 rounded border border-sky-100">
                        {activeExam === 'IELTS' ? '30 mins' : activeExam === 'TOEFL' ? '36 mins' : '30 – 43 mins'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {activeExam === 'IELTS' ? '4 audio monologues / conv' : activeExam === 'TOEFL' ? 'lectures and conversations' : 'summarize audio & dictation'}
                </div>
              </div>

              {/* SPEAKING CARD */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs hover:border-rose-200 hover:shadow-md hover:shadow-rose-50/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                    <span className="text-base font-black text-slate-900 font-sans">
                      {activeExam === 'PTE' ? 'Speaking & Writing' : 'Speaking'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-rose-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">No. of Questions</span>
                      <span className="text-slate-800 font-black bg-slate-50 px-2 py-0.5 rounded">
                        {activeExam === 'IELTS' ? '3 parts' : activeExam === 'TOEFL' ? '4 tasks' : '28 – 36 questions'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">Expected time</span>
                      <span className="text-rose-600 font-black bg-rose-50/50 px-2.5 py-0.5 rounded border border-rose-100">
                        {activeExam === 'IELTS' ? '11 – 14 mins' : activeExam === 'TOEFL' ? '16 mins' : '54 – 67 mins'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {activeExam === 'IELTS' ? 'face-to-face evaluation' : activeExam === 'TOEFL' ? 'audio record simulation' : 'read aloud & image summary'}
                </div>
              </div>

              {/* WRITING CARD (Conditional - NOT for PTE as it integrates Speaking & Writing) */}
              {activeExam !== 'PTE' && (
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs hover:border-amber-200 hover:shadow-md hover:shadow-amber-50/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                      <span className="text-base font-black text-slate-900 font-sans">Writing</span>
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <PenTool className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold">No. of Questions</span>
                        <span className="text-slate-800 font-black bg-slate-50 px-2 py-0.5 rounded">
                          {activeExam === 'IELTS' ? '2 tasks' : '2 tasks'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold">Expected time</span>
                        <span className="text-amber-600 font-black bg-amber-50/50 px-2.5 py-0.5 rounded border border-amber-100">
                          {activeExam === 'IELTS' ? '60 mins' : '29 mins'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {activeExam === 'IELTS' ? 'task 1 report & task 2 essay' : 'integrated & academic discussions'}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* WHY ITP UNIVERSE SECTION */}
      <section className="w-full bg-[#fafbfd]/40 py-24 flex flex-col items-center border-t border-b border-slate-50 relative overflow-hidden">
        {/* Soft decorative background glow to mimic the screenshot look */}
        <div className="absolute left-[10%] top-[45%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-100/40 to-blue-50/20 blur-3xl pointer-events-none select-none z-0"></div>
        <div className="absolute right-[10%] top-[15%] w-[180px] h-[180px] rounded-full bg-amber-50/40 blur-3xl pointer-events-none select-none z-0"></div>

        {/* Heading container matching screenshot exactly */}
        <div className="text-center px-4 max-w-4xl mb-16 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight mb-4">
            <span className="text-[#141d26]">Why </span>
            <span className="text-[#FFAA00]">ITP Universe?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-[19px] text-[#555a64] font-medium leading-relaxed max-w-2xl mx-auto tracking-normal">
            Find out what makes the web's best {activeExam} preparation courses so popular.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-8 max-w-6xl w-full px-6 relative z-10">
          {/* Left side visual composition panel with fade-in interaction */}
          <div className="relative w-full lg:w-[48%] flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
            {activeWhyTab === 0 && (
              <div className="w-full flex items-center justify-center animate-fade-in duration-300">
                <div className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center select-none scale-95 sm:scale-100 transition-all duration-500">
                  {/* Circular pastel backdrop */}
                  <div className="absolute w-[280px] h-[280px] rounded-full bg-slate-50 border border-dashed border-slate-200/60 flex items-center justify-center">
                    <div className="w-[180px] h-[180px] rounded-full border border-dashed border-slate-200/40"></div>
                  </div>

                  {/* Left Sound Wave / Audio Circle */}
                  <div className="absolute left-6 top-[40%] -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-50/80 hover:scale-110 transition-transform duration-300 z-10">
                    <div className="relative w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M3 10a9 9 0 0 1 12 0" />
                        <path d="M6 13a6 6 0 0 1 6 0" />
                        <circle cx="12" cy="18" r="3" fill="currentColor" stroke="none" />
                      </svg>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-white text-[9px] font-black flex items-center justify-center">⚡</span>
                    </div>
                  </div>

                  {/* Left-bottom Chinese/Language Doc circular badge */}
                  <div className="absolute left-4 bottom-[10%] w-18 h-18 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 hover:scale-110 transition-transform duration-300 z-10">
                    <div className="w-14 h-14 rounded-full bg-cyan-50 flex flex-col items-center justify-center relative overflow-hidden">
                      <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
                      </svg>
                      <span className="text-[10px] font-black text-cyan-500 mt-0.5">EN</span>
                    </div>
                  </div>

                  {/* Central Card (The Stats & "Start Test" card) */}
                  <div className="relative bg-white rounded-[24px] p-6 w-[230px] sm:w-[250px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100/80 z-20 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="space-y-4">
                      {/* Row 1: Flashcards */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 text-sm font-bold">🗂️</span>
                          <span className="text-sm font-bold text-slate-750">Flashcards</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-500">15</span>
                      </div>
                      {/* Row 2: Dialogue */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 text-sm font-bold">💬</span>
                          <span className="text-sm font-bold text-slate-755">Dialogue</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-500">5</span>
                      </div>
                      {/* Row 3: Audio */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 text-sm font-bold">🎧</span>
                          <span className="text-sm font-bold text-[#2abcb5]">Audio</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-500">8:12</span>
                      </div>
                      {/* Row 4: Quiz */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 text-sm font-bold">📝</span>
                          <span className="text-sm font-bold text-slate-750">Quiz</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-500">10</span>
                      </div>
                    </div>

                    {/* Center CTA Button inside the card - color matches logo exactly */}
                    <div className="mt-5">
                      <button className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#FFAA00] to-[#FFC533] text-white font-extrabold text-[13px] tracking-wide shadow-md shadow-amber-500/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer">
                        Start Test
                      </button>
                    </div>
                  </div>

                  {/* Top Floating Badge: "6+ prep tracks" with avatar */}
                  <div className="absolute top-[8%] left-[8%] bg-white rounded-full py-1.5 pl-1.5 pr-4 flex items-center gap-2.5 shadow-xl border border-slate-50/80 z-30 hover:scale-105 transition-transform duration-300">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-tr from-pink-100 to-amber-100">
                        <circle cx="50" cy="45" r="20" fill="#fde047" />
                        <path d="M50 35 C42 35 40 45 40 45 C40 45 45 43 50 43 C55 43 60 45 60 45 C60 45 58 35 50 35 Z" fill="#78350f" />
                        <path d="M30 40 C28 50 35 55 50 55 C65 55 72 50 70 40 C68 30 62 25 50 25 C38 25 32 30 30 40 Z" fill="#451a03" />
                        <circle cx="50" cy="43" r="14" fill="#fed7aa" />
                        <circle cx="43" cy="45" r="2" fill="#f43f5e" opacity="0.6" />
                        <circle cx="57" cy="45" r="2" fill="#f43f5e" opacity="0.6" />
                        <path d="M46 48 Q50 52 54 48" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <circle cx="45" cy="40" r="1.5" fill="#451a03" />
                        <circle cx="55" cy="40" r="1.5" fill="#451a03" />
                      </svg>
                    </div>
                    <span className="text-xs font-black text-[#141d26] tracking-tight whitespace-nowrap">6+ prep tracks</span>
                  </div>

                  {/* Right Floating Badge "a" */}
                  <div className="absolute right-[10%] top-[25%] w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-50 hover:scale-110 transition-transform duration-300 z-10">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-500 font-serif font-black text-xl select-none leading-none transform translate-y-[-1px]">a</span>
                    </div>
                  </div>

                  {/* Bottom Floating Badge "1,000+ lessons" */}
                  <div className="absolute bottom-[6%] right-[6%] bg-white rounded-[16px] py-2.5 px-4 flex items-center gap-2 shadow-xl border border-slate-50/80 z-20 hover:scale-105 transition-transform duration-300">
                    <div className="w-7 h-7 rounded-lg bg-purple-150 flex items-center justify-center text-purple-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-black text-[#141d26] tracking-tight">1,000+ lessons</span>
                  </div>
                </div>
              </div>
            )}

            {activeWhyTab === 1 && (
              <div className="w-full flex items-center justify-center animate-fade-in duration-300">
                <div className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center select-none scale-95 sm:scale-100 transition-all duration-500">
                  {/* Floating decorative elements */}
                  <div className="absolute right-4 top-4 w-[160px] h-[160px] rounded-full bg-cyan-150 opacity-50 blur-xl z-0"></div>
                  <div className="absolute left-[15%] bottom-[15%] w-[80px] h-[80px] rounded-full bg-pink-100 opacity-40 blur-lg z-0"></div>
                  <div className="absolute left-[4%] top-[30%] w-4.5 h-4.5 bg-rose-350 opacity-80 rounded-full z-10"></div>
                  <div className="absolute left-[32%] bottom-[6%] w-5 h-5 bg-cyan-300 opacity-85 rounded-full z-10"></div>

                  {/* Main Central Card (Certificate of completion) - matches the second screenshot layout */}
                  <div className="relative bg-white rounded-[24px] p-6 w-[290px] sm:w-[325px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 z-20 hover:scale-[1.02] transition-transform duration-300 transform translate-x-[-15px] translate-y-[-10px]">
                    <div className="absolute right-6 top-8 text-[#2abcb5] text-[13px] font-black font-serif italic tracking-wide">
                      95/100
                    </div>

                    <div className="text-center mt-2 mb-6">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="h-[1px] w-6 bg-slate-350"></div>
                        <span className="text-xs sm:text-[13px] font-serif italic font-extrabold text-slate-500 tracking-wider">
                          Certificate of completion
                        </span>
                        <div className="h-[1px] w-6 bg-slate-355"></div>
                      </div>
                    </div>

                    <div className="space-y-3.5 mb-6">
                      {/* Speaking */}
                      <div>
                        <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-500 mb-0.5">
                          <span>Speaking</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#20cbd2]" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      {/* Listening */}
                      <div>
                        <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-500 mb-0.5">
                          <span>Listening</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#ffbe21]" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      {/* Reading */}
                      <div>
                        <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-500 mb-0.5">
                          <span>Reading</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#37b6ff]" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      {/* Writing */}
                      <div>
                        <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-500 mb-0.5">
                          <span>Writing</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#49b9a2]" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                      <div className="flex items-center gap-2.5 relative">
                        <div className="relative flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-[#ffbe21] flex items-center justify-center text-white font-extrabold z-10 shadow-sm text-sm">
                            ⭐
                          </div>
                          <svg className="absolute top-5 w-7 h-5 text-red-500 z-0 fill-current" viewBox="0 0 20 15">
                            <polygon points="2,0 8,15 10,12 12,15 18,0" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 mt-0.5 uppercase tracking-wider ml-1">Gold Medal</span>
                      </div>

                      <span className="text-sm font-serif italic font-bold text-[#2abcb5] opacity-90 select-none tracking-wide">
                        ITP Universe
                      </span>
                    </div>
                  </div>

                  {/* Overlaying "Your improvement" Card (Bottom Right) */}
                  <div className="absolute bottom-[3%] right-[2%] bg-white rounded-[20px] p-4 w-[160px] sm:w-[170px] shadow-[0_12px_36px_rgba(0,0,0,0.07)] border border-slate-100/60 z-30 transform hover:scale-105 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-3 text-center">
                      Your Improvement
                    </span>
                    <div className="relative w-24 h-16 mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 50">
                        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#f1f5f9" strokeWidth="11" strokeLinecap="round" />
                        <path d="M10,50 A40,40 0 0,1 77,16" fill="none" stroke="#ffbe21" strokeWidth="11" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="38" />
                      </svg>
                      <div className="absolute bottom-1 font-black text-[18px] text-slate-850 tracking-tight">
                        70%
                      </div>
                    </div>
                    <span className="text-[9px] leading-tight text-slate-400 font-extrabold text-center block max-w-[130px] mx-auto">
                      Wow! You have done a tremendous job
                    </span>
                  </div>

                  {/* Overlaying Trend mini graph card (Bottom Left) */}
                  <div className="absolute bottom-[8%] left-[2%] bg-white rounded-[16px] p-3 w-[100px] sm:w-[110px] shadow-[0_12px_28px_rgba(0,0,0,0.05)] border border-slate-50 z-30 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-10 w-full">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <defs>
                          <linearGradient id="chartGradientTab2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2abcb5" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#2abcb5" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,35 Q20,32 40,25 T80,10 L100,5" fill="none" stroke="#2abcb5" strokeWidth="3" strokeLinecap="round" />
                        <path d="M0,35 Q20,32 40,25 T80,10 L100,5 L100,40 L0,40 Z" fill="url(#chartGradientTab2)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeWhyTab === 2 && (
              <div className="w-full flex items-center justify-center animate-fade-in duration-300">
                <div className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center select-none scale-95 sm:scale-100 transition-all duration-500">
                  {/* Backdrops */}
                  <div className="absolute w-[240px] h-[240px] rounded-full bg-amber-50 opacity-70 blur-xl z-0"></div>
                  <div className="absolute left-[8%] top-[20%] w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-50 hover:scale-115 transition-transform duration-300 z-10">
                    <span className="text-xl">📈</span>
                  </div>

                  {/* Main Score Progression Card */}
                  <div className="relative bg-white rounded-[24px] p-6 w-[270px] sm:w-[290px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 z-20">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Score Progress</span>
                      <span className="px-2 py-1 bg-emerald-55 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wide">Guaranteed +2.0 Band</span>
                    </div>

                    {/* Progression Column Graph */}
                    <div className="flex justify-between items-end h-[110px] px-2 mb-4 border-b border-slate-100 pb-3">
                      {/* Week 1 */}
                      <div className="flex flex-col items-center gap-1.5 w-12">
                        <span className="text-[11px] font-extrabold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">5.5</span>
                        <div className="w-6 bg-slate-200/70 rounded-t-lg transition-all duration-500" style={{ height: '40px' }}></div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1">Week 1</span>
                      </div>

                      {/* Week 4 */}
                      <div className="flex flex-col items-center gap-1.5 w-12">
                        <span className="text-[11px] font-extrabold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">6.5</span>
                        <div className="w-6 bg-amber-400/80 rounded-t-lg transition-all duration-500" style={{ height: '65px' }}></div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1">Week 4</span>
                      </div>

                      {/* Week 8 */}
                      <div className="flex flex-col items-center gap-1.5 w-12">
                        <span className="text-[11px] font-extrabold text-[#2abcb5] bg-cyan-50 px-1.5 py-0.5 rounded-md">7.5+</span>
                        <div className="w-6 bg-gradient-to-t from-[#2abcb5] to-cyan-400 rounded-t-lg shadow-md transition-all duration-500 relative" style={{ height: '90px' }}>
                          <span className="absolute -top-3 -right-3 w-5 h-5 bg-[#FFAA00] rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-md animate-bounce">👑</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-800 mt-1">Week 8</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center font-extrabold leading-relaxed px-1">
                      Average results: IELTS candidates jump from initial 5.5 to target 7.5 within 8 weeks using our dynamic grading system!
                    </p>
                  </div>

                  {/* Overlaying floating statistics (Top Right) */}
                  <div className="absolute right-[2%] top-[10%] bg-white rounded-full py-2 px-3.5 flex items-center gap-2 shadow-xl border border-slate-50 z-30 hover:scale-105 transition-transform duration-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-black text-slate-800">100% Guaranteed</span>
                  </div>

                  {/* Floating mini report (Bottom Left) */}
                  <div className="absolute bottom-[10%] left-[2%] bg-white rounded-[16px] p-2.5 w-[110px] sm:w-[120px] shadow-lg border border-slate-50 z-30 transform hover:rotate-2 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-emerald-500 font-bold text-base">✓</span>
                      <span className="text-[10px] font-extrabold text-slate-850">AI Verified</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full mb-1">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-[8px] font-semibold text-slate-400">Oral Fluency 8.5</span>
                  </div>
                </div>
              </div>
            )}

            {activeWhyTab === 3 && (
              <div className="w-full flex items-center justify-center animate-fade-in duration-300">
                <div className="relative w-full max-w-[440px] aspect-[4/3] flex items-center justify-center select-none scale-95 sm:scale-100 transition-all duration-500">
                  {/* Circular backdrop */}
                  <div className="absolute w-[220px] h-[220px] rounded-full bg-purple-50 opacity-60 blur-xl z-0"></div>

                  {/* Left side book badge */}
                  <div className="absolute left-[6%] bottom-[20%] w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-50 hover:scale-110 transition-transform duration-300 z-30">
                    <span className="text-2xl">📚</span>
                  </div>

                  {/* Main Flashcard Card Stack */}
                  <div className="relative w-[210px] sm:w-[230px] h-[160px] z-20 animate-fade-in">
                    {/* Card 3 (Backmost - Teal Theme) */}
                    <div className="absolute inset-0 bg-[#2abcb5] rounded-[24px] shadow-sm transform rotate-[-6deg] translate-x-[-15px] translate-y-[-10px] opacity-20 z-0"></div>

                    {/* Card 2 (Middle - Purple Theme) */}
                    <div className="absolute inset-x-0 inset-y-0 bg-purple-500 rounded-[24px] shadow-md transform rotate-[-3deg] translate-x-[-8px] translate-y-[-5px] opacity-40 z-10"></div>

                    {/* Card 1 (Frontmost - Golden Academic Vocabulary Deck) */}
                    <div className="absolute inset-x-0 inset-y-0 bg-white rounded-[24px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 z-20 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#FFAA00] bg-amber-50 px-2 py-0.5 rounded-full">Vocabulary Pack</span>
                          <span className="text-[12px] text-amber-500 font-bold">★</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800 tracking-tight leading-none mb-1">
                          Ubiquitous
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 italic mb-2 block">
                          /yoo-bik-wi-tuhs/
                        </span>
                        <p className="text-[10px] text-slate-500 leading-normal font-medium mt-1">
                          Present, appearing, or found everywhere.
                          <br/>
                          <em className="text-[9px] text-slate-400">e.g. "Smartphones are ubiquitous nowadays."</em>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Floating badge: Database stats */}
                  <div className="absolute right-[5%] top-[12%] bg-white rounded-[20px] p-3 w-[150px] shadow-xl border border-slate-50 z-30 transform hover:scale-105 transition-transform duration-300">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">Words Bank</span>
                        <span className="text-xs font-black text-slate-800">15K+</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">Interactive Qs</span>
                        <span className="text-xs font-black text-[#FFAA00]">10K+</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Floating Badge: Lifetime updates badge */}
                  <div className="absolute bottom-[6%] right-[8%] bg-white rounded-full py-1.5 px-3 flex items-center gap-1.5 shadow-lg border border-slate-50 z-30 hover:scale-105 transition-transform duration-300">
                    <span className="text-xs">🔄</span>
                    <span className="text-[10px] font-black text-slate-700">Lifetime Updates Included</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side interactive selection list */}
          <div className="w-full lg:w-[48%] space-y-7 md:space-y-8 flex flex-col justify-center">
            {[
              { 
                title: "A clearly structured curriculum", 
                desc: "Follow our guided study schedule and you'll always know what to do next. No more feeling lost!" 
              },
              { 
                title: "Everything you need", 
                desc: `1,000+ lessons in 6+ comprehensive courses means you can go from true newbie to speaking and writing ${activeExam} expert all in one place.`
              },
              { 
                title: "See real results", 
                desc: `With as little as 30 minutes a day, we guarantee you'll see real progress on ITP Universe. It's that good!`
              },
              { 
                title: "A lifetime of learning", 
                desc: "With many years worth of study materials - including 15K+ vocab flashcards, 10K+ quiz questions, and much more - you can easily review the English skills you learn so you never lose them again!" 
              }
            ].map((item, idx) => {
              const isActive = activeWhyTab === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setActiveWhyTab(idx)}
                  className="flex gap-4 items-start cursor-pointer group select-none transition-all duration-300"
                >
                  {/* Left alignment wrapper with perfectly aligned yellow tick */}
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    {isActive ? (
                      <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] text-[#FFAA00] animate-bounce-slow" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" fill="#fffbe7" stroke="#FFAA00" strokeWidth="2.5" />
                        <path d="m9 12 2 2 4-4" stroke="#FFAA00" strokeWidth="3" />
                      </svg>
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-250 group-hover:border-slate-400 transition-colors" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl md:text-[22px] font-bold tracking-tight mb-2.5 transition-colors duration-300 ${isActive ? 'text-[#FFAA00]' : 'text-[#444d56]'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed font-normal transition-colors duration-300 ${isActive ? 'text-[#333a41] font-semibold' : 'text-slate-500/90'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive CTA for 8-Week Study Plan */}
      <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full mx-4 text-center mb-16 shadow-xs relative overflow-hidden" id="hero-study-plan-cta">
        <div className="absolute -right-6 -bottom-6 text-7xl opacity-10 select-none">🎯</div>
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest block mb-2 font-mono">
          Interactive Daily Tracker
        </span>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-2">
          Ready to kickstart your study?
        </h3>
        <p className="text-xs text-slate-500 font-semibold mb-6 max-w-md leading-relaxed">
          Unlock your complete day-by-day 8-week curriculum for {activeExam}. Access lessons, core speaking/writing interactive templates, vocabulary and practice activities customized to your target range.
        </p>
        <button
          onClick={onNavigateToStudyPlan}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md shadow-blue-400/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 tracking-wide uppercase"
        >
          <span>🎯 Go to your 8-Week Study Plan</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Testimonials Section - Proven by 1,000,000 Global Users */}
      <div className="w-full bg-[#FAF9F6] py-12" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <TestimonialsNeo />
        </div>
      </div>


      {/* Target & Verification Section - Take the first step to achieve your dream score */}
      <div className="w-full bg-gradient-to-b from-[#ebf3fe] via-[#f7faff] to-white pt-16 pb-24 flex flex-col items-center relative overflow-hidden border-t border-gray-100" id="target-dream-score-section">
        {/* Subtle decorative fine-line background waves */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <svg className="w-full h-full text-blue-500/30" viewBox="0 0 1440 600" fill="none">
            <path d="M-100 200 C300 100, 600 400, 1000 150 C1200 50, 1400 300, 1600 200" stroke="currentColor" strokeWidth="1.5" />
            <path d="M-100 250 C300 150, 600 450, 1000 200 C1200 100, 1400 350, 1600 250" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M-100 150 C300 50, 600 350, 1000 100 C1200 0, 1400 250, 1600 150" stroke="currentColor" strokeWidth="1" />
            <path d="M-50 450 C350 350, 650 550, 1050 350 C1250 250, 1450 450, 1650 400" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Heading context */}
        <div className="text-center px-4 max-w-4xl mb-12 relative z-10">
          <p className="text-[#1e51da] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 text-center">
            {dreamScoreLead} in Just Two Months
          </p>
          <h2 className="text-3xl md:text-[36px] font-semibold text-slate-900 tracking-tight leading-tight text-center">
            Take the first step
          </h2>
          <p className="text-3xl md:text-[36px] font-semibold text-slate-900 tracking-tight leading-tight mt-1 text-center">
            to achieve your {activeExam} dream score
          </p>
        </div>

        {/* Main Cards overlapping container */}
        <div className="max-w-6xl w-full px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 mt-8 mb-4">
          
          {/* Card 1: Listening (Back Left) */}
          <div className="w-full max-w-[280px] bg-white rounded-2xl p-4 shadow-xs border border-gray-100/80 transition-all duration-300 lg:absolute lg:left-[5%] lg:top-12 lg:-skew-y-1 lg:-rotate-1 lg:z-10 lg:hover:z-50 lg:hover:scale-105 lg:hover:rotate-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Volume2 className="w-4 h-4 text-slate-600 font-bold" />
                <span className="font-extrabold text-sm">Listening</span>
              </div>
            </div>
            {/* Score info */}
            <div className="flex items-baseline space-x-2 border-b border-gray-50 pb-3 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{cardListeningScaleStr}</span>
              <span className="text-2xl font-black text-slate-900 leading-none">{cardListeningScore}</span>
              <span className="text-[10px] text-gray-400 font-bold">{cardListeningTotalMsg}</span>
              <button className="ml-auto text-[10px] font-black text-slate-900 hover:text-blue-600 flex items-center pr-1 transition-colors">
                REVIEW <span className="ml-0.5 text-[8px]">▶</span>
              </button>
            </div>
            {/* Questions to Study list */}
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-gray-800 font-bold uppercase tracking-wider">Questions to Study More</p>
              </div>
              
              <div className="space-y-2">
                {cardListeningWeaknesses.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>{item.name}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400" style={{ width: item.val }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Reading (Front Left - Overlaps Listening) */}
          <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-xs border border-gray-100/90 transition-all duration-300 lg:absolute lg:left-[22%] lg:top-0 lg:z-30 lg:hover:z-50 lg:hover:scale-105">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span className="font-extrabold text-sm">Reading</span>
              </div>
            </div>
            {/* Score info */}
            <div className="flex items-baseline space-x-2 border-b border-gray-50 pb-3 mb-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">score</span>
              <span className="text-3xl font-black text-slate-900 leading-none">{cardReadingScore}</span>
              <span className="text-[10px] text-gray-400 font-bold">{cardReadingTotalMsg}</span>
              <button className="ml-auto text-[10px] font-black text-slate-900 hover:text-blue-600 flex items-center pr-1 transition-colors">
                REVIEW <span className="ml-0.5 text-[8px]">▶</span>
              </button>
            </div>
            {/* Detail copy */}
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-slate-800">Questions to Study More</p>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-0.5">
                  Check to better understand what types of questions you often got wrong and why
                </p>
              </div>

              {/* Progress bars grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
                {cardReadingWeaknesses.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-bold text-slate-500 truncate mb-1">{item.name}</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800" style={{ width: item.p }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Speaking (Front Right - Overlaps Writing) */}
          <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-xs border border-gray-100/90 transition-all duration-300 lg:absolute lg:right-[22%] lg:top-4 lg:z-40 lg:hover:z-50 lg:hover:scale-105">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Mic className="w-4 h-4 text-slate-600" />
                <span className="font-extrabold text-sm">Speaking</span>
              </div>
            </div>
            {/* Score info */}
            <div className="flex items-baseline space-x-2 border-b border-gray-50 pb-3 mb-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">score</span>
              <span className="text-3xl font-black text-slate-900 leading-none">{cardSpeakingScore}</span>
              <span className="text-[10px] text-gray-400 font-bold">{cardSpeakingTotalMsg}</span>
              <button className="ml-auto text-[10px] font-black text-slate-900 hover:text-blue-600 flex items-center pr-1 transition-colors">
                REVIEW <span className="ml-0.5 text-[8px]">▶</span>
              </button>
            </div>
            {/* Detail copy */}
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-slate-800">Raw Score</p>
                <p className="text-[9px] text-gray-400 font-medium leading-normal mt-0.5">
                  You can check each question's raw score. Your total raw score is not sum of each question's score.
                </p>
              </div>

              {/* Rows */}
              <div className="space-y-2 pt-1">
                {cardSpeakingItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50/70 border border-gray-100/50 hover:bg-gray-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-xs font-black text-slate-800 mr-1">{item.score}</span>
                      <span className="text-[9px] text-gray-400 font-bold mr-2">{item.max}</span>
                      <span className="text-[10px] text-slate-600 font-bold truncate">{item.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Writing (Back Right) */}
          <div className="w-full max-w-[280px] bg-white rounded-2xl p-4 shadow-xs border border-gray-100/80 transition-all duration-300 lg:absolute lg:right-[5%] lg:top-12 lg:rotate-1 lg:skew-y-1 lg:z-10 lg:hover:z-50 lg:hover:scale-105 lg:hover:rotate-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <PenTool className="w-4 h-4 text-slate-600 font-bold" />
                <span className="font-extrabold text-sm">Writing</span>
              </div>
            </div>
            {/* Score info */}
            <div className="flex items-baseline space-x-2 border-b border-gray-50 pb-3 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">score</span>
              <span className="text-2xl font-black text-slate-900 leading-none">{cardWritingScore}</span>
              <span className="text-[10px] text-gray-400 font-bold">{cardWritingTotalMsg}</span>
              <button className="ml-auto text-[10px] font-black text-slate-900 hover:text-blue-600 flex items-center pr-1 transition-colors">
                REVIEW <span className="ml-0.5 text-[8px]">▶</span>
              </button>
            </div>
            {/* Detail copy */}
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-gray-800 font-bold uppercase tracking-wider">Raw Score</p>
              </div>

              {cardWritingItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-gray-100/50 hover:bg-gray-50 transition-all cursor-pointer">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-xs font-black text-slate-800 mr-1">{item.score}</span>
                    <span className="text-[9px] text-gray-400 font-bold mr-2">{item.max}</span>
                    <span className="text-[10px] text-slate-600 font-bold truncate">{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Reserved Height Block for isometric/absolute stacking container on desktop */}
          <div className="hidden lg:block lg:h-[350px] w-full"></div>
        </div>
      </div>

      {/* Global No 1. English Test Prep & AI Grader Detailed Assessment Section */}
      <div className="w-full bg-slate-50/50 pt-16 pb-24 flex flex-col items-center border-t border-gray-100" id="ai-grader-assessment-section">
        <p className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 text-center">
          How we create great results
        </p>
        <h2 className="text-3xl md:text-[38px] font-bold text-slate-950 tracking-tight text-center mb-10">
          Global No 1. English Test Prep
        </h2>

        {/* Speech-bubble AI Grader badge */}
        <div className="flex flex-col items-center mb-5 relative z-10">
          <div className="relative bg-[#fffbeb] text-[#d97706] text-xs font-black px-5 py-2.5 rounded-full shadow-xs flex items-center space-x-1 border border-amber-200/60 animate-pulse">
            <span className="text-sm">⚡</span>
            <span className="tracking-wide uppercase">AI Grader</span>
            {/* Speech bubble pointy arrow tail */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7.5px] border-t-[#fffbeb]"></div>
          </div>
        </div>

        {/* Sub-headings */}
        <div className="text-center px-4 max-w-3xl mb-14 relative z-10">
          <h3 className="text-xl md:text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Accurate Skill Assessment in Under 1 Minute
          </h3>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Trained with data from more than <span className="text-slate-800 font-bold">1 million responses</span>, <br className="hidden sm:inline" />
            ITP Universe's AI Scoring Engine is pioneering the world's only content and context evaluation.
          </p>
        </div>

        {/* Simulated Mock Test Report Dashboard Mockup */}
        <div className="max-w-4xl w-full px-4 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Top Navigation Bar mimicking an actual browser/app environment */}
            <div className="bg-slate-50/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <button className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-400 shadow-3xs">
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                
                {/* Score Badges */}
                <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto py-0.5 no-scrollbar">
                  {dashboardBadgeList.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-[11px] font-bold text-slate-700">
                      {idx === 0 ? <Volume2 className="w-3.5 h-3.5 text-gray-400" /> :
                       idx === 1 ? <BookOpen className="w-3.5 h-3.5 text-gray-400" /> :
                       idx === 2 ? <PenTool className="w-3.5 h-3.5 text-gray-400" /> :
                       <Mic className="w-3.5 h-3.5 text-gray-400" />}
                      <span>{item.score}</span>
                    </div>
                  ))}
                  <div className="h-4 w-px bg-gray-200"></div>
                  <div className="text-[12px] font-black text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md">
                    {defaultOverallScore} <span className="text-[9px] text-gray-400 font-normal">/ {totalOverallScoreScale}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button className="bg-white hover:bg-gray-50 text-[10.5px] font-black text-slate-700 px-3 py-1.5 rounded-full transition-colors select-none text-right shadow-xs">
                  Test Report
                </button>
              </div>
            </div>

            {/* Inner Pink/Red Banner */}
            <div className={`mx-4 md:mx-6 mt-4 md:mt-6 rounded-2xl p-4 flex items-center justify-between shadow-xs ${bannerBgColor}`}>
              <span className="font-extrabold tracking-tight text-base sm:text-lg">{bannerName}</span>
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm select-none">{bannerEmoji}</span>
            </div>

            {/* 4-Column Diagnostic Grid layout */}
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Listening diagnostic */}
              <div className="bg-slate-50/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <Volume2 className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">{l_title}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase">score</span>
                    <span className="text-[19px] font-black text-slate-900 leading-none">{l_score}</span>
                    <span className="text-[9px] text-gray-400 font-medium">{l_total}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150/40 pt-3 space-y-3">
                  <div>
                    <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider block">Questions to Study More</span>
                    <span className="text-[9px] text-gray-400 leading-tight block mt-0.5">Check to better understand what types of questions you often got wrong and why</span>
                  </div>
                  <div className="space-y-2">
                    {l_weaknesses.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[9px] font-bold text-slate-500 mb-1">
                          <span>{item.name}</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-500" style={{ width: item.p }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 2: Reading diagnostic */}
              <div className="bg-slate-50/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">{r_title}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase">score</span>
                    <span className="text-[19px] font-black text-slate-900 leading-none">{r_score}</span>
                    <span className="text-[9px] text-gray-400 font-medium">{r_total}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150/40 pt-3 space-y-3">
                  <div>
                    <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider block">Questions to Study More</span>
                    <span className="text-[9px] text-gray-400 leading-tight block mt-0.5">Check to better understand what types of questions you often got wrong and why</span>
                  </div>
                  <div className="space-y-2">
                    {r_weaknesses.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[9px] font-bold text-slate-500 mb-1">
                          <span>{item.name}</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-400" style={{ width: item.p }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 3: Writing diagnostic */}
              <div className="bg-slate-50/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <PenTool className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">{w_title}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase">score</span>
                    <span className="text-[19px] font-black text-slate-900 leading-none">{w_score}</span>
                    <span className="text-[9px] text-gray-400 font-medium">{w_total}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150/40 pt-3 space-y-2">
                  <div>
                    <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider block">Raw Score</span>
                    <span className="text-[9px] text-gray-400 leading-tight block mt-0.5">You can check each question's raw score. Your total raw score is not sum of each question's score.</span>
                  </div>
                  <div className="space-y-1.5">
                    {w_items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px] font-semibold text-slate-600 p-1.5 bg-white rounded-lg shadow-3xs">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-800">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 4: Speaking diagnostic */}
              <div className="bg-slate-50/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <Mic className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">{s_title}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[9px] text-gray-400 font-bold uppercase">score</span>
                    <span className="text-[19px] font-black text-slate-900 leading-none">{s_score}</span>
                    <span className="text-[9px] text-gray-400 font-medium">{s_total}</span>
                  </div>
                </div>

                <div className="border-t border-gray-150/40 pt-3 space-y-2">
                  <div>
                    <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider block">Raw Score</span>
                    <span className="text-[9px] text-gray-400 leading-tight block mt-0.5">You can check each question's raw score. Your total raw score is not sum of each question's score.</span>
                  </div>
                  <div className="space-y-1.5">
                    {s_items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px] font-semibold text-slate-600 p-1.5 bg-white rounded-lg shadow-3xs">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-800">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== AI-POWERED CORRECTIONS INTERACTIVE SECTION ==================== */}
      <div className="w-full bg-[#f8fafc]/40 pt-16 pb-24 flex flex-col items-center border-t border-gray-100 overflow-hidden" id="ai-powered-corrections-section">
        {/* Top Badge */}
        <div className="flex flex-col items-center mb-5 relative z-10">
          <div className="relative bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-black px-4.5 py-2 rounded-full shadow-3xs flex items-center space-x-1 border border-blue-100/50">
            <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            <span className="tracking-wide uppercase font-sans">AI Correction</span>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center px-4 max-w-3xl mb-12 relative z-10">
          <h2 className="text-3xl md:text-[38px] font-black text-slate-900 tracking-tight leading-none mb-4 font-sans text-center">
            AI-Powered Essay & Speech Corrections
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-semibold leading-relaxed max-w-2xl mx-auto text-center">
            Are you still paying a lot for WR/SP corrections? <br className="hidden sm:inline" />
            ITP Universe AI analyzes submitted responses and provides exemplary answers to achieve high scores.
          </p>
        </div>

        {/* High-Fidelity Corrections Interactive Device/Card Mockup */}
        <div className="max-w-4xl w-full px-4 relative z-10">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            
            {/* Control Bar mimicking test platform */}
            <div className="bg-slate-50/80 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-100 gap-3">
              <div className="flex items-center space-x-4">
                <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-3xs hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                
                {/* 4 Sections Quick-Selector tabs */}
                <div className="flex items-center space-x-2 md:space-x-4 select-none">
                  {/* Listening */}
                  <div className="flex items-center space-x-1 text-xs font-bold px-2 py-1 text-slate-400">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isIELTS ? '8.0' : isTOEFL ? '26' : '80'}</span>
                  </div>

                  {/* Reading */}
                  <div className="flex items-center space-x-1 text-xs font-bold px-2 py-1 text-slate-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isIELTS ? '6.5' : isTOEFL ? '23' : '68'}</span>
                  </div>

                  {/* Writing Tab (Active writing mockup visual indicator) */}
                  <button 
                    onClick={() => {
                      setCorrectionsTab('writing');
                      setActiveExplanation(null);
                    }}
                    className={`flex items-center space-x-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all ${
                      correctionsTab === 'writing'
                        ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-3xs'
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{isIELTS ? '4.0' : isTOEFL ? '20' : '70'}</span>
                  </button>

                  {/* Speaking Tab */}
                  <button 
                    onClick={() => {
                      setCorrectionsTab('speaking');
                      setActiveExplanation(null);
                    }}
                    className={`flex items-center space-x-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all ${
                      correctionsTab === 'speaking'
                        ? 'bg-orange-50 border-orange-200 text-orange-700 shadow-3xs'
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isIELTS ? '3.5' : isTOEFL ? '18' : '64'}</span>
                  </button>
                </div>
              </div>

              {/* Overall Summary Badge / Test Report Action */}
              <div className="flex items-center space-x-3">
                <div className="text-[11px] font-black text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-md">
                  {isIELTS ? '5.5' : isTOEFL ? '87' : '71'} <span className="text-[10px] text-gray-400 font-normal">/ {isIELTS ? '9.0' : isTOEFL ? '120' : '90'}</span>
                </div>
                <button className="bg-white hover:bg-gray-50 text-[10.5px] font-black text-slate-700 px-3 py-1.5 rounded-full transition-colors select-none text-right shadow-xs">
                  Test Report
                </button>
              </div>
            </div>

            {/* Sub Task selection buttons row */}
            <div className="bg-slate-50/50 border-b border-gray-100 px-6 py-3 flex items-center space-x-3 select-none">
              <button 
                onClick={() => {
                  setCorrectionsTask(1);
                  setActiveExplanation(null);
                }} 
                className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-800 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center space-x-2">
                {/* Task 1 tab */}
                <button
                  onClick={() => {
                    setCorrectionsTask(1);
                    setActiveExplanation(null);
                  }}
                  className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all border ${
                    correctionsTask === 1
                      ? 'bg-white border-slate-200 text-slate-800 shadow-3xs'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {correctionsTab === 'writing' ? (isIELTS ? '1 (5.0/9.0)' : isTOEFL ? '1 (20/30)' : '1 (68/90)') : (isIELTS ? '1 (4.5/9.0)' : '1 (55/90)')}
                </button>

                {/* Task 2 tab */}
                <button
                  onClick={() => {
                    setCorrectionsTask(2);
                    setActiveExplanation(null);
                  }}
                  className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all border ${
                    correctionsTask === 2
                      ? 'bg-white border-slate-200 text-slate-800 shadow-3xs'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {correctionsTab === 'writing' ? (isIELTS ? '2 (3.0/9.0)' : isTOEFL ? '2 (18/30)' : '2 (60/90)') : (isIELTS ? '2 (5.5/9.0)' : '2 (70/90)')}
                </button>
              </div>

              <button 
                onClick={() => {
                  setCorrectionsTask(2);
                  setActiveExplanation(null);
                }} 
                className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-800 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Split Screen Writing/Speaking Correction Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column: My Answer */}
              <div className="p-6 border-r border-gray-100 flex flex-col justify-between min-h-[460px] bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        My Answer
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">
                        Word count: {getCurrentWordCount(correctionsTab, correctionsTask, activeExam, 'my')}
                      </span>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="bg-slate-50/60 rounded-xl p-3.5 mb-5 text-left border border-slate-100/40">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">
                        Q{correctionsTask}
                      </span>
                      <span className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest select-none">TASK PROMPT</span>
                    </div>
                    <p className="text-xs font-extrabold text-[#111827] leading-relaxed">
                      {getCurrentPrompt(correctionsTab, correctionsTask, activeExam)}
                    </p>
                  </div>

                  {/* Interactive Text Field */}
                  <div className="text-left font-sans text-[12px] text-slate-600 leading-relaxed font-semibold">
                    {renderMyAnswerTextHTML(correctionsTab, correctionsTask, activeExam, setActiveExplanation)}
                  </div>
                </div>

                {/* Prompt guiding clicking triggers */}
                <div className="mt-6 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-slate-400 select-none">
                  <span>💡 Click pink highlights to review feedback.</span>
                </div>
              </div>

              {/* Right Column: Interactive AI Feedback */}
              <div className="p-6 bg-slate-50/20 flex flex-col justify-between min-h-[460px]">
                <div>
                  {/* Stats & sub tabs header */}
                  <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase leading-none">Band Score</p>
                        <p className="text-[17px] font-black text-slate-800 mt-1">
                          {getRightScore(correctionsTab, correctionsTask, activeExam)}
                        </p>
                      </div>
                      
                      <div className="w-px h-6 bg-gray-200"></div>

                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase leading-none">Correction</p>
                        <p className="text-[13px] font-extrabold text-slate-700 mt-1">
                          {getCorrectionsCount(correctionsTab, correctionsTask, activeExam)} Times
                        </p>
                      </div>
                    </div>

                    {/* Right feedback sub-tabs */}
                    <div className="flex items-center space-x-1 sm:space-x-1.5 text-[11px] font-bold">
                      <button
                        onClick={() => setCorrectionsRightSubTab('correction')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs font-semibold ${
                          correctionsRightSubTab === 'correction'
                            ? 'bg-emerald-500 text-white font-black hover:bg-emerald-600 shadow-xs'
                            : 'bg-white hover:bg-gray-50 text-slate-600 border border-gray-100'
                        }`}
                      >
                        Correction
                      </button>
                      <button
                        onClick={() => setCorrectionsRightSubTab('model')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs font-semibold ${
                          correctionsRightSubTab === 'model'
                            ? 'bg-emerald-500 text-white font-black hover:bg-emerald-600 shadow-xs'
                            : 'bg-white hover:bg-gray-50 text-slate-600 border border-gray-100'
                        }`}
                      >
                        Model Answer
                      </button>
                    </div>
                  </div>

                  {/* Right side sub-tab content display */}
                  {correctionsRightSubTab === 'correction' ? (
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
                          Correction
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">
                          Word count: {getCurrentWordCount(correctionsTab, correctionsTask, activeExam, 'correction')}
                        </span>
                      </div>

                      {/* Display active correction rules if clicked! */}
                      {activeExplanation ? (
                        <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl mb-4 text-xs transition-all relative overflow-hidden font-sans shadow-2xs">
                          <button 
                            onClick={() => setActiveExplanation(null)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 font-bold text-sm w-4 h-4 flex items-center justify-center rounded-full bg-white shadow-3xs"
                          >
                            ×
                          </button>
                          <p className="font-extrabold text-amber-800 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-600" /> GRAMMATIC CORRECTION
                          </p>
                          <p className="text-slate-800 font-semibold mb-1">
                            Your Text: <span className="line-through text-red-500 font-extrabold">"{activeExplanation.label}"</span>
                          </p>
                          <p className="text-slate-800 font-bold mb-1.5">
                            AI Recommendation: <span className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-black">"{activeExplanation.correct}"</span>
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            {activeExplanation.note}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-blue-50/50 border border-blue-50 rounded-2xl p-4 mb-4 text-xs font-semibold text-blue-900 leading-relaxed">
                          💡 <span className="font-black text-blue-950">Active Explanations</span>: Tap any highlighted word in "My Answer" to see grammar rule corrections & native phrasing details!
                        </div>
                      )}

                      {/* Green Corrected Body Text */}
                      <div className="font-sans text-[12px] text-slate-700 leading-relaxed font-semibold">
                        {renderCorrectedTextHTML(correctionsTab, correctionsTask, activeExam)}
                      </div>
                    </div>
                  ) : (
                    // Model Answer
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">
                          Model Answer
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">
                          Standard Draft
                        </span>
                      </div>

                      <div className="font-sans text-[12px] text-slate-600 leading-relaxed space-y-3 font-semibold bg-white p-4 rounded-2xl border border-gray-100 shadow-3xs max-h-72 overflow-y-auto">
                        <p className="whitespace-pre-line">{getModelAnswerText(correctionsTab, correctionsTask, activeExam)}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
                  <span>🚀 Review correct spelling, phrasing variations instantly.</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* Boost Confidence with Realistic Mock Tests Section */}
      <div className="w-full bg-white pt-16 pb-20 flex flex-col items-center border-t border-gray-100" id="realistic-mock-tests-section">
        <h2 className="text-3xl md:text-[36px] font-bold text-slate-950 tracking-tight text-center">
          Boost Confidence with <span className="text-[#1e51da]">Realistic Mock Tests</span>
        </h2>

        <div className="text-center mt-6 mb-10">
          <div className="text-5xl md:text-[64px] font-black text-[#1e51da] tracking-tight leading-none mb-2">
            <CountUp end={137493} suffix="+" />
          </div>
          <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
            Total Test-takers
          </div>
        </div>

        {/* Gray separator line */}
        <div className="w-full max-w-5xl h-px bg-gray-100 mb-12"></div>

        {/* Dual columns grid */}
        <div className="max-w-5xl w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Practice Questions */}
          <div className="flex flex-col text-left">
            <span className="text-gray-400 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
              Building skills by question type
            </span>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Practice Questions
              </h3>
              <button className="text-xs font-bold text-gray-400 hover:text-slate-800 flex items-center transition-colors">
                More <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            {/* List items */}
            <div className="space-y-3.5">
              {practiceQuestionTitles.map((title, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-3xl hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {practiceQuestionSectionTag}
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm tracking-tight">
                      {title}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50/20 flex items-center justify-center text-[11px] font-black text-blue-600 font-mono">
                    0/0
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Preparation */}
          <div className="flex flex-col text-left">
            <span className="text-gray-400 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
              Beginning with the basics
            </span>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Detailed Preparation
              </h3>
              <button className="text-xs font-bold text-gray-400 hover:text-slate-800 flex items-center transition-colors">
                More <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            {/* Prep Guide Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#84cc16] to-[#059669] p-4 flex flex-col justify-between text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center space-x-1 border border-white/20 bg-white/10 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                      <span className="text-[9px] font-bold uppercase tracking-wider">Lesson</span>
                    </div>
                    <span className="bg-[#1e51da] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Reading</span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[10px] font-black tracking-widest text-lime-100 uppercase block">IELTS READING</span>
                    <p className="font-extrabold text-[12px] sm:text-[13px] leading-tight text-white mt-1">
                      Identifying Information & Claims
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 relative z-10 border-t border-white/20 pt-2">
                    <div className="w-6 h-6 rounded-full bg-lime-100 border border-white/30 overflow-hidden flex items-center justify-center text-slate-800 text-[10px] font-black">
                      JD
                    </div>
                    <div className="leading-none">
                      <p className="text-[9px] font-bold text-white">John Daubert</p>
                      <p className="text-[7.5px] text-lime-100 font-semibold mt-0.5">Content Expert</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white">
                  <h4 className="font-bold text-[11px] sm:text-xs text-slate-800 leading-snug">
                    Identifying Information(True/False/Not Given)
                  </h4>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#84cc16] to-[#059669] p-4 flex flex-col justify-between text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center space-x-1 border border-white/20 bg-white/10 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                      <span className="text-[9px] font-bold uppercase tracking-wider">Lesson</span>
                    </div>
                    <span className="bg-[#1e51da] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Reading</span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[10px] font-black tracking-widest text-lime-100 uppercase block">IELTS READING</span>
                    <p className="font-extrabold text-[12px] sm:text-[13px] leading-tight text-white mt-1">
                      Identifying Information & Claims
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 relative z-10 border-t border-white/20 pt-2">
                    <div className="w-6 h-6 rounded-full bg-lime-100 border border-white/30 overflow-hidden flex items-center justify-center text-slate-800 text-[10px] font-black">
                      JD
                    </div>
                    <div className="leading-none">
                      <p className="text-[9px] font-bold text-white">John Daubert</p>
                      <p className="text-[7.5px] text-lime-100 font-semibold mt-0.5">Content Expert</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white">
                  <h4 className="font-bold text-[11px] sm:text-xs text-slate-800 leading-snug">
                    Identifying Views/Claims(Yes/No/Not Given)
                  </h4>
                </div>
              </div>
            </div>

            {/* Slide controllers */}
            <div className="flex justify-start items-center space-x-2 mt-5">
              <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100/60 flex items-center justify-center text-gray-500 cursor-pointer transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100/60 flex items-center justify-center text-gray-500 cursor-pointer transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Modern Interactive FAQ Section */}
      <div className="w-full bg-white pt-20 pb-20 flex flex-col items-center relative overflow-hidden" id="faq-interactive-section">
        {/* Left side soft gradient decorative blur (teal/cyan) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] w-[240px] h-[400px] bg-gradient-to-tr from-teal-300 to-cyan-400 opacity-25 rounded-full blur-3xl pointer-events-none select-none" />
        <div className="absolute left-0 top-[35%] -translate-y-1/2 -translate-x-[45%] w-40 h-80 bg-cyan-200 opacity-40 rounded-r-full blur-2xl pointer-events-none select-none" />

        {/* Right side isolated solid pastel-blue circle */}
        <div className="absolute right-12 top-[15%] w-8 h-8 rounded-full bg-[#ccf4ff] opacity-[0.9] pointer-events-none select-none" />

        <div className="text-center px-4 max-w-3xl mb-12 relative z-10">
          <h2 className="text-4xl md:text-[50px] font-bold text-slate-800 tracking-tight leading-tight">
            Frequently Asked <span className="text-[#FFAA00]">Questions</span>
          </h2>
        </div>

        <div className="max-w-5xl w-full px-6 space-y-5 relative z-10">
          {(isIELTS 
            ? [
                {
                  q: "What is the structure of the IELTS Academic test?",
                  a: "The IELTS Academic test consists of four main sections (total approx. 2 hours 40 minutes): Reading (40 questions in 60m), Listening (40 questions in 30m), Speaking (3 parts in 11-14m, face-to-face style), and Writing (2 tasks in 60m)."
                },
                {
                  q: "How does the AI Scoring Engine on ITP Universe grade my answers?",
                  a: "Our AI engine is trained on over 1,000,000 actual exam answers. It evaluates lexical complexity, grammatical accuracy, coherence, and pronunciation structures to return detailed, realistic band scores with personalized corrective feedback within minutes."
                },
                {
                  q: "What is the difference between IELTS Academic and General Training?",
                  a: "ITP Universe covers either track. Academic measures higher academic English suited for universities or professional licensing registrations. General Training targets survival skills in migration or vocational training contexts."
                },
                {
                  q: "Is IELTS for UKVI of different difficulty level?",
                  a: "No, regular and UKVI IELTS have identical difficulty, structures, question sets, and evaluation frameworks. UKVI only differs in strict video security audit requirements during registration."
                }
              ]
            : isTOEFL
            ? [
                {
                  q: "What is the total duration and structure of the TOEFL iBT?",
                  a: "TOEFL iBT takes approximately 2 hours and consists of 4 integrated sections: Reading (20 questions / 35m), Listening (28 questions / 36m), Speaking (4 tasks / 16m), and Writing (2 tasks / 29m)."
                },
                {
                  q: "How does the interactive Speaking section recorder evaluate my answers?",
                  a: "It captures high-fidelity audio directly in the web app, feeding our deep learning model. The platform scores speech rate, pausing consistency, grammatical range, topic development, and pronunciation flow in real-time."
                },
                {
                  q: "What is generally considered a strong target score on TOEFL iBT?",
                  a: "A score of 80 points is the standard baseline for university entry. Score levels crossing 100~104+ place candidates in highly competitive brackets of tier-1 universities and elite graduate scholarships."
                },
                {
                  q: "Can I simulate mock environments exactly as in testing centers?",
                  a: "Yes. Our mock simulator features real timers and automatic page advancements corresponding exactly with ETS standards, preparing your stamina for the actual day."
                }
              ]
            : [
                {
                  q: "What is the Pearson Test of English (PTE) Academic format?",
                  a: "PTE is a 2-hour unified computer-based exam covering: Speaking & Writing (54-67 mins), Reading (29-30 mins), and Listening (30-43 mins). The flow proceeds as a singular cohesive session."
                },
                {
                  q: "How fast do I receive grades for complex sections like 'Describe Image' on ITP Universe?",
                  a: "Our automated system delivers feedback in under 3 minutes, breaking down visual content response metrics, pronunciation speed, oral flow, and key keyword accuracy."
                },
                {
                  q: "Where is the PTE Academic exam officially accepted?",
                  a: "PTE is fully recognized by thousands of programs globally, as well as for all Australian, UK, and New Zealand visa types, providing a seamless pathway to study or immigration."
                },
                {
                  q: "Does ITP Universe offer study guides tailored for specific PTE sections?",
                  a: "Yes! In our Study Center, we offer targeted practice worksheets and structured sample answers for PTE challenges like 'Re-order Paragraphs' and 'Summarize Spoken Text'."
                }
              ]
          ).map((faq, idx) => {
            const isFaqOpen = openFaq === idx;
            // Alternating colors based on question index: index 0,2,... get grey/blue, index 1,3,... get warm sand/beige
            const isEven = idx % 2 === 0;
            const bgClass = isEven ? 'bg-[#ecf1f4]' : 'bg-[#f9f3eb]';
            
            return (
              <div 
                key={idx} 
                className={`${bgClass} rounded-[20px] overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => setOpenFaq(isFaqOpen ? null : idx)}
                  className="w-full px-8 py-6 sm:px-10 sm:py-7 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-[18px] md:text-[20px] font-bold text-[#141d26] tracking-tight leading-snug">
                    {faq.q}
                  </span>
                  <div className="text-slate-800 flex-shrink-0 ml-4 transition-transform duration-300">
                    {isFaqOpen ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
                    )}
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isFaqOpen 
                      ? 'max-h-[300px] opacity-100 pb-7 sm:pb-8' 
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="px-8 sm:px-10 text-sm sm:text-base leading-relaxed text-[#404040] font-medium max-w-[95%]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center aligned More button exactly matching the logo design style */}
        <div className="flex justify-center mt-10 relative z-10 w-full">
          <button className="flex items-center gap-1.5 text-base md:text-lg font-bold text-[#141d26] hover:text-[#FFAA00] transition-colors cursor-pointer select-none">
            <span>More</span>
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
