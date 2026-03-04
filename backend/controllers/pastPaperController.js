import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAPERS_ROOT = path.join(__dirname, '../../CSS_Past_Papers');

const COMPULSORY_SUBJECTS = [
  { key: 'essay', folder: 'English_Essay', label: 'Essay' },
  { key: 'english_precis_and_composition', folder: 'English_Precis_and_Composition', label: 'English Precis & Composition' },
  { key: 'pakistan_affairs', folder: 'Pakistan_Affairs', label: 'Pakistan Affairs' },
  { key: 'current_affairs', folder: 'Current_Affairs', label: 'Current Affairs' },
  { key: 'general_science_and_ability', folder: 'General_Science_and_Ability', label: 'General Science & Ability' },
  { key: 'islamic_studies', folder: 'Islamic_Studies', label: 'Islamic Studies' },
];

const OPTIONAL_SUBJECTS = [
  { key: 'accountancy_and_auditing', folder: 'Accountancy_and_Auditing', label: 'Accountancy & Auditing' },
  { key: 'agriculture_and_forestry', folder: 'Agriculture_and_Forestry', label: 'Agriculture & Forestry' },
  { key: 'anthropology', folder: 'Anthropology', label: 'Anthropology' },
  { key: 'applied_mathematics', folder: 'Applied_Mathematics', label: 'Applied Mathematics' },
  { key: 'arabic', folder: 'Arabic', label: 'Arabic' },
  { key: 'balochi', folder: 'Balochi', label: 'Balochi' },
  { key: 'botany', folder: 'Botany', label: 'Botany' },
  { key: 'british_history', folder: 'British_History', label: 'British History' },
  { key: 'business_administration', folder: 'Business_Administration', label: 'Business Administration' },
  { key: 'chemistry', folder: 'Chemistry', label: 'Chemistry' },
  { key: 'comparative_study_of_major_religions', folder: 'Comparative_Study_of_Major_Religions', label: 'Comparative Study of Major Religions' },
  { key: 'computer_science', folder: 'Computer_Science', label: 'Computer Science' },
  { key: 'constitutional_law', folder: 'Constitutional_Law', label: 'Constitutional Law' },
  { key: 'criminology', folder: 'Criminology', label: 'Criminology' },
  { key: 'economics', folder: 'Economics', label: 'Economics' },
  { key: 'english_literature', folder: 'English_Literature', label: 'English Literature' },
  { key: 'environmental_science', folder: 'Environmental_Science', label: 'Environmental Science' },
  { key: 'european_history', folder: 'European_History', label: 'European History' },
  { key: 'gender_studies', folder: 'Gender_Studies', label: 'Gender Studies' },
  { key: 'geography', folder: 'Geography', label: 'Geography' },
  { key: 'geology', folder: 'Geology', label: 'Geology' },
  { key: 'governance_and_public_policies', folder: 'Governance_and_Public_Policies', label: 'Governance & Public Policies' },
  { key: 'history_of_pakistan_and_india', folder: 'History_of_Pakistan_and_India', label: 'History of Pakistan & India' },
  { key: 'history_of_usa', folder: 'History_of_USA', label: 'History of USA' },
  { key: 'international_law', folder: 'International_Law', label: 'International Law' },
  { key: 'international_relations', folder: 'International_Relations', label: 'International Relations' },
  { key: 'islamic_history_and_culture', folder: 'Islamic_History_and_Culture', label: 'Islamic History & Culture' },
  { key: 'journalism_and_mass_communication', folder: 'Journalism_and_Mass_Communication', label: 'Journalism & Mass Communication' },
  { key: 'law', folder: 'Law', label: 'Law' },
  { key: 'mercantile_law', folder: 'Mercantile_Law', label: 'Mercantile Law' },
  { key: 'muslim_law_and_jurisprudence', folder: 'Muslim_Law_and_Jurisprudence', label: 'Muslim Law & Jurisprudence' },
  { key: 'pashto', folder: 'Pashto', label: 'Pashto' },
  { key: 'persian', folder: 'Persian', label: 'Persian' },
  { key: 'philosophy', folder: 'Philosophy', label: 'Philosophy' },
  { key: 'physics', folder: 'Physics', label: 'Physics' },
  { key: 'political_science', folder: 'Political_Science', label: 'Political Science' },
  { key: 'psychology', folder: 'Psychology', label: 'Psychology' },
  { key: 'public_administration', folder: 'Public_Administration', label: 'Public Administration' },
  { key: 'punjabi', folder: 'Punjabi', label: 'Punjabi' },
  { key: 'pure_mathematics', folder: 'Pure_Mathematics', label: 'Pure Mathematics' },
  { key: 'sindhi', folder: 'Sindhi', label: 'Sindhi' },
  { key: 'sociology', folder: 'Sociology', label: 'Sociology' },
  { key: 'statistics', folder: 'Statistics', label: 'Statistics' },
  { key: 'town_planning_and_urban_management', folder: 'Town_Planning_and_Urban_Management', label: 'Town Planning & Urban Management' },
  { key: 'urdu_literature', folder: 'Urdu_Literature', label: 'Urdu Literature' },
  { key: 'zoology', folder: 'Zoology', label: 'Zoology' },
];

const scanSubjectFolder = (subjectPath, year, categoryType, subjectKey, subjectLabel) => {
  const papers = [];
  
  try {
    if (!fs.existsSync(subjectPath)) {
      return papers;
    }

    const files = fs.readdirSync(subjectPath);
    
    files.forEach(file => {
      const filePath = path.join(subjectPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && /\.(pdf|doc|docx)$/i.test(file)) {
        const relativePath = path.relative(PAPERS_ROOT, filePath).replace(/\\/g, '/');
        
        papers.push({
          _id: `${year}-${categoryType}-${subjectKey}-${file}`,
          title: file.replace(/\.(pdf|doc|docx)$/i, '').replace(/_/g, ' '),
          year,
          category: subjectLabel,
          categoryType,
          subjectKey,
          fileUrl: `/css-papers/${relativePath}`,
          fileType: path.extname(file).substring(1).toLowerCase(),
          fileSize: stats.size,
          fileName: file,
          solved: false, // Can be enhanced with keyword detection (e.g., "solved", "answers")
          views: 0,
          downloads: 0,
        });
      }
    });
  } catch (error) {
    console.error(`Error scanning ${subjectPath}:`, error.message);
  }

  return papers;
};

const scanYearFolder = (year) => {
  const yearPath = path.join(PAPERS_ROOT, `CSS${year}`);
  const result = {
    compulsory: {},
    optional: {},
  };

  COMPULSORY_SUBJECTS.forEach(subject => {
    result.compulsory[subject.key] = [];
  });

  OPTIONAL_SUBJECTS.forEach(subject => {
    result.optional[subject.key] = [];
  });

  if (!fs.existsSync(yearPath)) {
    return result;
  }

  // Scan compulsory subjects
  const compulsoryPath = path.join(yearPath, 'Compulsory_Papers');
  if (fs.existsSync(compulsoryPath)) {
    COMPULSORY_SUBJECTS.forEach(subject => {
      const subjectPath = path.join(compulsoryPath, subject.folder);
      const papers = scanSubjectFolder(subjectPath, year, 'compulsory', subject.key, subject.label);
      result.compulsory[subject.key] = papers;
    });
  }

  // Scan optional subjects
  const optionalPath = path.join(yearPath, 'Optional_Subjects');
  if (fs.existsSync(optionalPath)) {
    OPTIONAL_SUBJECTS.forEach(subject => {
      const subjectPath = path.join(optionalPath, subject.folder);
      const papers = scanSubjectFolder(subjectPath, year, 'optional', subject.key, subject.label);
      result.optional[subject.key] = papers;
    });
  }

  return result;
};

export const getPastPapersIndex = async (req, res) => {
  try {
    const startYear = 2016;
    const endYear = 2026;
    const index = {};

    for (let year = startYear; year <= endYear; year++) {
      index[year] = scanYearFolder(year);
    }

    // Calculate statistics
    let totalPapers = 0;
    let totalSolved = 0;

    Object.values(index).forEach(yearData => {
      Object.values(yearData.compulsory).forEach(papers => {
        totalPapers += papers.length;
        totalSolved += papers.filter(p => p.solved).length;
      });
      Object.values(yearData.optional).forEach(papers => {
        totalPapers += papers.length;
        totalSolved += papers.filter(p => p.solved).length;
      });
    });

    res.json({
      success: true,
      data: {
        index,
        stats: {
          totalPapers,
          totalSolved,
          yearsAvailable: Object.keys(index).filter(year => {
            const yearData = index[year];
            const hasCompulsory = Object.values(yearData.compulsory).some(papers => papers.length > 0);
            const hasOptional = Object.values(yearData.optional).some(papers => papers.length > 0);
            return hasCompulsory || hasOptional;
          }).length,
        },
      },
    });
  } catch (error) {
    console.error('Error indexing past papers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to index past papers',
      message: error.message,
    });
  }
};

export const getYearPapers = async (req, res) => {
  try {
    const { year } = req.params;
    const yearNum = parseInt(year);

    if (isNaN(yearNum) || yearNum < 2016 || yearNum > 2026) {
      return res.status(400).json({
        success: false,
        error: 'Invalid year. Must be between 2016 and 2026.',
      });
    }

    const yearData = scanYearFolder(yearNum);

    res.json({
      success: true,
      data: yearData,
    });
  } catch (error) {
    console.error(`Error getting papers for year ${req.params.year}:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to get papers for the specified year',
      message: error.message,
    });
  }
};
