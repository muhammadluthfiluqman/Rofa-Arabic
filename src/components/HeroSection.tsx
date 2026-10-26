import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { DAILY_MUFRODAT_DATA } from '../data/mufrodatDailyData';
import { speakArabic } from '../utils/speech';
import { calculateOverallProgress, resetAllProgress } from '../utils/progress';
import { THEMES_DATA } from '../data/themesData';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Layers,
  HelpCircle,
  Infinity as InfinityIcon,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Gamepad2,
  CheckCircle2,
  Trophy,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

// Hero illustration generated via image tool
import heroImage from '../assets/images/hero_arabic_learning_1791192660119.jpg';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { user, profile, openAuthModal, openProgressModal } = useAuth();
  const [activeDailyIndex, setActiveDailyIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [progress, setProgress] = useState(() =>
    calculateOverallProgress(THEMES_DATA.map((t) => t.id))
  );

  useEffect(() => {
    const handleProgressUpdate = () => {
      setProgress(calculateOverallProgress(THEMES_DATA.map((t) => t.id)));
    };
    window.addEventListener('rofaarabic_progress_updated', handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);
    return () => {
      window.removeEventListener('rofaarabic_progress_updated', handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
    };
  }, []);

  const currentDaily = DAILY_MUFRODAT_DATA[activeDailyIndex];

  const handlePlayAudio = (arabicText: string) => {
    setIsPlayingAudio(true);
    speakArabic(
      arabicText,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const handleNextDaily = () => {
    setActiveDailyIndex((prev) => (prev + 1) % DAILY_MUFRODAT_DATA.length);
  };

  const handlePrevDaily = () => {
    setActiveDailyIndex((prev) =>
      prev === 0 ? DAILY_MUFRODAT_DATA.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-16 py-8 md:py-12">
      {/* Main Hero Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#114040] via-[#154e4e] to-[#0d3030] text-white shadow-2xl border border-teal-800">
        {/* Subtle Decorative Arabic Calligraphy Watermark Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center font-amiri text-9xl text-white select-none overflow-hidden">
          العَرَبِيَّةُ لِلْجَمِيْعِ
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading, Tagline, & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-orange-200">
                <Sparkles className="w-4 h-4 text-[#EC853E]" />
                <span>Media Pembelajaran Bahasa Arab Interaktif SMP</span>
              </div>

              {/* Mandatory Official Tagline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight leading-tight text-white font-montserrat text-balance">
                Belajar Bahasa Arab <br />
                <span className="text-[#EC853E] underline decoration-wavy decoration-[#EC853E]/50 underline-offset-8">
                  Kapan Saja & Di Mana Saja
                </span>
              </h1>

              <p className="text-base sm:text-lg text-teal-100/90 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Dirancang khusus untuk siswa Sekolah Menengah Pertama (12–15 Tahun).
                Nikmati petualangan belajar kosakata (Mufrodat), latihan mendengar (Istima’),
                membaca (Qira’ah), kaidah kata ganti (Qowaid), serta kuis interaktif yang seru!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('materi')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#EC853E] text-white hover:bg-[#d9732d] shadow-lg shadow-orange-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Jelajahi Materi Belajar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('game')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 focus:outline-none"
                >
                  <Gamepad2 className="w-5 h-5 text-yellow-300" />
                  <span>Main Game Edukasi</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-teal-200/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bahasa Arab Tematik</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multimedia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Gratis & Bebas Iklan</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#EC853E] to-teal-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#0e3333]">
                  <img
                    src={heroImage}
                    alt="Siswa SMP belajar Bahasa Arab di RofaArabic"
                    referrerPolicy="no-referrer"
                    className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="font-amiri text-2xl font-bold text-amber-300" dir="rtl">
                      العِلْمُ نُوْرٌ وَالجَهْلُ ظَلَامٌ
                    </div>
                    <p className="text-xs text-gray-200 font-medium mt-1">
                      "Ilmu itu cahaya dan kebodohan adalah kegelapan."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Key Stats (Mandatory Highlight Cards) */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#114040] font-montserrat">
            Keunggulan Utama RofaArabic
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Dirancang lengkap untuk menunjang kemahiran berbahasa Arab bagi pemula
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#114040] flex items-center justify-center mb-3">
              <Layers className="w-7 h-7 text-[#114040]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#114040] font-montserrat">
              5+ Jenis
            </span>
            <span className="text-sm font-semibold text-slate-700 mt-0.5">
              Materi Belajar
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Mufrodat, Istima', Qira'ah, Qowaid & Game
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#EC853E] flex items-center justify-center mb-3">
              <BookOpen className="w-7 h-7 text-[#EC853E]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#EC853E] font-montserrat">
              100+
            </span>
            <span className="text-sm font-semibold text-slate-700 mt-0.5">
              Mufrodat Berharakat
            </span>
            <p className="text-xs text-slate-500 mt-1">
              270 Kosakata tematik lengkap dengan audio
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#114040] flex items-center justify-center mb-3">
              <HelpCircle className="w-7 h-7 text-[#114040]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#114040] font-montserrat">
              50+
            </span>
            <span className="text-sm font-semibold text-slate-700 mt-0.5">
              Latihan Soal
            </span>
            <p className="text-xs text-slate-500 mt-1">
              3 Level kesulitan (Mudah, Sedang, Sulit)
            </p>
          </div>

          {/* Stat 4 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <InfinityIcon className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#114040] font-montserrat">
              Akses
            </span>
            <span className="text-sm font-semibold text-slate-700 mt-0.5">
              Belajar Tak Terbatas
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Bisa diakses dari HP, tablet, maupun laptop
            </p>
          </div>

        </div>
      </section>

      {/* Progress Tracking System Banner (Integrated with Google & LocalStorage) */}
      <section className="bg-gradient-to-r from-teal-900 via-[#114040] to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EC853E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Pelacak Progres Mandiri</span>
              </span>
              {user ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Akun Google: {profile?.username ? `@${profile.username}` : user.email}</span>
                </span>
              ) : (
                <span className="text-xs text-orange-200 font-medium">Mode Tamu (Lokal)</span>
              )}
            </div>

            <h3 className="text-2xl font-bold font-montserrat text-white">
              Capaian Belajarmu: <span className="text-[#EC853E]">{progress.percentage}% Selesai</span>
            </h3>

            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Kamu telah menyelesaikan <strong>{progress.completedModulesCount}</strong> dari{' '}
              <strong>{progress.totalModulesCount}</strong> modul latihan ({progress.completedThemesCount} dari 9 tema tuntas).
              {user
                ? ' Progres belajarmu tersimpan aman di akun Google dan dapat dilanjutkan dari perangkat apa saja.'
                : ' Masuk dengan Akun Google agar progres hafalan dan skor kuismu tersimpan otomatis di cloud!'}
            </p>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#EC853E] to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-teal-300 font-medium">
                <span>0% Memulai</span>
                <span>{progress.percentage}% Tercapai</span>
                <span>100% Menguasai</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
            <button
              onClick={() => onNavigate('materi')}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <span>Lanjutkan Belajar Materi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openProgressModal}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white/15 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 text-[#EC853E]" />
              <span>Buka Dasbor Progres Saya</span>
            </button>

            {!user && (
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-200 hover:text-white bg-black/20 hover:bg-black/30 flex items-center justify-center gap-1.5 border border-amber-400/20 transition-colors"
              >
                <span>Simpan Progres dengan Google</span>
              </button>
            )}

            {progress.completedModulesCount > 0 && user && (
              <button
                onClick={() => {
                  if (window.confirm('Apakah kamu yakin ingin mereset seluruh progres belajar?')) {
                    resetAllProgress();
                  }
                }}
                className="px-4 py-1.5 rounded-xl text-[11px] font-semibold text-teal-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                title="Mulai kembali dari awal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Progres</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Mandatory Section: MUFRODAT HARIAN (1 - 10) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#EC853E] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Unggulan Harian</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#114040] font-montserrat">
              Mufrodat Harian (1 - 10)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Kuasai 10 kosakata penting dasar berikut setiap hari dengan lafal audio yang fasih.
            </p>
          </div>

          {/* Quick Number Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {DAILY_MUFRODAT_DATA.map((item, idx) => (
              <button
                key={item.number}
                onClick={() => setActiveDailyIndex(idx)}
                className={`w-9 h-9 shrink-0 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                  activeDailyIndex === idx
                    ? 'bg-[#114040] text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Mufrodat nomor ${item.number}: ${item.indonesian}`}
              >
                {item.number}
              </button>
            ))}
          </div>
        </div>

        {/* Active Mufrodat Display Card */}
        <div className="mt-8 bg-gradient-to-br from-[#f8faf9] to-[#edf5f5] rounded-2xl p-6 sm:p-8 border border-teal-100 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Arabic Big Card */}
            <div className="md:col-span-6 text-center md:text-left space-y-4">
              <div className="inline-block px-3 py-1 bg-[#114040] text-white text-xs font-bold rounded-lg shadow-sm">
                No. {currentDaily.number} dari 10 Kosakata Harian
              </div>

              {/* Big Arabic Text */}
              <div className="py-2">
                <span className="font-amiri text-6xl sm:text-7xl font-bold text-[#114040] leading-tight select-all">
                  {currentDaily.arabic}
                </span>
              </div>

              {/* Latin & Indonesian */}
              <div className="space-y-1">
                <div className="text-lg font-bold text-[#EC853E] tracking-wide font-montserrat">
                  {currentDaily.latin}
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {currentDaily.indonesian}
                </div>
                <span className="inline-block text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 mt-1">
                  Kategori: {currentDaily.category}
                </span>
              </div>

              {/* Pronounce Audio Button */}
              <div className="pt-2">
                <button
                  onClick={() => handlePlayAudio(currentDaily.arabic)}
                  disabled={isPlayingAudio}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md focus:outline-none ${
                    isPlayingAudio
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-[#114040] text-white hover:bg-[#1a5b5b]'
                  }`}
                >
                  <Volume2 className="w-5 h-5 text-[#EC853E]" />
                  <span>{isPlayingAudio ? 'Memutar Suara Arab...' : 'Dengarkan Lafal Audio'}</span>
                </button>
              </div>
            </div>

            {/* Example In Context */}
            <div className="md:col-span-6 bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contoh Dalam Kalimat
                </span>
                <button
                  onClick={() => handlePlayAudio(currentDaily.exampleArabic)}
                  className="text-xs font-semibold text-[#114040] hover:text-[#EC853E] flex items-center gap-1 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Bunyikan Kalimat</span>
                </button>
              </div>

              {/* Example Arabic */}
              <div
                className="font-amiri text-2xl sm:text-3xl text-right text-[#114040] font-bold py-1 leading-relaxed"
                dir="rtl"
              >
                {currentDaily.exampleArabic}
              </div>

              {/* Example Latin */}
              <div className="text-xs italic text-slate-500 font-medium">
                "{currentDaily.exampleLatin}"
              </div>

              {/* Example Indonesian Translation */}
              <div className="text-sm font-semibold text-slate-800 bg-teal-50/60 p-3 rounded-lg border-l-4 border-[#114040]">
                Artinya: {currentDaily.exampleIndonesian}
              </div>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200/60">
            <button
              onClick={handlePrevDaily}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs text-slate-500 font-medium">
              Gunakan tombol panah untuk berpindah kosakata
            </span>

            <button
              onClick={handleNextDaily}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#EC853E] hover:bg-[#d9732d] shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
