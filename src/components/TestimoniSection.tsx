import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Testimonial } from '../types';
import { Star, MessageSquarePlus, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

export const TestimoniSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('rofa_user_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return TESTIMONIALS_DATA;
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Siswa Kelas VII');
  const [newSchool, setNewSchool] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      name: newName.trim(),
      role: newRole,
      school: newSchool.trim() || 'SMP / MTs di Indonesia',
      avatarText: newName
        .trim()
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'RA',
      rating: newRating,
      comment: newComment.trim(),
      badge: 'Pengguna Terverifikasi',
    };

    const updated = [newEntry, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem('rofa_user_testimonials', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }

    setNewName('');
    setNewSchool('');
    setNewComment('');
    setSuccessSubmitted(true);
    setTimeout(() => {
      setSuccessSubmitted(false);
      setShowAddForm(false);
    }, 1800);
  };

  return (
    <div className="py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#114040] text-xs font-bold mb-2">
            <Quote className="w-3.5 h-3.5" />
            <span>Kesan & Pengalaman Pengguna</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#114040] font-montserrat">
            Testimoni Siswa & Guru RofaArabic
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Simak apa kata teman-teman siswa SMP/MTs dan para pengajar bahasa Arab setelah
            menggunakan RofaArabic dalam proses belajar mengajar.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-sm flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{showAddForm ? 'Tutup Formulir' : 'Tulis Pengalamanmu'}</span>
        </button>
      </div>

      {/* Add Testimonial Form (Interactive Modal / Accordion) */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4 max-w-2xl mx-auto animate-in slide-in-from-top-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#114040]">
              Bagikan Kesan Belajarmu di RofaArabic
            </h3>
            <span className="text-xs text-slate-400">*Wajib diisi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Contoh: Farhan Al-Fatih"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Peran / Status
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
              >
                <option value="Siswa Kelas VII">Siswa Kelas VII</option>
                <option value="Siswa Kelas VIII">Siswa Kelas VIII</option>
                <option value="Siswa Kelas IX">Siswa Kelas IX</option>
                <option value="Guru Bahasa Arab">Guru Bahasa Arab</option>
                <option value="Orang Tua Murid">Orang Tua Murid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Asal Sekolah / Madrasah
            </label>
            <input
              type="text"
              value={newSchool}
              onChange={(e) => setNewSchool(e.target.value)}
              placeholder="Contoh: SMP IT / MTs Negeri..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Beri Nilai Bintang
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= newRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-slate-500 font-bold ml-2">
                {newRating} / 5 Bintang
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kesan Pengalaman
            </label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tuliskan apa yang paling kamu sukai dari fitur RofaArabic..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
            />
          </div>

          {successSubmitted && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Terima kasih! Testimonimu berhasil ditambahkan ke daftar.</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#114040] hover:bg-[#1a5b5b] shadow-sm"
            >
              Kirim Testimoni
            </button>
          </div>
        </form>
      )}

      {/* Testimonials Grid or Fresh Empty State */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/90 text-center max-w-xl mx-auto shadow-sm space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 text-[#EC853E] flex items-center justify-center mx-auto shadow-xs">
            <MessageSquarePlus className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#114040]">Belum Ada Testimoni</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Website pembelajaran ini baru saja dirilis! Jadilah pengguna pertama yang membagikan kesan, pengalaman, dan manfaat belajar bahasa Arab bersama RofaArabic.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-sm transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Tulis Pengalaman Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 animate-in fade-in"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>

                {/* Comment text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author info footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#114040] to-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {item.avatarText}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.role} · {item.school}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
