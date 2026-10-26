import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import {
  Gamepad2,
  Menu,
  X,
  BookOpen,
  CheckCircle,
  Zap,
  LogOut,
  User as UserIcon,
  ShieldCheck,
} from 'lucide-react';
import { calculateOverallProgress } from '../utils/progress';
import { THEMES_DATA } from '../data/themesData';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/images/logo_rofaarabic.png';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overallProgress, setOverallProgress] = useState(() =>
    calculateOverallProgress(THEMES_DATA.map((t) => t.id))
  );

  const {
    user,
    profile,
    progress,
    openAuthModal,
    openProgressModal,
    signOut,
  } = useAuth();

  useEffect(() => {
    const updateProgress = () => {
      setOverallProgress(calculateOverallProgress(THEMES_DATA.map((t) => t.id)));
    };
    window.addEventListener('rofaarabic_progress_updated', updateProgress);
    window.addEventListener('storage', updateProgress);
    return () => {
      window.removeEventListener('rofaarabic_progress_updated', updateProgress);
      window.removeEventListener('storage', updateProgress);
    };
  }, []);

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'petunjuk', label: 'Petunjuk Penggunaan' },
    { id: 'materi', label: 'Materi' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'kontak', label: 'Kontak' },
    { id: 'tentang', label: 'Tentang Kami' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#114040] text-white shadow-md border-b border-[#195858]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <button
              onClick={() => handleNavClick('beranda')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EC853E] rounded-lg p-0.5 sm:p-1"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <img
                  src={logoImg}
                  alt="RofaArabic Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#EC853E] font-montserrat truncate">
                    Rofa<span className="text-white">Arabic</span>
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] sm:text-[11px] text-teal-200/80 -mt-0.5 sm:-mt-1 font-medium tracking-wide truncate">
                  Arabic Interactive Learning
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EC853E] ${
                    isActive
                      ? 'text-[#EC853E] bg-white/10 font-semibold'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: User Auth / Profile + Distinct "Mulai Bermain" & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* User Account / Google Login Pill */}
            {user ? (
              <button
                onClick={openProgressModal}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-left group"
                title="Lihat Progres & Akun Anda"
              >
                {profile?.photoURL || user.photoURL ? (
                  <img
                    src={profile?.photoURL || user.photoURL || ''}
                    alt={profile?.displayName || 'User'}
                    className="w-7 h-7 rounded-lg object-cover border border-[#EC853E]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-[#EC853E] text-white flex items-center justify-center font-bold text-xs">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-white group-hover:text-orange-200 leading-tight truncate max-w-[100px]">
                    {profile?.username ? `@${profile.username}` : user.displayName?.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-teal-200 flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 text-[#EC853E] fill-current" />
                    {progress.totalXp} XP
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all shadow-xs"
                title="Masuk dengan Akun Google"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="hidden sm:inline">Masuk Google</span>
                <span className="sm:hidden">Masuk</span>
              </button>
            )}

            {/* Quick Progress Badge on Desktop */}
            <button
              onClick={openProgressModal}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-teal-100 transition-all"
              title="Buka Dasbor Progres Belajar"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Progres: <strong className="text-white">{overallProgress.percentage}%</strong></span>
            </button>

            {/* Distinct CTA Action "Mulai Bermain" (Hidden on mobile phones to prevent overflow, accessible via floating button & drawer) */}
            <button
              onClick={() => handleNavClick('game')}
              className={`hidden sm:flex relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-lg active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white ${
                currentTab === 'game'
                  ? 'bg-white text-[#114040] shadow-white/20'
                  : 'bg-[#EC853E] text-white hover:bg-[#d9732d] shadow-orange-900/30 hover:shadow-orange-500/40 ring-2 ring-orange-300/40'
              }`}
            >
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span>Mulai Bermain</span>
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-300 text-[#114040] text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                GAME
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d3232] border-t border-[#195858] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          
          {/* User Status Bar in Mobile Drawer */}
          {user ? (
            <div className="p-3 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {profile?.photoURL || user.photoURL ? (
                  <img
                    src={profile?.photoURL || user.photoURL || ''}
                    alt="User"
                    className="w-9 h-9 rounded-lg object-cover border border-[#EC853E]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-[#EC853E] text-white flex items-center justify-center font-bold text-sm">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {profile?.displayName || user.displayName}
                  </div>
                  <div className="text-[10px] text-teal-300">
                    @{profile?.username || 'user'} • {progress.totalXp} XP
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProgressModal();
                }}
                className="px-2.5 py-1 bg-[#EC853E] text-white text-xs font-bold rounded-lg shadow-xs"
              >
                Progres
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('login');
              }}
              className="w-full p-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 flex items-center justify-center gap-2 text-xs font-bold text-white mb-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Masuk dengan Akun Google</span>
            </button>
          )}

          <div className="pb-1 mb-1 border-b border-teal-900 flex items-center justify-between text-xs font-semibold text-teal-300 uppercase tracking-wider px-2">
            <span>Navigasi Menu</span>
            <span className="text-emerald-300 font-bold">Progres: {overallProgress.percentage}%</span>
          </div>

          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#EC853E] text-white font-semibold'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-xs bg-black/20 px-2 py-0.5 rounded">Aktif</span>}
              </button>
            );
          })}

          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleNavClick('game')}
              className="w-full text-center px-4 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#EC853E] to-amber-500 text-white shadow-md flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Mulai Bermain Game Arab</span>
            </button>

            {user && (
              <button
                onClick={async () => {
                  setMobileMenuOpen(false);
                  await signOut();
                }}
                className="w-full text-center px-4 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-white/5 flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
