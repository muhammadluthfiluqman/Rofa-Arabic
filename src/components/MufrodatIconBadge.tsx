import React from 'react';
import { MufrodatItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { Sparkles } from 'lucide-react';

// Exact emoji mapping for each of the 270 items matching the user's "ICON WEB" reference document
export const MUFRODAT_EMOJI_MAP: Record<string, string> = {
  // === 1. KELUARGA (30) ===
  'kel-1': '👨', // Ayah
  'kel-2': '👩', // Ibu
  'kel-3': '👦', // Anak Laki-laki
  'kel-4': '👧', // Anak Perempuan
  'kel-5': '👱‍♂️', // Kakak Laki-laki
  'kel-6': '👱‍♀️', // Kakak Perempuan
  'kel-7': '👦', // Adik Laki-laki
  'kel-8': '👧', // Adik Perempuan
  'kel-9': '👴', // Kakek
  'kel-10': '👵', // Nenek
  'kel-11': '👨‍💼', // Paman (Ayah)
  'kel-12': '👩‍💼', // Bibi (Ayah)
  'kel-13': '👱‍♂️', // Paman (Ibu)
  'kel-14': '👱‍♀️', // Bibi (Ibu)
  'kel-15': '👦', // Cucu Laki-laki
  'kel-16': '👧', // Cucu Perempuan
  'kel-17': '👨', // Suami
  'kel-18': '👩', // Istri
  'kel-19': '👨‍👩‍👧‍👦', // Keluarga
  'kel-20': '👫', // Kedua Orang Tua
  'kel-21': '👦', // Sepupu Laki-laki
  'kel-22': '👧', // Sepupu Perempuan
  'kel-23': '👶', // Bayi Laki-laki
  'kel-24': '🚼', // Bayi Perempuan
  'kel-25': '👩‍🍳', // Ibu Rumah Tangga
  'kel-26': '👨‍👩‍👧‍👧', // Kerabat / Famili
  'kel-27': '👨', // Menantu Laki-laki
  'kel-28': '👩', // Menantu Perempuan
  'kel-29': '🧒', // Anak-anak
  'kel-30': '🏡', // Rumah Kakek

  // === 2. MADRASAH (30) ===
  'mad-1': '🏫', // Sekolah
  'mad-2': '🚪', // Kelas
  'mad-3': '📚', // Perpustakaan
  'mad-4': '🔬', // Laboratorium
  'mad-5': '🏟️', // Lapangan Olahraga
  'mad-6': '🍽️', // Kantin Sekolah
  'mad-7': '🕌', // Musholla / Masjid Sekolah
  'mad-8': '📖', // Buku Pelajaran
  'mad-9': '📓', // Buku Catatan / Tulis
  'mad-10': '🖊️', // Pena / Pulpen
  'mad-11': '✏️', // Pensil
  'mad-12': '🧼', // Penghapus Pensil
  'mad-13': '📏', // Penggaris
  'mad-14': '✂️', // Rautan Pensil
  'mad-15': '🎒', // Tas Sekolah
  'mad-16': '👝', // Kotak Pensil
  'mad-17': '📋', // Papan Tulis
  'mad-18': '🧽', // Penghapus Papan Tulis
  'mad-19': '🪑', // Meja Belajar
  'mad-20': '🪑', // Kursi
  'mad-21': '🗄️', // Lemari Buku / Loker
  'mad-22': '📅', // Kalender
  'mad-23': '🗺️', // Peta
  'mad-24': '👨‍🏫', // Kepala Sekolah
  'mad-25': '👨‍🏫', // Guru Laki-laki
  'mad-26': '👩‍🏫', // Guru Perempuan
  'mad-27': '👨‍🎓', // Murid Laki-laki
  'mad-28': '👩‍🎓', // Murid Perempuan
  'mad-29': '👔', // Seragam Sekolah
  'mad-30': '🔔', // Bel Sekolah

  // === 3. HOBI (30) ===
  'hob-1': '📖', // Membaca Buku
  'hob-2': '✍️', // Menulis Puisi / Cerita
  'hob-3': '🎨', // Menggambar / Melukis
  'hob-4': '📸', // Fotografi
  'hob-5': '🍳', // Memasak Makanan
  'hob-6': '🧵', // Menjahit Pakaian
  'hob-7': '🏊‍♂️', // Berenang
  'hob-8': '⚽', // Sepak Bola
  'hob-9': '🏀', // Bola Basket
  'hob-10': '🏐', // Bola Voli
  'hob-11': '🏸', // Bulu Tangkis
  'hob-12': '🏓', // Tenis Meja
  'hob-13': '🚴', // Bersepeda
  'hob-14': '🏇', // Berkuda
  'hob-15': '🎯', // Memanah
  'hob-16': '🏃‍♂️', // Lari Santai / Jogging
  'hob-17': '🎣', // Memancing Ikan
  'hob-18': '⛺', // Berkemah
  'hob-19': '🧗‍♂️', // Mendaki Gunung
  'hob-20': '🧳', // Bepergian / Traveling
  'hob-21': '🎤', // Menyanyi / Nasyid
  'hob-22': '🎹', // Bermain Alat Musik
  'hob-23': '🖌️', // Kaligrafi Arab
  'hob-24': '📖', // Menghafal Al-Qur'an
  'hob-25': '♟️', // Catur
  'hob-26': '🌻', // Berkebun / Bunga
  'hob-27': '✉️', // Filateli / Perangko
  'hob-28': '📺', // Menonton TV Edukasi
  'hob-29': '🎮', // Game Komputer
  'hob-30': '🎭', // Seni Teater / Drama

  // === 4. PROFESI (30) ===
  'pro-1': '👨‍🏫', // Guru Laki-laki
  'pro-2': '👩‍🏫', // Guru Perempuan
  'pro-3': '👨‍⚕️', // Dokter Laki-laki
  'pro-4': '👩‍⚕️', // Dokter Perempuan
  'pro-5': '👨‍⚕️', // Perawat Laki-laki
  'pro-6': '👩‍⚕️', // Perawat Perempuan
  'pro-7': '👨‍🔬', // Apoteker
  'pro-8': '👷‍♂️', // Insinyur / Arsitek
  'pro-9': '👮‍♂️', // Polisi
  'pro-10': '💂‍♂️', // Tentara / Prajurit
  'pro-11': '👨‍✈️', // Pilot
  'pro-12': '👩‍✈️', // Pramugari
  'pro-13': '🚗', // Sopir / Pengemudi
  'pro-14': '👨‍✈️', // Kapten Kapal
  'pro-15': '👨‍🌾', // Petani Laki-laki
  'pro-16': '👩‍🌾', // Petani Perempuan
  'pro-17': '🎣', // Nelayan
  'pro-18': '👨‍💼', // Pedagang / Pengusaha
  'pro-19': '👨‍🍳', // Pembuat Roti
  'pro-20': '👨‍🍳', // Koki / Juru Masak
  'pro-21': '🧵', // Penjahit
  'pro-22': '🔨', // Tukang Kayu
  'pro-23': '👨‍🏭', // Pandai Besi
  'pro-24': '👨‍🎨', // Pelukis
  'pro-25': '🕵️‍♂️', // Wartawan / Jurnalis
  'pro-26': '👨‍⚖️', // Hakim
  'pro-27': '👨‍💼', // Pengacara
  'pro-28': '🕌', // Imam Masjid
  'pro-29': '🏛️', // Presiden
  'pro-30': '💼', // Menteri

  // === 5. TRANSPORTASI (30) ===
  'tra-1': '🚗', // Mobil Pribadi
  'tra-2': '🚌', // Bus Umum
  'tra-3': '🚲', // Sepeda Onthel
  'tra-4': '🏍️', // Sepeda Motor
  'tra-5': '🚆', // Kereta Api
  'tra-6': '🚕', // Taksi
  'tra-7': '🚚', // Truk Pengangkut
  'tra-8': '🚑', // Mobil Ambulans
  'tra-9': '🚒', // Pemadam Kebakaran
  'tra-10': '🚓', // Mobil Polisi
  'tra-11': '🐴', // Delman / Kuda
  'tra-12': '✈️', // Pesawat Terbang
  'tra-13': '🚁', // Helikopter
  'tra-14': '🚀', // Roket Luar Angkasa
  'tra-15': '🎈', // Balon Udara
  'tra-16': '🚢', // Kapal Laut Besar
  'tra-17': '⛵', // Perahu Kecil / Sampan
  'tra-18': '🛳️', // Kapal Selam
  'tra-19': '🚉', // Stasiun Kereta
  'tra-20': '🚏', // Halte Bus
  'tra-21': '🛫', // Bandara Udara
  'tra-22': '⚓', // Pelabuhan Kapal
  'tra-23': '🎫', // Tiket Perjalanan
  'tra-24': '🛂', // Paspor
  'tra-25': '🚦', // Lampu Lalu Lintas
  'tra-26': '🛣️', // Jalan Raya
  'tra-27': '🌉', // Jembatan
  'tra-28': '🚇', // Terowongan Bawah Tanah
  'tra-29': '🏎️', // Cepat
  'tra-30': '🚜', // Lambat

  // === 6. WARNA (30) ===
  'war-1': '⚪', // Putih (M)
  'war-2': '⬜', // Putih (F)
  'war-3': '⚫', // Hitam (M)
  'war-4': '⬛', // Hitam (F)
  'war-5': '🔴', // Merah (M)
  'war-6': '❤️', // Merah (F)
  'war-7': '🔵', // Biru (M)
  'war-8': '💙', // Biru (F)
  'war-9': '🟢', // Hijau (M)
  'war-10': '💚', // Hijau (F)
  'war-11': '🟡', // Kuning (M)
  'war-12': '💛', // Kuning (F)
  'war-13': '🟠', // Oranye (M)
  'war-14': '🔶', // Oranye (F)
  'war-15': '🟤', // Cokelat (M)
  'war-16': '🤎', // Cokelat (F)
  'war-17': '🔘', // Abu-abu (M)
  'war-18': '🩶', // Abu-abu (F)
  'war-19': '🌸', // Pink (M)
  'war-20': '💖', // Pink (F)
  'war-21': '🟣', // Ungu (M)
  'war-22': '💜', // Ungu (F)
  'war-23': '🪙', // Keemasan
  'war-24': '🥈', // Perak
  'war-25': '🎨', // Warna
  'war-26': '🌈', // Warna-warna
  'war-27': '❇️', // Terang / Muda
  'war-28': '🌌', // Gelap / Tua
  'war-29': '🌈', // Pelangi
  'war-30': '💠', // Bening / Kristal

  // === 7. KEGIATAN SEHARI-HARI (30) ===
  'keg-1': '🌅', // Bangun Tidur
  'keg-2': '🚿', // Berwudhu
  'keg-3': '🕌', // Salat Subuh
  'keg-4': '📖', // Membaca Al-Qur'an
  'keg-5': '🛁', // Mandi
  'keg-6': '🪥', // Menggosok Gigi
  'keg-7': '👔', // Memakai Baju
  'keg-8': '🍳', // Sarapan
  'keg-9': '🥛', // Minum Susu
  'keg-10': '🤝', // Berpamitan
  'keg-11': '🚶‍♂️', // Pergi Sekolah
  'keg-12': '🚌', // Bus Sekolah
  'keg-13': '🏫', // Masuk Kelas
  'keg-14': '👂', // Mendengarkan Guru
  'keg-15': '✍️', // Menulis Catatan
  'keg-16': '🙋‍♂️', // Bertanya
  'keg-17': '⏰', // Istirahat
  'keg-18': '⚽', // Bermain Sahabat
  'keg-19': '🏠', // Pulang ke Rumah
  'keg-20': '🍽️', // Makan Siang
  'keg-21': '🛌', // Tidur Siang
  'keg-22': '🕌', // Salat Ashar
  'keg-23': '🧹', // Bantu Ibu
  'keg-24': '📚', // Mengulang Pelajaran
  'keg-25': '📝', // Kerjakan PR
  'keg-26': '📿', // Salat Maghrib
  'keg-27': '🍲', // Makan Malam
  'keg-28': '🕌', // Salat Isya
  'keg-29': '💡', // Matikan Lampu
  'keg-30': '😴', // Tidur Awal

  // === 8. ANGGOTA TUBUH (30) ===
  'tub-1': '👦', // Kepala
  'tub-2': '👱', // Rambut
  'tub-3': '😊', // Wajah
  'tub-4': '👦', // Dahi
  'tub-5': '👁️', // Mata
  'tub-6': '👀', // Alis
  'tub-7': '👃', // Hidung
  'tub-8': '👄', // Mulut
  'tub-9': '👄', // Bibir
  'tub-10': '👅', // Lidah
  'tub-11': '🦷', // Gigi
  'tub-12': '👂', // Telinga
  'tub-13': '😊', // Pipi
  'tub-14': '🗣️', // Dagu
  'tub-15': '👤', // Leher
  'tub-16': '💪', // Pundak / Bahu
  'tub-17': '🫀', // Dada
  'tub-18': '🫄', // Perut
  'tub-19': '🧍‍♂️', // Punggung
  'tub-20': '🖐️', // Tangan
  'tub-21': '💪', // Siku
  'tub-22': '✋', // Telapak Tangan
  'tub-23': '🖖', // Jari Tangan
  'tub-24': '💅', // Kuku
  'tub-25': '👍', // Ibu Jari
  'tub-26': '☝️', // Jari Telunjuk
  'tub-27': '🦵', // Kaki
  'tub-28': '🦵', // Lutut
  'tub-29': '🦵', // Betis
  'tub-30': '🦶', // Telapak Kaki

  // === 9. JAM DAN WAKTU (30) ===
  'wak-1': '⏰', // Jam / Pukul
  'wak-2': '⏱️', // Menit
  'wak-3': '⏲️', // Detik
  'wak-4': '🕧', // Setengah Jam (30 Menit)
  'wak-5': '🕜', // Seperempat Jam (15 Menit)
  'wak-6': '🕐', // Pukul Satu Tepat
  'wak-7': '🕑', // Pukul Dua Tepat
  'wak-8': '🕒', // Pukul Tiga Tepat
  'wak-9': '🕓', // Pukul Empat Tepat
  'wak-10': '🕔', // Pukul Lima Tepat
  'wak-11': '🕕', // Pukul Enam Tepat
  'wak-12': '🕖', // Pukul Tujuh Tepat
  'wak-13': '🕗', // Pukul Delapan Tepat
  'wak-14': '🕘', // Pukul Sembilan Tepat
  'wak-15': '🕙', // Pukul Sepuluh Tepat
  'wak-16': '🕚', // Pukul Sebelas Tepat
  'wak-17': '🕛', // Pukul Dua Belas Tepat
  'wak-18': '🌅', // Pagi Hari
  'wak-19': '☀️', // Siang Hari
  'wak-20': '🌇', // Sore Hari
  'wak-21': '🌃', // Malam Hari
  'wak-22': '⌚', // Sekarang
  'wak-23': '⏳', // Kemarin
  'wak-24': '📅', // Hari Ini
  'wak-25': '⌛', // Besok
  'wak-26': '⏪', // Sebelum
  'wak-27': '⏩', // Sesudah
  'wak-28': '🎯', // Tepat
  'wak-29': '➕', // Lebih
  'wak-30': '➖', // Kurang
};

// Fallback Lucide Icon Mapping for each item
export const MUFRODAT_ICON_MAP: Record<string, keyof typeof LucideIcons> = {
  'kel-1': 'User',
  'kel-2': 'Heart',
  'kel-3': 'User',
  'kel-4': 'Smile',
  'kel-5': 'User',
  'kel-6': 'Smile',
  'kel-7': 'Baby',
  'kel-8': 'Baby',
  'kel-9': 'Users',
  'kel-10': 'HeartHandshake',
  'kel-11': 'UserCheck',
  'kel-12': 'HeartHandshake',
  'kel-13': 'UserCheck',
  'kel-14': 'HeartHandshake',
  'kel-15': 'Baby',
  'kel-16': 'Baby',
  'kel-17': 'HeartHandshake',
  'kel-18': 'HeartHandshake',
  'kel-19': 'Home',
  'kel-20': 'Users',
  'kel-21': 'User',
  'kel-22': 'Smile',
  'kel-23': 'Baby',
  'kel-24': 'Baby',
  'kel-25': 'Home',
  'kel-26': 'Users',
  'kel-27': 'UserCheck',
  'kel-28': 'HeartHandshake',
  'kel-29': 'Users',
  'kel-30': 'Home',

  'mad-1': 'School',
  'mad-2': 'DoorOpen',
  'mad-3': 'Library',
  'mad-4': 'FlaskConical',
  'mad-5': 'Trophy',
  'mad-6': 'Coffee',
  'mad-7': 'Landmark',
  'mad-8': 'BookOpen',
  'mad-9': 'FileText',
  'mad-10': 'PenTool',
  'mad-11': 'Pencil',
  'mad-12': 'Eraser',
  'mad-13': 'Ruler',
  'mad-14': 'Scissors',
  'mad-15': 'Backpack',
  'mad-16': 'Briefcase',
  'mad-17': 'Presentation',
  'mad-18': 'Eraser',
  'mad-19': 'Monitor',
  'mad-20': 'Armchair',
  'mad-21': 'Archive',
  'mad-22': 'Calendar',
  'mad-23': 'MapPin',
  'mad-24': 'GraduationCap',
  'mad-25': 'UserCheck',
  'mad-26': 'UserCheck',
  'mad-27': 'User',
  'mad-28': 'Smile',
  'mad-29': 'Shirt',
  'mad-30': 'Bell',

  'hob-1': 'BookOpen',
  'hob-2': 'PenTool',
  'hob-3': 'Palette',
  'hob-4': 'Camera',
  'hob-5': 'Utensils',
  'hob-6': 'Scissors',
  'hob-7': 'Waves',
  'hob-8': 'Trophy',
  'hob-9': 'Activity',
  'hob-10': 'Activity',
  'hob-11': 'Activity',
  'hob-12': 'Activity',
  'hob-13': 'Bike',
  'hob-14': 'Compass',
  'hob-15': 'Target',
  'hob-16': 'Footprints',
  'hob-17': 'Fish',
  'hob-18': 'Tent',
  'hob-19': 'Mountain',
  'hob-20': 'Plane',
  'hob-21': 'Mic',
  'hob-22': 'Music',
  'hob-23': 'PenTool',
  'hob-24': 'BookOpen',
  'hob-25': 'Crown',
  'hob-26': 'Flower2',
  'hob-27': 'Mail',
  'hob-28': 'Tv',
  'hob-29': 'Gamepad2',
  'hob-30': 'Sparkles',

  'pro-1': 'GraduationCap',
  'pro-2': 'GraduationCap',
  'pro-3': 'Stethoscope',
  'pro-4': 'Stethoscope',
  'pro-5': 'HeartPulse',
  'pro-6': 'HeartPulse',
  'pro-7': 'Pill',
  'pro-8': 'HardHat',
  'pro-9': 'Shield',
  'pro-10': 'ShieldCheck',
  'pro-11': 'Plane',
  'pro-12': 'Smile',
  'pro-13': 'Car',
  'pro-14': 'Anchor',
  'pro-15': 'Sprout',
  'pro-16': 'Sprout',
  'pro-17': 'Fish',
  'pro-18': 'Store',
  'pro-19': 'Utensils',
  'pro-20': 'ChefHat',
  'pro-21': 'Scissors',
  'pro-22': 'Hammer',
  'pro-23': 'Flame',
  'pro-24': 'Palette',
  'pro-25': 'Newspaper',
  'pro-26': 'Scale',
  'pro-27': 'Briefcase',
  'pro-28': 'Landmark',
  'pro-29': 'Crown',
  'pro-30': 'Award',

  'tra-1': 'Car',
  'tra-2': 'Bus',
  'tra-3': 'Bike',
  'tra-4': 'Bike',
  'tra-5': 'Train',
  'tra-6': 'Car',
  'tra-7': 'Truck',
  'tra-8': 'Siren',
  'tra-9': 'Flame',
  'tra-10': 'Shield',
  'tra-11': 'Compass',
  'tra-12': 'Plane',
  'tra-13': 'PlaneTakeoff',
  'tra-14': 'Rocket',
  'tra-15': 'Compass',
  'tra-16': 'Ship',
  'tra-17': 'Sailboat',
  'tra-18': 'Compass',
  'tra-19': 'TrainTrack',
  'tra-20': 'MapPin',
  'tra-21': 'Plane',
  'tra-22': 'Anchor',
  'tra-23': 'Ticket',
  'tra-24': 'FileText',
  'tra-25': 'TrafficCone',
  'tra-26': 'Navigation',
  'tra-27': 'LandPlot',
  'tra-28': 'CircleDot',
  'tra-29': 'Zap',
  'tra-30': 'Timer',

  'war-1': 'Circle',
  'war-2': 'Circle',
  'war-3': 'Circle',
  'war-4': 'Circle',
  'war-5': 'Flame',
  'war-6': 'Flame',
  'war-7': 'Droplet',
  'war-8': 'Droplet',
  'war-9': 'Leaf',
  'war-10': 'Leaf',
  'war-11': 'Sun',
  'war-12': 'Sun',
  'war-13': 'Sun',
  'war-14': 'Sun',
  'war-15': 'Palette',
  'war-16': 'Palette',
  'war-17': 'Circle',
  'war-18': 'Circle',
  'war-19': 'Heart',
  'war-20': 'Heart',
  'war-21': 'Sparkles',
  'war-22': 'Sparkles',
  'war-23': 'Crown',
  'war-24': 'Award',
  'war-25': 'Palette',
  'war-26': 'Palette',
  'war-27': 'SunMedium',
  'war-28': 'Moon',
  'war-29': 'Sparkles',
  'war-30': 'Droplets',

  'keg-1': 'Sunrise',
  'keg-2': 'Droplets',
  'keg-3': 'Landmark',
  'keg-4': 'BookOpen',
  'keg-5': 'Bath',
  'keg-6': 'Sparkles',
  'keg-7': 'Shirt',
  'keg-8': 'Utensils',
  'keg-9': 'Coffee',
  'keg-10': 'HeartHandshake',
  'keg-11': 'School',
  'keg-12': 'Bus',
  'keg-13': 'DoorOpen',
  'keg-14': 'Ear',
  'keg-15': 'Pencil',
  'keg-16': 'HelpCircle',
  'keg-17': 'Clock',
  'keg-18': 'Users',
  'keg-19': 'Home',
  'keg-20': 'Utensils',
  'keg-21': 'Bed',
  'keg-22': 'Landmark',
  'keg-23': 'Heart',
  'keg-24': 'BookOpen',
  'keg-25': 'FileText',
  'keg-26': 'Sunset',
  'keg-27': 'Utensils',
  'keg-28': 'Moon',
  'keg-29': 'LightbulbOff',
  'keg-30': 'Bed',

  'tub-1': 'Brain',
  'tub-2': 'Sparkles',
  'tub-3': 'Smile',
  'tub-4': 'Smile',
  'tub-5': 'Eye',
  'tub-6': 'Eye',
  'tub-7': 'Wind',
  'tub-8': 'Smile',
  'tub-9': 'Smile',
  'tub-10': 'MessageCircle',
  'tub-11': 'Sparkles',
  'tub-12': 'Ear',
  'tub-13': 'Smile',
  'tub-14': 'Smile',
  'tub-15': 'User',
  'tub-16': 'User',
  'tub-17': 'Heart',
  'tub-18': 'Shield',
  'tub-19': 'Activity',
  'tub-20': 'Hand',
  'tub-21': 'Activity',
  'tub-22': 'Hand',
  'tub-23': 'Hand',
  'tub-24': 'Sparkles',
  'tub-25': 'ThumbsUp',
  'tub-26': 'Navigation',
  'tub-27': 'Footprints',
  'tub-28': 'Activity',
  'tub-29': 'Footprints',
  'tub-30': 'Footprints',

  'wak-1': 'Clock',
  'wak-2': 'Timer',
  'wak-3': 'Zap',
  'wak-4': 'Clock',
  'wak-5': 'Clock',
  'wak-6': 'Clock1',
  'wak-7': 'Clock2',
  'wak-8': 'Clock3',
  'wak-9': 'Clock4',
  'wak-10': 'Clock5',
  'wak-11': 'Clock6',
  'wak-12': 'Clock7',
  'wak-13': 'Clock8',
  'wak-14': 'Clock9',
  'wak-15': 'Clock10',
  'wak-16': 'Clock11',
  'wak-17': 'Clock12',
  'wak-18': 'Sunrise',
  'wak-19': 'Sun',
  'wak-20': 'Sunset',
  'wak-21': 'Moon',
  'wak-22': 'Clock',
  'wak-23': 'History',
  'wak-24': 'Calendar',
  'wak-25': 'CalendarClock',
  'wak-26': 'ArrowLeft',
  'wak-27': 'ArrowRight',
  'wak-28': 'CheckCircle',
  'wak-29': 'PlusCircle',
  'wak-30': 'MinusCircle',
};

// Color Swatch data for Tema Warna (war-1 through war-30)
const WARNA_SWATCH: Record<string, { bg: string; border?: string; text: string; glow: string }> = {
  'war-1': { bg: 'bg-white', border: 'border-2 border-slate-300', text: 'text-slate-700', glow: 'shadow-sm' },
  'war-2': { bg: 'bg-white', border: 'border-2 border-slate-300', text: 'text-slate-700', glow: 'shadow-sm' },
  'war-3': { bg: 'bg-slate-900', border: 'border border-slate-800', text: 'text-white', glow: 'shadow-slate-900/30' },
  'war-4': { bg: 'bg-slate-900', border: 'border border-slate-800', text: 'text-white', glow: 'shadow-slate-900/30' },
  'war-5': { bg: 'bg-red-500', border: 'border border-red-600', text: 'text-white', glow: 'shadow-red-500/30' },
  'war-6': { bg: 'bg-red-500', border: 'border border-red-600', text: 'text-white', glow: 'shadow-red-500/30' },
  'war-7': { bg: 'bg-blue-500', border: 'border border-blue-600', text: 'text-white', glow: 'shadow-blue-500/30' },
  'war-8': { bg: 'bg-blue-500', border: 'border border-blue-600', text: 'text-white', glow: 'shadow-blue-500/30' },
  'war-9': { bg: 'bg-emerald-500', border: 'border border-emerald-600', text: 'text-white', glow: 'shadow-emerald-500/30' },
  'war-10': { bg: 'bg-emerald-500', border: 'border border-emerald-600', text: 'text-white', glow: 'shadow-emerald-500/30' },
  'war-11': { bg: 'bg-amber-400', border: 'border border-amber-500', text: 'text-amber-950', glow: 'shadow-amber-400/30' },
  'war-12': { bg: 'bg-amber-400', border: 'border border-amber-500', text: 'text-amber-950', glow: 'shadow-amber-400/30' },
  'war-13': { bg: 'bg-orange-500', border: 'border border-orange-600', text: 'text-white', glow: 'shadow-orange-500/30' },
  'war-14': { bg: 'bg-orange-500', border: 'border border-orange-600', text: 'text-white', glow: 'shadow-orange-500/30' },
  'war-15': { bg: 'bg-amber-900', border: 'border border-amber-950', text: 'text-amber-100', glow: 'shadow-amber-900/30' },
  'war-16': { bg: 'bg-amber-900', border: 'border border-amber-950', text: 'text-amber-100', glow: 'shadow-amber-900/30' },
  'war-17': { bg: 'bg-slate-400', border: 'border border-slate-500', text: 'text-white', glow: 'shadow-slate-400/30' },
  'war-18': { bg: 'bg-slate-400', border: 'border border-slate-500', text: 'text-white', glow: 'shadow-slate-400/30' },
  'war-19': { bg: 'bg-pink-400', border: 'border border-pink-500', text: 'text-white', glow: 'shadow-pink-400/30' },
  'war-20': { bg: 'bg-pink-400', border: 'border border-pink-500', text: 'text-white', glow: 'shadow-pink-400/30' },
  'war-21': { bg: 'bg-purple-600', border: 'border border-purple-700', text: 'text-white', glow: 'shadow-purple-600/30' },
  'war-22': { bg: 'bg-purple-600', border: 'border border-purple-700', text: 'text-white', glow: 'shadow-purple-600/30' },
  'war-23': { bg: 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600', border: 'border border-amber-500', text: 'text-amber-950', glow: 'shadow-amber-500/40' },
  'war-24': { bg: 'bg-gradient-to-br from-slate-200 via-gray-300 to-slate-400', border: 'border border-slate-400', text: 'text-slate-800', glow: 'shadow-slate-400/30' },
  'war-25': { bg: 'bg-gradient-to-br from-red-400 via-amber-400 via-emerald-400 to-blue-500', border: 'border border-slate-200', text: 'text-white', glow: 'shadow-md' },
  'war-26': { bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 via-pink-500 to-amber-400', border: 'border border-slate-200', text: 'text-white', glow: 'shadow-md' },
  'war-27': { bg: 'bg-emerald-200', border: 'border border-emerald-300', text: 'text-emerald-900', glow: 'shadow-emerald-200/30' },
  'war-28': { bg: 'bg-indigo-950', border: 'border border-indigo-900', text: 'text-indigo-200', glow: 'shadow-indigo-950/40' },
  'war-29': { bg: 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500', border: 'border border-white/60', text: 'text-white', glow: 'shadow-lg' },
  'war-30': { bg: 'bg-cyan-50/70 backdrop-blur-sm', border: 'border-2 border-cyan-300', text: 'text-cyan-700', glow: 'shadow-cyan-100/50' },
};

// Digital Pill Badges for Time & Hours (wak-4 through wak-17)
const WAKTU_TIME_LABEL: Record<string, string> = {
  'wak-4': '30 Min',
  'wak-5': '15 Min',
  'wak-6': '01:00',
  'wak-7': '02:00',
  'wak-8': '03:00',
  'wak-9': '04:00',
  'wak-10': '05:00',
  'wak-11': '06:00',
  'wak-12': '07:00',
  'wak-13': '08:00',
  'wak-14': '09:00',
  'wak-15': '10:00',
  'wak-16': '11:00',
  'wak-17': '12:00',
};

interface MufrodatIconBadgeProps {
  item: MufrodatItem;
  size?: 'md' | 'lg';
}

export const MufrodatIconBadge: React.FC<MufrodatIconBadgeProps> = ({ item, size = 'lg' }) => {
  const emoji = MUFRODAT_EMOJI_MAP[item.id] || item.emoji;
  const iconName = MUFRODAT_ICON_MAP[item.id] || (item.icon as keyof typeof LucideIcons) || 'Sparkles';
  const IconComponent = (LucideIcons[iconName] as React.ElementType) || Sparkles;

  const isWarna = item.themeId === 'warna';
  const swatch = isWarna ? WARNA_SWATCH[item.id] : undefined;
  const timeLabel = item.themeId === 'waktu' ? WAKTU_TIME_LABEL[item.id] : undefined;

  // Themed Background & Border classes for the Badge
  const getThemeBadgeStyle = () => {
    if (swatch) {
      return `${swatch.bg} ${swatch.border || ''} ${swatch.text} shadow-md`;
    }

    switch (item.themeId) {
      case 'keluarga':
        return 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 text-[#EC853E] border-2 border-orange-200/80 shadow-sm';
      case 'madrasah':
        return 'bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 text-[#114040] border-2 border-teal-200/80 shadow-sm';
      case 'hobi':
        return 'bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 text-indigo-700 border-2 border-indigo-200/80 shadow-sm';
      case 'profesi':
        return 'bg-gradient-to-br from-sky-50 via-blue-50 to-teal-100 text-sky-800 border-2 border-sky-200/80 shadow-sm';
      case 'transportasi':
        return 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 text-teal-800 border-2 border-cyan-200/80 shadow-sm';
      case 'kegiatan':
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 text-teal-800 border-2 border-emerald-200/80 shadow-sm';
      case 'tubuh':
        return 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-rose-700 border-2 border-rose-200/80 shadow-sm';
      case 'waktu':
        return 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 text-amber-800 border-2 border-amber-200/80 shadow-sm';
      default:
        return 'bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-sm';
    }
  };

  const containerSize =
    size === 'lg'
      ? 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl'
      : 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl';

  const emojiTextSize =
    size === 'lg'
      ? 'text-4xl sm:text-5xl'
      : 'text-3xl sm:text-4xl';

  const iconSize =
    size === 'lg'
      ? 'w-11 h-11 sm:w-12 sm:h-12'
      : 'w-9 h-9 sm:w-10 sm:h-10';

  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 select-none ${containerSize} ${getThemeBadgeStyle()}`}
    >
      {emoji ? (
        <span
          className={`${emojiTextSize} leading-none transition-transform group-hover:scale-110 drop-shadow-sm filter`}
          role="img"
          aria-label={item.indonesian}
        >
          {emoji}
        </span>
      ) : (
        <IconComponent className={`${iconSize} stroke-[2.2] transition-transform`} />
      )}

      {/* Digital Hour Badge for Time / Clock Flashcards */}
      {timeLabel && (
        <span className="absolute -bottom-2 bg-[#114040] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md tracking-wider border border-white">
          {timeLabel}
        </span>
      )}
    </div>
  );
};
