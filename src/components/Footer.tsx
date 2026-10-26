import React from 'react';
import { PageTab } from '../types';
import { MessageCircle, Mail, Heart, Gamepad2, Sparkles } from 'lucide-react';
import logoImg from '../assets/images/logo_rofaarabic.png';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0b2b2b] text-white border-t border-[#154646] pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-teal-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src={logoImg}
                  alt="RofaArabic Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-montserrat tracking-tight text-[#EC853E]">
                Rofa<span className="text-white">Arabic</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed max-w-sm">
              Media pembelajaran bahasa Arab berbasis website untuk siswa Sekolah Menengah Pertama (12–15 tahun).
              Belajar kosakata, pendengaran audio, bacaan, kaidah tata bahasa, dan kuis edukatif secara mandiri.
            </p>

            <div className="font-amiri text-lg text-emerald-300 font-bold" dir="rtl">
              تَعَلَّمِ العَرَبِيَّةَ فِي كُلِّ وَقْتٍ وَحِيْنٍ
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-200">
              Navigasi Halaman
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-teal-100">
              <button
                onClick={() => onNavigate('beranda')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Beranda
              </button>
              <button
                onClick={() => onNavigate('petunjuk')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Petunjuk Penggunaan
              </button>
              <button
                onClick={() => onNavigate('materi')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Materi Belajar
              </button>
              <button
                onClick={() => onNavigate('game')}
                className="text-left text-[#EC853E] font-bold hover:underline transition-colors py-1 flex items-center gap-1"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Mulai Bermain</span>
              </button>
              <button
                onClick={() => onNavigate('testimoni')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Testimoni
              </button>
              <button
                onClick={() => onNavigate('kontak')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Kontak Kami
              </button>
              <button
                onClick={() => onNavigate('tentang')}
                className="text-left hover:text-[#EC853E] transition-colors py-1"
              >
                Tentang Kami
              </button>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-200">
              Hubungi Kami
            </h4>
            <div className="space-y-2 text-xs text-teal-100">
              <a
                href="https://wa.me/6287704790852"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>087704790852 (WhatsApp)</span>
              </a>

              <a
                href="mailto:rofaarabic@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#EC853E] shrink-0" />
                <span>rofaarabic@gmail.com</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-teal-300/70">
              Tagline: <em>"Belajar Bahasa Arab Kapan Saja & Di Mana Saja"</em>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200/70">
          <p>© {new Date().getFullYear()} RofaArabic. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            <span>Didedikasikan untuk para pembelajar bahasa Arab di seluruh penjuru negeri</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
