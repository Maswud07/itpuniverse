export interface Review {
  id: string;
  exam: 'IELTS' | 'TOEFL' | 'PTE';
  author: string;
  rating: number;
  date: string;
  comment: string;
  scoreGained: string;
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    exam: 'TOEFL',
    author: 'au******',
    rating: 5,
    date: '2026-05-25',
    comment: 'ITP is the absolute best! The real TOEFL exam felt exactly like the simulator. I practiced the modular writing and listening sections five times and got a 111 overall. Very highly recommended!',
    scoreGained: '111 / 120'
  },
  {
    id: 'rev-2',
    exam: 'TOEFL',
    author: 'bl******',
    rating: 5,
    date: '2026-05-24',
    comment: 'The questions are incredibly similar to what I encountered on the test day. The instant grading engine helped me identify precise transition errors. Increased my score from 89 to 104 in two weeks.',
    scoreGained: '104 / 120'
  },
  {
    id: 'rev-3',
    exam: 'IELTS',
    author: 'ka******',
    rating: 5,
    date: '2026-05-22',
    comment: 'Perfect for speaking practice. I was terrified of speaking, but recording myself on the microphone and getting instant criteria-based band metrics helped me gain confidence. Scored an 8.0 on speaking!',
    scoreGained: 'Band 8.0'
  },
  {
    id: 'rev-4',
    exam: 'IELTS',
    author: 'ch******',
    rating: 4,
    date: '2026-05-20',
    comment: 'Very polished interface, and the timing mechanics match the actual IELTS test precisely. The veggie-themed test lists make practicing highly engaging. Would support even more writing templates.',
    scoreGained: 'Band 7.5'
  },
  {
    id: 'rev-5',
    exam: 'PTE',
    author: 'li******',
    rating: 5,
    date: '2026-05-18',
    comment: 'PTE mock tests are extremely fast of high quality. The listening blanks and phonetic spelling checking features corrected three of my chronic typos. Got a overall score of 79 on first try.',
    scoreGained: '79 / 90'
  },
  {
    id: 'rev-6',
    exam: 'TOEFL',
    author: 'me******',
    rating: 5,
    date: '2026-05-15',
    comment: 'Unbelievably precise. The integrated campus policy speaking prompts match standard ETS structures. I completed all vegetable test suites. Worth every penny of the premium upgrade!',
    scoreGained: '115 / 120'
  },
  {
    id: 'rev-7',
    exam: 'IELTS',
    author: 'xi******',
    rating: 5,
    date: '2026-05-12',
    comment: 'The diagnostic dashboards gave me a solid understanding of how my essay word counts affected my band limits. Followed the mid-range week planner diligently and achieved Band 7.5!',
    scoreGained: 'Band 7.5'
  },
  {
    id: 'rev-8',
    exam: 'PTE',
    author: 'sa******',
    rating: 4,
    date: '2026-05-09',
    comment: 'Excellent PTE mock tests, and the ITP AI chatbot tips inside the mock test screens was like having a private tutor guide me on syntax structures. Highly satisfied with my 72.',
    scoreGained: '72 / 90'
  },
  {
    id: 'rev-9',
    exam: 'IELTS',
    author: 'jo******',
    rating: 5,
    date: '2026-05-06',
    comment: 'Outstanding simulator quality! The Iron Dynamo and Apex Phoenix mock tests prepared me for advanced environmental reading sections. Best interactive practice tool on the internet.',
    scoreGained: 'Band 8.5'
  },
  {
    id: 'rev-10',
    exam: 'TOEFL',
    author: 'an******',
    rating: 5,
    date: '2026-05-02',
    comment: 'Brilliant essay grammar feedback. It points out exactly where sentences lack coherence and consequences connectors. Found this far more helpful than traditional static sample PDFs.',
    scoreGained: '109 / 120'
  }
];
