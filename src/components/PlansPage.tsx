import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showMoreFAQs, setShowMoreFAQs] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Pricing constants (exactly matching the screenshot proportions + 40% annual discount)
  const essentialMonthly = 8.99;
  const premiumMonthly = 11.99;
  
  const essentialAnnual = parseFloat((essentialMonthly * 0.6).toFixed(2));
  const premiumAnnual = parseFloat((premiumMonthly * 0.6).toFixed(2));

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmittedEmail(true);
      setEmailInput('');
      setTimeout(() => setSubmittedEmail(false), 5000);
    }
  };

  const initialFAQs: FAQItem[] = [
    {
      question: "Will my subscription recur automatically?",
      answer: "Yes, both monthly and annual subscription plans are set to renew automatically for uninterrupted access to mock tests, practice banks, and video masterclasses. You can easily turn off auto-renew or cancel your subscription at any time directly through your general account dashboard settings with a single click."
    },
    {
      question: "Can subscribers download study materials and templates on ITP Universe?",
      answer: "Yes! High-tier subscribers have unlimited access to download our proprietary writing templates, speaking high-scorer cheat sheets, offline study planners, and vocabulary guides. While full-length simulation software runs online to correctly mimic official exam conditions with live grading, core preparation guides are downloadable in PDF format."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Absolutely! There are no long-term contracts, commitments, or hidden cancellation fees. You can modify your subscription status or downgrade your active package whenever you like. After cancellation, you'll retain complete access to all plan materials until the final day of your existing billing cycle."
    },
    {
      question: "What does 'lifetime access' really mean?",
      answer: "Lifetime access means you make a single, one-time payment of $299 and gain lifetime membership to our platform! This encompasses all current and future Mock Test papers, full curriculum revisions, AI score-estimation engines, speaking assessments, and any upcoming syllabus updates for IELTS, TOEFL, and PTE forever."
    }
  ];

  const additionalFAQs: FAQItem[] = [
    {
      question: "Is there a refund policy?",
      answer: "Yes, we provide a 30-day money-back guarantee for all newly enrolled students. If you aren't fully satisfied with the depth of our mock test analysis, study schedules, or skill score prediction engines, just notify our support team within 30 days of purchase for a prompt full refund."
    },
    {
      question: "Do the mock tests mimic the real IELTS, TOEFL, and PTE exams?",
      answer: "Yes! Our mock exam platforms are engineered to perfectly mirror the exact timing constraints, visual interface structures, and question flows of Cambridge IELTS, ETS TOEFL, and Pearson PTE. This is designed to get you completely comfortable with actual testing software before test day."
    },
    {
      question: "Which mock test grading system does the platform use?",
      answer: "We use a hybrid of automated statistical feedback and dynamic AI metrics calibrated directly with historical band-score criteria. Speaking audio files and writing essays are graded according to criteria matching official examiner guidelines to provide highly realistic feedback."
    }
  ];

  const activeFAQs = showMoreFAQs ? [...initialFAQs, ...additionalFAQs] : initialFAQs;

  return (
    <div className="w-full bg-[#f8fafc] text-[#1e293b] text-left select-none min-h-screen relative overflow-hidden font-sans">
      
      {/* ---------------- DECORATIVE FLOATING BALLS / GLOWS (MATCHES SCREENSHOT) ---------------- */}
      {/* Top Left Peach Light Spot */}
      <div className="absolute top-10 left-[-5%] w-48 h-48 rounded-full bg-[#fae8ff]/70 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-[10%] left-[-2%] w-12 h-12 rounded-full bg-[#fef08a] opacity-60 blur-md pointer-events-none z-0"></div>
      
      {/* Top Right Peach Spot */}
      <div className="absolute top-[15%] right-[10%] w-8 h-8 rounded-full bg-rose-200 opacity-60 blur-xs pointer-events-none z-0"></div>
      
      {/* Center Left Teal Gradient Glow */}
      <div className="absolute top-[35%] left-[-150px] w-[300px] h-[300px] rounded-full bg-cyan-100/60 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-[48%] left-[-40px] w-40 h-40 rounded-full bg-cyan-200/50 blur-xl pointer-events-none z-0"></div>
      <div className="absolute top-[52%] left-[-20px] w-24 h-24 rounded-full bg-teal-200/40 blur-md pointer-events-none z-0"></div>

      {/* Middle Right Big Pink Spot */}
      <div className="absolute top-[28%] right-[-50px] w-[200px] h-[200px] rounded-full bg-rose-100/80 blur-3xl pointer-events-none z-0"></div>

      {/* Bottom Right Light Teal Spot */}
      <div className="absolute bottom-[30%] right-[3%] w-8 h-8 rounded-full bg-cyan-200 opacity-60 blur-xs pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[2%] w-10 h-10 rounded-full bg-cyan-300 opacity-60 blur-xs pointer-events-none z-0"></div>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10 text-center">
        
        {/* Title area (Matched with ITP Universe theme) */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight mb-4">
          Launch your <span className="text-[#FFAA00] underline decoration-yellow-400 decoration-wavy underline-offset-4">ITP Universe</span> journey today! 🚀
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-bold mb-10 max-w-lg mx-auto">
          Choose a comprehensive prep plan that's right for you.
        </p>

        {/* ---------------- MONTHLY / ANNUAL TOGGLE (MATCHES SCREENSHOT) ---------------- */}
        <div className="flex items-center justify-center space-x-4 mb-16 select-none">
          <span className={`text-xs font-black transition-all ${!isAnnual ? 'text-slate-800' : 'text-slate-400'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-cyan-500 rounded-full p-1 transition-all duration-300 focus:outline-none relative shadow-inner cursor-pointer"
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-black transition-all ${isAnnual ? 'text-slate-800 font-black' : 'text-slate-400 font-bold'}`}>Annual</span>
            <span className="bg-[#ff4b55] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              40% discount
            </span>
          </div>
        </div>

        {/* ---------------- 4-COL PRICING CARDS GRID (EXACTLY MATCHING SCREENSHOT) ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
          
          {/* Card 1: Free */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden">
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Free</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-8">Learn the basics</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-cyan-500 font-black text-2xl mr-1">$</span>
                <span className="text-4xl font-extrabold text-cyan-500 tracking-tight">0</span>
              </div>

              {/* Cyan outline button */}
              <button 
                onClick={() => alert("Your Free Account is active! Explore Mock Tests and Finder tools on our platform.")}
                className="w-full py-2.5 rounded-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-black text-xs transition-all tracking-wider uppercase mb-8 cursor-pointer"
              >
                Create a free account
              </button>

              {/* List features with orange/gold checkmark indicator block */}
              <ul className="space-y-4 text-xs text-slate-600 font-semibold">
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Full access to IELTS/TOEFL/PTE score calculators</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>1 Free diagnostic full-length Mock Test</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>50+ General practice tasks & model answers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Free access to University & Scholarship Finder</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Essential Prep (Watch Equivalent) */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black text-slate-800">Essential</h3>
                <span className="bg-amber-100/80 border border-amber-200 text-amber-700 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase">
                  Subscribe
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-8">Access to all strategy masterclasses</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-cyan-500 font-black text-2xl mr-1">$</span>
                <span className="text-4xl font-extrabold text-cyan-500 tracking-tight">
                  {isAnnual ? essentialAnnual : essentialMonthly}
                </span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ mo</span>
              </div>

              {/* Cyan outline button */}
              <button 
                onClick={() => alert(`Enrolling in ITP Essential Prep Plan. Annual discount applied: ${isAnnual ? "Yes (40% Off)" : "No"}`)}
                className="w-full py-2.5 rounded-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-black text-xs transition-all tracking-wider uppercase mb-8 cursor-pointer"
              >
                Start learning
              </button>

              {/* List features */}
              <ul className="space-y-4 text-xs text-slate-600 font-semibold">
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Everything with the Free Account</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>1,200+ Video strategy lessons & guides</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Downloadable template handouts from each lesson</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Premium Success (Learn Equivalent) */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black text-slate-800">Learn</h3>
                <span className="bg-amber-100/80 border border-amber-200 text-amber-700 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase">
                  Subscribe
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-8">The comprehensive test preparation</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-cyan-500 font-black text-2xl mr-1">$</span>
                <span className="text-4xl font-extrabold text-cyan-500 tracking-tight">
                  {isAnnual ? premiumAnnual : premiumMonthly}
                </span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ mo</span>
              </div>

              {/* Cyan outline button */}
              <button 
                onClick={() => alert(`Enrolling in ITP premium 'Learn' Prep Plan. Annual discount applied: ${isAnnual ? "Yes (40% Off)" : "No"}`)}
                className="w-full py-2.5 rounded-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-black text-xs transition-all tracking-wider uppercase mb-8 cursor-pointer"
              >
                Start learning
              </button>

              {/* List features */}
              <ul className="space-y-4 text-xs text-slate-600 font-semibold">
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Everything you need to score Band 8+/80+</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Full structured mock strategy curricula</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>15+ Premium automated mock exams</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>5,000+ interactive prep questions with AI feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>12,000+ targeted key-vocabulary deck cards</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Lifetime Learner (RED THEME + BEST DEAL GOLD LABEL) */}
          <div className="bg-white border-2 border-red-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden transform hover:-translate-y-1">
            {/* Gold Ribbon Label */}
            <div className="absolute top-4 right-[-32px] bg-[#FFAA00] text-slate-900 font-extrabold text-[9px] uppercase tracking-widest px-10 py-1 rotate-45 select-none shadow-sm">
              Best Deal
            </div>

            <div>
              {/* Header block with solid Red Background */}
              <div className="bg-[#DA251D] p-6 text-white relative">
                <h3 className="text-xl font-black mb-1">Lifetime Learner</h3>
                <p className="text-[10px] font-extrabold opacity-85 uppercase tracking-wider">Lifetime access to ITP Universe!</p>
              </div>

              <div className="p-6">
                <div className="flex items-baseline mb-8">
                  <span className="text-[#DA251D] font-black text-2xl mr-1">$</span>
                  <span className="text-4xl font-extrabold text-[#DA251D] tracking-tight">299</span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-8 leading-none">one-time payment</p>

                {/* Solid Red button */}
                <button 
                  onClick={() => alert("Thank you for choosing ITP Universe! Connecting with security checkout module...")}
                  className="w-full py-3 rounded-full bg-[#DA251D] hover:bg-neutral-800 text-white font-extrabold text-xs transition-all tracking-wider uppercase mb-8 cursor-pointer shadow-md shadow-red-200"
                >
                  Launch your journey
                </button>

                {/* List features */}
                <ul className="space-y-4 text-xs text-slate-600 font-semibold">
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Lifetime access to everything in our Premium plans</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>No recurring payments or update costs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-white shrink-0 mr-2.5 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Priority student application & scholarship audits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------- FREQUENTLY ASKED QUESTIONS (FAQS) ---------------- */}
        <div className="max-w-3xl mx-auto mt-24 mb-20 text-left">
          <h2 className="text-3xl font-extrabold text-center text-slate-800 tracking-tight mb-2">
            Frequently Asked <span className="text-[#FFAA00]">Questions</span>
          </h2>
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-10">
            Got queries? We have answers.
          </p>

          <div className="space-y-3">
            {activeFAQs.map((faq, idx) => {
              const isExpanded = expandedFAQ === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-3xs transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-slate-805 hover:text-cyan-600 font-black text-sm tracking-tight transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMoreFAQs(!showMoreFAQs)}
              className="px-6 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-550 hover:bg-slate-50 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>{showMoreFAQs ? "Show Less" : "More FAQs"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreFAQs ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </div>
        </div>

        {/* ---------------- LOWER HERO CTA SECTION ---------------- */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-4xs overflow-hidden relative mb-20">
          <div className="absolute top-[-40px] right-[-40px] p-2 opacity-[0.03]">
            <Sparkles className="w-32 h-32 text-cyan-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-850 tracking-tight mb-4">
            Join us and score higher on your IELTS, TOEFL & PTE tests!
          </h2>
          <button 
            onClick={() => alert("Welcome to ITP Universe! Setup your profile and begin testing instantly on the Home tab.")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-xs px-8 py-3 rounded-full transition-all tracking-wider uppercase cursor-pointer shadow-md shadow-cyan-100"
          >
            Get started
          </button>
        </div>

      </div>

    </div>
  );
}
