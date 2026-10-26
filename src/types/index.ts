export type PageTab =
  | 'beranda'
  | 'petunjuk'
  | 'materi'
  | 'testimoni'
  | 'kontak'
  | 'tentang'
  | 'game';

export type ThemeId =
  | 'keluarga'
  | 'madrasah'
  | 'hobi'
  | 'profesi'
  | 'transportasi'
  | 'warna'
  | 'kegiatan'
  | 'tubuh'
  | 'waktu';

export type MateriSubTab =
  | 'mufrodat'
  | 'istima'
  | 'qiraah'
  | 'qowaid'
  | 'latihan';

export interface ThemeInfo {
  id: ThemeId;
  name: string;
  nameArabic: string;
  transliteration: string;
  icon: string;
  description: string;
  color: string;
}

export interface MufrodatItem {
  id: string;
  themeId: ThemeId;
  arabic: string;
  latin: string;
  indonesian: string;
  category?: string;
  icon?: string;
  emoji?: string;
  imageUrl?: string;
  exampleArabic?: string;
  exampleIndonesian?: string;
}

export interface IstimaQuestion {
  questionNumber: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface IstimaStory {
  id: string;
  themeId: ThemeId;
  title: string;
  titleArabic: string;
  durationSeconds: number;
  storyArabicFull: string;
  storyArabicCloze: string;
  storyTranslation: string;
  questions: IstimaQuestion[];
}

export interface QiraahGlossary {
  arabic: string;
  latin: string;
  meaning: string;
}

export interface QiraahQuestion {
  question: string;
  questionArabic?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QiraahItem {
  id: string;
  themeId: ThemeId;
  title: string;
  titleArabic: string;
  textArabic: string;
  textTranslation: string;
  glossary: QiraahGlossary[];
  questions: QiraahQuestion[];
}

export interface QowaidExercise {
  id: string;
  sentenceWithBlank: string;
  sentenceTranslation: string;
  targetPronounType: string;
  availableOptions: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QowaidTopic {
  id: string;
  themeId?: ThemeId;
  title: string;
  titleArabic: string;
  shortDescription: string;
  keyRulePoints: string[];
  pronounChart: {
    category: string;
    subCategory: string;
    arabic: string;
    latin: string;
    meaning: string;
    example: string;
    exampleMeaning: string;
  }[];
  interactiveExercises: QowaidExercise[];
}

export interface QuizQuestion {
  id: string;
  level: 'mudah' | 'sedang' | 'sulit';
  type: 'mufrodat' | 'istima' | 'qiraah' | 'qowaid';
  themeId?: ThemeId;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  avatarText: string;
  rating: number;
  comment: string;
  badge: string;
}

export interface DailyMufrodat {
  number: number;
  arabic: string;
  latin: string;
  indonesian: string;
  category: string;
  exampleArabic: string;
  exampleLatin: string;
  exampleIndonesian: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  username: string;
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  userId: string;
  completedThemes: string[];
  completedMufrodat: string[];
  completedIstima: string[];
  completedQiraah: string[];
  completedQowaid: string[];
  quizEasyScore: number;
  quizMediumScore: number;
  quizHardScore: number;
  gameHighScore: number;
  totalXp: number;
  studyStreakDays: number;
  lastActiveDate: string;
  updatedAt: string;
}
