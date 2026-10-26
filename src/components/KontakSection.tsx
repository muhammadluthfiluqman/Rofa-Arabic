import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

export const KontakSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderWa, setSenderWa] = useState('');
  const [messageTopic, setMessageTopic] = useState('Pertanyaan Materi');
  const [messageBody, setMessageBody] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !messageBody) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setSenderWa('');
      setMessageBody('');
      setIsSubmitted(false);
    }, 3500);
  };

  const whatsappNumber = '087704790852';
  const whatsappUrl = `https://wa.me/6287704790852?text=${encodeURIComponent(
    'Halo Admin RofaArabic, saya ingin bertanya tentang pembelajaran bahasa Arab...'
  )}`;
  const emailAddress = 'rofaarabic@gmail.com';
  const mailtoUrl = `mailto:rofaarabic@gmail.com?subject=${encodeURIComponent(
    'Pertanyaan Mengenai RofaArabic'
  )}`;

  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#114040] text-xs font-bold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Layanan Bantuan & Kerjasama</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#114040] font-montserrat">
          Hubungi Tim RofaArabic
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Punya pertanyaan seputar materi bahasa Arab, masukan fitur, atau ingin berkonsultasi untuk sekolah?
          Kami siap membantu dengan senang hati!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* Left Column: Direct Official Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Card (Official Number: 087704790852) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  WhatsApp Resmi
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat">
                  Chat Langsung Admin
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Konsultasi cepat, tanya materi, dan tanggapan kilat melalui WhatsApp resmi RofaArabic.
            </p>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900 font-mono">
                {whatsappNumber}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">
                Aktif
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <span>Buka WhatsApp Sekarang</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Email Card (Official: rofaarabic@gmail.com) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EC853E] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#EC853E] uppercase tracking-wider">
                  Email Resmi
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-montserrat">
                  Kirim Surat Elektronik
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk saran pengembangan kurikulum, kerjasama sekolah, dan pertanyaan formal.
            </p>

            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 font-mono">
                {emailAddress}
              </span>
              <span className="text-[11px] font-semibold text-[#EC853E] bg-white px-2 py-0.5 rounded shadow-xs">
                Resmi
              </span>
            </div>

            <a
              href={mailtoUrl}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#114040] hover:bg-[#1a5b5b] text-white flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <span>Kirim Email ke Admin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Service Hours */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>Jam Operasional Pelayanan:</span>
            </div>
            <p>Senin – Sabtu: 08.00 – 20.00 WIB</p>
            <p>Ahad & Hari Libur Nasional: Pelayanan berkala</p>
          </div>

        </div>

        {/* Right Column: Interactive Send Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-[#114040] font-montserrat">
              Kirim Pesan atau Pertanyaan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tuliskan pertanyaanmu dan tim admin RofaArabic akan merespon sesegera mungkin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Nama lengkap atau panggilan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email (Opsional)
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="alamat@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="tel"
                  value={senderWa}
                  onChange={(e) => setSenderWa(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Pesan
                </label>
                <select
                  value={messageTopic}
                  onChange={(e) => setMessageTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
                >
                  <option value="Pertanyaan Materi">Pertanyaan Materi Bahasa Arab</option>
                  <option value="Kritik & Saran Fitur">Kritik & Saran Fitur Aplikasi</option>
                  <option value="Kerjasama Sekolah">Kerjasama Sekolah / Guru</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Isi Pesan *
              </label>
              <textarea
                required
                rows={4}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Tuliskan pertanyaan atau pesanmu dengan jelas di sini..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#114040]"
              />
            </div>

            {isSubmitted && (
              <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Pesan Anda berhasil terkirim! Tim RofaArabic akan segera membalas ke kontak Anda.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirimkan Pesan Sekarang</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
