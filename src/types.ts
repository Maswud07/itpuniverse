export type ExamType = 'IELTS' | 'TOEFL' | 'PTE';

export interface ScoreOption {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
  range: string;
}

export interface Question {
  id: string;
  section: 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  title: string;
  prompt: string;
  passage?: string; // For Reading/Writing
  audioUrl?: string; // For Listening/Speaking (mock URL or text-to-speech option, but text/player is great)
  audioText?: string; // The transcript of audio if they want to read it
  options?: string[]; // For multiple choice
  correctAnswer?: string; // For multiple choice
  timeLimit: number; // in seconds
  sampleAnswer?: string;
  type: 'multiple-choice' | 'text-input' | 'speak';
}

export interface MockTest {
  id: string;
  exam: ExamType;
  title: string;
  duration: string;
  questionsCount: number;
  description: string;
  difficulty: 'Beginner' | 'Medium' | 'Advanced';
  questions: Question[];
}

export interface ScoreEvaluation {
  score: number;
  outOf: number;
  band: string;
  feedback: {
    criteria: {
      name: string;
      score: number;
      bestRating: number;
      details: string;
    }[];
    generalFeedback: string;
    suggestedModelAnswer: string;
    grammarCorrections: {
      original: string;
      corrected: string;
      explanation: string;
    }[];
  };
}

export interface UserTestRecord {
  id: string;
  id_date: string; // for key
  exam: ExamType;
  testTitle: string;
  date: string;
  overallScore: number;
  overallOutOf: number;
  sections: {
    name: string;
    score: number;
    outOf: number;
  }[];
  evaluation?: ScoreEvaluation;
}

export interface SavedVocabulary {
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
  exam: ExamType;
}
