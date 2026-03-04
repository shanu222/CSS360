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
  },
];

export const optionalGroups = [
  {
    group: 1,
    subjects: [
      { id: "economics", name: "Economics", marks: 200, icon: "📊", color: "bg-purple-500", progress: 40 },
      { id: "political-science", name: "Political Science", marks: 200, icon: "🏛️", color: "bg-blue-600", progress: 25 },
      { id: "computer-science", name: "Computer Science", marks: 200, icon: "💻", color: "bg-cyan-500", progress: 60 },
      { id: "international-relations", name: "International Relations", marks: 200, icon: "🌐", color: "bg-sky-500", progress: 55 },
    ],
  },
  {
    group: 2,
    subjects: [
      { id: "physics", name: "Physics", marks: 200, icon: "⚛️", color: "bg-red-500", progress: 15 },
      { id: "chemistry", name: "Chemistry", marks: 200, icon: "🧪", color: "bg-yellow-500", progress: 0 },
      { id: "mathematics", name: "Mathematics", marks: 200, icon: "∑", color: "bg-rose-500", progress: 0 },
    ],
  },
  {
    group: 3,
    subjects: [
      { id: "public-administration", name: "Public Administration", marks: 200, icon: "🏢", color: "bg-orange-500", progress: 70 },
      { id: "governance", name: "Governance & Public Policy", marks: 200, icon: "⚖️", color: "bg-amber-500", progress: 45 },
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
