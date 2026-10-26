import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { THEMES_DATA } from '../data/themesData';
import {
  X,
  Trophy,
  Award,
  Flame,
  BookOpen,
  Headphones,
  FileText,
  BookmarkCheck,
  CheckCircle2,
  Gamepad2,
  Sparkles,
  Lock,
  LogOut,
  RefreshCw,
  User as UserIcon,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const ProgressModal: React.FC = () => {
  const {
    user,
    profile,
    progress,
    isProgressModalOpen,
    closeProgressModal,
    openAuthModal,
    signOut,
    updateUserPassword,
    resetProgress,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'ringkasan' | 'tema' | 'prestasi' | 'pengaturan'>('ringkasan');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  if (!isProgressModalOpen) return null;

  // Level calculations based on Total XP
  const xp = progress.totalXp;
  let levelTitle = "Mubtadi' I (Pemula)";
  let currentLevel = 1;
  let nextLevelXp = 200;
  let prevLevelXp = 0;

  if (xp >= 1000) {
    levelTitle = 'Mutamayyiz (Pakar Bahasa)';
    currentLevel = 4;
    nextLevelXp = 2000;
    prevLevelXp = 1000;
  } else if (xp >= 500) {
    levelTitle = 'Thalib Mujtahid (Pelajar Teladan)';
    currentLevel = 3;
    nextLevelXp = 1000;
    prevLevelXp = 500;
  } else if (xp >= 200) {
    levelTitle = 'Mubtadi\' II (Penjelajah Bahasa)';
    currentLevel = 2;
    nextLevelXp = 500;
    prevLevelXp = 200;
  }

  const levelProgressPercent = Math.min(
    100,
    Math.round(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100)
  );

  const totalWordsLearned = progress.completedMufrodat.length;
  const totalIstimaDone = progress.completedIstima.length;
  const totalQiraahDone = progress.completedQiraah.length;
  const totalQowaidDone = progress.completedQowaid.length;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', text: 'Kata sandi minimal 6 karakter.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }

    setIsChangingPass(true);
    try {
      await updateUserPassword(newPassword);
      setPasswordStatus({ type: 'success', text: 'Kata sandi berhasil diperbarui!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordStatus({ type: 'error', text: err.message || 'Gagal mengubah kata sandi.' });
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua riwayat progres belajar Anda?')) {
      await resetProgress();
    }
  };

  const achievements = [
    {
      id: 'ach-1',
      title: 'Langkah Pertama',
      desc: 'Pelajari minimal 5 mufrodat pertama',
      icon: BookOpen,
      achieved: totalWordsLearned >= 5,
    },
    {
      id: 'ach-2',
      title: 'Pendengar Handal',
      desc: "Selesaikan 2 latihan cerita Istima'",
      icon: Headphones,
      achieved: totalIstimaDone >= 2,
    },
    {
      id: 'ach-3',
      title: 'Pembaca Teliti',
      desc: "Tuntaskan 1 pemahaman Qira'ah",
      icon: FileText,
      achieved: totalQiraahDone >= 1,
    },
    {
      id: 'ach-4',
      title: 'Ahli Dhamir',
      desc: 'Kuasai materi latihan Qowaid',
      icon: BookmarkCheck,
      achieved: totalQowaidDone >= 1,
    },
    {
      id: 'ach-5',
      title: 'Juara Kuis',
      desc: 'Raih nilai 10/10 pada kuis latihan soal',
      icon: Trophy,
      achieved: progress.quizEasyScore >= 10 || progress.quizMediumScore >= 10 || progress.quizHardScore >= 10,
    },
    {
      id: 'ach-6',
      title: 'Bintang Game',
      desc: 'Capai skor minimal 100 pada game mencocokkan kata',
      icon: Gamepad2,
      achieved: progress.gameHighScore >= 100,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#114040] via-[#165151] to-[#114040] text-white p-6 relative shrink-0">
          <button
            onClick={closeProgressModal}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              {profile?.photoURL || user?.photoURL ? (
                <img
                  src={profile?.photoURL || user?.photoURL || ''}
                  alt={profile?.displayName || 'User'}
                  className="w-16 h-16 rounded-2xl border-2 border-[#EC853E] shadow-md object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#EC853E] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  {profile?.displayName?.charAt(0).toUpperCase() || 'R'}
                </div>
              )}
              {user && (
                <div
                  title="Akun Google Terverifikasi"
                  className="absolute -bottom-1 -right-1 bg-white text-[#114040] p-1 rounded-full shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold font-montserrat">
                  {profile?.displayName || user?.displayName || 'Sahabat RofaArabic (Tamu)'}
                </h3>
                {profile?.username && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-orange-200 font-mono">
                    @{profile.username}
                  </span>
                )}
              </div>

              <div className="text-xs text-teal-200 mt-0.5">
                {user?.email ? (
                  <span>Terhubung: {user.email}</span>
                ) : (
                  <span className="text-orange-200 flex items-center justify-center sm:justify-start gap-1">
                    Mode Tamu • Progres tersimpan lokal
                  </span>
                )}
              </div>

              {/* Level & XP Strip */}
              <div className="mt-3 bg-black/20 rounded-xl p-2.5 flex items-center gap-3">
                <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EC853E] text-white font-bold text-xs">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Level {currentLevel}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-semibold text-teal-100 mb-1">
                    <span>{levelTitle}</span>
                    <span className="text-orange-200 font-bold">{xp} XP</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-[#EC853E] h-full rounded-full transition-all duration-500"
                      style={{ width: `${levelProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!user && (
            <div className="mt-4 p-3 bg-[#EC853E]/20 border border-[#EC853E]/40 rounded-xl flex items-center justify-between text-xs">
              <span>Simpan pencapaian Anda secara permanen di cloud</span>
              <button
                onClick={() => {
                  closeProgressModal();
                  openAuthModal('register');
                }}
                className="px-3 py-1.5 bg-[#EC853E] text-white rounded-lg font-bold hover:bg-[#d9732d] shadow-xs shrink-0 ml-2"
              >
                Masuk Google
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50/80 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'ringkasan'
                ? 'border-[#114040] text-[#114040]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('tema')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'tema'
                ? 'border-[#114040] text-[#114040]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            9 Tema Pembelajaran
          </button>
          <button
            onClick={() => setActiveTab('prestasi')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'prestasi'
                ? 'border-[#114040] text-[#114040]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Lencana ({achievements.filter((a) => a.achieved).length}/6)
          </button>
          {user && (
            <button
              onClick={() => setActiveTab('pengaturan')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'pengaturan'
                  ? 'border-[#114040] text-[#114040]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Akun & Sandi
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: RINGKASAN */}
          {activeTab === 'ringkasan' && (
            <div className="space-y-6">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex flex-col items-center text-center">
                  <BookOpen className="w-5 h-5 text-[#114040] mb-1" />
                  <span className="text-xl font-extrabold text-[#114040]">{totalWordsLearned}</span>
                  <span className="text-[11px] text-gray-600 font-medium">Kosakata Dikuasai</span>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 flex flex-col items-center text-center">
                  <Headphones className="w-5 h-5 text-[#EC853E] mb-1" />
                  <span className="text-xl font-extrabold text-[#EC853E]">{totalIstimaDone}</span>
                  <span className="text-[11px] text-gray-600 font-medium">Cerita Istima'</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col items-center text-center">
                  <FileText className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xl font-extrabold text-emerald-700">{totalQiraahDone}</span>
                  <span className="text-[11px] text-gray-600 font-medium">Teks Qira'ah</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col items-center text-center">
                  <BookmarkCheck className="w-5 h-5 text-purple-600 mb-1" />
                  <span className="text-xl font-extrabold text-purple-700">{totalQowaidDone}</span>
                  <span className="text-[11px] text-gray-600 font-medium">Latihan Qowaid</span>
                </div>
              </div>

              {/* Quiz & Game Scores */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Rekor Skor Tertinggi</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-gray-500">Kuis Mudah</div>
                      <div className="font-bold text-[#114040] text-sm">
                        {progress.quizEasyScore > 0 ? `${progress.quizEasyScore}/10 Soal` : 'Belum coba'}
                      </div>
                    </div>
                    {progress.quizEasyScore === 10 && <Award className="w-5 h-5 text-amber-500" />}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-gray-500">Kuis Sedang</div>
                      <div className="font-bold text-[#114040] text-sm">
                        {progress.quizMediumScore > 0 ? `${progress.quizMediumScore}/10 Soal` : 'Belum coba'}
                      </div>
                    </div>
                    {progress.quizMediumScore === 10 && <Award className="w-5 h-5 text-amber-500" />}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-gray-500">Kuis Sulit</div>
                      <div className="font-bold text-[#114040] text-sm">
                        {progress.quizHardScore > 0 ? `${progress.quizHardScore}/10 Soal` : 'Belum coba'}
                      </div>
                    </div>
                    {progress.quizHardScore === 10 && <Award className="w-5 h-5 text-amber-500" />}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-gray-500">Game Kartu</div>
                      <div className="font-bold text-[#EC853E] text-sm">
                        {progress.gameHighScore > 0 ? `${progress.gameHighScore} Poin` : 'Belum main'}
                      </div>
                    </div>
                    <Gamepad2 className="w-5 h-5 text-[#EC853E]" />
                  </div>
                </div>
              </div>

              {/* Study Streak Banner */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200">
                <div className="p-2.5 rounded-xl bg-[#EC853E] text-white">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">
                    Semangat Belajar Bahasa Arab!
                  </div>
                  <div className="text-xs text-gray-600">
                    Aktivitas terakhir: {progress.lastActiveDate || 'Hari ini'}. Terus tingkatkan hafalan mufrodat Anda setiap hari!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEMA PEMBELAJARAN */}
          {activeTab === 'tema' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 mb-2">
                Pantau penguasaan 30 kosakata dan materi pada masing-masing dari 9 tema RofaArabic:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {THEMES_DATA.map((theme, idx) => {
                  // Count words learned in this theme
                  const themeWordsCount = progress.completedMufrodat.filter((id) =>
                    id.startsWith(theme.id.substring(0, 3))
                  ).length;
                  const themePercent = Math.min(100, Math.round((themeWordsCount / 30) * 100));

                  return (
                    <div
                      key={theme.id}
                      className="p-4 rounded-2xl border border-gray-200 hover:border-teal-300 transition-all bg-white shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400">#{idx + 1}</span>
                        <span className="font-amiri text-base font-bold text-[#114040]" dir="rtl">
                          {theme.nameArabic}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-gray-900">{theme.name}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-gray-500">
                          <span>{themeWordsCount}/30 Kosakata</span>
                          <span className="font-bold text-[#114040]">{themePercent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#114040] h-full rounded-full transition-all duration-300"
                            style={{ width: `${themePercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRESTASI / BADGES */}
          {activeTab === 'prestasi' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => {
                const IconComponent = ach.icon;
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                      ach.achieved
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-gray-50/60 border-gray-200 text-gray-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        ach.achieved ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                          {ach.title}
                        </h4>
                        {ach.achieved && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{ach.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-gray-200">
                        {ach.achieved ? 'Telah Diraih ✓' : 'Belum Terkunci'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: AKUN & KATA SANDI */}
          {activeTab === 'pengaturan' && user && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 space-y-2">
                <div className="font-bold text-sm text-[#114040] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Informasi Akun Terdaftar</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                  <div>
                    <span className="text-gray-400">Akun Google:</span>
                    <p className="font-semibold truncate">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Username:</span>
                    <p className="font-semibold">@{profile?.username || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Form Ganti Kata Sandi */}
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#EC853E]" />
                  <span>Ubah Kata Sandi / PIN Akun</span>
                </h4>

                {passwordStatus && (
                  <div
                    className={`p-3 text-xs rounded-xl border ${
                      passwordStatus.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {passwordStatus.text}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-4 py-2.5 rounded-xl bg-[#114040] hover:bg-[#1a5b5b] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
                >
                  {isChangingPass ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                </button>
              </form>

              {/* Reset & Sign Out Options */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 hover:underline font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Progres Belajar</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    closeProgressModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 text-gray-500" />
                  <span>Keluar Akun (Sign Out)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-end shrink-0">
          <button
            onClick={closeProgressModal}
            className="px-5 py-2 rounded-xl bg-[#114040] hover:bg-[#1a5b5b] text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            Lanjutkan Belajar
          </button>
        </div>

      </div>
    </div>
  );
};
