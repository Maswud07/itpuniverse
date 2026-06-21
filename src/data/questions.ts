import { MockTest } from '../types';

export const IELTS_TESTS: MockTest[] = [
  {
    id: 'ielts-tomato',
    exam: 'IELTS',
    title: 'Captain Shield',
    duration: '40 mins',
    questionsCount: 4,
    description: 'An academic calibration mock focused on basic reading tenses, structured library registrations, and standard argumentative essays.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-tomato',
        section: 'Listening',
        title: 'Section 1: Library Registration',
        prompt: 'Listen to the conversation about registering at a local library and choose the correct option.',
        audioText: 'Library Officer: Good morning! Welcome to the City Central Library. How can I help you today? \nStudent: Good morning! I just moved here to study and would like to register for a library card. \nLibrary Officer: Excellent. I can set that up for you right now. I just need a few details. Could you state your full name and current residential address? \nStudent: Yes, my name is Alex Mercers, and I live at 42 Linden Gardens, Flat B. \nLibrary Officer: Great, and do you have a phone number? \nStudent: Yes, it is 07700 900077. \nLibrary Officer: Perfect. The student membership is free but you will have a borrowing limit of 10 books at any one time, for a maximum duration of 14 days per checkout.',
        options: [
          'Alex is allowed to borrow up to 5 books for 14 days.',
          'Alex is allowed to borrow up to 10 books for 14 days.',
          'Alex has to pay a fee for student registration.',
          'Alex lives at 42 Garden Avenue.'
        ],
        correctAnswer: 'Alex is allowed to borrow up to 10 books for 14 days.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-tomato',
        section: 'Reading',
        title: 'Passage 1: The Resilience of Coral Reefs',
        prompt: 'Read the passage and select the statement that best aligns with the text.',
        passage: 'Coral reefs are among the most biologically diverse ecosystems on Earth, occupying less than 0.1% of the ocean floor yet sheltering over 25% of all marine species. However, they are highly sensitive to temperature fluctuations. Marine heatwaves prompt coral bleaching—a stressful process where corals expel the symbiotic algae (zooxanthellae) living in their tissues, turning completely white. Without these algae, corals lose their primary energy source and become vulnerable to mortality. Yet, researchers have observed pockets of extreme tolerance. Some reef species in the Red Sea have displayed resistance to heating, functioning normally in temperatures 2 degrees Celsius above previous thresholds. This has generated hope that selective breeding or targeted protection of these resilient strains could aid reef restoration initiatives worldwide.',
        options: [
          'Bleaching is a healthy process where corals voluntarily shed unwanted algae.',
          'All corals across the globe share identical temperature resilience thresholds.',
          'Under 0.1% of the ocean floor supports reefs, which host a quarter of all marine organisms.',
          'Red Sea corals have shown zero resistance to water temperature increases.'
        ],
        correctAnswer: 'Under 0.1% of the ocean floor supports reefs, which host a quarter of all marine organisms.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-tomato',
        section: 'Writing',
        title: 'Task 2: Academic Essay on Education',
        prompt: 'Some people think that universities should focus only on preparing graduates with practical skills for the workplace. Others argue that the true function of higher education is to pursue knowledge for its own sake, regardless of its immediate utility to employers. Discuss both views and give your opinion. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Higher education institutions play a pivotal role in shaping society. While a faction believes universities should align strictly with technical job preparation, others advocate for general knowledge pursuit. In my opinion, while professional training is undeniable for economic stability, the broader critical thinking gained from pure academic inquiry is equally vital, making a balanced curriculum the ideal approach...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-tomato',
        section: 'Speaking',
        title: 'Part 2: Describe a Memorable Travel Destination',
        prompt: 'Describe a beautiful place you visited in your country. You should say: where it is, when you went there, what you did there, and explain why you found it unusually beautiful. Record or type your answer. Try to speak/write for 1-2 minutes.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-carrot',
    exam: 'IELTS',
    title: 'Crimson Bolt',
    duration: '45 mins',
    questionsCount: 4,
    description: 'An advanced mock test focusing on environmental science, botanical defense mechanisms, and policy-driven energy transitions.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'ielts-[listening]-carrot',
        section: 'Listening',
        title: 'Section 1: Community Garden Project',
        prompt: 'Listen to the supervisor explaining the garden plots rules and identify the correct policy.',
        audioText: 'Coordinator: Thank you all for joining the Green Earth Community Garden. We have laid down simple guidelines. First, water supply is allocated strictly during mornings, specifically from 6:00 AM to 9:00 AM, to conserve municipal supplies. Second, each member has a 3-meter by 4-meter lot. We prohibit artificial chemical fertilizers; only domestic compost is allowed inside our boundary. Lastly, keys to the toolshed must be returned to the main lockbox by sunset.',
        options: [
          'Water is active all day to make agriculture comfortable.',
          'Artificial fertilizers are encouraged to boost tomato growth.',
          'Members receive a 3x4 meter plot and must avoid synthetic fertilizers.',
          'Toolshed keys can be kept overnight at home.'
        ],
        correctAnswer: 'Members receive a 3x4 meter plot and must avoid synthetic fertilizers.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-carrot',
        section: 'Reading',
        title: 'Passage 1: Nutritional Beta-Carotenes',
        prompt: 'Select the statement that matches the science regarding root tuber defense mechanisms.',
        passage: 'Carrots and related root vegetables develop thick tubers loaded with water, sugar, and vitamins to survive frosty winters underground. To protect these sugary stores from fungal decay and hungry rodents, the plant constructs terpene-based organic shields and polyacetylenes. These specific natural compounds exhibit high insecticidal and antimicrobial traits. For humans, these compounds are metabolized cleanly, and the high concentrations of beta-carotene function as potent antioxidants that support retinal health and cellular repairs.',
        options: [
          'Root vegetables accumulate sugars to attract rodents for seed distribution.',
          'Terpenes and polyacetylenes act as natural defense shields against fungal decay.',
          'Beta-carotenes have been shown to degrade human vision levels over time.',
          'Frosty winters destroy all beta-carotenes inside underground tubers.'
        ],
        correctAnswer: 'Terpenes and polyacetylenes act as natural defense shields against fungal decay.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-carrot',
        section: 'Writing',
        title: 'Task 2: Urban Green Infrastructure',
        prompt: 'In many countries, governments are planning massive rooftop crop layouts and urban farms to counter carbon footprints. Critics argue this is too expensive and inefficient compared to traditional rural farming. Discuss both views and give your opinion. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Urban greening projects represent a visionary shift in municipal architecture. While rural farms provide massive raw yields more economically, urban agricultural arrays foster local resilience, cut emissions from transport, and cool buildings down, justifying local government support...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-carrot',
        section: 'Speaking',
        title: 'Part 2: Describe a Healthy Routine',
        prompt: 'Describe a healthy habit or lifestyle routine you recently integrated. You should say: what it is, how often you do it, what equipment is required, and explain what positive results you have felt.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-paprika',
    exam: 'IELTS',
    title: 'Grand Sentinel',
    duration: '35 mins',
    questionsCount: 4,
    description: 'A beginner-friendly diagnostic mock centered on global shipping logistics, agricultural history, and spice preservation methods.',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'ielts-[listening]-paprika',
        section: 'Listening',
        title: 'Section 1: Spice Distribution logistics',
        prompt: 'Identify the import quarantine duration from the warehouse conversation.',
        audioText: 'Quarantine officer: Good afternoon. We are processing the fresh bell pepper and paprika container from Central Valley. Cargo number is PK-4402. \nManager: Perfect. Is the standard 3-day mold quarantine active? \nQuarantine officer: Correct. Because temperature sensors showed a 1-degree spike during shipping, we must hold the batch for a full 48 hours to complete safety audits, rather than the quick 12-hour fast-track.',
        options: [
          'The cargo is allowed to proceed immediately with zero hold.',
          'A mandatory hold of 48 hours is required due to shipping temperature spikes.',
          'The container must be completely incinerated due to severe contamination.',
          'The quarantine will last for exactly 12 hours.'
        ],
        correctAnswer: 'A mandatory hold of 48 hours is required due to shipping temperature spikes.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-paprika',
        section: 'Reading',
        title: 'Passage 1: Capsicum Spread Across Oceans',
        prompt: 'Select the statement that matches the historical dispersion text.',
        passage: 'Originally native to Mesoamerica, Capsicum plants (which yield both sweet bell peppers and fiery chilies) were brought to Europe by early trade voyages. In Hungary, these plants found perfect soil conditions and a temperate climate, leading to the creation of Paprika—a dry powder that became central to Central European gastronomy. Unlike spicy black pepper, which had to be shipped at high expense from tropical ports, hungarian paprika provided an affordable, vitamin-rich kitchen staple that kept food fresh during long winters.',
        options: [
          'Hungarians discovered Capsicum growing as a native alpine wildflower.',
          'Paprika proved to be extremely low in vitamins and highly expensive to store.',
          'Capsicum originated in Mesoamerica and hungarian paprika became a cheaper, vitamin-rich alternative to black pepper.',
          'European trade ships banned the import of chilies due to agricultural concerns.'
        ],
        correctAnswer: 'Capsicum originated in Mesoamerica and hungarian paprika became a cheaper, vitamin-rich alternative to black pepper.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-paprika',
        section: 'Writing',
        title: 'Task 2: Globalization of National Cuisines',
        prompt: 'With the growth of international food networks, traditional regional cooking styles are changing rapidly. Some believe this is losing national heritage, while others think it represents healthy cultural exchange. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Gastronomy operates as an organic mirror of human migrations. While homogenization threatens specific ancient recipes, food hybridization fosters unprecedented culinary appreciation, building cross-border empathy through shared tastes...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-paprika',
        section: 'Speaking',
        title: 'Part 2: Describe a Culinary Tradition',
        prompt: 'Describe a traditional dish in your country often served during holidays. You should say: what ingredients it contains, how it is cooked, who prepares it, and explain why it is culturally meaningful.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-mushroom',
    exam: 'IELTS',
    title: 'Cosmic Force',
    duration: '38 mins',
    questionsCount: 4,
    description: 'A medium-level mock assessing your comprehension of mycelial structures, environmental cleanup biology, and clean energy topics.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-mushroom',
        section: 'Listening',
        title: 'Section 1: Fungal Mycelium in Packaging',
        prompt: 'Listen and find the material biodegrade timeline stated in the lecture.',
        audioText: 'Speaker: GreenTech Labs has successfully started using mycelium—the underground root-like network of mushrooms—to replace styrofoam packaging. The process involves mixing wood chips with live mycelium in a mold. Within 7 days, the fibers bind the chips into a rigid, shock-absorptive material. Once baked to stop growth, it works as safe packaging. Most importantly, it decomposes completely in soil within 45 days, compared to styrofoam which takes 500 years.',
        options: [
          'Mycelium packaging decomposes in soil in 45 days.',
          'The material requires five years to break down organically.',
          'GreenTech packaging has zero heat tolerance.',
          'Styrofoam packaging is safer because it degrades in 7 days.'
        ],
        correctAnswer: 'Mycelium packaging decomposes in soil in 45 days.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-mushroom',
        section: 'Reading',
        title: 'Passage 1: Bioremediation through Mushrooms',
        prompt: 'Extract the core argument regarding fungal breakdown capacities.',
        passage: 'Mycoremediation—the process of using fungi to decontaminate polluted environments—is gaining rapid traction. Fungi secrete powerful extracellular enzymes, typically used to break down resilient woody fibers like lignin. Researchers found these same enzymes break down complex chemical bonds in crude oil, pesticides, and plastics. Unlike bacteria, which must consume toxins directly, expanding mycelial networks can grow across toxic soils, slowly converting highly harmful molecules into simple water and carbon compounds.',
        options: [
          'Mushrooms are easily poisoned by simple wood fibers.',
          'Mycoremediation is an outdated chemical spray technique.',
          'Fungi secrete enzymes that can break down toxic molecules in oil and plastics.',
          'Bacteria are much faster are spreading across physical solid waste.'
        ],
        correctAnswer: 'Fungi secrete enzymes that can break down toxic molecules in oil and plastics.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-mushroom',
        section: 'Writing',
        title: 'Task 2: Responsibility for Environmental Cleanup',
        prompt: 'Some believe that large corporations should pay for environmental cleaning, while others believe that general taxpayers must share the cost through public funds. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Ecological degradation demands systemic funding. While a punitive approach rightly targets corporate polluters to cover restoration metrics, public matching funds secure fast response capabilities and maintain long-term infrastructure stability...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-mushroom',
        section: 'Speaking',
        title: 'Part 2: Describe an Environmental Initiative',
        prompt: 'Describe a project or change in your neighborhood designed to protect natural resources. You should say: what it is, who organized it, what is required of neighbors, and why it is beneficial.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-green-pea',
    exam: 'IELTS',
    title: 'Aqua Strike',
    duration: '40 mins',
    questionsCount: 4,
    description: 'An academic mock test evaluating genetic laws, agricultural history, and selective crop adaptation strategies.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-green-pea',
        section: 'Listening',
        title: 'Section 1: Genetics Lab Orientation',
        prompt: 'Identify the safety gear required to enter the gene mapping room from the audio.',
        audioText: 'Professor: Welcome to the Botany Genetics lab. Today we are conducting cross-pollination on pea plants. Before crossing under the heat lights, all students must wear protective nitrile gloves, a lab coat, and chemical safety splash goggles. Unlike the soil preparation room where cotton masks are fine, we have active pollen arrays here, meaning goggles are totally non-negotiable.',
        options: [
          'Students must wear nitrile gloves, a lab coat, and chemical safety splash goggles.',
          'Only cotton masks are allowed in the genetics room.',
          'Pea plants do not produce pollen, so search specs are optional.',
          'Only simple street clothes are needed inside the active array.'
        ],
        correctAnswer: 'Students must wear nitrile gloves, a lab coat, and chemical safety splash goggles.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-green-pea',
        section: 'Reading',
        title: 'Passage 1: Gregor Mendels Pea Plant Experiments',
        prompt: 'Which statement accurately describes Mendels experimental insights?',
        passage: 'In his quiet monastery garden, Gregor Mendel conducted groundbreaking crossing on Pisum sativum, the common pea plant. By tracking specific traits—such as plant height, pod shape, and pea color—across multiple generations, Mendel formulated the fundamental laws of modern genetics. He noticed that alleles do not simply blend, but rather display dominant or recessive dynamics. For example, crossing purebred yellow-pea and green-pea lines produced exclusively yellow seeds in the first generation, yet the green-pea trait consistently re-emerged in precisely a one-to-three ratio during secondary breeding cycles.',
        options: [
          'Mendel concluded that traits blend smoothly like mixed liquids.',
          'Pea plants were selected because they have only one single gene chromosome.',
          'The green-pea trait disappeared completely and never re-emerged.',
          'The green-pea recessive trait re-emerged in a one-to-three ratio in second-generation breeding.'
        ],
        correctAnswer: 'The green-pea recessive trait re-emerged in a one-to-three ratio in second-generation breeding.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-green-pea',
        section: 'Writing',
        title: 'Task 2: Genetically Modified Agriculture',
        prompt: 'Some argue that genetically modified crops are essential to feeding a growing world population. Others warn of long-term biological risks. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Bio-engineering offers a robust weapon against systemic famine in regions affected by severe droughts. However, introducing sterile seeds and potential allergen mutations highlights the urgent need for stringent global oversight rather than unchecked commercial release...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-green-pea',
        section: 'Speaking',
        title: 'Part 2: Describe a Scientific Concept',
        prompt: 'Describe a basic scientific law or concept that you found interesting. You should say: what it is, when you learned it, how it affects everyday life, and explain why you find it intriguing.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-aubergine',
    exam: 'IELTS',
    title: 'Cyber Titan',
    duration: '42 mins',
    questionsCount: 4,
    description: 'An advanced mock focusing on nightshade crop taxonomy, natural alkaline compounds, and international organic standards.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'ielts-[listening]-aubergine',
        section: 'Listening',
        title: 'Section 1: Organic Farm Standards',
        prompt: 'Listen and locate the buffer strip width requirement for organic certification.',
        audioText: 'Inspector: Thanks for submitting the organic map for the Aubergine and Nightshade fields. To ensure pesticides from the southern farm do not drift here, our rules require a minimum 8-meter buffer strip of permanent grass along your line. We saw that your current strip is 6 meters, so you must extend it by another 2 meters before our next review on Friday.',
        options: [
          'A buffer strip of exactly 4 meters is sufficient.',
          'The southern farm must shut down its pesticide usage completely.',
          'A minimum 8-meter permanent grass buffer strip is required for organic rules.',
          'Peppers and aubergines cannot be grown adjacent to grass.'
        ],
        correctAnswer: 'A minimum 8-meter permanent grass buffer strip is required for organic rules.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-aubergine',
        section: 'Reading',
        title: 'Passage 1: Solanaceae Plants and Alkaloids',
        prompt: 'Confirm the scientific finding regarding alkaloid profiles in nightshades.',
        passage: 'Aubergines, potatoes, and tomatoes belong to the Solanaceae family, commonly termed nightshades. These plants are known for generating nitrogen-dense organic chemicals called alkaloids, such as solanine and nicotine. These alkaloids serve as a natural defense system, causing bitterness or irritation in herbivores. Though concentrated levels in raw foliage are toxic, the ripe fruits of eggplant contain trace amounts that are completely harmless to humans. In fact, research suggests these dietary alkaloids possess mild anti-inflammatory properties when cooked properly, contributing to general metabolic wellness.',
        options: [
          'Alkaloids are toxic substances that make ripe tomatoes completely inedible to humans.',
          'Eggplants produce alkaloids to accelerate water absorption from the soil.',
          'Trace alkaloids in aubergine are harmless to humans and may show minor anti-inflammatory benefits when cooked.',
          'Solanaceae plants are the only agricultural family that does not generate defense chemistry.'
        ],
        correctAnswer: 'Trace alkaloids in aubergine are harmless to humans and may show minor anti-inflammatory benefits when cooked.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-aubergine',
        section: 'Writing',
        title: 'Task 2: Standardizing Food Security Policies',
        prompt: 'Many believe that ensuring nutritious dietary access for all citizens is the sole responsibility of the central government. Others claim private supply networks are more efficient. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Nutritional security underpins national stability. While private markets excel at logistics and diversifying food items, state subsidies operate as a vital safety net during supply shortages, highlighting the necessity of public-private cooperation...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-aubergine',
        section: 'Speaking',
        title: 'Part 2: Describe a Specialty Market',
        prompt: 'Describe an open-air market or farm market you went to in your life. You should say: where it is, what items are sold there, how busy it was, and explain why you prefer or dislike shopping in such settings.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-sweet-potato',
    exam: 'IELTS',
    title: 'Blaze Vanguard',
    duration: '35 mins',
    questionsCount: 4,
    description: 'A beginner to intermediate mock focused on starch metabolism, global food supply chains, and crop carbon footprint targets.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-sweet-potato',
        section: 'Listening',
        title: 'Section 1: Dehydrated Food Exports',
        prompt: 'Identify the shipping temperature target for dehydrated sweet potato slices.',
        audioText: 'Logistics Desk: Hello, I have the spec sheet for the sweet potato shipment to Oslo. Ground rules state the cargo should remain dry, below 35% relative humidity. The refrigeration unit should be stabilized at exactly 14 degrees Celsius. Even a 5-degree drop could spoil the starch cells, causing severe dynamic mold risks during transport.',
        options: [
          'Must be frozen below zero degrees Celsius.',
          'Must be transported at exactly 14 degrees Celsius with humidity under 35%.',
          'Relative humidity must be kept around 80% to retain soft texture.',
          'The shipment cargo should be kept in open-deck, sun-exposed crates.'
        ],
        correctAnswer: 'Must be transported at exactly 14 degrees Celsius with humidity under 35%.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-sweet-potato',
        section: 'Reading',
        title: 'Passage 1: Starch Storage Tactics in Ipomoea batatas',
        prompt: 'Select the statement that matches the biological plant adaptation.',
        passage: 'Unlike standard potatoes, which are underground stems (tubers), sweet potatoes (Ipomoea batatas) are modified storage roots. These storage roots serve as energy reservoirs, storing starch alongside highly dense sugars and beta-carotene. When the soil temperature changes during seasonal shifts, the plant secretes specific enzymes called amylases. These enzymes break down insoluble starches into sweet maltose sugars, supplying metabolic energy to help the plant sprout new shoots.',
        options: [
          'Sweet potatoes are subterranean stems that store zero nutritional content.',
          'Amylase enzymes convert stored starch into simple soluble maltose sugars during sprouting periods.',
          'Cold soils encourage immediate complete sweet potato leaf degradation.',
          'Sweet potatoes have been shown to lack carbohydrate structures.'
        ],
        correctAnswer: 'Amylase enzymes convert stored starch into simple soluble maltose sugars during sprouting periods.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-sweet-potato',
        section: 'Writing',
        title: 'Task 2: Preservatives and Mass Farming',
        prompt: 'To feed urban centers, food must be heavily processed and treated with chemical preservatives. Some argue this is unsafe. Others say it is necessary. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Processed logistics prevent devastating inner city food waste. While clean, chemical-free food remains optimal, modern flash-freezing and organic salts provide practical trade-offs that support global food security goals without compromising health...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-sweet-potato',
        section: 'Speaking',
        title: 'Part 2: Describe a Memorable Meal',
        prompt: 'Describe a memorable dinner or lunch you had with close friends or relatives. You should say: where you ate, what delicious items were cooked, who attended, and explain why that meal remained so vivid in your mind.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-turnip',
    exam: 'IELTS',
    title: 'Storm Ninja',
    duration: '36 mins',
    questionsCount: 4,
    description: 'A beginner level mock exploring biennial plant timelines, historic crop rotations, and modern sustainable agriculture.',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'ielts-[listening]-turnip',
        section: 'Listening',
        title: 'Section 1: Heritage Seeds Catalog',
        prompt: 'Identify the planting depth advice for heritage Turnip seed strains.',
        audioText: 'Agent: Thank you for buying the heirloom seed pack. For turnips, you must plant seeds at a shallow depth of exactly half an inch. Planting deeper than 1 inch will prevent the cotyledon stem from breaching the soil surface, especially in heavy clay gardens where seeds are prone to drowning.',
        options: [
          'Plant turnips exactly 5 inches deep to protect them from frost.',
          'Plant seeds at a shallow depth of half an inch.',
          'Turnips cannot be grown from seeds and require root cuttings.',
          'Heavy clay soil is the only medium that requires zero watering.'
        ],
        correctAnswer: 'Plant seeds at a shallow depth of half an inch.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-turnip',
        section: 'Reading',
        title: 'Passage 1: Biennial Cycles of Brassicaceae',
        prompt: 'Select the statement that matches turnip biological life phases.',
        passage: 'Turnips belong to the Brassicaceae family, which follows a biennial biological lifecycle. In the first year, the plant directs all energy down to grow a round, starch-rich root. If left in the soil over winter, the turnip enters a flowering phase in its second year. The plant draws heavily on its root reserves, causing the tuber to wither as it sends up a tall stem with yellow flowers that produce hundreds of seeds to secure the next generation.',
        options: [
          'Turnips complete their flowering cycle within the first twelve weeks of planting.',
          'Turnips are annual plants that rot immediately after the first freeze.',
          'In their second year, turnips draw heavily on root starches to support flowering and seed production.',
          'Yellow turnip flowers are completely sterile and unable to produce seeds.'
        ],
        correctAnswer: 'In their second year, turnips draw heavily on root starches to support flowering and seed production.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-turnip',
        section: 'Writing',
        title: 'Task 2: Urban Greenbelts and Housing',
        prompt: 'In many growing cities, protected green areas are being cleared to construct affordable housing blocks. Critics argue this permanently damages local ecology. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'High-density housing projects resolve pressing socio-economic housing crises. However, building over natural greenbelts worsens the heat-island effect, indicating that brownfield development and multi-tier modular formats must be explored instead...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-turnip',
        section: 'Speaking',
        title: 'Part 2: Describe a Local Park',
        prompt: 'Describe a public park or nature reserve in your city. You should say: where it is, how often you visit, what amenities are available, and explain why this park is important to local citizens.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-avocado',
    exam: 'IELTS',
    title: 'Iron Dynamo',
    duration: '45 mins',
    questionsCount: 4,
    description: 'An advanced mock focusing on specialized evergreen crops, plant water transport mechanics, and global ecological export footprints.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'ielts-[listening]-avocado',
        section: 'Listening',
        title: 'Section 1: Orchard Water Infrastructure',
        prompt: 'Identify the water delivery volume per tree required to sustain an avocado arbor.',
        audioText: 'Supervisor: Let\'s review our micro-drip schedule for the Avocado block. Because avocados have extremely shallow root networks, they require consistent moisture but suffer root rot if waterlogged. Under current conditions, each tree requires exactly 65 liters of water per day delivered in two 30-minute pulses, and we should avoid any single massive flooding pulse.',
        options: [
          'A single flood pulse of 500 liters is recommended daily.',
          'Avocados must be watered with 65 liters of water daily, divided into two pulses.',
          'Avoid all watering since avocados are drought-resistant desert plants.',
          'Micro-drip irrigation should be used for exactly five minutes, once a week.'
        ],
        correctAnswer: 'Avocados must be watered with 65 liters of water daily, divided into two pulses.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-avocado',
        section: 'Reading',
        title: 'Passage 1: Persea americana Evolution and Ecology',
        prompt: 'Identify the matching evolutionary ecological insight for avocados.',
        passage: 'The avocado (Persea americana) is a relic of the Cenozoic era, when it mutualistically co-evolved with giant megafauna. These massive mammals, such as giant ground sloths, would swallow the large seeds whole and pass them safely, dispersing the trees over vast landscapes. Following the extinction of these animals, the avocado tree survived in tropical pocket forests. Its uniquely high concentration of mono-unsaturated fatty acids—unusually dense for tree fruits—was designed to offer massive caloric pay-offs to large herbivore partners, rather than modern bird or rodent seed dispersers.',
        options: [
          'Avocados evolved to attract small rodents to carry their seeds.',
          'Avocados were originally desert cacti that adapted to dry sand.',
          'High fatty acid levels in avocados co-evolved to offer massive caloric gains to extinct giant megafauna.',
          'The avocado seed is designed to dissolve fully in strong digestive acids.'
        ],
        correctAnswer: 'High fatty acid levels in avocados co-evolved to offer massive caloric gains to extinct giant megafauna.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-avocado',
        section: 'Writing',
        title: 'Task 2: Global Supply Footprints of Exotic Crops',
        prompt: 'Exotic high-value crops (such as avocados, almonds, and superfoods) are heavily shipped globally, creating jobs in growing nations but triggering water shortages and transport emissions. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'High-value agriculture provides a vital escape from systemic rural poverty in developing nations. However, unchecked water depletion and high shipping-related footprints highlight the necessity of fair-trade quotas and sustainable drip-irrigation mandates...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-avocado',
        section: 'Speaking',
        title: 'Part 2: Describe an Environmental Debate',
        prompt: 'Describe a public debate or debate topic regarding the environment that was recently in the news. You should say: what the issue was, who key sides are, why it is controversial, and explain your personal views on it.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-onion',
    exam: 'IELTS',
    title: 'Shadow Ranger',
    duration: '40 mins',
    questionsCount: 4,
    description: 'An essential intermediate diagnostic mock examining sulfur-binding plant compounds, historic agricultural preservation, and crop yields.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-onion',
        section: 'Listening',
        title: 'Section 1: Farm Produce Supply',
        prompt: 'Listen to the supervisor explaining the warehouse distribution inventory and identify the correct allotment.',
        audioText: 'Supervisor: Welcome back, team. We are packing the fall root harvest. Today, our main focus is the Sweet yellow onion stock. We have exactly 12,000 crates ready for the eastern terminal, and only 4,500 crates for the local organic stores. Make sure you use the heat-sealed ventilation film on the terminal cargo to prevent sulfur condensation, which accelerates root mold.',
        options: [
          'Eastern terminal receives 4,500 crates and local stores 12,000.',
          'Local organic stores receive 12,000 crates.',
          'Eastern terminal receives 12,000 crates which require heat-sealed ventilation film.',
          'Onions must be packed in fully airtight steel containers.'
        ],
        correctAnswer: 'Eastern terminal receives 12,000 crates which require heat-sealed ventilation film.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-onion',
        section: 'Reading',
        title: 'Passage 1: Allium Family Adaptations',
        prompt: 'Which statement accurately describes the defensive adaptation features of alliums?',
        passage: 'Members of the Allium genus, including onions, garlic, and leeks, synthesize complex sulfur combinations such as syn-propanethial-S-oxide. When cell walls are physically disrupted by chewing or chopping, an enzymatic reaction converts these chemicals into volatile aerosol gas. This gas acts as a potent self-defense system against herbivores and subterranean burrowers. In humans, the gas stimulates corneal sensory fibers, triggering reflexive lachrymal secretions—commonly known as crying. Despite this sensory irritation, these sulfur compounds exhibit high antiviral and anti-bacterial qualities that contribute to cardiovascular vitality when consumed regularly.',
        options: [
          'The syn-propanethial-S-oxide compounds are permanently inert and do not respond to cutting.',
          'Sulfate aerosols promote immediate blindness in small birds and mammals.',
          'The aerosol gas acts as a defense against herbivores, and these sulfur compounds offer health benefits.',
          'Alliums are preferred by grazing herbivores due to their high sugar content.'
        ],
        correctAnswer: 'The aerosol gas acts as a defense against herbivores, and these sulfur compounds offer health benefits.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-onion',
        section: 'Writing',
        title: 'Task 2: Traditional Farming Methods',
        prompt: 'Many believe that traditional family-owned farms are obsolete and modern automated monoculture is the only way to satisfy global grocery demands. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'Industrialized monoculture ensures stable high yields in a volatile global economy. However, ignoring heirloom agricultural variations and over-relying on synthetic compounds risks long-term soils depletion, meaning structured modular family farms remain essential...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-onion',
        section: 'Speaking',
        title: 'Part 2: Describe a Specialty Garden',
        prompt: 'Describe a public garden, farm, or greenhouse you have visited. You should say: where it is located, what varieties of crops are grown there, who works there, and explain what made the visit interesting.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  },
  {
    id: 'ielts-broccoli',
    exam: 'IELTS',
    title: 'Apex Phoenix',
    duration: '35 mins',
    questionsCount: 4,
    description: 'An elegant intermediate mock checking complex organic isothiocyanates, global cold storage protocols, and plant nutrient density.',
    difficulty: 'Medium',
    questions: [
      {
        id: 'ielts-[listening]-broccoli',
        section: 'Listening',
        title: 'Section 1: Cold Storage Logistics',
        prompt: 'Listen to the logistics desk specifying the temperature targets and find the correct target.',
        audioText: 'Logistics officer: Thanks for checking. To handle the broccoli crop, we must operate our transit trucks under a continuous cold chain. Unlike potatoes, broccoli heads have a high rate of respiration. The cargo temperature must be maintained at exactly 1 degree Celsius, with a relative humidity level between 90% and 95%. Any temperature reading above 4 degrees will cause rapid chlorophyll breakdown, yellowing the florets in under 24 hours.',
        options: [
          'Broccoli should be kept at 10 degrees Celsius and ambient dryness.',
          'Continuous cold chain must be kept at exactly 1 degree Celsius with 90-95% humidity.',
          'Florets yellow faster when stored in high carbon environments below freezing.',
          'No humidity controls are needed due to natural wax coatings.'
        ],
        correctAnswer: 'Continuous cold chain must be kept at exactly 1 degree Celsius with 90-95% humidity.',
        timeLimit: 120,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[reading]-broccoli',
        section: 'Reading',
        title: 'Passage 1: Cruciferous Crops and Cellular Health',
        prompt: 'What compound in broccoli is described as offering protective qualities?',
        passage: 'Broccoli (Brassica oleracea var. italica) belongs to the cruciferous plant family, famed for rich reserves of glucosinolates. Upon mechanical chewing, these molecules fuse with enzyme systems to release sulforaphane, a highly potent natural isothiocyanate. Sulforaphane stimulates the body\'s phase II detoxification pathway, which helps eliminate carcinogens and reduces cellular oxidative strain. Modern medical trials confirm that regular intake of cruciferous sprouts significantly decreases inflammation and promotes cellular repair mechanisms throughout the circulatory system.',
        options: [
          'Glucosinolates degrade key enzymes and weaken general body tissue.',
          'Sulforaphane is a toxic material that should be avoided by humans.',
          'Glucosinolates convert into protective sulforaphane, which aids detoxification and reduces oxidative strain.',
          'Sprouts provide zero bio-available therapeutic nutrients.'
        ],
        correctAnswer: 'Glucosinolates convert into protective sulforaphane, which aids detoxification and reduces oxidative strain.',
        timeLimit: 180,
        type: 'multiple-choice'
      },
      {
        id: 'ielts-[writing]-broccoli',
        section: 'Writing',
        title: 'Task 2: Global Fast Food expansion',
        prompt: 'In many countries, fast food has become cheaper and more available than fresh organic vegetables. Some argue this is a major public health emergency that demands direct food taxes. Discuss both views. (Write at least 150 words)',
        timeLimit: 1200,
        sampleAnswer: 'The high availability of fast food stems from massive subsidy economies. While punitive food taxes are controversial among lower-income communities, subsidizing local agricultural initiatives and integrating nutritional literacy classes offers a balanced corrective approach...',
        type: 'text-input'
      },
      {
        id: 'ielts-[speaking]-broccoli',
        section: 'Speaking',
        title: 'Part 2: Describe a Healthy Specialty Dish',
        prompt: 'Describe a healthy meal or recipe that you enjoy making. You should say: what ingredients are needed, how complex it is to prepare, what health benefits it provides, and explain why you prefer it.',
        timeLimit: 180,
        type: 'speak'
      }
    ]
  }
];

export const TOEFL_TESTS: MockTest[] = IELTS_TESTS.map((t, idx) => {
  const planetNames = [
    'Hero Cadet',
    'Aero Swift',
    'Magma Guard',
    'Sonic Wave',
    'Solar Knight',
    'Bio Buster',
    'Nebula Chaser',
    'Hyperion',
    'Infinity Star',
    'Mirage',
    'Geo Titan',
    'Bright Omega'
  ];
  const planetTitle = planetNames[idx] || t.title;
  return {
    ...t,
    id: t.id.replace('ielts-', 'toefl-'),
    exam: 'TOEFL' as const,
    title: planetTitle,
    duration: '45 mins',
    difficulty: t.difficulty,
    questions: t.questions.map((q) => {
      if (q.section === 'Writing') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'toefl-'),
          title: 'Integrated Writing Task - Lecture and Reading Contrast',
          prompt: 'The professor in environmental ecology has given a short statement on sustainable food logistics. Argue your perspective in response to the question: \n"Discuss the environmental benefits and economic trade-offs of micro-grid vertical farms versus large industrial agricultural setups." (Write at least 150 words)',
        };
      }
      if (q.section === 'Speaking') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'toefl-'),
          title: 'Integrated Speaking Task - Campus Policy',
          prompt: 'A university campus notice announced a complete transition to plant-based compost containers in the dining halls. The student disagrees with the timing. Explain both the proposal and the student’s concern.',
          timeLimit: 60,
        };
      }
      return {
        ...q,
        id: q.id.replace('ielts-', 'toefl-'),
      };
    }),
  };
});

export const PTE_TESTS: MockTest[] = IELTS_TESTS.map((t, idx) => {
  const flowerNames = [
    'Spidey Kid',
    'Vortex',
    'Zen Titan',
    'Glory Kid',
    'Vector Force',
    'Steel Grip',
    'Frost Bite',
    'Ruby Ranger',
    'Nova Ray',
    'Aqua Jet',
    'Lumina'
  ];
  const flowerTitle = flowerNames[idx] || t.title;
  return {
    ...t,
    id: t.id.replace('ielts-', 'pte-'),
    exam: 'PTE' as const,
    title: flowerTitle,
    duration: '35 mins',
    difficulty: t.difficulty,
    questions: t.questions.map((q) => {
      if (q.section === 'Listening') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'pte-'),
          title: 'Highlight Incorrect Words',
          prompt: 'Listen to the passage and select correct options in the text below.',
        };
      }
      if (q.section === 'Reading') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'pte-'),
          title: 'Fill in the Blanks',
          prompt: 'Read the sentence block carefully and choose the most fits-the-blank term.',
        };
      }
      if (q.section === 'Writing') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'pte-'),
          title: 'Write Essay',
          prompt: 'The rise of micro-drip irrigation technologies and vertical gardens is transforming modern cities. Discuss the benefits and potential limitations. (200-300 words)',
        };
      }
      if (q.section === 'Speaking') {
        return {
          ...q,
          id: q.id.replace('ielts-', 'pte-'),
          title: 'Describe Image',
          prompt: 'Look at the description of agricultural outputs and summarize the key visual trends in 40 seconds.',
          timeLimit: 40,
        };
      }
      return {
        ...q,
        id: q.id.replace('ielts-', 'pte-'),
      };
    }),
  };
});

export const ALL_TESTS: MockTest[] = [...IELTS_TESTS, ...TOEFL_TESTS, ...PTE_TESTS];

export const STUDY_RESOURCES = [
  {
    id: 'res-1',
    exam: 'IELTS' as const,
    title: 'Mastering Cozy Signposting in IELTS Speaking',
    category: 'Speaking',
    duration: '10 min read',
    description: 'Learn how to naturally link ideas using phrases like "As for", "To begin with", and "In terms of" to jump your fluency score to Band 8+.',
    content: 'Fluency and coherence represent 25% of your IELTS Speaking score. Signposting is the art of verbal orientation, telling the examiner exactly where your response is going. Use transitions contextually instead of throwing in rigid list markers like "firstly, secondly".'
  },
  {
    id: 'res-2',
    exam: 'IELTS' as const,
    title: 'The Paragraph Structure for Task 2 Essays',
    category: 'Writing',
    duration: '15 min read',
    description: 'Master the 4-paragraph grid: Introduction (hook/thesis), Body 1 (first view), Body 2 (second view + opinion), and Conclusion.',
    content: 'Coherence and cohesion is boosted when each paragraph has exactly one clear central topic sentence, followed by specific examples and explanation bounds.'
  },
  {
    id: 'res-3',
    exam: 'TOEFL' as const,
    title: 'Listening for Hidden Attitude and Inference',
    category: 'Listening',
    duration: '12 min view',
    description: 'TOEFL questions frequently check not just WHAT was said, but the professor’s attitude. Recognize tone variations, sarcasm, and emphasis.',
    content: 'When a speaker says, "Oh, wonderful...", look closely at the speed and pitch. Flat, slow intonation usually indicators irony/frustration rather than actual joy.'
  },
  {
    id: 'res-4',
    exam: 'TOEFL' as const,
    title: 'Pacing the Academic Reading Section',
    category: 'Reading',
    duration: '18 min read',
    description: 'You have only 18 minutes per passage on TOEFL iBT. Read strategies to skim paragraphs, solve vocabulary questions first, and reference pronouns.',
    content: 'Never spend more than 90 seconds on a single question. If stuck, make an educated guess, flag it, and return later.'
  },
  {
    id: 'res-5',
    exam: 'PTE' as const,
    title: 'Oral Fluency & Pronunciation Secrets in PTE Read Aloud',
    category: 'Speaking',
    duration: '8 min read',
    description: 'PTE computer grading values steady oral pace above everything. Pausing needlessly is a score killer. Practice continuous phrasing.',
    content: 'The computer checks your phonetic segmentation and rhythmic stressing. Group words into natural conceptual chunks and glide through intermediate connectors.'
  }
];
