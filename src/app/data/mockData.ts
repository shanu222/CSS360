// ─── CSS Exam Mock Data ────────────────────────────────────────────────────

export const compulsorySubjects = [
  {
    id: "english-essay",
    name: "English Essay",
    marks: 100,
    color: "bg-blue-500",
    icon: "✍️",
    description: "Develop analytical writing skills for 2000-word essays on contemporary issues.",
    progress: 65,
    topics: ["Argumentative Essays", "Descriptive Essays", "Narrative Techniques", "Essay Outlines", "Vocabulary Building", "Critical Thinking"],
  },
  {
    id: "english-precis",
    name: "English Precis & Composition",
    marks: 100,
    color: "bg-indigo-500",
    icon: "📝",
    description: "Master précis writing, grammar, comprehension, and translation skills.",
    progress: 42,
    topics: ["Précis Writing", "Grammar & Usage", "Comprehension", "Translation", "Idioms & Phrases", "Letter Writing"],
    syllabus: [
      {
        section: "I. Precis Writing",
        marks: 20,
        subsections: [
          "A carefully selected passage will be given for precis writing",
          "Candidates will summarize the passage while preserving the central idea",
          "They must also suggest an appropriate title",
          "15 marks are for precis writing and 5 marks for the title"
        ]
      },
      {
        section: "II. Reading Comprehension",
        marks: 20,
        subsections: [
          "A passage will be provided followed by five questions",
          "Each question carries 4 marks",
          "The objective is to test the candidate's understanding and analytical ability"
        ]
      },
      {
        section: "III. Grammar and Vocabulary",
        marks: 20,
        subsections: [
          "Correct usage of tense, articles, prepositions, conjunctions, and punctuation",
          "Understanding of phrasal verbs",
          "Knowledge of synonyms and antonyms"
        ]
      },
      {
        section: "IV. Sentence Correction",
        marks: 10,
        subsections: [
          "Sentences containing grammatical or punctuation errors will be provided",
          "Candidates must correct them without unnecessary alterations"
        ]
      },
      {
        section: "V. Grouping of Words",
        marks: 10,
        subsections: [
          "A list of twenty words will be provided",
          "Candidates will group words based on similar or opposite meanings"
        ]
      },
      {
        section: "VI. Pairs of Words",
        marks: 10,
        subsections: [
          "Ten pairs of commonly confused words will be given",
          "Candidates must explain the difference and use them in sentences"
        ]
      },
      {
        section: "VII. Translation",
        marks: 10,
        subsections: [
          "Ten short Urdu sentences will be provided",
          "Candidates must translate them accurately into English"
        ]
      }
    ]
  },
  {
    id: "general-science",
    name: "General Science & Ability",
    marks: 100,
    color: "bg-green-500",
    icon: "🔬",
    description: "Covers everyday science, mental ability, and analytical reasoning.",
    progress: 78,
    topics: ["Physics Basics", "Chemistry Concepts", "Biology Fundamentals", "Mental Ability", "Analytical Reasoning", "Data Interpretation"],
    syllabus: [
      {
        section: "Part I: General Science - Physical Sciences",
        marks: 30,
        subsections: [
          "Structure and properties of matter",
          "Atoms, molecules, elements, and compounds",
          "States of matter",
          "Energy: forms, sources, and transformations",
          "Basic laws of motion and energy",
          "Sound, light, heat, and electricity"
        ]
      },
      {
        section: "Part I: General Science - Earth and Environmental Sciences",
        marks: 20,
        subsections: [
          "Structure of the Earth",
          "Atmosphere and climate",
          "Weather systems and climate change",
          "Natural disasters (earthquakes, floods, cyclones)",
          "Environmental pollution and conservation"
        ]
      },
      {
        section: "Part I: General Science - Biological Sciences",
        marks: 20,
        subsections: [
          "Basic concepts of biology",
          "Cell structure and function",
          "Human body systems",
          "Nutrition, health, and diseases",
          "Genetics and heredity",
          "Biodiversity and ecosystems"
        ]
      },
      {
        section: "Part II: Scientific and Technological Developments",
        marks: 10,
        subsections: [
          "Role of science and technology in modern society",
          "Information and communication technology",
          "Space technology and exploration",
          "Biotechnology and genetic engineering",
          "Renewable and non-renewable energy resources"
        ]
      },
      {
        section: "Part III: Ability - Basic Arithmetic",
        marks: 5,
        subsections: [
          "Whole numbers and fractions",
          "Ratios and proportions",
          "Percentages",
          "Averages",
          "Profit and loss"
        ]
      },
      {
        section: "Part III: Ability - Algebra",
        marks: 3,
        subsections: [
          "Basic algebraic expressions",
          "Linear equations"
        ]
      },
      {
        section: "Part III: Ability - Geometry",
        marks: 3,
        subsections: [
          "Basic geometric concepts",
          "Angles, triangles, and circles"
        ]
      },
      {
        section: "Part III: Ability - Data Analysis",
        marks: 5,
        subsections: [
          "Interpretation of tables and charts",
          "Graphs and diagrams"
        ]
      },
      {
        section: "Part III: Ability - Logical Reasoning",
        marks: 4,
        subsections: [
          "Analytical reasoning problems",
          "Pattern recognition",
          "Logical deductions"
        ]
      }
    ]
  },
  {
    id: "current-affairs-comp",
    name: "Current Affairs",
    marks: 100,
    color: "bg-orange-500",
    icon: "🌍",
    description: "Pakistan and international current events, global institutions, and world affairs.",
    progress: 55,
    topics: ["Pakistan Affairs", "International Relations", "Economy", "Environmental Issues", "Security Issues", "UN & Global Bodies"],
    syllabus: [
      {
        section: "I. Pakistan's Domestic Affairs",
        marks: 20,
        subsections: [
          "Political developments in Pakistan",
          "Constitutional and governance issues",
          "Economic challenges and reforms",
          "Social issues: education, health, population, poverty",
          "Energy crisis and economic stability",
          "Role of institutions and democratic development"
        ]
      },
      {
        section: "II. Pakistan's Foreign Policy",
        marks: 20,
        subsections: [
          "Pakistan's relations with neighboring countries",
          "Pakistan's relations with major powers: USA, China, Russia, EU",
          "Pakistan's role in international organizations: UN, OIC, SCO",
          "Regional cooperation and strategic partnerships"
        ]
      },
      {
        section: "III. International Affairs",
        marks: 15,
        subsections: [
          "Major global political developments",
          "Global security issues and conflicts",
          "International diplomacy and strategic alliances",
          "Emerging global powers and shifting world order"
        ]
      },
      {
        section: "IV. Global Economic Issues",
        marks: 15,
        subsections: [
          "International trade and economic cooperation",
          "Global financial institutions: IMF, World Bank, WTO",
          "Economic globalization and its impacts",
          "Energy security and global economic trends"
        ]
      },
      {
        section: "V. Contemporary Global Challenges",
        marks: 20,
        subsections: [
          "Climate change and environmental challenges",
          "Terrorism and extremism",
          "Migration and refugee crises",
          "Human rights issues",
          "Cybersecurity and technological developments"
        ]
      },
      {
        section: "VI. International Organizations and Global Governance",
        marks: 10,
        subsections: [
          "Role of the United Nations and its agencies",
          "International law and global governance mechanisms",
          "Regional organizations and their impact on world politics"
        ]
      }
    ]
  },
  {
    id: "pakistan-affairs",
    name: "Pakistan Affairs",
    marks: 100,
    color: "bg-emerald-600",
    icon: "🇵🇰",
    description: "History, geography, politics, economy, and society of Pakistan.",
    progress: 30,
    topics: ["Pakistan Movement", "Constitutional Development", "Foreign Policy", "Economic Issues", "Governance Challenges", "Social Issues"],
    syllabus: [
      {
        section: "I. Historical Background",
        marks: 10,
        subsections: [
          "Muslim rule in the Subcontinent",
          "Decline of Muslim power in India",
          "Causes of the decline of the Mughal Empire",
          "Muslim revivalist movements in the Subcontinent"
        ]
      },
      {
        section: "II. Muslim Reform Movements",
        marks: 10,
        subsections: [
          "Sheikh Ahmad Sirhindi and his teachings",
          "Shah Waliullah and Islamic revival",
          "Syed Ahmad Shaheed Barelvi and his movement",
          "Aligarh Movement and the role of Sir Syed Ahmad Khan"
        ]
      },
      {
        section: "III. Pakistan Movement",
        marks: 22,
        subsections: [
          "Ideological basis of Pakistan",
          "Two-Nation Theory",
          "Role of All India Muslim League",
          "Partition of Bengal (1905)",
          "Simla Deputation (1906)",
          "Lucknow Pact (1916)",
          "Khilafat Movement",
          "Allahabad Address (1930)",
          "Lahore Resolution (1940)",
          "Cabinet Mission Plan",
          "Creation of Pakistan in 1947"
        ]
      },
      {
        section: "IV. Constitutional and Political Development",
        marks: 18,
        subsections: [
          "Early constitutional problems of Pakistan",
          "1956 Constitution: first constitution of Islamic Republic",
          "1962 Constitution: military rule and constitutional development",
          "1973 Constitution: restoration of democracy",
          "Political instability and democratic challenges",
          "Civil-military relations"
        ]
      },
      {
        section: "V. Pakistan's Foreign Policy",
        marks: 15,
        subsections: [
          "Relations with India: Kashmir dispute and bilateral relations",
          "Relations with Afghanistan and Iran",
          "Relations with China and strategic partnership",
          "Relations with major global powers: USA, Saudi Arabia, European Powers",
          "Role in international organizations: UN, OIC, SCO",
          "Regional cooperation initiatives"
        ]
      },
      {
        section: "VI. Economic Development",
        marks: 12,
        subsections: [
          "Agricultural development and green revolution",
          "Industrial development and manufacturing sector",
          "Economic planning and five-year plans",
          "Major economic challenges and reforms",
          "Trade and commerce development"
        ]
      },
      {
        section: "VII. Social and Cultural Issues",
        marks: 8,
        subsections: [
          "Education and literacy development",
          "Population growth and demographics",
          "Social justice and equality",
          "Media and cultural development",
          "Religious and ethnic harmony"
        ]
      },
      {
        section: "VIII. Contemporary Challenges of Pakistan",
        marks: 5,
        subsections: [
          "Governance and political stability issues",
          "Energy crisis and power generation",
          "Terrorism and extremism",
          "Water scarcity and irrigation challenges",
          "Climate change and environmental threats"
        ]
      }
    ]
  },
  {
    id: "islamic-studies",
    name: "Islamic Studies / Comparative Religion",
    marks: 100,
    color: "bg-teal-500",
    icon: "☪️",
    description: "Islamic teachings, history, jurisprudence, and comparative religion.",
    progress: 88,
    topics: ["Quran & Hadith", "Islamic Jurisprudence", "Islamic History", "Comparative Religion", "Ethics & Morality", "Islam & Modernity"],
    syllabus: [
      {
        section: "I. Introduction to Islam",
        marks: 15,
        subsections: [
          "Concept of Islam and its meaning",
          "Importance of Deen in human life",
          "Difference between Deen and religion",
          "Distinctive aspects of Islam",
          "Islamic beliefs and their impact on individual and society",
          "Fundamental teachings of Islam",
          "Islamic worship and its spiritual, moral, and social impact"
        ]
      },
      {
        section: "II. Study of the Seerah of Prophet Muhammad (PBUH) as a Role Model",
        marks: 15,
        subsections: [
          "Prophet Muhammad as an individual: personal qualities and character",
          "Prophet Muhammad as a diplomat: diplomatic missions and treaties",
          "Prophet Muhammad as an educator: teaching methods and principles",
          "Prophet Muhammad as a military strategist: battles and campaigns",
          "Prophet Muhammad as a peace maker: reconciliation and conflict resolution"
        ]
      },
      {
        section: "III. Human Rights and Status of Women in Islam",
        marks: 15,
        subsections: [
          "Human rights in Islam: Quranic perspective",
          "Dignity and equality of men and women",
          "Rights of women in Islamic society",
          "Responsibilities of women in Islamic context",
          "Women's role in Islamic history and civilization"
        ]
      },
      {
        section: "IV. Islamic Civilization and Culture",
        marks: 15,
        subsections: [
          "Meaning and essential elements of Islamic civilization",
          "Role of civilization in development of human personality",
          "Tawhid: concept of monotheism",
          "Self-purification and spiritual development",
          "Dignity of humanity in Islam",
          "Equality: social and economic foundation",
          "Social justice and compassion",
          "Tolerance and coexistence",
          "Rule of law in Islamic society"
        ]
      },
      {
        section: "V. Islam and the World",
        marks: 12,
        subsections: [
          "Impact of Islamic civilization on the West",
          "Influence of Western thought on Islamic societies",
          "Role of Islam in the modern world",
          "Contemporary challenges faced by the Muslim world",
          "Causes and rise of extremism",
          "Islam and secularism"
        ]
      },
      {
        section: "VI. Public Administration and Governance in Islam",
        marks: 18,
        subsections: [
          "Concept of public administration in Islam",
          "Quranic guidance on good governance",
          "Concept of governance in light of Qur'an, Sunnah, and Fiqh",
          "Governance structure in Islam: Shura (consultation)",
          "Legislation in Islamic framework",
          "Sources of Islamic law",
          "Governance under the Pious Caliphate",
          "Letters of Hazrat Umar (RA) to administrators",
          "Letters of Hazrat Ali (RA) to administrators",
          "Responsibilities of civil servants in Islam",
          "Accountability system (Hisbah) in Islam"
        ]
      },
      {
        section: "VII. Islamic Code of Life",
        marks: 10,
        subsections: [
          "Islamic social system: family, community, society",
          "Islamic political system: governance and authority",
          "Islamic economic system: justice and distribution",
          "Islamic judicial system: Sharia and justice",
          "Islamic administrative system: accountability",
          "Concept and procedure of Ijma (consensus)",
          "Concept and procedure of Ijtihad (independent reasoning)"
        ]
      }
    ]
  },
];

export const optionalGroups = [
  {
    group: 1,
    subjects: [
      {
        id: "economics",
        name: "Economics",
        marks: 200,
        icon: "📊",
        color: "bg-purple-500",
        progress: 40,
        syllabus: [
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 1. Introduction to Economics",
            marks: 16,
            subsections: [
              "Definition and scope of economics",
              "Economic systems: capitalism, socialism, mixed economy",
              "Basic economic problems: what to produce, how to produce, for whom to produce",
              "Opportunity cost and scarcity"
            ]
          },
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 2. Demand and Supply",
            marks: 17,
            subsections: [
              "Law of demand and exceptions",
              "Determinants of demand",
              "Elasticity of demand: price, income, cross elasticity",
              "Law of supply and determinants",
              "Market equilibrium and disequilibrium"
            ]
          },
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 3. Consumer Behavior",
            marks: 15,
            subsections: [
              "Utility analysis: total and marginal utility",
              "Marginal utility theory and law of diminishing marginal utility",
              "Indifference curve analysis",
              "Consumer equilibrium and budget constraints"
            ]
          },
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 4. Production and Cost",
            marks: 17,
            subsections: [
              "Factors of production: land, labor, capital, entrepreneurship",
              "Production function and isoquants",
              "Laws of production: law of variable proportions",
              "Short-run costs: fixed, variable, total, average, marginal costs",
              "Long-run costs and returns to scale"
            ]
          },
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 5. Market Structures",
            marks: 19,
            subsections: [
              "Perfect competition: characteristics and equilibrium",
              "Monopoly: characteristics, price determination, welfare effects",
              "Monopolistic competition",
              "Oligopoly: kinked demand curve, collusion"
            ]
          },
          {
            section: "PAPER I – MICROECONOMICS (100 Marks) – 6. Factor Pricing",
            marks: 16,
            subsections: [
              "Wages: determination and theories",
              "Rent: Ricardian rent, economic rent",
              "Interest: theories of interest rate",
              "Profit: nature and theories"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 1. National Income",
            marks: 14,
            subsections: [
              "Concepts of national income: GDP, GNP, NNP, National Income",
              "Methods of measuring national income: income, expenditure, output methods",
              "National income accounting and circular flow",
              "Per capita income and income distribution"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 2. Money and Banking",
            marks: 16,
            subsections: [
              "Functions of money: medium of exchange, store of value, unit of account",
              "Commercial banking system and credit creation",
              "Central banking functions and operations",
              "Monetary policy: tools and objectives"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 3. Inflation and Unemployment",
            marks: 15,
            subsections: [
              "Causes and effects of inflation",
              "Types of unemployment: frictional, structural, cyclical",
              "Phillips curve and inflation-unemployment trade-off",
              "Policies to control inflation and unemployment",
              "Stagflation"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 4. Fiscal Policy",
            marks: 15,
            subsections: [
              "Government revenue and expenditure",
              "Taxation systems: progressive, proportional, regressive taxes",
              "Budget and public finance",
              "Deficit financing and public debt"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 5. International Trade",
            marks: 15,
            subsections: [
              "Theory of international trade: comparative advantage, specialization",
              "Balance of payments: current account, capital account",
              "Exchange rates: fixed, floating, managed float",
              "Trade policies: tariffs, quotas, protectionism vs. free trade"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 6. Economic Development",
            marks: 12,
            subsections: [
              "Concepts of economic growth and development",
              "Development strategies: capital accumulation, human capital, technology",
              "Role of institutions, governance, and rule of law in development"
            ]
          },
          {
            section: "PAPER II – MACROECONOMICS (100 Marks) – 7. Economy of Pakistan",
            marks: 13,
            subsections: [
              "Structure of Pakistan's economy: sectoral composition",
              "Agricultural sector: production, issues, reforms",
              "Industrial sector: SMEs, manufacturing, challenges",
              "Economic challenges: inflation, debt, current account deficit",
              "Policy reforms: privatization, deregulation, economic liberalization"
            ]
          }
        ]
      },
      {
        id: "political-science",
        name: "Political Science",
        marks: 200,
        icon: "🏛️",
        color: "bg-blue-600",
        progress: 25,
        syllabus: [
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 1. Introduction to Political Science",
            marks: 14,
            subsections: [
              "Definition and scope of political science",
              "Relationship of political science with other social sciences",
              "Nature and importance of political theory"
            ]
          },
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 2. State",
            marks: 16,
            subsections: [
              "Definition and elements of the state",
              "Theories of the origin of the state",
              "Functions of the state",
              "Sovereignty and its evolution"
            ]
          },
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 3. Political Ideologies",
            marks: 18,
            subsections: [
              "Liberalism",
              "Socialism",
              "Marxism",
              "Fascism",
              "Nationalism"
            ]
          },
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 4. Forms of Government",
            marks: 16,
            subsections: [
              "Democracy and dictatorship",
              "Parliamentary system",
              "Presidential system",
              "Federal and unitary systems"
            ]
          },
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 5. Political Institutions",
            marks: 20,
            subsections: [
              "Legislature: structure and functions",
              "Executive: powers and responsibilities",
              "Judiciary: independence and role in governance"
            ]
          },
          {
            section: "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 6. Political Parties and Pressure Groups",
            marks: 16,
            subsections: [
              "Role of political parties in democracy",
              "Party systems",
              "Pressure groups and interest groups"
            ]
          },
          {
            section: "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 1. Comparative Political Systems",
            marks: 25,
            subsections: [
              "Political systems of major countries",
              "United Kingdom",
              "United States of America",
              "France",
              "China"
            ]
          },
          {
            section: "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 2. Political Development",
            marks: 15,
            subsections: [
              "Concept of political development",
              "Political modernization",
              "Political culture and socialization"
            ]
          },
          {
            section: "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 3. International Politics",
            marks: 20,
            subsections: [
              "Nature and scope of international politics",
              "National interest and power",
              "Diplomacy and foreign policy"
            ]
          },
          {
            section: "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 4. International Organizations",
            marks: 20,
            subsections: [
              "United Nations and its structure",
              "Regional organizations",
              "Role of international institutions in global governance"
            ]
          },
          {
            section: "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 5. Contemporary Global Issues",
            marks: 20,
            subsections: [
              "Globalization",
              "Security challenges",
              "International conflicts",
              "Economic cooperation"
            ]
          }
        ]
      },
      {
        id: "computer-science",
        name: "Computer Science",
        marks: 200,
        icon: "💻",
        color: "bg-cyan-500",
        progress: 60,
        syllabus: [
          {
            section: "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 1. Programming Fundamentals",
            marks: 20,
            subsections: [
              "Basic concepts of programming",
              "Programming languages and paradigms",
              "Data types and variables",
              "Operators and expressions",
              "Control structures: if, switch, loops",
              "Functions and recursion"
            ]
          },
          {
            section: "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 2. Data Structures",
            marks: 22,
            subsections: [
              "Arrays",
              "Linked lists",
              "Stacks",
              "Queues",
              "Trees",
              "Graphs",
              "Searching and sorting algorithms"
            ]
          },
          {
            section: "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 3. Object-Oriented Programming",
            marks: 18,
            subsections: [
              "Concepts of object-oriented programming",
              "Classes and objects",
              "Encapsulation",
              "Inheritance",
              "Polymorphism"
            ]
          },
          {
            section: "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 4. Computer Organization and Architecture",
            marks: 20,
            subsections: [
              "Basic components of a computer system",
              "CPU architecture",
              "Memory hierarchy",
              "Input and output devices",
              "Instruction sets and machine language"
            ]
          },
          {
            section: "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 5. Software Engineering",
            marks: 20,
            subsections: [
              "Software development life cycle (SDLC)",
              "Software design principles",
              "Software testing and maintenance",
              "Software project management"
            ]
          },
          {
            section: "PAPER II – ADVANCED TOPICS (100 Marks) – 1. Operating Systems",
            marks: 20,
            subsections: [
              "Role and functions of operating systems",
              "Process management",
              "Memory management",
              "File systems",
              "Deadlocks"
            ]
          },
          {
            section: "PAPER II – ADVANCED TOPICS (100 Marks) – 2. Database Systems",
            marks: 20,
            subsections: [
              "Database concepts",
              "Relational data model",
              "SQL",
              "Database design and normalization",
              "Transaction management"
            ]
          },
          {
            section: "PAPER II – ADVANCED TOPICS (100 Marks) – 3. Computer Networks",
            marks: 20,
            subsections: [
              "Network models: OSI and TCP/IP",
              "Network protocols",
              "LAN, WAN, and wireless networks",
              "Network security"
            ]
          },
          {
            section: "PAPER II – ADVANCED TOPICS (100 Marks) – 4. Digital Image Processing",
            marks: 20,
            subsections: [
              "Image acquisition and representation",
              "Image enhancement and restoration",
              "Image segmentation",
              "Image compression"
            ]
          },
          {
            section: "PAPER II – ADVANCED TOPICS (100 Marks) – 5. Web Engineering and Technologies",
            marks: 20,
            subsections: [
              "Web application development",
              "HTML, CSS, and JavaScript",
              "Client-side and server-side programming",
              "Web architectures and frameworks",
              "Web application security"
            ]
          }
        ]
      },
      {
        id: "international-relations",
        name: "International Relations",
        marks: 200,
        icon: "🌐",
        color: "bg-sky-500",
        progress: 55,
        syllabus: [
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 1. Introduction to International Relations",
            marks: 16,
            subsections: [
              "Definition, nature, and scope of international relations",
              "Evolution of international relations as an academic discipline",
              "Key concepts in international relations"
            ]
          },
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 2. Theories of International Relations",
            marks: 22,
            subsections: [
              "Realism",
              "Neo-realism",
              "Liberalism",
              "Neo-liberalism",
              "Constructivism",
              "Marxism and dependency theory"
            ]
          },
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 3. National Power",
            marks: 16,
            subsections: [
              "Elements of national power",
              "Balance of power",
              "Collective security",
              "Deterrence and strategic stability"
            ]
          },
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 4. Foreign Policy",
            marks: 16,
            subsections: [
              "Determinants of foreign policy",
              "Decision-making process in foreign policy",
              "Diplomacy and diplomatic practices"
            ]
          },
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 5. International Law",
            marks: 14,
            subsections: [
              "Nature and sources of international law",
              "Relationship between international law and state sovereignty"
            ]
          },
          {
            section: "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 6. International Organizations",
            marks: 16,
            subsections: [
              "United Nations and its structure",
              "Role of international organizations in maintaining peace and security"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 1. Major Developments in International Politics",
            marks: 18,
            subsections: [
              "World Wars and their impact on international politics",
              "Cold War and post-Cold War world order",
              "Emergence of new global powers"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 2. International Security",
            marks: 17,
            subsections: [
              "Arms race and arms control",
              "Nuclear proliferation",
              "Terrorism and counterterrorism"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 3. International Political Economy",
            marks: 17,
            subsections: [
              "Global economic institutions",
              "International trade and economic cooperation",
              "Globalization and economic interdependence"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 4. Regional Organizations",
            marks: 16,
            subsections: [
              "European Union (EU)",
              "ASEAN",
              "SAARC",
              "African Union"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 5. Pakistan's Foreign Policy",
            marks: 16,
            subsections: [
              "Principles and objectives of Pakistan's foreign policy",
              "Pakistan's relations with neighboring countries",
              "Pakistan's relations with major global powers"
            ]
          },
          {
            section: "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 6. Contemporary Global Issues",
            marks: 16,
            subsections: [
              "Climate change",
              "Migration and refugees",
              "Human rights and humanitarian intervention"
            ]
          }
        ]
      },
      {
        id: "accountancy-auditing",
        name: "Accountancy & Auditing",
        marks: 200,
        icon: "📊",
        color: "bg-indigo-500",
        progress: 0,
        syllabus: [
          {
            section: "PAPER I – ACCOUNTING (100 Marks) – 1. Financial Accounting",
            marks: 20,
            subsections: [
              "Accounting principles and concepts",
              "Accounting cycle and preparation of financial statements",
              "Preparation and analysis of balance sheets and income statements",
              "Depreciation methods and accounting for fixed assets"
            ]
          },
          {
            section: "PAPER I – ACCOUNTING (100 Marks) – 2. Partnership Accounting",
            marks: 20,
            subsections: [
              "Formation of partnership",
              "Admission, retirement, and dissolution of partners",
              "Profit and loss sharing arrangements",
              "Capital and current accounts"
            ]
          },
          {
            section: "PAPER I – ACCOUNTING (100 Marks) – 3. Company Accounting",
            marks: 20,
            subsections: [
              "Formation of companies",
              "Share capital and debentures",
              "Issue, forfeiture, and reissue of shares",
              "Final accounts of companies"
            ]
          },
          {
            section: "PAPER I – ACCOUNTING (100 Marks) – 4. Cost Accounting",
            marks: 20,
            subsections: [
              "Concepts and objectives of cost accounting",
              "Classification of costs",
              "Costing methods",
              "Job costing and process costing"
            ]
          },
          {
            section: "PAPER I – ACCOUNTING (100 Marks) – 5. Managerial Accounting",
            marks: 20,
            subsections: [
              "Role of accounting in managerial decision-making",
              "Budgeting and budgetary control",
              "Financial analysis and performance evaluation"
            ]
          },
          {
            section: "PAPER II – AUDITING (100 Marks) – 1. Introduction to Auditing",
            marks: 20,
            subsections: [
              "Meaning and objectives of auditing",
              "Types of audit",
              "Internal and external auditing"
            ]
          },
          {
            section: "PAPER II – AUDITING (100 Marks) – 2. Audit Procedures",
            marks: 25,
            subsections: [
              "Audit planning and documentation",
              "Audit evidence and techniques",
              "Internal control systems"
            ]
          },
          {
            section: "PAPER II – AUDITING (100 Marks) – 3. Audit of Companies",
            marks: 20,
            subsections: [
              "Audit of share capital",
              "Audit of liabilities and assets",
              "Verification and valuation"
            ]
          },
          {
            section: "PAPER II – AUDITING (100 Marks) – 4. Professional Ethics",
            marks: 20,
            subsections: [
              "Responsibilities of auditors",
              "Professional conduct and ethical standards"
            ]
          },
          {
            section: "PAPER II – AUDITING (100 Marks) – 5. Corporate Laws Related to Auditing",
            marks: 15,
            subsections: [
              "Companies Ordinance",
              "Legal framework governing auditing practices"
            ]
          }
        ]
      },
    ],
  },
  {
    group: 2,
    subjects: [
      {
        id: "physics",
        name: "Physics",
        marks: 200,
        icon: "⚛️",
        color: "bg-red-500",
        progress: 15,
        syllabus: [
          {
            section: "PAPER I – CLASSICAL PHYSICS (100 Marks) – 1. Mechanics",
            marks: 30,
            subsections: [
              "Vectors and vector algebra",
              "Kinematics and motion in one and two dimensions",
              "Newton's laws of motion",
              "Work, energy, and power",
              "Conservation laws: energy and momentum",
              "Rotational motion and torque"
            ]
          },
          {
            section: "PAPER I – CLASSICAL PHYSICS (100 Marks) – 2. Oscillations and Waves",
            marks: 20,
            subsections: [
              "Simple harmonic motion",
              "Damped and forced oscillations",
              "Wave motion and properties of waves",
              "Sound waves and acoustics"
            ]
          },
          {
            section: "PAPER I – CLASSICAL PHYSICS (100 Marks) – 3. Thermodynamics",
            marks: 25,
            subsections: [
              "Temperature and heat",
              "Laws of thermodynamics",
              "Heat engines and refrigerators",
              "Kinetic theory of gases"
            ]
          },
          {
            section: "PAPER I – CLASSICAL PHYSICS (100 Marks) – 4. Optics",
            marks: 25,
            subsections: [
              "Reflection and refraction of light",
              "Interference and diffraction",
              "Polarization of light",
              "Optical instruments"
            ]
          },
          {
            section: "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 1. Electricity and Magnetism",
            marks: 30,
            subsections: [
              "Electric fields and potential",
              "Capacitance and dielectrics",
              "Electric current and circuits",
              "Magnetic fields and electromagnetic induction",
              "Maxwell's equations"
            ]
          },
          {
            section: "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 2. Electromagnetic Waves",
            marks: 15,
            subsections: [
              "Properties of electromagnetic waves",
              "Wave propagation",
              "Applications of electromagnetic radiation"
            ]
          },
          {
            section: "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 3. Modern Physics",
            marks: 25,
            subsections: [
              "Photoelectric effect",
              "Wave-particle duality",
              "Atomic models",
              "Nuclear physics and radioactivity"
            ]
          },
          {
            section: "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 4. Solid State Physics",
            marks: 15,
            subsections: [
              "Crystal structure",
              "Semiconductor physics",
              "Conductors and insulators"
            ]
          },
          {
            section: "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 5. Electronics",
            marks: 15,
            subsections: [
              "Diodes and transistors",
              "Amplifiers",
              "Basic electronic circuits"
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        marks: 200,
        icon: "🧪",
        color: "bg-yellow-500",
        progress: 0,
        syllabus: [
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 1. Atomic Structure",
            marks: 15,
            subsections: [
              "Structure of atoms",
              "Quantum numbers and electronic configuration",
              "Periodic table and periodic trends"
            ]
          },
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 2. Chemical Bonding",
            marks: 15,
            subsections: [
              "Ionic bonding",
              "Covalent bonding",
              "Metallic bonding",
              "Molecular orbital theory"
            ]
          },
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 3. States of Matter",
            marks: 15,
            subsections: [
              "Gases and gas laws",
              "Liquids and intermolecular forces",
              "Solids and crystal structures"
            ]
          },
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 4. Thermodynamics",
            marks: 20,
            subsections: [
              "Laws of thermodynamics",
              "Enthalpy, entropy, and free energy",
              "Thermochemical calculations"
            ]
          },
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 5. Chemical Kinetics",
            marks: 20,
            subsections: [
              "Rate of chemical reactions",
              "Factors affecting reaction rates",
              "Reaction mechanisms"
            ]
          },
          {
            section: "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 6. Electrochemistry",
            marks: 15,
            subsections: [
              "Redox reactions",
              "Electrochemical cells",
              "Electrolysis"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 1. Organic Chemistry Fundamentals",
            marks: 16,
            subsections: [
              "Structure and bonding in organic compounds",
              "Functional groups and nomenclature",
              "Isomerism"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 2. Reaction Mechanisms",
            marks: 16,
            subsections: [
              "Substitution reactions",
              "Addition reactions",
              "Elimination reactions"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 3. Hydrocarbons",
            marks: 17,
            subsections: [
              "Alkanes",
              "Alkenes",
              "Alkynes",
              "Aromatic hydrocarbons"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 4. Organic Compounds",
            marks: 17,
            subsections: [
              "Alcohols, phenols, and ethers",
              "Aldehydes and ketones",
              "Carboxylic acids and derivatives"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 5. Biomolecules",
            marks: 17,
            subsections: [
              "Carbohydrates",
              "Proteins",
              "Lipids",
              "Nucleic acids"
            ]
          },
          {
            section: "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 6. Analytical Chemistry",
            marks: 17,
            subsections: [
              "Qualitative analysis",
              "Quantitative analysis",
              "Chromatography",
              "Spectroscopy"
            ]
          }
        ]
      },
      {
        id: "mathematics",
        name: "Applied Mathematics",
        marks: 100,
        icon: "∑",
        color: "bg-rose-500",
        progress: 0,
        syllabus: [
          {
            section: "1. Vectors and Vector Analysis",
            marks: 18,
            subsections: [
              "Scalars and vectors",
              "Vector addition and scalar multiplication",
              "Dot product and cross product",
              "Gradient, divergence, and curl",
              "Vector identities"
            ]
          },
          {
            section: "2. Matrices and Determinants",
            marks: 16,
            subsections: [
              "Matrix algebra",
              "Determinants and their properties",
              "Inverse of a matrix",
              "Solution of linear equations using matrices"
            ]
          },
          {
            section: "3. Differential Equations",
            marks: 20,
            subsections: [
              "First-order differential equations",
              "Linear differential equations",
              "Homogeneous and non-homogeneous equations",
              "Partial differential equations"
            ]
          },
          {
            section: "4. Analytical Geometry",
            marks: 14,
            subsections: [
              "Straight line and conic sections",
              "Coordinate geometry in two and three dimensions",
              "Transformation of coordinates"
            ]
          },
          {
            section: "5. Mechanics",
            marks: 17,
            subsections: [
              "Motion of particles",
              "Laws of motion",
              "Work and energy",
              "Projectile motion"
            ]
          },
          {
            section: "6. Mathematical Methods in Physics",
            marks: 15,
            subsections: [
              "Fourier series",
              "Laplace transforms",
              "Applications in physical systems"
            ]
          }
        ]
      },
      {
        id: "pure-mathematics",
        name: "Pure Mathematics",
        marks: 100,
        icon: "π",
        color: "bg-fuchsia-600",
        progress: 0,
        syllabus: [
          {
            section: "Section A – Modern Algebra",
            marks: 40,
            subsections: [
              "Groups and subgroups",
              "Lagrange's theorem",
              "Cyclic groups",
              "Normal subgroups and quotient groups",
              "Homomorphisms and isomorphisms",
              "Rings and subrings",
              "Integral domains and quotient fields",
              "Field extensions and finite fields",
              "Vector spaces",
              "Linear independence",
              "Bases and dimension of vector spaces",
              "Linear transformations and matrices",
              "Systems of linear equations",
              "Determinants and their properties"
            ]
          },
          {
            section: "Section B – Calculus and Analytical Geometry",
            marks: 40,
            subsections: [
              "Calculus: real numbers and limits",
              "Continuity and differentiability",
              "Indefinite and definite integration",
              "Mean value theorems",
              "Taylor's theorem",
              "Functions of several variables",
              "Partial derivatives",
              "Maxima and minima",
              "Double and triple integrals",
              "Applications of Beta and Gamma functions",
              "Areas and volumes",
              "Analytical Geometry: conic sections in Cartesian coordinates",
              "Polar coordinates and their applications",
              "Straight line and conic sections",
              "Three-dimensional geometry",
              "Planes, spheres, ellipsoids, paraboloids, and hyperboloids"
            ]
          },
          {
            section: "Section C – Complex Variables",
            marks: 20,
            subsections: [
              "Functions of a complex variable",
              "De Moivre's theorem and applications",
              "Analytic functions",
              "Cauchy's theorem and integral formula",
              "Taylor and Laurent series",
              "Singularities and residues",
              "Contour integration"
            ]
          }
        ]
      },
      {
        id: "statistics",
        name: "Statistics",
        marks: 100,
        icon: "📈",
        color: "bg-emerald-500",
        progress: 0,
        syllabus: [
          {
            section: "1. Introduction to Statistics",
            marks: 8,
            subsections: [
              "Definition and scope of statistics",
              "Importance and applications of statistics",
              "Types of data and measurement scales"
            ]
          },
          {
            section: "2. Data Collection and Presentation",
            marks: 10,
            subsections: [
              "Methods of data collection",
              "Primary and secondary data",
              "Classification and tabulation of data",
              "Graphical presentation: bar charts, histograms, pie charts, frequency polygons"
            ]
          },
          {
            section: "3. Measures of Central Tendency",
            marks: 12,
            subsections: [
              "Arithmetic mean",
              "Median",
              "Mode",
              "Weighted mean",
              "Geometric and harmonic mean"
            ]
          },
          {
            section: "4. Measures of Dispersion",
            marks: 12,
            subsections: [
              "Range",
              "Mean deviation",
              "Variance",
              "Standard deviation",
              "Coefficient of variation"
            ]
          },
          {
            section: "5. Probability",
            marks: 12,
            subsections: [
              "Basic concepts of probability",
              "Laws of probability",
              "Conditional probability",
              "Random variables"
            ]
          },
          {
            section: "6. Probability Distributions",
            marks: 10,
            subsections: [
              "Binomial distribution",
              "Poisson distribution",
              "Normal distribution"
            ]
          },
          {
            section: "7. Sampling and Sampling Distributions",
            marks: 10,
            subsections: [
              "Methods of sampling",
              "Sampling errors",
              "Sampling distributions"
            ]
          },
          {
            section: "8. Statistical Inference",
            marks: 12,
            subsections: [
              "Estimation",
              "Hypothesis testing",
              "Confidence intervals"
            ]
          },
          {
            section: "9. Correlation and Regression",
            marks: 14,
            subsections: [
              "Correlation analysis",
              "Regression analysis",
              "Linear regression"
            ]
          }
        ]
      },
    ],
  },
  {
    group: 3,
    subjects: [
      { id: "public-administration", name: "Public Administration", marks: 200, icon: "🏢", color: "bg-orange-500", progress: 70 },
      { id: "governance", name: "Governance & Public Policy", marks: 200, icon: "⚖️", color: "bg-amber-500", progress: 45 },
      {
        id: "business-administration",
        name: "Business Administration",
        marks: 100,
        icon: "💼",
        color: "bg-blue-500",
        progress: 0,
        syllabus: [
          {
            section: "1. Introduction to Business Administration",
            marks: 12,
            subsections: [
              "Definition and scope of business administration",
              "Nature and importance of business",
              "Role of business in economic development",
              "Forms of business organizations"
            ]
          },
          {
            section: "2. Management",
            marks: 16,
            subsections: [
              "Definition and functions of management",
              "Planning, organizing, leading, and controlling",
              "Decision-making process in management",
              "Strategic management"
            ]
          },
          {
            section: "3. Organizational Behavior",
            marks: 16,
            subsections: [
              "Individual behavior in organizations",
              "Motivation theories",
              "Leadership styles",
              "Communication in organizations",
              "Group dynamics and teamwork"
            ]
          },
          {
            section: "4. Human Resource Management",
            marks: 14,
            subsections: [
              "Recruitment and selection",
              "Training and development",
              "Performance appraisal",
              "Compensation and benefits"
            ]
          },
          {
            section: "5. Marketing Management",
            marks: 14,
            subsections: [
              "Concepts of marketing",
              "Marketing mix: product, price, place, promotion",
              "Consumer behavior",
              "Market segmentation and targeting"
            ]
          },
          {
            section: "6. Financial Management",
            marks: 14,
            subsections: [
              "Nature and scope of financial management",
              "Sources of business finance",
              "Financial markets and institutions",
              "Capital budgeting and financial decision-making"
            ]
          },
          {
            section: "7. Business Environment",
            marks: 14,
            subsections: [
              "Economic environment",
              "Legal environment",
              "Technological environment",
              "Global business environment"
            ]
          }
        ]
      },
    ],
  },
  {
    group: 4,
    subjects: [
      { id: "british-history", name: "British History", marks: 200, icon: "🏰", color: "bg-stone-500", progress: 0 },
      { id: "european-history", name: "European History", marks: 200, icon: "🏯", color: "bg-slate-500", progress: 0 },
      { id: "history-usa", name: "History of USA", marks: 200, icon: "🗽", color: "bg-blue-500", progress: 0 },
    ],
  },
  {
    group: 5,
    subjects: [
      { id: "environmental-science", name: "Environmental Science", marks: 200, icon: "🌿", color: "bg-green-600", progress: 30 },
      { id: "gender-studies", name: "Gender Studies", marks: 200, icon: "⚧", color: "bg-pink-500", progress: 20 },
    ],
  },
  {
    group: 6,
    subjects: [
      { id: "law", name: "Law", marks: 200, icon: "⚖️", color: "bg-gray-600", progress: 0 },
      { id: "constitutional-law", name: "Constitutional Law", marks: 200, icon: "📜", color: "bg-zinc-500", progress: 0 },
    ],
  },
  {
    group: 7,
    subjects: [
      { id: "sociology", name: "Sociology", marks: 200, icon: "👥", color: "bg-violet-500", progress: 50 },
      { id: "geography", name: "Geography", marks: 200, icon: "🗺️", color: "bg-lime-600", progress: 35 },
      {
        id: "geology",
        name: "Geology",
        marks: 100,
        icon: "🪨",
        color: "bg-amber-700",
        progress: 0,
        syllabus: [
          {
            section: "1. Introduction to Geology",
            marks: 10,
            subsections: [
              "Definition and scope of geology",
              "Branches of geology",
              "Importance of geology in modern society"
            ]
          },
          {
            section: "2. Earth and its Structure",
            marks: 15,
            subsections: [
              "Structure of the Earth: crust, mantle, core",
              "Plate tectonics and continental drift",
              "Earthquakes and volcanoes"
            ]
          },
          {
            section: "3. Minerals",
            marks: 10,
            subsections: [
              "Definition and classification of minerals",
              "Physical properties of minerals",
              "Identification of common minerals"
            ]
          },
          {
            section: "4. Rocks",
            marks: 15,
            subsections: [
              "Types of rocks: igneous, sedimentary, metamorphic",
              "Rock formation processes",
              "Rock cycle"
            ]
          },
          {
            section: "5. Geological Structures",
            marks: 10,
            subsections: [
              "Folds and faults",
              "Joints and fractures",
              "Structural deformation of rocks"
            ]
          },
          {
            section: "6. Stratigraphy",
            marks: 10,
            subsections: [
              "Principles of stratigraphy",
              "Geological time scale",
              "Fossils and their importance in stratigraphy"
            ]
          },
          {
            section: "7. Economic Geology",
            marks: 15,
            subsections: [
              "Mineral resources",
              "Energy resources",
              "Exploration and mining of minerals"
            ]
          },
          {
            section: "8. Geology of Pakistan",
            marks: 15,
            subsections: [
              "Geological structure of Pakistan",
              "Major mineral resources of Pakistan",
              "Energy resources and geological prospects"
            ]
          }
        ]
      },
      { id: "psychology", name: "Psychology", marks: 200, icon: "🧠", color: "bg-fuchsia-500", progress: 10 },
    ],
  },
];

export const books = [
  {
    id: 1, subject: "Pakistan Affairs", title: "Pakistan Affairs by Ikram Rabbani",
    author: "Ikram Rabbani", edition: "Latest", rating: 4.8,
    description: "Comprehensive coverage of Pakistan's history, politics, and current affairs.",
    tags: ["compulsory", "bestseller"], chapters: 18, color: "bg-emerald-600",
  },
  {
    id: 2, subject: "Current Affairs", title: "Current Affairs by Jahangir's World Times",
    author: "JWT Editorial", edition: "2024", rating: 4.9,
    description: "Monthly magazine covering Pakistan and international current events for CSS.",
    tags: ["compulsory", "magazine"], chapters: 12, color: "bg-orange-500",
  },
  {
    id: 3, subject: "English Essay", title: "CSS Essay by Masood Bhatti",
    author: "Masood Bhatti", edition: "2023", rating: 4.6,
    description: "Model essays and outlines for CSS and PMS essay paper.",
    tags: ["compulsory", "practice"], chapters: 25, color: "bg-blue-500",
  },
  {
    id: 4, subject: "International Relations", title: "Introduction to IR by Joshua Goldstein",
    author: "Joshua Goldstein", edition: "10th", rating: 4.7,
    description: "Foundational text for international relations theory and practice.",
    tags: ["optional", "international"], chapters: 22, color: "bg-sky-500",
  },
  {
    id: 5, subject: "Political Science", title: "Political Theory by O.P. Gauba",
    author: "O.P. Gauba", edition: "Latest", rating: 4.5,
    description: "Covers political ideologies, theories, and modern political systems.",
    tags: ["optional"], chapters: 20, color: "bg-blue-600",
  },
  {
    id: 6, subject: "Islamic Studies", title: "Introduction to Islam by Dr. Hamidullah",
    author: "Dr. Muhammad Hamidullah", edition: "Classic", rating: 4.9,
    description: "A scholarly introduction to Islamic civilization, history, and thought.",
    tags: ["compulsory", "classic"], chapters: 16, color: "bg-teal-500",
  },
  {
    id: 7, subject: "General Science", title: "Everyday Science by Dogar Brothers",
    author: "Dogar Publishers", edition: "2024", rating: 4.3,
    description: "MCQs and explanations for everyday science and mental ability.",
    tags: ["compulsory", "mcq"], chapters: 14, color: "bg-green-500",
  },
  {
    id: 8, subject: "Economics", title: "Economics by Paul Samuelson",
    author: "Paul Samuelson", edition: "19th", rating: 4.8,
    description: "The gold standard textbook for economic theory and applications.",
    tags: ["optional", "classic"], chapters: 30, color: "bg-purple-500",
  },
];

export const pastPapers = [
  {
    year: 2024, subjects: [
      { name: "English Essay", available: true, solved: true },
      { name: "English Precis", available: true, solved: true },
      { name: "Pakistan Affairs", available: true, solved: false },
      { name: "Current Affairs", available: true, solved: false },
      { name: "General Science", available: true, solved: true },
      { name: "Islamic Studies", available: true, solved: false },
      { name: "International Relations", available: true, solved: true },
      { name: "Political Science", available: true, solved: false },
    ],
  },
  {
    year: 2023, subjects: [
      { name: "English Essay", available: true, solved: true },
      { name: "English Precis", available: true, solved: true },
      { name: "Pakistan Affairs", available: true, solved: true },
      { name: "Current Affairs", available: true, solved: true },
      { name: "General Science", available: true, solved: true },
      { name: "Islamic Studies", available: true, solved: true },
      { name: "International Relations", available: true, solved: true },
      { name: "Political Science", available: true, solved: false },
    ],
  },
  { year: 2022, subjects: [
      { name: "English Essay", available: true, solved: true },
      { name: "Pakistan Affairs", available: true, solved: true },
      { name: "Current Affairs", available: true, solved: false },
      { name: "General Science", available: true, solved: false },
      { name: "Islamic Studies", available: true, solved: false },
    ] },
  { year: 2021, subjects: [
      { name: "English Essay", available: true, solved: false },
      { name: "Pakistan Affairs", available: true, solved: false },
      { name: "Current Affairs", available: true, solved: false },
    ] },
  { year: 2020, subjects: [
      { name: "English Essay", available: true, solved: false },
      { name: "Pakistan Affairs", available: true, solved: false },
    ] },
];

export const mcqBank = [
  {
    id: 1, subject: "Pakistan Affairs", topic: "Pakistan Movement",
    question: "The Lahore Resolution was passed in which year?",
    options: ["1938", "1940", "1942", "1945"], correct: 1,
    explanation: "The Lahore Resolution, also known as the Pakistan Resolution, was passed on March 23, 1940 at the annual session of the All India Muslim League.",
  },
  {
    id: 2, subject: "Pakistan Affairs", topic: "Pakistan Movement",
    question: "Who presided over the Lahore session of the All India Muslim League in 1940?",
    options: ["Liaquat Ali Khan", "Sir Agha Khan", "Quaid-i-Azam Muhammad Ali Jinnah", "Huseyn Shaheed Suhrawardy"],
    correct: 2,
    explanation: "Quaid-i-Azam Muhammad Ali Jinnah presided over the historic Lahore session where the Pakistan Resolution was passed.",
  },
  {
    id: 3, subject: "General Science", topic: "Physics",
    question: "The speed of light in vacuum is approximately:",
    options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10¹² m/s"],
    correct: 1,
    explanation: "The speed of light in vacuum (c) is approximately 3 × 10⁸ meters per second (299,792,458 m/s).",
  },
  {
    id: 4, subject: "International Relations", topic: "IR Theory",
    question: "The concept of 'Balance of Power' is most closely associated with which theory of IR?",
    options: ["Liberalism", "Constructivism", "Realism", "Marxism"],
    correct: 2,
    explanation: "Balance of Power is a central concept in Realism, which emphasizes power, security, and national interest in international politics.",
  },
  {
    id: 5, subject: "Islamic Studies", topic: "Islamic History",
    question: "The first Caliph of Islam after the Prophet Muhammad (PBUH) was:",
    options: ["Hazrat Umar (RA)", "Hazrat Abu Bakr (RA)", "Hazrat Usman (RA)", "Hazrat Ali (RA)"],
    correct: 1,
    explanation: "Hazrat Abu Bakr Siddiq (RA) was the first Caliph of Islam, elected by the Muslim community after the demise of the Holy Prophet (PBUH).",
  },
  {
    id: 6, subject: "Current Affairs", topic: "International",
    question: "The United Nations was founded in which year?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
    explanation: "The United Nations was founded on October 24, 1945, after World War II ended, replacing the League of Nations.",
  },
];

export const essayTopics = [
  { id: 1, topic: "The Role of Women in Pakistan's Development", difficulty: "Medium", subject: "English Essay", year: 2024 },
  { id: 2, topic: "Climate Change: A Threat to Pakistan's Future", difficulty: "Medium", subject: "English Essay", year: 2024 },
  { id: 3, topic: "Democracy vs. Technocracy: What Does Pakistan Need?", difficulty: "Hard", subject: "English Essay", year: 2023 },
  { id: 4, topic: "The Digital Revolution and Its Impact on Education", difficulty: "Easy", subject: "English Essay", year: 2023 },
  { id: 5, topic: "Water Crisis in Pakistan: Causes and Solutions", difficulty: "Medium", subject: "English Essay", year: 2022 },
  { id: 6, topic: "The Curse of Extremism", difficulty: "Hard", subject: "English Essay", year: 2022 },
];

export const currentAffairsData = [
  {
    id: 1, category: "Pakistan", title: "Pakistan's Economic Recovery Program",
    summary: "Pakistan has secured a new IMF bailout package worth $3 billion to stabilize its economy amid fiscal challenges. The program includes structural reforms in taxation and energy sectors.",
    date: "March 2026", cssRelevance: "High", tags: ["Economy", "IMF", "Pakistan"],
  },
  {
    id: 2, category: "International", title: "US-China Strategic Competition Intensifies",
    summary: "Tensions between the United States and China continue to escalate over Taiwan, South China Sea disputes, and trade wars, reshaping global geopolitical alignments.",
    date: "March 2026", cssRelevance: "High", tags: ["US", "China", "Geopolitics"],
  },
  {
    id: 3, category: "Economy", title: "Global Inflation Trends and Central Bank Responses",
    summary: "Major central banks worldwide are navigating the delicate balance between controlling inflation and supporting economic growth through monetary policy adjustments.",
    date: "February 2026", cssRelevance: "Medium", tags: ["Economy", "Inflation", "Monetary Policy"],
  },
  {
    id: 4, category: "Environment", title: "COP30 Climate Commitments",
    summary: "Nations at the latest COP summit pledged enhanced Nationally Determined Contributions (NDCs) to limit global warming to 1.5°C, with developing nations demanding climate finance.",
    date: "February 2026", cssRelevance: "High", tags: ["Climate", "Environment", "International"],
  },
  {
    id: 5, category: "Security", title: "Regional Security Challenges in South Asia",
    summary: "The security landscape in South Asia remains complex with ongoing tensions, counterterrorism operations, and evolving bilateral relationships between neighboring states.",
    date: "March 2026", cssRelevance: "High", tags: ["Security", "South Asia", "Pakistan"],
  },
  {
    id: 6, category: "Pakistan", title: "CPEC Phase II: New Developments",
    summary: "Pakistan and China have launched the second phase of CPEC focusing on industrial cooperation, agricultural development, and digital connectivity.",
    date: "January 2026", cssRelevance: "High", tags: ["CPEC", "China", "Development"],
  },
];

export const communityThreads = [
  {
    id: 1, author: "Ahmad Raza", avatar: "AR", subject: "Essay Writing",
    title: "How to write a compelling CSS essay introduction?",
    replies: 23, views: 456, likes: 18, time: "2 hours ago",
    tags: ["Essay", "Tips"],
  },
  {
    id: 2, author: "Fatima Khan", avatar: "FK", subject: "International Relations",
    title: "Best resources for IR theory (Realism, Liberalism, Constructivism)?",
    replies: 15, views: 312, likes: 24, time: "5 hours ago",
    tags: ["IR", "Theory", "Books"],
  },
  {
    id: 3, author: "Hassan Ali", avatar: "HA", subject: "Pakistan Affairs",
    title: "Constitutional amendments - complete timeline needed",
    replies: 31, views: 678, likes: 35, time: "1 day ago",
    tags: ["Pakistan", "Constitution"],
  },
  {
    id: 4, author: "Sara Malik", avatar: "SM", subject: "Study Strategy",
    title: "How I scored 700+ in CSS 2024 - My complete strategy",
    replies: 89, views: 2341, likes: 156, time: "2 days ago",
    tags: ["Strategy", "Success Story"],
  },
  {
    id: 5, author: "Usman Tariq", avatar: "UT", subject: "Current Affairs",
    title: "CPEC latest developments and CSS relevance",
    replies: 12, views: 234, likes: 9, time: "3 days ago",
    tags: ["Current Affairs", "CPEC"],
  },
];

export const studyPlanData = {
  totalDays: 365,
  daysCompleted: 142,
  subjectsSelected: ["Pakistan Affairs", "International Relations", "English Essay", "Current Affairs"],
  weeklyPlan: [
    { day: "Monday", tasks: ["Pakistan Affairs - Constitutional Development (2h)", "Current Affairs Reading (1h)", "MCQ Practice - 30 mins"] },
    { day: "Tuesday", tasks: ["International Relations - Realism Theory (2h)", "English Essay Practice (1.5h)", "Revision - 30 mins"] },
    { day: "Wednesday", tasks: ["General Science (2h)", "Pakistan Affairs - Foreign Policy (1h)", "Past Paper MCQs (1h)"] },
    { day: "Thursday", tasks: ["Islamic Studies (2h)", "Current Affairs Analysis (1h)", "Answer Writing Practice (1h)"] },
    { day: "Friday", tasks: ["English Precis Practice (2h)", "IR - UN System (1.5h)", "Weekly Revision (30 mins)"] },
    { day: "Saturday", tasks: ["Mock Test - Full Syllabus (3h)", "Review Answers (1.5h)", "Weak Areas Focus (1h)"] },
    { day: "Sunday", tasks: ["Rest / Light Reading", "Week Planning", "Notes Review (1h)"] },
  ],
};

export const examProcess = [
  { step: 1, title: "Eligibility Check", icon: "✅", description: "Age 21-30 years. Bachelor's degree (minimum 2nd division). Pakistani citizenship required. Maximum 3 attempts allowed.", color: "bg-blue-500" },
  { step: 2, title: "Registration", icon: "📋", description: "Apply through FPSC website during the announced period. Submit documents: degrees, CNIC, domicile, photographs.", color: "bg-green-500" },
  { step: 3, title: "Written Exam", icon: "✍️", description: "3-day written examination. Compulsory subjects + 6 optional papers. Total 1200 marks. Held annually usually in February.", color: "bg-purple-500" },
  { step: 4, title: "Result Declaration", icon: "📢", description: "FPSC announces written exam results. Only candidates scoring 33% in each paper and 45% overall qualify.", color: "bg-orange-500" },
  { step: 5, title: "Psychological Assessment", icon: "🧠", description: "Qualified candidates appear for psychological assessment at FPSC. Tests personality, intelligence, and leadership traits.", color: "bg-red-500" },
  { step: 6, title: "Viva Voce", icon: "🎤", description: "Central Selection Board interview worth 300 marks. Tests knowledge, personality, and suitability for civil service.", color: "bg-teal-500" },
  { step: 7, title: "Medical Examination", icon: "🏥", description: "Successful candidates undergo medical examination at designated government hospitals.", color: "bg-yellow-500" },
  { step: 8, title: "Final Merit List", icon: "🏆", description: "Final allocation based on cumulative score. Groups allocated: DMG, Police, Foreign Service, Customs, etc.", color: "bg-emerald-600" },
];
