import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Pause,
  Clock,
  Mic,
  Square,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Copy,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Check,
} from 'lucide-react';
import { MockTest, Question, ScoreEvaluation, UserTestRecord } from '../types';

interface InteractiveTestPanelProps {
  test: MockTest;
  onClose: () => void;
  onSaveRecord: (newRecord: UserTestRecord) => void;
  selectedScoreRange: string;
}

export default function InteractiveTestPanel({
  test,
  onClose,
  onSaveRecord,
  selectedScoreRange,
}: InteractiveTestPanelProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQuestion = test.questions[currentIdx];

  // Scoring/Evaluation states
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState(false);
  const [showAudioTranscript, setShowAudioTranscript] = useState(false);

  // Microphone and audio levels logic
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Evaluation return data
  const [evaluation, setEvaluation] = useState<ScoreEvaluation | null>(null);
  const [copiedModelAnswer, setCopiedModelAnswer] = useState(false);

  // Section Time limits states in seconds
  const [timeRemaining, setTimeRemaining] = useState(currentQuestion ? currentQuestion.timeLimit : 600);

  useEffect(() => {
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.timeLimit);
      setEvaluation(null);
    }
  }, [currentIdx, currentQuestion]);

  // Overall Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer finished
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx]);

  // Decibel simulation oscillator for Speaking page
  useEffect(() => {
    if (isRecording) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let angle = 0;
      const draw = () => {
        if (!isRecording) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#3b82f6'; // blue-500

        for (let x = 0; x < canvas.width; x++) {
          // Create organic oscillating standard audio simulation waves
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.05 + angle) * 20 * Math.sin(x * 0.01) * (Math.random() * 0.4 + 0.8);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        angle += 0.15;
        animationRef.current = requestAnimationFrame(draw);
      };

      animationRef.current = requestAnimationFrame(draw);

      // Start recording seconds tracker
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setRecordingSeconds(0);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center bg-white border border-gray-100 rounded-3xl">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-sm font-bold text-slate-800">No active questions available in this study packet</p>
      </div>
    );
  }

  const handleSelectOption = (opt: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt }));
  };

  const handleTextChange = (text: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: text }));
  };

  const startMicrophoneRecording = () => {
    setIsRecording(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: `[Pre-recorded audio segment: ${test.exam} Speaking section answer simulation]`,
    }));
  };

  const stopMicrophoneRecording = () => {
    setIsRecording(false);
  };

  const handleTriggerEvaluation = async () => {
    const rawAnswer = userAnswers[currentQuestion.id] || '';

    if (!rawAnswer.trim() && currentQuestion.type !== 'multiple-choice') {
      alert('Action Required: Please write/speak an answer before submitting for AI grading!');
      return;
    }

    setIsSubmitting(true);
    setEvaluation(null);

    // If it is a multiple-choice question, evaluate immediate correct/incorrect
    if (currentQuestion.type === 'multiple-choice') {
      const isCorrect = rawAnswer === currentQuestion.correctAnswer;
      const scoreNum = isCorrect ? 9 : 1;
      const outOfVal = 9;

      // Build instant feedback simulated output
      setTimeout(() => {
        const dummyResult: ScoreEvaluation = {
          score: scoreNum,
          outOf: outOfVal,
          band: isCorrect ? 'Correct Answer (Band 9)' : 'Incorrect Answer (Band 1)',
          feedback: {
            criteria: [
              {
                name: 'Accuracy',
                score: isCorrect ? 9 : 1,
                bestRating: 9,
                details: isCorrect
                  ? 'Excellent job! You correctly analyzed the reading or listening resource parameters.'
                  : `Your selected choice: "${rawAnswer}" is incorrect. The expected correct option is "${currentQuestion.correctAnswer}". Review the context closely!`,
              },
            ],
            generalFeedback: isCorrect
              ? 'Outstanding observation. You matched key academic parameters with precision!'
              : 'Don’t worry! Language exams can be tricky. Try reviewing the signpost sentences or reading texts to isolate exact key metrics.',
            suggestedModelAnswer: `The correct selection is: ${currentQuestion.correctAnswer}`,
            grammarCorrections: [],
          },
        };
        setEvaluation(dummyResult);
        setIsSubmitting(false);
      }, 800);
      return;
    }

    // Server-side evaluation via Gemini AI
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exam: test.exam,
          section: currentQuestion.section,
          questionTitle: currentQuestion.title,
          questionPrompt: currentQuestion.prompt,
          userResponse: rawAnswer,
          currentScoreRange: selectedScoreRange,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error status during evaluation');
      }

      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
      alert('Unable to load AI feedback. Please secure API config.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveResultRecord = () => {
    if (!evaluation) return;

    // Map section scores
    const record: UserTestRecord = {
      id: Math.random().toString(),
      id_date: new Date().toISOString(),
      exam: test.exam,
      testTitle: `${test.title} - ${currentQuestion.section}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      overallScore: evaluation.score,
      overallOutOf: evaluation.outOf,
      sections: [
        {
          name: currentQuestion.section,
          score: evaluation.score,
          outOf: evaluation.outOf,
        },
      ],
      evaluation,
    };

    onSaveRecord(record);
    alert('Success: Your mock test item has been archived securely in "Test Records" tab!');
  };

  const handleCopyModel = () => {
    if (!evaluation) return;
    navigator.clipboard.writeText(evaluation.feedback.suggestedModelAnswer);
    setCopiedModelAnswer(true);
    setTimeout(() => setCopiedModelAnswer(false), 2000);
  };

  // Helper formatting for countdown timer
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const wordCount = (userAnswers[currentQuestion.id] || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-slate-50/50 min-h-screen py-6 px-4 md:px-8" id="interactive-test-sandbox">
      <div className="max-w-7xl mx-auto">
        {/* Upper Header Control panel */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 flex flex-col md:flex-row items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-gray-100 hover:bg-gray-50 text-slate-500 hover:text-slate-800 transition-colors"
              title="Return to Menu"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                {test.exam} Interactive Training
              </span>
              <h2 className="text-base font-black text-slate-800 mt-1">{test.title}</h2>
            </div>
          </div>

          {/* Section Selector Grid */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {test.questions.map((q, idx) => {
              const isCompleted = userAnswers[q.id] !== undefined;
              const isActive = idx === currentIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                      : 'bg-white text-slate-600 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <span>
                    {q.section === 'Listening'
                      ? '🎧'
                      : q.section === 'Reading'
                      ? '📖'
                      : q.section === 'Writing'
                      ? '✍️'
                      : '🗣️'}
                  </span>
                  <span>{q.section}</span>
                  {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sandboxed Body - Left Panel: Prompt elements / Right Panel: Submission Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Context Box (Passages, Transcripts, Prompts) - 6 columns */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs relative">
              {/* Badge/Timer overlay */}
              <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Step {currentIdx + 1} of {test.questionsCount}: {currentQuestion.title}
                </span>

                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full font-bold text-xs ${
                    timeRemaining < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>

              {/* Listening section Player Controls */}
              {currentQuestion.section === 'Listening' && currentQuestion.audioText && (
                <div className="bg-blue-50/50 border border-blue-50 rounded-2xl p-4 mb-6" id="audio-demo-player">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-bold text-blue-800">Academic Audio Track</span>
                    </div>
                    <button
                      onClick={() => setShowAudioTranscript(!showAudioTranscript)}
                      className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      {showAudioTranscript ? 'Hide Transcript' : 'View Transcript'}
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-blue-100">
                    <button
                      onClick={() => setActiveAudioPlaying(!activeAudioPlaying)}
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-100 hover:scale-105 transition-all cursor-pointer"
                    >
                      {activeAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    <div className="flex-1">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-blue-600 transition-all duration-1000 ${
                            activeAudioPlaying ? 'w-2/3' : 'w-1/6'
                          }`}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold mt-1.5 block">
                        {activeAudioPlaying ? 'Playing Simulation audio...' : 'Audio Loaded (Paused)'}
                      </span>
                    </div>
                  </div>

                  {showAudioTranscript && (
                    <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100 max-h-48 overflow-y-auto text-xs text-slate-600 font-medium leading-relaxed">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Transcript</p>
                      {currentQuestion.audioText}
                    </div>
                  )}
                </div>
              )}

              {/* Reading Passage Block */}
              {currentQuestion.passage && (
                <div className="bg-slate-50/50 border border-gray-100 rounded-2xl p-5 mb-6 max-h-80 overflow-y-auto" id="reading-passage">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                    Official Reference Text
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">{currentQuestion.passage}</p>
                </div>
              )}

              {/* Main Instruction Prompt */}
              <div className="space-y-3" id="prompt-content">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-mono">
                  Question Prompt
                </span>
                <p className="text-sm font-extrabold text-slate-800 leading-snug">{currentQuestion.prompt}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Active Response Area & AI Evaluation Drawer - 6 columns */}
          <div className="lg:col-span-6 space-y-6" id="response-submission-container">
            {/* Input card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-5">
                Practice Workspace
              </h3>

              {/* Input Type Selector logic */}
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <div className="space-y-3" id="mcq-options-list">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQuestion.id] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs font-semibold leading-relaxed transition-all flex items-start space-x-3 cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/20 text-blue-900 shadow-xs'
                            : 'border-gray-100 hover:border-gray-300 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center border font-bold text-[10px] shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-snug">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'text-input' && (
                <div className="space-y-3" id="text-essay-input">
                  <textarea
                    value={userAnswers[currentQuestion.id] || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Type your response or essay here (At least 150 words highly recommended for complete essays)..."
                    className="w-full h-64 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-semibold placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all resize-none leading-relaxed"
                  ></textarea>

                  <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider pt-2">
                    <span>Target: 150+ words</span>
                    <span className={wordCount < 150 ? 'text-amber-500' : 'text-emerald-600 font-black'}>
                      Word count: {wordCount}
                    </span>
                  </div>
                </div>
              )}

              {currentQuestion.type === 'speak' && (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4" id="speaking-mic-sandbox">
                  {isRecording ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center animate-pulse mx-auto shadow-md">
                        <Square className="w-6 h-6 fill-current hover:scale-95 transition-transform" />
                      </div>
                      <span className="text-xs font-bold text-red-600">
                        Recording Answer Simulation... {recordingSeconds}s
                      </span>
                      <canvas
                        ref={canvasRef}
                        width="300"
                        height="60"
                        className="bg-gray-50 border border-gray-100 rounded-xl"
                      ></canvas>
                      <button
                        onClick={stopMicrophoneRecording}
                        className="px-6 py-2 bg-slate-800 text-white font-bold text-xs rounded-full uppercase tracking-wider cursor-pointer"
                      >
                        Stop & Review
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 px-4 leading-relaxed font-semibold">
                        This speaking task is simulated. Allow microphone access or simply tap "Start Simulation" to record answers.
                      </p>
                      <button
                        onClick={startMicrophoneRecording}
                        className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all mx-auto cursor-pointer"
                        id="mic-record-btn"
                      >
                        <Mic className="w-8 h-8" />
                      </button>
                      <span className="text-xs font-bold text-blue-600 block uppercase tracking-widest">
                        Tap To Speak
                      </span>
                    </div>
                  )}

                  {userAnswers[currentQuestion.id] && (
                    <div className="w-full bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl flex items-center space-x-2 text-left justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-[11px] text-emerald-800 font-extrabold leading-snug">
                        Speaking Segment Recorded successfully! You are ready to analyze parameters.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer action buttons */}
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <button
                  onClick={() => {
                    setUserAnswers((prev) => {
                      const updated = { ...prev };
                      delete updated[currentQuestion.id];
                      return updated;
                    });
                    setEvaluation(null);
                  }}
                  className="text-xs text-gray-400 hover:text-slate-800 font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Input</span>
                </button>

                <button
                  onClick={handleTriggerEvaluation}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center space-x-2 cursor-pointer"
                  id="grade-response-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-yellow-300" />
                      <span>Grading Response...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-yellow-300" />
                      <span>Analyze Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI EVALUATION RESPONSE - Dynamic Slide In */}
            {evaluation && (
              <div
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden animate-fade-in"
                id="ai-feedback-response-box"
              >
                {/* Glowing Top line and ribbon decorations */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-600 to-indigo-600"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-5 mb-6">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                      <BookOpen className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                      <span>AI Feedback Report</span>
                    </h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      Target Score analysis complete
                    </p>
                  </div>

                  {/* Score circle */}
                  <div className="mt-4 sm:mt-0 flex items-center space-x-3 bg-blue-50/60 pl-3 pr-4 py-2 rounded-full">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      {evaluation.score}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">
                        Estimated
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 block leading-tight">
                        {evaluation.band}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PERSONALIZED BAND SCORE ROADMAP ⭐⭐⭐⭐⭐ */}
                <div className="bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 mb-6 border border-slate-800 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  
                  <div className="flex items-center space-x-2 mb-4 border-b border-white/10 pb-3">
                    <span className="text-amber-400">⭐⭐⭐⭐⭐</span>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#93c5fd]">
                      Personalized Roadmap to Success
                    </h4>
                  </div>

                  {/* Top Stats Cards Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Current Score</span>
                      <span className="text-lg font-black text-white">{evaluation.score}</span>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Score</span>
                      <span className="text-lg font-black text-amber-400">
                        {test.exam === 'IELTS' 
                          ? Math.min(9.0, parseFloat(evaluation.score.toString()) + 1.5).toFixed(1)
                          : test.exam === 'TOEFL'
                          ? Math.min(120, parseFloat(evaluation.score.toString()) + 15)
                          : Math.min(90, parseFloat(evaluation.score.toString()) + 10)}
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Est. Prep Time</span>
                      <span className="text-lg font-black text-emerald-400">
                        {test.exam === 'IELTS' ? '8 Weeks' : test.exam === 'TOEFL' ? '6 Weeks' : '4 Weeks'}
                      </span>
                    </div>
                  </div>

                  {/* Sub-Metric Weak Area Diagnostics */}
                  <div className="space-y-3 mb-5">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Weaked Areas Diagnostic Review
                    </h5>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {test.exam === 'IELTS' ? (
                        <>
                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Fluency</span>
                              <span className="text-indigo-400">{evaluation.score}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(parseFloat(evaluation.score.toString()) / 9) * 100}%` }}></div>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Grammar Accuracy</span>
                              <span className="text-indigo-400">{Math.max(4.0, parseFloat(evaluation.score.toString()) - 0.5).toFixed(1)}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-red-400 rounded-full" style={{ width: `${((parseFloat(evaluation.score.toString()) - 0.5) / 9) * 100}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Lexical Range</span>
                              <span className="text-indigo-400">{evaluation.score}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(parseFloat(evaluation.score.toString()) / 9) * 100}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Pronunciation</span>
                              <span className="text-indigo-400">{Math.min(9.0, parseFloat(evaluation.score.toString()) + 0.5).toFixed(1)}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((parseFloat(evaluation.score.toString()) + 0.5) / 9) * 100}%` }}></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Structural Pitch</span>
                              <span className="text-indigo-400">75%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>

                          <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between text-[11px] font-bold text-slate-300">
                              <span>Logical Cohesion</span>
                              <span className="text-indigo-400">60%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-red-400 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Prescribed Action list */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd]">
                      Highly Recommended Path Tasks
                    </span>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-start space-x-2 text-xs text-slate-200">
                        <span className="text-amber-400 font-extrabold text-[13px] shrink-0">✔</span>
                        <span>Practice 10 IELTS Cue Cards on our "Study Center" tab consistently</span>
                      </div>
                      <div className="flex items-start space-x-2 text-xs text-slate-200">
                        <span className="text-amber-400 font-extrabold text-[13px] shrink-0">✔</span>
                        <span>Complete 3 fluency shadow speak sessions on Glidy interactive voice tools</span>
                      </div>
                      <div className="flex items-start space-x-2 text-xs text-slate-200">
                        <span className="text-amber-400 font-extrabold text-[13px] shrink-0">✔</span>
                        <span>Learn 50 targeted topic vocabulary words with Bengali meanings inside "Vocab Chart"</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific Criteria scores listing */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Score Criteria Breakdown
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {evaluation.feedback.criteria.map((crt, idx) => {
                      const perc = (crt.score / crt.bestRating) * 100;
                      return (
                        <div key={idx} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                          <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                            <span>{crt.name}</span>
                            <span>
                              {crt.score}/{crt.bestRating}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${perc}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                            {crt.details}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grammar and Stylistic corrections */}
                {evaluation.feedback.grammarCorrections && evaluation.feedback.grammarCorrections.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Grammar & Stylistic Corrections
                    </h4>
                    <div className="space-y-2.5">
                      {evaluation.feedback.grammarCorrections.map((itm, idx) => (
                        <div key={idx} className="border border-red-100 rounded-xl overflow-hidden text-xs">
                          <div className="bg-red-50 text-red-900 border-b border-red-100 p-3 font-semibold text-left">
                            <span className="text-[10px] font-black uppercase text-red-600 block tracking-wider leading-none mb-1">
                              Original
                            </span>
                            "{itm.original}"
                          </div>
                          <div className="bg-emerald-50 text-emerald-900 p-3 font-semibold text-left border-b border-emerald-100">
                            <span className="text-[10px] font-black uppercase text-emerald-600 block tracking-wider leading-none mb-1">
                              Suggested Correction
                            </span>
                            "{itm.corrected}"
                          </div>
                          <div className="bg-white p-3 text-[10px] text-slate-500 leading-normal font-semibold">
                            <strong className="text-slate-800">Rule explanation:</strong> {itm.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* General overarching feedback */}
                <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 text-xs mb-6 text-left">
                  <h5 className="font-extrabold text-slate-800 mb-1">Coach Note</h5>
                  <p className="text-slate-600 leading-relaxed font-medium">{evaluation.feedback.generalFeedback}</p>
                </div>

                {/* Academic sample model answer to reach benchmark limit */}
                <div className="border border-blue-50 bg-blue-50/10 rounded-2xl p-5 mb-8 text-left relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Expert Model Answer
                    </span>
                    <button
                      onClick={handleCopyModel}
                      className="text-[10px] text-blue-600 font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer hover:underline"
                    >
                      {copiedModelAnswer ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedModelAnswer ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                    "{evaluation.feedback.suggestedModelAnswer}"
                  </p>
                </div>

                {/* Bottom Save Action Panel */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveResultRecord}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Save Result Record</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
