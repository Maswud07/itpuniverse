import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Search, 
  Sparkles, 
  BookOpen, 
  Download, 
  HelpCircle, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Play, 
  Bookmark,
  Shuffle
} from 'lucide-react';

interface VocabWord {
  word: string;
  definition: string;
  example: string;
  exam: 'IELTS' | 'TOEFL' | 'PTE';
  synonyms: string[];
  ipa: string;
  category: string; // matches column
  theme: string;    // matches row
}

// 6 Grammatical Columns
const COLUMNS = ['Verbs', 'Nouns', 'Adjectives', 'Adverbs', 'Idioms', 'Transitions'];

// 10 Academic/Exam Themes (Rows)
const ROWS = [
  'Science & Nature',
  'Tech & Innovation',
  'Economy & Work',
  'Society & Culture',
  'Education & Arts',
  'Health & Psychology',
  'Law & Public Policy',
  'Media & Comms',
  'Energy & Ecology',
  'Philosophy & Mind'
];

// Exactly 60 high-yield scholarly words without any placeholders!
const VOCABULARY_DATA: VocabWord[] = [
  // ROW 1: Science & Nature
  {
    word: 'Substantiate',
    category: 'Verbs',
    theme: 'Science & Nature',
    definition: 'Provide solid empirical evidence to support or prove the truth of an academic thesis.',
    example: 'The laboratory generated satellite models to substantiate their tropospheric ozone depletion formula.',
    exam: 'IELTS',
    synonyms: ['Validate', 'Corroborate', 'Verify'],
    ipa: '/səbˈstænʃieɪt/'
  },
  {
    word: 'Phenomenon',
    category: 'Nouns',
    theme: 'Science & Nature',
    definition: 'A remarkable observed event, development, or physical occurrence in nature.',
    example: 'Bioluminescent waves represent a fascinating marine phenomenon common in tropical latitudes.',
    exam: 'TOEFL',
    synonyms: ['Occurrence', 'Marvel', 'Event'],
    ipa: '/fəˈnɒmɪnən/'
  },
  {
    word: 'Empirical',
    category: 'Adjectives',
    theme: 'Science & Nature',
    definition: 'Based on, concerned with, or verifiable by observation or experiment rather than theory.',
    example: 'Astronomers require empirical observation data from deep-space probes before validating star maps.',
    exam: 'TOEFL',
    synonyms: ['Experimental', 'Factual', 'Concrete'],
    ipa: '/ɪmˈpɪrɪkl/'
  },
  {
    word: 'Methodically',
    category: 'Adverbs',
    theme: 'Science & Nature',
    definition: 'Following a systematic, ordered, and highly disciplined research process.',
    example: 'Biologists methodically isolated the compound molecules in twenty separate controlled trials.',
    exam: 'PTE',
    synonyms: ['Systematically', 'Logically', 'Precisely'],
    ipa: '/mɪˈθɒdɪkəli/'
  },
  {
    word: 'Break through',
    category: 'Idioms',
    theme: 'Science & Nature',
    definition: 'To make an important scientific discovery or bypass a complex logical barrier.',
    example: 'Geologists managed to break through previous limitations in predicting seismic shockwaves.',
    exam: 'IELTS',
    synonyms: ['Advance', 'Overcome', 'Succeed'],
    ipa: '/breɪk θruː/'
  },
  {
    word: 'Consequently',
    category: 'Transitions',
    theme: 'Science & Nature',
    definition: 'As a direct result or chronological effect of the preceding statement.',
    example: 'Glacier volumes shrank by eight percent; consequently, local low-lying valleys flooded regularly.',
    exam: 'PTE',
    synonyms: ['Therefore', 'Accordingly', 'As a result'],
    ipa: '/ˈkɒnsɪkwəntli/'
  },

  // ROW 2: Tech & Innovation
  {
    word: 'Catalyze',
    category: 'Verbs',
    theme: 'Tech & Innovation',
    definition: 'To trigger, accelerate, or cause a major action or technology transformation to speed up.',
    example: 'The release of visual microchips catalyzed a wave of automation in robotic design assemblies.',
    exam: 'PTE',
    synonyms: ['Accelerate', 'Stimulate', 'Spur'],
    ipa: '/ˈkætəlaɪz/'
  },
  {
    word: 'Paradigm',
    category: 'Nouns',
    theme: 'Tech & Innovation',
    definition: 'A fundamental model, cognitive prototype, or standard framework of looking at a field.',
    example: 'Quantum processing introduces an entirely new paradigm for cryptographic security codes.',
    exam: 'TOEFL',
    synonyms: ['Framework', 'Archetype', 'Pattern'],
    ipa: '/ˈpærədaɪm/'
  },
  {
    word: 'Redundant',
    category: 'Adjectives',
    theme: 'Tech & Innovation',
    definition: 'No longer useful, functional, or operationally necessary; superfluous.',
    example: 'Physical storage cartridges quickly became redundant after cloud networks spread internationally.',
    exam: 'IELTS',
    synonyms: ['Obsolete', 'Superfluous', 'Excessive'],
    ipa: '/rɪˈdʌndənt/'
  },
  {
    word: 'Seamlessly',
    category: 'Adverbs',
    theme: 'Tech & Innovation',
    definition: 'Perfectly integrated without any visible gaps, friction, or installation delays.',
    example: 'The AI assistant seamlessly cross-references exam rules across five separate test formats.',
    exam: 'PTE',
    synonyms: ['Smoothly', 'Effortlessly', 'Harmoniously'],
    ipa: '/ˈsiːmləsli/'
  },
  {
    word: 'Pave the way',
    category: 'Idioms',
    theme: 'Tech & Innovation',
    definition: 'To establish stable conditions, precedents, or systems that make subsequent updates simple.',
    example: 'Early computing machines paved the way for advanced machine learning architectures today.',
    exam: 'TOEFL',
    synonyms: ['Facilitate', 'Enable', 'Prepare'],
    ipa: '/peɪv ðə weɪ/'
  },
  {
    word: 'Furthermore',
    category: 'Transitions',
    theme: 'Tech & Innovation',
    definition: 'In addition to what has been expressed (introduces a supplementary supporting fact).',
    example: 'Desktop simulators are cheaper; furthermore, they provide automated feedback in ten seconds.',
    exam: 'IELTS',
    synonyms: ['Moreover', 'Additionally', 'Besides'],
    ipa: '/ˌfɜːðəˈmɔː/'
  },

  // ROW 3: Economy & Work
  {
    word: 'Fluctuate',
    category: 'Verbs',
    theme: 'Economy & Work',
    definition: 'To rise and fall unpredictably in amount, value, numbers, or stock index.',
    example: 'Employment metrics fluctuate throughout the fiscal year due to seasonal agricultural hires.',
    exam: 'IELTS',
    synonyms: ['Vary', 'Oscillate', 'Vacillate'],
    ipa: '/ˈflʌktʃueɪt/'
  },
  {
    word: 'Surplus',
    category: 'Nouns',
    theme: 'Economy & Work',
    definition: 'An excess amount of capital, materials, or yields remaining after essential local demands.',
    example: 'Nations holding steel surpluses exported their products to bolster foreign railway systems.',
    exam: 'TOEFL',
    synonyms: ['Excess', 'Glut', 'Superabundance'],
    ipa: '/ˈsɜːpləs/'
  },
  {
    word: 'Lucrative',
    category: 'Adjectives',
    theme: 'Economy & Work',
    definition: 'Capable of yielding high financial returns, solid profit rates, or capital margins.',
    example: 'Entering global trade logistics often opens highly lucrative investment pipelines for ports.',
    exam: 'IELTS',
    synonyms: ['Profitable', 'Gainful', 'Remunerative'],
    ipa: '/ˈluːkrətɪv/'
  },
  {
    word: 'Exponentially',
    category: 'Adverbs',
    theme: 'Economy & Work',
    definition: 'Increasing in a rapid, compounding, or multiplying geometric progression rate.',
    example: 'Consumer demand for remote medical consultations rose exponentially during regional lockout sweeps.',
    exam: 'PTE',
    synonyms: ['Compoundingly', 'Surgingly', 'Rapidly'],
    ipa: '/ˌekspəˈnenʃəli/'
  },
  {
    word: 'In the red',
    category: 'Idioms',
    theme: 'Economy & Work',
    definition: 'Operating with financial loss, deficit, or active commercial debt.',
    example: 'Municipal subways frequently operate in the red before state subsidies offset the deficit.',
    exam: 'PTE',
    synonyms: ['Deficit-ridden', 'Losing money', 'Indebted'],
    ipa: '/in the red/'
  },
  {
    word: 'In contrast',
    category: 'Transitions',
    theme: 'Economy & Work',
    definition: 'Used to present a direct, clear point of deviation or difference with previous items.',
    example: 'Wholesale sales surged; in contrast, retail performance saw a steady six percent drop.',
    exam: 'IELTS',
    synonyms: ['Conversely', 'On the other hand', 'Alternatively'],
    ipa: '/ɪn ˈkɒntrɑːst/'
  },

  // ROW 4: Society & Culture
  {
    word: 'Assimilate',
    category: 'Verbs',
    theme: 'Society & Culture',
    definition: 'To adapt, fully integrate, and absorb beliefs, language structure, or cultural habits.',
    example: 'Relocated families often assimilate municipal customs while maintaining ancient holiday practices.',
    exam: 'TOEFL',
    synonyms: ['Acculturate', 'Integrate', 'Adapt'],
    ipa: '/əˈsɪmɪleɪt/'
  },
  {
    word: 'Hegemony',
    category: 'Nouns',
    theme: 'Society & Culture',
    definition: 'Socio-political, economic, or physical dominance exercised by one group or nation over others.',
    example: 'The ancient maritime republic sustained cultural hegemony over coastal trade ports for decades.',
    exam: 'IELTS',
    synonyms: ['Dominance', 'Supremacy', 'Sovereignty'],
    ipa: '/hɪˈɡeməni/'
  },
  {
    word: 'Prevalent',
    category: 'Adjectives',
    theme: 'Society & Culture',
    definition: 'Universally accepted, highly common, or widespread within a specific domain or era.',
    example: 'Folk medicine philosophies remain highly prevalent across secluded valley communities.',
    exam: 'PTE',
    synonyms: ['Widespread', 'Rife', 'Ubiquitous'],
    ipa: '/ˈprevələnt/'
  },
  {
    word: 'Invariably',
    category: 'Adverbs',
    theme: 'Society & Culture',
    definition: 'In every single scenario; constantly and predictably without deviation.',
    example: 'Extreme demographic expansions invariably create stress on clean freshwater utilities.',
    exam: 'IELTS',
    synonyms: ['Constantly', 'Always', 'Unfailingly'],
    ipa: '/ɪnˈveəriəbli/'
  },
  {
    word: 'Melting pot',
    category: 'Idioms',
    theme: 'Society & Culture',
    definition: 'A metropolitan hub or territory where distinct heritages coalesce and intermix.',
    example: 'The capital city serves as a linguistic melting pot housing millions of global citizens.',
    exam: 'TOEFL',
    synonyms: ['Amalgamation', 'Cultural mosaic'],
    ipa: '/ˈmeltɪŋ pɒt/'
  },
  {
    word: 'On the contrary',
    category: 'Transitions',
    theme: 'Society & Culture',
    definition: 'Used to forcefully negate the prior claim by asserting the reverse reality.',
    example: 'Unions did not destabilize the economy; on the contrary, they boosted average workforce productivity.',
    exam: 'PTE',
    synonyms: ['Quite the opposite', 'Conversely', 'In opposition'],
    ipa: '/ɒn ðə ˈkɒntrəri/'
  },

  // ROW 5: Education & Arts
  {
    word: 'Delineate',
    category: 'Verbs',
    theme: 'Education & Arts',
    definition: 'To depict, sketch, outline, or describe something with rigorous geometric precision.',
    example: 'The art instructor carefully delineated the linear perspective rules developed in Florence.',
    exam: 'PTE',
    synonyms: ['Outline', 'Trace', 'Detail'],
    ipa: '/dɪˈlɪnieɪt/'
  },
  {
    word: 'Aesthetic',
    category: 'Nouns',
    theme: 'Education & Arts',
    definition: 'A set of stylistic, visual, or structural values guiding artistic beauty and harmony.',
    example: 'Sculptors during the classicist period sought an aesthetic of balanced proportions.',
    exam: 'TOEFL',
    synonyms: ['Artistic theme', 'Visual styling', 'Taste'],
    ipa: '/iːsˈθetɪk/'
  },
  {
    word: 'Erudite',
    category: 'Adjectives',
    theme: 'Education & Arts',
    definition: 'Displaying immense scholarly learning, deep research, and academic polish.',
    example: 'Curators presented an erudite review tracing the evolution of copperplate prints.',
    exam: 'IELTS',
    synonyms: ['Scholarly', 'Pedantic', 'Academic'],
    ipa: '/ˈerudaɪt/'
  },
  {
    word: 'Profoundly',
    category: 'Adverbs',
    theme: 'Education & Arts',
    definition: 'To a highly significant, intense, or deeply intellectual extent.',
    example: 'Developing literacy programs profoundly enhanced rural secondary school graduation ratiosDescriptor.',
    exam: 'TOEFL',
    synonyms: ['Deeply', 'Intensely', 'Extremely'],
    ipa: '/prəˈfaʊndli/'
  },
  {
    word: 'Read between the lines',
    category: 'Idioms',
    theme: 'Education & Arts',
    definition: 'To understand or interpret an implicit subtext or message that isn\'t written directly.',
    example: 'Literary analysts must read between the lines to unearth the author\'s satire.',
    exam: 'IELTS',
    synonyms: ['Infer', 'Decode', 'Hypothesize'],
    ipa: '/riːd bɪˈtwiːn ðə laɪnz/'
  },
  {
    word: 'By the same token',
    category: 'Transitions',
    theme: 'Education & Arts',
    definition: 'Correspondingly or in an identical manner (used to draw a balanced deduction).',
    example: 'Regular music classes build mechanical discipline; by the same token, they refine focus habits.',
    exam: 'PTE',
    synonyms: ['Likewise', 'Similarly', 'Correspondingly'],
    ipa: '/baɪ ðə seɪm ˈtoʊkən/'
  },

  // ROW 6: Health & Psychology
  {
    word: 'Alleviate',
    category: 'Verbs',
    theme: 'Health & Psychology',
    definition: 'To soothe, lesson, or make acute physiological distress, burden, or symptoms milder.',
    example: 'Integrating daylight fixtures in wards goes a long way to alleviate inpatient anxiety.',
    exam: 'IELTS',
    synonyms: ['Mitigate', 'Ease', 'Assuage'],
    ipa: '/əˈlɪːvɪeɪt/'
  },
  {
    word: 'Cognition',
    category: 'Nouns',
    theme: 'Health & Psychology',
    definition: 'The mental process or nervous framework of receiving, storing, and applying knowledge.',
    example: 'Scientists measured changes in early childhood cognition using interactive spatial puzzles.',
    exam: 'TOEFL',
    synonyms: ['Perception', 'Intellect', 'Understanding'],
    ipa: '/kɒɡˈnɪʃn/'
  },
  {
    word: 'Chronic',
    category: 'Adjectives',
    theme: 'Health & Psychology',
    definition: 'Persisting or recurring over a multi-month or multi-year span (typically of diseases).',
    example: 'Poor posture during long coding intervals can quickly trigger chronic vertebral spasms.',
    exam: 'PTE',
    synonyms: ['Incurable', 'Persistent', 'Deep-seated'],
    ipa: '/ˈkrɒnɪk/'
  },
  {
    word: 'Adversely',
    category: 'Adverbs',
    theme: 'Health & Psychology',
    definition: 'In a deeply negative, damaging, antagonistic, or destructive manner.',
    example: 'Interrupted sleep sequences adversely damage the endocrine system\'s natural recovery loops.',
    exam: 'IELTS',
    synonyms: ['Negatively', 'Harmfully', 'Detrimentally'],
    ipa: '/ˈædvɜːsli/'
  },
  {
    word: 'Under the weather',
    category: 'Idioms',
    theme: 'Health & Psychology',
    definition: 'Feeling slightly unwell, fatigued, physically flat, or moderately sick.',
    example: 'Many students feel under the weather right before high-pressure mock exam schedules.',
    exam: 'IELTS',
    synonyms: ['Unwell', 'Ailing', 'Indisposed'],
    ipa: '/ˈʌndə ðə ˈweðə/'
  },
  {
    word: 'Nonetheless',
    category: 'Transitions',
    theme: 'Health & Psychology',
    definition: 'In spite of the preceding facts or variables; nevertheless.',
    example: 'Therapeutic workouts are tedious; nonetheless, they are vital for restoring knee elasticity.',
    exam: 'TOEFL',
    synonyms: ['Nevertheless', 'However', 'Even so'],
    ipa: '/ˌnʌnðəˈles/'
  },

  // ROW 7: Law & Public Policy
  {
    word: 'Sanction',
    category: 'Verbs',
    theme: 'Law & Public Policy',
    definition: 'To officially authorize and permit, OR to apply penalty clauses as international leverage.',
    example: 'Electoral commissions must sanction changes in counting rules to prevent tally gaps.',
    exam: 'TOEFL',
    synonyms: ['Authorize', 'Endorse', 'Penalize'],
    ipa: '/ˈsæŋkʃn/'
  },
  {
    word: 'Jurisdiction',
    category: 'Nouns',
    theme: 'Law & Public Policy',
    definition: 'The official power, legal scope, or geographical boundary within which authority applies.',
    example: 'Maritime limits fall directly under the federal jurisdiction of the joint naval guard.',
    exam: 'IELTS',
    synonyms: ['Authority', 'Command', 'Purview'],
    ipa: '/ˌdʒʊərɪsˈdɪkʃn/'
  },
  {
    word: 'Mandatory',
    category: 'Adjectives',
    theme: 'Law & Public Policy',
    definition: 'Enforced by legislative decree or code guidelines; legally compulsory.',
    example: 'Double-entry bookkeeping is mandatory for all listed non-governmental aid charities.',
    exam: 'PTE',
    synonyms: ['Compulsory', 'Required', 'Obligory'],
    ipa: '/ˈmændətəri/'
  },
  {
    word: 'Unilaterally',
    category: 'Adverbs',
    theme: 'Law & Public Policy',
    definition: 'Decided or acted upon by only one side or party without coordinating with allies.',
    example: 'The border command unilaterally locked access pathways during the storm emergency.',
    exam: 'TOEFL',
    synonyms: ['Independently', 'Solely', 'Separately'],
    ipa: '/ˌjuːnɪˈlætrəli/'
  },
  {
    word: 'By the book',
    category: 'Idioms',
    theme: 'Law & Public Policy',
    definition: 'Strictly matching formal regulations, legal precedents, and official laws.',
    example: 'Audit partners process transaction archives strictly by the book to satisfy tax rules.',
    exam: 'IELTS',
    synonyms: ['Formally', 'Legally', 'According to rules'],
    ipa: '/baɪ ðə bʊk/'
  },
  {
    word: 'Notwithstanding',
    category: 'Transitions',
    theme: 'Law & Public Policy',
    definition: 'Regardless of or in spite of the specified conditions, warnings, or objections.',
    example: 'The transit rate increased, notwithstanding clear opposition from urban commuter coalitions.',
    exam: 'IELTS',
    synonyms: ['Despite', 'In spite of', 'Nonetheless'],
    ipa: '/ˌnɒtwɪθˈstændɪŋ/'
  },

  // ROW 8: Media & Comms
  {
    word: 'Disseminate',
    category: 'Verbs',
    theme: 'Media & Comms',
    definition: 'To spread, broadcast, publish, or scatter information, data, or beliefs widely.',
    example: 'Broadcasters rely on planetary antennas to disseminate warning messages during weather emergencies.',
    exam: 'IELTS',
    synonyms: ['Circulate', 'Broadcast', 'Propagate'],
    ipa: '/dɪˈsemɪneɪt/'
  },
  {
    word: 'Bias',
    category: 'Nouns',
    theme: 'Media & Comms',
    definition: 'An inclined, unbalanced preference, pre-judgment, or prejudice for or against one viewpoint.',
    example: 'Critics identified structural bias in the reporting since the firm belonged to a power monopoly.',
    exam: 'TOEFL',
    synonyms: ['Prejudice', 'Partiality', 'Slant'],
    ipa: '/ˈbaɪəs/'
  },
  {
    word: 'Credible',
    category: 'Adjectives',
    theme: 'Media & Comms',
    definition: 'Worthy of belief, validated, and satisfying logical test standards as reliable.',
    example: 'Our mock questions are curated standard-by-standard and constitute a credible exam simulator.',
    exam: 'PTE',
    synonyms: ['Plausible', 'Reliable', 'Trustworthy'],
    ipa: '/ˈkredəbl/'
  },
  {
    word: 'Ambiguously',
    category: 'Adverbs',
    theme: 'Media & Comms',
    definition: 'In a confusing, dual-interpretation style that leaves truth conditions unclear.',
    example: 'The press release was ambiguously structured, causing confusion across stock markets.',
    exam: 'TOEFL',
    synonyms: ['Vaguely', 'Unclearly', 'Doubtfully'],
    ipa: '/æmˈbɪɡjuəsli/'
  },
  {
    word: 'Word of mouth',
    category: 'Idioms',
    theme: 'Media & Comms',
    definition: 'Highly viral personal referral, verbal talk, or interpersonal chatter.',
    example: 'The online study guide gained traction almost purely through student word of mouth.',
    exam: 'PTE',
    synonyms: ['Orally', 'Recommendation', 'Recommendation-driven'],
    ipa: '/wɜːd ɒv maʊθ/'
  },
  {
    word: 'Indeed',
    category: 'Transitions',
    theme: 'Media & Comms',
    definition: 'Used to deliver extra confirmation, validation, or stronger illustrative facts.',
    example: 'The reading test is intense; indeed, many candidates run out of time at the third page.',
    exam: 'TOEFL',
    synonyms: ['In fact', 'As a matter of fact', 'Truly'],
    ipa: '/ɪnˈdiːd/'
  },

  // ROW 9: Energy & Ecology
  {
    word: 'Mitigate',
    category: 'Verbs',
    theme: 'Energy & Ecology',
    definition: 'To neutralize, reduce, or make structural threats, environmental ruin, or heat impacts less severe.',
    example: 'Installing green foliage roofs helps mitigate thermal heat-island waves across cities.',
    exam: 'IELTS',
    synonyms: ['Alleviate', 'Soften', 'Diminish'],
    ipa: '/ˈmɪtɪɡeɪt/'
  },
  {
    word: 'Depletion',
    category: 'Nouns',
    theme: 'Energy & Ecology',
    definition: 'The reduction, severe drainage, exhaust, or wasting away of natural resources or volumes.',
    example: 'Rapid woodland harvesting leads to soil nutrient depletion and severe desert encroachment.',
    exam: 'TOEFL',
    synonyms: ['Draining', 'Exhaustion', 'Reduction'],
    ipa: '/dɪˈpliːʃn/'
  },
  {
    word: 'Sustainable',
    category: 'Adjectives',
    theme: 'Energy & Ecology',
    definition: 'Eco-conscious design viable for long-term survival without stripping natural reserves.',
    example: 'The design bureau utilizes sustainable bamboo material to avoid depleting slow-growth forests.',
    exam: 'PTE',
    synonyms: ['Renewable', 'Viable', 'Eco-friendly'],
    ipa: '/səˈsteɪnəbl/'
  },
  {
    word: 'Irreversibly',
    category: 'Adverbs',
    theme: 'Energy & Ecology',
    definition: 'In a critical permanent state that can never be undone, returned, or chemically repaired.',
    example: 'Extremer warming sequences can irreversibly melt underlying arctic permafrost layers.',
    exam: 'IELTS',
    synonyms: ['Permanently', 'Irretrievably', 'Irreparably'],
    ipa: '/ˌɪrɪˈvɜːsəbli/'
  },
  {
    word: 'Tip of the iceberg',
    category: 'Idioms',
    theme: 'Energy & Ecology',
    definition: 'A tiny observable symptom of a vast, complex, or dangerous systemic problem deep down.',
    example: 'The visible coastal plastic debris is merely the tip of the iceberg of micro-waste.',
    exam: 'TOEFL',
    synonyms: ['Tiny fraction', 'Surface level symptom'],
    ipa: '/tɪp ɒv ðɪ ˈaɪsbɜːɡ/'
  },
  {
    word: 'On the other hand',
    category: 'Transitions',
    theme: 'Energy & Ecology',
    definition: 'Used to introduce an alternative, contrasting environmental aspect or visual statistic.',
    example: 'Nuclear facilities produce zero greenhouse gas; on the other hand, fuel waste storage is critical.',
    exam: 'IELTS',
    synonyms: ['Alternatively', 'From another angle', 'Conversely'],
    ipa: '/ɒn ðɪ ˈʌðə hænd/'
  },

  // ROW 10: Philosophy & Mind
  {
    word: 'Surmise',
    category: 'Verbs',
    theme: 'Philosophy & Mind',
    definition: 'To infer, suppose, guess, or conjecturize things to be true based on incomplete evidence.',
    example: 'Archaeologists surmise that the tribal monument aligns with ancient summer solstice grids.',
    exam: 'IELTS',
    synonyms: ['Conjecture', 'Postulate', 'Speculate'],
    ipa: '/səˈmaɪz/'
  },
  {
    word: 'Premise',
    category: 'Nouns',
    theme: 'Philosophy & Mind',
    definition: 'A central axiom, thesis statement, or core proposal upon which an entire deduction is built.',
    example: 'Idealist philosophy starts from the premise that physical reality relies on conceptual perception.',
    exam: 'TOEFL',
    synonyms: ['Postulate', 'Assumption', 'Hypothesis'],
    ipa: '/ˈpremɪs/'
  },
  {
    word: 'Inherent',
    category: 'Adjectives',
    theme: 'Philosophy & Mind',
    definition: 'Existing within something as an essential, inseparable, and permanent structural attribute.',
    example: 'Statistical models carry an inherent variance metric that can never be fully negated.',
    exam: 'PTE',
    synonyms: ['Intrinsic', 'Essential', 'Inborn'],
    ipa: '/ɪnˈhɪərənt/'
  },
  {
    word: 'Empirically',
    category: 'Adverbs',
    theme: 'Philosophy & Mind',
    definition: 'Supported or validated by physical experiments, sensor registers, or real-world statistics.',
    example: 'The cognitive bias that prioritizes near-term rewards was empirically validated in five separate countries.',
    exam: 'IELTS',
    synonyms: ['Factually', 'Observably', 'Experimentally'],
    ipa: '/ɪmˈpɪrɪkli/'
  },
  {
    word: 'Food for thought',
    category: 'Idioms',
    theme: 'Philosophy & Mind',
    definition: 'Intellectual stimuli, intriguing assertions, or ideas worthy of deep mental reflection.',
    example: 'The philosopher\'s lecture regarding machine consciousness delivered great food for thought.',
    exam: 'IELTS',
    synonyms: ['Mental stimulant', 'Intriguing concept'],
    ipa: '/fuːd fɔː θɔːt/'
  },
  {
    word: 'Conversely',
    category: 'Transitions',
    theme: 'Philosophy & Mind',
    definition: 'Used to introduce an opposing, logical mirror statement or alternative philosophical route.',
    example: 'Believing in free will empowers individual agency; conversely, absolute determinism shifts focus to systemic factors.',
    exam: 'TOEFL',
    synonyms: ['In contrast', 'Oppositely', 'Vice versa'],
    ipa: '/ˈkɒnvɜːsli/'
  }
];

// Mock downloads for the Downloads subtab
const DOWNLOADS_RESOURCES = [
  { id: '1', title: 'IELTS Academic Writing Task 2 - High-Scorer Template PDF', size: '1.4 MB', exam: 'IELTS', type: 'Handout Template' },
  { id: '2', title: 'TOEFL iBT 120-Score Speaking Sentence Starters & Connectors', size: '980 KB', exam: 'TOEFL', type: 'Cheat Sheet' },
  { id: '3', title: 'PTE Academic Describe Image - Vocabulary & Key Trends Cheat Sheet', size: '2.1 MB', exam: 'PTE', type: 'Visual Guide' },
  { id: '4', title: 'The Ultimate Academic Prefix, Suffix, & Latin Roots Master Index', size: '4.2 MB', exam: 'All Exams', type: 'E-Book' },
  { id: '5', title: 'Academic Transition Phrase-Matrix for Essays & Speeches', size: '750 KB', exam: 'All Exams', type: 'Quick Matrix' },
  { id: '6', title: 'Interactive Vocabulary Soundbook - Offline MP3 Flashcard Companion', size: '42.5 MB', exam: 'All Exams', type: 'ZIP Audio' }
];

// Interactive Synonym Matchers for the Collocations Subtab (Adapted from "Tone Pairs")
const COL_PAIRS = [
  { id: 1, basic: 'To show details', advanced: 'To delineate facts', category: 'High Band Transition', exam: 'IELTS' },
  { id: 2, basic: 'Very small', advanced: 'Infinitesimal cells', category: 'Scientific Adjective', exam: 'TOEFL' },
  { id: 3, basic: 'To make pain less', advanced: 'To alleviate suffering', category: 'Verb Collocation', exam: 'IELTS' },
  { id: 4, basic: 'Happens always', advanced: 'Invariably occurs', category: 'Adverb-Verb Combo', exam: 'PTE' },
  { id: 5, basic: 'A deep change', advanced: 'A paradigm shift', category: 'Academic Noun Phrase', exam: 'TOEFL' },
  { id: 6, basic: 'To support claims', advanced: 'To substantiate arguments', category: 'Essays Anchor', exam: 'IELTS' },
  { id: 7, basic: 'Cause to go faster', advanced: 'To catalyze development', category: 'Tech Evolution', exam: 'PTE' },
  { id: 8, basic: 'Very profitable', advanced: 'Highly lucrative business', category: 'Economic Term', exam: 'IELTS' },
  { id: 9, basic: 'Permanent characteristic', advanced: 'Inherent limitation', category: 'Philosophy Concept', exam: 'PTE' },
  { id: 10, basic: 'Taught by looking', advanced: 'Empirically verified', category: 'Research Proving', exam: 'TOEFL' }
];

const BENGALI_VOCAB_MAP: Record<string, { meaning: string; explanation: string }> = {
  'Substantiate': {
    meaning: 'প্রমাণ করা / সত্যতা সাব্যস্ত করা',
    explanation: 'কোন দাবির সপক্ষে নির্ভরযোগ্য প্রমাণ বা তথ্য উপস্থাপন করে সত্যতা নিশ্চিত করা।'
  },
  'Phenomenon': {
    meaning: 'বিশেষ ঘটনা / বিস্ময়কর প্রাকৃতিক ঘটনা',
    explanation: 'এমন কোনো পর্যবেক্ষণযোগ্য ঘটনা বা পরিমণ্ডল যা বিশেষ করে বিজ্ঞানসম্মত আলোচনার বিষয়।'
  },
  'Empirical': {
    meaning: 'বাস্তবধর্মী / অভিজ্ঞতাভিত্তিক / পর্যবেক্ষণমূলক',
    explanation: 'কোনো বিশুদ্ধ তাত্ত্বিক ধারণার ওপর নির্ভর না করে সরাসরি পর্যবেক্ষণ এবং পরীক্ষালব্ধ বাস্তব জ্ঞানের ভিত্তি।'
  },
  'Methodically': {
    meaning: 'পদ্ধতিগতভাবে / সুশৃঙ্খলভাবে',
    explanation: 'কোনো কাজ নিখুঁতভাবে করার জন্য একটি সুনির্দিষ্ট ধারাবাহিক আইন বা নিয়ম অনুসরণ করা।'
  },
  'Break through': {
    meaning: 'গুরুত্বपूर्ण অগ্রগতি / প্রতিবন্ধকতা অতিক্রম করা',
    explanation: 'কোনো জটিল বাধা পেরিয়ে হঠাৎ বড় ধরনের কোনো বৈজ্ঞানিক বা তাত্ত্বিক আবিষ্কার করা।'
  },
  'Consequently': {
    meaning: 'ফলস্বরূপ / অতএব / সুতরাং',
    explanation: 'পূর্ববর্তী ঘটনার প্রত্যক্ষ পরিণতি বা যৌক্তিক সমাপ্তি হিসেবে নতুন প্রভাবের সূত্রপাত।'
  },
  'Catalyze': {
    meaning: 'ত্বরান্বিত করা / অনুঘটক হিসেবে কাজ করা',
    explanation: 'কোনো প্রক্রিয়া, রাসায়নিক বিক্রিয়া বা প্রযুক্তিগত পরিবর্তনকে দ্রুত চালিত করতে সহায়ক ভূমিকা পালন।'
  },
  'Paradigm': {
    meaning: 'মৌলিক দৃষ্টিভঙ্গি / আদর্শ উদাহরণ / চিন্তাভাবনার কাঠামো',
    explanation: 'চিন্তার একটি সর্বজনগ্রাহ্য মানদণ্ড বা আদর্শ কাঠামো যার ভিত্তিতে কোনো বিজ্ঞান বা যুক্তিধারা বিশ্লেষিত হয়।'
  },
  'Redundant': {
    meaning: 'অপ্রয়োজনীয় / অতিরিক্ত / বাহুল্য',
    explanation: 'পূর্বেই বিদ্যমান থাকায় বা নতুন প্রযুক্তির আগমনে কোনো ব্যবস্থার বা উপাদানের অপ্রয়োজনীয়তা।'
  },
  'Seamlessly': {
    meaning: 'নির্বিঘ্নে / অতি মসৃণভাবে',
    explanation: 'কোনো রকম বাধা, অসঙ্গতি বা দৃশ্যমান ফাঁক ছাড়া দুটি আলাদা উপাদানকে নিখুঁতভাবে যুক্ত করা।'
  },
  'Pave the way': {
    meaning: 'পথ সুগম করা / পূর্বপ্রস্তুতি তৈরি করা',
    explanation: 'ভবিষ্যতের কোনো বড় কাজের বা যুগান্তকারী পরিবর্তনের সূচনাকে সহজ ও সম্ভাবনাময় করে তোলা।'
  },
  'Furthermore': {
    meaning: 'তাছাড়া / তদুপরি / আরও',
    explanation: 'চলমান বক্তব্যকে আরও শক্তিশালী করার জন্য অতিরিক্ত আরেকটি সমর্থক যুক্তি বা তথ্য যোগ করা।'
  },
  'Fluctuate': {
    meaning: 'উত্থান-পতন হওয়া / অনবরত পরিবর্তন হওয়া',
    explanation: 'কোনো সূচক, সংখ্যা বা পরিমাণের ধারাবাহিক অনিশ্চিত উঠা-নামা করা।'
  },
  'Surplus': {
    meaning: 'উদ্বৃত্ত / অতিরিক্ত অংশ বা সঞ্চয়',
    explanation: 'প্রয়োজনীয় চাহিদা মেটানোর পর যে পরিমাণ অর্থ, সম্পদ বা পণ্য অবশিষ্ট অব্যবহৃত থাকে।'
  },
  'Lucrative': {
    meaning: 'লাভজনক / অত্যন্ত লাভদায়ক',
    explanation: 'এমন কোনো অর্থনৈতিক উদ্যোগ বা ব্যবসা যা থেকে অনেক ভালো মুনাফা বা আর্থিক সুবিধা পাওয়া যায়।'
  },
  'Exponentially': {
    meaning: 'বহুগুণে / দ্রুত চক্রবৃদ্ধি হারে বৃদ্ধি পাওয়া',
    explanation: 'অত্যন্ত দ্রুত গতিতে ও ক্রমবর্ধমান মাত্রায় সংখ্যার দ্বিগুণ বা ততোধিক হারে পরিবর্ধন।'
  },
  'In the red': {
    meaning: 'ঋণে থাকা / লোকসানে নিমজ্জিত হওয়া',
    explanation: 'আয়ের চেয়ে অতিরিক্ত ব্যয় হওয়ার কারণে আর্থিক ঘাটতি কিংবা বাণিজ্যিক লোকসানের সম্মুখীন হওয়া।'
  },
  'In contrast': {
    meaning: 'পক্ষান্তরে / বিপরীতক্রমে',
    explanation: 'দুটি বিষয় বা তথ্যের মধ্যে বিদ্যমান সরাসরি অসঙ্গতি বা ভিন্নতাকে স্পষ্টভাবে তুলে ধরা।'
  },
  'Assimilate': {
    meaning: 'आत्मীকরণ করা / গভীরভাবে ধারণ ও হজম করা',
    explanation: 'কোনো নতুন সংস্কৃতি, ভাষা বা সামাজিক রীতিনীতিকে পুরোপুরি নিজের মধ্যে আত্মস্থ ও খাপ খাইয়ে নেওয়া।'
  },
  'Hegemony': {
    meaning: 'সামাজিক বা রাজনৈতিক আধিপত্য / কর্তৃত্ব',
    explanation: 'অন্যান্য দুর্বল জাতি বা গোষ্ঠীর ওপর শক্তিশালী কোনো পক্ষের একচ্ছত্র অর্থনৈতিক ও রাজনৈতিক প্রভাব বিস্তার।'
  },
  'Prevalent': {
    meaning: 'প্রচলিত / ব্যাপক বিস্তার লাভ করেছে এমন',
    explanation: 'কোনো নির্দিষ্ট স্থান, সময় বা সীমানায় অত্যন্ত সাধারণ ও অধিকাংশ ক্ষেত্রে দৃশ্যমান পরিবেশ।'
  },
  'Invariably': {
    meaning: 'অপরিবর্তিতভাবে / সর্বদা / অবধারিতভাবে',
    explanation: 'কোনো রকম ব্যতিক্রম ছাড়া প্রতিটি পরিস্থিতিতে একইভাবে সংঘটিত হওয়া।'
  },
  'Melting pot': {
    meaning: 'সাংস্কৃতিক মিশ্রণের কেন্দ্র / মিলনমেলা',
    explanation: 'এমন এক সমাজ বা শহর যেখানে ভিন্ন ভিন্ন জাতি ও সংস্কৃতির বৈচিত্র্যময় মানুষের মিলন এবং সংমিশ্রণ ঘটে।'
  },
  'On the contrary': {
    meaning: 'বিপরীতভাবে / একেবারেই উল্টো',
    explanation: 'পূর্ববর্তী বক্তব্যের সত্যতাকে সম্পূর্ণ নাকচ করে দিয়ে একটি বিপরীত কিন্তু অটল বক্তব্য প্রতিষ্ঠা করা।'
  },
  'Delineate': {
    meaning: 'বিশদভাবে রেখাচিত্র এঁকে বা বর্ণনা করে বোঝানো',
    explanation: 'যেকোনো জটিল সীমা, পরিকল্পনা বা সত্যকে অত্যন্ত নিখুঁত ও পরিষ্কারভাবে ফুটিয়ে তোলা।'
  },
  'Aesthetic': {
    meaning: 'নন্দনতাত্ত্বিক / শিল্পসম্মত সৌকর্য',
    explanation: 'শিল্প বা নান্দনিক সৌন্দর্যের প্রশংসা, অনুভূতি ও দর্শনের ওপর বিশেষ দৃষ্টি নিবদ্ধ করা।'
  },
  'Erudite': {
    meaning: 'মহাজ্ঞানী / পাণ্ডিত্যপূর্ণ / গভীর পড়াশোনা সমৃদ্ধ',
    explanation: 'প্রচুর বইপত্র ও দীর্ঘ গবেষণার মাধ্যমে গভীর তাত্ত্বিক জ্ঞান ও প্রজ্ঞা সম্পন্ন ব্যক্তিত্ব।'
  },
  'Profoundly': {
    meaning: 'গভীরভাবে / অত্যন্ত তীব্র মাত্রায়',
    explanation: 'খুব বড় আকৃতির কিংবা বুদ্ধিবৃত্তিক ও আবেগীয় গভীরতায় সর্বোচ্চ মাত্রায় প্রভাবিত হওয়া।'
  },
  'Read between the lines': {
    meaning: 'অন্তর্নিহিত অর্থ উদ্ধার করা / উহ্য অর্থ বোঝা',
    explanation: 'কোনো লেখার ওপরের বা আক্ষরিক অর্থ পেরিয়ে তার ভেতরের আসল বা লুকানো উদ্দেশ্যটি টের পাওয়া।'
  },
  'By the same token': {
    meaning: 'একই যুক্তিতে / একইভাবে',
    explanation: 'আগের বক্তব্যের সাথে সামঞ্জস্য রেখে একই ধরনের আরেকটি তুলনীয় সত্য বা সিদ্ধান্ত প্রমাণ করা।'
  },
  'Alleviate': {
    meaning: 'উপশম করা / তীব্রতা কমানো',
    explanation: 'যেকোনো ব্যথা, কষ্ট, গুরুতর সামাজিক সংকট বা রোগকে অনেকখানি সহনীয় ও হালকা করে ফেলা।'
  },
  'Cognition': {
    meaning: 'জ্ঞানেন্দ্রিয় অনুভূতি / জ্ঞানার্জনের মানসিক প্রক্রিয়া',
    explanation: 'মস্তিষ্কে তথ্য সংগ্রহ, স্মৃতি ভাণ্ডার ও চিন্তাভাবনা প্রয়োগের মাধ্যমে কোনো কিছু বোঝার বিশেষ ক্ষমতা।'
  },
  'Chronic': {
    meaning: 'দীর্ঘমেয়াদী / চিরস্থায়ী / অনেক পুরোনো',
    explanation: 'বিশেষ করে রোগ বা সমস্যার ক্ষেত্রে যা বহু মাস বা বছর ধরে অবিরাম চলে আসায় সমাধানহীন রূপ নেয়।'
  },
  'Adversely': {
    meaning: 'প্রতিকূলভাবে / ক্ষতিকারক উপায়ে',
    explanation: 'নেতিবাচক কোণ থেকে যা যেকোনো পরিবেশ কিংবা শারীরিক উন্নতির চরম অন্তরায় হতে পারে।'
  },
  'Under the weather': {
    meaning: 'অসুস্থ বোধ করা / সামান্য ক্লান্ত ও ফ্ল্যাট লাগা',
    explanation: 'খুব বেশি গুরুতর রোগ না হলেও সামান্য ঠাণ্ডা লাগা বা শারীরিক নিস্তেজতায় আক্রান্ত হওয়া।'
  },
  'Nonetheless': {
    meaning: 'তবুও / তা সত্ত্বেও',
    explanation: 'বিপরীতমুখী কোনো শক্ত যুক্তি উপস্থাপনের পরেও আসল সত্য বা প্রথম সিদ্ধান্তটিকে বহাল রাখা।'
  },
  'Sanction': {
    meaning: 'অনুমোদন দেওয়া / নিষেধাজ্ঞা আরোপ করা',
    explanation: 'কোনো কাজের আইনগত অনুমতি প্রদান করা, কিংবা কোনো দেশের বিরুদ্ধে আন্তর্জাতিক নিষেধাজ্ঞা চাপিয়ে দেওয়া।'
  },
  'Jurisdiction': {
    meaning: 'আইনি এলাকা / বিচারিক একচ্ছত্র অধিকার বা সীমানা',
    explanation: 'সুনির্দিষ্ট আইন বা কর্মকর্তাদের বিচার কার্য পরিচালনার চূড়ান্ত নির্ধারিত ভৌগোলিক বা আইনি এক্সেস।'
  },
  'Mandatory': {
    meaning: 'বাধ্যতামূলক / অবশ্যই পালনীয়',
    explanation: 'আইনগত ডিক্রি জারি বা প্রশাসনিক কারণে যা এড়িয়ে যাওয়ার কোনো সুযোগ নেই।'
  },
  'Unilaterally': {
    meaning: 'একতরফাভাবে / একপাক্ষিক পদক্ষেপ',
    explanation: 'অন্য কোনো পক্ষের সাথে সমন্বয় না করে নিজের ইচ্ছানুযায়ী এককভাবে সিদ্ধান্ত নেওয়া এবং তা কার্যকর করা।'
  },
  'By the book': {
    meaning: 'নিয়মমাফিক / হুবহু আইন মেনে চলা',
    explanation: 'যেকোনো কাজের ক্ষেত্রে আইন বা গাইডলাইনের প্রতিটি কমা-সেমিকোলন একনিষ্ঠভাবে অনুসরণ করা।'
  },
  'Notwithstanding': {
    meaning: 'তা সত্ত্বেও / সত্ত্বেও',
    explanation: 'কোনো গুরুতর পরিস্থিতি বা বাধার স্পষ্ট উপস্থিতি থাকার পরেও চূড়ান্ত ফল অর্জন করা।'
  },
  'Disseminate': {
    meaning: 'ছড়িয়ে দেওয়া / প্রচার করা / জ্ঞান বিতরণ করা',
    explanation: 'কোনো জরুরি তথ্য, বৈজ্ঞানিক তত্ত্ব বা চিন্তাধারাকে বহুদূর অবধি মানুষের মাঝে ছড়িয়ে দেওয়া।'
  },
  'Bias': {
    meaning: 'পক্ষপাতিত্ব / পূর্ব অভিজ্ঞতা বা কুসংস্কার ভিত্তিক পক্ষপাত',
    explanation: 'নিরপেক্ষ কোনো রায় না দিয়ে একপাশে কিছুটা অনুচিত ঢলে পড়া বা আগে থেকেই কোনো এক পক্ষের পক্ষপাত করা।'
  },
  'Credible': {
    meaning: 'विश्वासযোগ্য / নির্ভরযোগ্য',
    explanation: 'সুনির্দিষ্ট তথ্য-প্রমাণের ভিত্তিতে যা নিশ্চিতভাবে সত্য বলে গ্রহণ ও আস্থায় নেওয়া যায়।'
  },
  'Ambiguously': {
    meaning: 'দ্ব্যর্থকভাবে / অস্পষ্ট বা দ্বিমুখী অর্থে',
    explanation: 'এমন প্রকাশভঙ্গি বা বাক্য গঠন যা নিশ্চিত করে একটি নির্দিষ্ট অর্থ প্রকাশ না করে বিভ্রান্তি তৈরি করে।'
  },
  'Word of mouth': {
    meaning: 'মুখে মুখে প্রসারিত / মৌখিক সুপারিশ',
    explanation: 'কোনো লিখিত বিজ্ঞাপন ছাড়াই কেবল সাধারণ মানুষের মুখে মুখে হওয়া প্রচার বা জনপ্রিয়তার ভিত্তি।'
  },
  'Indeed': {
    meaning: 'প্রকৃতপক্ষে / সত্যিই / বস্তুত',
    explanation: 'পূর্ববর্তী কথনের গুরুত্ব বাড়িয়ে তার নিশ্চয়তা চূড়ান্তভাবে নিশ্চিত করতে ব্যবহৃত জোরালো অভিব্যক্তি।'
  },
  'Mitigate': {
    meaning: 'হ্রাস করা / ক্ষয়ক্ষতি বা তীব্রতা প্রশমিত করা',
    explanation: 'কোনো বিপর্যয়, পরিবেশ ধ্বংস, বৈশ্বিক উষ্ণতা বা মারাত্মক ঝুঁকির নেতিবাচক প্রভাব কমিয়ে আনা।'
  },
  'Depletion': {
    meaning: 'শূন্যকরণ / হ্রাসকরণ / প্রাকৃতিক সম্পদের ক্ষয়',
    explanation: 'অতিরিক্ত ব্যবহার বা অপচয়ের দরুণ প্রাকৃতিক কয়লা, গ্যাস বা বনাঞ্চল মারাত্মকভাবে হ্রাস পাওয়া।'
  },
  'Sustainable': {
    meaning: 'টেকসই / দীর্ঘস্থায়ী পরিবেশবান্ধব বজায় রাখার প্রক্রিয়া',
    explanation: 'পরবর্তী প্রজন্মের সম্পদ অক্ষুণ্ণ রেখে বর্তমান চাহিদার ভারসাম্যপূর্ণ ব্যবহার নিশ্চিত করা।'
  },
  'Irreversibly': {
    meaning: 'অপরিবর্তনীয়ভাবে / যা কোনোভাবেই আগের অবস্থায় ফেরানো যায় না',
    explanation: 'চিরতরে বদলে যাওয়া কোনো অবস্থা যাতে প্রকৃতির ক্ষতি বা রাসায়নিক পর্যায় কোনো প্রক্রিয়াতেই শোধরানো সম্ভব নয়।'
  },
  'Tip of the iceberg': {
    meaning: 'হিমবাহের অগ্রভাগ / মূল সমস্যার সামান্য সূচনা',
    explanation: 'একটি বিশাল ও গভীর সমস্যার মাত্র কয়েক শতাংশ উপরে দৃশ্যমান হওয়া যার তলদেশ কল্পনাতীত বড়।'
  },
  'On the other hand': {
    meaning: 'অপরপক্ষে / অন্যথায় / অন্য দৃষ্টिकोণ থেকে',
    explanation: 'বিকল্প বা কিছুটা বিপরীতধর্মী আরেকটি দৃষ্টিভঙ্গি আলোচনার সামনে আনার বহুল ব্যবহৃত চমৎকার লিঙ্ক।'
  },
  'Surmise': {
    meaning: 'অনুমান করা / প্রমাণ ছাড়া আন্দাজ করা',
    explanation: 'সম্পূর্ণ প্রমাণের ঘাটতি থাকা সত্ত্বেও কেবল যৌক্তিক চিন্তার দ্বারা কোনো সম্ভাবনাকে অনুমান করা।'
  },
  'Premise': {
    meaning: 'যৌক্তিক ভিত্তি / মূল ধারণা / প্রতিজ্ঞা সত্য',
    explanation: 'একটি প্রতিষ্ঠিত সত্য বা প্রাথমিক ধারণা যার ওপরে ভিত্তি করে পুরো আলোচনার মূল যৌক্তিক সিদ্ধান্ত টানা হয়।'
  },
  'Inherent': {
    meaning: 'সহজাত / জন্মগত / অন্তর্নিহিত বৈশিষ্ট্য',
    explanation: 'যা কোনো ব্যক্তি, বস্তু বা ব্যবস্থার চিরস্থায়ী মৌলিক কাঠামো, যাকে কখনই আলাদা করা যায় না।'
  },
  'Empirically': {
    meaning: 'বাস্তবের ভিত্তিতে / অভিজ্ঞতালব্ধভাবে',
    explanation: 'সরাসরি স্বচক্ষে ল্যাবরেটরি টেস্ট বা মাঠ পর্যায়ের বাস্তব অভিজ্ঞতার দ্বারা প্রমাণিত হওয়ার রূপ।'
  },
  'Food for thought': {
    meaning: 'ভাবনার খোরাক / চিন্তার উদ্দীপক বস্তু',
    explanation: 'এমন কোনো তথ্য, বাক্য বা ঘটনা যা নিয়ে পরবর্তীতে গভীরভাবে চিন্তা করার প্রচুর সুযোগ পাওয়া যায়।'
  },
  'Conversely': {
    meaning: 'বিপরীতক্রমে / সম্পূর্ণ ভিন্ন যুক্তি ধারা',
    explanation: 'তুলনা করার জন্য যুক্তির সম্পূর্ণ বিপরীত বা উল্টো কোণটি উপস্থাপন করে ভারসাম্য আনা।'
  }
};

export default function VocabChartPage() {
  const [activeSubTab, setActiveSubTab] = useState<'Chart' | 'Pairs' | 'Downloads'>('Chart');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(VOCABULARY_DATA[0]);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [isPronouncingEx, setIsPronouncingEx] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<'US' | 'UK' | 'AU'>('US');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [examPillsFilter, setExamPillsFilter] = useState<'ALL' | 'IELTS' | 'TOEFL' | 'PTE'>('ALL');
  
  // Keep saved status in local state for engaging bookmarking feature
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('itp_vocab_bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (wordStr: string) => {
    let updated;
    if (bookmarkedWords.includes(wordStr)) {
      updated = bookmarkedWords.filter(w => w !== wordStr);
    } else {
      updated = [...bookmarkedWords, wordStr];
    }
    setBookmarkedWords(updated);
    localStorage.setItem('itp_vocab_bookmarks', JSON.stringify(updated));
  };

  const handleSpeak = (textToSpeak: string, type: 'word' | 'sentence' = 'word') => {
    if (!('speechSynthesis' in window)) {
      alert("A system warning: Web Speech triggers are unavailable or restricted in this browser frame environment.");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const voices = window.speechSynthesis.getVoices();
      
      // Determine target voice dialect
      let langCode = 'en-US';
      if (selectedAccent === 'UK') langCode = 'en-GB';
      if (selectedAccent === 'AU') langCode = 'en-AU';

      const dialectVoice = voices.find(v => v.lang.startsWith(langCode)) || 
                           voices.find(v => v.lang.startsWith('en')) ||
                           voices[0];
      
      if (dialectVoice) {
        utterance.voice = dialectVoice;
      }
      
      utterance.rate = playbackSpeed;
      
      utterance.onstart = () => {
        if (type === 'word') setSpeakingWord(textToSpeak);
        else setIsPronouncingEx(true);
      };
      
      utterance.onend = () => {
        if (type === 'word') setSpeakingWord(null);
        else setIsPronouncingEx(null as any);
      };

      utterance.onerror = () => {
        setSpeakingWord(null);
        setIsPronouncingEx(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
      setSpeakingWord(null);
      setIsPronouncingEx(false);
    }
  };

  // Pre-fetch speech voices (Chrome needs this trigger because voices load asynchronously)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // When a cell is clicked, automatically speak the word!
  const selectAndPronounce = (wordObj: VocabWord) => {
    setSelectedWord(wordObj);
    handleSpeak(wordObj.word, 'word');
  };

  // Find the exact word matching the row and col coordinates
  const lookupWord = (theme: string, category: string): VocabWord | undefined => {
    return VOCABULARY_DATA.find(w => w.theme === theme && w.category === category);
  };

  // Trigger random spelling testing game for student engagement
  const handleRandomShuffle = () => {
    const randomIndex = Math.floor(Math.random() * VOCABULARY_DATA.length);
    const selected = VOCABULARY_DATA[randomIndex];
    selectAndPronounce(selected);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen relative overflow-hidden font-sans select-none" id="vocab-chart-workspace">
      
      {/* ---------------- BACKGROUND FLOATING ORBS (YOYO CHINESE DESIGN MATCH) ---------------- */}
      {/* Peach light spot left */}
      <div className="absolute top-[8%] left-[-6%] w-56 h-56 rounded-full bg-orange-100/60 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-[12%] left-[-2%] w-14 h-14 rounded-full bg-[#fcd34d]/40 blur-lg pointer-events-none z-0"></div>
      
      {/* Soft Pink orb middle right */}
      <div className="absolute top-[30%] right-[-70px] w-80 h-80 rounded-full bg-rose-100/70 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-[42%] right-[5%] w-10 h-10 rounded-full bg-rose-300/45 blur-md pointer-events-none z-0"></div>

      {/* Light blue glow lower left */}
      <div className="absolute bottom-[20%] left-[-100px] w-[350px] h-[350px] rounded-full bg-cyan-100/50 blur-3xl pointer-events-none z-0"></div>

      {/* ---------------- TOP SUB-MENU NAV (EXACT YOYO CHINESE MATCH) ---------------- */}
      <div className="w-full bg-white border-b border-slate-150/80 sticky top-0 md:relative z-20" id="vocab-sub-navbar">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-6 md:space-x-12 h-14">
            
            <button 
              onClick={() => setActiveSubTab('Chart')}
              className={`h-full flex items-center space-x-2 text-xs md:text-sm font-black transition-all border-b-2 px-1 cursor-pointer ${
                activeSubTab === 'Chart' 
                  ? 'text-cyan-600 border-cyan-500' 
                  : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocab Chart</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('Pairs')}
              className={`h-full flex items-center space-x-2 text-xs md:text-sm font-black transition-all border-b-2 px-1 cursor-pointer ${
                activeSubTab === 'Pairs' 
                  ? 'text-cyan-600 border-cyan-500' 
                  : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Synonym Pairs</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('Downloads')}
              className={`h-full flex items-center space-x-2 text-xs md:text-sm font-black transition-all border-b-2 px-1 cursor-pointer ${
                activeSubTab === 'Downloads' 
                  ? 'text-cyan-600 border-cyan-500' 
                  : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Word Downloads</span>
            </button>

          </div>
        </div>
      </div>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">

        {/* ========================================================================= */}
        {/* SUBTAB 1: CHART HUB CONTAINER */}
        {/* ========================================================================= */}
        {activeSubTab === 'Chart' && (
          <div className="space-y-8 animate-fade-in" id="vocab-chart-segment">
            
            {/* Header Area */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-[42px] font-black tracking-tight text-slate-800 leading-none">
                Interactive <span className="text-[#FFAA00] underline decoration-yellow-400 decoration-wavy underline-offset-4">Vocabulary Chart</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed">
                Learn high-frequency English vocabularies systematically like a native speaker. Click any grid cell to play native audio pronunciations, study contextual definitions, and master targeted exams.
              </p>
            </div>

            {/* ---------------- SEARCH BAR & SETTINGS PANEL (MATCHES PICHART) ---------------- */}
            <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
              
              {/* Left Search input */}
              <div className="relative w-full md:flex-1">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search word, definition, exam or theme..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all pr-10"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
              </div>

              {/* Accent settings switcher */}
              <div className="flex flex-wrap items-center justify-center gap-2 shrink-0 select-none">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-1">Accent:</span>
                {(['US', 'UK', 'AU'] as const).map((accent) => (
                  <button
                    key={accent}
                    onClick={() => setSelectedAccent(accent)}
                    className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                      selectedAccent === accent 
                        ? 'bg-cyan-500 text-white shadow-xs' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {accent === 'US' ? '🇺🇸 US' : accent === 'UK' ? '🇬🇧 UK' : '🇦🇺 AU'}
                  </button>
                ))}
              </div>

              {/* Speech speed slider */}
              <div className="flex items-center space-x-2 shrink-0 select-none w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Speed:</span>
                <input 
                  type="range" 
                  min="0.5" 
                  max="1.3" 
                  step="0.1"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="w-20 md:w-16 accent-cyan-500 cursor-pointer"
                />
                <span className="text-[11px] font-bold text-slate-500 font-mono w-8">{playbackSpeed.toFixed(1)}x</span>
              </div>

            </div>

            {/* ---------------- EXAM PILL FILTERS (IELTS, TOEFL, PTE MULTI-TABS) ---------------- */}
            <div className="flex justify-center space-x-2 select-none">
              {(['ALL', 'IELTS', 'TOEFL', 'PTE'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExamPillsFilter(opt)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer border ${
                    examPillsFilter === opt
                      ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {opt === 'ALL' ? '🌍 All Exams' : 
                   opt === 'IELTS' ? '🔴 IELTS Core' : 
                   opt === 'TOEFL' ? '🟢 TOEFL Academic' : '🟡 PTE Mastery'}
                </button>
              ))}
              
              <button 
                onClick={handleRandomShuffle}
                className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 text-cyan-700 text-[10px] font-black tracking-wider uppercase transition-all flex items-center space-x-1 cursor-pointer"
                title="Shuffle select a dictionary term"
              >
                <Shuffle className="w-3 h-3" />
                <span>Test Me!</span>
              </button>
            </div>

            {/* ---------------- TWO-COLUMN WORKSPACE DETAILS + TABLE ---------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ================= COLUMN A: THE MATRIX TABLE GRID (LEFT 8 COLUMNS) ================= */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Scrollable Container */}
                <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white custom-scrollbar">
                  
                  {/* Table Element Matching the exact Pinyin Chart Layout */}
                  <table className="w-full border-collapse table-fixed select-none text-center text-xs min-w-[1000px]">
                    
                    {/* Header Columns: Grammatical category */}
                    <thead>
                      <tr>
                        {/* Empty corner cell */}
                        <th className="bg-[#00A3A3] text-white p-3 text-left font-black tracking-wider uppercase text-[10px] border border-cyan-200/10" style={{ width: '160px' }}>
                          Theme category
                        </th>
                        {COLUMNS.map((colName) => (
                          <th 
                            key={colName} 
                            style={{ width: '140px' }}
                            className="bg-[#00A3A3] text-white p-3 font-black tracking-wider uppercase text-[10px] border border-cyan-200/10"
                          >
                            {colName}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Table Body rows */}
                    <tbody>
                      {ROWS.map((rowName) => (
                        <tr key={rowName} className="hover:bg-slate-50/50 transition-colors">
                          
                          {/* Row header: Thematic Context (Teal colored) */}
                          <td className="bg-cyan-50/50 text-[#008B8B] font-black p-3 text-left border border-slate-100 tracking-tight text-[11px]">
                            {rowName}
                          </td>

                          {COLUMNS.map((colName) => {
                            const wordObj = lookupWord(rowName, colName);
                            if (!wordObj) {
                              return (
                                <td key={colName} className="p-3 border border-slate-100 text-slate-300 italic">
                                  -
                                </td>
                              );
                            }

                            // Fuzzy filter matches search string
                            const searchLower = searchTerm.toLowerCase();
                            const isSearchMatch = 
                              searchTerm === '' ||
                              wordObj.word.toLowerCase().includes(searchLower) ||
                              wordObj.definition.toLowerCase().includes(searchLower) ||
                              wordObj.example.toLowerCase().includes(searchLower) ||
                              wordObj.exam.toLowerCase().includes(searchLower) ||
                              wordObj.theme.toLowerCase().includes(searchLower) ||
                              wordObj.synonyms.some(s => s.toLowerCase().includes(searchLower));

                            // Exam pill matches filter setting
                            const isExamMatch = examPillsFilter === 'ALL' || wordObj.exam === examPillsFilter;

                            const isSelected = selectedWord?.word === wordObj.word;
                            const isCurrentlySpeaking = speakingWord === wordObj.word;

                            return (
                              <td 
                                key={colName}
                                onClick={() => selectAndPronounce(wordObj)}
                                className={`p-3 relative border border-slate-100 transition-all duration-300 cursor-pointer ${
                                  isSearchMatch && isExamMatch 
                                    ? 'bg-white opacity-100 text-slate-800' 
                                    : 'bg-slate-50/70 opacity-35 text-slate-400'
                                } ${
                                  isSelected 
                                    ? 'ring-2 ring-cyan-500 ring-inset bg-cyan-50/40 font-extrabold scale-[1.02] shadow-xs' 
                                    : 'hover:bg-cyan-50/20 hover:scale-[1.01]'
                                }`}
                              >
                                
                                {/* Soundwave ripple indicator if currently playing speech */}
                                {isCurrentlySpeaking && (
                                  <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center pointer-events-none">
                                    <div className="flex space-x-0.5 items-end h-5">
                                      <span className="w-1 bg-cyan-500 animate-pulse rounded-full h-3"></span>
                                      <span className="w-1 bg-cyan-500 animate-pulse rounded-full h-4 delay-75"></span>
                                      <span className="w-1 bg-cyan-500 animate-pulse rounded-full h-2 delay-150"></span>
                                    </div>
                                  </div>
                                )}

                                {/* Word typography */}
                                <div className="font-extrabold text-sm tracking-tight mb-1 text-slate-800 break-words">
                                  {wordObj.word}
                                </div>

                                {/* Mini exam indicator inside cell matching screenshot's auxiliary icons */}
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-[9px] text-slate-400">
                                    {wordObj.ipa}
                                  </span>
                                  <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${
                                    wordObj.exam === 'IELTS' ? 'bg-red-50 text-red-600 border border-red-100' :
                                    wordObj.exam === 'TOEFL' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    'bg-amber-50 text-amber-700 border border-amber-100'
                                  }`}>
                                    {wordObj.exam[0]}
                                  </span>
                                </div>

                                {/* Bookmark star dot indicator */}
                                {bookmarkedWords.includes(wordObj.word) && (
                                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                )}

                              </td>
                            );
                          })}

                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>

                {/* Auxiliary Hint banner */}
                <div className="flex items-center justify-between text-xs text-slate-500 bg-cyan-50/40 p-4 border border-cyan-100 rounded-xl font-bold">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-cyan-600" />
                    <span>Double-tap or cell-click starts a native English TTS engine. Bookmark key terms to study later.</span>
                  </div>
                  <div className="flex items-center space-x-1 font-extrabold">
                    <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full mr-1"></span> IELTS
                    <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full mr-1 ml-2"></span> TOEFL
                    <span className="inline-block w-2.5 h-2.5 bg-amber-500 rounded-full mr-1 ml-2"></span> PTE
                  </div>
                </div>

              </div>
              
              {/* ================= COLUMN B: ACTIVE WORD DETAILS SIDEBAR (RIGHT 4 COLUMNS) ================= */}
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm sticky top-14 space-y-6">
                
                {selectedWord ? (
                  <div className="space-y-6 animate-fade-in text-left">
                    
                    {/* Header: Core term word */}
                    <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            selectedWord.exam === 'IELTS' ? 'bg-red-50 text-red-600 border border-red-100' :
                            selectedWord.exam === 'TOEFL' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {selectedWord.exam} Recommended
                          </span>
                          
                          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {selectedWord.category}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-2 select-all leading-none">
                          {selectedWord.word}
                        </h3>
                        
                        <p className="text-xs text-slate-400 font-mono font-medium mt-1 select-all">
                          IPA Key: <span className="text-cyan-600 font-bold">{selectedWord.ipa}</span>
                        </p>
                      </div>

                      {/* Bookmark Button */}
                      <button 
                        onClick={() => toggleBookmark(selectedWord.word)}
                        className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                          bookmarkedWords.includes(selectedWord.word)
                            ? 'bg-cyan-500 border-cyan-500 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title="Save word to bookmarks"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* TTS Triggers sound panel */}
                    <div className="bg-slate-55 bg-cyan-50/30 rounded-2xl p-4 flex items-center justify-between space-x-3 border border-cyan-100/50">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleSpeak(selectedWord.word, 'word')}
                          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                            speakingWord === selectedWord.word
                              ? 'bg-cyan-600 text-white scale-95'
                              : 'bg-white text-cyan-600 border border-cyan-100 hover:bg-cyan-50'
                          }`}
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <div>
                          <p className="text-xs font-black text-slate-800 leading-tight">Listen Pronunciation</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Dialect: {selectedAccent} Accent ({playbackSpeed}x)</p>
                        </div>
                      </div>

                      {/* Accent Mini-Reminder Tag */}
                      <span className="text-[11px] font-black text-cyan-700 bg-cyan-100/60 px-2 py-1 rounded-md">
                        {selectedAccent} VOICE
                      </span>
                    </div>

                    {/* Semantic Definition */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meaning & Definition</span>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed p-4 bg-slate-50 border border-slate-100 rounded-xl select-all">
                        {selectedWord.definition}
                      </p>
                    </div>

                    {/* Bengali explanation for Bangladesh ITP Students */}
                    {BENGALI_VOCAB_MAP[selectedWord.word] && (
                      <div className="bg-emerald-50/60 border border-emerald-150 rounded-2xl p-4 space-y-2 text-left">
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Bengali Explanation (বাংলা অর্থ ও ব্যাখ্যা)
                        </span>
                        <p className="text-xs font-bold text-emerald-950 leading-relaxed">
                          {BENGALI_VOCAB_MAP[selectedWord.word].meaning}
                        </p>
                        <p className="text-[11px] font-medium text-emerald-800 leading-normal border-t border-emerald-100/50 pt-1.5">
                          {BENGALI_VOCAB_MAP[selectedWord.word].explanation}
                        </p>
                      </div>
                    )}

                    {/* Sentence Context (Clickable) */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Example of Sentence</span>
                        <button 
                          onClick={() => handleSpeak(selectedWord.example, 'sentence')}
                          className={`text-[9px] font-black hover:underline uppercase tracking-wide cursor-pointer flex items-center space-x-1 ${
                            isPronouncingEx ? 'text-rose-500 animate-pulse' : 'text-cyan-600'
                          }`}
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>{isPronouncingEx ? 'Speaking...' : 'Read Aloud'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed italic p-4 bg-slate-50 border border-slate-100 rounded-xl relative select-all select-none">
                        "{selectedWord.example}"
                      </p>
                    </div>

                    {/* Synonyms List */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">High Score Synonyms</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedWord.synonyms.map((syn, index) => (
                          <span 
                            key={index}
                            onClick={() => {
                              // If they click a synonym, they can hear it!
                              handleSpeak(syn, 'word');
                            }}
                            className="bg-cyan-50/60 border border-cyan-100 hover:bg-cyan-100/50 text-cyan-700 text-[10px] font-black px-3 py-1 rounded-full cursor-pointer transition-all"
                            title="Click to pronounce synonym"
                          >
                            ⭐ {syn}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bookmark reminders count */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                      <span>Total Bookmarks: {bookmarkedWords.length} words</span>
                      <span>Category: {selectedWord.theme}</span>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">No Word Selected</p>
                    <p className="text-[10px] text-slate-400 font-bold px-4 mt-1">Select a term in the left chart grid to load detailed explanations.</p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: SYNONYM PAIRS CONTAINER (ADAPTED FROM TONE PAIRS) */}
        {/* ========================================================================= */}
        {activeSubTab === 'Pairs' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto" id="synonym-pairs-segment">
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                Vocabulary <span className="text-cyan-600">Synonym Pairs</span>
              </h1>
              <p className="text-xs sm:text-xs text-slate-500 max-w-lg mx-auto font-bold uppercase tracking-wider">
                Compare basic vocabulary side-by-side with high-band academic score boosters.
              </p>
            </div>

            <div className="bg-cyan-50/40 p-4 border border-cyan-100 rounded-xl flex items-center space-x-3 text-xs text-cyan-800 font-semibold mb-6">
              <HelpCircle className="w-5 h-5 shrink-0 text-cyan-600" />
              <span>Click either the basic terms to study equivalent boosters, or click the gold sound icon to practice saying the whole advanced academic collocation out loud!</span>
            </div>

            {/* Grid of Synonym Matchers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COL_PAIRS.map((pair) => (
                <div 
                  key={pair.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-cyan-100">
                        {pair.category}
                      </span>
                      <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${
                        pair.exam === 'IELTS' ? 'bg-red-50 text-red-500' :
                        pair.exam === 'TOEFL' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {pair.exam}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Basic Term */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Normal wording</span>
                        <span className="text-sm font-semibold text-slate-505 mt-1 block line-through decoration-red-400">{pair.basic}</span>
                      </div>
                      
                      <div className="text-slate-300 font-extrabold">➔</div>

                      {/* Advanced Term */}
                      <div>
                        <span className="text-[10px] font-black text-cyan-500 block uppercase">Band Optimizer</span>
                        <span className="text-sm font-extrabold text-slate-800 mt-1 block select-all">{pair.advanced}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play audio button */}
                  <button
                    onClick={() => handleSpeak(pair.advanced, 'word')}
                    className="w-10 h-10 rounded-full bg-slate-50 hover:bg-cyan-50 text-slate-400 hover:text-cyan-600 border border-slate-200/60 hover:border-cyan-200/60 flex items-center justify-center transition-all cursor-pointer shadow-3xs"
                    title="Speak advanced collocation pairing"
                  >
                    <Volume2 className="w-4.5 h-4.5" />
                  </button>

                </div>
              ))}
            </div>

            {/* Test prompt card */}
            <div className="bg-slate-800 text-white rounded-3xl p-8 text-center relative overflow-hidden mt-12 shadow-md">
              <div className="absolute top-[-40px] right-[-40px] opacity-[0.04]">
                <Sparkles className="w-32 h-32 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">Need a customized scoring diagnostic?</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed font-semibold">
                Use our AI Speaking Diagnostics platform on our main panel to get instant score-band evaluations of your spoken vocabulary.
              </p>
              <button 
                onClick={() => alert("Navigate back to Home or Practice Questions page to choose diagnostic prompts!")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer"
              >
                Launch Spoken Diagnostics
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 3: EXAM RESOURCES DOWNLOADS CONTAINER */}
        {/* ========================================================================= */}
        {activeSubTab === 'Downloads' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto" id="vocab-downloads-segment">
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                Vocab Study <span className="text-cyan-600">Downloads</span>
              </h1>
              <p className="text-xs sm:text-xs text-slate-500 max-w-lg mx-auto font-bold uppercase tracking-wider">
                Procure high-value cheat sheets, templates and PDF books offline.
              </p>
            </div>

            {/* Resources list cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOWNLOADS_RESOURCES.map((resource) => (
                <div 
                  key={resource.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="space-y-2 flex-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {resource.type}
                      </span>
                      <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${
                        resource.exam === 'IELTS' ? 'bg-red-50 text-red-500' :
                        resource.exam === 'TOEFL' ? 'bg-emerald-50 text-emerald-500' : 
                        resource.exam === 'PTE' ? 'bg-amber-50 text-amber-700' : 'bg-cyan-50 text-cyan-600'
                      }`}>
                        {resource.exam}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                      {resource.title}
                    </h4>

                    <span className="text-[10px] text-slate-400 font-bold font-mono">File Size: {resource.size}</span>
                  </div>

                  <button
                    onClick={() => alert(`Starting download module for: "${resource.title}"...`)}
                    className="w-10 h-10 rounded-full bg-cyan-50 hover:bg-cyan-600 text-cyan-600 hover:text-white border border-cyan-150 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-3xs"
                    title="Download resource PDF"
                  >
                    <Download className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Newsletter subscriber block */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden mt-8">
              <h3 className="text-lg sm:text-xl font-black text-slate-850 tracking-tight mb-2">
                Want weekly Academic Vocab Lists directly in your inbox?
              </h3>
              <p className="text-xs text-slate-505 font-bold mb-6 max-w-md mx-auto">
                Join our mailing list to receive 20 fresh advanced collocations every Monday morning with sound snippets.
              </p>
              
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="bg-white border border-slate-200 px-4 py-2 text-xs font-semibold rounded-full flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button 
                  onClick={() => alert("Awesome! You are indeed subbed. Look out for high-grade collocation digests in your inbox!")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider cursor-pointer transition-colors shrink-0"
                >
                  Join Newsletter
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
