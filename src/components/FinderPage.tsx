import React, { useState, useEffect } from 'react';
import { 
  UNIVERSITIES, 
  SCHOLARSHIPS, 
  University, 
  Scholarship 
} from '../data/finderData';
import { 
  GraduationCap, 
  Search, 
  Award, 
  Filter, 
  ChevronRight, 
  Globe, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Lightbulb,
  MapPin,
  Clock,
  RotateCcw,
  Sparkles,
  TrendingUp,
  User,
  SlidersHorizontal,
  Bookmark,
  Check,
  ChevronDown
} from 'lucide-react';

interface AIReport {
  candidacyAssessment: {
    strengths: string;
    gaps: string;
    strategy: string;
  };
  recommendedInstitutions: {
    uniName: string;
    matchPercentage: number;
    whyItFits: string;
    tipsToApply: string;
  }[];
  recommendedScholarships: {
    scholarshipName: string;
    matchPercentage: number;
    whyItFits: string;
    actionPlan: string;
  }[];
  customEssayGuide: {
    hookIdea: string;
    keyTalkingPoints: string[];
  };
}

interface MentorStep {
  title: string;
  badge: string;
  markdown: string;
}

const MENTOR_COUNTRY_GUIDES: Record<string, MentorStep[]> = {
  'United Kingdom': [
    {
      title: 'IELTS Preparation Guide',
      badge: 'Target score: 6.5 - 7.5',
      markdown: 'Required IELTS Level: Most UK universities require an IELTS band of 6.5 overall (with no sub-score below 6.0), while top Russell Group universities look for an cumulative of 7.5 with perfect speaking modules. Direct Bangladeshi Student Hurdles: Speaking Fluency Shyness: Bangladeshi students often score high on listening and reading but lose scores on speaking.'
    },
    {
      title: 'University Shortlist Checklist',
      badge: 'Russell Group & Others',
      markdown: 'Shortlisting Universities for Bangladeshi applicants: Tier 1 (High Budget & Scores): University of Oxford, Cambridge, Imperial College London, UCL, LSE. Tier 2 (Extremely Popular in Bangladesh): University of Warwick, University of Birmingham, University of Manchester, Queen Mary University. Tier 3 (Affordable with High VISA Ratio): University of Hertfordshire, Coventry University, Ulster University. Key selection parameters to consider: Check if they accept direct 3-year Bachelor\'s degrees from Bangladesh or require a foundation year.'
    },
    {
      title: 'Scholarship Opportunities',
      badge: 'Up to 100% Funding',
      markdown: 'Top British Scholarships for Bangladeshis: 1. Commonwealth Scholarships: Fully funded awards for Masters and PhD applicants. Covers airfare, lodging, and tuition fee waiver. 2. Chevening Scholarship: British Government\'s flagship award. Fully funded premium program searching for future leaders. 3. GREAT Scholarships: Generous £10,000 scholarship discount on tuition fees, specifically partnered with British Council Bangladesh channels.'
    },
    {
      title: 'SOP & Statement Writing',
      badge: 'Academic-focused SOP',
      markdown: 'How to craft an SOP for UK Universities: Keep it purely academic: British admissions officers hate flowery childhood stories. Start immediately with your academic background. Detail previous course titles: Specifically cite how your BSc/BBA courses in Bangladesh map to the modules of the targeted UK MSc. Why UK?: Explain the practical curriculum model in the UK compared to general theoretical studies elsewhere.'
    },
    {
      title: 'Visa & Embassies Preparation',
      badge: '98% Bangladeshi Success Rate',
      markdown: 'Bangladeshi UK Student Visa (Tier 4) Checklist: Financial Solvency Proof: You must show funds for 28 consecutive days in an approved bank in Bangladesh covering tuition fees + £1,334/month (inside London) or £1,023/month (outside London) for living costs. VFS Dhaka Office: Applications processed through the VFS Global center in Gulshan-2, Dhaka. No strict visa interview: Usually purely paper-based matching with occasional virtual credibility interviews.'
    }
  ],
  'United States': [
    {
      title: 'IELTS/TOEFL Preparation Guide',
      badge: 'Target score: 7.0+ / 90+',
      markdown: 'Required score level: US institutions usually prefer TOEFL (90+) or IELTS (7.0+). Many universities also demand GRE or GMAT scores for graduate applications. Strategic approach for Bangladeshi applicants: Target universities offering IELTS/TOEFL waivers if your past medium of instruction at your Bangladeshi university was entirely in English (MOI certificate required). Practice target vocabulary daily inside the Vocab Chart to tackle the high-density reading passages typical of US exams.'
    },
    {
      title: 'University Shortlist Checklist',
      badge: 'Over 4,000 Colleges',
      markdown: 'Finding the right match: Ivy League & top tier: Harvard, Stanford, MIT, Yale, Columbia, Cornell (Highly selective, requires exceptional extra-curriculars). Public Ivy Leagues (Best value): University of Texas at Austin, University of California Berkeley, Penn State. Bangladeshi friendly tech hubs: UT Arlington, University of South Florida, Texas A&M. Select schools in states offering regional in-state tuition tuition waivers for International students.'
    },
    {
      title: 'Scholarship Opportunities',
      badge: 'TA & RA positions',
      markdown: 'Top United States Funding Paths: 1. Fulbright Foreign Student Program: Highly competitive, fully funded Master\'s degree scholarship sponsored directly by the US Embassy Dhaka. 2. Graduate Assistantships (TA/RA): The most common way Bangladeshi pupils study for free. Universities pay your full tuition plus a stipend in exchange for 20 hours/week teaching or research work. 3. Presidential Merit Scholarships: Partial to full automatic tuition discounts given upon admission for high-GPA applicants.'
    },
    {
      title: 'SOP & Personal Essays',
      badge: 'The Storytelling SOP',
      markdown: 'SOP Writing for US Universities: Highlight your unique voice: Unlike the UK, US colleges love to hear your story. Talk about challenges you overcame in Bangladesh, your community service, and your core values. Align with faculty work: Name 1-2 professors at the target school and reference their actual research papers to prove your specific intent.'
    },
    {
      title: 'Visa & F1 Visa Interview',
      badge: 'Dhaka Embassy Interview Prep',
      markdown: 'F1 Visa Preparation (Critical Step): The Embassy Interview: Requires scheduling a face-to-face appointment at the US Embassy in Baridhara, Dhaka. Key Success Factor: You must confidently prove Strong Ties to Bangladesh to reassure officers that you intend to return after completing your degree. I-20 Form: Master document issued by your uni proving you have tuition and living coverage before booking the interview.'
    }
  ],
  'Germany': [
    {
      title: 'IELTS / German Preparation Guide',
      badge: 'Target score: 6.5+ / A1-B2',
      markdown: 'Language criteria: English-taught Master\'s programs require an average IELTS of 6.5. Absolutely no German language is required to study, but learning basics (A1-A2) will help secure part-time jobs. Dhaka Strategy: Combine your IELTS mock drills with German greetings to boost confidence in your personal profile. Use our Daily Challenge to keep your IELTS preparation consistent.'
    },
    {
      title: 'University Shortlist Checklist',
      badge: 'Tuition-Free Universities',
      markdown: 'Shortlisting German Public Universities: Top Public Unis (Virtually €0 Tuition): Technical University of Munich (TUM), LMU Munich, RWTH Aachen, Heidelberg University. How to apply: Use the Uni-Assist portal, which handles official verification of Bangladeshi certificates. Keep in mind that a GPA of \'Good\' (German Grade equivalent to 2.5 or better) is highly recommended.'
    },
    {
      title: 'Scholarship Opportunities',
      badge: 'Stipends & Support',
      markdown: 'Funding routes for Germany: DAAD EPOS Scholarships: Fully funded scholarship for select development-related Masters courses. Excellent for professionals in Bangladesh with 2+ years of experience. Deutschlandstipendium: €300/month merit scholarship awarded directly by universities to outstanding scholars.'
    },
    {
      title: 'SOP & Modules Matching',
      badge: 'Academic Mapping SOP',
      markdown: 'German SOP Priorities: Be scientific and structured: German admissions teams evaluate your SOP on matching academic content. Credit points calculation: Directly prove that your Bachelor\'s degree credits from your Bangladeshi college match the exact prerequisite credit hours of the prospective German course.'
    },
    {
      title: 'Visa & German Blocked Account',
      badge: 'Blocked Funds required',
      markdown: 'German Visa Process (Embassy of Germany, Dhaka): Blocked Account (Sperrkonto): You must deposit €11,904 into a German blocked account (via Expatrio or Fintiba) to cover your first year\'s living expenses. Appointment Queue: The visa appointment queue at the German Embassy in Gulshan, Dhaka, can be incredibly long (often taking 6-12 months), so start shortlisting universities early!'
    }
  ],
  'Canada': [
    {
      title: 'IELTS & SDS Preparation Guide',
      badge: 'SDS Target: 6.0+ Each Band',
      markdown: 'SDS Stream Criteria: The Student Direct Stream (SDS) allows faster visa processing for Bangladeshi prospective applicants if you secure an IELTS of 6.0 or higher in EVERY single module (Reading, Writing, Listening, Speaking). Direct action points: One weak module can drop you out of the fast-track stream. Focus heavily on speaking and writing drills using our interactive review suite to keep all sub-scores well balanced.'
    },
    {
      title: 'University Shortlist Checklist',
      badge: 'DLI Universities Only',
      markdown: 'Shortlisting Canadian DLIs: Tier 1 (Top Tier Research): University of Toronto, UBC, McGill, University of Alberta. Tier 2 (Highly Reputable & Professional): University of Waterloo, Western University, York University, Concordia. Tier 3 (Extremely Popular for PR-path): Memorial University, University of Manitoba. Make sure the university holds a Designated Learning Institution (DLI) number to ensure eligibility for the Post-Graduation Work Permit (PGWP).'
    },
    {
      title: 'Scholarship Opportunities',
      badge: 'Funding Awards',
      markdown: 'Top Schemes to Cut Costs: 1. Vanier Canada Graduate Scholarships: Fully funded CAD $50,000/year reward for doctoral research candidates. 2. Lester B. Pearson International Scholarship: Premier full-ride undergraduate scholarship at the University of Toronto. 3. University Entrance Scholarships: Automatic CAD $2,000 - $10,000 discounts given based on high admissions averages.'
    },
    {
      title: 'SOP & Letter of Explanation (LOE)',
      badge: 'Visa LOE Writing style',
      markdown: 'Writing a Canadian SOP: The LOE Strategy: For Canadian visas, the SOP is called a Letter of Explanation. Explain study gaps: If you have any employment or idle gaps after graduating from school in Bangladesh, explain them with positive career growth. Establish clear return motivation: Prove how your return to Dhaka is beneficial after your study path.'
    },
    {
      title: 'Visa & GIC Bank solvency',
      badge: 'SDS & GIC Bank Account',
      markdown: 'Canadian Student Visa Checklist: Guaranteed Investment Certificate (GIC): You must purchase a GIC of CAD $20,635 from an approved bank (like CIBC or Scotiabank) to guarantee your first-year living expenses. Biometrics: Processed through VFS Global in Gulshan-1, Dhaka. High Study Visa Success Rate: SDS applications are usually processed in under 20-30 days.'
    }
  ],
  'Australia': [
    {
      title: 'IELTS Preparation Guide',
      badge: 'Target score: 6.5+ average',
      markdown: 'Australian Language prerequisites: Average undergraduate level requires 6.0, and postgraduate level requires 6.5. Dhaka Prep Strategy: Join speaking partner groups on our core platform of Bangladesh, as Australian immigration officers frequently verify communication skills during phone verification audits.'
    },
    {
      title: 'University Shortlist Checklist',
      badge: 'Group of Eight (Go8)',
      markdown: 'Mapping Australian Colleges: Group of Eight (Go8 - Ivy League of Australia): University of Melbourne, ANU, University of Sydney, UNSW, Monash University, University of Queensland. Tier 2 (Excellent employment outcomes): UTS, RMIT, Macquarie University, Deakin University. Affordable Regional Hubs: University of Wollongong, University of Tasmania (extra points for permanent residency path).'
    },
    {
      title: 'Scholarship Opportunities',
      badge: 'Up to 100% Scholarships',
      markdown: 'Top Australian Aid Programs: 1. Australia Awards Scholarships: Highly prestigious, fully funded scholarship for Master\'s programs covering complete flights, stipend, and school fees. 2. Destination Australia Scholarships: Over AU $15,005 / year to study in regional Australia locations. 3. Merit Tuition Fee Reductions: Go8 universities frequently offer global merit awards of 20% to 50% automatic tuition drops.'
    },
    {
      title: 'SOP & GTE Assessment',
      badge: 'Strict Genuine Student test',
      markdown: 'Australian GTE (Genuine Student) SOP Writing: GST Requirement: SOP writing must focus on showing you are a genuine student who intends to gain skills to apply back in Bangladesh. Detailed comparison table: You MUST include a specific comparison table showing alternate universities in Dhaka (e.g. DU, NSU, BRAC) and why this particular program in Australia is a vastly superior economic investment.'
    },
    {
      title: 'Visa & ImmiAccount Preparation',
      badge: 'Online Visa Ingress',
      markdown: 'Australian Subclass 500 Visa Checklist: Online Lodgment: Lodged digitally through Australia\'s ImmiAccount portal. OSHC Health Coverage: You must buy Overseas Student Health Cover for your entire program span. Bank Solvency: Bank sponsor statement required showing one year tuition + AU $29,710 for living, held in a recognized Bangladeshi bank.'
    }
  ]
};

export default function FinderPage() {
  // Tabs active logic
  const [finderTab, setFinderTab] = useState<'universities' | 'scholarships' | 'mentor'>('universities');
  const [mentorCountry, setMentorCountry] = useState<string>('United Kingdom');
  const [activeMentorStep, setActiveMentorStep] = useState<number>(0);

  // AI Study Abroad Mentor Chat state
  const [mentorChatLogs, setMentorChatLogs] = useState<Record<string, { sender: 'user' | 'mentor'; text: string; time: string }[]>>({});
  const [mentorInput, setMentorInput] = useState<string>('');

  // Student Profile State
  const [profile, setProfile] = useState({
    name: '',
    gpa: '3.6',
    testType: 'IELTS' as 'IELTS' | 'TOEFL' | 'PTE', // defaults to IELTS
    score: '7.0',
    major: 'Computer Science',
    countries: [] as string[],
    budget: 'Any', // Any, Under $15k/yr, $15k - $35k/yr, $35k+/yr
    extraCurriculars: ''
  });

  // UI state
  const [scoreList, setScoreList] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedMajorFilter, setSelectedMajorFilter] = useState<string>('All');

  // Populate dynamic test score option dropdowns depending on selected language test
  useEffect(() => {
    if (profile.testType === 'IELTS') {
      const ieltsScores = Array.from({ length: 17 }, (_, i) => (9.0 - (i * 0.5)).toFixed(1));
      setScoreList(ieltsScores);
      setProfile(prev => ({ ...prev, score: '7.0' }));
    } else if (profile.testType === 'TOEFL') {
      const toeflScores = Array.from({ length: 41 }, (_, i) => String(120 - (i * 2)));
      setScoreList(toeflScores);
      setProfile(prev => ({ ...prev, score: '100' }));
    } else if (profile.testType === 'PTE') {
      const pteScores = Array.from({ length: 81 }, (_, i) => String(90 - i));
      setScoreList(pteScores);
      setProfile(prev => ({ ...prev, score: '70' }));
    }
  }, [profile.testType]);

  // Auto-initialize welcome message for selected country and active step
  useEffect(() => {
    const key = `${mentorCountry}-${activeMentorStep}`;
    if (!mentorChatLogs[key]) {
      const welcomeMessages: Record<string, string> = {
        'United Kingdom': `Welcome to the UK Section! 🇬🇧 Most students in Dhaka run into issues regarding the 28-day solvency rule. Are you planning your funds structure, or would you like assistance shortlisting Russell Group schools? Ask me anything!`,
        'United States': `Greetings! 🇺🇸 US universities focus heavily on your holistic profile. Are you concerned about how to apply for Graduate Assistantships (TA/RA), writing a convincing storytelling SOP, or booking a visa slot at the Dhaka Baridhara Embassy? Ask me anything!`,
        'Germany': `Hallo! 🇩🇪 Studying in Germany is fantastic since tuition at public universities is essentially free! However, getting an embassy appointment slot in Dhaka can take 6-12 months, and setting up a blocked account (Sperrkonto) requires care. Ask me anything!`,
        'Canada': `Welcome! 🇨🇦 The SDS fast-track stream is highly requested, but you must score 6.0 in every single IELTS sub-metric. Are you planning your GIC deposit, or trying to draft your Letter of Explanation (LOE)? Ask me anything!`,
        'Australia': `Assalamu Alaikum! 🇦🇺 Australia is perfect for post-study work paths. The Genuine Student (GS) test has very strict criteria compared to the older GTE system. Do you want to understand how to prove your sponsor's financial origins, or design a comparison table? Ask me anything!`
      };
      
      const welcomeText = welcomeMessages[mentorCountry] || `Hello! I am your AI Abroad Advisor. How can I help you prepare for your journey from Bangladesh?`;
      
      setMentorChatLogs(prev => ({
        ...prev,
        [key]: [
          { sender: 'mentor', text: welcomeText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      }));
    }
  }, [mentorCountry, activeMentorStep]);

  const handleSendMentorMessage = (customMsg?: string) => {
    const textToSend = customMsg !== undefined ? customMsg : mentorInput;
    if (!textToSend.trim()) return;
    
    const key = `${mentorCountry}-${activeMentorStep}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add user message
    const userMsg = { sender: 'user' as const, text: textToSend, time: timeNow };
    
    setMentorChatLogs(prev => {
      const activeLogs = prev[key] || [];
      return {
        ...prev,
        [key]: [...activeLogs, userMsg]
      };
    });
    
    if (customMsg === undefined) {
      setMentorInput('');
    }
    
    // 2. Generate custom AI response with zero latency simulating counselor expertise
    setTimeout(() => {
      let aiText = `I hear you. For ${mentorCountry}, this is a key step! Make sure you double-check your documents. Do you have any specific query about sponsorship or minimum criteria?`;
      const query = textToSend.toLowerCase();
      
      if (query.includes('block') || query.includes('sperrkonto') || query.includes('deutschland')) {
        aiText = `For Germany 🇩🇪, the Sperrkonto requires precisely **€11,904**. Bangladeshi students typically open this using online providers like **Expatrio** or **Fintiba**. Once opened, you can wire the money from Dhaka through authorized banks (e.g., Eastern Bank or City Bank) under student file rules. Keep this ready early because the embassy appointment wait-times in Gulshan are extremely long!`;
      } else if (query.includes('solvency') || query.includes('bank') || query.includes('fund') || query.includes('sponsor') || query.includes('money')) {
        if (mentorCountry === 'United Kingdom') {
          aiText = `For the UK 🇬🇧, you must demonstrate the **28-Day Rule**. The required funds (tuition fees for year 1 + £1,023/month outside London or £1,334/month inside London for 9 months) must reside untouched in a Bangladesh bank list approved by the UKVI (e.g. Standard Chartered, Prime Bank, Bank Asia, Eastern Bank) for a full 28 days consecutively before application submission.`;
        } else if (mentorCountry === 'United States') {
          aiText = `For the USA 🇺🇸, you must submit bank letters proving liquid assets covering your first year of estimated cost as listed on your I-20 document. Typical sponsors are blood relatives. You need to prove their income source with trade licenses, salary certificates, or Tax papers (TIN/IT-10B) in Bangladesh.`;
        } else if (mentorCountry === 'Canada') {
          aiText = `For Canada 🇨🇦, the preferred method is buying a Guaranteed Investment Certificate (GIC) of **CAD $20,635** from approved institutions like CIBC. This guarantees first-year living costs. For for remaining tuition fees, showing a clear sponsor bank statement for 4-6 months with stable history is highly recommended.`;
        } else if (mentorCountry === 'Australia') {
          aiText = `For Australia 🇦🇺, you need to show AU $29,710 for living costs + 1st year tuition. The funds must be backed by a clear financial history. Australian visa auditors frequently run rigorous phone checks with sponsored banks in Dhaka to verify certificates in person!`;
        } else {
          aiText = `For ${mentorCountry}, financial solvency requires you or your close blood relatives to act as sponsors showing sufficient liquid balance covering tuition + living costs for at least the first academic year in an approved local bank showing steady transaction history.`;
        }
      } else if (query.includes('sop') || query.includes('essay') || query.includes('statement') || query.includes('loe') || query.includes('gte')) {
        if (mentorCountry === 'United Kingdom') {
          aiText = `For UK Statement of Purpose (SOP): Keep it strictly professional. Russell group review boards hate generic childhood storytelling. Clearly state your undergrad GPA, identify three specific modules in the targeted course that align with your career goals, and explain 'Why UK' vs Bangladesh.`;
        } else if (mentorCountry === 'United States') {
          aiText = `For USA Admission Essays: Bring out your personality! Mention community service, extracurriculars in Dhaka, or unique academic hurdles you overcame. Mention 1-2 research professors of the department and their works to show dedicated target interest.`;
        } else if (mentorCountry === 'Canada') {
          aiText = `For Canadian Letter of Explanation (LOE): Focus heavily on demonstrating **ties to Bangladesh**. Explain why you are choosing Canada over your home country, why this specific university, and how your career plans target returning to Dhaka or Chittagong.`;
        } else if (mentorCountry === 'Australia') {
          aiText = `For Australian Genuine Student (GS) statements: You must write a robust, proof-based logical narrative comparing alternate programs at universities in Bangladesh (e.g. NSU, BRAC, Dhaka University) and outline why investing AU $30,000/year is economically sound.`;
        } else {
          aiText = `To write a strong Statement of Purpose: Break it down into five key paragraphs: 1) Your academic background, 2) Why this specific course, 3) Why this host country, 4) Why this university, and 5) Your immediate 5-year post-graduation career timeline when returning to Bangladesh.`;
        }
      } else if (query.includes('visa') || query.includes('embassy') || query.includes('interview')) {
        if (mentorCountry === 'United States') {
          aiText = `The US F1 Visa Interview at Baridhara, Dhaka is the decisive moment! You must maintain strong eye contact, answer in under 45 seconds, and confidently prove **Ties to Bangladesh** and financial capability. Never say you intend to settle there permanently!`;
        } else if (mentorCountry === 'Germany') {
          aiText = `The German Student Visa interview in Gulshan, Dhaka, is usually straightforward but highly technical. Make sure you organize two sets of printed hardcopies of your Sperrkonto certificate, Uni-assist admissions letter, motivation letter, and academic degrees.`;
        } else {
          aiText = `The VFS biometric steps in Gulshan (for UK, Canada, Australia) are simple. Just ensure your health checks / medical panels are completed via clinics in Dhaka approved by their high commissions (e.g. IOM, Green Life, or Apollo/Evercare) before locking your visa slot.`;
        }
      } else if (query.includes('ielts') || query.includes('score') || query.includes('pte')) {
        aiText = `Preparing for your exam is crucial. For ${mentorCountry}, having a strong score reduces visa rejection risk significantly. I recommend practicing speaking cue cards daily with speaking buddies in our **Speaking Partner** tab, and logging mock drills to build high-score stamina!`;
      } else if (query.includes('bengali') || query.includes('translate') || query.includes('bangla')) {
        aiText = `অবশ্যই! বিদেশে পড়ার যে কোনো ধাপে (IELTS Prep, Bank Solvency, SOP Writing, block account বা Visa File ready করা) আপনার কোনো প্রশ্ন থাকলে বাংলায় লিখুন, আমি বাংলায় সাহায্য করার জন্য সম্পূর্ণ প্রস্তুত।`;
      } else {
        aiText = `Excellent point! For ${mentorCountry}, addressing this early builds a flawless profile. Would you like me to check country-specific guidelines or do you want to explore the **Scholarships** and **University Match lists** on our companion tabs? Ask away!`;
      }
      
      setMentorChatLogs(prev => {
        const activeLogs = prev[key] || [];
        return {
          ...prev,
          [key]: [...activeLogs, { sender: 'mentor' as const, text: aiText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
      });
      
    }, 600);
  };

  // Country lists for profile multi-select
  const countryOptions = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'];

  const handleCountryToggle = (country: string) => {
    setProfile(prev => {
      const alreadySelected = prev.countries.includes(country);
      if (alreadySelected) {
        return { ...prev, countries: prev.countries.filter(c => c !== country) };
      } else {
        return { ...prev, countries: [...prev.countries, country] };
      }
    });
  };

  // Run Real-time calculator for Match Score %
  const calculateUniversityMatch = (uni: University) => {
    const studentGpa = parseFloat(profile.gpa) || 3.5;
    const studentScore = parseFloat(profile.score) || 7.0;

    let baseScore = 75;

    // Check GPA match
    const gpaDiff = studentGpa - uni.minGPA;
    if (gpaDiff >= 0) {
      baseScore += Math.min(15, Math.floor(gpaDiff * 15));
    } else {
      baseScore -= Math.min(30, Math.floor(Math.abs(gpaDiff) * 50));
    }

    // Check English proficiency match
    if (profile.testType === 'IELTS') {
      const diff = studentScore - uni.minIELTS;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 8));
      else baseScore -= Math.min(25, Math.floor(Math.abs(diff) * 20));
    } else if (profile.testType === 'TOEFL') {
      const diff = studentScore - uni.minTOEFL;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 0.5));
      else baseScore -= Math.min(25, Math.floor(Math.abs(diff) * 1.5));
    } else if (profile.testType === 'PTE') {
      const diff = studentScore - uni.minPTE;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 0.6));
      else baseScore -= Math.min(25, Math.floor(Math.abs(diff) * 1.6));
    }

    // Major bonus (if university excels in their chosen major field)
    const isMajorWellKnown = uni.bestKnownFor.some(m => m.toLowerCase().includes(profile.major.toLowerCase()));
    if (isMajorWellKnown) {
      baseScore += 5;
    }

    // Target country matching
    if (profile.countries.length > 0) {
      if (profile.countries.includes(uni.country)) {
        baseScore += 5;
      } else {
        baseScore -= 10;
      }
    }

    // Budget match
    if (profile.budget !== 'Any') {
      if (profile.budget === 'Under $15k/year' && uni.tuitionNum > 15000) {
        baseScore -= 15;
      } else if (profile.budget === '$15k - $35k/year' && (uni.tuitionNum < 15000 || uni.tuitionNum > 35100)) {
        baseScore -= 8;
      }
    }

    return Math.max(20, Math.min(99, baseScore));
  };

  const calculateScholarshipMatch = (sch: Scholarship) => {
    const studentGpa = parseFloat(profile.gpa) || 3.5;
    const studentScore = parseFloat(profile.score) || 7.0;

    let baseScore = 70;

    // Check GPA match
    const gpaDiff = studentGpa - sch.minGPA;
    if (gpaDiff >= 0) {
      baseScore += Math.min(20, Math.floor(gpaDiff * 20));
    } else {
      baseScore -= Math.min(35, Math.floor(Math.abs(gpaDiff) * 60));
    }

    // Language limits
    if (profile.testType === 'IELTS') {
      const diff = studentScore - sch.minIELTS;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 10));
      else baseScore -= Math.min(30, Math.floor(Math.abs(diff) * 25));
    } else if (profile.testType === 'TOEFL') {
      const toeflEquivalentMin = sch.minIELTS === 7.5 ? 100 : sch.minIELTS === 7.0 ? 95 : 80;
      const diff = studentScore - toeflEquivalentMin;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 0.5));
      else baseScore -= Math.min(30, Math.floor(Math.abs(diff) * 1.5));
    } else if (profile.testType === 'PTE') {
      const pteEquivalentMin = sch.minIELTS === 7.5 ? 72 : sch.minIELTS === 7.0 ? 65 : 58;
      const diff = studentScore - pteEquivalentMin;
      if (diff >= 0) baseScore += Math.min(10, Math.floor(diff * 0.6));
      else baseScore -= Math.min(30, Math.floor(Math.abs(diff) * 1.6));
    }

    // Country match
    if (sch.countryRestriction.length > 0 && !sch.countryRestriction.includes('Any')) {
      const targetsMatch = profile.countries.some(c => sch.countryRestriction.includes(c));
      if (targetsMatch) {
        baseScore += 10;
      } else if (profile.countries.length > 0) {
        baseScore -= 15;
      }
    }

    // Major match
    if (sch.majorRestrictions.length > 0 && !sch.majorRestrictions.includes('Any')) {
      const majorMatches = sch.majorRestrictions.some(m => m.toLowerCase().includes(profile.major.toLowerCase()));
      if (majorMatches) {
        baseScore += 10;
      } else {
        baseScore -= 10;
      }
    }

    return Math.max(15, Math.min(99, baseScore));
  };

  // Call server-side API for Gemini Match Analysis
  const handleGenerateAIRecommendation = async () => {
    setIsEvaluating(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/finder/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profile.name,
          gpa: profile.gpa,
          testType: profile.testType,
          score: profile.score,
          major: profile.major,
          countries: profile.countries,
          budget: profile.budget,
          extraCurriculars: profile.extraCurriculars
        })
      });

      if (!response.ok) {
        throw new Error('Admissions network server timed out. Loading model fallbacks.');
      }

      const data = await response.json();
      setAiReport(data);
      // Smooth scroll down to assessment block
      setTimeout(() => {
        document.getElementById('ai-match-report-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);

    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'Service temporarily unavailable.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Filter Catalog lists
  const filteredUniversities = UNIVERSITIES.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
      uni.bestKnownFor.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCountry = selectedCountry === 'All' || uni.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  }).map(uni => ({
    ...uni,
    matchScore: calculateUniversityMatch(uni)
  })).sort((a, b) => b.matchScore - a.matchScore);

  const filteredScholarships = SCHOLARSHIPS.filter(sch => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || 
      sch.countryRestriction.includes('Any') || 
      sch.countryRestriction.includes(selectedCountry);

    const matchesMajor = selectedMajorFilter === 'All' || 
      sch.majorRestrictions.includes('Any') || 
      sch.majorRestrictions.some(m => m.toLowerCase().includes(selectedMajorFilter.toLowerCase()));

    return matchesSearch && matchesCountry && matchesMajor;
  }).map(sch => ({
    ...sch,
    matchScore: calculateScholarshipMatch(sch)
  })).sort((a, b) => b.matchScore - a.matchScore);

  const handleResetProfile = () => {
    setProfile({
      name: '',
      gpa: '3.6',
      testType: 'IELTS',
      score: '7.0',
      major: 'Computer Science',
      countries: [],
      budget: 'Any',
      extraCurriculars: ''
    });
    setAiReport(null);
  };

  return (
    <div className="w-full text-[#1e293b] text-left select-none bg-[#f8fafc]/50 min-h-screen py-8 px-4 sm:px-6 lg:px-8" id="finder-portal">
      
      {/* 1. Header Hero Banner - High-Tier Clean Aesthetic */}
      <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-10 overflow-hidden" id="finder-header">
        {/* Modern blur blobs instead of harsh gradients */}
        <div className="absolute right-[-10%] top-[-20%] w-[380px] h-[380px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none select-none"></div>
        <div className="absolute left-[20%] bottom-[-30%] w-[300px] h-[300px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none select-none"></div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-blue-700 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>AI-Driven Admissions Advisor v2.0</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
            University & <span className="text-blue-600">Scholarship Finder</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-3xl">
            Match your academic performance, preferred location, and English language test scores with top QS global schools and major scholarships instantly. Generate tailored strategic advice using Gemini AI integration.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: THE STUDENT PROFILE CONSTRUCTOR (4/12 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm relative transition-all duration-300" id="profile-constructor-card">
            
            {/* Form Title Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">My Admissions Profile</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Parameters</p>
                </div>
              </div>
              <button 
                onClick={handleResetProfile}
                className="text-xs font-bold text-slate-400 hover:text-blue-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Reset Profile"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            <div className="space-y-5 text-xs font-medium">
              
              {/* Student Name */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">Student Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name" 
                    className="w-full bg-slate-50/40 text-slate-900 border border-slate-200/80 hover:border-slate-300 px-4 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* GPA Slideway / Input */}
              <div className="bg-slate-50/50 border border-slate-150 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-705 font-black uppercase text-[11px] tracking-wide">Cumulative GPA (4.0 Scale)</label>
                  <span className="bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-xs">{profile.gpa}</span>
                </div>
                <input 
                  type="range" 
                  min="2.0" 
                  max="4.0" 
                  step="0.1"
                  value={profile.gpa}
                  onChange={(e) => setProfile(prev => ({ ...prev, gpa: e.target.value }))}
                  className="w-full accent-blue-600 h-2 bg-slate-200/80 rounded-lg cursor-pointer transition-all hover:bg-slate-300"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-wider">
                  <span>2.0 Standard</span>
                  <span>3.0 Merit</span>
                  <span>4.0 Perfect GPA</span>
                </div>
              </div>

              {/* English Language test Selector - Custom Segmented Control */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">English Test Type</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/30">
                  {(['IELTS', 'TOEFL', 'PTE'] as const).map(test => (
                    <button
                      key={test}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, testType: test }))}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        profile.testType === test 
                          ? 'bg-white text-blue-600 shadow-sm border border-slate-200/10' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {test}
                    </button>
                  ))}
                </div>
              </div>

              {/* English Test Score dropdown, modern styling */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">
                  Target / Obtained Score
                </label>
                <div className="relative">
                  <select
                    value={profile.score}
                    onChange={(e) => setProfile(prev => ({ ...prev, score: e.target.value }))}
                    className="w-full bg-slate-50/40 text-slate-900 border border-slate-200/80 hover:border-slate-300 px-4 py-3 rounded-2xl text-xs font-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    {scoreList.map(sc => (
                      <option key={sc} value={sc}>{profile.testType} Band {sc}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Intended Major */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">Intended Field of Study</label>
                <div className="relative">
                  <select
                    value={profile.major}
                    onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                    className="w-full bg-slate-50/40 text-slate-900 border border-slate-200/80 hover:border-slate-300 px-4 py-3 rounded-2xl text-xs font-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Computer Science">Computer Science & AI</option>
                    <option value="Engineering">Mechanical & Systems Engineering</option>
                    <option value="Business">Business Administration & Finance</option>
                    <option value="Medicine">Pre-Medicine & Health Sciences</option>
                    <option value="Humanities">Humanities & Social Sciences</option>
                    <option value="Physics">Physics & Environmental Science</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Target Countries Multi-Select with gorgeous toggle buttons */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-705 font-black uppercase text-[11px] tracking-wide">Preferred Study Destination</label>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">Select one or more targets</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {countryOptions.map(country => {
                    const isSelected = profile.countries.includes(country);
                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountryToggle(country)}
                        className={`px-3 py-2.5 rounded-xl text-3xs font-extrabold transition-all border text-left flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-50/80 border-blue-200 text-blue-700 font-black shadow-xs' 
                            : 'bg-[#fafbfd] border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <span>{country}</span>
                        {isSelected ? (
                          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px]">
                            ✓
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-200" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget constraints */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">Tuition Budget Limit</label>
                <div className="relative">
                  <select
                    value={profile.budget}
                    onChange={(e) => setProfile(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full bg-slate-50/40 text-slate-900 border border-slate-200/80 hover:border-slate-300 px-4 py-3 rounded-2xl text-xs font-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Any">Unrestricted ($50k+/year acceptable)</option>
                    <option value="$15k - $35k/year">Moderate ($15,000 - $35,000 / year)</option>
                    <option value="Under $15k/year">Low-Budget / Free (Under $15,000 / year)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Extra-Curriculars summary */}
              <div>
                <label className="block text-slate-700 mb-2 font-black tracking-wide uppercase text-[11px]">Extracurriculars & Achievement Notes</label>
                <textarea
                  value={profile.extraCurriculars}
                  onChange={(e) => setProfile(prev => ({ ...prev, extraCurriculars: e.target.value }))}
                  rows={3}
                  placeholder="E.g., Programming club president, worked as student tutor, community services volunteer..."
                  className="w-full bg-slate-50/40 text-slate-905 border border-slate-200/80 hover:border-slate-300 p-3 rounded-2xl text-xs font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:font-medium leading-relaxed"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleGenerateAIRecommendation}
                disabled={isEvaluating}
                className="w-full active:scale-98 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-500/10 mt-5 text-xs tracking-wider uppercase disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analyzing Credentials...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Study Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Clean Pro Tip Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-sm">
            <div className="absolute top-[-20px] right-[-20px] p-2 opacity-5">
              <GraduationCap className="w-32 h-32 text-blue-400" />
            </div>
            <div className="flex items-start space-x-4 text-xs relative z-10">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 mt-0.5 shrink-0">
                <Lightbulb className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-extrabold text-amber-300 mb-1.5 uppercase tracking-wider text-[11px]">Admissions Counselor Pro-Tip</h4>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Top-ranked elite global schools value consistency over arbitrary test scores. Use your essays and custom study schedules to prove a persistent dedication to your chosen field.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SEARCH/FILTER PORTALS + RESULTS CATALOGS (8/12 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* CATALOG SWITCH TAB & FILTERS PANEL */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm" id="catalog-controls">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-5 gap-4">
              
              {/* Premium minimal Switch Tab */}
              <div className="flex bg-slate-100/70 p-1 rounded-2xl border border-slate-200/30" id="finder-toggle">
                <button
                  onClick={() => setFinderTab('universities')}
                  className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
                    finderTab === 'universities'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/10'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>University Match List</span>
                </button>
                <button
                  onClick={() => setFinderTab('scholarships')}
                  className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
                    finderTab === 'scholarships'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/10'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Scholarships</span>
                </button>
                <button
                  onClick={() => setFinderTab('mentor')}
                  className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
                    finderTab === 'mentor'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/10'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                  id="ai-mentor-nav-pill"
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>AI Abroad Mentor</span>
                </button>
              </div>

              {/* Minimalist Catalog counter */}
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Catalog Index</p>
                <span className="text-xs font-black text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                  {finderTab === 'universities' 
                    ? `${filteredUniversities.length} Universities` 
                    : finderTab === 'scholarships' 
                    ? `${filteredScholarships.length} Scholarships` 
                    : 'Active AI Interactive Guidance'}
                </span>
              </div>
            </div>

            {/* Quick search input and dropdown filters */}
            {finderTab !== 'mentor' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5" id="catalog-filters">
                <div className="sm:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={finderTab === 'universities' ? 'Search by school name, program, location...' : 'Search by scholarship name, field, provider...'}
                    className="w-full bg-slate-50/50 text-slate-800 border border-slate-200/80 focus:border-blue-500 hover:border-slate-300 pl-11 pr-4 py-3 rounded-2xl text-xs font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:font-medium"
                  />
                </div>

                <div className="sm:col-span-3 relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-slate-50/50 text-slate-800 border border-slate-200/80 hover:border-slate-300 pl-4 pr-10 py-3 rounded-2xl text-xs font-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="All">All Countries</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <div className="sm:col-span-3 relative">
                  {finderTab === 'universities' ? (
                    <div className="bg-slate-50 border border-slate-200/80 text-slate-400 text-xs font-black px-4 py-3 rounded-2xl text-center select-none cursor-not-allowed">
                      Sorted by Match %
                    </div>
                  ) : (
                    <>
                      <select
                        value={selectedMajorFilter}
                        onChange={(e) => setSelectedMajorFilter(e.target.value)}
                        className="w-full bg-slate-50/50 text-slate-800 border border-slate-200/80 hover:border-slate-300 pl-4 pr-10 py-3 rounded-2xl text-xs font-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="All">All Majors</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Environmental Science">Environmental</option>
                        <option value="Health Sciences">Health Sciences</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC RESULTS CATALOG VIEW */}
          {finderTab === 'universities' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in" id="universities-list">
              {filteredUniversities.map(uni => {
                const scoreColorClass = 
                  uni.matchScore >= 80 
                    ? 'text-emerald-600 border-emerald-100 bg-emerald-50' 
                    : uni.matchScore >= 60 
                    ? 'text-amber-500 border-amber-100 bg-amber-50' 
                    : 'text-rose-500 border-rose-100 bg-rose-50';

                return (
                  <div 
                    key={uni.id} 
                    className="bg-white border border-slate-200/80 hover:border-blue-400/80 p-5 rounded-3xl shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Actionable Bar */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex items-center space-x-1.5 text-[9px] font-black tracking-wider text-slate-400 uppercase bg-slate-100 px-2.5 py-1 rounded-lg">
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span>{uni.country}</span>
                        </span>

                        {/* Match Arc Badge */}
                        <span className={`inline-flex items-center space-x-1 text-xs font-black px-3 py-1.5 rounded-full border ${scoreColorClass}`}>
                          <span>{uni.matchScore}% Match</span>
                        </span>
                      </div>

                      {/* Name of School */}
                      <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                        {uni.name}
                      </h4>

                      {/* Location and Rank Info */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-dashed border-slate-100 pb-3">
                        <span className="text-blue-600 font-black">QS Global Rank: #{uni.globalRank}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 stroke-[2] shrink-0 text-slate-400" />
                          <span>{uni.location}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">
                        {uni.description}
                      </p>

                      {/* Best Known Programs Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {uni.bestKnownFor.map(mj => (
                          <span key={mj} className="text-3xs font-extrabold bg-[#f1f5f9] text-slate-600 px-2.5 py-1 rounded-lg">
                            {mj}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements Footer Deck */}
                    <div className="bg-slate-50/85 rounded-2xl p-3.5 border border-slate-100 mt-auto">
                      <div className="grid grid-cols-3 gap-2.5 text-center text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        <div className="border-r border-slate-200/50">
                          <p className="mb-1 text-slate-400 font-bold">Min GPA</p>
                          <span className="text-slate-800 font-extrabold text-xs">{uni.minGPA}</span>
                        </div>
                        <div className="border-r border-slate-200/50">
                          <p className="mb-1 text-slate-400 font-bold">Min IELTS</p>
                          <span className="text-slate-800 font-extrabold text-xs">{uni.minIELTS}</span>
                        </div>
                        <div>
                          <p className="mb-1 text-slate-400 font-bold">Tuition Fees</p>
                          <span className="text-blue-600 font-black text-xs block truncate" title={uni.tuitionFeesPerYear}>
                            {uni.tuitionFeesPerYear.includes('No Tuition') ? 'Free/Low' : uni.tuitionFeesPerYear.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : finderTab === 'scholarships' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in" id="scholarships-list">
              {filteredScholarships.map(sch => {
                const scoreColorClass = 
                  sch.matchScore >= 80 
                    ? 'text-emerald-600 border-emerald-100 bg-emerald-50' 
                    : sch.matchScore >= 60 
                    ? 'text-amber-500 border-amber-100 bg-amber-50' 
                    : 'text-rose-500 border-rose-100 bg-rose-50';

                return (
                  <div 
                    key={sch.id} 
                    className="bg-white border border-slate-200/80 hover:border-blue-400/80 p-5 rounded-3xl shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top row elements */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex items-center space-x-1 bg-indigo-50 border border-indigo-100/60 px-2.5 py-1.5 rounded-lg text-indigo-700 text-[9px] font-black tracking-wider uppercase">
                          <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{sch.type}</span>
                        </span>

                        {/* Match Percentage */}
                        <span className={`inline-flex items-center space-x-1 text-xs font-black px-3 py-1.5 rounded-full border ${scoreColorClass}`}>
                          <span>{sch.matchScore}% Match</span>
                        </span>
                      </div>

                      {/* Title & Provider */}
                      <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1.5">
                        {sch.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-dashed border-slate-100 pb-3">
                        Provider: <span className="font-extrabold text-slate-600">{sch.provider}</span>
                      </p>

                      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                        {sch.description}
                      </p>

                      {/* Coverage parameters */}
                      <div className="space-y-2 mb-5 text-[10px] font-semibold text-slate-500">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400">Award Type:</span>
                          <span className="text-slate-800 font-extrabold bg-blue-50 text-blue-700 border border-blue-100/40 px-2 py-0.5 rounded-md text-[9px]">{sch.award}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-slate-400 mt-0.5 whitespace-nowrap">Major Fits:</span>
                          <span className="text-slate-700 font-bold">{sch.majorRestrictions.join(', ')}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-slate-400 mt-0.5 whitespace-nowrap">Destination Restriction:</span>
                          <span className="text-slate-700 font-bold">{sch.countryRestriction.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Criteria & Expiry deadlines */}
                    <div className="border-t border-slate-100 pt-4 mt-auto flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        <div>
                          Min GPA: <span className="text-slate-800 font-extrabold">{sch.minGPA}+</span>
                        </div>
                        <span className="text-slate-200">•</span>
                        <div>
                          Test: <span className="text-slate-800 font-extrabold">{sch.minIELTS}+</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 text-rose-500 bg-rose-50/60 border border-rose-100 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>Deadline: {sch.deadline.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* AI STUDY ABROAD MENTOR PANEL */
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6 animate-fade-in" id="ai-mentor-panel">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-3xl">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                    <span>ITP Universe AI Abroad Mentor</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Guiding Bangladeshi students step-by-step from IELTS target planning to final Visa file approval.
                  </p>
                </div>
                {/* Micro country switcher */}
                <div className="flex flex-wrap gap-1.5">
                  {['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany'].map(country => {
                    const countryEmojis: Record<string, string> = {
                      'United Kingdom': '🇬🇧',
                      'United States': '🇺🇸',
                      'Canada': '🇨🇦',
                      'Australia': '🇦🇺',
                      'Germany': '🇩🇪'
                    };
                    return (
                      <button
                        key={country}
                        onClick={() => {
                          setMentorCountry(country);
                          setActiveMentorStep(0);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 select-none active:scale-95 ${
                          mentorCountry === country
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-205 text-slate-650'
                        }`}
                      >
                        <span className="text-sm leading-none">{countryEmojis[country]}</span>
                        <span className="hidden sm:inline">{country}</span>
                        <span className="sm:hidden">{country.split(' ')[0] || country}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Steps selection strip */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                {(MENTOR_COUNTRY_GUIDES[mentorCountry] || []).map((step, idx) => {
                  const stepNames = [
                    '1. Language Prep',
                    '2. Uni Shortlist',
                    '3. Scholarship',
                    '4. SOP Writing',
                    '5. Visa & Funds'
                  ];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveMentorStep(idx)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer select-none ${
                        activeMentorStep === idx
                          ? 'bg-slate-905 text-white bg-slate-900 border-slate-900 shadow-md ring-2 ring-slate-950/15'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black uppercase tracking-wider opacity-60">Phase 0{idx + 1}</span>
                        {activeMentorStep === idx ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        ) : null}
                      </div>
                      <p className="text-xs font-black leading-tight">{stepNames[idx] || step.title}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active step details card & AI chatbot assistant combo */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Active mentor guideline details */}
                <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-xs relative flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-1">
                          Step-by-step Guidance
                        </span>
                        <h4 className="text-base font-black text-slate-900 leading-tight">
                          {(MENTOR_COUNTRY_GUIDES[mentorCountry] || [])[activeMentorStep]?.title}
                        </h4>
                      </div>
                      <span className="shrink-0 inline-flex self-start sm:self-center text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full">
                        {(MENTOR_COUNTRY_GUIDES[mentorCountry] || [])[activeMentorStep]?.badge}
                      </span>
                    </div>

                    {/* Clean markdown styled item body split */}
                    <div className="text-xs font-medium text-slate-600 leading-relaxed space-y-3.5">
                      {((MENTOR_COUNTRY_GUIDES[mentorCountry] || [])[activeMentorStep]?.markdown || '')
                        .split(' ')
                        .join(' ')
                        .split('. ')
                        .map((sentence, sIdx) => {
                          if (sentence.includes(':')) {
                            const [label, text] = sentence.split(':');
                            return (
                              <div key={sIdx} className="border-l-2 border-slate-200 pl-3 py-0.5 space-y-1">
                                <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider leading-none">{label}</span>
                                <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{text}</p>
                              </div>
                            );
                          }
                          return <p key={sIdx} className="font-semibold">{sentence}.</p>;
                        })}
                    </div>
                  </div>

                  {/* Recommendation action shortcut bottom bar */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Interactive Advisor</p>
                        <p className="text-xs font-black text-slate-800 leading-tight">Generate specific step details</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Quick prompt to ask about this step
                        handleSendMentorMessage(`Can you explain the timeline details and hurdles for Phase 0${activeMentorStep + 1}?`);
                      }}
                      className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs whitespace-nowrap active:scale-95 transition-all text-center"
                    >
                      Ask specific timeline
                    </button>
                  </div>
                </div>

                {/* AI Study Abroad Mentor micro-chatbot */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden flex flex-col justify-between" style={{ minHeight: '440px' }}>
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black tracking-tight leading-none">Counselor Assist</h5>
                        <p className="text-[9px] font-bold text-emerald-400 mt-0.5 leading-none">● AI Active Advisor</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-2 py-1 rounded-md uppercase tracking-wider">
                      {mentorCountry}
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[220px]" id="mentor-chat-feed">
                    {(mentorChatLogs[`${mentorCountry}-${activeMentorStep}`] || []).map((msg, mIdx) => (
                      <div
                        key={mIdx}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                      >
                        <div
                          className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-semibold ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/35'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick suggest topics buttons */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Quick expert questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {['How to prove bank solvency?', 'Typical visa success rates?', 'Sample SOP template advice?'].map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMentorMessage(q)}
                          className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[10px] text-slate-600 font-extrabold px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="p-3 border-t border-slate-150 flex items-center space-x-2 bg-white">
                    <input
                      type="text"
                      value={mentorInput}
                      onChange={(e) => setMentorInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMentorMessage();
                        }
                      }}
                      placeholder="Ask the AI Advisor..."
                      className="flex-1 bg-slate-50 border border-slate-200 pl-3 pr-3 py-2.5 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:font-medium"
                    />
                    <button
                      onClick={() => handleSendMentorMessage()}
                      className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm active:scale-95 transition-all outline-none"
                    >
                      Send
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* AI DETAILED EVALUATION & MATCH REPORT CARD (Dynamically loaded when clicking button) */}
          <div id="ai-match-report-section" className="transition-all duration-300">
            {aiReport ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden animate-fade-in">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                
                {/* Report Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Sparkles className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">Gemini Counselor Match Report</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Detailed evaluation custom compiled for {profile.name || 'Admissions Candidate'}</p>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right">
                    <div className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-250 font-black px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider">
                      Status: Active Evaluation
                    </div>
                  </div>
                </div>

                <div className="space-y-7">
                  
                  {/* Assessment Blocks: Strengths, Gaps, Strategy in high-end bento grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="assessment-metrics">
                    <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl">
                      <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-3">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                        <span>Core Strengths</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {aiReport.candidacyAssessment.strengths}
                      </p>
                    </div>

                    <div className="bg-rose-50/40 border border-rose-100 p-5 rounded-2xl">
                      <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider mb-3">
                        <AlertTriangle className="w-4.5 h-4.5 text-rose-600" />
                        <span>Profile Gaps</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {aiReport.candidacyAssessment.gaps}
                      </p>
                    </div>

                    <div className="bg-blue-50/40 border border-blue-105 p-5 rounded-2xl">
                      <div className="flex items-center space-x-2 text-blue-800 font-extrabold text-xs uppercase tracking-wider mb-3">
                        <TrendingUp className="w-4.5 h-4.5 text-blue-600" />
                        <span>Target Strategy</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {aiReport.candidacyAssessment.strategy}
                      </p>
                    </div>
                  </div>

                  {/* AI Recommeded Universities Column */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                      <span>Selected Curated Universities</span>
                    </h4>
                    <div className="space-y-3.5">
                      {aiReport.recommendedInstitutions.map((r, i) => (
                        <div key={i} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-200 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="w-6 h-6 bg-blue-100 text-blue-700 text-xs font-black rounded-lg flex items-center justify-center">#{i+1}</span>
                              <h5 className="font-extrabold text-slate-900 text-sm">{r.uniName}</h5>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{r.whyItFits}</p>
                            <span className="block text-[10px] text-blue-600 font-black mt-3 uppercase tracking-wider leading-none">💡 Application Tip: {r.tipsToApply}</span>
                          </div>
                          <div className="shrink-0 text-left md:text-right md:border-l border-slate-200/60 md:pl-6">
                            <span className="text-3xl font-black text-blue-600 tracking-tight">{r.matchPercentage}%</span>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Estimate Fit</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommended Scholarships Column */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                      <span>Selected Curated Scholarships</span>
                    </h4>
                    <div className="space-y-3.5">
                      {aiReport.recommendedScholarships.map((s, i) => (
                        <div key={i} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-200 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="w-6 h-6 bg-indigo-100 text-indigo-700 text-xs font-black rounded-lg flex items-center justify-center">#{i+1}</span>
                              <h5 className="font-extrabold text-slate-900 text-sm">{s.scholarshipName}</h5>
                            </div>
                            <p className="text-xs text-slate-505 font-medium leading-relaxed">{s.whyItFits}</p>
                            <span className="block text-[10px] text-indigo-600 font-black mt-3 uppercase tracking-wider leading-none">🚀 Candidate Action: {s.actionPlan}</span>
                          </div>
                          <div className="shrink-0 text-left md:text-right md:border-l border-slate-200/60 md:pl-6">
                            <span className="text-3xl font-black text-indigo-600 tracking-tight">{s.matchPercentage}%</span>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Match probability</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Statement of Purpose Guide */}
                  <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden" id="essay-blueprint-box">
                    <div className="absolute right-[-10%] bottom-[-20%] w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
                    
                    <div className="flex items-center space-x-3 mb-5 border-b border-slate-800 pb-4">
                      <FileText className="w-5 h-5 text-amber-400" />
                      <h4 className="font-extrabold text-slate-100 text-sm uppercase tracking-wider">Statement of Purpose Blueprint</h4>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Strong Opening Narrative Idea</span>
                        <p className="text-xs text-slate-200 font-medium italic leading-relaxed mt-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
                          "{aiReport.customEssayGuide.hookIdea}"
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">Key Talking Points to Feature</span>
                        <ul className="space-y-2.5">
                          {aiReport.customEssayGuide.keyTalkingPoints.map((tp, idx) => (
                            <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed">
                              <span className="w-5 h-5 rounded-lg bg-slate-800 text-[#ffbe21] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-slate-700/50">{idx + 1}</span>
                              <span className="text-slate-300 font-medium">{tp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : isEvaluating ? (
              <div className="p-12 border border-slate-200 bg-white rounded-3xl shadow-sm text-center space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
                    <div className="w-4 h-4 bg-indigo-600 rounded-full absolute top-4 left-4 animate-ping"></div>
                  </div>
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Reviewing Credentials with Admissions Board...</h4>
                <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                  Indexing requirement tables and matching your linguistic values to current scholarship matrices...
                </p>
              </div>
            ) : (
              <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center space-y-3">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto stroke-[1.5]" />
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Unlock AI Counselor Match Report</h4>
                <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                  Fill in your background highlights in the constructor on the left and click "Generate AI Study Report" to analyze.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
