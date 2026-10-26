import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/images/logo_rofaarabic.png';
import {
  X,
  Lock,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    pendingGoogleUser,
    user,
    profile,
    closeAuthModal,
    signInWithGoogle,
    completeProfileRegistration,
    verifyAndResetPasswordWithGoogle,
    openAuthModal,
  } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleClick = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal masuk dengan Google. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage('Silakan tentukan username Anda.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    try {
      await completeProfileRegistration(username, password);
      setSuccessMessage('Pendaftaran berhasil! Selamat datang di RofaArabic.');
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyelesaikan pendaftaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password.length < 6) {
      setErrorMessage('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyAndResetPasswordWithGoogle(password);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          closeAuthModal();
        }, 1500);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memulihkan kata sandi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#114040] via-[#165151] to-[#114040] p-6 text-white text-center relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-white/20">
            <img
              src={logoImg}
              alt="Logo RofaArabic"
              className="w-full h-full object-contain"
            />
          </div>

          <h3 className="text-xl font-bold font-montserrat">
            {authModalMode === 'setup_profile'
              ? 'Lengkapi Akun RofaArabic'
              : authModalMode === 'forgot_password'
              ? 'Atur Ulang Kata Sandi'
              : 'Masuk ke RofaArabic'}
          </h3>
          <p className="text-xs text-teal-100 mt-1 max-w-xs mx-auto">
            {authModalMode === 'setup_profile'
              ? 'Tentukan username dan kata sandi untuk akun Google Anda'
              : authModalMode === 'forgot_password'
              ? 'Verifikasi akun Google Anda untuk memperbarui kata sandi'
              : 'Wajib terhubung dengan Akun Google untuk menyimpan progres belajar Anda'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode 1: LOGIN / REGISTER INTRO */}
          {(authModalMode === 'login' || authModalMode === 'register') && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-[#114040] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#EC853E]" />
                  <span>Integrasi Akun Google Resmi</span>
                </div>
                Setiap siswa wajib mendaftarkan akun menggunakan <strong>Akun Google</strong> agar progres hafalan, skor kuis, dan tingkatan belajar tersimpan otomatis secara mandiri.
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleClick}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm shadow-xs transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                <span>{isSubmitting ? 'Menghubungkan...' : 'Lanjutkan dengan Akun Google'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span>Punya masalah dengan sandi?</span>
                <button
                  type="button"
                  onClick={() => openAuthModal('forgot_password')}
                  className="text-[#EC853E] hover:underline font-semibold"
                >
                  Lupa Sandi?
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: SETUP PROFILE (Username & Password for Google User) */}
          {authModalMode === 'setup_profile' && (
            <form onSubmit={handleProfileComplete} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-teal-50/70 rounded-xl border border-teal-100">
                {pendingGoogleUser?.photoURL ? (
                  <img
                    src={pendingGoogleUser.photoURL}
                    alt="Google Profile"
                    className="w-10 h-10 rounded-full border border-teal-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#114040] text-white flex items-center justify-center font-bold">
                    G
                  </div>
                )}
                <div className="text-left text-xs overflow-hidden">
                  <div className="font-bold text-[#114040] truncate">
                    {pendingGoogleUser?.displayName || 'Pengguna Google'}
                  </div>
                  <div className="text-gray-500 truncate">{pendingGoogleUser?.email}</div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Akun Google Terverifikasi
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pilih Username / Nama Panggilan
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="misal: ahmad_fauzi"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040] focus:ring-2 focus:ring-[#114040]/10"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Gunakan 3-30 karakter (huruf, angka, tanpa spasi).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kata Sandi / PIN Akun RofaArabic
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040] focus:ring-2 focus:ring-[#114040]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040] focus:ring-2 focus:ring-[#114040]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#EC853E] hover:bg-[#d9732d] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Menyimpan...' : 'Selesaikan Pendaftaran & Mulai'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mode 3: FORGOT PASSWORD */}
          {authModalMode === 'forgot_password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <KeyRound className="w-4 h-4 text-[#EC853E]" />
                  <span>Pemulihan Terintegrasi Google</span>
                </div>
                Masukkan kata sandi baru Anda, lalu tekan tombol di bawah untuk memverifikasi kepemilikan melalui Akun Google terdaftar Anda.
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040] focus:ring-2 focus:ring-[#114040]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#114040] focus:ring-2 focus:ring-[#114040]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#114040] hover:bg-[#1a5b5b] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isSubmitting ? 'Memverifikasi...' : 'Verifikasi Google & Atur Ulang Sandi'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-xs text-gray-500 hover:text-gray-800 font-medium"
                >
                  Kembali ke Masuk
                </button>
              </div>
            </form>
          )}

          {/* Guest advice */}
          <div className="pt-2 text-center">
            <button
              onClick={closeAuthModal}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Lanjutkan belajar sebagai tamu untuk sementara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
