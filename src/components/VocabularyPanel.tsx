import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, RotateCw, Plus, Star } from 'lucide-react';
import { ExamType, SavedVocabulary } from '../types';

interface VocabularyPanelProps {
  activeExam: ExamType;
  savedWords: SavedVocabulary[];
  onAddWord: (word: SavedVocabulary) => void;
}

export const EXAM_VOCAB_SAMPLES: Record<ExamType, SavedVocabulary[]> = {
  IELTS: [
    { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.', example: 'To improve environmental metrics, nations must adopt pragmatic, executable policies.', synonyms: ['Practical', 'Realistic', 'Sensible'], exam: 'IELTS' },
    { word: 'Pivotal', definition: 'Of crucial importance in relation to the development or success of something else.', example: 'The study Center played a pivotal role in boosting student mock band scores.', synonyms: ['Crucial', 'Essential', 'Critical'], exam: 'IELTS' },
    { word: 'Substantiate', definition: 'Provide evidence to support or prove the truth of.', example: 'You must substantiate your Task 2 essay argument with historic data parameters.', synonyms: ['Verify', 'Validate', 'Corroborate'], exam: 'IELTS' },
    { word: 'Alleviate', definition: 'Make suffering or a problem less severe.', example: 'Targeted subways alleviated city traffic issues.', synonyms: ['Relieve', 'Mitigate', 'Ease'], exam: 'IELTS' },
  ],
  TOEFL: [
    { word: 'Empirical', definition: 'Based on, concerned with, or verifiable by observation or experience rather than theory.', example: 'Astronomers require empirical proof before validating extreme planet hypotheses.', synonyms: ['Observational', 'Factual', 'Concrete'], exam: 'TOEFL' },
    { word: 'Anomalous', definition: 'Deviating from what is standard, normal, or expected.', example: 'The sample had anomalous seismic waves, hinting at magma streams.', synonyms: ['Abnormal', 'Irregular', 'Atypical'], exam: 'TOEFL' },
    { word: 'Equilibrium', definition: 'A state in which opposing forces or influences are balanced.', example: 'Glacial systems maintain a delicate physical mass equilibrium.', synonyms: ['Balance', 'Stability', 'Symmetry'], exam: 'TOEFL' },
    { word: 'Paradox', definition: 'A seemingly absurd or self-contradictory statement or proposition that when investigated or explained may prove to be well founded or true.', example: 'The economic paradox where high taxes occasionally trigger investment surges.', synonyms: ['Contradiction', 'Enigma', 'Puzzle'], exam: 'TOEFL' },
  ],
  PTE: [
    { word: 'Catalyze', definition: 'Cause an action or process to begin or accelerate.', example: 'Heavy AI automation catalyzed workspace restructuring.', synonyms: ['Accelerate', 'Spur', 'Trigger'], exam: 'PTE' },
    { word: 'Systemic', definition: 'Relating to a system as a whole, rather than localized parts.', example: 'The economic sector faces systemic risks due to supply bottlenecks.', synonyms: ['Universal', 'Widespread', 'Wholesale'], exam: 'PTE' },
    { word: 'Delineate', definition: 'Describe or portray something precisely.', example: 'The bar graph delineates rapid oil consumption surges from 2005 onwards.', synonyms: ['Outline', 'Depict', 'Specify'], exam: 'PTE' },
    { word: 'Prevalent', definition: 'Widespread in a particular area or at a particular time.', example: 'Smartphone usage remains prevalent across suburban demographics.', synonyms: ['Common', 'Frequent', 'Ubiquitous'], exam: 'PTE' },
  ],
};

export default function VocabularyPanel({ activeExam, savedWords, onAddWord }: VocabularyPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  // Custom User Input fields for adding new terms
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newEx, setNewEx] = useState('');

  const curatedWords = EXAM_VOCAB_SAMPLES[activeExam] || [];
  const combinedList = [...curatedWords, ...savedWords.filter((w) => w.exam === activeExam)];

  const filteredWords = combinedList.filter(
    (w) =>
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.synonyms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentTerm = filteredWords[activeWordIdx % Math.max(1, filteredWords.length)] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveWordIdx((prev) => (prev + 1) % Math.max(1, filteredWords.length));
    }, 150);
  };

  const handleAddNewWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newDef) return;
    onAddWord({
      word: newWord,
      definition: newDef,
      example: newEx || 'Study example for context.',
      synonyms: ['Custom learned term'],
      exam: activeExam,
    });
    setNewWord('');
    setNewDef('');
    setNewEx('');
    alert(`Success: "${newWord}" added in your local flashcard index!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full" id="vocabulary-panel-container">
      {/* Flashcards Engine - Left 7 columns */}
      <div className="lg:col-span-7 flex flex-col" id="flashcards-widget">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
              {activeExam} Vocabulary Flashcards
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            {filteredWords.length > 0 ? `${(activeWordIdx % filteredWords.length) + 1} of ${filteredWords.length}` : '0 of 0'} Terms
          </span>
        </div>

        {/* Card Flip Core Area */}
        {currentTerm ? (
          <div className="perspective-1000 h-80 relative w-full mb-4">
            <div
              className={`w-full h-full duration-500 transform-style-3d relative cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* SIDE A: Front */}
              <div className="absolute w-full h-full backface-hidden bg-linear-to-b from-blue-600 to-indigo-700 text-white p-8 rounded-3xl flex flex-col justify-between shadow-lg shadow-blue-100">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full">
                    {currentTerm.exam} Recommended
                  </span>
                  <RotateCw className="w-5 h-5 text-white/60 hover:text-white" />
                </div>

                <div className="text-center py-6">
                  <h4 className="text-4xl font-extrabold tracking-tight mb-2 select-all">{currentTerm.word}</h4>
                  <p className="text-xs text-white/80 font-bold uppercase tracking-widest">
                    Click to view definition
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-white/70 font-semibold border-t border-white/10 pt-4">
                  <span>Category: Academic List</span>
                  <span>Flip card ✨</span>
                </div>
              </div>

              {/* SIDE B: Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border border-gray-100 p-8 rounded-3xl flex flex-col justify-between shadow-md">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Definition & Context
                  </span>
                  <RotateCw className="w-5 h-5 text-gray-400" />
                </div>

                <div className="py-4 space-y-3 overflow-y-auto max-h-48">
                  <h5 className="text-lg font-black text-slate-800">{currentTerm.word}</h5>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    <strong className="text-blue-600">Definition:</strong> {currentTerm.definition}
                  </p>
                  <p className="text-xs text-slate-500 italic font-medium">
                    <strong className="text-slate-800 not-italic font-bold">Example:</strong> "{currentTerm.example}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentTerm.synonyms.map((s, idx) => (
                      <span key={idx} className="bg-gray-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-bold border-t border-gray-100 pt-4 text-center">
                  Click anywhere to flip front
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-80 w-full bg-gray-50 rounded-3xl flex flex-col items-center justify-center border border-dashed border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">No words match search criteria</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center space-x-3 w-full">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all border border-gray-100 uppercase tracking-wider cursor-pointer"
          >
            Flip Card
          </button>
          <button
            onClick={handleNext}
            disabled={filteredWords.length <= 1}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-blue-100 hover:shadow-lg uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Next Card</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dictionary Search & Custom word insertion - Right 5 columns */}
      <div className="lg:col-span-5 space-y-6" id="dictionary-control-panel">
        {/* Dictionary Search */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
          <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3">Dictionary Look Up</h4>
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveWordIdx(0);
              }}
              placeholder="Search words or synonyms..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Add Personal Term */}
        <form onSubmit={handleAddNewWordSubmit} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-3.5">
          <div className="flex items-center space-x-2 pb-1 border-b border-gray-50">
            <Plus className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Add Custom Vocabulary</h4>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">New Vocab Word</label>
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="e.g. Obsequious"
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Definition</label>
            <textarea
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              placeholder="e.g. Obedient or attentive to an excessive, servile degree"
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-100 h-16 resize-none"
              required
            ></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Context Example</label>
            <input
              type="text"
              value={newEx}
              onChange={(e) => setNewEx(e.target.value)}
              placeholder="e.g. The assistant was humble to the point of being obsequious."
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
          >
            Add to Flashcards
          </button>
        </form>
      </div>
    </div>
  );
}
