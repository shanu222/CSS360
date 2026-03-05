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
    "group": 1,
    "name": "Group I",
    "selectionCriteria": "Select one subject - 200 marks",
    "subjects": [
      {
        "id": "accountancy-auditing",
        "name": "Accountancy & Auditing",
        "marks": 200,
        "icon": "📊",
        "color": "bg-indigo-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – ACCOUNTING (100 Marks) – 1. Financial Accounting",
            "marks": 20,
            "subsections": [
              "Accounting principles and concepts",
              "Accounting cycle and preparation of financial statements",
              "Preparation and analysis of balance sheets and income statements",
              "Depreciation methods and accounting for fixed assets"
            ]
          },
          {
            "section": "PAPER I – ACCOUNTING (100 Marks) – 2. Partnership Accounting",
            "marks": 20,
            "subsections": [
              "Formation of partnership",
              "Admission, retirement, and dissolution of partners",
              "Profit and loss sharing arrangements",
              "Capital and current accounts"
            ]
          },
          {
            "section": "PAPER I – ACCOUNTING (100 Marks) – 3. Company Accounting",
            "marks": 20,
            "subsections": [
              "Formation of companies",
              "Share capital and debentures",
              "Issue, forfeiture, and reissue of shares",
              "Final accounts of companies"
            ]
          },
          {
            "section": "PAPER I – ACCOUNTING (100 Marks) – 4. Cost Accounting",
            "marks": 20,
            "subsections": [
              "Concepts and objectives of cost accounting",
              "Classification of costs",
              "Costing methods",
              "Job costing and process costing"
            ]
          },
          {
            "section": "PAPER I – ACCOUNTING (100 Marks) – 5. Managerial Accounting",
            "marks": 20,
            "subsections": [
              "Role of accounting in managerial decision-making",
              "Budgeting and budgetary control",
              "Financial analysis and performance evaluation"
            ]
          },
          {
            "section": "PAPER II – AUDITING (100 Marks) – 1. Introduction to Auditing",
            "marks": 20,
            "subsections": [
              "Meaning and objectives of auditing",
              "Types of audit",
              "Internal and external auditing"
            ]
          },
          {
            "section": "PAPER II – AUDITING (100 Marks) – 2. Audit Procedures",
            "marks": 25,
            "subsections": [
              "Audit planning and documentation",
              "Audit evidence and techniques",
              "Internal control systems"
            ]
          },
          {
            "section": "PAPER II – AUDITING (100 Marks) – 3. Audit of Companies",
            "marks": 20,
            "subsections": [
              "Audit of share capital",
              "Audit of liabilities and assets",
              "Verification and valuation"
            ]
          },
          {
            "section": "PAPER II – AUDITING (100 Marks) – 4. Professional Ethics",
            "marks": 20,
            "subsections": [
              "Responsibilities of auditors",
              "Professional conduct and ethical standards"
            ]
          },
          {
            "section": "PAPER II – AUDITING (100 Marks) – 5. Corporate Laws Related to Auditing",
            "marks": 15,
            "subsections": [
              "Companies Ordinance",
              "Legal framework governing auditing practices"
            ]
          }
        ]
      },
      {
        "id": "economics",
        "name": "Economics",
        "marks": 200,
        "icon": "📊",
        "color": "bg-purple-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 1. Introduction to Economics",
            "marks": 16,
            "subsections": [
              "Definition and scope of economics",
              "Economic systems: capitalism, socialism, mixed economy",
              "Basic economic problems: what to produce, how to produce, for whom to produce",
              "Opportunity cost and scarcity"
            ]
          },
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 2. Demand and Supply",
            "marks": 17,
            "subsections": [
              "Law of demand and exceptions",
              "Determinants of demand",
              "Elasticity of demand: price, income, cross elasticity",
              "Law of supply and determinants",
              "Market equilibrium and disequilibrium"
            ]
          },
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 3. Consumer Behavior",
            "marks": 15,
            "subsections": [
              "Utility analysis: total and marginal utility",
              "Marginal utility theory and law of diminishing marginal utility",
              "Indifference curve analysis",
              "Consumer equilibrium and budget constraints"
            ]
          },
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 4. Production and Cost",
            "marks": 17,
            "subsections": [
              "Factors of production: land, labor, capital, entrepreneurship",
              "Production function and isoquants",
              "Laws of production: law of variable proportions",
              "Short-run costs: fixed, variable, total, average, marginal costs",
              "Long-run costs and returns to scale"
            ]
          },
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 5. Market Structures",
            "marks": 19,
            "subsections": [
              "Perfect competition: characteristics and equilibrium",
              "Monopoly: characteristics, price determination, welfare effects",
              "Monopolistic competition",
              "Oligopoly: kinked demand curve, collusion"
            ]
          },
          {
            "section": "PAPER I – MICROECONOMICS (100 Marks) – 6. Factor Pricing",
            "marks": 16,
            "subsections": [
              "Wages: determination and theories",
              "Rent: Ricardian rent, economic rent",
              "Interest: theories of interest rate",
              "Profit: nature and theories"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 1. National Income",
            "marks": 14,
            "subsections": [
              "Concepts of national income: GDP, GNP, NNP, National Income",
              "Methods of measuring national income: income, expenditure, output methods",
              "National income accounting and circular flow",
              "Per capita income and income distribution"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 2. Money and Banking",
            "marks": 16,
            "subsections": [
              "Functions of money: medium of exchange, store of value, unit of account",
              "Commercial banking system and credit creation",
              "Central banking functions and operations",
              "Monetary policy: tools and objectives"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 3. Inflation and Unemployment",
            "marks": 15,
            "subsections": [
              "Causes and effects of inflation",
              "Types of unemployment: frictional, structural, cyclical",
              "Phillips curve and inflation-unemployment trade-off",
              "Policies to control inflation and unemployment",
              "Stagflation"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 4. Fiscal Policy",
            "marks": 15,
            "subsections": [
              "Government revenue and expenditure",
              "Taxation systems: progressive, proportional, regressive taxes",
              "Budget and public finance",
              "Deficit financing and public debt"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 5. International Trade",
            "marks": 15,
            "subsections": [
              "Theory of international trade: comparative advantage, specialization",
              "Balance of payments: current account, capital account",
              "Exchange rates: fixed, floating, managed float",
              "Trade policies: tariffs, quotas, protectionism vs. free trade"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 6. Economic Development",
            "marks": 12,
            "subsections": [
              "Concepts of economic growth and development",
              "Development strategies: capital accumulation, human capital, technology",
              "Role of institutions, governance, and rule of law in development"
            ]
          },
          {
            "section": "PAPER II – MACROECONOMICS (100 Marks) – 7. Economy of Pakistan",
            "marks": 13,
            "subsections": [
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
        "id": "computer-science",
        "name": "Computer Science",
        "marks": 200,
        "icon": "💻",
        "color": "bg-cyan-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 1. Programming Fundamentals",
            "marks": 20,
            "subsections": [
              "Basic concepts of programming",
              "Programming languages and paradigms",
              "Data types and variables",
              "Operators and expressions",
              "Control structures: if, switch, loops",
              "Functions and recursion"
            ]
          },
          {
            "section": "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 2. Data Structures",
            "marks": 22,
            "subsections": [
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
            "section": "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 3. Object-Oriented Programming",
            "marks": 18,
            "subsections": [
              "Concepts of object-oriented programming",
              "Classes and objects",
              "Encapsulation",
              "Inheritance",
              "Polymorphism"
            ]
          },
          {
            "section": "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 4. Computer Organization and Architecture",
            "marks": 20,
            "subsections": [
              "Basic components of a computer system",
              "CPU architecture",
              "Memory hierarchy",
              "Input and output devices",
              "Instruction sets and machine language"
            ]
          },
          {
            "section": "PAPER I – FUNDAMENTAL CONCEPTS (100 Marks) – 5. Software Engineering",
            "marks": 20,
            "subsections": [
              "Software development life cycle (SDLC)",
              "Software design principles",
              "Software testing and maintenance",
              "Software project management"
            ]
          },
          {
            "section": "PAPER II – ADVANCED TOPICS (100 Marks) – 1. Operating Systems",
            "marks": 20,
            "subsections": [
              "Role and functions of operating systems",
              "Process management",
              "Memory management",
              "File systems",
              "Deadlocks"
            ]
          },
          {
            "section": "PAPER II – ADVANCED TOPICS (100 Marks) – 2. Database Systems",
            "marks": 20,
            "subsections": [
              "Database concepts",
              "Relational data model",
              "SQL",
              "Database design and normalization",
              "Transaction management"
            ]
          },
          {
            "section": "PAPER II – ADVANCED TOPICS (100 Marks) – 3. Computer Networks",
            "marks": 20,
            "subsections": [
              "Network models: OSI and TCP/IP",
              "Network protocols",
              "LAN, WAN, and wireless networks",
              "Network security"
            ]
          },
          {
            "section": "PAPER II – ADVANCED TOPICS (100 Marks) – 4. Digital Image Processing",
            "marks": 20,
            "subsections": [
              "Image acquisition and representation",
              "Image enhancement and restoration",
              "Image segmentation",
              "Image compression"
            ]
          },
          {
            "section": "PAPER II – ADVANCED TOPICS (100 Marks) – 5. Web Engineering and Technologies",
            "marks": 20,
            "subsections": [
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
        "id": "political-science",
        "name": "Political Science",
        "marks": 200,
        "icon": "🏛️",
        "color": "bg-blue-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 1. Introduction to Political Science",
            "marks": 14,
            "subsections": [
              "Definition and scope of political science",
              "Relationship of political science with other social sciences",
              "Nature and importance of political theory"
            ]
          },
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 2. State",
            "marks": 16,
            "subsections": [
              "Definition and elements of the state",
              "Theories of the origin of the state",
              "Functions of the state",
              "Sovereignty and its evolution"
            ]
          },
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 3. Political Ideologies",
            "marks": 18,
            "subsections": [
              "Liberalism",
              "Socialism",
              "Marxism",
              "Fascism",
              "Nationalism"
            ]
          },
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 4. Forms of Government",
            "marks": 16,
            "subsections": [
              "Democracy and dictatorship",
              "Parliamentary system",
              "Presidential system",
              "Federal and unitary systems"
            ]
          },
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 5. Political Institutions",
            "marks": 20,
            "subsections": [
              "Legislature: structure and functions",
              "Executive: powers and responsibilities",
              "Judiciary: independence and role in governance"
            ]
          },
          {
            "section": "PAPER I – POLITICAL THEORY AND POLITICAL SYSTEMS (100 Marks) – 6. Political Parties and Pressure Groups",
            "marks": 16,
            "subsections": [
              "Role of political parties in democracy",
              "Party systems",
              "Pressure groups and interest groups"
            ]
          },
          {
            "section": "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 1. Comparative Political Systems",
            "marks": 25,
            "subsections": [
              "Political systems of major countries",
              "United Kingdom",
              "United States of America",
              "France",
              "China"
            ]
          },
          {
            "section": "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 2. Political Development",
            "marks": 15,
            "subsections": [
              "Concept of political development",
              "Political modernization",
              "Political culture and socialization"
            ]
          },
          {
            "section": "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 3. International Politics",
            "marks": 20,
            "subsections": [
              "Nature and scope of international politics",
              "National interest and power",
              "Diplomacy and foreign policy"
            ]
          },
          {
            "section": "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 4. International Organizations",
            "marks": 20,
            "subsections": [
              "United Nations and its structure",
              "Regional organizations",
              "Role of international institutions in global governance"
            ]
          },
          {
            "section": "PAPER II – COMPARATIVE POLITICS AND INTERNATIONAL POLITICS (100 Marks) – 5. Contemporary Global Issues",
            "marks": 20,
            "subsections": [
              "Globalization",
              "Security challenges",
              "International conflicts",
              "Economic cooperation"
            ]
          }
        ]
      },
      {
        "id": "international-relations",
        "name": "International Relations",
        "marks": 200,
        "icon": "🌐",
        "color": "bg-sky-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 1. Introduction to International Relations",
            "marks": 16,
            "subsections": [
              "Definition, nature, and scope of international relations",
              "Evolution of international relations as an academic discipline",
              "Key concepts in international relations"
            ]
          },
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 2. Theories of International Relations",
            "marks": 22,
            "subsections": [
              "Realism",
              "Neo-realism",
              "Liberalism",
              "Neo-liberalism",
              "Constructivism",
              "Marxism and dependency theory"
            ]
          },
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 3. National Power",
            "marks": 16,
            "subsections": [
              "Elements of national power",
              "Balance of power",
              "Collective security",
              "Deterrence and strategic stability"
            ]
          },
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 4. Foreign Policy",
            "marks": 16,
            "subsections": [
              "Determinants of foreign policy",
              "Decision-making process in foreign policy",
              "Diplomacy and diplomatic practices"
            ]
          },
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 5. International Law",
            "marks": 14,
            "subsections": [
              "Nature and sources of international law",
              "Relationship between international law and state sovereignty"
            ]
          },
          {
            "section": "PAPER I – THEORIES AND CONCEPTS OF INTERNATIONAL RELATIONS (100 Marks) – 6. International Organizations",
            "marks": 16,
            "subsections": [
              "United Nations and its structure",
              "Role of international organizations in maintaining peace and security"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 1. Major Developments in International Politics",
            "marks": 18,
            "subsections": [
              "World Wars and their impact on international politics",
              "Cold War and post-Cold War world order",
              "Emergence of new global powers"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 2. International Security",
            "marks": 17,
            "subsections": [
              "Arms race and arms control",
              "Nuclear proliferation",
              "Terrorism and counterterrorism"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 3. International Political Economy",
            "marks": 17,
            "subsections": [
              "Global economic institutions",
              "International trade and economic cooperation",
              "Globalization and economic interdependence"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 4. Regional Organizations",
            "marks": 16,
            "subsections": [
              "European Union (EU)",
              "ASEAN",
              "SAARC",
              "African Union"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 5. Pakistan's Foreign Policy",
            "marks": 16,
            "subsections": [
              "Principles and objectives of Pakistan's foreign policy",
              "Pakistan's relations with neighboring countries",
              "Pakistan's relations with major global powers"
            ]
          },
          {
            "section": "PAPER II – INTERNATIONAL POLITICS AND GLOBAL ISSUES (100 Marks) – 6. Contemporary Global Issues",
            "marks": 16,
            "subsections": [
              "Climate change",
              "Migration and refugees",
              "Human rights and humanitarian intervention"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 2,
    "name": "Group II",
    "selectionCriteria": "Select subjects up to a total of 200 marks",
    "subjects": [
      {
        "id": "physics",
        "name": "Physics",
        "marks": 200,
        "icon": "⚛️",
        "color": "bg-red-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – CLASSICAL PHYSICS (100 Marks) – 1. Mechanics",
            "marks": 30,
            "subsections": [
              "Vectors and vector algebra",
              "Kinematics and motion in one and two dimensions",
              "Newton's laws of motion",
              "Work, energy, and power",
              "Conservation laws: energy and momentum",
              "Rotational motion and torque"
            ]
          },
          {
            "section": "PAPER I – CLASSICAL PHYSICS (100 Marks) – 2. Oscillations and Waves",
            "marks": 20,
            "subsections": [
              "Simple harmonic motion",
              "Damped and forced oscillations",
              "Wave motion and properties of waves",
              "Sound waves and acoustics"
            ]
          },
          {
            "section": "PAPER I – CLASSICAL PHYSICS (100 Marks) – 3. Thermodynamics",
            "marks": 25,
            "subsections": [
              "Temperature and heat",
              "Laws of thermodynamics",
              "Heat engines and refrigerators",
              "Kinetic theory of gases"
            ]
          },
          {
            "section": "PAPER I – CLASSICAL PHYSICS (100 Marks) – 4. Optics",
            "marks": 25,
            "subsections": [
              "Reflection and refraction of light",
              "Interference and diffraction",
              "Polarization of light",
              "Optical instruments"
            ]
          },
          {
            "section": "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 1. Electricity and Magnetism",
            "marks": 30,
            "subsections": [
              "Electric fields and potential",
              "Capacitance and dielectrics",
              "Electric current and circuits",
              "Magnetic fields and electromagnetic induction",
              "Maxwell's equations"
            ]
          },
          {
            "section": "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 2. Electromagnetic Waves",
            "marks": 15,
            "subsections": [
              "Properties of electromagnetic waves",
              "Wave propagation",
              "Applications of electromagnetic radiation"
            ]
          },
          {
            "section": "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 3. Modern Physics",
            "marks": 25,
            "subsections": [
              "Photoelectric effect",
              "Wave-particle duality",
              "Atomic models",
              "Nuclear physics and radioactivity"
            ]
          },
          {
            "section": "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 4. Solid State Physics",
            "marks": 15,
            "subsections": [
              "Crystal structure",
              "Semiconductor physics",
              "Conductors and insulators"
            ]
          },
          {
            "section": "PAPER II – ELECTRICITY, MAGNETISM, AND MODERN PHYSICS (100 Marks) – 5. Electronics",
            "marks": 15,
            "subsections": [
              "Diodes and transistors",
              "Amplifiers",
              "Basic electronic circuits"
            ]
          }
        ]
      },
      {
        "id": "chemistry",
        "name": "Chemistry",
        "marks": 200,
        "icon": "🧪",
        "color": "bg-yellow-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 1. Atomic Structure",
            "marks": 15,
            "subsections": [
              "Structure of atoms",
              "Quantum numbers and electronic configuration",
              "Periodic table and periodic trends"
            ]
          },
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 2. Chemical Bonding",
            "marks": 15,
            "subsections": [
              "Ionic bonding",
              "Covalent bonding",
              "Metallic bonding",
              "Molecular orbital theory"
            ]
          },
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 3. States of Matter",
            "marks": 15,
            "subsections": [
              "Gases and gas laws",
              "Liquids and intermolecular forces",
              "Solids and crystal structures"
            ]
          },
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 4. Thermodynamics",
            "marks": 20,
            "subsections": [
              "Laws of thermodynamics",
              "Enthalpy, entropy, and free energy",
              "Thermochemical calculations"
            ]
          },
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 5. Chemical Kinetics",
            "marks": 20,
            "subsections": [
              "Rate of chemical reactions",
              "Factors affecting reaction rates",
              "Reaction mechanisms"
            ]
          },
          {
            "section": "PAPER I – PHYSICAL AND INORGANIC CHEMISTRY (100 Marks) – 6. Electrochemistry",
            "marks": 15,
            "subsections": [
              "Redox reactions",
              "Electrochemical cells",
              "Electrolysis"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 1. Organic Chemistry Fundamentals",
            "marks": 16,
            "subsections": [
              "Structure and bonding in organic compounds",
              "Functional groups and nomenclature",
              "Isomerism"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 2. Reaction Mechanisms",
            "marks": 16,
            "subsections": [
              "Substitution reactions",
              "Addition reactions",
              "Elimination reactions"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 3. Hydrocarbons",
            "marks": 17,
            "subsections": [
              "Alkanes",
              "Alkenes",
              "Alkynes",
              "Aromatic hydrocarbons"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 4. Organic Compounds",
            "marks": 17,
            "subsections": [
              "Alcohols, phenols, and ethers",
              "Aldehydes and ketones",
              "Carboxylic acids and derivatives"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 5. Biomolecules",
            "marks": 17,
            "subsections": [
              "Carbohydrates",
              "Proteins",
              "Lipids",
              "Nucleic acids"
            ]
          },
          {
            "section": "PAPER II – ORGANIC AND ANALYTICAL CHEMISTRY (100 Marks) – 6. Analytical Chemistry",
            "marks": 17,
            "subsections": [
              "Qualitative analysis",
              "Quantitative analysis",
              "Chromatography",
              "Spectroscopy"
            ]
          }
        ]
      },
      {
        "id": "mathematics",
        "name": "Applied Mathematics",
        "marks": 100,
        "icon": "∑",
        "color": "bg-rose-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Vectors and Vector Analysis",
            "marks": 18,
            "subsections": [
              "Scalars and vectors",
              "Vector addition and scalar multiplication",
              "Dot product and cross product",
              "Gradient, divergence, and curl",
              "Vector identities"
            ]
          },
          {
            "section": "2. Matrices and Determinants",
            "marks": 16,
            "subsections": [
              "Matrix algebra",
              "Determinants and their properties",
              "Inverse of a matrix",
              "Solution of linear equations using matrices"
            ]
          },
          {
            "section": "3. Differential Equations",
            "marks": 20,
            "subsections": [
              "First-order differential equations",
              "Linear differential equations",
              "Homogeneous and non-homogeneous equations",
              "Partial differential equations"
            ]
          },
          {
            "section": "4. Analytical Geometry",
            "marks": 14,
            "subsections": [
              "Straight line and conic sections",
              "Coordinate geometry in two and three dimensions",
              "Transformation of coordinates"
            ]
          },
          {
            "section": "5. Mechanics",
            "marks": 17,
            "subsections": [
              "Motion of particles",
              "Laws of motion",
              "Work and energy",
              "Projectile motion"
            ]
          },
          {
            "section": "6. Mathematical Methods in Physics",
            "marks": 15,
            "subsections": [
              "Fourier series",
              "Laplace transforms",
              "Applications in physical systems"
            ]
          }
        ]
      },
      {
        "id": "pure-mathematics",
        "name": "Pure Mathematics",
        "marks": 100,
        "icon": "π",
        "color": "bg-fuchsia-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Section A – Modern Algebra",
            "marks": 40,
            "subsections": [
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
            "section": "Section B – Calculus and Analytical Geometry",
            "marks": 40,
            "subsections": [
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
            "section": "Section C – Complex Variables",
            "marks": 20,
            "subsections": [
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
        "id": "statistics",
        "name": "Statistics",
        "marks": 100,
        "icon": "📈",
        "color": "bg-emerald-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Statistics",
            "marks": 8,
            "subsections": [
              "Definition and scope of statistics",
              "Importance and applications of statistics",
              "Types of data and measurement scales"
            ]
          },
          {
            "section": "2. Data Collection and Presentation",
            "marks": 10,
            "subsections": [
              "Methods of data collection",
              "Primary and secondary data",
              "Classification and tabulation of data",
              "Graphical presentation: bar charts, histograms, pie charts, frequency polygons"
            ]
          },
          {
            "section": "3. Measures of Central Tendency",
            "marks": 12,
            "subsections": [
              "Arithmetic mean",
              "Median",
              "Mode",
              "Weighted mean",
              "Geometric and harmonic mean"
            ]
          },
          {
            "section": "4. Measures of Dispersion",
            "marks": 12,
            "subsections": [
              "Range",
              "Mean deviation",
              "Variance",
              "Standard deviation",
              "Coefficient of variation"
            ]
          },
          {
            "section": "5. Probability",
            "marks": 12,
            "subsections": [
              "Basic concepts of probability",
              "Laws of probability",
              "Conditional probability",
              "Random variables"
            ]
          },
          {
            "section": "6. Probability Distributions",
            "marks": 10,
            "subsections": [
              "Binomial distribution",
              "Poisson distribution",
              "Normal distribution"
            ]
          },
          {
            "section": "7. Sampling and Sampling Distributions",
            "marks": 10,
            "subsections": [
              "Methods of sampling",
              "Sampling errors",
              "Sampling distributions"
            ]
          },
          {
            "section": "8. Statistical Inference",
            "marks": 12,
            "subsections": [
              "Estimation",
              "Hypothesis testing",
              "Confidence intervals"
            ]
          },
          {
            "section": "9. Correlation and Regression",
            "marks": 14,
            "subsections": [
              "Correlation analysis",
              "Regression analysis",
              "Linear regression"
            ]
          }
        ]
      },
      {
        "id": "geology",
        "name": "Geology",
        "marks": 100,
        "icon": "🪨",
        "color": "bg-amber-700",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Geology",
            "marks": 10,
            "subsections": [
              "Definition and scope of geology",
              "Branches of geology",
              "Importance of geology in modern society"
            ]
          },
          {
            "section": "2. Earth and its Structure",
            "marks": 15,
            "subsections": [
              "Structure of the Earth: crust, mantle, core",
              "Plate tectonics and continental drift",
              "Earthquakes and volcanoes"
            ]
          },
          {
            "section": "3. Minerals",
            "marks": 10,
            "subsections": [
              "Definition and classification of minerals",
              "Physical properties of minerals",
              "Identification of common minerals"
            ]
          },
          {
            "section": "4. Rocks",
            "marks": 15,
            "subsections": [
              "Types of rocks: igneous, sedimentary, metamorphic",
              "Rock formation processes",
              "Rock cycle"
            ]
          },
          {
            "section": "5. Geological Structures",
            "marks": 10,
            "subsections": [
              "Folds and faults",
              "Joints and fractures",
              "Structural deformation of rocks"
            ]
          },
          {
            "section": "6. Stratigraphy",
            "marks": 10,
            "subsections": [
              "Principles of stratigraphy",
              "Geological time scale",
              "Fossils and their importance in stratigraphy"
            ]
          },
          {
            "section": "7. Economic Geology",
            "marks": 15,
            "subsections": [
              "Mineral resources",
              "Energy resources",
              "Exploration and mining of minerals"
            ]
          },
          {
            "section": "8. Geology of Pakistan",
            "marks": 15,
            "subsections": [
              "Geological structure of Pakistan",
              "Major mineral resources of Pakistan",
              "Energy resources and geological prospects"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 3,
    "name": "Group III",
    "selectionCriteria": "Select one subject - 100 marks",
    "subjects": [
      {
        "id": "business-administration",
        "name": "Business Administration",
        "marks": 100,
        "icon": "💼",
        "color": "bg-blue-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Business Administration",
            "marks": 12,
            "subsections": [
              "Definition and scope of business administration",
              "Nature and importance of business",
              "Role of business in economic development",
              "Forms of business organizations"
            ]
          },
          {
            "section": "2. Management",
            "marks": 16,
            "subsections": [
              "Definition and functions of management",
              "Planning, organizing, leading, and controlling",
              "Decision-making process in management",
              "Strategic management"
            ]
          },
          {
            "section": "3. Organizational Behavior",
            "marks": 16,
            "subsections": [
              "Individual behavior in organizations",
              "Motivation theories",
              "Leadership styles",
              "Communication in organizations",
              "Group dynamics and teamwork"
            ]
          },
          {
            "section": "4. Human Resource Management",
            "marks": 14,
            "subsections": [
              "Recruitment and selection",
              "Training and development",
              "Performance appraisal",
              "Compensation and benefits"
            ]
          },
          {
            "section": "5. Marketing Management",
            "marks": 14,
            "subsections": [
              "Concepts of marketing",
              "Marketing mix: product, price, place, promotion",
              "Consumer behavior",
              "Market segmentation and targeting"
            ]
          },
          {
            "section": "6. Financial Management",
            "marks": 14,
            "subsections": [
              "Nature and scope of financial management",
              "Sources of business finance",
              "Financial markets and institutions",
              "Capital budgeting and financial decision-making"
            ]
          },
          {
            "section": "7. Business Environment",
            "marks": 14,
            "subsections": [
              "Economic environment",
              "Legal environment",
              "Technological environment",
              "Global business environment"
            ]
          }
        ]
      },
      {
        "id": "public-administration",
        "name": "Public Administration",
        "marks": 100,
        "icon": "🏢",
        "color": "bg-orange-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Public Administration",
            "marks": 12,
            "subsections": [
              "Definition and scope of public administration",
              "Evolution and development of public administration",
              "Difference between public and private administration",
              "Importance of public administration in modern governance"
            ]
          },
          {
            "section": "2. Administrative Theories",
            "marks": 12,
            "subsections": [
              "Classical theory of administration",
              "Bureaucratic theory (Max Weber)",
              "Human relations theory",
              "Modern administrative theories"
            ]
          },
          {
            "section": "3. Organization and Management",
            "marks": 14,
            "subsections": [
              "Principles of organization",
              "Types of organizational structures",
              "Leadership and decision-making",
              "Communication in public organizations"
            ]
          },
          {
            "section": "4. Public Policy",
            "marks": 12,
            "subsections": [
              "Concept of public policy",
              "Policy formulation and implementation",
              "Policy evaluation",
              "Role of institutions in policymaking"
            ]
          },
          {
            "section": "5. Bureaucracy",
            "marks": 12,
            "subsections": [
              "Nature and role of bureaucracy",
              "Bureaucratic structure and functions",
              "Relationship between bureaucracy and politics"
            ]
          },
          {
            "section": "6. Financial Administration",
            "marks": 12,
            "subsections": [
              "Budgeting process",
              "Public finance management",
              "Accountability and financial control"
            ]
          },
          {
            "section": "7. Administrative Reforms",
            "marks": 12,
            "subsections": [
              "Need for administrative reforms",
              "New public management",
              "Good governance and accountability"
            ]
          },
          {
            "section": "8. Public Administration in Pakistan",
            "marks": 14,
            "subsections": [
              "Structure of public administration in Pakistan",
              "Federal, provincial, and local governments",
              "Administrative challenges in Pakistan"
            ]
          }
        ]
      },
      {
        "id": "governance",
        "name": "Governance & Public Policies",
        "marks": 100,
        "icon": "⚖️",
        "color": "bg-amber-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Basic Concepts of Governance",
            "marks": 16,
            "subsections": [
              "Origin of the term governance",
              "Definition of governance",
              "Definition of good governance",
              "Characteristics of good governance: participation, rule of law, transparency, responsiveness, equity, effectiveness and efficiency, accountability, strategic vision",
              "Failure of governance",
              "Indicators of governance failure",
              "Diagnostic tools",
              "Effects of weak governance"
            ]
          },
          {
            "section": "2. Governance Theories",
            "marks": 12,
            "subsections": [
              "Communitarianism",
              "Decentered theory",
              "Libertarian socialism",
              "Institutionalism",
              "Marxism",
              "Neoliberalism",
              "Rational choice theory",
              "Regulation theory"
            ]
          },
          {
            "section": "3. Governance Indicators",
            "marks": 12,
            "subsections": [
              "Indicators developed by international institutions: World Bank, IMF, UNESCO, UNDP, Asian Development Bank",
              "Voice and accountability",
              "Political stability and absence of violence",
              "Government effectiveness",
              "Regulatory quality",
              "Rule of law",
              "Control of corruption"
            ]
          },
          {
            "section": "4. Public Policy and Planning Institutions",
            "marks": 14,
            "subsections": [
              "Institutional framework for policy coordination and planning",
              "Economic Coordination Committee of the Cabinet",
              "Federal Cabinet",
              "Secretaries Committee",
              "Prime Minister's Secretariat",
              "Planning Commission",
              "Finance Division",
              "Cabinet Division",
              "Federal Ministries",
              "Role of Planning Commission: strategic planning and policy development",
              "Role of governments: federal, provincial, local",
              "Role of international donors: IMF, World Bank, development partners",
              "Policy implementation in health and education sectors"
            ]
          },
          {
            "section": "5. Accountability",
            "marks": 12,
            "subsections": [
              "Concept of accountability",
              "Standards of accountability",
              "Symbolic and practical aspects",
              "Types of accountability: political, legal/judicial, administrative, professional",
              "Public vs private accountability",
              "Anti-corruption strategies",
              "National strategies against corruption",
              "Institutional reforms"
            ]
          },
          {
            "section": "6. Bureaucracy",
            "marks": 12,
            "subsections": [
              "Concept of bureaucracy",
              "Historical background",
              "Neutrality of bureaucracy",
              "Role in state governance",
              "Theories of bureaucracy: Max Weber, Karl Marx, John Stuart Mill, Woodrow Wilson",
              "Bureaucracy in Pakistan",
              "Colonial legacy",
              "Civil-military relations",
              "Political influence",
              "Institutional challenges"
            ]
          },
          {
            "section": "7. Administrative Reforms",
            "marks": 10,
            "subsections": [
              "Theories of administrative reforms",
              "Types of administrative reforms",
              "Reform strategies: privatization, regulation and deregulation, decentralization, public-private partnerships, business process re-engineering, quality assurance",
              "Administrative reforms in Pakistan"
            ]
          },
          {
            "section": "8. Public Administration and Development",
            "marks": 12,
            "subsections": [
              "Role of public administration in development",
              "Development administration",
              "Difference between development administration and development management",
              "Issues and challenges of public administration in Pakistan"
            ]
          }
        ]
      },
      {
        "id": "town-planning-urban-management",
        "name": "Town Planning & Urban Management",
        "marks": 100,
        "icon": "🏙️",
        "color": "bg-cyan-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Town Planning",
            "marks": 12,
            "subsections": [
              "Definition and scope of town planning",
              "Evolution of urban planning",
              "Objectives of town planning",
              "Importance of urban planning in modern societies"
            ]
          },
          {
            "section": "2. Urbanization",
            "marks": 12,
            "subsections": [
              "Causes of urbanization",
              "Patterns of urban growth",
              "Urbanization trends in developing countries",
              "Problems associated with rapid urbanization"
            ]
          },
          {
            "section": "3. Urban Planning Principles",
            "marks": 14,
            "subsections": [
              "Land-use planning",
              "Zoning and urban regulations",
              "Transportation planning",
              "Environmental considerations in urban planning"
            ]
          },
          {
            "section": "4. Housing and Urban Development",
            "marks": 14,
            "subsections": [
              "Housing policies",
              "Housing problems in developing countries",
              "Low-cost housing and housing finance",
              "Urban housing programs"
            ]
          },
          {
            "section": "5. Urban Infrastructure and Services",
            "marks": 12,
            "subsections": [
              "Water supply systems",
              "Sanitation and waste management",
              "Energy supply in cities",
              "Transportation systems"
            ]
          },
          {
            "section": "6. Urban Management",
            "marks": 12,
            "subsections": [
              "Urban governance and institutions",
              "Role of municipal governments",
              "Urban management strategies",
              "Community participation in urban development"
            ]
          },
          {
            "section": "7. Urban Environmental Issues",
            "marks": 12,
            "subsections": [
              "Urban pollution",
              "Environmental sustainability in cities",
              "Green spaces and urban ecology"
            ]
          },
          {
            "section": "8. Urban Planning in Pakistan",
            "marks": 12,
            "subsections": [
              "Urban development in Pakistan",
              "Housing and urban policies in Pakistan",
              "Challenges of urban management in Pakistan"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 4,
    "name": "Group IV",
    "selectionCriteria": "Select one subject - 100 marks",
    "subjects": [
      {
        "id": "history-pakistan-india",
        "name": "History of Pakistan & India",
        "marks": 100,
        "icon": "🕌",
        "color": "bg-amber-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Muslim Rule in the Subcontinent",
            "marks": 12,
            "subsections": [
              "Arab conquest of Sindh",
              "Establishment of Muslim rule in India",
              "Delhi Sultanate and its administration",
              "Mughal Empire: rise, administration, and decline"
            ]
          },
          {
            "section": "2. Muslim Society and Culture",
            "marks": 12,
            "subsections": [
              "Social structure during Muslim rule",
              "Educational and cultural developments",
              "Contribution of Muslim rulers to administration and culture"
            ]
          },
          {
            "section": "3. Decline of Muslim Power",
            "marks": 12,
            "subsections": [
              "Weaknesses of the Mughal Empire",
              "Internal conflicts and administrative decline",
              "Rise of regional powers"
            ]
          },
          {
            "section": "4. Reform Movements",
            "marks": 13,
            "subsections": [
              "Religious and social reform movements among Muslims",
              "Role of Sheikh Ahmad Sirhindi",
              "Role of Shah Waliullah",
              "Jihad Movement of Syed Ahmad Shaheed Barelvi"
            ]
          },
          {
            "section": "5. British Rule in India",
            "marks": 13,
            "subsections": [
              "Establishment of British power",
              "Administrative and economic policies of the British",
              "Impact of British rule on Indian society"
            ]
          },
          {
            "section": "6. Muslim Reform and Educational Movements",
            "marks": 12,
            "subsections": [
              "Aligarh Movement",
              "Role of Sir Syed Ahmad Khan",
              "Educational reforms among Muslims"
            ]
          },
          {
            "section": "7. Rise of Muslim Nationalism",
            "marks": 13,
            "subsections": [
              "Political awakening of Muslims",
              "Formation of All India Muslim League",
              "Role of Muslim leadership"
            ]
          },
          {
            "section": "8. Freedom Movement and Creation of Pakistan",
            "marks": 13,
            "subsections": [
              "Important constitutional developments",
              "Role of Quaid-e-Azam Muhammad Ali Jinnah",
              "Major events leading to the creation of Pakistan",
              "Partition of Bengal (1905)",
              "Lucknow Pact (1916)",
              "Khilafat Movement",
              "Allahabad Address (1930)",
              "Lahore Resolution (1940)",
              "Cabinet Mission Plan",
              "Partition of India and creation of Pakistan (1947)"
            ]
          }
        ]
      },
      {
        "id": "islamic-history-culture",
        "name": "Islamic History & Culture",
        "marks": 100,
        "icon": "🕌",
        "color": "from-teal-600 to-green-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Paper I - Pre-Islamic Arabia",
            "marks": 20,
            "subsections": [
              "Social, political, and economic conditions of Arabia before Islam",
              "Religious beliefs and tribal structure",
              "Cultural traditions of Arab society"
            ]
          },
          {
            "section": "Paper I - Life of Prophet Muhammad (PBUH)",
            "marks": 30,
            "subsections": [
              "Early life and prophethood",
              "Preaching of Islam in Makkah",
              "Migration (Hijrah) to Madinah",
              "Establishment of the Islamic state in Madinah",
              "Major battles and treaties",
              "Conquest of Makkah"
            ]
          },
          {
            "section": "Paper I - The Pious Caliphate (Khulafa-e-Rashideen)",
            "marks": 30,
            "subsections": [
              "Caliphate of Hazrat Abu Bakr (RA)",
              "Caliphate of Hazrat Umar (RA)",
              "Caliphate of Hazrat Uthman (RA)",
              "Caliphate of Hazrat Ali (RA)",
              "Administrative system",
              "Judicial system",
              "Expansion of the Islamic state"
            ]
          },
          {
            "section": "Paper I - Umayyad Dynasty",
            "marks": 20,
            "subsections": [
              "Establishment of the Umayyad rule",
              "Political and administrative system",
              "Expansion of the Muslim empire",
              "Cultural developments"
            ]
          },
          {
            "section": "Paper II - Abbasid Dynasty",
            "marks": 25,
            "subsections": [
              "Rise of the Abbasid dynasty",
              "Political and administrative system",
              "Development of Islamic civilization",
              "Scientific and intellectual achievements"
            ]
          },
          {
            "section": "Paper II - Muslim Spain (Al-Andalus)",
            "marks": 20,
            "subsections": [
              "Establishment of Muslim rule in Spain",
              "Cultural and scientific developments",
              "Educational institutions and intellectual contributions"
            ]
          },
          {
            "section": "Paper II - Ottoman Empire",
            "marks": 20,
            "subsections": [
              "Rise and expansion of the Ottoman Empire",
              "Administrative and military organization",
              "Cultural and architectural achievements",
              "Decline of the Ottoman Empire"
            ]
          },
          {
            "section": "Paper II - Muslim Contributions to Civilization",
            "marks": 20,
            "subsections": [
              "Contributions to science and medicine",
              "Development of philosophy and literature",
              "Advances in mathematics and astronomy"
            ]
          },
          {
            "section": "Paper II - Islamic Art and Architecture",
            "marks": 15,
            "subsections": [
              "Development of Islamic architecture",
              "Mosques, palaces, and monuments",
              "Calligraphy and decorative arts"
            ]
          }
        ]
      },
      {
        "id": "british-history",
        "name": "British History",
        "marks": 100,
        "icon": "🏰",
        "color": "bg-stone-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. The Tudor Period (1485–1603)",
            "marks": 12,
            "subsections": [
              "Rise of the Tudor dynasty",
              "Reign of Henry VII and consolidation of power",
              "Reign of Henry VIII and the English Reformation",
              "Reign of Elizabeth I",
              "Political and religious developments during the Tudor era"
            ]
          },
          {
            "section": "2. The Stuart Period (1603–1714)",
            "marks": 13,
            "subsections": [
              "Reign of James I",
              "Reign of Charles I and conflict with Parliament",
              "English Civil War",
              "Execution of Charles I",
              "Commonwealth and rule of Oliver Cromwell",
              "Restoration of the monarchy"
            ]
          },
          {
            "section": "3. The Glorious Revolution (1688)",
            "marks": 12,
            "subsections": [
              "Causes of the Glorious Revolution",
              "Deposition of James II",
              "Rise of William and Mary",
              "Establishment of parliamentary supremacy",
              "Bill of Rights (1689)"
            ]
          },
          {
            "section": "4. Constitutional Development",
            "marks": 13,
            "subsections": [
              "Growth of parliamentary institutions",
              "Cabinet system and the role of the Prime Minister",
              "Evolution of constitutional monarchy"
            ]
          },
          {
            "section": "5. Industrial Revolution",
            "marks": 13,
            "subsections": [
              "Causes and development of industrialization",
              "Economic and social impacts",
              "Changes in industry, agriculture, and urbanization"
            ]
          },
          {
            "section": "6. British Empire",
            "marks": 13,
            "subsections": [
              "Expansion of the British Empire",
              "Colonial administration",
              "Economic and political influence of the empire"
            ]
          },
          {
            "section": "7. Britain in the 19th Century",
            "marks": 13,
            "subsections": [
              "Reform Acts and expansion of democracy",
              "Social and political reforms",
              "Rise of political parties"
            ]
          },
          {
            "section": "8. Britain in the 20th Century",
            "marks": 11,
            "subsections": [
              "Role in World War I",
              "Role in World War II",
              "Decline of the British Empire",
              "Emergence of modern Britain"
            ]
          }
        ]
      },
      {
        "id": "european-history",
        "name": "European History",
        "marks": 100,
        "icon": "🏯",
        "color": "bg-slate-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Renaissance",
            "marks": 11,
            "subsections": [
              "Causes of the Renaissance",
              "Cultural and intellectual revival in Europe",
              "Contributions in art, literature, and science",
              "Major Renaissance thinkers and artists"
            ]
          },
          {
            "section": "2. Reformation",
            "marks": 11,
            "subsections": [
              "Causes of the Protestant Reformation",
              "Role of Martin Luther and John Calvin",
              "Catholic Counter-Reformation",
              "Religious conflicts in Europe"
            ]
          },
          {
            "section": "3. Rise of Nation States",
            "marks": 11,
            "subsections": [
              "Formation of modern nation states in Europe",
              "Development of centralized governments",
              "Political changes in major European countries"
            ]
          },
          {
            "section": "4. French Revolution (1789)",
            "marks": 12,
            "subsections": [
              "Causes of the French Revolution",
              "Major events and phases of the revolution",
              "Role of Napoleon Bonaparte",
              "Impact of the revolution on Europe"
            ]
          },
          {
            "section": "5. Industrial Revolution",
            "marks": 12,
            "subsections": [
              "Causes and origin of industrialization in Europe",
              "Technological developments",
              "Social and economic impacts",
              "Urbanization and labor movements"
            ]
          },
          {
            "section": "6. Unification Movements",
            "marks": 12,
            "subsections": [
              "Unification of Italy",
              "Unification of Germany",
              "Role of major political leaders"
            ]
          },
          {
            "section": "7. World War I",
            "marks": 12,
            "subsections": [
              "Causes of World War I",
              "Major events of the war",
              "Treaty of Versailles",
              "Political consequences in Europe"
            ]
          },
          {
            "section": "8. World War II",
            "marks": 12,
            "subsections": [
              "Causes and outbreak of World War II",
              "Rise of totalitarian regimes",
              "Major events of the war",
              "Consequences and restructuring of Europe"
            ]
          },
          {
            "section": "9. Post-War Europe",
            "marks": 7,
            "subsections": [
              "Cold War division of Europe",
              "Formation of European organizations",
              "Development of the European Union"
            ]
          }
        ]
      },
      {
        "id": "history-usa",
        "name": "History of USA",
        "marks": 100,
        "icon": "🗽",
        "color": "bg-blue-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Colonial Period",
            "marks": 10,
            "subsections": [
              "European exploration and colonization of North America",
              "Establishment of British colonies",
              "Social, political, and economic life in the colonies"
            ]
          },
          {
            "section": "2. American War of Independence (1775–1783)",
            "marks": 11,
            "subsections": [
              "Causes of the American Revolution",
              "Role of colonial leadership",
              "Declaration of Independence (1776)",
              "Major events and outcomes of the war"
            ]
          },
          {
            "section": "3. Formation of the American Constitution",
            "marks": 11,
            "subsections": [
              "Constitutional Convention (1787)",
              "Key features of the U.S. Constitution",
              "Federal system and separation of powers",
              "Bill of Rights"
            ]
          },
          {
            "section": "4. Expansion and Development",
            "marks": 10,
            "subsections": [
              "Westward expansion",
              "Manifest Destiny",
              "Economic growth and industrial development"
            ]
          },
          {
            "section": "5. American Civil War (1861–1865)",
            "marks": 11,
            "subsections": [
              "Causes of the Civil War",
              "Role of slavery and sectional differences",
              "Major battles and leadership",
              "Consequences of the war"
            ]
          },
          {
            "section": "6. Reconstruction Era",
            "marks": 11,
            "subsections": [
              "Political and social reconstruction after the Civil War",
              "Amendments to the Constitution",
              "Challenges of rebuilding the nation"
            ]
          },
          {
            "section": "7. Industrialization and Economic Growth",
            "marks": 11,
            "subsections": [
              "Rise of industrial capitalism",
              "Urbanization and immigration",
              "Labor movements and reforms"
            ]
          },
          {
            "section": "8. USA in World Wars",
            "marks": 11,
            "subsections": [
              "Role of the United States in World War I",
              "Role of the United States in World War II",
              "Emergence of the United States as a global power"
            ]
          },
          {
            "section": "9. Cold War Era",
            "marks": 10,
            "subsections": [
              "U.S. foreign policy during the Cold War",
              "Containment policy",
              "Conflicts and international alliances"
            ]
          },
          {
            "section": "10. Contemporary USA",
            "marks": 4,
            "subsections": [
              "Political and economic developments",
              "Role of the USA in global politics",
              "Major social and political changes in modern America"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 5,
    "name": "Group V",
    "selectionCriteria": "Select one subject - 100 marks",
    "subjects": [
      {
        "id": "gender-studies",
        "name": "Gender Studies",
        "marks": 100,
        "icon": "⚧",
        "color": "bg-pink-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Gender Studies",
            "marks": 11,
            "subsections": [
              "Definition and scope of gender studies",
              "Difference between sex and gender",
              "Gender as a social construct",
              "Importance of gender studies in modern societies"
            ]
          },
          {
            "section": "2. Feminist Theories",
            "marks": 13,
            "subsections": [
              "Liberal feminism",
              "Radical feminism",
              "Marxist feminism",
              "Socialist feminism",
              "Postmodern feminism"
            ]
          },
          {
            "section": "3. Gender and Society",
            "marks": 12,
            "subsections": [
              "Gender roles and stereotypes",
              "Gender socialization",
              "Gender discrimination and inequality"
            ]
          },
          {
            "section": "4. Women and Development",
            "marks": 12,
            "subsections": [
              "Role of women in economic development",
              "Women's participation in labor markets",
              "Gender and poverty"
            ]
          },
          {
            "section": "5. Gender and Politics",
            "marks": 12,
            "subsections": [
              "Women's political participation",
              "Gender representation in political institutions",
              "Gender equality in governance"
            ]
          },
          {
            "section": "6. Gender and Law",
            "marks": 12,
            "subsections": [
              "Legal rights of women",
              "Gender-based laws and policies",
              "International conventions on women's rights"
            ]
          },
          {
            "section": "7. Gender-Based Violence",
            "marks": 12,
            "subsections": [
              "Types of gender-based violence",
              "Causes and consequences",
              "Measures to prevent violence against women"
            ]
          },
          {
            "section": "8. Gender Issues in Pakistan",
            "marks": 11,
            "subsections": [
              "Status of women in Pakistan",
              "Social and cultural challenges",
              "Government policies for gender equality"
            ]
          },
          {
            "section": "9. Global Gender Issues",
            "marks": 5,
            "subsections": [
              "Gender equality movements",
              "Role of international organizations",
              "Global initiatives for women's empowerment"
            ]
          }
        ]
      },
      {
        "id": "environmental-science",
        "name": "Environmental Sciences",
        "marks": 100,
        "icon": "🌿",
        "color": "bg-green-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Environmental Science",
            "marks": 11,
            "subsections": [
              "Definition and scope of environmental science",
              "Components of the environment",
              "Importance of environmental studies"
            ]
          },
          {
            "section": "2. Ecosystems",
            "marks": 12,
            "subsections": [
              "Structure and functions of ecosystems",
              "Food chains and food webs",
              "Energy flow in ecosystems",
              "Ecological balance"
            ]
          },
          {
            "section": "3. Natural Resources",
            "marks": 12,
            "subsections": [
              "Renewable resources",
              "Non-renewable resources",
              "Conservation and sustainable use of resources"
            ]
          },
          {
            "section": "4. Environmental Pollution",
            "marks": 13,
            "subsections": [
              "Air pollution",
              "Water pollution",
              "Soil pollution",
              "Noise pollution",
              "Causes, effects, and control measures of pollution"
            ]
          },
          {
            "section": "5. Biodiversity",
            "marks": 11,
            "subsections": [
              "Importance of biodiversity",
              "Threats to biodiversity",
              "Conservation strategies"
            ]
          },
          {
            "section": "6. Climate Change",
            "marks": 12,
            "subsections": [
              "Causes of climate change",
              "Global warming and greenhouse gases",
              "Impact of climate change on ecosystems"
            ]
          },
          {
            "section": "7. Environmental Management",
            "marks": 11,
            "subsections": [
              "Environmental impact assessment",
              "Environmental policies and regulations",
              "Sustainable development strategies"
            ]
          },
          {
            "section": "8. Environmental Issues in Pakistan",
            "marks": 12,
            "subsections": [
              "Water scarcity",
              "Deforestation",
              "Urban environmental problems",
              "Climate change impacts in Pakistan"
            ]
          },
          {
            "section": "9. Global Environmental Initiatives",
            "marks": 6,
            "subsections": [
              "International environmental agreements",
              "Role of global organizations in environmental protection"
            ]
          }
        ]
      },
      {
        "id": "agriculture-forestry",
        "name": "Agriculture & Forestry",
        "marks": 100,
        "icon": "🌾",
        "color": "bg-yellow-700",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Agriculture",
            "marks": 11,
            "subsections": [
              "Definition and scope of agriculture",
              "Importance of agriculture in national economies",
              "Agricultural systems and practices"
            ]
          },
          {
            "section": "2. Soil Science",
            "marks": 12,
            "subsections": [
              "Soil formation and classification",
              "Physical and chemical properties of soil",
              "Soil fertility and soil management"
            ]
          },
          {
            "section": "3. Crop Production",
            "marks": 12,
            "subsections": [
              "Major crops and cropping systems",
              "Methods of crop cultivation",
              "Crop improvement and plant breeding"
            ]
          },
          {
            "section": "4. Irrigation and Water Management",
            "marks": 12,
            "subsections": [
              "Irrigation systems",
              "Water conservation techniques",
              "Efficient water management in agriculture"
            ]
          },
          {
            "section": "5. Agricultural Inputs and Technology",
            "marks": 11,
            "subsections": [
              "Use of fertilizers and pesticides",
              "Agricultural mechanization",
              "Modern agricultural technologies"
            ]
          },
          {
            "section": "6. Forestry",
            "marks": 12,
            "subsections": [
              "Importance of forests",
              "Types of forests",
              "Forest management and conservation"
            ]
          },
          {
            "section": "7. Agroforestry",
            "marks": 11,
            "subsections": [
              "Concept of agroforestry",
              "Benefits of integrating trees with agriculture",
              "Sustainable land management practices"
            ]
          },
          {
            "section": "8. Agricultural Development",
            "marks": 12,
            "subsections": [
              "Agricultural policies",
              "Rural development",
              "Challenges of agricultural development in developing countries"
            ]
          },
          {
            "section": "9. Agriculture and Forestry in Pakistan",
            "marks": 5,
            "subsections": [
              "Importance of agriculture in Pakistan's economy",
              "Major crops of Pakistan",
              "Forest resources and conservation challenges"
            ]
          }
        ]
      },
      {
        "id": "botany",
        "name": "Botany",
        "marks": 100,
        "icon": "🌿",
        "color": "bg-emerald-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Botany",
            "marks": 11,
            "subsections": [
              "Definition and scope of botany",
              "Importance of plants in ecosystems and human life",
              "Branches of botany"
            ]
          },
          {
            "section": "2. Plant Cell and Tissue",
            "marks": 12,
            "subsections": [
              "Structure and function of plant cells",
              "Cell organelles",
              "Types of plant tissues",
              "Tissue systems in plants"
            ]
          },
          {
            "section": "3. Plant Anatomy",
            "marks": 12,
            "subsections": [
              "Internal structure of roots, stems, and leaves",
              "Vascular tissues (xylem and phloem)",
              "Secondary growth in plants"
            ]
          },
          {
            "section": "4. Plant Physiology",
            "marks": 13,
            "subsections": [
              "Photosynthesis",
              "Respiration in plants",
              "Water absorption and transpiration",
              "Mineral nutrition"
            ]
          },
          {
            "section": "5. Plant Reproduction",
            "marks": 12,
            "subsections": [
              "Asexual reproduction",
              "Sexual reproduction in plants",
              "Structure of flowers",
              "Pollination and fertilization"
            ]
          },
          {
            "section": "6. Plant Genetics",
            "marks": 12,
            "subsections": [
              "Principles of heredity",
              "Genetic variation in plants",
              "Plant breeding and genetic improvement"
            ]
          },
          {
            "section": "7. Plant Ecology",
            "marks": 12,
            "subsections": [
              "Relationship between plants and environment",
              "Plant communities and ecosystems",
              "Ecological adaptations"
            ]
          },
          {
            "section": "8. Economic Botany",
            "marks": 11,
            "subsections": [
              "Plants used for food, medicine, and industry",
              "Importance of crops and medicinal plants"
            ]
          },
          {
            "section": "9. Botany in Pakistan",
            "marks": 5,
            "subsections": [
              "Important plant species in Pakistan",
              "Agricultural and ecological significance of plants in Pakistan"
            ]
          }
        ]
      },
      {
        "id": "zoology",
        "name": "Zoology",
        "marks": 100,
        "icon": "🦁",
        "color": "bg-orange-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Zoology",
            "marks": 11,
            "subsections": [
              "Definition and scope of zoology",
              "Branches of zoology",
              "Importance of studying animal life"
            ]
          },
          {
            "section": "2. Animal Classification",
            "marks": 12,
            "subsections": [
              "Principles of animal classification",
              "Major groups of animals",
              "Invertebrates and vertebrates",
              "Characteristics of different animal phyla"
            ]
          },
          {
            "section": "3. Cell Biology",
            "marks": 11,
            "subsections": [
              "Structure and function of animal cells",
              "Cell organelles",
              "Cell division (mitosis and meiosis)"
            ]
          },
          {
            "section": "4. Animal Physiology",
            "marks": 13,
            "subsections": [
              "Digestive system",
              "Respiratory system",
              "Circulatory system",
              "Nervous system"
            ]
          },
          {
            "section": "5. Reproduction and Development",
            "marks": 12,
            "subsections": [
              "Types of reproduction in animals",
              "Fertilization and embryonic development",
              "Growth and development"
            ]
          },
          {
            "section": "6. Genetics and Evolution",
            "marks": 12,
            "subsections": [
              "Principles of heredity",
              "Genetic variation",
              "Theories of evolution"
            ]
          },
          {
            "section": "7. Animal Ecology",
            "marks": 12,
            "subsections": [
              "Interaction between animals and environment",
              "Food chains and food webs",
              "Ecological balance"
            ]
          },
          {
            "section": "8. Economic Zoology",
            "marks": 12,
            "subsections": [
              "Importance of animals in agriculture and industry",
              "Fisheries and livestock",
              "Animal resources and management"
            ]
          },
          {
            "section": "9. Zoology in Pakistan",
            "marks": 5,
            "subsections": [
              "Major animal species of Pakistan",
              "Conservation of wildlife",
              "Challenges in wildlife management"
            ]
          }
        ]
      },
      {
        "id": "english-literature",
        "name": "English Literature",
        "marks": 100,
        "icon": "📚",
        "color": "bg-red-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to English Literature",
            "marks": 11,
            "subsections": [
              "Definition and scope of literature",
              "Literary genres: poetry, drama, and prose",
              "Major literary movements and trends"
            ]
          },
          {
            "section": "2. Medieval Literature",
            "marks": 11,
            "subsections": [
              "Development of English literature in the medieval period",
              "Works of Geoffrey Chaucer",
              "Themes and characteristics of medieval literature"
            ]
          },
          {
            "section": "3. Renaissance Literature",
            "marks": 12,
            "subsections": [
              "Renaissance and humanism in England",
              "Works of William Shakespeare",
              "Development of drama and poetry during the Renaissance"
            ]
          },
          {
            "section": "4. Seventeenth-Century Literature",
            "marks": 11,
            "subsections": [
              "Metaphysical poetry",
              "Works of John Donne and John Milton",
              "Religious and philosophical themes in literature"
            ]
          },
          {
            "section": "5. Eighteenth-Century Literature",
            "marks": 11,
            "subsections": [
              "Rise of the novel",
              "Works of Jonathan Swift, Alexander Pope, and Daniel Defoe",
              "Satire and social criticism"
            ]
          },
          {
            "section": "6. Romantic Literature",
            "marks": 12,
            "subsections": [
              "Characteristics of Romanticism",
              "Major poets: William Wordsworth, Samuel Taylor Coleridge, John Keats, Percy Bysshe Shelley, Lord Byron",
              "Themes of nature, imagination, and individualism"
            ]
          },
          {
            "section": "7. Victorian Literature",
            "marks": 12,
            "subsections": [
              "Social and cultural context of the Victorian age",
              "Major writers: Charles Dickens, Thomas Hardy, Alfred Tennyson",
              "Development of the Victorian novel"
            ]
          },
          {
            "section": "8. Modern Literature",
            "marks": 12,
            "subsections": [
              "Literary movements of the twentieth century",
              "Modernist writers: T. S. Eliot, James Joyce, Virginia Woolf",
              "Themes of modernism and realism"
            ]
          },
          {
            "section": "9. Literary Criticism",
            "marks": 8,
            "subsections": [
              "Basic principles of literary criticism",
              "Major critical approaches to literature"
            ]
          }
        ]
      },
      {
        "id": "urdu-literature",
        "name": "Urdu Literature",
        "marks": 100,
        "icon": "🖋️",
        "color": "bg-indigo-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Origin and Development of Urdu Language",
            "marks": 10,
            "subsections": [
              "Origin of the Urdu language",
              "Evolution and development of Urdu",
              "Linguistic characteristics of Urdu"
            ]
          },
          {
            "section": "2. Classical Urdu Poetry",
            "marks": 12,
            "subsections": [
              "Early development of Urdu poetry",
              "Major poetic forms: Ghazal, Nazm, Qasida, Marsiya"
            ]
          },
          {
            "section": "3. Classical Poets",
            "marks": 12,
            "subsections": [
              "Study of major classical poets and their contributions",
              "Mir Taqi Mir",
              "Mirza Ghalib",
              "Momin Khan Momin",
              "Sauda",
              "Zauq"
            ]
          },
          {
            "section": "4. Modern Urdu Poetry",
            "marks": 12,
            "subsections": [
              "Development of modern Urdu poetry and its themes",
              "Allama Muhammad Iqbal",
              "Faiz Ahmed Faiz",
              "Josh Malihabadi"
            ]
          },
          {
            "section": "5. Urdu Prose",
            "marks": 12,
            "subsections": [
              "Development of Urdu prose and its literary forms",
              "Novel",
              "Short story (Afsana)",
              "Essay (Mazmoon)",
              "Drama"
            ]
          },
          {
            "section": "6. Prominent Urdu Prose Writers",
            "marks": 12,
            "subsections": [
              "Sir Syed Ahmad Khan",
              "Deputy Nazir Ahmad",
              "Premchand",
              "Saadat Hasan Manto"
            ]
          },
          {
            "section": "7. Literary Movements in Urdu",
            "marks": 12,
            "subsections": [
              "Aligarh Movement",
              "Progressive Writers Movement",
              "Modern literary trends"
            ]
          },
          {
            "section": "8. Literary Criticism",
            "marks": 12,
            "subsections": [
              "Development of literary criticism in Urdu",
              "Major Urdu critics and their works"
            ]
          },
          {
            "section": "9. Urdu Literature in Pakistan",
            "marks": 6,
            "subsections": [
              "Development of Urdu literature after independence",
              "Contribution of Pakistani writers to Urdu literature"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 6,
    "name": "Group VI",
    "selectionCriteria": "Select one subject - 100 marks",
    "subjects": [
      {
        "id": "law",
        "name": "Law",
        "marks": 100,
        "icon": "⚖️",
        "color": "bg-gray-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Law",
            "marks": 12,
            "subsections": [
              "Definition and nature of law",
              "Importance and functions of law in society",
              "Classification of law"
            ]
          },
          {
            "section": "2. Sources of Law",
            "marks": 12,
            "subsections": [
              "Legislation",
              "Customs",
              "Judicial precedents",
              "Islamic law as a source of law"
            ]
          },
          {
            "section": "3. Legal System",
            "marks": 12,
            "subsections": [
              "Structure of the legal system",
              "Civil and criminal law",
              "Role of courts in the administration of justice"
            ]
          },
          {
            "section": "4. Constitution and Legal Framework",
            "marks": 12,
            "subsections": [
              "Basic principles of constitutional law",
              "Separation of powers",
              "Rule of law"
            ]
          },
          {
            "section": "5. Court System in Pakistan",
            "marks": 12,
            "subsections": [
              "Structure of courts in Pakistan",
              "Jurisdiction of courts",
              "Role of the Supreme Court and High Courts"
            ]
          },
          {
            "section": "6. Rights and Duties",
            "marks": 12,
            "subsections": [
              "Fundamental rights",
              "Legal duties and obligations",
              "Protection of civil liberties"
            ]
          },
          {
            "section": "7. Legal Procedures",
            "marks": 12,
            "subsections": [
              "Civil procedure",
              "Criminal procedure",
              "Evidence and legal proof"
            ]
          },
          {
            "section": "8. Legal Profession",
            "marks": 4,
            "subsections": [
              "Role of lawyers and judges",
              "Ethics of the legal profession",
              "Responsibilities of legal practitioners"
            ]
          }
        ]
      },
      {
        "id": "constitutional-law",
        "name": "Constitutional Law",
        "marks": 100,
        "icon": "📜",
        "color": "bg-zinc-500",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Constitutional Law",
            "marks": 11,
            "subsections": [
              "Definition and scope of constitutional law",
              "Nature and importance of constitutions",
              "Types of constitutions: written and unwritten"
            ]
          },
          {
            "section": "2. Principles of Constitutional Law",
            "marks": 12,
            "subsections": [
              "Rule of law",
              "Separation of powers",
              "Checks and balances",
              "Judicial review"
            ]
          },
          {
            "section": "3. Fundamental Rights",
            "marks": 12,
            "subsections": [
              "Concept of fundamental rights",
              "Protection of civil liberties",
              "Enforcement of fundamental rights"
            ]
          },
          {
            "section": "4. Constitutional Development",
            "marks": 11,
            "subsections": [
              "Historical evolution of constitutional systems",
              "Development of democratic institutions"
            ]
          },
          {
            "section": "5. Constitution of the United Kingdom",
            "marks": 12,
            "subsections": [
              "Features of the British constitution",
              "Role of Parliament",
              "Role of the Prime Minister and Cabinet",
              "Constitutional monarchy"
            ]
          },
          {
            "section": "6. Constitution of the United States",
            "marks": 12,
            "subsections": [
              "Federal system of government",
              "Separation of powers",
              "Role of Congress, President, and Supreme Court"
            ]
          },
          {
            "section": "7. Constitution of France",
            "marks": 12,
            "subsections": [
              "Structure of government in France",
              "Role of the President and Parliament",
              "Constitutional framework of the Fifth Republic"
            ]
          },
          {
            "section": "8. Constitution of Pakistan",
            "marks": 6,
            "subsections": [
              "Constitutional development in Pakistan",
              "Features of the Constitution of 1973",
              "Fundamental rights and institutions of governance"
            ]
          }
        ]
      },
      {
        "id": "international-law",
        "name": "International Law",
        "marks": 100,
        "icon": "🌍",
        "color": "bg-cyan-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to International Law",
            "marks": 11,
            "subsections": [
              "Definition and nature of international law",
              "Historical development of international law",
              "Relationship between international law and municipal law"
            ]
          },
          {
            "section": "2. Sources of International Law",
            "marks": 12,
            "subsections": [
              "International treaties and conventions",
              "International customs",
              "General principles of law",
              "Judicial decisions and writings of jurists"
            ]
          },
          {
            "section": "3. Subjects of International Law",
            "marks": 11,
            "subsections": [
              "States as primary subjects",
              "International organizations",
              "Individuals in international law"
            ]
          },
          {
            "section": "4. Recognition",
            "marks": 11,
            "subsections": [
              "Recognition of states",
              "Recognition of governments",
              "Legal effects of recognition"
            ]
          },
          {
            "section": "5. State Sovereignty and Jurisdiction",
            "marks": 11,
            "subsections": [
              "Concept of sovereignty",
              "Territorial jurisdiction",
              "Extradition and asylum"
            ]
          },
          {
            "section": "6. Law of Treaties",
            "marks": 12,
            "subsections": [
              "Formation of treaties",
              "Validity and interpretation of treaties",
              "Termination of treaties"
            ]
          },
          {
            "section": "7. International Dispute Settlement",
            "marks": 12,
            "subsections": [
              "Peaceful settlement of disputes",
              "Negotiation, mediation, and arbitration",
              "International Court of Justice"
            ]
          },
          {
            "section": "8. Laws of War and Neutrality",
            "marks": 12,
            "subsections": [
              "International humanitarian law",
              "Rights and duties of neutral states",
              "Protection of civilians during armed conflict"
            ]
          },
          {
            "section": "9. International Organizations",
            "marks": 8,
            "subsections": [
              "United Nations and its structure",
              "Role of international organizations in maintaining peace and security"
            ]
          }
        ]
      },
      {
        "id": "muslim-law-jurisprudence",
        "name": "Muslim Law & Jurisprudence",
        "marks": 100,
        "icon": "⚖️",
        "color": "bg-teal-700",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Islamic Law",
            "marks": 12,
            "subsections": [
              "Definition and nature of Islamic law",
              "Historical development of Muslim law",
              "Importance of Shariah in Islamic society"
            ]
          },
          {
            "section": "2. Sources of Islamic Law",
            "marks": 13,
            "subsections": [
              "Primary sources: Quran, Sunnah",
              "Secondary sources: Ijma (consensus), Qiyas (analogy)",
              "Other sources: Ijtihad, Istihsan, Istislah"
            ]
          },
          {
            "section": "3. Schools of Islamic Jurisprudence",
            "marks": 12,
            "subsections": [
              "Hanafi school",
              "Maliki school",
              "Shafi'i school",
              "Hanbali school"
            ]
          },
          {
            "section": "4. Law of Marriage",
            "marks": 13,
            "subsections": [
              "Concept and objectives of marriage in Islam",
              "Conditions and essentials of marriage",
              "Rights and duties of spouses"
            ]
          },
          {
            "section": "5. Law of Divorce",
            "marks": 12,
            "subsections": [
              "Types of divorce in Islamic law",
              "Talaq and Khula",
              "Legal implications of divorce"
            ]
          },
          {
            "section": "6. Law of Inheritance",
            "marks": 13,
            "subsections": [
              "Principles of inheritance in Islam",
              "Distribution of property among heirs",
              "Categories of heirs"
            ]
          },
          {
            "section": "7. Waqf (Endowment)",
            "marks": 13,
            "subsections": [
              "Definition and nature of waqf",
              "Creation and management of waqf",
              "Legal implications of waqf"
            ]
          },
          {
            "section": "8. Administration of Justice in Islam",
            "marks": 12,
            "subsections": [
              "Judicial system in Islamic law",
              "Role of Qazi (judge)",
              "Evidence and legal procedure"
            ]
          }
        ]
      },
      {
        "id": "mercantile-law",
        "name": "Mercantile Law",
        "marks": 100,
        "icon": "💼",
        "color": "bg-slate-700",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Contract Act, 1872",
            "marks": 15,
            "subsections": [
              "Introduction to Contract: Definition, essential elements, offer and acceptance, consideration",
              "Capacity and Consent: Capacity to contract, free consent, coercion, undue influence, fraud, misrepresentation",
              "Performance and Discharge: Performance of contracts, breach of contract, remedies and damages"
            ]
          },
          {
            "section": "2. Sale of Goods Act, 1930",
            "marks": 12,
            "subsections": [
              "Definition and essential elements of a contract of sale",
              "Difference between sale and agreement to sell",
              "Conditions and warranties",
              "Doctrine of Caveat Emptor",
              "Rights and duties of buyer and seller",
              "Rights of an unpaid seller"
            ]
          },
          {
            "section": "3. Partnership Act, 1932",
            "marks": 12,
            "subsections": [
              "Definition of partnership and essentials",
              "Types of partnership",
              "Rights and duties of partners",
              "Relationship of partners with third parties",
              "Admission and retirement of partners",
              "Dissolution of partnership firms"
            ]
          },
          {
            "section": "4. Negotiable Instruments Act, 1881",
            "marks": 12,
            "subsections": [
              "Definition of negotiable instruments",
              "Types: Cheque, Bill of exchange, Promissory note",
              "Parties to negotiable instruments",
              "Negotiation and endorsement",
              "Dishonor and discharge of instruments"
            ]
          },
          {
            "section": "5. Competition Act, 2010",
            "marks": 11,
            "subsections": [
              "Concept of competition law",
              "Prohibition of anti-competitive practices",
              "Abuse of dominant position",
              "Role and powers of the Competition Commission of Pakistan"
            ]
          },
          {
            "section": "6. Electronic Transaction Ordinance, 2002",
            "marks": 10,
            "subsections": [
              "Recognition of electronic documents and signatures",
              "Legal status of electronic transactions",
              "Certification service providers"
            ]
          },
          {
            "section": "7. Arbitration Law in Pakistan",
            "marks": 10,
            "subsections": [
              "Appointment and role of arbitrators",
              "Arbitration agreements",
              "Powers of courts in arbitration"
            ]
          },
          {
            "section": "8. Consumer Protection Act, 2006",
            "marks": 10,
            "subsections": [
              "Consumer rights and protection mechanisms",
              "Consumer courts and commissions",
              "Duties and liabilities of producers and sellers"
            ]
          },
          {
            "section": "9. Companies Ordinance, 1984",
            "marks": 8,
            "subsections": [
              "Types of companies",
              "Memorandum and Articles of Association",
              "Shareholders and directors",
              "Meetings and corporate governance",
              "Winding up of companies"
            ]
          }
        ]
      },
      {
        "id": "criminology",
        "name": "Criminology",
        "marks": 100,
        "icon": "🔍",
        "color": "bg-red-700",
        "progress": 0,
        "syllabus": [
          {
            "section": "1. Introduction to Criminology",
            "marks": 11,
            "subsections": [
              "Definition and scope of criminology",
              "Nature and importance of criminology",
              "Relationship of criminology with other social sciences"
            ]
          },
          {
            "section": "2. Crime and Criminal Behavior",
            "marks": 12,
            "subsections": [
              "Concept and definition of crime",
              "Types and classification of crime",
              "Causes of criminal behavior"
            ]
          },
          {
            "section": "3. Schools of Criminology",
            "marks": 12,
            "subsections": [
              "Classical school",
              "Positivist school",
              "Neo-classical school",
              "Modern criminological perspectives"
            ]
          },
          {
            "section": "4. Theories of Crime",
            "marks": 13,
            "subsections": [
              "Biological theories of crime",
              "Psychological theories of crime",
              "Sociological theories of crime",
              "Strain theory",
              "Social control theory"
            ]
          },
          {
            "section": "5. Juvenile Delinquency",
            "marks": 11,
            "subsections": [
              "Definition and causes of juvenile delinquency",
              "Prevention and control of juvenile crime",
              "Juvenile justice system"
            ]
          },
          {
            "section": "6. Criminal Justice System",
            "marks": 12,
            "subsections": [
              "Structure of the criminal justice system",
              "Role of police",
              "Role of courts",
              "Role of correctional institutions"
            ]
          },
          {
            "section": "7. Punishment and Rehabilitation",
            "marks": 12,
            "subsections": [
              "Theories of punishment",
              "Types of punishment",
              "Rehabilitation and correctional programs"
            ]
          },
          {
            "section": "8. Victimology",
            "marks": 11,
            "subsections": [
              "Concept of victimology",
              "Victim rights and protection",
              "Impact of crime on victims"
            ]
          },
          {
            "section": "9. Crime Prevention",
            "marks": 6,
            "subsections": [
              "Strategies for crime prevention",
              "Role of community and institutions in crime control"
            ]
          }
        ]
      },
      {
        "id": "philosophy",
        "name": "Philosophy",
        "marks": 100,
        "icon": "🧠",
        "color": "from-violet-600 to-indigo-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Introduction to Philosophy",
            "marks": 10,
            "subsections": [
              "Definition and scope of philosophy",
              "Branches of philosophy",
              "Relationship between philosophy, religion, and science"
            ]
          },
          {
            "section": "Greek Philosophy",
            "marks": 12,
            "subsections": [
              "Socrates and the Socratic method",
              "Plato and his theory of ideas",
              "Aristotle and his contributions to logic and ethics"
            ]
          },
          {
            "section": "Medieval Philosophy",
            "marks": 11,
            "subsections": [
              "Influence of religion on philosophy",
              "Contributions of St. Augustine",
              "Contributions of St. Thomas Aquinas"
            ]
          },
          {
            "section": "Modern Philosophy",
            "marks": 12,
            "subsections": [
              "Rationalism: Descartes, Spinoza, Leibniz",
              "Empiricism: Locke, Berkeley, Hume"
            ]
          },
          {
            "section": "Kant and German Idealism",
            "marks": 11,
            "subsections": [
              "Philosophy of Immanuel Kant",
              "German idealism and its influence"
            ]
          },
          {
            "section": "Existentialism",
            "marks": 11,
            "subsections": [
              "Major ideas of existentialism",
              "Contributions of Kierkegaard, Nietzsche, and Sartre"
            ]
          },
          {
            "section": "Islamic Philosophy",
            "marks": 13,
            "subsections": [
              "Contributions of Al-Farabi",
              "Contributions of Ibn Sina (Avicenna)",
              "Contributions of Al-Ghazali",
              "Contributions of Ibn Rushd (Averroes)"
            ]
          },
          {
            "section": "Logic",
            "marks": 11,
            "subsections": [
              "Basic principles of logic",
              "Deductive and inductive reasoning",
              "Logical fallacies"
            ]
          },
          {
            "section": "Ethics",
            "marks": 9,
            "subsections": [
              "Concepts of good and evil",
              "Moral philosophy",
              "Major ethical theories"
            ]
          }
        ]
      }
    ]
  },
  {
    "group": 7,
    "name": "Group VII",
    "selectionCriteria": "Select one subject - 100 marks",
    "subjects": [
      {
        "id": "journalism-mass-communication",
        "name": "Journalism & Mass Communication",
        "marks": 100,
        "icon": "📰",
        "color": "from-rose-600 to-red-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Introduction to Mass Communication",
            "marks": 10,
            "subsections": [
              "Definition and scope of mass communication",
              "Functions of mass media",
              "Types of mass media (print, electronic, digital)"
            ]
          },
          {
            "section": "History of Journalism",
            "marks": 11,
            "subsections": [
              "Development of journalism in the world",
              "Evolution of journalism in the subcontinent",
              "Development of journalism in Pakistan"
            ]
          },
          {
            "section": "News and Reporting",
            "marks": 12,
            "subsections": [
              "Definition and elements of news",
              "News values and news sources",
              "Reporting techniques",
              "Interviewing skills"
            ]
          },
          {
            "section": "Editing and News Writing",
            "marks": 11,
            "subsections": [
              "Principles of editing",
              "Headline writing",
              "Structure of news stories",
              "Editorial writing"
            ]
          },
          {
            "section": "Communication Theories",
            "marks": 12,
            "subsections": [
              "Hypodermic needle theory",
              "Two-step flow theory",
              "Agenda-setting theory",
              "Uses and gratifications theory"
            ]
          },
          {
            "section": "Media Ethics and Laws",
            "marks": 11,
            "subsections": [
              "Ethical standards in journalism",
              "Freedom of the press",
              "Media laws and regulations"
            ]
          },
          {
            "section": "Public Relations and Advertising",
            "marks": 11,
            "subsections": [
              "Concept of public relations",
              "Role of advertising in media",
              "Communication strategies"
            ]
          },
          {
            "section": "Electronic and Digital Media",
            "marks": 11,
            "subsections": [
              "Television and radio broadcasting",
              "Online journalism and social media",
              "Impact of digital media on communication"
            ]
          },
          {
            "section": "Media and Society",
            "marks": 11,
            "subsections": [
              "Role of media in shaping public opinion",
              "Media and democracy",
              "Media influence on culture and politics"
            ]
          }
        ]
      },
      {
        "id": "psychology",
        "name": "Psychology",
        "marks": 100,
        "icon": "💭",
        "color": "from-purple-600 to-pink-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Introduction to Psychology",
            "marks": 10,
            "subsections": [
              "Definition and scope of psychology",
              "Historical development of psychology",
              "Branches of psychology",
              "Methods of psychological research"
            ]
          },
          {
            "section": "Biological Basis of Behavior",
            "marks": 11,
            "subsections": [
              "Structure and functions of the nervous system",
              "Brain and its functions",
              "Hormones and behavior"
            ]
          },
          {
            "section": "Sensation and Perception",
            "marks": 11,
            "subsections": [
              "Sensory processes",
              "Perception and interpretation of stimuli",
              "Factors affecting perception"
            ]
          },
          {
            "section": "Learning",
            "marks": 12,
            "subsections": [
              "Classical conditioning",
              "Operant conditioning",
              "Observational learning",
              "Cognitive learning theories"
            ]
          },
          {
            "section": "Memory",
            "marks": 11,
            "subsections": [
              "Types of memory",
              "Processes of memory (encoding, storage, retrieval)",
              "Forgetting and memory improvement"
            ]
          },
          {
            "section": "Motivation and Emotion",
            "marks": 11,
            "subsections": [
              "Theories of motivation",
              "Biological and psychological motives",
              "Nature and expression of emotions"
            ]
          },
          {
            "section": "Personality",
            "marks": 12,
            "subsections": [
              "Theories of personality",
              "Personality development",
              "Assessment of personality"
            ]
          },
          {
            "section": "Intelligence",
            "marks": 11,
            "subsections": [
              "Concepts and theories of intelligence",
              "Intelligence testing",
              "Factors affecting intelligence"
            ]
          },
          {
            "section": "Social Psychology",
            "marks": 11,
            "subsections": [
              "Social behavior and attitudes",
              "Group dynamics",
              "Social influence and conformity"
            ]
          }
        ]
      },
      {
        "id": "geography",
        "name": "Geography",
        "marks": 100,
        "icon": "🌍",
        "color": "from-green-600 to-teal-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Paper I - Introduction to Geography",
            "marks": 20,
            "subsections": [
              "Definition and scope of geography",
              "Branches of geography",
              "Importance of geographical studies"
            ]
          },
          {
            "section": "Paper I - The Earth",
            "marks": 20,
            "subsections": [
              "Origin and structure of the Earth",
              "Latitude and longitude",
              "Time zones and map projections"
            ]
          },
          {
            "section": "Paper I - Geomorphology",
            "marks": 20,
            "subsections": [
              "Landforms and their formation",
              "Weathering and erosion",
              "Rivers, glaciers, and deserts"
            ]
          },
          {
            "section": "Paper I - Climatology",
            "marks": 20,
            "subsections": [
              "Structure of the atmosphere",
              "Weather and climate",
              "Global wind systems",
              "Climate change and global warming"
            ]
          },
          {
            "section": "Paper I - Oceanography",
            "marks": 20,
            "subsections": [
              "Physical characteristics of oceans",
              "Ocean currents",
              "Tides and waves",
              "Marine resources"
            ]
          },
          {
            "section": "Paper II - Human Geography",
            "marks": 20,
            "subsections": [
              "Population distribution and growth",
              "Migration and urbanization",
              "Cultural geography"
            ]
          },
          {
            "section": "Paper II - Economic Geography",
            "marks": 20,
            "subsections": [
              "Agriculture and food production",
              "Industrial development",
              "Transportation and trade"
            ]
          },
          {
            "section": "Paper II - Political Geography",
            "marks": 20,
            "subsections": [
              "Concept of political geography",
              "Boundaries and geopolitics",
              "Role of geography in international relations"
            ]
          },
          {
            "section": "Paper II - Environmental Geography",
            "marks": 20,
            "subsections": [
              "Human impact on the environment",
              "Resource management",
              "Sustainable development"
            ]
          },
          {
            "section": "Paper II - Geography of Pakistan",
            "marks": 20,
            "subsections": [
              "Physical geography of Pakistan",
              "Climate and natural resources",
              "Population and economic activities"
            ]
          }
        ]
      },
      {
        "id": "sociology",
        "name": "Sociology",
        "marks": 100,
        "icon": "👥",
        "color": "from-cyan-600 to-teal-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Introduction to Sociology",
            "marks": 10,
            "subsections": [
              "Definition and scope of sociology",
              "Development of sociology as a discipline",
              "Relationship of sociology with other social sciences"
            ]
          },
          {
            "section": "Sociological Theories",
            "marks": 13,
            "subsections": [
              "Functionalism",
              "Conflict theory",
              "Symbolic interactionism",
              "Contributions of Auguste Comte",
              "Contributions of Karl Marx",
              "Contributions of Emile Durkheim",
              "Contributions of Max Weber"
            ]
          },
          {
            "section": "Social Structure",
            "marks": 10,
            "subsections": [
              "Components of social structure",
              "Social status and roles",
              "Social groups and organizations"
            ]
          },
          {
            "section": "Culture",
            "marks": 11,
            "subsections": [
              "Elements of culture",
              "Cultural values and norms",
              "Cultural change and diversity"
            ]
          },
          {
            "section": "Socialization",
            "marks": 11,
            "subsections": [
              "Process of socialization",
              "Agents of socialization (family, education, media)",
              "Importance of socialization in personality development"
            ]
          },
          {
            "section": "Social Institutions",
            "marks": 12,
            "subsections": [
              "Family",
              "Religion",
              "Education",
              "Economy",
              "Political institutions"
            ]
          },
          {
            "section": "Social Stratification",
            "marks": 11,
            "subsections": [
              "Concept of social inequality",
              "Class system and caste system",
              "Social mobility"
            ]
          },
          {
            "section": "Social Change",
            "marks": 11,
            "subsections": [
              "Causes of social change",
              "Modernization and globalization",
              "Impact of technological development on society"
            ]
          },
          {
            "section": "Sociological Issues in Pakistan",
            "marks": 11,
            "subsections": [
              "Population growth",
              "Urbanization",
              "Poverty and inequality",
              "Social problems in Pakistani society"
            ]
          }
        ]
      },
      {
        "id": "anthropology",
        "name": "Anthropology",
        "marks": 100,
        "icon": "🗿",
        "color": "from-amber-600 to-orange-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Introduction to Anthropology",
            "marks": 10,
            "subsections": [
              "Definition and scope of anthropology",
              "Branches of anthropology",
              "Importance of anthropological studies"
            ]
          },
          {
            "section": "Biological Anthropology",
            "marks": 12,
            "subsections": [
              "Human evolution",
              "Human biological variation",
              "Genetics and inheritance",
              "Adaptation to different environments"
            ]
          },
          {
            "section": "Cultural Anthropology",
            "marks": 11,
            "subsections": [
              "Concept of culture",
              "Cultural patterns and diversity",
              "Cultural change and diffusion"
            ]
          },
          {
            "section": "Social Organization",
            "marks": 11,
            "subsections": [
              "Kinship systems",
              "Marriage and family structures",
              "Social groups and institutions"
            ]
          },
          {
            "section": "Economic and Political Systems",
            "marks": 11,
            "subsections": [
              "Traditional economic systems",
              "Exchange and trade in societies",
              "Political organization in different cultures"
            ]
          },
          {
            "section": "Religion and Belief Systems",
            "marks": 11,
            "subsections": [
              "Role of religion in society",
              "Types of religious beliefs and rituals",
              "Anthropology of religion"
            ]
          },
          {
            "section": "Archaeology",
            "marks": 11,
            "subsections": [
              "Study of ancient human societies",
              "Archaeological methods and discoveries",
              "Importance of archaeological evidence"
            ]
          },
          {
            "section": "Applied Anthropology",
            "marks": 11,
            "subsections": [
              "Use of anthropology in development and policy",
              "Anthropology in health, education, and social planning"
            ]
          },
          {
            "section": "Anthropology in Pakistan",
            "marks": 12,
            "subsections": [
              "Cultural diversity in Pakistan",
              "Ethnic groups and traditions",
              "Anthropological studies of Pakistani society"
            ]
          }
        ]
      },
      {
        "id": "punjabi",
        "name": "Punjabi",
        "marks": 100,
        "icon": "📖",
        "color": "from-yellow-600 to-amber-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Punjabi Language",
            "marks": 14,
            "subsections": [
              "Historical background of Punjabi",
              "Linguistic characteristics of Punjabi",
              "Development of Punjabi literature"
            ]
          },
          {
            "section": "Classical Punjabi Poetry",
            "marks": 15,
            "subsections": [
              "Study of Shah Hussain and his works",
              "Study of Sultan Bahu and his works",
              "Study of Bulleh Shah and his works",
              "Study of Waris Shah and his works",
              "Themes: Mysticism",
              "Themes: Love and human values",
              "Themes: Social and cultural reflections"
            ]
          },
          {
            "section": "Punjabi Folk Literature",
            "marks": 14,
            "subsections": [
              "Folk poetry and folk songs",
              "Folktales and legends",
              "Cultural traditions in Punjabi folklore"
            ]
          },
          {
            "section": "Modern Punjabi Literature",
            "marks": 15,
            "subsections": [
              "Development of modern Punjabi literature and its themes",
              "Major poets: Mian Muhammad Bakhsh",
              "Major poets: Baba Farid",
              "Major writers: Amrita Pritam"
            ]
          },
          {
            "section": "Punjabi Prose",
            "marks": 14,
            "subsections": [
              "Development of Punjabi prose",
              "Essays and short stories",
              "Novels",
              "Drama"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 14,
            "subsections": [
              "Principles of literary criticism in Punjabi literature",
              "Contributions of major Punjabi critics"
            ]
          },
          {
            "section": "Punjabi Literature in Pakistan",
            "marks": 14,
            "subsections": [
              "Development of Punjabi literature after independence",
              "Cultural significance of Punjabi literature"
            ]
          }
        ]
      },
      {
        "id": "sindhi",
        "name": "Sindhi",
        "marks": 100,
        "icon": "📜",
        "color": "from-lime-600 to-green-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Sindhi Language",
            "marks": 14,
            "subsections": [
              "Historical background of Sindhi language",
              "Linguistic characteristics of Sindhi",
              "Evolution of Sindhi literature"
            ]
          },
          {
            "section": "Classical Sindhi Poetry",
            "marks": 15,
            "subsections": [
              "Study of Shah Abdul Latif Bhittai and his works",
              "Study of Sachal Sarmast and his works",
              "Study of Sami and his works",
              "Themes: Mysticism",
              "Themes: Love and devotion",
              "Themes: Spiritual philosophy"
            ]
          },
          {
            "section": "Sindhi Folk Literature",
            "marks": 14,
            "subsections": [
              "Folk songs and poetry",
              "Folktales and legends",
              "Cultural traditions reflected in Sindhi folklore"
            ]
          },
          {
            "section": "Modern Sindhi Literature",
            "marks": 15,
            "subsections": [
              "Development of modern Sindhi literature and its themes",
              "Major writer: Shaikh Ayaz",
              "Major writer: Mirza Qaleech Beg"
            ]
          },
          {
            "section": "Sindhi Prose",
            "marks": 14,
            "subsections": [
              "Development of Sindhi prose",
              "Essays and short stories",
              "Novels",
              "Drama"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 14,
            "subsections": [
              "Principles of literary criticism in Sindhi literature",
              "Contributions of major Sindhi critics"
            ]
          },
          {
            "section": "Sindhi Literature in Pakistan",
            "marks": 14,
            "subsections": [
              "Development of Sindhi literature after independence",
              "Role of Sindhi literature in cultural preservation"
            ]
          }
        ]
      },
      {
        "id": "pashto",
        "name": "Pashto",
        "marks": 100,
        "icon": "🎭",
        "color": "from-blue-600 to-cyan-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Pashto Language",
            "marks": 14,
            "subsections": [
              "Historical background of Pashto",
              "Linguistic characteristics of the Pashto language",
              "Development of Pashto literature"
            ]
          },
          {
            "section": "Classical Pashto Poetry",
            "marks": 15,
            "subsections": [
              "Study of Khushal Khan Khattak and his works",
              "Study of Rehman Baba and his works",
              "Study of Hamza Baba and his works",
              "Themes: Mysticism",
              "Themes: Courage and honor",
              "Themes: Social and cultural values"
            ]
          },
          {
            "section": "Pashto Folk Literature",
            "marks": 14,
            "subsections": [
              "Folk songs and poetry",
              "Folktales and legends",
              "Cultural traditions reflected in Pashto folklore"
            ]
          },
          {
            "section": "Modern Pashto Literature",
            "marks": 15,
            "subsections": [
              "Development of modern Pashto literature and its themes",
              "Major writer: Ghani Khan",
              "Major writer: Hamza Shinwari"
            ]
          },
          {
            "section": "Pashto Prose",
            "marks": 14,
            "subsections": [
              "Development of Pashto prose",
              "Essays and short stories",
              "Novels",
              "Drama"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 14,
            "subsections": [
              "Principles of literary criticism in Pashto literature",
              "Contributions of major Pashto critics"
            ]
          },
          {
            "section": "Pashto Literature in Pakistan",
            "marks": 14,
            "subsections": [
              "Development of Pashto literature after independence",
              "Cultural significance of Pashto literature"
            ]
          }
        ]
      },
      {
        "id": "balochi",
        "name": "Balochi",
        "marks": 100,
        "icon": "🏜️",
        "color": "from-orange-600 to-yellow-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Balochi Language",
            "marks": 14,
            "subsections": [
              "Historical background of the Balochi language",
              "Linguistic characteristics of Balochi",
              "Evolution of Balochi literature"
            ]
          },
          {
            "section": "Classical Balochi Poetry",
            "marks": 15,
            "subsections": [
              "Study of Jam Durrak and his works",
              "Study of Mast Tawakali and his works",
              "Study of Gul Khan Naseer and his works",
              "Themes: Heroism and tribal traditions",
              "Themes: Love and mysticism",
              "Themes: Cultural values of Baloch society"
            ]
          },
          {
            "section": "Balochi Folk Literature",
            "marks": 14,
            "subsections": [
              "Folk poetry and folk songs",
              "Folktales and legends",
              "Oral traditions in Balochi culture"
            ]
          },
          {
            "section": "Modern Balochi Literature",
            "marks": 15,
            "subsections": [
              "Development of modern Balochi literature and its themes",
              "Major writer: Atta Shad",
              "Major writer: Gul Khan Naseer"
            ]
          },
          {
            "section": "Balochi Prose",
            "marks": 14,
            "subsections": [
              "Development of Balochi prose",
              "Essays and short stories",
              "Novels",
              "Drama"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 14,
            "subsections": [
              "Principles of literary criticism in Balochi literature",
              "Contributions of major Balochi critics"
            ]
          },
          {
            "section": "Balochi Literature in Pakistan",
            "marks": 14,
            "subsections": [
              "Development of Balochi literature after independence",
              "Cultural and literary importance of the Balochi language"
            ]
          }
        ]
      },
      {
        "id": "persian",
        "name": "Persian",
        "marks": 100,
        "icon": "📚",
        "color": "from-indigo-600 to-purple-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Persian Language",
            "marks": 14,
            "subsections": [
              "Historical development of Persian language",
              "Influence of Persian on other languages",
              "Importance of Persian literature in Islamic civilization"
            ]
          },
          {
            "section": "Classical Persian Poetry",
            "marks": 15,
            "subsections": [
              "Study of Firdawsi and his literary works",
              "Study of Saadi and his literary works",
              "Study of Hafiz Shirazi and his literary works",
              "Study of Jalaluddin Rumi and his literary works",
              "Study of Umar Khayyam and his literary works",
              "Themes: Mysticism",
              "Themes: Love and spirituality",
              "Themes: Moral philosophy"
            ]
          },
          {
            "section": "Persian Prose",
            "marks": 14,
            "subsections": [
              "Development of Persian prose",
              "Historical writings",
              "Essays and biographical works",
              "Religious literature"
            ]
          },
          {
            "section": "Persian Literary Forms",
            "marks": 14,
            "subsections": [
              "Ghazal",
              "Masnavi",
              "Rubai",
              "Qasida"
            ]
          },
          {
            "section": "Modern Persian Literature",
            "marks": 14,
            "subsections": [
              "Development of modern Persian literature",
              "Modern literary trends and writers"
            ]
          },
          {
            "section": "Translation",
            "marks": 14,
            "subsections": [
              "Translation of Persian passages into English or Urdu",
              "Understanding and interpretation of classical texts"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 15,
            "subsections": [
              "Principles of literary criticism in Persian literature",
              "Contributions of major Persian scholars"
            ]
          }
        ]
      },
      {
        "id": "arabic",
        "name": "Arabic",
        "marks": 100,
        "icon": "🕌",
        "color": "from-red-600 to-rose-600",
        "progress": 0,
        "syllabus": [
          {
            "section": "Origin and Development of Arabic Language",
            "marks": 12,
            "subsections": [
              "Historical development of Arabic",
              "Importance of Arabic in Islamic civilization",
              "Influence of Arabic language on other languages"
            ]
          },
          {
            "section": "Classical Arabic Literature",
            "marks": 15,
            "subsections": [
              "Study of Imru' al-Qais and his works",
              "Study of Al-Mutanabbi and his works",
              "Study of Abu Tammam and his works",
              "Themes: Heroism",
              "Themes: Love",
              "Themes: Wisdom and philosophy"
            ]
          },
          {
            "section": "Arabic Prose",
            "marks": 13,
            "subsections": [
              "Development of Arabic prose",
              "Essays and historical writings",
              "Religious literature",
              "Prominent writer: Al-Jahiz",
              "Prominent writer: Ibn Khaldun"
            ]
          },
          {
            "section": "Arabic Poetry",
            "marks": 13,
            "subsections": [
              "Major poetic form: Qasida",
              "Major poetic form: Ghazal",
              "Major poetic form: Marsiya"
            ]
          },
          {
            "section": "Arabic Grammar",
            "marks": 12,
            "subsections": [
              "Basic principles of Arabic grammar",
              "Sentence structure",
              "Morphology"
            ]
          },
          {
            "section": "Modern Arabic Literature",
            "marks": 12,
            "subsections": [
              "Development of modern Arabic literature",
              "Major modern writers and literary trends"
            ]
          },
          {
            "section": "Translation",
            "marks": 12,
            "subsections": [
              "Translation of Arabic passages into English or Urdu",
              "Understanding and interpretation of classical Arabic texts"
            ]
          },
          {
            "section": "Literary Criticism",
            "marks": 11,
            "subsections": [
              "Principles of literary criticism in Arabic literature",
              "Contributions of major Arabic scholars"
            ]
          }
        ]
      }
    ]
  }
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

export const subjectBooksHierarchy: Record<string, any> = {
  "english-essay": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-essay-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "english-essay-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "english-essay-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "english-essay-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-essay-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "english-essay-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "english-precis": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-precis-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "english-precis-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "english-precis-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "english-precis-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-precis-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "english-precis-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "general-science": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "general-science-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "general-science-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "general-science-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "current-affairs-comp": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "current-affairs-comp-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "current-affairs-comp-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "current-affairs-comp-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "pakistan-affairs": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pakistan-affairs-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "pakistan-affairs-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "pakistan-affairs-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "pakistan-affairs-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pakistan-affairs-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "pakistan-affairs-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "islamic-studies": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "islamic-studies-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "islamic-studies-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "islamic-studies-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "accountancy-auditing": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "accountancy-auditing-rec-p1-1",
                "name": "Accounting Principles (Free Alternative: Intermediate Accounting)",
                "author": "OpenStax (Free) | Original: Kieso, Weygandt & Warfield",
                "pdfUrl": "https://openstax.org/details/books/accounting-principles",
                "downloadUrl": "https://openstax.org/details/books/accounting-principles"
              },
              {
                "id": "accountancy-auditing-rec-p1-2",
                "name": "Introductory Accounting I (Free Alternative: Fundamentals of Accounting)",
                "author": "Lumen Learning (Free) | Original: Wild, Larson & Chiappetta",
                "pdfUrl": "https://courses.lumenlearning.com/intro-accounting/",
                "downloadUrl": "https://courses.lumenlearning.com/intro-accounting/"
              },
              {
                "id": "accountancy-auditing-rec-p1-3",
                "name": "Financial Accounting (Free Alternative: Accounting for Decision Making)",
                "author": "LibreTexts (Free) | Original: Meigs, William & Haka",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Financial_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Financial_Accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-4",
                "name": "IFRSs / IASs (International Standards)",
                "author": "IFRS Foundation & ICAP/IFAC",
                "pdfUrl": "https://www.ifrs.org/",
                "downloadUrl": "https://www.ifrs.org/"
              },
              {
                "id": "accountancy-auditing-rec-p1-5",
                "name": "Principles of Accounting (Free: Book Keeping Fundamentals)",
                "author": "OpenStax (Free) | Original: B.G. Vickery",
                "pdfUrl": "https://openstax.org/details/books/principles-accounting",
                "downloadUrl": "https://openstax.org/details/books/principles-accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-6",
                "name": "Introductory Financial Accounting",
                "author": "LibreTexts (Free Community) | Original: M. Hanif & A. Mukherjee",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Introductory_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Introductory_Accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-7",
                "name": "Advanced Accounting (Free Alternative)",
                "author": "OpenStax (Free) | Original: Sohail Afzal",
                "pdfUrl": "https://openstax.org/details/books/principles-accounting",
                "downloadUrl": "https://openstax.org/details/books/principles-accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-8",
                "name": "Accounting Fundamentals",
                "author": "LibreTexts (Free) | Original: M.A. Ghani & Ejaz",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Introductory_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Introductory_Accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-9",
                "name": "Cost Accounting – Planning and Control",
                "author": "LibreTexts (Free) | Original: Usry, Hammer & Matz",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-10",
                "name": "Managerial Accounting",
                "author": "OpenStax (Free) | Original: Brewer, Garrison & Noreen",
                "pdfUrl": "https://openstax.org/details/books/managerial-accounting",
                "downloadUrl": "https://openstax.org/details/books/managerial-accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-11",
                "name": "Cost Accounting (Advanced)",
                "author": "LibreTexts (Free) | Original: Jain & Narang",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting"
              },
              {
                "id": "accountancy-auditing-rec-p1-12",
                "name": "Cost Accounting (Free Alternative)",
                "author": "LibreTexts (Free) | Original: Nisar-ud-Din",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Cost_Accounting"
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "accountancy-auditing-rec-p2-1",
                "name": "Auditing: Principles and Techniques (Free Alternative: Official Standards)",
                "author": "PCAOB/IAASB (Free) | Original: S.K. Basu",
                "pdfUrl": "https://pcaobus.org/standards",
                "downloadUrl": "https://pcaobus.org/standards"
              },
              {
                "id": "accountancy-auditing-rec-p2-2",
                "name": "International Auditing Standards",
                "author": "IAASB (Free) | Original: L.R. Dicksee",
                "pdfUrl": "https://www.iaasb.org/",
                "downloadUrl": "https://www.iaasb.org/"
              },
              {
                "id": "accountancy-auditing-rec-p2-3",
                "name": "AICPA Professional Auditing Guidance",
                "author": "AICPA (Free Resources) | Original: Spicer & Pegler",
                "pdfUrl": "https://www.aicpa.org/",
                "downloadUrl": "https://www.aicpa.org/"
              },
              {
                "id": "accountancy-auditing-rec-p2-4",
                "name": "Companies Ordinance 1984 (Pakistan)",
                "author": "SECP (Pakistan) - Official",
                "pdfUrl": "https://www.secp.gov.pk/",
                "downloadUrl": "https://www.secp.gov.pk/"
              },
              {
                "id": "accountancy-auditing-rec-p2-5",
                "name": "Auditing Standards (Free Reference)",
                "author": "IAASB/PCAOB (Free) | Original: S.K. Millichamp",
                "pdfUrl": "https://www.iaasb.org/",
                "downloadUrl": "https://www.iaasb.org/"
              },
              {
                "id": "accountancy-auditing-rec-p2-6",
                "name": "International Quality Control & Assurance Standards",
                "author": "IAASB (Free) | Original: ICAP/IFAC",
                "pdfUrl": "https://www.iaasb.org/",
                "downloadUrl": "https://www.iaasb.org/"
              },
              {
                "id": "accountancy-auditing-rec-p2-7",
                "name": "Auditing Standards & Procedures",
                "author": "PCAOB/IAASB (Free) | Original: M. Irshad",
                "pdfUrl": "https://pcaobus.org/standards",
                "downloadUrl": "https://pcaobus.org/standards"
              },
              {
                "id": "accountancy-auditing-rec-p2-8",
                "name": "Advanced Auditing Techniques",
                "author": "AICPA (Free Resources) | Original: Khawaja Amjad Saeed",
                "pdfUrl": "https://www.aicpa.org/cpe-learning",
                "downloadUrl": "https://www.aicpa.org/cpe-learning"
              },
              {
                "id": "accountancy-auditing-rec-p2-9",
                "name": "Income Tax Ordinance 2001 (Pakistan - Official)",
                "author": "FBR (Pakistan) - Official Document",
                "pdfUrl": "https://www.fbr.gov.pk/",
                "downloadUrl": "https://www.fbr.gov.pk/"
              },
              {
                "id": "accountancy-auditing-rec-p2-10",
                "name": "Introduction to Taxation (Free Course)",
                "author": "Lumen Learning (Free) | Original: Mirza Munawar Hussain",
                "pdfUrl": "https://courses.lumenlearning.com/waymaker-taxation/",
                "downloadUrl": "https://courses.lumenlearning.com/waymaker-taxation/"
              },
              {
                "id": "accountancy-auditing-rec-p2-11",
                "name": "Taxation Fundamentals",
                "author": "LibreTexts (Free) | Original: Abdul Razzaq",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Taxation",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Taxation"
              },
              {
                "id": "accountancy-auditing-rec-p2-12",
                "name": "Business Taxation",
                "author": "LibreTexts (Free) | Original: Ijaz Ali Waince",
                "pdfUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Taxation",
                "downloadUrl": "https://biz.libretexts.org/Bookshelves/Accounting/Taxation"
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "accountancy-auditing-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "accountancy-auditing-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "economics": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "economics-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "economics-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "economics-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "economics-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "economics-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "economics-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "computer-science": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "computer-science-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "computer-science-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "computer-science-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "computer-science-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "computer-science-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "computer-science-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "political-science": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "political-science-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "political-science-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "political-science-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "international-relations": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "international-relations-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "international-relations-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "international-relations-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "physics": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "physics-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "physics-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "physics-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "chemistry": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "chemistry-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "chemistry-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "chemistry-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "mathematics": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "mathematics-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "mathematics-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "mathematics-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "pure-mathematics": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pure-mathematics-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "pure-mathematics-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pure-mathematics-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "statistics": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "statistics-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "statistics-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "statistics-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "geology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "geology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "geology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "geology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "business-administration": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "business-administration-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "business-administration-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "business-administration-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "public-administration": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "public-administration-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "public-administration-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "public-administration-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "governance": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "governance-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "governance-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "governance-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "town-planning-urban-management": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "town-planning-urban-management-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "town-planning-urban-management-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "town-planning-urban-management-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "history-pakistan-india": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "history-pakistan-india-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "history-pakistan-india-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "history-pakistan-india-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "history-pakistan-india-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "history-pakistan-india-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "history-pakistan-india-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "islamic-history-culture": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "islamic-history-culture-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "islamic-history-culture-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "islamic-history-culture-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "british-history": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "british-history-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "british-history-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "british-history-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "british-history-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "british-history-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "british-history-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "european-history": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "european-history-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "european-history-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "european-history-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "european-history-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "european-history-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "european-history-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "history-usa": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "history-usa-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "history-usa-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "history-usa-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "history-usa-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "history-usa-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "history-usa-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "gender-studies": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "gender-studies-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "gender-studies-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "gender-studies-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "environmental-science": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "environmental-science-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "environmental-science-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "environmental-science-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "agriculture-forestry": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "agriculture-forestry-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "agriculture-forestry-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "agriculture-forestry-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "botany": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "botany-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "botany-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "botany-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "zoology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "zoology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "zoology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "zoology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "english-literature": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-literature-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "english-literature-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "english-literature-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "urdu-literature": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "urdu-literature-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "urdu-literature-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "urdu-literature-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "law": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "law-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "law-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "law-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "constitutional-law": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "constitutional-law-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "constitutional-law-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "constitutional-law-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "constitutional-law-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "constitutional-law-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "constitutional-law-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "international-law": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "international-law-rec-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "international-law-rec-p1-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "international-law-rec-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "international-law-rec-p2-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "international-law-sug-p1-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          },
          {
            "paperName": "Paper II",
            "books": [
              {
                "id": "international-law-sug-p2-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "muslim-law-jurisprudence": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "muslim-law-jurisprudence-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "muslim-law-jurisprudence-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "muslim-law-jurisprudence-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "mercantile-law": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "mercantile-law-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "mercantile-law-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "mercantile-law-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "criminology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "criminology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "criminology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "criminology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "philosophy": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "philosophy-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "philosophy-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "philosophy-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "journalism-mass-communication": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "journalism-mass-communication-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "journalism-mass-communication-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "journalism-mass-communication-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "psychology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "psychology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "psychology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "psychology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "geography": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "geography-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "geography-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "geography-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "sociology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "sociology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "sociology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "sociology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "anthropology": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "anthropology-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "anthropology-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "anthropology-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "punjabi": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "punjabi-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "punjabi-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "punjabi-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "sindhi": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "sindhi-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "sindhi-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "sindhi-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "pashto": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pashto-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "pashto-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "pashto-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "balochi": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "balochi-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "balochi-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "balochi-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "persian": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "persian-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "persian-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "persian-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "arabic": {
    "isHierarchical": true,
    "categories": [
      {
        "name": "Recommended Books",
        "color": "bg-green-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "arabic-rec-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              },
              {
                "id": "arabic-rec-2",
                "name": "Book Name - Placeholder 2",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      },
      {
        "name": "Suggested Books",
        "color": "bg-blue-500",
        "papers": [
          {
            "paperName": "Paper I",
            "books": [
              {
                "id": "arabic-sug-1",
                "name": "Book Name - Placeholder 1",
                "author": "",
                "pdfUrl": "",
                "downloadUrl": ""
              }
            ]
          }
        ]
      }
    ]
  }
};

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
