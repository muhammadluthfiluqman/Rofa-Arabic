import React from 'react';
import { PageTab } from '../types';
import {
  MousePointerClick,
  Headphones,
  CheckSquare,
  Award,
  ArrowRight,
  BookOpen,
  Volume2,
  Gamepad2,
} from 'lucide-react';

interface PetunjukPenggunaanSectionProps {
  onStartLearning: (tab: PageTab) => void;
}

export const PetunjukPenggunaanSection: React.FC<PetunjukPenggunaanSectionProps> = ({
  onStartLearning,
}) => {
  const steps = [
    {
      step: 1,
      title: 'Pilih Materi & Tema',
      titleArabic: 'اخْتِيَارُ المَوْضُوْعِ',
      icon: MousePointerClick,
      color: 'bg-teal-50 text-[#114040] border-[#114040]',
      badgeColor: 'bg-[#114040] text-white',
      shortExplanation:
        'Tentukan tema yang ingin kamu kuasai dari 9 tema menarik (seperti Keluarga, Madrasah, Hobi, hingga Jam & Waktu). Lalu klik jenis modul belajar yang kamu inginkan: Mufrodat, Istima’, Qira’ah, Qowaid, atau Latihan Soal.',
      tips: [
        'Tersedia 9 tema kontekstual sesuai kehidupan siswa SMP.',
        'Kamu bebas memilih tema mana saja yang ingin dipelajari terlebih dahulu.',
      ],
    },
    {
      step: 2,
      title: 'Pelajari Materi Interaktif',
      titleArabic: 'تَعَلُّمُ المَوَادِّ',
      icon: BookOpen,
      color: 'bg-orange-50 text-[#EC853E] border-[#EC853E]',
      badgeColor: 'bg-[#EC853E] text-white',
      shortExplanation:
        'Simak 30 kosakata berharakat per tema dengan audio lafal asli, dengarkan cerita suara Istima’ berdurasi di bawah 45 detik, telaah teks Qira’ah dengan bantuan kosakata samping, dan pelajari kaidah kata ganti (Dhamir) dengan bagan yang sederhana.',
      tips: [
        'Klik ikon speaker untuk mendengarkan pelafalan bahasa Arab yang fasih.',
        'Gunakan fitur Sembunyikan/Tampilkan Terjemahan pada Qira’ah untuk melatih kemandirian.',
      ],
    },
    {
      step: 3,
      title: 'Berlatih Mandiri',
      titleArabic: 'المُمَارَسَةُ وَالتَّدْرِيْبُ',
      icon: Headphones,
      color: 'bg-teal-50 text-[#114040] border-[#114040]',
      badgeColor: 'bg-[#114040] text-white',
      shortExplanation:
        'Uji kejelianmu! Pada modul Istima’, lengkapi bagian cerita yang bolong-bolong (rumpang) melalui soal pilihan ganda. Pada Qowaid, pasangkan dan masukkan kata ganti yang tepat ke dalam kalimat dengan latihan interaktif non-pilihan ganda.',
      tips: [
        'Ulangi mendengarkan audio Istima’ jika merasa kalimat rumpang belum terjawab sempurna.',
        'Latihan Qowaid dirancang langsung memberikan feedback apakah jawabanmu benar atau salah.',
      ],
    },
    {
      step: 4,
      title: 'Evaluasi & Uji Kemampuan',
      titleArabic: 'التَّقْوِيْمُ وَالنَّتِيْجَةُ',
      icon: Award,
      color: 'bg-orange-50 text-[#EC853E] border-[#EC853E]',
      badgeColor: 'bg-[#EC853E] text-white',
      shortExplanation:
        'Uji seluruh pemahamanmu di menu Latihan Soal dengan 3 level kesulitan: Mudah (tingkat dasar), Sedang (pemahaman kontekstual), dan Sulit (kaidah mendalam). Kamu juga bisa memainkan Game Edukatif seru di menu Mulai Bermain.',
      tips: [
        'Setiap level kuis terdiri dari 10 soal variasi mufrodat, istima\', qira\'ah, dan qowaid.',
        'Dapatkan skor akhir, bintang penghargaan, serta ulasan pembahasan pada setiap soal.',
      ],
    },
  ];

  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#114040] text-xs font-bold">
          <span>Panduan Belajar RofaArabic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#114040] font-montserrat">
          Petunjuk Penggunaan Website
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Ikuti 4 langkah terstruktur di bawah ini untuk memaksimalkan hasil belajar bahasa Arabmu
          secara mandiri, teratur, dan menyenangkan.
        </p>
      </div>

      {/* 4 Steps Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {/* Step indicator watermark */}
              <div className="absolute -top-3 -right-2 text-7xl font-black text-slate-100/90 pointer-events-none select-none font-montserrat">
                0{item.step}
              </div>

              <div className="space-y-4 relative">
                {/* Header row */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color} shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span
                      className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 ${item.badgeColor}`}
                    >
                      Langkah {item.step}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 font-montserrat flex items-center gap-2">
                      <span>{item.title}</span>
                    </h3>
                  </div>
                </div>

                {/* Arabic Subtitle */}
                <div className="font-amiri text-lg text-emerald-800 font-bold" dir="rtl">
                  {item.titleArabic}
                </div>

                {/* Explanation */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {item.shortExplanation}
                </p>

                {/* Practical Tips */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tips Praktis:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {item.tips.map((tip, idx) => (
                      <li key={idx} className="leading-snug">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Quick Action button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {item.step === 4 ? 'Siap menguji diri?' : 'Langkah esensial'}
                </span>
                <button
                  onClick={() => onStartLearning(item.step === 4 ? 'materi' : 'materi')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#114040] hover:text-[#EC853E] transition-colors"
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Banner to dive in */}
      <div className="bg-gradient-to-r from-[#114040] to-[#1a5b5b] rounded-3xl p-8 sm:p-10 text-white max-w-5xl mx-auto shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-orange-200">
            Sudah Paham Petunjuknya?
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-montserrat">
            Ayo Langsung Mulai Belajar & Berlatih!
          </h3>
          <p className="text-teal-100 text-sm max-w-lg">
            Pilih materi favoritmu atau coba kuis seru untuk melihat seberapa jauh kemampuan bahasa
            Arabmu berkembang hari ini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onStartLearning('materi')}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Halaman Materi</span>
          </button>
          <button
            onClick={() => onStartLearning('game')}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4 text-yellow-300" />
            <span>Mulai Bermain</span>
          </button>
        </div>
      </div>
    </div>
  );
};
