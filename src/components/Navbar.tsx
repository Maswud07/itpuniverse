import React from 'react';
import { FileText, Award, GraduationCap, ChevronDown, User, HeartHandshake, HelpCircle } from 'lucide-react';
import { ExamType } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeExam: ExamType;
  setActiveExam: (exam: ExamType) => void;
  onReviewsClick?: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, activeExam, setActiveExam, onReviewsClick }: NavbarProps) {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Upper Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div 
            onClick={() => {
              if (activeExam === 'PTE' || activeExam === 'TOEFL') {
                setCurrentTab('Mock Tests');
              } else {
                setCurrentTab('Home');
              }
            }} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo"
          >
            <span className="font-sans font-extrabold text-xl tracking-tight text-slate-800">
              ITP Universe
            </span>
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

          {/* Dynamic Exam switcher */}
          <div className="flex items-center space-x-1" id="exam-selector-container">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-1">Exam:</span>
            {(['IELTS', 'TOEFL', 'PTE'] as ExamType[]).map((exam) => (
              <button
                key={exam}
                id={`btn-exam-${exam}`}
                onClick={() => {
                  setActiveExam(exam);
                  if (exam === 'PTE' || exam === 'TOEFL') {
                    setCurrentTab('Mock Tests');
                  }
                }}
                className={`px-3 py-1 text-xs font-black rounded-full transition-all ${
                  activeExam === exam
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden md:block"></div>

          {/* Official Partnership status */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-gray-500" id="partnership-badge">
            <span className="text-gray-400">Official Partner of</span>
            {activeExam === 'IELTS' ? (
              <div className="flex items-center space-x-1">
                <span className="font-extrabold bg-linear-to-r from-red-500 to-indigo-600 bg-clip-text text-transparent">idp</span>
                <span className="font-black text-gray-700">IELTS</span>
              </div>
            ) : activeExam === 'TOEFL' ? (
              <div className="flex items-center space-x-1 text-teal-600 font-bold">
                <span>ETS TOEFL Academy</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-orange-600 font-bold">
                <span>Pearson PTE Global</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a 
            href="#reviews" 
            onClick={(e) => {
              if (onReviewsClick) {
                e.preventDefault();
                onReviewsClick();
              } else {
                setCurrentTab('Mock Tests');
              }
            }} 
            className="text-gray-500 hover:text-blue-600 text-xs font-semibold tracking-wide hidden lg:inline"
          >
            Reviews
          </a>
          <button onClick={() => setCurrentTab('Blog')} className="text-gray-500 hover:text-blue-600 text-xs font-semibold tracking-wide hidden lg:inline cursor-pointer">Blog</button>
          <button onClick={() => setCurrentTab('Community')} className="text-gray-500 hover:text-blue-600 text-xs font-semibold tracking-wide hidden lg:inline cursor-pointer">Community</button>
          
          <button 
            onClick={() => setCurrentTab('Plans')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-md shadow-blue-100 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="purchase-btn"
          >
            Plans
          </button>
          
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-slate-800 transition-colors" id="profile-btn">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Sub-Navbar menu tabs (Matches exact list and visual layout below header) */}
      {currentTab !== 'Community' && currentTab !== 'Blog' && (
         <div className="w-full bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 h-12 items-center" id="nav-tabs">
              {(() => {
                if (activeExam === 'TOEFL') {
                   return [
                     { id: 'Mock Tests', label: 'Mock Tests' },
                     { id: 'Practice Questions', label: 'Practice Questions' },
                     { id: 'Study Center', label: 'Lessons' },
                     { id: 'Vocab Chart', label: 'Vocab Chart 🔠' },
                     { id: 'Finder', label: 'Uni & Scholarship Finder 🌍' },
                     { id: 'Test Records', label: 'Test Records' },
                     { id: 'Plans', label: 'Plans 🏷️' }
                   ];
                 } else if (activeExam === 'PTE') {
                   return [
                     { id: 'Home', label: 'Home' },
                     { id: 'Mock Tests', label: 'Mock Tests' },
                     { id: 'Vocab Chart', label: 'Vocab Chart 🔠' },
                     { id: 'Finder', label: 'Uni & Scholarship Finder 🌍' },
                     { id: 'Test Records', label: 'Test Records' },
                     { id: 'Plans', label: 'Plans 🏷️' }
                   ];
                 } else {
                   return [
                     { id: 'Home', label: 'Home' },
                     { id: 'Study Center', label: 'Study Center' },
                     { id: 'Mock Tests', label: 'Mock Tests' },
                     { id: 'Practice Questions', label: 'Practice Questions' },
                     { id: 'Vocab Chart', label: 'Vocab Chart 🔠' },
                     { id: 'Finder', label: 'Uni & Scholarship Finder 🌍' },
                     { id: 'Test Records', label: 'Test Records' },
                     { id: 'Plans', label: 'Plans 🏷️' }
                   ];
                 }
              })().map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    if (activeExam === 'PTE' && tab.id === 'Home') {
                      setCurrentTab('Mock Tests');
                    } else {
                      setCurrentTab(tab.id);
                    }
                  }}
                  className={`h-full text-xs font-bold tracking-wider relative flex items-center transition-colors px-1 cursor-pointer ${
                    currentTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
