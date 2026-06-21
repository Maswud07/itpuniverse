import { MockTest, Question } from '../types';

export interface PracticeCard {
  id: string;
  section: 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  title: string;
  totalQuestions: number;
  completedQuestions: number;
  tags: string[];
}

export const PRACTICE_CARDS_DATA: PracticeCard[] = [
  // READING SECTION (Directly matching the screenshot items)
  {
    id: 'p-read-glacial',
    section: 'Reading',
    title: 'Glacial Lake Outburst Floods',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Multiple Choice', 'Identifying', 'Completion', 'Matching']
  },
  {
    id: 'p-read-dolphins',
    section: 'Reading',
    title: 'Are Dolphins Friendly?',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Short Answer', 'Multiple Choice', 'Completion', 'Matching', 'Identifying']
  },
  {
    id: 'p-read-cleopatra',
    section: 'Reading',
    title: 'Cleopatra Selene',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Identifying', 'Matching', 'Completion', 'Multiple Choice', 'Short Answer']
  },
  {
    id: 'p-read-dragons',
    section: 'Reading',
    title: 'Here be Dragons',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Multiple Choice', 'Identifying', 'Short Answer', 'Completion', 'Matching']
  },
  {
    id: 'p-read-gold',
    section: 'Reading',
    title: 'All That Glitters Is Not Gold',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Matching', 'Identifying', 'Short Answer', 'Multiple Choice', 'Completion']
  },
  {
    id: 'p-read-cats',
    section: 'Reading',
    title: 'Cat Domestication',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Matching', 'Short Answer', 'Completion', 'Multiple Choice', 'Identifying']
  },
  {
    id: 'p-read-asteroid',
    section: 'Reading',
    title: 'Asteroid Collision',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Completion', 'Matching', 'Multiple Choice', 'Short Answer', 'Identifying']
  },
  {
    id: 'p-read-conrad',
    section: 'Reading',
    title: 'Joseph Conrad',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Identifying', 'Short Answer', 'Matching', 'Multiple Choice']
  },
  {
    id: 'p-read-dinosaur',
    section: 'Reading',
    title: 'Dinosaur Colouration',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Completion', 'Matching', 'Multiple Choice', 'Identifying']
  },
  {
    id: 'p-read-bosch',
    section: 'Reading',
    title: 'Hieronymus Bosch',
    totalQuestions: 8,
    completedQuestions: 0,
    tags: ['Completion', 'Short Answer', 'Matching', 'Multiple Choice', 'Identifying']
  },

  // LISTENING SECTION
  {
    id: 'p-list-lib',
    section: 'Listening',
    title: 'Library Registration Form',
    totalQuestions: 6,
    completedQuestions: 0,
    tags: ['Form Completion', 'Multiple Choice', 'Matching']
  },
  {
    id: 'p-list-route',
    section: 'Listening',
    title: 'Campus Tour Route Guide',
    totalQuestions: 6,
    completedQuestions: 0,
    tags: ['Map Labelling', 'Multiple Choice', 'Short Answer']
  },
  {
    id: 'p-list-plastic',
    section: 'Listening',
    title: 'Oceanic Micro-plastics Seminar',
    totalQuestions: 6,
    completedQuestions: 0,
    tags: ['Multiple Choice', 'Table Completion']
  },
  {
    id: 'p-list-museum',
    section: 'Listening',
    title: 'Historical Museums Audio Guide',
    totalQuestions: 6,
    completedQuestions: 0,
    tags: ['Matching', 'Short Answer', 'Note Taking']
  },
  {
    id: 'p-list-forest',
    section: 'Listening',
    title: 'Sustainable Forestry Lecture',
    totalQuestions: 6,
    completedQuestions: 0,
    tags: ['Multiple Choice', 'Note Taking', 'Completion']
  },

  // WRITING SECTION
  {
    id: 'p-writ-global',
    section: 'Writing',
    title: 'Global Tourism Essay',
    totalQuestions: 2,
    completedQuestions: 0,
    tags: ['Task 2 Essay', 'Cohesion Drill', 'Grammar Range']
  },
  {
    id: 'p-writ-auto',
    section: 'Writing',
    title: 'Workplace Automation Argument',
    totalQuestions: 2,
    completedQuestions: 0,
    tags: ['Task 2 Essay', 'Lexical Builders', 'Cohesion Drill']
  },
  {
    id: 'p-writ-pop',
    section: 'Writing',
    title: 'Population Demographic Graph',
    totalQuestions: 2,
    completedQuestions: 0,
    tags: ['Task 1 Analysis', 'Grammar Range', 'Lexical Builders']
  },
  {
    id: 'p-writ-recycling',
    section: 'Writing',
    title: 'Plastic Recycling Process Chart',
    totalQuestions: 2,
    completedQuestions: 0,
    tags: ['Task 1 Analysis', 'Cohesion Drill']
  },

  // SPEAKING SECTION
  {
    id: 'p-speak-hometown',
    section: 'Speaking',
    title: 'Hometown Favorites Intro',
    totalQuestions: 3,
    completedQuestions: 0,
    tags: ['Part 1 Introduction', 'Pronunciation Practice']
  },
  {
    id: 'p-speak-toy',
    section: 'Speaking',
    title: 'A Memorable Childhood Toy',
    totalQuestions: 3,
    completedQuestions: 0,
    tags: ['Part 2 Cue Card', 'Fluency Stretchers']
  },
  {
    id: 'p-speak-commute',
    section: 'Speaking',
    title: 'Future of Commuting Discussions',
    totalQuestions: 3,
    completedQuestions: 0,
    tags: ['Part 3 Discussion', 'Pronunciation Practice', 'Fluency Stretchers']
  },
  {
    id: 'p-speak-routine',
    section: 'Speaking',
    title: 'Describe a Daily Routine',
    totalQuestions: 3,
    completedQuestions: 0,
    tags: ['Part 1 Introduction', 'Fluency Stretchers']
  }
];

// Reusable detailed questions for the practice card modal drills!
export const PRACTICE_DRILLS_QUESTIONS: Record<string, Question[]> = {
  'Glacial Lake Outburst Floods': [
    {
      id: 'drill-glacial-1',
      section: 'Reading',
      title: 'Passage segment: Glacial Outburst dynamics',
      prompt: 'According to the passage, what is the primary trigger for sudden Moraine dam cleavage?',
      passage: 'Glacial Lake Outburst Floods (GLOFs) occur when unstable terminal moraines, composed of loosely consolidated rock and soil piled up by decaying glaciers, collapse under hydraulic pressure. The sudden failure can be triggered by rapid water accumulation during thermal melt phases, seismic disturbances, or huge displacements caused by mountain ice avalanches crashing into the lake below. Upon collapsing, the reservoir releases millions of cubic meters of silt-laden floodwaters, decimating alpine villages within minutes.',
      options: [
        'A gradual increase in mountain ambient wind speeds.',
        'Hydraulic pressure combined with rapid melt phases, seismic shock, or ice slides.',
        'Human excavation projects around the valley floor.',
        'Lowered water levels in upper high-altitude lakes.'
      ],
      correctAnswer: 'Hydraulic pressure combined with rapid melt phases, seismic shock, or ice slides.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Are Dolphins Friendly?': [
    {
      id: 'drill-dolphin-1',
      section: 'Reading',
      title: 'Passage segment: Cetacean Social Bonds',
      prompt: 'Select the statement which is highly consistent with dolphin altruism as listed in the text.',
      passage: 'While popular culture depicts dolphins as universally smiling, benevolent ocean helpers, biological research paints a more complex picture. Dolphins form intricate tribal alliances structured by deep vocal signals, reciprocal hunting behaviors, and occasional altruism - such as sheltering injured pod members or warding off larger sharks. However, they also exhibit intense territorial dominance, competitive physical harassment, and sophisticated coordination to keep rivalry pods out of hunting lagoons. Scientists emphasize that their actions are governed by survival and social hierarchies, rather than human-like moral benevolence.',
      options: [
        'Dolphins act exclusively from conscious moral benevolence and high empathy.',
        'Dolphin bonding is completely random and displays no pack hierarchies.',
        'Cetaceans support pod members but also utilize physical force and competitive packs to assert hunting zone boundaries.',
        'Dolphins refuse to communicate using vocal signatures.'
      ],
      correctAnswer: 'Cetaceans support pod members but also utilize physical force and competitive packs to assert hunting zone boundaries.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Cleopatra Selene': [
    {
      id: 'drill-cleo-1',
      section: 'Reading',
      title: 'Passage segment: Cleopatra VII\'s Forgotten Daughter',
      prompt: 'What was a primary political outcome of Cleopatra Selene\'s union with King Juba II?',
      passage: 'Cleopatra Selene II was the only surviving daughter of Cleopatra VII and Mark Antony. After the downfall of Alexandria, she was paraded in Rome but eventually married to King Juba II of Numidia by Augustus Caesar. Augustus installed the brilliant royal couple as client rulers of Mauretania. Under their joint reign, Mauretania flourished, blending classical Roman architecture, Greek scholarship, and traditional Egyptian religious cults, establishing a vital cultural bridge across Northwest Africa.',
      options: [
        'The quick demolition of client dynasties in Numidia.',
        'An intense civil rebellion targeting classical Hellenic theater.',
        'A thriving period in Mauretania blending Hellenic, Roman, and Nilotic traditions.',
        'Complete isolation of North African kingdoms from Mediterranean cargo lanes.'
      ],
      correctAnswer: 'A thriving period in Mauretania blending Hellenic, Roman, and Nilotic traditions.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Here be Dragons': [
    {
      id: 'drill-dragons-1',
      section: 'Reading',
      title: 'Passage segment: Cartographic Mythmaking',
      prompt: 'What does the term "Here be Dragons" reflect regarding Renaissance mariners?',
      passage: 'Medieval and early Renaissance cartographers occasionally populated unexplored corners of geography with sketches of massive sea serpents, mermaids, and warning placards like "HC SVNT DRACONES" (Here are dragons). Rather than literal warnings of biological pests, these illustrations filled the cognitive void of unfamiliar waters, serving as visual metaphors for the extreme peril of navigation, uncharted coral lines, and deep-sea currents that easily dashed wooden galleons to pieces.',
      options: [
        'Proof that massive winged hydras dominated the coastlines of pre-modern Europe.',
        'Visual metaphors illustrating unexplored geographic spaces and the intense physical risks of sailing.',
        'Handbooks issued by royalty to facilitate the capture of mythical scale predators.',
        'The exact global migratory tracks of ancient ocean whales.'
      ],
      correctAnswer: 'Visual metaphors illustrating unexplored geographic spaces and the intense physical risks of sailing.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'All That Glitters Is Not Gold': [
    {
      id: 'drill-gold-1',
      section: 'Reading',
      title: 'Passage segment: Pyrite vs Noble Metals',
      prompt: 'Which chemical testing method distinguishes real golden ore from iron pyrites?',
      passage: 'The expression "all that glitters is not gold" originates from early classical writings but finds its ultimate embodiment in the mineral Iron Pyrite (FeS2). Dubbed "Fool\'s Gold" due to its striking brassy luster, rookie prospectors were consistently fooled. Chemically, pyrite is harder and more brittle, sparking when struck with alloy steel, whereas noble gold is ductile and leaves a brilliant yellow streak on unglazed porcelain plates without breaking or sparking.',
      options: [
        'Pyrite shows extreme flexibility and melts instantly under low room temperatures.',
        'Real gold produces sparks when struck and shatters into a fine brassy powder.',
        'Evaluating ductility and analyzing streak patterns on unglazed porcelain slabs.',
        'Storing the mined particles in seawater overnight.'
      ],
      correctAnswer: 'Evaluating ductility and analyzing streak patterns on unglazed porcelain slabs.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Cat Domestication': [
    {
      id: 'drill-cats-1',
      section: 'Reading',
      title: 'Passage segment: Egyptian Granaries',
      prompt: 'Why did wild wildcats (Felis lybica) initiate feline-human proximity?',
      passage: 'Unlike dogs, which were actively bred for tracking or defense support, cats essentially domesticated themselves. During the agricultural revolution in the Fertile Crescent, early human communities established grain silos. These stores attracted plague-carrying rodents in vast numbers. Wild African wildcats (Felis lybica) noticed this dense concentration of easy prey and moved into human villages. Recognizing their rodent-control contribution, humans welcomed them, initiating a mutualistic relationship.',
      options: [
        'Humans hunted wild cats for dairy products during severe droughts.',
        'Felines moved into early human farm settlements to hunt abundant grain-fed rodents.',
        'Migrant wildcats were trained to pull small transport sledges across river delras.',
        'An ancient global treaty designed to clean city wastes.'
      ],
      correctAnswer: 'Felines moved into early human farm settlements to hunt abundant grain-fed rodents.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Asteroid Collision': [
    {
      id: 'drill-asteroid-1',
      section: 'Reading',
      title: 'Passage segment: Chicxulub Crater Studies',
      prompt: 'Which metal-concentration anomaly confirmed the extraterrestrial impact origin?',
      passage: 'In the late 20th century, geologists discovered an unusual layer of clay marking the boundary between the Cretaceous and Paleogene epochs (the K-Pg boundary). This thin clay layer contained concentrations of iridium up to 30 times higher than earthly tectonic baselines. Because iridium is highly siderophilic and settled deep inside the Earth\'s core during initial formation, surface deposits of this scale must originate from meteorites. This confirmed the chicxulub impact occurred 66 million years ago.',
      options: [
        'High natural radioactive uranium spikes in alpine soil.',
        'The detection of synthetic aluminum materials underneath sedimentary clay layers.',
        'An abnormal enrichment of highly siderophilic iridium found at the geological boundary.',
        'Fossilized footprints showing carbonized metal fibers.'
      ],
      correctAnswer: 'An abnormal enrichment of highly siderophilic iridium found at the geological boundary.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Joseph Conrad': [
    {
      id: 'drill-conrad-1',
      section: 'Reading',
      title: 'Passage segment: Maritime Prose and Imperialism',
      prompt: 'What makes Joseph Conrad\'s literary status highly unique among classical novelists?',
      passage: 'Joseph Conrad, the author of "Heart of Darkness", is considered one of the masters of English literature. Yet, English was not his native language. Born in Poland as Józef Teodor Konrad Korzeniowski, he spent his youth as a merchant mariner in the French and British navies before settling in Kent. This extensive seafaring life exposed him to remote colonial outposts, forming the core of his psychologically complex narratives dissecting human ambition and the moral rot of European colonialism.',
      options: [
        'He was the first author to compose an entire novel in Morse code symbols.',
        'He gained master status in English literature despite English being his third language, drawing on merchant mariner observations.',
        'He acted as a prime military general in the Polish national army while writing.',
        'His insistence on designing self-portraits inside book jackets.'
      ],
      correctAnswer: 'He gained master status in English literature despite English being his third language, drawing on merchant mariner observations.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Dinosaur Colouration': [
    {
      id: 'drill-dinosaur-1',
      section: 'Reading',
      title: 'Passage segment: Melanosome Imaging',
      prompt: 'How do paleobiologists extract color information from extinct petrified remains?',
      passage: 'For over a century, dinosaur skin tones were purely speculative, with artists relying on modern lizards as references. That changed with electron-microscopy developments. Paleontologists identified cellular pouches called melanosomes preserved inside fossilized feather filaments. These microscopic containers hold pigments. Bullet-shaped melanosomes (eumelanosomes) generate dark black/grey tones, while spherical ones (phaeomelanosomes) produce rufous, ginger, or orange shades, allowing researchers to accurately map feather patterns of Anchiornis or Microraptor.',
      options: [
        'By testing ancient bone marrow minerals for residual chemical ink dyes.',
        'Analyzing the structures of preserved carbonized melanosome bubbles inside feather filaments.',
        'Injecting artificial radioactive isotopes into skull fossils.',
        'Utilizing ultrasonic radar sensors across dry desert terrain.'
      ],
      correctAnswer: 'Analyzing the structures of preserved carbonized melanosome bubbles inside feather filaments.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ],
  'Hieronymus Bosch': [
    {
      id: 'drill-bosch-1',
      section: 'Reading',
      title: 'Passage segment: Early Netherlandish Triptychs',
      prompt: 'What was the central thematic message inside Hieronymus Bosch\'s famous triptych paintings?',
      passage: 'Hieronymus Bosch, the 15th-century Dutch master, is famed for his complex visual triptychs like "The Garden of Earthly Delights". His works are packed with surreal hybrid beasts, physical torments, and allegorical contraptions. Rather than early forms of surrealism, art historians argue these nightmarish images are conservative moral admonitions reflecting deep-seated late-medieval anxieties around temptation, the frailty of human flesh, and the absolute certainty of divine judgment.',
      options: [
        'A celebratory defense of experimental agricultural science.',
        'Modern abstract expressionism meant to bypass religious oversight.',
        'Conservative moral illustrations highlighting late-medieval anxieties around temptation and judgment.',
        'A travel catalog mapping trade ports across the Far East.'
      ],
      correctAnswer: 'Conservative moral illustrations highlighting late-medieval anxieties around temptation and judgment.',
      timeLimit: 120,
      type: 'multiple-choice'
    }
  ]
};

// Generates a mock practice test based on card / topic / tag
export function getPracticeDrill(cardTitle: string, tag: string): MockTest {
  const matchedList = PRACTICE_DRILLS_QUESTIONS[cardTitle];
  const item: Question = matchedList && matchedList[0] ? matchedList[0] : {
    id: `drill-generic-${Date.now()}`,
    section: 'Reading',
    title: `${cardTitle} - ${tag} Drill`,
    prompt: `Based on the scholarly passage for "${cardTitle}", determine the correct analysis for this specific '${tag}' question type.`,
    passage: `This academic block is customized for evaluating ${tag} performance under exam-like circumstances. "${cardTitle}" is an influential research area frequently covered inside official standardized exams. Try to identify key supportive statements to isolate spelling errors, logical fallacies, and factual inconsistencies.`,
    options: [
      `Ideal answer option supporting the principal thesis in the ${tag} test context.`,
      `Incorrect distractor displaying localized terminological confusion.`,
      `Partially correct statement containing unverified speculative leaps.`,
      `Opposing thesis directly contradicted by standard scientific logic.`
    ],
    correctAnswer: `Ideal answer option supporting the principal thesis in the ${tag} test context.`,
    timeLimit: 120,
    type: 'multiple-choice'
  };

  return {
    id: `p-drill-${Date.now()}`,
    exam: 'IELTS',
    title: `${cardTitle} Drill`,
    duration: '2 mins',
    questionsCount: 1,
    description: `Specialized ${tag} micro learning lesson built for practicing ${cardTitle}.`,
    difficulty: 'Medium',
    questions: [item]
  };
}

export interface LectureItem {
  id: string;
  title: string;
  section: 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  duration: string;
  slides: {
    title: string;
    content: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export const LECTURES_DATA: LectureItem[] = [
  // READING LECTURES matching the screenshot precisely
  {
    id: 'lec-read-views',
    section: 'Reading',
    title: 'Identifying Views/Claims(Yes/No/Not Given)',
    duration: '15 min',
    slides: [
      {
        title: 'Core Concept',
        content: 'YES / NO / NOT GIVEN questions measure your ability to match the writer\'s opinions or claims with the provided statements. "YES" means the statement matches the views of the author. "NO" means it contradicts them. "NOT GIVEN" means the author does not express a clear opinion on this specific comparison.'
      },
      {
        title: 'Strategy & Steps',
        content: '(1) Identify key noun pointers in the prompt that can guide you to the specific section of the text.\n(2) Look closely for qualifying adverbs like "frequently", "solely", "never", and modal verbs like "must" or "might". These often change the truth-value of the statement!\n(3) Avoid speculative inferences. If there is no mention of the specific claim, select NOT GIVEN.'
      }
    ],
    quiz: {
      question: 'If the text says: "The project may eventually collapse due to limited public support," and the prompt says: "The project will definitively collapse shortly because of the public," what is the correct label?',
      options: ['YES', 'NO', 'NOT GIVEN'],
      answer: 'NO',
      explanation: 'The text uses hedges and possibilities ("may eventually"), whereas the prompt asserts absolute inevitability ("definitively... shortly"). Hence, the statement contradicts the author’s views.'
    }
  },
  {
    id: 'lec-read-info',
    section: 'Reading',
    title: 'Identifying Information(True/False/Not Given)',
    duration: '12 min',
    slides: [
      {
        title: 'The Golden Rules',
        content: 'TRUE / FALSE / NOT GIVEN asks if a factual statement matches the information in the text. "TRUE" means the text confirms the fact. "FALSE" means the text directly refutes the fact or lists an alternative fact. "NOT GIVEN" means the fact is neither confirmed nor refuted.'
      },
      {
        title: 'Common Traps',
        content: 'Paraphrasing is key. The prompt will use complex synonyms. For example, "decreased thermal retention" in the text will be presented as "the temperature dropped faster" in the prompt. Do not assume any real-world knowledge that is not directly written in the text.'
      }
    ],
    quiz: {
      question: 'Text: "Iridium is high in meteors but deeply buried inside Earth." Prompt: "Meteors contain richer surficial quantities of iridium than standard Earth surfaces." Is this TRUE, FALSE, or NOT GIVEN?',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      answer: 'TRUE',
      explanation: 'The passage supports this since iridium on Earth exists mostly in the deep core, so meteorites left richer surficial deposits on the surface.'
    }
  },
  {
    id: 'lec-read-mc',
    section: 'Reading',
    title: 'Multiple Choice',
    duration: '10 min',
    slides: [
      {
        title: 'Elimination Method',
        content: 'Multiple choice tests deep comprehension. Usually, 3 distractors will use vocabulary copied directly from the text to fool you. The correct answer will be heavily paraphrased, using entirely different words to describe the same conceptual idea.'
      }
    ],
    quiz: {
      question: 'Which option is most likely correct in a standardized test?',
      options: [
        'An option that repeats three exact technical nouns from the text.',
        'A heavily paraphrased option conveying the overall logical meaning clearly.',
        'A speculative, extreme claim predicting future outcomes.'
      ],
      answer: 'A heavily paraphrased option conveying the overall logical meaning clearly.',
      explanation: 'Correct choices are almost always rewritten using clean, general synonyms to verify actual understanding rather than word-matching.'
    }
  },
  {
    id: 'lec-read-note',
    section: 'Reading',
    title: 'Note Completion',
    duration: '14 min',
    slides: [
      {
        title: 'Word Limit Cues',
        content: 'Always read instruction headings first, e.g. "NO MORE THAN TWO WORDS AND/OR A NUMBER." If you write three words, you get zero points even if the semantic meaning is correct. Ensure your answers fit the grammatical structure of the surrounding notes.'
      }
    ]
  },
  {
    id: 'lec-read-sentence',
    section: 'Reading',
    title: 'Sentence Completion',
    duration: '12 min',
    slides: [
      {
        title: 'Fitting the Grammar',
        content: 'Read the incomplete sentence first. Identify the part of speech needed (noun, verb, adjective, or adverb) before seeking the answer in the text. Copy the exact spelling from the passage without changing its form.'
      }
    ]
  },
  {
    id: 'lec-read-summary',
    section: 'Reading',
    title: 'Summary Completion',
    duration: '15 min',
    slides: [
      {
        title: 'Text Mapping',
        content: 'A summary is a condensed version of a specific part of the text. Focus on scanning transition words (e.g., "however", "consequently", "furthermore") to determine how ideas flow and match them with synonyms.'
      }
    ]
  },
  {
    id: 'lec-read-endings',
    section: 'Reading',
    title: 'Matching Sentence Endings',
    duration: '11 min',
    slides: [
      {
        title: 'Grammar and Logic',
        content: 'A list of incomplete sentences must be connected with the correct endings from a secondary box. Use both grammatical compatibility (e.g. subject-verb agreement) and logical flow to narrow down your options instantly.'
      }
    ]
  },
  {
    id: 'lec-read-matching-info',
    section: 'Reading',
    title: 'Matching Information',
    duration: '13 min',
    slides: [
      {
        title: 'Specific Paragraph Mapping',
        content: 'You must locate which specific paragraph contains a certain piece of information (such as an example, description, reference, or definition). Unlike other questions, these do not appear in the chronological order of the text!'
      }
    ]
  },
  {
    id: 'lec-read-features',
    section: 'Reading',
    title: 'Matching Features',
    duration: '12 min',
    slides: [
      {
        title: 'People or Eras',
        content: 'You are asked to match key opinions, findings, or achievements with a list of scientists, researchers, or historical figures. scan the text for capitalized names and read only their surrounding direct quotes.'
      }
    ]
  },
  {
    id: 'lec-read-headings',
    section: 'Reading',
    title: 'Matching Headings',
    duration: '15 min',
    slides: [
      {
        title: 'Paragraph-Level Gist',
        content: 'Matching headings tests your ability to identify the main idea or "gist" of individual paragraphs. Read the list of headings first before diving into the passage.'
      }
    ]
  },
  {
    id: 'lec-read-short-answer',
    section: 'Reading',
    title: 'Short Answer',
    duration: '10 min',
    slides: [
      {
        title: 'Locating Direct Answers',
        content: 'Short-answer questions require you to extract factual details directly from the text to answer brief questions. Ensure you stay strictly within the stated word limit.'
      }
    ]
  },
  {
    id: 'lec-read-table',
    section: 'Reading',
    title: 'Table Completion',
    duration: '12 min',
    slides: [
      {
        title: 'Structured Information',
        content: 'Table completion questions require you to fill in missing words in a grid/table structure. Look at the column and row categories to predict the type of information needed.'
      }
    ]
  },
  {
    id: 'lec-read-flow-chart',
    section: 'Reading',
    title: 'Flow-chart Completion',
    duration: '14 min',
    slides: [
      {
        title: 'Following a Process',
        content: 'Flow-charts depict chronological or causal sequences of events. Pay attention to transition words like "firstly", "subsequently", "then", and "finally" inside the text.'
      }
    ]
  },
  {
    id: 'lec-read-diagram',
    section: 'Reading',
    title: 'Labelling a Diagram',
    duration: '13 min',
    slides: [
      {
        title: 'Identifying Visual Components',
        content: 'Diagram labelling involves using words from the passage to fill in technical labels on a visual sketch or drawing representing a machine, natural process, or device.'
      }
    ]
  },

  // LISTENING LECTURES
  {
    id: 'lec-list-basic',
    section: 'Listening',
    title: 'Form/Note Completion Tricks',
    duration: '10 min',
    slides: [
      {
        title: 'Listening for Self-Correction',
        content: 'In Section 1, speakers frequently correct themselves to test your attention, e.g., "My email is john@gmail.com... oh wait, that is actually john_smith@gmail.com". Maintain focus and write the final correction!'
      }
    ]
  },
  {
    id: 'lec-list-map',
    section: 'Listening',
    title: 'Map/Plan/Diagram Labelling',
    duration: '12 min',
    slides: [
      {
        title: 'Directional Signposting',
        content: 'Familiarize yourself with compass directions (North, South, East, West) and relative directions ("adjacent to", "just past", "to your immediate left", "opposite"). Point your pencil on the map during the recording.'
      }
    ]
  },

  // WRITING LECTURES
  {
    id: 'lec-writ-trends',
    section: 'Writing',
    title: 'Task 1: Describing Trends & Charts',
    duration: '15 min',
    slides: [
      {
        title: 'Lexical Variety',
        content: 'Avoid repeating "increase" and "decrease". Use precise verbs like "skyrocketed", "surged", "fluctuated", "plateaued", or "bottomed out" alongside appropriate adverbs like "gradually" or "exponentially".'
      }
    ]
  },

  // SPEAKING LECTURES
  {
    id: 'lec-speak-cues',
    section: 'Speaking',
    title: 'Part 2: Cue Card Strategy & Mindmapping',
    duration: '15 min',
    slides: [
      {
        title: 'Structuring the 2-Minute Talk',
        content: 'Utilize your 1-minute planning time to sketch a 4-quadrant mindmap answering: Who, When, What, and Why. This ensures you maintain constant, fluent speech without unnatural pauses.'
      }
    ]
  }
];

export interface ToeflDrillTemplate {
  passage: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export const TOEFL_PRACTICE_DRILLS_DATA: Record<string, ToeflDrillTemplate> = {
  'Vietnam Project': {
    passage: "To: Regional Planning Team\nSubj: Vietnam Field Research Schedule\nThis notice confirms that the Hanoi wetlands site visit will proceed on Wednesday, June 17. All team members must report to the lobby at 07:00 with their water-resistant field logs and identification badges. Late arrivals cannot be accommodated as the transport boat leaves promptly at 07:15. If your environmental clearance form is pending, submit it to Linh Hoang by Monday afternoon, or you will be excluded from this leg.",
    prompt: "What is the primary requirement for team members who wish to join the wetlands field visit?",
    options: [
      "Submit their field logs to Linh Hoang by Monday.",
      "Verify site safety clearance and arrive at the lobby by 07:00.",
      "Hire a custom private transport boat independently on Wednesday.",
      "Carry water-resistant badges and environmental clearance by Wednesday afternoon."
    ],
    correctAnswer: "Verify site safety clearance and arrive at the lobby by 07:00."
  },
  'Midtown Bridge': {
    passage: "Notice to Midtown Commuters:\nThe Department of Transportation will close the upper deck of the Midtown Bridge from 22:00 Friday to 05:00 Monday for structural suspension cable diagnostics. Alternating lane closures will also impact the lower deck. Commuters are advised to utilize the Westway Tunnel instead. Heavy vehicles over 5 tons are strictly prohibited from utilizing the lower deck during this period.",
    prompt: "What instruction is given to drivers of vehicles weighing more than 5 tons?",
    options: [
      "They must travel via the upper deck of the Midtown Bridge.",
      "They are forbidden from using the bridge's lower deck during these hours.",
      "They should check their suspension cables prior to crossing.",
      "They can pass through the Westway Tunnel only after Friday evening."
    ],
    correctAnswer: "They are forbidden from using the bridge's lower deck during these hours."
  },
  'Clinic Hours': {
    passage: "Midtown Health Clinic Scheduling Update:\nStarting next semester, our evening advisory hours will be extended from 18:00 to 20:30 on Tuesdays and Thursdays. Conversely, Saturday morning walk-in sessions are being suspended due to staffing reallocations. Urgent care remains accessible 24/7 at the campus university hospital. Appointments can be booked via our updated portal. Please update your directories accordingly.",
    prompt: "What is the main change regarding the clinic's scheduling policy?",
    options: [
      "Saturday walk-ins will start earlier at 08:30.",
      "Tuesday and Thursday evening counseling slots will close earlier.",
      "Evening clinics on Tuesdays and Thursdays will operate longer, while Saturdays are canceled.",
      "All appointments must now be made at the campus university hospital directly."
    ],
    correctAnswer: "Evening clinics on Tuesdays and Thursdays will operate longer, while Saturdays are canceled."
  },
  'Holiday Extravaganza': {
    passage: "Dear Community Partners,\nDue to unprecedented winter weather bulletins, the Community Holiday Extravaganza on Central Plaza is relocated indoors to the Oakwood Recreation Center. The scheduled start time remains 14:00 this Saturday. Registered local craft vendors can begin booth installations starting at 11:30. Ensure your heating permits are printed and clearly posted on your tables, as county fire marshals will inspect all booths.",
    prompt: "What action must craft vendors take before the event begins?",
    options: [
      "Relocate their booths to the Central Plaza by Saturday noon.",
      "Verify that they have physical heating permits displayed on their tables.",
      "Sign up as additional helpers for indoor winter weather rescue plans.",
      "Set up their tables at the Oakwood Recreation Center before 10:00."
    ],
    correctAnswer: "Verify that they have physical heating permits displayed on their tables."
  },
  'Home Renovation': {
    passage: "To: Residents of Maple Tower\nSubject: Elevator Renovation Works\nPlease note that starting tomorrow, the primary freight elevator will be offline for modernizing its hydraulic pulley systems. This maintenance phase is expected to take four business days. For moving oversized furniture, please pre-register with building concierge Maria Juarez to reserve the passenger elevator during off-peak hours (10:00 - 12:00 or 14:00 - 16:00).",
    prompt: "How can Maple Tower residents move bulky furniture during the renovation period?",
    options: [
      "By using the main stairwells only during late-night hours.",
      "By arranging a slot with Maria Juarez during specified low-use times.",
      "By repairing the freight elevator pulley system manually.",
      "By contacting the hydraulic maintenance crew after four days."
    ],
    correctAnswer: "By arranging a slot with Maria Juarez during specified low-use times."
  },
  'Book Scorpions': {
    passage: "Book scorpions (Chelifer cancroides) are tiny pseudoscorpions measuring only a few millimeters. Lacking a stinging tail, they pose no threat to humans. Instead, they operate as valuable household allies in academic libraries, preying heavily on booklice and standard dust mites that consume precious binding adhesives, paper fibers, and leather covers. Their presence represents an organic form of preservation, maintaining archival health in historical collections.",
    prompt: "What is the primary role of book scorpions in library archives?",
    options: [
      "They damage historical leather covers with their small claws.",
      "They consume book adhesives, aiding in book recycling.",
      "They protect books by eating paper-destroying pests like booklice.",
      "They are used as test organisms for testing synthetic pesticides."
    ],
    correctAnswer: "They protect books by eating paper-destroying pests like booklice."
  },
  'The 1920s': {
    passage: "The decade of the 1920s, known as the 'Roaring Twenties,' witnessed dramatic changes in Western economic, cultural, and political landscapes. Fueled by rapid industrialization and mass assembly-line breakthroughs popularized by Ford, industrial outputs doubled. This manufacturing efficiency expanded consumer credit systems, allowing average households to acquire refrigerators, radios, and vehicles. However, this credit-driven expansion hid significant wealth inequalities and agricultural recessions, building deep systemic instabilities.",
    prompt: "What major economic factor contributed to the increased consumption of household goods in the 1920s?",
    options: [
      "The massive redistribution of agricultural farmlands.",
      "The rapid expansion of consumer credit and assembly-line manufacturing.",
      "The direct government funding of residential radios and vehicles.",
      "A dramatic reduction in international trade tariffs on heavy items."
    ],
    correctAnswer: "The rapid expansion of consumer credit and assembly-line manufacturing."
  },
  'Animal Migration': {
    passage: "Animal migration is a highly coordinated ecological phenomenon driven by seasonal resource shifts, temperature drops, and reproductive urges. Species utilize diverse navigational models. For example, Monarch butterflies rely on a complex internal time-compensated sun compass to navigate thousands of miles to Mexican forests. Sea turtles navigate across shorelines using magnetite crystals in their brains, allowing them to sense variations in the Earth's magnetic fields to return to their natal nesting sites.",
    prompt: "How do sea turtles navigate back to their nesting beaches according to research?",
    options: [
      "By using their vision to track the light of the sun.",
      "By relying on olfactory chemical trails floating in seawater currents.",
      "By sensing changes in the Earth's magnetic field using brain magnetite.",
      "By memorizing coastal geography from past group travels."
    ],
    correctAnswer: "By sensing changes in the Earth's magnetic field using brain magnetite."
  },
  'Cold Welding': {
    passage: "Cold welding is a solid-state welding process occurring when two separate, clean pieces of the same metal contact each other in a vacuum. Unlike standard welding, no heat or liquid phase is needed. Because there are no air molecules or oxide films separating the metal pieces, the surface atoms of each piece interact and fuse immediately, treating the interface as a single physical body. This phenomenon poses a significant hazard for spacecraft design, where moving metallic joints can fuse permanently if not properly coated.",
    prompt: "Why does cold welding happen immediately in a vacuum environment?",
    options: [
      "Because intense solar radiation melts the metal surfaces instantly.",
      "Because the lack of air allows surface atoms to fuse directly without barrier oxides.",
      "Because space gravity holds metals together with exceptional force.",
      "Because metals change their chemical composition when exposed to vacuum pressures."
    ],
    correctAnswer: "Because the lack of air allows surface atoms to fuse directly without barrier oxides."
  },
  'The Myth of the Child Prodigy': {
    passage: "Standard psychological research often challenges the romanticized myth of the isolated child prodigy. Long-term studies suggest that early cognitive superiority is not solely an innate talent, but a combination of intense repetitive practice, rich familial support, and structured resources. Many high-achieving youth fail to sustain their outstanding performance into adulthood, struggling with extreme burnout, perfectionist anxieties, and a failure to transition from structured rules to open-ended creative domains.",
    prompt: "What is a main reason why child prodigies might struggle to transition into successful adults?",
    options: [
      "A lack of access to standard educational resources.",
      "The sudden decay of their memory processing speeds.",
      "Struggles with perfectionist anxiety, burnout, and open-ended creative challenges.",
      "A natural loss of support from their parent circles."
    ],
    correctAnswer: "Struggles with perfectionist anxiety, burnout, and open-ended creative challenges."
  },
  'Human Perception': {
    passage: "Human perception is an incredibly complex psychological system. Th__ first sen______ is sh___ in fu__, an__ starting fr___ the se____ half o__ every se____ word i__ removed. Ou__ brain cons______ analyzes raw sensory inp__ such a__ photons o__ light, converting th__ into mean______ images. Th__ allows u__ to nav______ our text-based exam easily.",
    prompt: "Complete the missing letters in the words to make the passage grammatically correct. What does our brain analyze to create images?",
    options: [
      "It analyzes raw sensory inputs like photons of light.",
      "It analyzes chemical memory traces stored in the ears.",
      "It maps the structural sounds of words directly from our bones.",
      "It relies purely on imagination with zero external stimulus."
    ],
    correctAnswer: "It analyzes raw sensory inputs like photons of light."
  },
  'Sustainable Living': {
    passage: "Sustainable living is essential for securing our shared future. Re______ carbon emiss____ represents t__ corner_____ of this glo___ effort. Indi______ actions, we____ simple o__ complex, pl__ a major ro__ in re______. Consuming lo____ organic pr______ can gr_____ minimize transp______ fuels and green_____ gases.",
    prompt: "Complete the missing letters in the words. How can individual actions minimize greenhouse gases, according to the text?",
    options: [
      "By consuming locally sourced organic produce to minimize transportation fuels.",
      "By building large international carbon storage containers.",
      "By banning the consumption of fresh organic foods globally.",
      "By migrating to high-density subterranean habitats."
    ],
    correctAnswer: "By consuming locally sourced organic produce to minimize transportation fuels."
  },
  'Bird Nests': {
    passage: "Bird nests represent masterpiece engineering designs made by small creatures. Av___ builders se____ materials su__ as tw___, grass, mu__, or spiders' we__ to construct du______ structures. Th__ primary pur______ of th__ nests i__ providing insul______ and safety f__ fragile eggs. So__ species de____ fake entrances t__ deter clever pred______.",
    prompt: "Complete the gaps. What is the primary purpose of building these durable nest structures?",
    options: [
      "To provide thermal insulation and shelter protection for vulnerable eggs.",
      "To store excessive food seeds gathered during autumn storms.",
      "To attract large groups of migrating birds for mutual defense.",
      "To learn structural engineering principles before nesting."
    ],
    correctAnswer: "To provide thermal insulation and shelter protection for vulnerable eggs."
  },
  'Edible Gold': {
    passage: "Edible gold is a luxurious food decoration popular in elite gastronomy. Th__ inert me___ has n__ taste, od__, or nutri______ benefit f__ humans, pass______ harmlessly thro______ the diges______ tract. It i__ rolled in__ microsc______ sheets t__ grace expen______ chocolate deser___ or royal banq______ dishes.",
    prompt: "Complete the gaps. What happens when humans consume edible gold?",
    options: [
      "It acts as a vital vitamin supplement boosting physical stamina.",
      "It passes harmlessly through the digestive tract with no nutritional value.",
      "It causes immediate metallic poisoning if not dissolved.",
      "It changes the biological flavor profile of desserts to sweet."
    ],
    correctAnswer: "It passes harmlessly through the digestive tract with no nutritional value."
  },
  'The Great Wall of China': {
    passage: "The Great Wall of China is one of mankind's grandest archaeological structures. Bu____ over multi___ centuries, t__ masonry barr____ was built t__ protect Chi______ empires fr___ nomadic incur______. Today, scien______ use hyper-spec______ imaging t__ study crack form______ in t__ ancient rammed-e____ bricks across arid prov______.",
    prompt: "Complete the gaps. Why was the Great Wall of China originally built?",
    options: [
      "To shield Chinese empires from nomadic incursions.",
      "To act as a high-speed trade highway connecting Asian ports.",
      "To serve as a national monument dedicated to agricultural gods.",
      "To control major water flooding of the Yangtze River."
    ],
    correctAnswer: "To shield Chinese empires from nomadic incursions."
  }
};

export function getToeflPracticeDrill(topicTitle: string, category: string): MockTest {
  const matched = TOEFL_PRACTICE_DRILLS_DATA[topicTitle];
  const item = matched || {
    passage: "This is a specialized practice drill designed to test your reading, synthesis, and comprehension abilities on specific TOEFL question types.",
    prompt: `Analyze the main elements of "${topicTitle}" to find the correct answer.`,
    options: [
      "Option A (Correct answer detail)",
      "Option B (Deceptive distractor)",
      "Option C (Partially complete claim)",
      "Option D (Irrelevant noise item)"
    ],
    correctAnswer: "Option A (Correct answer detail)"
  };

  return {
    id: `toefl-drill-${topicTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    exam: 'TOEFL',
    title: `TOEFL Reading - ${topicTitle} Drill`,
    duration: '2 mins',
    questionsCount: 1,
    description: `Targeted ${category} sub-module exercise centering on ${topicTitle}.`,
    difficulty: 'Medium',
    questions: [
      {
        id: `toefl-[reading]-${topicTitle.toLowerCase().replace(/\s+/g, '-')}`,
        section: 'Reading',
        title: `${category}: ${topicTitle}`,
        prompt: item.prompt,
        passage: item.passage,
        options: item.options,
        correctAnswer: item.correctAnswer,
        timeLimit: 120,
        type: 'multiple-choice'
      }
    ]
  };
}

export interface ToeflListeningDrillTemplate {
  audioText: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export const TOEFL_LISTENING_DRILLS_DATA: Record<string, ToeflListeningDrillTemplate> = {
  'Marine Bioluminescence': {
    audioText: "Professor: Welcome back, everyone. Today we're continuing our exploration of extreme ocean marine environments, specifically looking at bioluminescence. Now, unlike fluorescence where substances absorb light and re-emit it, bioluminescence is an active, living chemical reaction. It's produced by organisms themselves. The reaction fundamentally requires two key compounds: a substrate called luciferin, and an enzyme, luciferase. When oxygen reacts with luciferin in the presence of luciferase, it produces a photon of cold light—meaning less than 20% of the reaction produces heat. Now, in the twilight zone of the deep ocean, about 90% of all organisms utilize biology-induced light. Why? Well, three major reasons: defense, predation, and communication. For defense, consider the deep-sea shrimp. When threatened, it actually spews out a glowing substance that blinds and confuses predators, allowing the shrimp to escape into the pitch black water. It’s an organic flashbang, if you will. Other organisms use it as a counter-illumination camouflage to blend in with faint sunlight filtering from above.",
    prompt: "According to the professor, what distinguishes bioluminescence from fluorescence?",
    options: [
      "Bioluminescence requires active external sunlight absorption to spark the light.",
      "Bioluminescence is an internal chemical process requiring luciferin and luciferase.",
      "Fluorescence is only observed in terrestrial organisms, while bioluminescence is marine.",
      "Fluorescence produces a high level of heat, whereas bioluminescence is entirely warm light."
    ],
    correctAnswer: "Bioluminescence is an internal chemical process requiring luciferin and luciferase."
  },
  'Behavioral Economics': {
    audioText: "Professor: Alright, let's explore behavioral economics... Specifically, the concept of Choice Architecture and 'Nudging,' developed by Richard Thaler and Cass Sunstein. Now, traditional classical economics assumes human beings are perfectly rational agents—what we call 'Homo Economicus.' We supposedly weigh costs and benefits perfectly and make optimal decisions. But behavioral economics proves that in real life, humans suffer from cognitive fatigue and emotional biases. A 'nudge' is a subtle modification of the decision-making environment that alters people's behavior in a predictable way, without forbidding any options or changing their economic incentives. For example, placing fresh fruits at eye level in school cafeterias while putting sugary, processed snacks on lower, hard-to-reach shelves is a classic nudge. Students aren't banned from buying snacks; it's just that the healthy path is made friction-free. If you charge more for snacks, that's an economic disincentive, not a nudge.",
    prompt: "Which of the following scenarios describes a 'nudge' as explained by the professor?",
    options: [
      "Imposing an additional ten percent cash tax on sugary, carbonated beverages.",
      "Arranging fresh organic fruits at eye-level on cafeteria tables while placing candy in lower drawers.",
      "Banning the sale of artificial energy drinks inside all high school campuses.",
      "Offering a direct cash back reward to students who consume fresh vegetables."
    ],
    correctAnswer: "Arranging fresh organic fruits at eye-level on cafeteria tables while placing candy in lower drawers."
  },
  'Volcanic Basalt': {
    audioText: "Professor: Today we will analyze basaltic lava flows. Basalt is an aphanitic, dark-colored mafic igneous rock. Because it is low in silica, it has an incredibly low viscosity, meaning it flows very smoothly over vast distances. Now, when basalt cools underwater—such as along mid-ocean ridges—it undergoes rapid physical alteration due to cold seawater. This forms rounded, sleeping-bag-like structures called 'pillow basalt.' On dry land, however, basalt can undergo a fascinating cooling phenomenon known as columnar jointing. As a thick, hot lava flow cools down, it contracts horizontally. This contraction creates systematic tension cracks that typically meet at 120-degree angles, forming near-perfect hexagonal stone columns. The Giant's Causeway in Northern Ireland is a pristine instance of this majestic columnar fracturing.",
    prompt: "What geological process is directly responsible for the development of hexagonal columns in dry land basalt?",
    options: [
      "Rapid chemical erosion caused by intense acidic rainstorms.",
      "Horizontal contraction and tension cracking during slow igneous cooling.",
      "Intense underwater tectonic pressure compressing magma blocks.",
      "Metamorphic recrystallization stimulated by volcanic steam jets."
    ],
    correctAnswer: "Horizontal contraction and tension cracking during slow igneous cooling."
  },
  'Meal Plan Upgrade': {
    audioText: "Student: Hi! I wanted to check if it's still possible to change my dining hall meal plan? I currently have the 'Basic Bronze' package, but I keep running out of swipes before Friday.\nCampus Official: Welcome! Let me pull up your account. Yes, you're currently on the Bronze plan, which gives you 10 swipes per week. We are in week three of the semester. According to university policy, you can upgrade to a higher tier plan—like 'Gold' or 'Platinum'—at any point during the first four weeks of the semester. However, you can't downgrade to a smaller package once the first week has ended. If you upgrade today, the additional cost will be prorated on your Student Account bill within three business days.\nStudent: That's great, let's do the Gold plan! That has 15 weekly swipes, right?\nCampus Official: That's correct. 15 swipes per week, and it includes 150 'Flex Dollars' per term for use at campus coffee shops. I will process this upgrade now. You'll see the system reflected in about ten minutes, and your ID card will be active for 15 swipes starting with dinner tonight.",
    prompt: "According to the university policy explained by the official, which statement is true?",
    options: [
      "Dining hall upgrades are only permitted during the first week of classes.",
      "Students are allowed to upgrade their meal plan at any point during the first four weeks.",
      "Downgrading to a lower meal package is allowed up to week six of the term.",
      "ID cards require up to three business days to activate after a dining plan shift."
    ],
    correctAnswer: "Students are allowed to upgrade their meal plan at any point during the first four weeks."
  },
  'Library Fines Dispute': {
    audioText: "Student: Excuse me, I received an automatically generated email notice saying my library account is suspended due to an outstanding fine of forty dollars? But I'm sure I returned the reserve book on time!\nLibrarian: Let's take a look. Ah, I see. The book is 'Advanced Kinetics.' Our library system logs show it was checked out on a course reserve. Now, standard books can be borrowed for up to three weeks, with a fine of fifty cents per day for late returns. However, reserve books can only be checked out for a maximum of three hours because of high demand. Late fees for course reserves are much severe—specifically, ten dollars per hour. It looks like you returned this reserve textbook four hours past the deadline on Thursday afternoon.\nStudent: Oh, I see! I thought reserve books had a grace period of one day because they are for campus study, and I fell asleep in the student center...",
    prompt: "Why was the student charged a high fine of forty dollars?",
    options: [
      "The book 'Advanced Kinetics' was lost and required complete replacement.",
      "The book was a course reserve book, which accrues late fees of ten dollars per hour.",
      "The student returned a standard book four weeks after the standard three-week borrowing window.",
      "The library charges a general flat fine of forty dollars for any overdue weekend books."
    ],
    correctAnswer: "The book was a course reserve book, which accrues late fees of ten dollars per hour."
  },
  'Lab Assistant Application': {
    audioText: "Student: Professor Vance? Thanks for meeting me. I saw the listing on the chemistry department bulletin board for a student laboratory assistant. I wanted to apply for the vacancy.\nProfessor: Ah, yes. The assistant role for the organic synthesis lab. It's a great opportunity, but the workload is rigorous. I'm looking for a student coworker who has completed Chemistry 201 with an A or B, and has experience with basic equipment calibration. You would be responsible for preparatory material setups, organizing reagent bottles, and maintaining equipment hygiene. It's 10 hours a week.\nStudent: I completed Chem 201 last term with an 'A-', and I worked as a high school lab aid, so I'm very familiar with hotplates, pipettes, and weighing balances.\nProfessor: Excellent, that matches what we need. You will need to submit a brief academic resume and a recommendation note from your Chem 201 instructor by Friday noon. I will review all candidate files over the weekend and schedule formal interviews next week.",
    prompt: "What does the professor require the student to submit by Friday in order to apply for the vacancy?",
    options: [
      "A graded organic chemistry exam paper and a letters of reference list.",
      "A brief academic resume and a recommendation note from their Chem 201 instructor.",
      "A formal transcript showing they completed undergraduate Chemistry 305.",
      "A certification proving they finished professional laboratory work safety courses."
    ],
    correctAnswer: "A brief academic resume and a recommendation note from their Chem 201 instructor."
  }
};

export function getToeflListeningDrill(topicTitle: string, category: string): MockTest {
  const matched = TOEFL_LISTENING_DRILLS_DATA[topicTitle];
  const item = matched || {
    audioText: "This is a specialized practice drill designed to test your oral, synthesis, and key note retention skills on various academic and conversation topics in TOEFL Listening.",
    prompt: `Analyze the main auditory arguments of "${topicTitle}" to find the correct answer.`,
    options: [
      "Option A (Correct auditory detail)",
      "Option B (Acoustic and semantic distractor)",
      "Option C (Partially complete choice)",
      "Option D (Irrelevant dialogue reference)"
    ],
    correctAnswer: "Option A (Correct auditory detail)"
  };

  return {
    id: `toefl-list-drill-${topicTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    exam: 'TOEFL',
    title: `TOEFL Listening - ${topicTitle} Drill`,
    duration: '2 mins',
    questionsCount: 1,
    description: `Targeted ${category} sub-module auditory exercise centering on ${topicTitle}.`,
    difficulty: 'Medium',
    questions: [
      {
        id: `toefl-[listening]-${topicTitle.toLowerCase().replace(/\s+/g, '-')}`,
        section: 'Listening',
        title: `${category}: ${topicTitle}`,
        prompt: item.prompt,
        audioText: item.audioText,
        options: item.options,
        correctAnswer: item.correctAnswer,
        timeLimit: 120,
        type: 'multiple-choice'
      }
    ]
  };
}

export interface ToeflWritingDrillTemplate {
  passage?: string;
  prompt: string;
  sampleAnswer?: string;
}

export const TOEFL_WRITING_DRILLS_DATA: Record<string, ToeflWritingDrillTemplate> = {
  'Build a Sentence - 13': {
    passage: "Rearrange the scrambled chunks to complete Speaker B's response in a coherent sentence.\n\nSpeaker A: Under no circumstances should students share their private database passwords.\nSpeaker B: [I understand, and I would never reveal my credentials to anyone else.]",
    prompt: "Drag or type the words in the exact correct order below to complete the sentence using these chunks: 'to anyone else' / 'my credentials' / 'I would' / 'and' / 'reveal' / 'never' / 'I understand,'",
    sampleAnswer: "I understand, and I would never reveal my credentials to anyone else."
  },
  'Build a Sentence - 12': {
    passage: "Rearrange the scrambled chunks to complete Speaker B's response in a coherent sentence.\n\nSpeaker A: Why are you so determined to switch your graduation major to architecture?\nSpeaker B: [Only by studying classic structures can we design sustainable future habitats.]",
    prompt: "Type the words in the correct syntactic order below using these chunks: 'by studying' / 'can we' / 'classic structures' / 'sustainable' / 'Only' / 'future habitats' / 'design'",
    sampleAnswer: "Only by studying classic structures can we design sustainable future habitats."
  },
  'Build a Sentence - 11': {
    passage: "Rearrange the scrambled chunks to complete Speaker B's response in a coherent sentence.\n\nSpeaker A: Did the campus official accept your late housing registration application?\nSpeaker B: [Not only did she accept it, but she also waived the penalty fee.]",
    prompt: "Type the words in the correct syntactic order below using these chunks: 'did she' / 'also' / 'Not only' / 'waived' / 'accept it,' / 'but she' / 'the penalty fee'",
    sampleAnswer: "Not only did she accept it, but she also waived the penalty fee."
  },
  'Build a Sentence - 10': {
    passage: "Rearrange the scrambled chunks to complete Speaker B's response in a coherent sentence.\n\nSpeaker A: Do you think our biology advisor will sponsor our research project next term?\nSpeaker B: [Rarely does Professor Vance endorse student projects during their freshman year.]",
    prompt: "Type the words in the correct syntactic order below using these chunks: 'does Professor Vance' / 'endorse student' / 'Rarely' / 'their freshman year' / 'during' / 'projects'",
    sampleAnswer: "Rarely does Professor Vance endorse student projects during their freshman year."
  },
  'Build a Sentence - 9': {
    passage: "Rearrange the scrambled chunks to complete Speaker B's response in a coherent sentence.\n\nSpeaker A: Why isn't the campus shuttle operating along the north campus route today?\nSpeaker B: [So severe was the morning ice storm that the administration canceled all transit services.]",
    prompt: "Type the words in the correct syntactic order below using these chunks: 'the morning' / 'was' / 'administration canceled' / 'So severe' / 'ice storm' / 'that the' / 'all transit services'",
    sampleAnswer: "So severe was the morning ice storm that the administration canceled all transit services."
  },
  'Geographic Mobility': {
    passage: "Academic Discussion Board\n\nProfessor Vance: Today we will discuss geographic mobility. Many people live in the city or country where they grew up, while others move across regions or states for work or lifestyle changes. In your post, discuss whether high geographic mobility is beneficial or harmful for individuals and communities.\n\nStudent A (Sarah): I think moving is highly beneficial. It forces individuals to adapt, learn new cultures, and find better career matches. Societies become more dynamic and open.\n\nStudent B (Marcus): I disagree. Constant relocation weakens local community ties and separates families. Traditional community support systems collapse when people are always on the move.",
    prompt: "Write a response of at least 150 words participating in this classroom discussion, establishing a clear thesis and building on the arguments of Sarah and Marcus.",
    sampleAnswer: "In the discussion regarding geographic mobility, I strongly agree with Sarah's perspective that relocation offers critical advantages. Broadening one's horizons by moving encourages resilience and exposes individuals to diverse viewpoints, driving both personal and professional growth. While Marcus raises a valid concern about the potential weakening of local community ties, modern communication technologies make it much simpler to maintain distant family relationships than in previous generations. Furthermore, when individuals move, they bring fresh ideas and diverse skills to their new environments, making communities culturally vibrant and economically innovative. Therefore, the dynamic benefits of high geographic mobility far outweigh the disadvantages, promoting an adaptable and open-minded society."
  },
  'Online Classes': {
    passage: "Academic Discussion Board\n\nProfessor Vance: Online platforms have grown rapidly in higher education. Some support this shift as it offers absolute scheduling flexibility, while others argue that physical attendance is irreplaceable for student integration. Should universities convert core curriculum courses into fully remote models?\n\nStudent A (Emily): Fully online core courses are ideal because students who work or commute can progress at their own speed, reducing financial and spatial pressure.\n\nStudent B (Dylan): I worry about losing qualitative learning. Core courses should be discussion-intensive. In-person debates, immediate questions, and laboratory tasks suffer in isolation.",
    prompt: "Write a response of at least 150 words participating in this discussion board, presenting your own stance and critiquing the views of Emily and Dylan.",
    sampleAnswer: "While remote classes, as Emily points out, provide unprecedented convenience and flexibility, I strongly support Dylan's contention that core university courses should remain primarily in-person. The core undergraduate curriculum is designed to lay an academic foundation and foster peer networking. In-person lectures and spontaneous study group collaborations cultivate high critical-thinking skills and deep subject comprehension that are difficult to reproduce in an isolated digital environment. However, a hybrid model may serve as an optimal compromise. Basic lectures can be recorded online to provide Emily's noted accessibility, while weekly seminars and student workshops are kept on-campus to maintain essential debate and collaboration. In conclusion, physical dialogue remains essential for a comprehensive higher education."
  },
  'Relieving Stress': {
    passage: "Academic Discussion Board\n\nProfessor Vance: High levels of stress affect most students and young professionals. What is the most effective coping strategy to balance modern pressure? Do you recommend individual activities (such as reading, meditation, or walking) or active group social engagements?\n\nStudent A (Jessica): Solitary relaxation like mindfulness is the best because it lets you process your thoughts internally without external expectations or social anxiety.\n\nStudent B (Brian): Speaking with dear friends or playing community sports is far more therapeutic. High stress breeds isolation, and being around people breaks that negative spiral.",
    prompt: "Write a response of at least 150 words detailing your preferred stress relief strategy, responding to the arguments presented by Jessica and Brian.",
    sampleAnswer: "In my opinion, both solitary mindfulness and social support systems play vital roles in coping with stress, but I believe that solitary activities, as Jessica suggested, are the fundamental starting point. Before we can engage positively with others, we must first find inner calm and regulate our nervous system. Practices like meditation, journaling, and solo walks allow individuals to reflect and digest their challenges in a safe space free of performance anxiety. That being said, once internal balance is restored, Brian’s suggestion of active social support becomes highly protective. Sharing worries with trustworthy friends or collaborating in physical sports relieves tension and reinforces a sense of belonging. Therefore, the most effective strategy is a sequential combination: solitary reflection to calm the mind, followed by social interaction to rebuild energy."
  },
  'Extreme Sports': {
    passage: "Academic Discussion Board\n\nProfessor Vance: High-risk extreme sports, such as skydiving or white-water rafting, have become wildly popular. Should local administrations place stricter boundaries on these sports to protect citizens, or are they a matter of individual freedom?\n\nStudent A (Liam): Administrations should regulate them strictly. When athletes land in remote, dangerous spots, taxpayers pay for expensive rescue teams and emergency healthcare.\n\nStudent B (Clara): People have the absolute right to choose their hobbies. Extreme sports challenge human capabilities and boost eco-tourism in regions that host them.",
    prompt: "Write a response of at least 150 words presenting your viewpoint of extreme sports regulations, addressing rescue costs and personal freedom.",
    sampleAnswer: "Regarding extreme sports, I believe Clara’s view on individual freedom is correct, and government bans are an unnecessary overreach. Individuals should have the liberty to engage in activities they find fulfilling, provided they are fully informed of the risks. However, to address Liam's very valid point regarding the public cost of emergency rescues, a sensible regulatory framework should be established. Extreme sports enthusiasts could be required to purchase specialized liability insurance that covers the cost of potential remote rescue missions. This maintains personal freedom while shielding taxpayers from fiscal burdens. Additionally, licensing requirements for sports operators can guarantee basic safety gear standards. Through insurance and certified operations, extreme sports can thrive safely without impacting the public budget."
  },
  'City Government Spending': {
    passage: "Academic Discussion Board\n\nProfessor Vance: In times of tight budgets, municipal leaders face hard choices. Should city funds prioritize long-term public transport expansions, or should they focus on parks, green spaces, and community athletics?\n\nStudent A (Nathan): High-quality public transit is a priority. It reduces traffic, allows lower-income workers to access employment, and decreases carbon emissions.\n\nStudent B (Sophia): Green parks are the lungs of the city. Without local community spaces, mental mental health declines. Public transport is useless if city centers are unlivable.",
    prompt: "Write a response of at least 150 words expressing your opinion on municipal budget prioritization, synthesizing Nathan and Sophia's stances.",
    sampleAnswer: "The debate over city budget prioritization highlights a critical tension in urban planning. While Sophia's point about parks being crucial for mental well-being is sound, I strongly believe that municipal funding must prioritize public transportation, as Nathan recommends. A robust public transit network is the backbone of any urban economy; it directly affects social equity by offering cheap, reliable access to employment, education, and healthcare for lower-income groups who may not own cars. Furthermore, transit development is key to tackling environmental challenges, as it lowers carbon emissions and relieves severe traffic congestion. In contrast, parks, though beautiful and beneficial, can be maintained through community volunteer efforts and private sponsorships. Thus, transit funding must be the priority to ensure the city is both functional and accessible to all."
  },
  'Camping Trip': {
    passage: "Email Scenario: Weekend Biology Field Trip\n\nWrite a polite, structured email to Dr. Robert Vance, the coordinator of the campus Biology Club. Request permission to join the upcoming biology field recording trip to the local Redwood forest, explain why you are interested in the flora research, and offer to help setup sleeping tents.",
    prompt: "Ensure your email has a polite salutation, a clear request statement, structured paragraphs, and a formal sign-off.",
    sampleAnswer: "Subject: Request to Join Redwood Forest Biology Field Trip\n\nDear Dr. Vance,\n\nI hope this email finds you well. My name is Alex, and I am currently a freshman majoring in Environmental Science. I am writing to express my eager interest in joining the Biology Club’s upcoming weekend field recording trip to the Redwood Forest.\n\nI have been studying forest ecology and flora taxonomy in my introductory coursework and am incredibly motivated to participate in your active botanical records. This experience would provide me with valuable hands-on training and insights into redwood canopy conservation.\n\nI understand that planning trips of this nature involves considerable logistics. I would be more than happy to assist the group with transport packing and camp setup, including erecting the sleeping tents and organizing biological gear. Thank you so much for your time and consideration of my request. I look forward to your response.\n\nSincerely,\n\nAlex Mercer"
  },
  'Elevator out of Order': {
    passage: "Email Scenario: Dormitory Elevator Out of Service\n\nWrite a formal letter to the University Facilities Management Office. Request repairs for the North Tower passenger elevator, which has been nonfunctional for 48 hours. Explain the physical difficulties faced by students carrying groceries and books to upper floors.",
    prompt: "Ensure your letter is respectful yet firm, highlighting safety risks and accessibility concerns.",
    sampleAnswer: "Subject: Urgent Reparation Call - North Tower Elevator Out of Service\n\nDear Facilities Management Department,\n\nI am writing to report an urgent issue regarding the main passenger elevator in the North Tower student dormitory. The elevator has been completely nonfunctional for over 48 hours, and no maintenance alerts have been posted.\n\nThis continuous outage has caused substantial difficulties for residents. Carrying heavy textbooks, laundry, and groceries up to the twelfth floor is physically demanding, but more importantly, this situation represents a serious accessibility barrier for disabled residents. Several students with physical limitations are currently unable to leave or return to their dorm rooms safely.\n\nWe request that facilities prioritize dispatching an emergency technician to restore service as soon as possible. Thank you for your fast intervention on behalf of the North Tower residential community.\n\nBest regards,\n\nJordan Green\nNorth Tower Hall Resident"
  },
  'Carpooling Group': {
    passage: "Email Scenario: Weekend Campus Store Carpool\n\nWrite a proposal email to your dorm floor mates. Propose setting up a weekend carpooling schedule for trips to the off-campus supermarket. Emphasize saving fuel costs and shrinking your environmental footprint.",
    prompt: "Ensure the draft is warm and encouraging, clear about logistics, and invites suggestions.",
    sampleAnswer: "Subject: Weekly Off-Campus Supermarket Carpooling Proposal!\n\nHey Everyone,\n\nHope you're all having a great week! I was thinking about our weekend grocery runs to the off-campus supermarket and wanted to suggest a weekly carpool team.\n\nAs most of us know, public transit is a bit slow on Sundays, and calling individual ride shares is getting quite expensive. By setting up a rotating carpool system, we can group together, share fuel costs, and make grocery runs faster and more fun. Plus, reducing the number of individual trips is an easy way for us to reduce our environment footprint!\n\nI’m happy to drive this coming Saturday morning at 10 AM. Let me know if you are interested or have ideas about schedules. Hope to hear from you soon!\n\nWarmly,\n\nTaylor Harris\nRoom 305"
  },
  'Cooking Class': {
    passage: "Email Scenario: Culinary Basics Course Openings Inquiry\n\nWrite an inquiry email to the Community Continuing Education Registrar. Ask about available seats in the introductory cooking class starting next Monday, including registration deadline details and fee structures.",
    prompt: "Maintain a clean, professional tone, asking specific questions for clarity.",
    sampleAnswer: "Subject: Inquiry Regarding Openings in Introductory Culinary Basics Class\n\nDear Registrar's Office,\n\nI hope this email finds you well. I am writing to inquire if there are still openings in the Introductory Culinary Basics and Food Hygiene course scheduled to begin next Monday afternoon.\n\nAdditionally, could you please confirm the final registration deadline and the fee structure for non-degree students? If there is any required kitchen safety equipment or textbook I should purchase in advance, please let me know.\n\nThank you for your assistance, and I look forward to your guidance on the registration steps.\n\nSincerely,\n\nCasey Jones\nInquiring Student"
  },
  'Mentoring Program': {
    passage: "Email Scenario: Freshman Student Mentoring Vacancy\n\nWrite a formal application email to the Coordinator of the Campus Student Success Center. Express your interest in the vacancy for a peer mentor, summarize your dormitory integration skills, and attach your GPA details.",
    prompt: "Structure your cover letter style application to outline your personal qualities and student helper background.",
    sampleAnswer: "Subject: Application for Peer Student Mentor Vacancy - Casey Miller\n\nDear Student Success Coordinator,\n\nI am writing to formally apply for the Peer Student Mentor position for the incoming semester, as listed on the Student Engagement Center bulletin.\n\nAs a junior majoring in Psychology with a 3.8 GPA, I am deeply committed to campus integration and student success. Having served as a resident assistant helper last term, I have extensive experience assisting first-year students in navigating academic stress, registering for labs, and resolving dormitory disputes. I would love the opportunity to share these skills and guide incoming freshmen through their transition.\n\nMy current class schedule is highly flexible, allowing me to dedicate the required 10 hours per week. Thank you for considering my application. I look forward to the possibility of an interview.\n\nSincerely,\n\nCasey Miller\nPhone: (555) 0192-384"
  }
};

export function getToeflWritingDrill(topicTitle: string, category: string): MockTest {
  const item = TOEFL_WRITING_DRILLS_DATA[topicTitle] || {
    passage: "This is a specialized writing workspace designed to evaluate academic writing fluency.",
    prompt: `Synthesize the prompt arguments for "${topicTitle}" to construct a formal essay.`,
    sampleAnswer: "This is a sample outstanding model response for the writing exercise."
  };

  return {
    id: `toefl-writ-drill-${topicTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    exam: 'TOEFL',
    title: `TOEFL Writing - ${topicTitle} Drill`,
    duration: '10 mins',
    questionsCount: 1,
    description: `Targeted ${category} sub-module essay exercise centering on ${topicTitle}.`,
    difficulty: 'Medium',
    questions: [
      {
        id: `toefl-[writing]-${topicTitle.toLowerCase().replace(/\s+/g, '-')}`,
        section: 'Writing',
        title: `${category}: ${topicTitle}`,
        prompt: item.prompt,
        passage: item.passage,
        sampleAnswer: item.sampleAnswer,
        timeLimit: 600,
        type: 'text-input'
      }
    ]
  };
}

export interface ToeflSpeakingDrillTemplate {
  passage?: string;
  prompt: string;
  sampleAnswer?: string;
}

export const TOEFL_SPEAKING_DRILLS_DATA: Record<string, ToeflSpeakingDrillTemplate> = {
  'Car Rental Agency': {
    passage: "To rent a full-size SUV for the weekend, you will need to provide a valid driver's license alongside a major credit card for the security deposit.",
    prompt: "Listen carefully to the passage and repeat the sentence exactly. Focus on your pronunciation, natural word linking, and speech rhythm.",
    sampleAnswer: "To rent a full-size SUV for the weekend, you will need to provide a valid driver's license alongside a major credit card for the security deposit."
  },
  'Furniture Store': {
    passage: "Most of the wooden dining tables on display are handcrafted from sustainable oak and come with a comprehensive five-year warranty.",
    prompt: "Listen carefully to the passage and repeat the sentence exactly. Pay close attention to consonant clarity and even vocal pacing.",
    sampleAnswer: "Most of the wooden dining tables on display are handcrafted from sustainable oak and come with a comprehensive five-year warranty."
  },
  'Buffet Restaurant': {
    passage: "The evening seafood buffet offers unlimited crab legs and oysters, which are sourced fresh daily from local sustainable fisheries.",
    prompt: "Listen carefully to the passage and repeat the sentence exactly. Focus on maintaining an engaging, clear physical projection copy.",
    sampleAnswer: "The evening seafood buffet offers unlimited crab legs and oysters, which are sourced fresh daily from local sustainable fisheries."
  },
  'Internet Cafe': {
    passage: "High-speed gaming PCs are located in the back room, where users can purchase hourly passes at the front counter.",
    prompt: "Listen carefully to the passage and repeat the sentence exactly. Ensure precision in vowel stress and structural clarity.",
    sampleAnswer: "High-speed gaming PCs are located in the back room, where users can purchase hourly passes at the front counter."
  },
  'Hotel': {
    passage: "Complimentary breakfast is served on the mezzanine floor from six to ten in the morning, and check-out is strictly at noon.",
    prompt: "Listen carefully to the passage and repeat the sentence exactly. Direct focus towards correct word-level intonation dips.",
    sampleAnswer: "Complimentary breakfast is served on the mezzanine floor from six to ten in the morning, and check-out is strictly at noon."
  },
  'Favorite Item': {
    passage: "Simulated Interview Topic: Personal Belongings\n\nInterviewer: Hello, welcome back to the language evaluation center. For our first question, I'd like you to describe your absolute favorite childhood possession. Why was it important to you, and do you still have it today?",
    prompt: "Prepare your response in 15 seconds. Then record your spoken answer within 45 seconds (minimum 150 words equivalent recommended in content, or detailed multi-sentence speech structure). Describe its significance and present status.",
    sampleAnswer: "My absolute favorite childhood possession was a small, well-worn leather baseball glove that my grandfather gave me when I was seven years old. It was incredibly important to me because it represented the hours we spent playing catch in his backyard, which are some of my most cherished memories. To me, that glove wasn't just sports gear; it was a physical link to his support and encouragement. Yes, I still have it today; it sits on a shelf in my study, serving as a daily reminder of his kindness and the value of persistent practice."
  },
  'Dream Home': {
    passage: "Simulated Interview Topic: Future Planning and Architecture\n\nInterviewer: Let's discuss housing preferences. If you could design and live in your absolute dream home anywhere in the world, what would it look like, and which location would you choose?",
    prompt: "Prepare your response in 15 seconds. Then record your spoken answer within 45 seconds. Detail the architectural features, sustainable materials, and the environmental reasons behind your location choice.",
    sampleAnswer: "My dream home would be a modern, energy-efficient cabin located in the Swiss Alps. Architecturally, it would feature massive floor-to-ceiling triple-glazed glass windows to capture the natural sunlight and stunning mountain views, while being built primarily with sustainable local timber and natural stone. It would also utilize solar panels and a geothermal heating system to minimize its environmental footprint. I would choose this high-altitude alpine location because it offers a perfect mixture of serene, quiet nature and a healthy lifestyle, providing an inspiring space to write and research."
  },
  'Artistic Skill': {
    passage: "Simulated Interview Topic: Creative Development\n\nInterviewer: I'd like to ask about the arts. If there is one artistic skill—such as oil painting, playing the piano, or theatrical acting—that you have always wanted to master, what would it be and why?",
    prompt: "Prepare your response in 15 seconds. Then record your spoken answer within 45 seconds. Explain the artistic allure, personal gratification, and how you might start practicing.",
    sampleAnswer: "The one artistic skill I have always wanted to master is playing the classical piano. I have always been deeply moved by the expressive range of the instrument, from quiet, melancholic melodies to powerful, thunderous movements. Mastering the piano would bring immense personal satisfaction, as it provides a non-verbal outlet for stress and creativity. To begin, I would invest in a compact weighted-key digital piano and dedicate thirty minutes each morning to basic scale drills and online tutorials, eventually hiring a local instructor to refine my finger posture."
  },
  'Memories & Photographs': {
    passage: "Simulated Interview Topic: Preserving History\n\nInterviewer: People utilize photographs, journals, or video logs to lock in key life events. In your opinion, what is the best way to preserve memories for future generations, and why do you find it superior?",
    prompt: "Prepare your response in 15 seconds. Then record your spoken answer within 45 seconds. Synthesize options and justify your choice.",
    sampleAnswer: "In my opinion, keeping a combined digital journal accompanied by selective photographs is the most effective way to preserve personal history. While standalone pictures capture physical appearances, they often lack the subjective context of what the individuals felt or thought at that exact moment. A written journal entry provides that missing emotional layer, capturing dreams, worries, and historical nuances. Together, text and image create a rich, multidimensional narrative that allows future generations to truly understand who we were, rather than just what we looked like."
  },
  'Fashion choices': {
    passage: "Simulated Interview Topic: Social Trends and Expressive Garments\n\nInterviewer: Some individuals prioritize comfort and utility when selecting clothing, while others utilize fashion as a crucial tool for personal expression or professional status. What is your philosophy regarding your wardrobe, and why?",
    prompt: "Prepare your response in 15 seconds. Then record your spoken answer within 45 seconds. Outline your wardrobe philosophy and how it shapes your self-confidence.",
    sampleAnswer: "My personal philosophy regarding my wardrobe is to achieve a balanced synthesis where comfort meets deliberate, professional presentation. I believe that clothing functions as a silent form of introduction, communicating respect for the people we meet. Therefore, I select well-tailored, classic garments in neutral tones that are highly comfortable for long working hours yet sleek enough to project organizational focus. This balanced stance boosts my self-confidence because I feel physically relaxed while knowing my appearance aligns with professional expectations."
  }
};

export function getToeflSpeakingDrill(topicTitle: string, category: string): MockTest {
  const item = TOEFL_SPEAKING_DRILLS_DATA[topicTitle] || {
    passage: "This is a specialized speaking workspace designed to evaluate academic verbal fluency.",
    prompt: `Present your spoken analysis of "${topicTitle}" within the allotted time limit.`,
    sampleAnswer: "This is a model spoken feedback profile for the active exercise."
  };

  return {
    id: `toefl-spk-drill-${topicTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    exam: 'TOEFL',
    title: `TOEFL Speaking - ${topicTitle} Drill`,
    duration: '45 sec',
    questionsCount: 1,
    description: `Targeted ${category} sub-module speaking exercise centering on ${topicTitle}.`,
    difficulty: 'Medium',
    questions: [
      {
        id: `toefl-[speaking]-${topicTitle.toLowerCase().replace(/\s+/g, '-')}`,
        section: 'Speaking',
        title: `${category}: ${topicTitle}`,
        prompt: item.prompt,
        passage: item.passage,
        sampleAnswer: item.sampleAnswer,
        timeLimit: 45,
        type: 'speak'
      }
    ]
  };
}

