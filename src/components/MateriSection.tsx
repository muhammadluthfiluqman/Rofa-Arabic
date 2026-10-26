import React, { useState, useEffect } from 'react';
import {
  ThemeId,
  MateriSubTab,
  MufrodatItem,
  IstimaStory,
  QiraahItem,
  QowaidTopic,
  QuizQuestion,
} from '../types';
import { THEMES_DATA } from '../data/themesData';
import { MUFRODAT_DATA } from '../data/mufrodatData';
import { ISTIMA_STORIES } from '../data/istimaData';
import { QIRAAH_DATA } from '../data/qiraahData';
import { QOWAID_TOPICS } from '../data/qowaidData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { MufrodatIconBadge } from './MufrodatIconBadge';
import { speakArabic, stopSpeech, playSoundEffect } from '../utils/speech';
import {
  getStoredProgress,
  toggleModuleCompletion,
  toggleThemeCompletion,
  markModuleCompleted,
  recordQuizScore,
  resetAllProgress,
  UserProgress,
} from '../utils/progress';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Headphones,
  FileText,
  BookmarkCheck,
  CheckCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Search,
  Sparkles,
  Check,
  X,
  Eye,
  EyeOff,
  Users,
  GraduationCap,
  Briefcase,
  Car,
  Palette,
  Calendar,
  HeartPulse,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

interface MateriSectionProps {
  initialThemeId?: ThemeId;
  initialSubTab?: MateriSubTab;
}

export const MateriSection: React.FC<MateriSectionProps> = ({
  initialThemeId = 'keluarga',
  initialSubTab = 'mufrodat',
}) => {
  const {
    markMufrodatLearned,
    markIstimaCompleted,
    markQiraahCompleted,
    markQowaidCompleted,
    recordQuizScore: recordAuthQuizScore,
    user,
    openProgressModal,
  } = useAuth();

  // Theme state
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>(initialThemeId);
  // Sub-tab state
  const [activeSubTab, setActiveSubTab] = useState<MateriSubTab>(initialSubTab);

  // User progress state linked to localStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => getStoredProgress());

  useEffect(() => {
    const handleProgressUpdate = () => {
      setUserProgress(getStoredProgress());
    };
    window.addEventListener('rofaarabic_progress_updated', handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);
    return () => {
      window.removeEventListener('rofaarabic_progress_updated', handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
    };
  }, []);

  // Mufrodat states
  const [searchMufrodat, setSearchMufrodat] = useState('');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeSpeakingWord, setActiveSpeakingWord] = useState<string | null>(null);

  // Istima' states
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioPlaybackRate, setAudioPlaybackRate] = useState(0.85);
  const [istimaAnswers, setIstimaAnswers] = useState<Record<string, number>>({});
  const [istimaSubmitted, setIstimaSubmitted] = useState<Record<string, boolean>>({});

  // Qira'ah states
  const [showTranslation, setShowTranslation] = useState(true);
  const [qiraahAnswers, setQiraahAnswers] = useState<Record<string, number>>({});
  const [qiraahSubmitted, setQiraahSubmitted] = useState(false);

  // Qowaid states
  const [qowaidSelectedSlot, setQowaidSelectedSlot] = useState<Record<string, string>>({});
  const [qowaidChecked, setQowaidChecked] = useState<Record<string, boolean>>({});

  // Latihan Soal states
  const [quizLevel, setQuizLevel] = useState<'mudah' | 'sedang' | 'sulit'>('mudah');
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<number, number>>({});
  const [quizIsFinished, setQuizIsFinished] = useState(false);

  // Stop speech when changing tab or theme
  useEffect(() => {
    stopSpeech();
    setIsAudioPlaying(false);
    setActiveSpeakingWord(null);
  }, [selectedThemeId, activeSubTab]);

  // Current active theme
  const currentTheme =
    THEMES_DATA.find((t) => t.id === selectedThemeId) || THEMES_DATA[0];

  // Filtered Mufrodat (30 items per theme)
  const themeMufrodat = MUFRODAT_DATA.filter((m) => m.themeId === selectedThemeId);
  const displayedMufrodat = themeMufrodat.filter((m) => {
    const q = searchMufrodat.toLowerCase().trim();
    return (
      !q ||
      m.indonesian.toLowerCase().includes(q) ||
      m.latin.toLowerCase().includes(q) ||
      m.arabic.includes(q) ||
      (m.category && m.category.toLowerCase().includes(q))
    );
  });

  // Istima' stories for the current theme (2 stories)
  const themeIstimaStories = ISTIMA_STORIES.filter(
    (s) => s.themeId === selectedThemeId
  );
  const currentStory: IstimaStory | undefined =
    themeIstimaStories[selectedStoryIndex] || themeIstimaStories[0];

  // Qira'ah text for current theme (1 paragraph with 3 comprehension questions)
  const currentQiraah: QiraahItem | undefined =
    QIRAAH_DATA.find((q) => q.themeId === selectedThemeId) || QIRAAH_DATA[0];

  // Qowaid Topic mapped to current theme
  const qowaidTopic: QowaidTopic =
    QOWAID_TOPICS.find((q) => q.themeId === selectedThemeId) || QOWAID_TOPICS[0];

  // Quiz questions filtered by level
  const currentLevelQuestions = QUIZ_QUESTIONS.filter((q) => q.level === quizLevel);

  // Pronunciation handler
  const handlePlayArabic = (text: string, identifier?: string) => {
    if (identifier) {
      setActiveSpeakingWord(identifier);
      markMufrodatLearned(identifier, selectedThemeId);
    }
    speakArabic(
      text,
      () => {
        if (identifier) setActiveSpeakingWord(identifier);
      },
      () => {
        setActiveSpeakingWord(null);
      },
      0.85
    );
  };

  // Istima' Audio Play/Pause handler
  const handleToggleIstimaAudio = () => {
    if (!currentStory) return;

    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      speakArabic(
        currentStory.storyArabicFull,
        () => setIsAudioPlaying(true),
        () => setIsAudioPlaying(false),
        audioPlaybackRate
      );
    }
  };

  // Helper theme icons mapping
  const renderThemeIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Users':
        return <Users className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Car':
        return <Car className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Calendar':
        return <Calendar className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  return (
    <div className="py-8 md:py-12 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#114040] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pusat Pembelajaran RofaArabic</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#114040] font-montserrat">
            Materi Pembelajaran Bahasa Arab
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Pilih dari 9 tema tematik berharakat dan 5 sub-modul interaktif untuk melatih
            kosakata, pendengaran, pemahaman teks, kaidah tata bahasa, dan evaluasi soal.
          </p>
        </div>

        {/* Selected Theme Badge Overview with Progress Toggle */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#114040] flex items-center justify-center font-bold">
              {renderThemeIcon(currentTheme.icon, 'w-6 h-6')}
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Tema Aktif</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {
                    ['mufrodat', 'istima', 'qiraah', 'qowaid'].filter(
                      (m) => userProgress.completedModules[`${currentTheme.id}_${m}`]
                    ).length
                  } / 4 Modul Selesai
                </span>
              </div>
              <div className="text-base font-bold text-[#114040]">
                {currentTheme.name}{' '}
                <span className="font-amiri text-lg font-bold text-[#EC853E] ml-1" dir="rtl">
                  ({currentTheme.nameArabic})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openProgressModal}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#114040] bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-1.5 transition-colors"
              title="Buka Dasbor Progres Belajar Lengkap"
            >
              <Award className="w-4 h-4 text-[#EC853E]" />
              <span className="hidden sm:inline">Dasbor Progres</span>
            </button>

            {/* Toggle Theme Completion Button */}
            <button
              onClick={() => {
                const isDone = toggleThemeCompletion(currentTheme.id);
                if (isDone) {
                  playSoundEffect('win');
                } else {
                  playSoundEffect('click');
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                userProgress.completedThemes[currentTheme.id]
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200'
              }`}
              title="Tandai seluruh modul tema ini telah dikuasai"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {userProgress.completedThemes[currentTheme.id]
                  ? 'Tema Selesai ✓'
                  : 'Tandai Tema Selesai'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 9 Themes Selector Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span>PILIH TEMA (9 TEMA LENGKAP):</span>
          <span className="text-teal-800">
            {Object.values(userProgress.completedThemes).filter(Boolean).length} dari 9 Tema Tuntas
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {THEMES_DATA.map((theme) => {
            const isSelected = theme.id === selectedThemeId;
            const completedCount = ['mufrodat', 'istima', 'qiraah', 'qowaid'].filter(
              (m) => userProgress.completedModules[`${theme.id}_${m}`]
            ).length;
            const isThemeCompleted =
              userProgress.completedThemes[theme.id] || completedCount === 4;

            return (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 shadow-sm focus:outline-none relative ${
                  isSelected
                    ? 'bg-[#114040] text-white border-[#114040] shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={isSelected ? 'text-[#EC853E]' : 'text-slate-400 group-hover:text-[#114040]'}>
                  {renderThemeIcon(theme.icon, 'w-4 h-4')}
                </span>
                <span>{theme.name}</span>
                <span
                  className={`font-amiri text-sm font-bold ${
                    isSelected ? 'text-amber-300' : 'text-slate-400'
                  }`}
                  dir="rtl"
                >
                  {theme.nameArabic}
                </span>

                {/* Progress Indicator Tag on each theme button */}
                {isThemeCompleted ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    ✓
                  </span>
                ) : completedCount > 0 ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#EC853E]/20 text-[#EC853E]">
                    {completedCount}/4
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Sub-Modules Navigation Tabs with Module Completion Indicators */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto w-full max-w-full touch-pan-x overscroll-contain">
        {[
          { id: 'mufrodat', label: 'Mufrodat (Kosakata)', arabic: 'المُفْرَدَاتُ', icon: BookOpen, count: '30 Kata' },
          { id: 'istima', label: "Istima' (Audio Cerita)", arabic: 'الاسْتِمَاعُ', icon: Headphones, count: '2 Audio' },
          { id: 'qiraah', label: "Qira'ah (Membaca Teks)", arabic: 'القِرَاءَةُ', icon: FileText, count: '1 Teks + Soal' },
          { id: 'qowaid', label: 'Qowaid (Kata Ganti / Dhamir)', arabic: 'القَوَاعِدُ', icon: BookmarkCheck, count: 'Teori & Latihan' },
          { id: 'latihan', label: 'Latihan Soal (3 Level)', arabic: 'التَّدْرِيْبَاتُ', icon: CheckCircle, count: '30 Soal' },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          const isModuleDone =
            tab.id !== 'latihan'
              ? !!userProgress.completedModules[`${selectedThemeId}_${tab.id}`]
              : !!userProgress.quizScores.mudah ||
                !!userProgress.quizScores.sedang ||
                !!userProgress.quizScores.sulit;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as MateriSubTab)}
              className={`flex-1 shrink-0 min-w-[130px] sm:min-w-[170px] py-2.5 sm:py-3 px-2 sm:px-3.5 rounded-xl font-semibold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all focus:outline-none relative ${
                isActive
                  ? 'bg-[#114040] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#EC853E]' : 'text-slate-400'}`} />
                {isModuleDone && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
                )}
              </div>
              <div className="text-center sm:text-left flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold leading-tight">{tab.label}</span>
                  {isModuleDone && (
                    <span className="text-[10px] text-emerald-300 font-black">✓</span>
                  )}
                </div>
                <span className={`text-[10px] ${isActive ? 'text-teal-200' : 'text-slate-400'}`}>
                  {tab.arabic} · {tab.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SUB-TAB 1: MUFRODAT (30 Kosakata Interaktif per Tema)
         ======================================================== */}
      {activeSubTab === 'mufrodat' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Controls: Search, count, and flashcard toggle */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchMufrodat}
                onChange={(e) => setSearchMufrodat(e.target.value)}
                placeholder="Cari kata Indonesia, Arab, atau latin..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040] focus:bg-white transition-all"
              />
              {searchMufrodat && (
                <button
                  onClick={() => setSearchMufrodat('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Status & Flashcard Mode Switch */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-medium text-slate-500">
                Menampilkan <strong className="text-slate-800">{displayedMufrodat.length}</strong> dari 30 Mufrodat
              </span>

              <button
                onClick={() => setFlashcardMode(!flashcardMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all focus:outline-none ${
                  flashcardMode
                    ? 'bg-[#EC853E] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mode Kartu Flashcard: {flashcardMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Module Completion Status Banner for Mufrodat */}
          <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-5 h-5 ${
                  userProgress.completedModules[`${selectedThemeId}_mufrodat`]
                    ? 'text-emerald-500'
                    : 'text-slate-300'
                }`}
              />
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Status Kosakata Tema Ini:{' '}
                  {userProgress.completedModules[`${selectedThemeId}_mufrodat`] ? (
                    <span className="text-emerald-600 font-extrabold">Tuntas Dipelajari ✓</span>
                  ) : (
                    <span className="text-slate-500 font-medium">Belum Ditandai Selesai</span>
                  )}
                </span>
                <p className="text-[11px] text-slate-400">
                  Tandai selesai jika kamu sudah membaca dan menyimak seluruh kosakata ini.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const isDone = toggleModuleCompletion(selectedThemeId, 'mufrodat');
                if (isDone) playSoundEffect('correct');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                userProgress.completedModules[`${selectedThemeId}_mufrodat`]
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-[#114040] hover:bg-[#195858] text-white'
              }`}
            >
              {userProgress.completedModules[`${selectedThemeId}_mufrodat`]
                ? 'Batalkan Selesai'
                : 'Tandai Mufrodat Selesai ✓'}
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedMufrodat.map((item, index) => {
              const isSpeaking = activeSpeakingWord === item.id;
              const isFlipped = !!flippedCards[item.id];

              if (flashcardMode) {
                // Interactive Flippable Flashcard
                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      setFlippedCards((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                    className="cursor-pointer bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#114040] shadow-sm hover:shadow-md transition-all min-h-[200px] flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>No. {index + 1}</span>
                      <span className="text-[#EC853E] font-semibold">Klik untuk membalik kartu</span>
                    </div>

                    {!isFlipped ? (
                      <div className="text-center py-3 space-y-3">
                        <MufrodatIconBadge item={item} size="lg" />
                        <span className="font-amiri text-3xl sm:text-4xl font-bold text-[#114040] block">
                          {item.arabic}
                        </span>
                        <span className="text-xs font-bold text-[#EC853E] tracking-wider block">
                          {item.latin}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center py-3 space-y-3 animate-in fade-in">
                        <MufrodatIconBadge item={item} size="md" />
                        <span className="text-xs font-semibold text-slate-400 uppercase">Artinya:</span>
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{item.indonesian}</div>
                        {item.category && (
                          <span className="inline-block text-[11px] bg-teal-50 text-[#114040] px-2.5 py-0.5 rounded-full font-medium">
                            {item.category}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayArabic(item.arabic, item.id);
                        }}
                        className="text-[#114040] hover:text-[#EC853E] font-bold flex items-center gap-1 p-1"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Bunyikan</span>
                      </button>
                      <span className="text-slate-400 text-[11px]">
                        {isFlipped ? 'Sisi Arti' : 'Sisi Arab'}
                      </span>
                    </div>
                  </div>
                );
              }

              // Standard Rich Card
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-[#114040] flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      {item.category && (
                        <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Arabic word with Harakat */}
                    <div className="py-1 text-right" dir="rtl">
                      <span className="font-amiri text-3xl sm:text-4xl font-bold text-[#114040] tracking-wide group-hover:text-teal-900 transition-colors">
                        {item.arabic}
                      </span>
                    </div>

                    {/* Latin & Indonesian Meaning */}
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#EC853E] tracking-wider uppercase">
                        {item.latin}
                      </div>
                      <div className="text-lg font-bold text-slate-900 leading-snug">
                        {item.indonesian}
                      </div>
                    </div>
                  </div>

                  {/* Audio trigger button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePlayArabic(item.arabic, item.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all focus:outline-none ${
                        isSpeaking
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-slate-100 hover:bg-[#114040] text-slate-700 hover:text-white'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Membunyikan...' : 'Dengar Lafal'}</span>
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      Arab Baku (Fusha)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {displayedMufrodat.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-lg font-bold text-slate-700">Kosakata Tidak Ditemukan</h4>
              <p className="text-sm text-slate-500">
                Tidak ada kosakata yang cocok dengan kata kunci "{searchMufrodat}".
              </p>
              <button
                onClick={() => setSearchMufrodat('')}
                className="px-4 py-2 bg-[#114040] text-white rounded-xl text-xs font-bold"
              >
                Hapus Pencarian
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: ISTIMA' (Audio Cerita Pendek <45s + Rumpang)
         ======================================================== */}
      {activeSubTab === 'istima' && currentStory && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header Story Switcher */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#EC853E] uppercase tracking-wider mb-1">
                Latihan Mendengar (Maharah Al-Istima’)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#114040] font-montserrat">
                {currentStory.title}
              </h2>
              <div className="font-amiri text-lg text-emerald-800 font-bold" dir="rtl">
                {currentStory.titleArabic}
              </div>
            </div>

            {/* 2 Stories Switcher for Current Theme */}
            <div className="flex items-center gap-2">
              {themeIstimaStories.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => {
                    stopSpeech();
                    setIsAudioPlaying(false);
                    setSelectedStoryIndex(idx);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                    selectedStoryIndex === idx
                      ? 'bg-[#114040] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cerita Audio {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Module Completion Status Banner for Istima */}
          <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-5 h-5 ${
                  userProgress.completedModules[`${selectedThemeId}_istima`]
                    ? 'text-emerald-500'
                    : 'text-slate-300'
                }`}
              />
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Status Latihan Istima’:{' '}
                  {userProgress.completedModules[`${selectedThemeId}_istima`] ? (
                    <span className="text-emerald-600 font-extrabold">Selesai Dikerjakan ✓</span>
                  ) : (
                    <span className="text-slate-500 font-medium">Belum Tuntas</span>
                  )}
                </span>
                <p className="text-[11px] text-slate-400">
                  Modul ini otomatis tuntas saat kamu menjawab 3 soal rumpang di bawah.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const isDone = toggleModuleCompletion(selectedThemeId, 'istima');
                if (isDone) playSoundEffect('correct');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                userProgress.completedModules[`${selectedThemeId}_istima`]
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-[#114040] hover:bg-[#195858] text-white'
              }`}
            >
              {userProgress.completedModules[`${selectedThemeId}_istima`]
                ? 'Batalkan Selesai'
                : 'Tandai Istima’ Selesai ✓'}
            </button>
          </div>

          {/* Audio Player Card (Max 45s Duration as requested) */}
          <div className="bg-gradient-to-br from-[#114040] to-[#185353] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Headphones className="w-6 h-6 text-[#EC853E]" />
                </div>
                <div>
                  <span className="text-xs text-teal-200 font-medium">Pemutar Audio Cerita Bahasa Arab</span>
                  <div className="text-base font-bold text-white">
                    Durasi: ~{currentStory.durationSeconds} Detik (Maks. 45 Detik)
                  </div>
                </div>
              </div>

              {/* Playback Speed Controls */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-teal-200">Kecepatan:</span>
                {[0.75, 0.85, 1.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setAudioPlaybackRate(rate)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      audioPlaybackRate === rate
                        ? 'bg-[#EC853E] text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause Main Controller Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/10">
              <button
                onClick={handleToggleIstimaAudio}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 focus:outline-none ${
                  isAudioPlaying
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
                    : 'bg-[#EC853E] hover:bg-[#d9732d] text-white'
                }`}
              >
                {isAudioPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
              </button>

              <div className="flex-1 w-full space-y-1.5 text-center sm:text-left">
                <div className="flex justify-between text-xs font-semibold text-teal-200">
                  <span>{isAudioPlaying ? 'Sedang Memutar Audio...' : 'Tekan Play untuk Mendengarkan'}</span>
                  <span>Audio Suara Arab Penutur Terang</span>
                </div>
                {/* Visualizer wave bars */}
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex items-center gap-1 px-1">
                  <div
                    className={`h-1.5 bg-[#EC853E] rounded-full transition-all duration-300 ${
                      isAudioPlaying ? 'w-full animate-pulse' : 'w-1/4'
                    }`}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  stopSpeech();
                  setIsAudioPlaying(false);
                  speakArabic(currentStory.storyArabicFull, undefined, () => setIsAudioPlaying(false), audioPlaybackRate);
                  setIsAudioPlaying(true);
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-teal-200 hover:text-white transition-colors"
                title="Ulangi dari awal"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-teal-100/80 italic text-center sm:text-left">
              *Petunjuk: Dengarkan audio cerita di atas dengan saksama, lalu amati teks rumpang di bawah ini
              dan jawablah 3 pertanyaan pilihan ganda untuk mengisi bagian yang bolong.
            </p>
          </div>

          {/* Cloze/Rumpang Text Exercise Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Teks Latihan Istima' (Rumpang / Bolong-bolong)
              </span>
              <span className="text-xs font-bold text-[#EC853E] bg-orange-50 px-2.5 py-1 rounded-md">
                3 Bagian Rumpang
              </span>
            </div>

            {/* Arabic Cloze Text Display */}
            <div
              className="font-amiri text-2xl sm:text-3xl lg:text-4xl text-right text-slate-900 font-bold leading-loose py-3 tracking-wide"
              dir="rtl"
            >
              {currentStory.storyArabicCloze}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 border border-slate-200">
              <strong>Terjemahan Cerita:</strong> {currentStory.storyTranslation}
            </div>
          </div>

          {/* 3 Questions for This Audio (Multiple Choice) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#114040] font-montserrat">
                Soal Pemahaman Mengisi Bagian Rumpang (3 Soal)
              </h3>
              <span className="text-xs font-medium text-slate-500">
                Pilihlah kata yang tepat sesuai audio
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentStory.questions.map((q, qIndex) => {
                const qKey = `${currentStory.id}-q-${q.questionNumber}`;
                const selectedOption = istimaAnswers[qKey];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = selectedOption === q.correctIndex;

                return (
                  <div
                    key={qKey}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#114040] text-white text-xs font-extrabold flex items-center justify-center">
                          {q.questionNumber}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          {q.prompt}
                        </h4>
                      </div>

                      {isAnswered && (
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}</span>
                        </span>
                      )}
                    </div>

                    {/* Multiple Choice Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisChosen = selectedOption === optIdx;
                        let optionStyle =
                          'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-bold';
                          } else if (isThisChosen && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                          } else {
                            optionStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              const updatedAnswers = {
                                ...istimaAnswers,
                                [qKey]: optIdx,
                              };
                              setIstimaAnswers(updatedAnswers);
                              markModuleCompleted(selectedThemeId, 'istima');
                              markIstimaCompleted(currentStory.id);
                              if (optIdx === q.correctIndex) {
                                playSoundEffect('correct');
                              } else {
                                playSoundEffect('wrong');
                              }
                            }}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2 focus:outline-none ${optionStyle}`}
                          >
                            <span className="font-medium">{opt}</span>
                            <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="bg-teal-50/70 p-3.5 rounded-xl border-l-4 border-[#114040] text-xs text-slate-700 animate-in fade-in">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: QIRA'AH (1 Paragraf + Terjemahan + Bantuan Kosa Kata Kanan + 3 Soal)
         ======================================================== */}
      {activeSubTab === 'qiraah' && currentQiraah && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#EC853E] uppercase tracking-wider mb-1">
                Keterampilan Membaca (Maharah Al-Qira’ah)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#114040] font-montserrat">
                {currentQiraah.title}
              </h2>
              <div className="font-amiri text-lg text-emerald-800 font-bold" dir="rtl">
                {currentQiraah.titleArabic}
              </div>
            </div>

            {/* Toggle Translation Visibility */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 transition-all self-start sm:self-auto"
            >
              {showTranslation ? <EyeOff className="w-4 h-4 text-[#EC853E]" /> : <Eye className="w-4 h-4 text-[#114040]" />}
              <span>{showTranslation ? 'Sembunyikan Terjemahan' : 'Tampilkan Terjemahan'}</span>
            </button>
          </div>

          {/* Module Completion Status Banner for Qiraah */}
          <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-5 h-5 ${
                  userProgress.completedModules[`${selectedThemeId}_qiraah`]
                    ? 'text-emerald-500'
                    : 'text-slate-300'
                }`}
              />
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Status Membaca Qira’ah:{' '}
                  {userProgress.completedModules[`${selectedThemeId}_qiraah`] ? (
                    <span className="text-emerald-600 font-extrabold">Selesai Dipelajari ✓</span>
                  ) : (
                    <span className="text-slate-500 font-medium">Belum Tuntas</span>
                  )}
                </span>
                <p className="text-[11px] text-slate-400">
                  Modul ini otomatis tuntas saat kamu menjawab 3 soal pemahaman di bawah.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const isDone = toggleModuleCompletion(selectedThemeId, 'qiraah');
                if (isDone) playSoundEffect('correct');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                userProgress.completedModules[`${selectedThemeId}_qiraah`]
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-[#114040] hover:bg-[#195858] text-white'
              }`}
            >
              {userProgress.completedModules[`${selectedThemeId}_qiraah`]
                ? 'Batalkan Selesai'
                : 'Tandai Qira’ah Selesai ✓'}
            </button>
          </div>

          {/* 2-Column Layout: Left Text Paragraph, Right Vocabulary Help */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Cols: Arabic Paragraph & Translation */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Teks Bacaan Berharakat
                </span>
                <button
                  onClick={() => handlePlayArabic(currentQiraah.textArabic)}
                  className="text-xs font-bold text-[#114040] hover:text-[#EC853E] flex items-center gap-1 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Bacaan</span>
                </button>
              </div>

              {/* Arabic Paragraph */}
              <div
                className="font-amiri text-2xl sm:text-3xl text-right text-slate-900 font-bold leading-loose tracking-wide select-all"
                dir="rtl"
              >
                {currentQiraah.textArabic}
              </div>

              {/* Indonesian Translation with Toggle */}
              {showTranslation ? (
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-2 animate-in fade-in">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Terjemahan Bahasa Indonesia:
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {currentQiraah.textTranslation}
                  </p>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                  Terjemahan disembunyikan. Coba pahami teks Arab secara mandiri terlebih dahulu!
                </div>
              )}
            </div>

            {/* Right 4 Cols: Mandatory Vocabulary Help (Bantuan Mufrodat) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#f8faf9] to-[#edf5f5] rounded-3xl p-6 border border-teal-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-teal-200/60 pb-3">
                <Sparkles className="w-4 h-4 text-[#EC853E]" />
                <h3 className="text-sm font-bold text-[#114040] uppercase tracking-wide">
                  Bantuan Mufrodat Kunci
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                Gunakan kosakata bantuan berikut untuk membantumu memahami teks cerita di samping:
              </p>

              <div className="space-y-2.5">
                {currentQiraah.glossary.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-amiri text-lg font-bold text-[#114040]" dir="rtl">
                        {item.arabic}
                      </div>
                      <div className="text-[11px] font-bold text-[#EC853E]">{item.latin}</div>
                    </div>
                    <div className="text-right text-xs font-semibold text-slate-800">
                      {item.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 3 Reading Comprehension Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#114040] font-montserrat">
                Uji Pemahaman Bacaan (3 Soal Pilihan Ganda)
              </h3>
              <span className="text-xs text-slate-500">
                Pilih jawaban paling tepat berdasarkan teks di atas
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentQiraah.questions.map((q, idx) => {
                const qKey = `qir-${idx}`;
                const chosen = qiraahAnswers[qKey];
                const isAnswered = chosen !== undefined;
                const isCorrect = chosen === q.correctIndex;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-md bg-[#114040] text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">{q.question}</h4>
                        </div>
                        {q.questionArabic && (
                          <div className="font-amiri text-lg text-emerald-800 font-bold" dir="rtl">
                            {q.questionArabic}
                          </div>
                        )}
                      </div>

                      {isAnswered && (
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'Benar!' : 'Salah'}</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isThisOption = chosen === optIdx;
                        let optionStyle =
                          'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-bold';
                          } else if (isThisOption && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                          } else {
                            optionStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              const updated = {
                                ...qiraahAnswers,
                                [qKey]: optIdx,
                              };
                              setQiraahAnswers(updated);
                              markModuleCompleted(selectedThemeId, 'qiraah');
                              markQiraahCompleted(currentQiraah.id);
                              if (optIdx === q.correctIndex) {
                                playSoundEffect('correct');
                              } else {
                                playSoundEffect('wrong');
                              }
                            }}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2 focus:outline-none ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="bg-teal-50/70 p-3.5 rounded-xl border-l-4 border-[#114040] text-xs text-slate-700 animate-in fade-in">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: QOWAID (Kata Ganti / Dhamir + Latihan Non-Pilihan Ganda)
         ======================================================== */}
      {activeSubTab === 'qowaid' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#EC853E] text-xs font-bold">
              <BookmarkCheck className="w-4 h-4" />
              <span>Tata Bahasa Arab Dasar (Qowaid)</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#114040] font-montserrat">
              {qowaidTopic.title}
            </h2>
            <div className="font-amiri text-2xl text-emerald-800 font-bold" dir="rtl">
              {qowaidTopic.titleArabic}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {qowaidTopic.shortDescription}
            </p>

            {/* Key Rule Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {qowaidTopic.keyRulePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#114040] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Completion Status Banner for Qowaid */}
          <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-5 h-5 ${
                  userProgress.completedModules[`${selectedThemeId}_qowaid`]
                    ? 'text-emerald-500'
                    : 'text-slate-300'
                }`}
              />
              <div>
                <span className="text-xs font-bold text-slate-800">
                  Status Kaidah Qowaid:{' '}
                  {userProgress.completedModules[`${selectedThemeId}_qowaid`] ? (
                    <span className="text-emerald-600 font-extrabold">Selesai Dipelajari ✓</span>
                  ) : (
                    <span className="text-slate-500 font-medium">Belum Tuntas</span>
                  )}
                </span>
                <p className="text-[11px] text-slate-400">
                  Modul ini otomatis tuntas saat kamu menyelesaikan latihan melengkapi kalimat di bawah.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const isDone = toggleModuleCompletion(selectedThemeId, 'qowaid');
                if (isDone) playSoundEffect('correct');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                userProgress.completedModules[`${selectedThemeId}_qowaid`]
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-[#114040] hover:bg-[#195858] text-white'
              }`}
            >
              {userProgress.completedModules[`${selectedThemeId}_qowaid`]
                ? 'Batalkan Selesai'
                : 'Tandai Qowaid Selesai ✓'}
            </button>
          </div>

          {/* Visual Pronoun Chart Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#114040] font-montserrat">
                Tabel Kaidah Lengkap & Contoh Penerapan ({qowaidTopic.title})
              </h3>
              <span className="text-xs text-slate-500">Klik speaker untuk lafal</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider font-bold">
                    <th className="p-3.5 rounded-l-xl">Kategori / Kelompok</th>
                    <th className="p-3.5">Bentuk Kata Arab</th>
                    <th className="p-3.5">Arti Bahasa Indonesia</th>
                    <th className="p-3.5 rounded-r-xl">Contoh Kalimat Sederhana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {qowaidTopic.pronounChart.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-medium text-slate-700">
                        <div>{row.category}</div>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {row.subCategory}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-amiri text-2xl font-bold text-[#114040]" dir="rtl">
                            {row.arabic}
                          </span>
                          <span className="text-xs font-bold text-[#EC853E]">({row.latin})</span>
                          <button
                            onClick={() => handlePlayArabic(row.arabic)}
                            className="p-1 text-slate-400 hover:text-[#114040]"
                            title="Dengarkan kata ganti"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">{row.meaning}</td>
                      <td className="p-3.5">
                        <div className="font-amiri text-lg font-bold text-slate-900" dir="rtl">
                          {row.example}
                        </div>
                        <div className="text-xs text-slate-500 italic">
                          "{row.exampleMeaning}"
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NON-Multiple Choice Interactive Exercise (as explicitly ordered by User) */}
          <div className="bg-gradient-to-br from-teal-900 to-[#114040] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-700/60 pb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-[#EC853E] text-white text-[11px] font-bold rounded-md uppercase tracking-wider mb-1">
                  Latihan Interaktif (Bukan Pilihan Ganda)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-montserrat">
                  Lengkapi Kalimat dengan Kaidah yang Tepat
                </h3>
              </div>
              <p className="text-xs text-teal-200 max-w-sm">
                Klik kata dari kotak bank kata di bawah untuk memasukkannya ke dalam bagian yang rumpang, lalu periksa ketepatan jawabanmu!
              </p>
            </div>

            <div className="space-y-6">
              {qowaidTopic.interactiveExercises.map((ex, idx) => {
                const selectedVal = qowaidSelectedSlot[ex.id];
                const isChecked = !!qowaidChecked[ex.id];
                const isCorrect = selectedVal === ex.correctAnswer;

                return (
                  <div
                    key={ex.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-orange-200">
                        Tantangan #{idx + 1}: {ex.targetPronounType}
                      </span>
                      {isChecked && (
                        <span
                          className={`px-3 py-1 rounded-md font-bold flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'Tepat Sekali!' : 'Belum Tepat'}</span>
                        </span>
                      )}
                    </div>

                    {/* Sentence with Slot */}
                    <div className="bg-black/30 p-4 rounded-xl text-center space-y-2">
                      <div
                        className="font-amiri text-2xl sm:text-3xl text-amber-200 font-bold leading-relaxed flex items-center justify-center gap-3 flex-wrap"
                        dir="rtl"
                      >
                        <span>{ex.sentenceWithBlank.split('...')[0]}</span>
                        <span className="inline-block px-4 py-1.5 rounded-xl border-2 border-dashed border-[#EC853E] bg-[#EC853E]/20 text-white font-black min-w-[70px] text-center shadow-inner">
                          {selectedVal || '... ? ...'}
                        </span>
                        <span>{ex.sentenceWithBlank.split('...')[1]}</span>
                      </div>
                      <div className="text-xs text-teal-200 italic">
                        "{ex.sentenceTranslation}"
                      </div>
                    </div>

                    {/* Pronoun Bank Options to Click & Fill */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-teal-200 font-semibold">Pilih Kata:</span>
                        {ex.availableOptions.map((opt) => {
                          const isPicked = selectedVal === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                setQowaidSelectedSlot((prev) => ({
                                  ...prev,
                                  [ex.id]: opt,
                                }));
                                setQowaidChecked((prev) => ({
                                  ...prev,
                                  [ex.id]: false,
                                }));
                                playSoundEffect('click');
                              }}
                              className={`px-4 py-2 rounded-xl text-base font-amiri font-bold transition-all focus:outline-none ${
                                isPicked
                                  ? 'bg-[#EC853E] text-white shadow-md scale-105 ring-2 ring-white'
                                  : 'bg-white/20 hover:bg-white/30 text-white'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Verify Button */}
                      <button
                        onClick={() => {
                          if (!selectedVal) return;
                          setQowaidChecked((prev) => ({
                            ...prev,
                            [ex.id]: true,
                          }));
                          markModuleCompleted(selectedThemeId, 'qowaid');
                          markQowaidCompleted(qowaidTopic.id);
                          if (isCorrect) {
                            playSoundEffect('correct');
                          } else {
                            playSoundEffect('wrong');
                          }
                        }}
                        disabled={!selectedVal}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                          !selectedVal
                            ? 'bg-white/10 text-white/40 cursor-not-allowed'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95'
                        }`}
                      >
                        Periksa Jawaban
                      </button>
                    </div>

                    {/* Result Explanation */}
                    {isChecked && (
                      <div
                        className={`p-3.5 rounded-xl text-xs leading-relaxed animate-in fade-in ${
                          isCorrect ? 'bg-emerald-950/70 border border-emerald-400 text-emerald-100' : 'bg-rose-950/70 border border-rose-400 text-rose-100'
                        }`}
                      >
                        <strong>{isCorrect ? 'Penjelasan Benar:' : 'Koreksi:'}</strong>{' '}
                        {ex.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: LATIHAN SOAL (3 Level: Mudah - Sedang - Sulit, masing-masing 10 Soal)
         ======================================================== */}
      {activeSubTab === 'latihan' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header Level Selector */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#EC853E] uppercase tracking-wider mb-1">
                Evaluasi Kemampuan Mandiri
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#114040] font-montserrat">
                Latihan Soal Uji Kompetensi (3 Level)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Campuran 10 soal komprehensif: Mufrodat, Istima’, Qira’ah, dan Qowaid
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Rekor Nilai Level {quizLevel.toUpperCase()}:{' '}
                    <strong>
                      {userProgress.quizScores[quizLevel] !== undefined
                        ? `${userProgress.quizScores[quizLevel]} / 100 Poin`
                        : 'Belum Dikerjakan'}
                    </strong>
                  </span>
                </span>
              </div>
            </div>

            {/* 3 Level Pills: Mudah, Sedang, Sulit */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl self-start md:self-auto">
              {(['mudah', 'sedang', 'sulit'] as const).map((lvl) => {
                const isLvlActive = quizLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      setQuizLevel(lvl);
                      setCurrentQuizQuestionIndex(0);
                      setQuizUserAnswers({});
                      setQuizIsFinished(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none ${
                      isLvlActive
                        ? lvl === 'mudah'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : lvl === 'sedang'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-rose-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Level {lvl} (10 Soal)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiz Active View or Finished Scorecard */}
          {!quizIsFinished ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              
              {/* Question Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>
                    Soal {currentQuizQuestionIndex + 1} dari {currentLevelQuestions.length}
                  </span>
                  <span className="capitalize text-[#114040]">
                    Kategori: {currentLevelQuestions[currentQuizQuestionIndex]?.type}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EC853E] transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuizQuestionIndex + 1) / currentLevelQuestions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Current Question Body */}
              {(() => {
                const currentQ = currentLevelQuestions[currentQuizQuestionIndex];
                if (!currentQ) return null;
                const chosenOpt = quizUserAnswers[currentQuizQuestionIndex];

                return (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-teal-50 text-[#114040] text-xs font-bold rounded-lg uppercase">
                        Level: {currentQ.level} · Tipe: {currentQ.type}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {currentQ.question}
                      </h3>

                      {currentQ.arabicPrompt && (
                        <div
                          className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-amiri text-2xl sm:text-3xl font-bold text-[#114040] text-center"
                          dir="rtl"
                        >
                          {currentQ.arabicPrompt}
                        </div>
                      )}
                    </div>

                    {/* 4 Choices */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {currentQ.options.map((opt, optIndex) => {
                        const isChosen = chosenOpt === optIndex;
                        return (
                          <button
                            key={optIndex}
                            onClick={() => {
                              setQuizUserAnswers((prev) => ({
                                ...prev,
                                [currentQuizQuestionIndex]: optIndex,
                              }));
                              playSoundEffect('click');
                            }}
                            className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 focus:outline-none ${
                              isChosen
                                ? 'bg-[#114040] text-white border-[#114040] shadow-md scale-[1.01]'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="font-medium">{opt}</span>
                            <span
                              className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                                isChosen ? 'bg-[#EC853E] text-white' : 'bg-white text-slate-600 border border-slate-200'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <button
                        onClick={() =>
                          setCurrentQuizQuestionIndex((prev) => Math.max(0, prev - 1))
                        }
                        disabled={currentQuizQuestionIndex === 0}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          currentQuizQuestionIndex === 0
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sebelumnya</span>
                      </button>

                      {currentQuizQuestionIndex < currentLevelQuestions.length - 1 ? (
                        <button
                          onClick={() =>
                            setCurrentQuizQuestionIndex((prev) => prev + 1)
                          }
                          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#114040] hover:bg-[#1a5b5b] shadow-md flex items-center gap-1.5 transition-all"
                        >
                          <span>Selanjutnya</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            let correctCount = 0;
                            currentLevelQuestions.forEach((q, idx) => {
                              if (quizUserAnswers[idx] === q.correctIndex) correctCount++;
                            });
                            const calculatedScore = Math.round((correctCount / currentLevelQuestions.length) * 100);
                            recordQuizScore(quizLevel, calculatedScore);
                            recordAuthQuizScore(quizLevel, correctCount, currentLevelQuestions.length);
                            setQuizIsFinished(true);
                            playSoundEffect('win');
                          }}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#EC853E] hover:bg-[#d9732d] shadow-md flex items-center gap-1.5 transition-all animate-pulse"
                        >
                          <Award className="w-4 h-4" />
                          <span>Selesaikan & Lihat Nilai</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // Final Quiz Result Scorecard
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 max-w-3xl mx-auto">
              {(() => {
                let correctCount = 0;
                currentLevelQuestions.forEach((q, idx) => {
                  if (quizUserAnswers[idx] === q.correctIndex) correctCount++;
                });
                const score = (correctCount / currentLevelQuestions.length) * 100;

                return (
                  <>
                    <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
                      <Award className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#EC853E]">
                        Hasil Evaluasi Mandiri - Level {quizLevel.toUpperCase()}
                      </span>
                      <h3 className="text-3xl font-extrabold text-[#114040] font-montserrat">
                        {score >= 80 ? 'Mumtaaz! Luar Biasa!' : score >= 60 ? 'Bagus! Terus Tingkatkan!' : 'Ayo Semangat Berlatih Lagi!'}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Kamu berhasil menjawab dengan benar <strong>{correctCount}</strong> dari{' '}
                        <strong>{currentLevelQuestions.length}</strong> soal.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block min-w-[200px]">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Skor Akhir
                      </div>
                      <div className="text-5xl font-black text-[#114040] font-montserrat my-1">
                        {score}
                      </div>
                      <div className="text-xs font-semibold text-emerald-600">
                        {correctCount * 10} / 100 Poin
                      </div>
                    </div>

                    {/* Review Answers Accordion / List */}
                    <div className="text-left space-y-3 pt-6 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-800">
                        Kunci Jawaban & Pembahasan Detail:
                      </h4>
                      <div className="space-y-3">
                        {currentLevelQuestions.map((q, idx) => {
                          const userAns = quizUserAnswers[idx];
                          const isTrue = userAns === q.correctIndex;
                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                                isTrue ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span className="text-slate-800">
                                  #{idx + 1}. {q.question}
                                </span>
                                <span className={isTrue ? 'text-emerald-700' : 'text-rose-700'}>
                                  {isTrue ? '✓ Benar' : '✗ Salah'}
                                </span>
                              </div>
                              <div className="text-slate-600">
                                Jawaban Anda:{' '}
                                <strong>
                                  {userAns !== undefined ? q.options[userAns] : 'Belum dijawab'}
                                </strong>
                              </div>
                              <div className="text-emerald-800 font-semibold">
                                Kunci Benar: {q.options[q.correctIndex]}
                              </div>
                              <p className="text-slate-500 italic mt-1">{q.explanation}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Retry Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                      <button
                        onClick={() => {
                          setCurrentQuizQuestionIndex(0);
                          setQuizUserAnswers({});
                          setQuizIsFinished(false);
                        }}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-[#114040] text-white hover:bg-[#1a5b5b] shadow transition-all"
                      >
                        Ulangi Latihan Level Ini
                      </button>

                      <button
                        onClick={() => {
                          const nextLvl =
                            quizLevel === 'mudah' ? 'sedang' : quizLevel === 'sedang' ? 'sulit' : 'mudah';
                          setQuizLevel(nextLvl);
                          setCurrentQuizQuestionIndex(0);
                          setQuizUserAnswers({});
                          setQuizIsFinished(false);
                        }}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-[#EC853E] text-white hover:bg-[#d9732d] shadow transition-all"
                      >
                        Coba Level Lainnya
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
