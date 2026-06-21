export interface University {
  id: string;
  name: string;
  location: string;
  country: 'United States' | 'United Kingdom' | 'Canada' | 'Australia' | 'Germany' | 'Singapore' | 'Japan';
  globalRank: number;
  minIELTS: number;
  minTOEFL: number;
  minPTE: number;
  minGPA: number; // 4.0 scale
  tuitionFeesPerYear: string;
  tuitionNum: number; // For budget filtering
  bestKnownFor: string[];
  logoGradient: string;
  accentColor: string;
  description: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  award: string;
  awardNum: number; // For funding sorting
  countryRestriction: string[]; // ["United States"] or ["Any"]
  minIELTS: number;
  minTOEFL: number;
  minGPA: number;
  majorRestrictions: string[]; // ["Any"] or specific majors
  description: string;
  type: 'Full-Tuition' | 'Partial-Funding' | 'Stipend-based';
  deadline: string;
}

export const UNIVERSITIES: University[] = [
  {
    id: 'uni-mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    country: 'United States',
    globalRank: 1,
    minIELTS: 7.5,
    minTOEFL: 100,
    minPTE: 72,
    minGPA: 3.8,
    tuitionFeesPerYear: '$59,750 / year',
    tuitionNum: 59750,
    bestKnownFor: ['Computer Science', 'Engineering', 'Robotics', 'Physics'],
    logoGradient: 'from-[#A31D1D] to-[#5C1313]',
    accentColor: '#A31D1D',
    description: 'A world-class powerhouse of research and digital transformation, consistently ranked #1 globally.'
  },
  {
    id: 'uni-oxford',
    name: 'University of Oxford',
    location: 'Oxford, Oxfordshire',
    country: 'United Kingdom',
    globalRank: 3,
    minIELTS: 7.5,
    minTOEFL: 110,
    minPTE: 76,
    minGPA: 3.7,
    tuitionFeesPerYear: '£38,500 / year (~$49,000)',
    tuitionNum: 49000,
    bestKnownFor: ['Humanities', 'Medicine', 'Law', 'Business'],
    logoGradient: 'from-[#002147] to-[#001026]',
    accentColor: '#002147',
    description: 'The oldest English-speaking collegiate institution, famed for rigorous tutorials and scholastic history.'
  },
  {
    id: 'uni-stanford',
    name: 'Stanford University',
    location: 'Stanford, California',
    country: 'United States',
    globalRank: 5,
    minIELTS: 7.0,
    minTOEFL: 100,
    minPTE: 68,
    minGPA: 3.7,
    tuitionFeesPerYear: '$62,400 / year',
    tuitionNum: 62400,
    bestKnownFor: ['Computer Science', 'Business', 'Life Sciences', 'Engineering'],
    logoGradient: 'from-[#8C1515] to-[#4D0A0A]',
    accentColor: '#8C1515',
    description: 'Nestled in Silicon Valley, driving global tech entrepreneurship, innovation, and startup networking.'
  },
  {
    id: 'uni-toronto',
    name: 'University of Toronto',
    location: 'Toronto, Ontario',
    country: 'Canada',
    globalRank: 21,
    minIELTS: 7.0,
    minTOEFL: 100,
    minPTE: 65,
    minGPA: 3.5,
    tuitionFeesPerYear: 'CAD $57,000 / year (~$41,500)',
    tuitionNum: 41500,
    bestKnownFor: ['Computer Science', 'Medicine', 'Humanities', 'Data Analytics'],
    logoGradient: 'from-[#1E3A8A] to-[#172554]',
    accentColor: '#1E3A8A',
    description: 'Canada’s leading public research center with an expansive multicultural campus and strong tech incubators.'
  },
  {
    id: 'uni-melbourne',
    name: 'University of Melbourne',
    location: 'Melbourne, Victoria',
    country: 'Australia',
    globalRank: 14,
    minIELTS: 6.5,
    minTOEFL: 79,
    minPTE: 58,
    minGPA: 3.2,
    tuitionFeesPerYear: 'AUD $46,000 / year (~$30,500)',
    tuitionNum: 30500,
    bestKnownFor: ['Education', 'Engineering', 'Life Sciences', 'Architecture'],
    logoGradient: 'from-[#094184] to-[#031d3f]',
    accentColor: '#094184',
    description: 'Australia’s top-tier academy, renowned for its flexible Melbourne Curriculum and vibrant research hubs.'
  },
  {
    id: 'uni-nus',
    name: 'National University of Singapore (NUS)',
    location: 'Kent Ridge, Singapore',
    country: 'Singapore',
    globalRank: 8,
    minIELTS: 6.5,
    minTOEFL: 92,
    minPTE: 62,
    minGPA: 3.6,
    tuitionFeesPerYear: 'SGD $38,000 / year (~$28,000)',
    tuitionNum: 28000,
    bestKnownFor: ['Computer Science', 'Business', 'Engineering', 'Environmental Science'],
    logoGradient: 'from-[#F07C00] to-[#AB5800]',
    accentColor: '#F07C00',
    description: 'Asia’s premium university with deep connections to global tech and finance nodes and state-of-the-art facilities.'
  },
  {
    id: 'uni-tum',
    name: 'Technical University of Munich (TUM)',
    location: 'Munich, Bavaria',
    country: 'Germany',
    globalRank: 37,
    minIELTS: 6.5,
    minTOEFL: 88,
    minPTE: 58,
    minGPA: 3.0,
    tuitionFeesPerYear: 'No Tuition Fees (Semi-annual fee of ~€150)',
    tuitionNum: 350,
    bestKnownFor: ['Engineering', 'Automotive', 'Physics', 'Computer Science'],
    logoGradient: 'from-[#0A58CA] to-[#052C65]',
    accentColor: '#0A58CA',
    description: 'A tuition-free German excellence school producing industry-ready professionals in industrial systems.'
  },
  {
    id: 'uni-waterloo',
    name: 'University of Waterloo',
    location: 'Waterloo, Ontario',
    country: 'Canada',
    globalRank: 112,
    minIELTS: 6.5,
    minTOEFL: 90,
    minPTE: 63,
    minGPA: 3.3,
    tuitionFeesPerYear: 'CAD $48,000 / year (~$35,000)',
    tuitionNum: 35000,
    bestKnownFor: ['Computer Science', 'Software Engineering', 'Mathematics', 'Co-op Program'],
    logoGradient: 'from-[#FFD54F] to-[#FF8F00]',
    accentColor: '#FFD54F',
    description: 'Pioneered co-operative study models, matching students directly with top Silicon Valley and Toronto corporations.'
  },
  {
    id: 'uni-imperial',
    name: 'Imperial College London',
    location: 'South Kensington, London',
    country: 'United Kingdom',
    globalRank: 6,
    minIELTS: 7.0,
    minTOEFL: 92,
    minPTE: 62,
    minGPA: 3.5,
    tuitionFeesPerYear: '£42,000 / year (~$53,500)',
    tuitionNum: 53500,
    bestKnownFor: ['Medicine', 'Engineering', 'Physics', 'Computing'],
    logoGradient: 'from-[#002B49] to-[#001220]',
    accentColor: '#002B49',
    description: 'Covers STEM and Business exclusively, offering unbeatable proximity to London’s technological corridor.'
  },
  {
    id: 'uni-sydney',
    name: 'University of Sydney',
    location: 'Sydney, New South Wales',
    country: 'Australia',
    globalRank: 19,
    minIELTS: 6.5,
    minTOEFL: 85,
    minPTE: 61,
    minGPA: 3.3,
    tuitionFeesPerYear: 'AUD $48,500 / year (~$32,000)',
    tuitionNum: 32000,
    bestKnownFor: ['Business', 'Veterinary Science', 'Nursing', 'Humanities'],
    logoGradient: 'from-[#E11A22] to-[#8C0E13]',
    accentColor: '#E11A22',
    description: 'Australia’s first collegiate academy offering beautiful sandstone architectures and world-renowned faculty.'
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-gates',
    name: 'Gates Cambridge Scholarship',
    provider: 'Gates Cambridge Trust (Bill & Melinda Gates)',
    award: 'Full Tuition + £20,000/yr Living Stipend + Travel Costs',
    awardNum: 65000,
    countryRestriction: ['United Kingdom'],
    minIELTS: 7.5,
    minTOEFL: 100,
    minGPA: 3.7,
    majorRestrictions: ['Any'],
    description: 'Covers tuition and basic allowance for outstanding applicants from outside the UK to pursue master/PhD courses at Cambridge University.',
    type: 'Full-Tuition',
    deadline: 'October 15, 2026'
  },
  {
    id: 'sch-fulbright',
    name: 'Fulbright Foreign Student Program',
    provider: 'U.S. Department of State',
    award: 'Full Tuition + Health Insurance + Monthly Stipend + Plane Ticket',
    awardNum: 70000,
    countryRestriction: ['United States'],
    minIELTS: 7.0,
    minTOEFL: 95,
    minGPA: 3.4,
    majorRestrictions: ['Any'],
    description: 'The flagship US program support for international students pursuing master’s or Ph.D. programs inside premier US universities.',
    type: 'Full-Tuition',
    deadline: 'October 12, 2026'
  },
  {
    id: 'sch-chevening',
    name: 'Chevening Scholarships',
    provider: 'UK Government (FCDO)',
    award: '100% Tuition Fees + Flight expenses + Monthly Allowance',
    awardNum: 48000,
    countryRestriction: ['United Kingdom'],
    minIELTS: 6.5,
    minTOEFL: 79,
    minGPA: 3.2,
    majorRestrictions: ['Any'],
    description: 'Enables global leaders and community volunteers to study fully-funded professional 1-year Master’s courses in any UK university.',
    type: 'Full-Tuition',
    deadline: 'November 03, 2026'
  },
  {
    id: 'sch-daad',
    name: 'DAAD EPOS Scholarship',
    provider: 'German Academic Exchange Service',
    award: 'Monthly Allowance of €935 - €1,200 + Airfare + Insurance',
    awardNum: 22000,
    countryRestriction: ['Germany'],
    minIELTS: 6.0,
    minTOEFL: 80,
    minGPA: 3.0,
    majorRestrictions: ['Engineering', 'Economic Sciences', 'Environmental Science', 'Healthcare'],
    description: 'Supports prospective students wishing to expand their training in development-related postgraduate courses inside Germany.',
    type: 'Stipend-based',
    deadline: 'August 31, 2026'
  },
  {
    id: 'sch-vanier',
    name: 'Vanier Canada Graduate Scholarship',
    provider: 'Government of Canada',
    award: 'CAD $50,000 / year (up to 3 years)',
    awardNum: 37000,
    countryRestriction: ['Canada'],
    minIELTS: 7.0,
    minTOEFL: 100,
    minGPA: 3.7,
    majorRestrictions: ['Engineering', 'Health Sciences', 'Natural Sciences', 'Social Sciences'],
    description: 'Enables exceptional PhD candidates to leverage state-sponsored doctoral research resources at world-class Canadian universities.',
    type: 'Stipend-based',
    deadline: 'November 01, 2026'
  },
  {
    id: 'sch-adelaide',
    name: 'Adelaide Global Excellence Scholarship',
    provider: 'University of Adelaide',
    award: '50% Tuition Fee Reduction',
    awardNum: 16000,
    countryRestriction: ['Australia'],
    minIELTS: 6.5,
    minTOEFL: 79,
    minGPA: 3.5,
    majorRestrictions: ['Any'],
    description: 'Highly competitive scholarships acknowledging outstanding academic entries across global bachelor and master degrees.',
    type: 'Partial-Funding',
    deadline: 'December 18, 2026'
  }
];
