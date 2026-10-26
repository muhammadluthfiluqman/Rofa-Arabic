import React from 'react';
import { PageTab } from '../types';
import aboutImage from '../assets/images/arabic_study_elements_1791192671069.jpg';
import logoImg from '../assets/images/logo_rofaarabic.png';
import {
  BookOpen,
  Headphones,
  FileText,
  BookmarkCheck,
  CheckCircle,
  Gamepad2,
  Globe2,
  Sparkles,
  Heart,
  Quote,
  ArrowRight,
} from 'lucide-react';

interface TentangKamiSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const TentangKamiSection: React.FC<TentangKamiSectionProps> = ({ onNavigate }) => {
  const learningFeatures = [
    { title: 'Mufrodat', desc: 'Kosakata tematik berharakat dengan audio penutur fasih.', icon: BookOpen },
    { title: "Istima’", desc: 'Cerita pendek berbasis audio dengan latihan melengkapi teks rumpang.', icon: Headphones },
    { title: "Qira’ah", desc: 'Teks bacaan lengkap dengan terjemahan dan bantuan kosakata kunci.', icon: FileText },
    { title: 'Qowaid', desc: 'Pemahaman kata ganti (Dhamir) dengan bagan sederhana dan latihan interaktif.', icon: BookmarkCheck },
    { title: 'Latihan Soal', desc: 'Evaluasi berjenjang 3 level (Mudah, Sedang, Sulit) lengkap dengan skor.', icon: CheckCircle },
    { title: 'Game Interaktif', desc: 'Permainan mencocokkan kartu dan kuis kilat yang seru.', icon: Gamepad2 },
  ];

  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Hero Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#114040] via-[#154e4e] to-[#1c5d5d] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-teal-800">
        {/* Subtle background decorative watermark */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 opacity-10 pointer-events-none select-none">
          <img src={logoImg} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-200 text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#EC853E]" />
              <span>Profil Resmi RofaArabic</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-montserrat tracking-tight text-white">
              Selamat Datang di RofaArabic
            </h1>

            {/* Ahlan wa Sahlan Bikum: Centered & White Text */}
            <div className="w-full text-center py-3.5 px-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs shadow-inner">
              <div className="font-amiri text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wider leading-relaxed text-center" dir="rtl">
                أَهْلاً وَسَهْلاً بِكُمْ
              </div>
            </div>

            {/* Justified Description */}
            <p className="text-sm sm:text-base text-teal-100/95 leading-relaxed font-normal text-justify">
              RofaArabic adalah media pembelajaran bahasa Arab berbasis website yang didesain untuk
              membantu siapa saja mempelajari bahasa Arab dengan cara yang lebih mudah, interaktif, dan
              menyenangkan.
            </p>
          </div>

          {/* Proportional Logo filling the empty space comfortably */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-3xl bg-white/10 p-5 sm:p-6 backdrop-blur-md border-2 border-white/20 shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300">
              <img
                src={logoImg}
                alt="Logo RofaArabic"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-teal-200 tracking-wide mt-3 text-center">
              Media Edukasi Mandiri & Interaktif
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Content & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
        
        {/* Left Side: About Text Description */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#114040] font-montserrat">
            Mengenal Media Belajar RofaArabic
          </h2>

          <p className="text-sm text-slate-700 leading-relaxed">
            RofaArabic menyediakan materi pembelajaran Bahasa Arab tingkat pemula yang dapat diakses oleh
            semua kalangan, khususnya dirancang untuk siswa sekolah menengah pertama (rentang usia 12–15 tahun).
            Dengan sistem multimedia, pengguna dapat belajar sekaligus menguji pemahaman secara mandiri dan dapat
            diakses kapan saja dan di mana saja.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            Setiap fitur didesain dengan tampilan yang menarik agar dapat digunakan dengan mudah dan tidak
            membosankan oleh pengguna. Kami percaya bahwa{' '}
            <strong className="text-[#114040] bg-orange-100/70 px-1.5 py-0.5 rounded">
              bahasa dapat menjadi senjata utama untuk menguasai dunia.
            </strong>
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            Semoga dengan hadirnya RofaArabic dapat memberikan manfaat yang besar khususnya bagi siswa
            menengah pertama dan umumnya untuk semua pembelajar bahasa Arab di seluruh penjuru negeri.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => onNavigate('materi')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#114040] hover:bg-[#1a5b5b] text-white shadow-sm transition-all flex items-center gap-2"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('game')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-sm transition-all"
            >
              Mainkan Game Edukasi
            </button>
          </div>
        </div>

        {/* Right Side: Educational Illustration Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 bg-white">
            <img
              src={aboutImage}
              alt="Perlengkapan Belajar RofaArabic"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
            <div className="p-5 bg-gradient-to-t from-[#114040] to-teal-900 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EC853E]">
                <Globe2 className="w-4 h-4" />
                <span>Teknologi Edukasi Mandiri</span>
              </div>
              <p className="text-xs text-teal-100 italic">
                "Bahasa adalah kunci membuka khazanah ilmu pengetahuan dunia dan peradaban mulia."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 6 Features List (As Listed in User Brief) */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#114040] font-montserrat">
            Fitur Pembelajaran di Web Ini Meliputi:
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            6 Pilar metode multimedia interaktif yang terintegrasi secara utuh di RofaArabic
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#114040] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#114040]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 font-montserrat">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspirational Quote Card */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-teal-50 rounded-3xl p-8 border border-orange-200/80 max-w-4xl mx-auto text-center space-y-4 shadow-sm">
        <Quote className="w-10 h-10 text-[#EC853E] mx-auto opacity-70" />
        <div className="font-amiri text-3xl sm:text-4xl font-bold text-[#114040]" dir="rtl">
          تَعَلَّمُوا الْعَرَبِيَّةَ فَإِنَّهَا مِنْ دِينِكُمْ
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-800 max-w-xl mx-auto">
          "Pelajarilah bahasa arab, sebab ia bagian dari agama kalian."
        </p>
        <span className="text-xs sm:text-sm text-slate-600 font-medium block">
          -Umar bin Khattab-
        </span>
      </div>
    </div>
  );
};
