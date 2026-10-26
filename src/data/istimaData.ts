import { IstimaStory } from '../types';

export const ISTIMA_STORIES: IstimaStory[] = [
  // ================= TEMA 1: KELUARGA (2 Cerita) =================
  {
    id: 'ist-kel-1',
    themeId: 'keluarga',
    title: 'Keluarga Bahagia di Hari Libur',
    titleArabic: 'الأُسْرَةُ السَّعِيْدَةُ فِي العُطْلَةِ',
    durationSeconds: 32,
    storyArabicFull:
      'فِي يَوْمِ العُطْلَةِ، تَجْتَمِعُ الأُسْرَةُ فِي غُرْفَةِ الجُلُوْسِ. الأَبُ يَقْرَأُ الجَرِيْدَةَ، وَالأُمُّ تُعِدُّ الطَّعَامَ فِي المَطْبَخِ، وَالأَخُ الصَّغِيْرُ يَلْعَبُ بِاللُّعْبَةِ.',
    storyArabicCloze:
      'فِي يَوْمِ العُطْلَةِ، تَجْتَمِعُ [...] (١) فِي غُرْفَةِ الجُلُوْسِ. الأَبُ يَقْرَأُ [...] (٢)، وَالأُمُّ تُعِدُّ الطَّعَامَ فِي [...] (٣)، وَالأَخُ الصَّغِيْرُ يَلْعَبُ بِاللُّعْبَةِ.',
    storyTranslation:
      'Pada hari libur, keluarga berkumpul di ruang tamu. Ayah membaca koran, ibu menyiapkan makanan di dapur, dan adik laki-laki bermain mainan.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Siapakah yang berkumpul di ruang tamu pada rumpang nomor (١)?',
        options: ['الأُسْرَةُ (Keluarga)', 'الأَصْدِقَاءُ (Teman-teman)', 'المُعَلِّمُوْنَ (Para Guru)', 'الجِيْرَانُ (Tetangga)'],
        correctIndex: 0,
        explanation: 'Kata yang tepat sesuai audio adalah الأُسْرَةُ (Keluarga).',
      },
      {
        questionNumber: 2,
        prompt: 'Apa yang sedang dibaca oleh Ayah pada rumpang nomor (٢)?',
        options: ['الكِتَابَ (Buku)', 'الجَرِيْدَةَ (Koran)', 'المَجَلَّةَ (Majalah)', 'القُرْآنَ (Al-Qur’an)'],
        correctIndex: 1,
        explanation: 'Ayah membaca koran: الأَبُ يَقْرَأُ الجَرِيْدَةَ.',
      },
      {
        questionNumber: 3,
        prompt: 'Di manakah Ibu menyiapkan makanan pada rumpang nomor (٣)?',
        options: ['الحَمَّامِ (Kamar mandi)', 'الحَدِيْقَةِ (Taman)', 'المَطْبَخِ (Dapur)', 'الغُرْفَةِ (Kamar tidur)'],
        correctIndex: 2,
        explanation: 'Ibu memasak di dapur: فِي المَطْبَخِ.',
      },
    ],
  },
  {
    id: 'ist-kel-2',
    themeId: 'keluarga',
    title: 'Kakek dan Nenek di Desa',
    titleArabic: 'الجَدُّ وَالجَدَّةُ فِي القَرْيَةِ',
    durationSeconds: 30,
    storyArabicFull:
      'يَعِيْشُ الجَدُّ وَالجَدَّةُ فِي قَرْيَةٍ جَمِيْلَةٍ. نَحْنُ نَزُوْرُهُمَا فِي كُلِّ شَهْرٍ. الجَدُّ يَسْقِي الأَزْهَارَ، وَالجَدَّةُ تَصْنَعُ الحَلْوَى اللَّذِيْذَةَ.',
    storyArabicCloze:
      'يَعِيْشُ [...] (١) وَالجَدَّةُ فِي قَرْيَةٍ جَمِيْلَةٍ. نَحْنُ نَزُوْرُهُمَا فِي كُلِّ شَهْرٍ. الجَدُّ يَسْقِي [...] (٢)، وَالجَدَّةُ تَصْنَعُ [...] (٣) اللَّذِيْذَةَ.',
    storyTranslation:
      'Kakek dan nenek tinggal di sebuah desa yang asri. Kami mengunjungi mereka berdua setiap bulan. Kakek menyirami bunga-bunga, dan nenek membuat kue yang lezat.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Siapakah yang tinggal bersama nenek di desa pada rumpang (١)?',
        options: ['العَمُّ (Paman)', 'الجَدُّ (Kakek)', 'الخَالُ (Paman Ibu)', 'الأَخُ (Saudara)'],
        correctIndex: 1,
        explanation: 'Yang tinggal bersama nenek adalah kakek (الجَدُّ).',
      },
      {
        questionNumber: 2,
        prompt: 'Apa yang disirami oleh kakek pada rumpang (٢)?',
        options: ['الأَشْجَارَ (Pohon-pohon)', 'الأَزْهَارَ (Bunga-bunga)', 'النَّبَاتَاتَ (Tanaman)', 'العُشْبَ (Rumput)'],
        correctIndex: 1,
        explanation: 'Kakek menyirami bunga-bunga: يَسْقِي الأَزْهَارَ.',
      },
      {
        questionNumber: 3,
        prompt: 'Apa yang dibuat oleh nenek pada rumpang (٣)?',
        options: ['الحَلْوَى (Kue / Manisan)', 'الشَّايَ (Teh)', 'العَصِيْرَ (Jus)', 'الأَرُزَّ (Nasi)'],
        correctIndex: 0,
        explanation: 'Nenek membuat kue lezat: تَصْنَعُ الحَلْوَى اللَّذِيْذَةَ.',
      },
    ],
  },

  // ================= TEMA 2: MADRASAH (2 Cerita) =================
  {
    id: 'ist-mad-1',
    themeId: 'madrasah',
    title: 'Suasana di Ruang Kelas',
    titleArabic: 'النَّشَاطُ فِي الفَصْلِ',
    durationSeconds: 34,
    storyArabicFull:
      'يَدْخُلُ التَّلَامِيْذُ الفَصْلَ بِنَشَاطٍ. الأُسْتَاذُ يَكْتُبُ الدَّرْسَ عَلَى السَّبُّوْرَةِ، وَالتَّلَامِيْذُ يَفْتَحُوْنَ الكُتُبَ، ثُمَّ يَرِنُّ جَرَسُ الاسْتِرَاحَةِ.',
    storyArabicCloze:
      'يَدْخُلُ [...] (١) الفَصْلَ بِنَشَاطٍ. الأُسْتَاذُ يَكْتُبُ الدَّرْسَ عَلَى [...] (٢)، وَالتَّلَامِيْذُ يَفْتَحُوْنَ الكُتُبَ، ثُمَّ يَرِنُّ [...] (٣) الاسْتِرَاحَةِ.',
    storyTranslation:
      'Murid-murid masuk ke dalam kelas dengan penuh semangat. Guru menulis materi pelajaran di papan tulis, murid-murid membuka buku-buku, kemudian berbunyilah bel istirahat.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Siapakah yang masuk kelas dengan semangat pada rumpang (١)?',
        options: ['التَّلَامِيْذُ (Murid-murid)', 'المُدِيْرُ (Kepala Sekolah)', 'الحُرَّاسُ (Satpam)', 'الآبَاءُ (Orang tua)'],
        correctIndex: 0,
        explanation: 'Yang masuk kelas adalah para murid: التَّلَامِيْذُ.',
      },
      {
        questionNumber: 2,
        prompt: 'Di manakah guru menuliskan pelajaran pada rumpang (٢)?',
        options: ['المَكْتَبِ (Meja)', 'السَّبُّوْرَةِ (Papan Tulis)', 'الجِدَارِ (Dinding)', 'الدَّفْتَرِ (Buku Tulis)'],
        correctIndex: 1,
        explanation: 'Guru menulis di papan tulis: عَلَى السَّبُّوْرَةِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Benda apakah yang berbunyi menandakan waktu istirahat pada rumpang (٣)?',
        options: ['هَاتِفُ (Telepon)', 'جَرَسُ (Bel)', 'سَاعَةُ (Jam)', 'صَوْتُ (Suara)'],
        correctIndex: 1,
        explanation: 'Bel sekolah berbunyi: يَرِنُّ جَرَسُ الاسْتِرَاحَةِ.',
      },
    ],
  },
  {
    id: 'ist-mad-2',
    themeId: 'madrasah',
    title: 'Kunjungan ke Perpustakaan Sekolah',
    titleArabic: 'زِيَارَةُ المَكْتَبَةِ المَدْرَسِيَّةِ',
    durationSeconds: 31,
    storyArabicFull:
      'تَذْهَبُ فَاطِمَةُ إِلَى المَكْتَبَةِ فِي وَقْتِ الفَرَاغِ. تَجْلِسُ فَاطِمَةُ عَلَى الكُرْسِيِّ، وَتَقْرَأُ قِصَّةً عَرَبِيَّةً مُفِيْدَةً بِهُدُوْءٍ.',
    storyArabicCloze:
      'تَذْهَبُ فَاطِمَةُ إِلَى [...] (١) فِي وَقْتِ الفَرَاغِ. تَجْلِسُ فَاطِمَةُ عَلَى [...] (٢)، وَتَقْرَأُ قِصَّةً عَرَبِيَّةً مُفِيْدَةً [...] (٣).',
    storyTranslation:
      'Fatimah pergi ke perpustakaan saat waktu luang. Fatimah duduk di atas kursi, dan membaca cerita bahasa Arab yang bermanfaat dengan tenang.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Ke manakah Fatimah pergi saat waktu luang pada rumpang (١)?',
        options: ['المَقْصَفِ (Kantin)', 'المَلْعَبِ (Lapangan)', 'المَكْتَبَةِ (Perpustakaan)', 'المَسْجِدِ (Masjid)'],
        correctIndex: 2,
        explanation: 'Fatimah pergi ke perpustakaan: إِلَى المَكْتَبَةِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Di atas apakah Fatimah duduk pada rumpang (٢)?',
        options: ['الأَرْضِ (Lantai)', 'الكُرْسِيِّ (Kursi)', 'البِسَاطِ (Karpet)', 'المَكْتَبِ (Meja)'],
        correctIndex: 1,
        explanation: 'Fatimah duduk di kursi: عَلَى الكُرْسِيِّ.',
      },
      {
        questionNumber: 3,
        prompt: 'Bagaimanakah sikap Fatimah saat membaca pada rumpang (٣)?',
        options: ['بِهُدُوْءٍ (Dengan tenang)', 'بِسُرْعَةٍ (Dengan cepat)', 'بِصَوْتٍ عَالٍ (Dengan suara keras)', 'بِخَوْفٍ (Dengan takut)'],
        correctIndex: 0,
        explanation: 'Di perpustakaan membaca dengan tenang: بِهُدُوْءٍ.',
      },
    ],
  },

  // ================= TEMA 3: HOBI (2 Cerita) =================
  {
    id: 'ist-hob-1',
    themeId: 'hobi',
    title: 'Hobi Sepak Bola di Sore Hari',
    titleArabic: 'كُرَةُ القَدَمِ فِي المَسَاءِ',
    durationSeconds: 33,
    storyArabicFull:
      'هِوَايَةُ عُمَرَ هِيَ كُرَةُ القَدَمِ. يَلْعَبُ عُمَرُ مَعَ زُمَلَائِهِ فِي المَلْعَبِ الكَبِيْرِ، وَيُسَجِّلُ عُمَرُ هَدَفًا رَائِعًا.',
    storyArabicCloze:
      'هِوَايَةُ عُمَرَ هِيَ كُرَةُ [...] (١). يَلْعَبُ عُمَرُ مَعَ زُمَلَائِهِ فِي [...] (٢) الكَبِيْرِ، وَيُسَجِّلُ عُمَرُ [...] (٣) رَائِعًا.',
    storyTranslation:
      'Hobi Umar adalah sepak bola. Umar bermain bersama teman-temannya di lapangan besar, dan Umar mencetak gol yang hebat.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Cabang olahraga apakah yang menjadi hobi Umar pada rumpang (١)?',
        options: ['السَّلَّةِ (Basket)', 'القَدَمِ (Sepak Bola)', 'الطَّائِرَةِ (Voli)', 'الرِّيْشَةِ (Bulu Tangkis)'],
        correctIndex: 1,
        explanation: 'Hobi Umar adalah sepak bola: كُرَةُ القَدَمِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Di manakah Umar bermain bersama rekannya pada rumpang (٢)?',
        options: ['الفَصْلِ (Kelas)', 'المَلْعَبِ (Lapangan)', 'الشَّارِعِ (Jalanan)', 'البَيْتِ (Rumah)'],
        correctIndex: 1,
        explanation: 'Mereka bermain di lapangan besar: فِي المَلْعَبِ الكَبِيْرِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Apa yang berhasil dicetak oleh Umar pada rumpang (٣)?',
        options: ['هَدَفًا (Gol)', 'نُقْطَةً (Poin)', 'فَوْزًا (Kemenangan)', 'جَائِزَةً (Hadiah)'],
        correctIndex: 0,
        explanation: 'Umar mencetak gol indah: يُسَجِّلُ هَدَفًا.',
      },
    ],
  },
  {
    id: 'ist-hob-2',
    themeId: 'hobi',
    title: 'Gemilangnya Kaligrafi Arab',
    titleArabic: 'فَنُّ الخَطِّ العَرَبِيِّ',
    durationSeconds: 29,
    storyArabicFull:
      'عَائِشَةُ تُحِبُّ الرَّسْمَ وَالخَطَّ العَرَبِيَّ. تَسْتَخْدِمُ عَائِشَةُ قَلَمَ الحِبْرِ وَالوَرَقَ الأَبْيَضَ، وَتَكْتُبُ آيَاتٍ قُرْآنِيَّةً جَمِيْلَةً.',
    storyArabicCloze:
      'عَائِشَةُ تُحِبُّ الرَّسْمَ وَالخَطَّ [...] (١). تَسْتَخْدِمُ عَائِشَةُ قَلَمَ [...] (٢) وَالوَرَقَ الأَبْيَضَ، وَتَكْتُبُ آيَاتٍ قُرْآنِيَّةً [...] (٣).',
    storyTranslation:
      'Aisyah menyukai seni lukis dan kaligrafi Arab. Aisyah menggunakan pena tinta dan kertas putih, serta menulis ayat-ayat Al-Qur’an yang indah.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Kaligrafi bahasa apakah yang ditekuni Aisyah pada rumpang (١)?',
        options: ['العَرَبِيَّ (Arab)', 'الإِنْجِلِيْزِيَّ (Inggris)', 'الصِّيْنِيَّ (Mandarin)', 'اليَابَانِيَّ (Jepang)'],
        correctIndex: 0,
        explanation: 'Aisyah menyukai kaligrafi Arab: وَالخَطَّ العَرَبِيَّ.',
      },
      {
        questionNumber: 2,
        prompt: 'Jenis alat tulis apakah yang dipakai Aisyah pada rumpang (٢)?',
        options: ['الرَّصَاصِ (Pensil)', 'الحِبْرِ (Tinta)', 'الأَلْوَانِ (Krayon)', 'الطَّبَاشِيْرِ (Kapur)'],
        correctIndex: 1,
        explanation: 'Pena tinta kaligrafi: قَلَمَ الحِبْرِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Sifat apakah yang menggambarkan tulisan ayat tersebut pada rumpang (٣)?',
        options: ['جَمِيْلَةً (Indah)', 'قَصِيْرَةً (Pendek)', 'صَعْبَةً (Sulit)', 'قَدِيْمَةً (Kuno)'],
        correctIndex: 0,
        explanation: 'Tulisan yang indah: آيَاتٍ قُرْآنِيَّةً جَمِيْلَةً.',
      },
    ],
  },

  // ================= TEMA 4: PROFESI (2 Cerita) =================
  {
    id: 'ist-pro-1',
    themeId: 'profesi',
    title: 'Dokter yang Mengobati Pasien',
    titleArabic: 'الطَّبِيْبُ فِي المُسْتَشْفَى',
    durationSeconds: 31,
    storyArabicFull:
      'عَمِّيْ يَعْمَلُ طَبِيْبًا فِي المُسْتَشْفَى الكَبِيْرِ. هُوَ يَفْحَصُ المَرْضَى بِرِفْقٍ، وَيَكْتُبُ لَهُمُ الوَصْفَةَ الطِّبِّيَّةَ لِيَشْفَوْا.',
    storyArabicCloze:
      'عَمِّيْ يَعْمَلُ [...] (١) فِي المُسْتَشْفَى الكَبِيْرِ. هُوَ يَفْحَصُ [...] (٢) بِرِفْقٍ، وَيَكْتُبُ لَهُمُ الوَصْفَةَ [...] (٣) لِيَشْفَوْا.',
    storyTranslation:
      'Pamanku bekerja sebagai dokter di rumah sakit besar. Beliau memeriksa para pasien dengan ramah dan menuliskan resep obat agar mereka lekas sembuh.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Apakah profesi paman pada rumpang (١)?',
        options: ['مُهَنْدِسًا (Insinyur)', 'طَبِيْبًا (Dokter)', 'شُرْطِيًّا (Polisi)', 'فَلَّاحًا (Petani)'],
        correctIndex: 1,
        explanation: 'Paman berprofesi sebagai dokter: يَعْمَلُ طَبِيْبًا.',
      },
      {
        questionNumber: 2,
        prompt: 'Siapakah yang diperiksa oleh paman pada rumpang (٢)?',
        options: ['المَرْضَى (Orang Sakit/Pasien)', 'الأَطْفَالَ (Anak-anak)', 'المُعَلِّمِيْنَ (Guru-guru)', 'التُّجَّارَ (Pedagang)'],
        correctIndex: 0,
        explanation: 'Dokter memeriksa pasien: يَفْحَصُ المَرْضَى.',
      },
      {
        questionNumber: 3,
        prompt: 'Resep apakah yang ditulis paman pada rumpang (٣)?',
        options: ['الطَّعَامِيَّةَ (Makanan)', 'الطِّبِّيَّةَ (Obat/Medis)', 'الشَّعْبِيَّةَ (Tradisional)', 'المَدْرَسِيَّةَ (Sekolah)'],
        correctIndex: 1,
        explanation: 'Resep obat medis: الوَصْفَةَ الطِّبِّيَّةَ.',
      },
    ],
  },
  {
    id: 'ist-pro-2',
    themeId: 'profesi',
    title: 'Petani Rajin di Sawah',
    titleArabic: 'الفَلَّاحُ النَّشِيْطُ فِي الحَقْلِ',
    durationSeconds: 30,
    storyArabicFull:
      'يَذْهَبُ الفَلَّاحُ إِلَى المَزْرَعَةِ صَبَاحًا بَاكِرًا. هُوَ يَزْرَعُ الأَرُزَّ وَالخَضْرَاوَاتِ، وَيَعْمَلُ بِجِدٍّ لِيُطْعِمَ النَّاسَ.',
    storyArabicCloze:
      'يَذْهَبُ [...] (١) إِلَى المَزْرَعَةِ صَبَاحًا بَاكِرًا. هُوَ يَزْرَعُ [...] (٢) وَالخَضْرَاوَاتِ، وَيَعْمَلُ [...] (٣) لِيُطْعِمَ النَّاسَ.',
    storyTranslation:
      'Petani pergi ke ladang/sawah di pagi-pagi buta. Ia menanam padi dan sayur-mayur, serta bekerja dengan tekun untuk memberi makan orang banyak.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Siapakah yang pergi ke sawah pada rumpang (١)?',
        options: ['التَّاجِرُ (Pedagang)', 'الفَلَّاحُ (Petani)', 'الصَّيَّادُ (Nelayan)', 'النَّجَّارُ (Tukang Kayu)'],
        correctIndex: 1,
        explanation: 'Petani yang pergi ke sawah: يَذْهَبُ الفَلَّاحُ.',
      },
      {
        questionNumber: 2,
        prompt: 'Tanaman pangan apakah yang ditanam petani pada rumpang (٢)?',
        options: ['الأَرُزَّ (Padi/Beras)', 'الفَوَاكِهَ (Buah-buahan)', 'الأَزْهَارَ (Bunga-bunga)', 'القُطْنَ (Kapas)'],
        correctIndex: 0,
        explanation: 'Petani menanam padi: يَزْرَعُ الأَرُزَّ.',
      },
      {
        questionNumber: 3,
        prompt: 'Bagaimanakah etos kerja petani pada rumpang (٣)?',
        options: ['بِكَسَلٍ (Dengan malas)', 'بِجِدٍّ (Dengan sungguh-sungguh)', 'بِخَوْفٍ (Dengan cemas)', 'بِبُطْءٍ (Dengan lambat)'],
        correctIndex: 1,
        explanation: 'Petani bekerja dengan tekun dan sungguh-sungguh: بِجِدٍّ.',
      },
    ],
  },

  // ================= TEMA 5: TRANSPORTASI (2 Cerita) =================
  {
    id: 'ist-tra-1',
    themeId: 'transportasi',
    title: 'Naik Kereta Api ke Surabaya',
    titleArabic: 'رُكُوْبُ القِطَارِ إِلَى سُوْرَابَايَا',
    durationSeconds: 34,
    storyArabicFull:
      'سَافَرَ سَلْمَانُ مَعَ وَالِدِهِ بِالقِطَارِ السَّرِيْعِ. وَصَلَا إِلَى المَحَطَّةِ قَبْلَ المَوْعِدِ، وَاشْتَرَى الوَالِدُ تَذْكِرَتَيْنِ مِنَ الشُّبَّاكِ.',
    storyArabicCloze:
      'سَافَرَ سَلْمَانُ مَعَ وَالِدِهِ بِـ [...] (١) السَّرِيْعِ. وَصَلَا إِلَى [...] (٢) قَبْلَ المَوْعِدِ، وَاشْتَرَى الوَالِدُ [...] (٣) مِنَ الشُّبَّاكِ.',
    storyTranslation:
      'Salman bepergian bersama ayahnya menaiki kereta api cepat. Keduanya tiba di stasiun sebelum jadwal keberangkatan, dan ayah membeli dua lembar tiket dari loket.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Kendaraan apakah yang dinaiki Salman dan Ayah pada rumpang (١)?',
        options: ['الحَافِلَةِ (Bus)', 'القِطَارِ (Kereta Api)', 'السَّفِيْنَةِ (Kapal Laut)', 'الطَّائِرَةِ (Pesawat)'],
        correctIndex: 1,
        explanation: 'Mereka menaiki kereta api: بِالقِطَارِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Tempat pemberhentian manakah yang mereka tuju pada rumpang (٢)?',
        options: ['المَطَارِ (Bandara)', 'المِيْنَاءِ (Pelabuhan)', 'المَحَطَّةِ (Stasiun)', 'المَوْقِفِ (Halte)'],
        correctIndex: 2,
        explanation: 'Mereka tiba di stasiun kereta: إِلَى المَحَطَّةِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Benda apakah yang dibeli oleh ayah di loket pada rumpang (٣)?',
        options: ['كِتَابَيْنِ (Dua buku)', 'تَذْكِرَتَيْنِ (Dua tiket)', 'طَعَامَيْنِ (Dua porsi makanan)', 'حَقِيْبَتَيْنِ (Dua tas)'],
        correctIndex: 1,
        explanation: 'Ayah membeli dua tiket perjalanan: تَذْكِرَتَيْنِ.',
      },
    ],
  },
  {
    id: 'ist-tra-2',
    themeId: 'transportasi',
    title: 'Pesawat Terbang di Udara',
    titleArabic: 'الطَّائِرَةُ فِي السَّمَاءِ',
    durationSeconds: 28,
    storyArabicFull:
      'الطَّائِرَةُ وَسِيْلَةُ نَقْلٍ جَوِّيَّةٌ سَرِيْعَةٌ جِدًّا. هِيَ تَطِيْرُ فَوْقَ السَّحَابِ، وَتَهْبِطُ بِأَمَانٍ فِي المَطَارِ الدَّوْلِيِّ.',
    storyArabicCloze:
      'الطَّائِرَةُ وَسِيْلَةُ نَقْلٍ [...] (١) سَرِيْعَةٌ جِدًّا. هِيَ تَطِيْرُ فَوْقَ [...] (٢)، وَتَهْبِطُ بِأَمَانٍ فِي [...] (٣) الدَّوْلِيِّ.',
    storyTranslation:
      'Pesawat terbang adalah alat transportasi udara yang sangat cepat. Pesawat terbang melayang di atas awan, dan mendarat dengan selamat di bandara internasional.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Jalur transportasi apakah pesawat terbang pada rumpang (١)?',
        options: ['بَرِّيَّةٌ (Darat)', 'بَحْرِيَّةٌ (Laut)', 'جَوِّيَّةٌ (Udara)', 'نَهْرِيَّةٌ (Sungai)'],
        correctIndex: 2,
        explanation: 'Pesawat adalah transportasi udara: جَوِّيَّةٌ.',
      },
      {
        questionNumber: 2,
        prompt: 'Di atas apakah pesawat terbang melayang pada rumpang (٢)?',
        options: ['الأَرْضِ (Bumi)', 'السَّحَابِ (Awan)', 'البَحْرِ (Laut)', 'الجِبَالِ (Gunung)'],
        correctIndex: 1,
        explanation: 'Pesawat terbang di atas awan: فَوْقَ السَّحَابِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Di manakah pesawat mendarat dengan aman pada rumpang (٣)?',
        options: ['المَحَطَّةِ (Stasiun)', 'المَطَارِ (Bandara)', 'المِيْنَاءِ (Pelabuhan)', 'المَلْعَبِ (Stadion)'],
        correctIndex: 1,
        explanation: 'Pesawat mendarat di bandara: فِي المَطَارِ.',
      },
    ],
  },

  // ================= TEMA 6: WARNA (2 Cerita) =================
  {
    id: 'ist-war-1',
    themeId: 'warna',
    title: 'Warna-Warni Taman Bunga',
    titleArabic: 'أَلْوَانُ الأَزْهَارِ فِي الحَدِيْقَةِ',
    durationSeconds: 30,
    storyArabicFull:
      'فِي حَدِيْقَةِ البَيْتِ أَزْهَارٌ كَثِيْرَةٌ. الوَرْدَةُ لَوْنُهَا أَحْمَرُ، وَاليَاسَمِيْنُ لَوْنُهُ أَبْيَضُ، وَأَوْرَاقُ الشَّجَرِ لَوْنُهَا أَخْضَرُ جَمِيْلٌ.',
    storyArabicCloze:
      'فِي حَدِيْقَةِ البَيْتِ أَزْهَارٌ كَثِيْرَةٌ. الوَرْدَةُ لَوْنُهَا [...] (١)، وَاليَاسَمِيْنُ لَوْنُهُ [...] (٢)، وَأَوْرَاقُ الشَّجَرِ لَوْنُهَا [...] (٣) جَمِيْلٌ.',
    storyTranslation:
      'Di taman rumah terdapat banyak bunga. Bunga mawar warnanya merah, bunga melati warnanya putih, dan dedaunan pohon warnanya hijau nan asri.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Apakah warna bunga mawar pada rumpang (١)?',
        options: ['أَصْفَرُ (Kuning)', 'أَحْمَرُ (Merah)', 'أَزْرَقُ (Biru)', 'أَسْوَدُ (Hitam)'],
        correctIndex: 1,
        explanation: 'Bunga mawar berwarna merah: أَحْمَرُ.',
      },
      {
        questionNumber: 2,
        prompt: 'Apakah warna bunga melati pada rumpang (٢)?',
        options: ['أَبْيَضُ (Putih)', 'أَخْضَرُ (Hijau)', 'وَرْدِيٌّ (Pink)', 'بُنِّيٌّ (Cokelat)'],
        correctIndex: 0,
        explanation: 'Bunga melati berwarna putih bersih: أَبْيَضُ.',
      },
      {
        questionNumber: 3,
        prompt: 'Apakah warna dedaunan pohon pada rumpang (٣)?',
        options: ['أَزْرَقُ (Biru)', 'أَخْضَرُ (Hijau)', 'رَمَادِيٌّ (Abu-abu)', 'بُرْتُقَالِيٌّ (Oranye)'],
        correctIndex: 1,
        explanation: 'Daun-daun berwarna hijau: أَخْضَرُ.',
      },
    ],
  },
  {
    id: 'ist-war-2',
    themeId: 'warna',
    title: 'Pelangi di Langit Biru',
    titleArabic: 'قَوْسُ قُزَحَ فِي السَّمَاءِ الزَّرْقَاءِ',
    durationSeconds: 27,
    storyArabicFull:
      'بَعْدَ نُزُوْلِ المَطَرِ، يَظْهَرُ قَوْسُ قُزَحَ فِي السَّمَاءِ الزَّرْقَاءِ. فِيْهِ أَلْوَانٌ مُتَعَدِّدَةٌ كَالأَحْمَرِ وَالأَصْفَرِ وَالأَزْرَقِ، مَنْظَرُهُ بَدِيْعٌ!',
    storyArabicCloze:
      'بَعْدَ نُزُوْلِ المَطَرِ، يَظْهَرُ [...] (١) فِي السَّمَاءِ الزَّرْقَاءِ. فِيْهِ أَلْوَانٌ مُتَعَدِّدَةٌ كَالأَحْمَرِ وَ [...] (٢) وَالأَزْرَقِ، مَنْظَرُهُ [...] (٣)!',
    storyTranslation:
      'Setelah hujan turun, tampaklah pelangi di langit yang biru. Di dalamnya terdapat aneka warna seperti merah, kuning, dan biru. Pemandangannya sungguh menakjubkan!',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Fenomena alam apakah yang muncul di langit pada rumpang (١)?',
        options: ['الشَّمْسُ (Matahari)', 'قَوْسُ قُزَحَ (Pelangi)', 'القَمَرُ (Bulan)', 'النُّجُوْمُ (Bintang-bintang)'],
        correctIndex: 1,
        explanation: 'Fenomena pelangi: قَوْسُ قُزَحَ.',
      },
      {
        questionNumber: 2,
        prompt: 'Warna apakah yang disebutkan di antara merah dan biru pada rumpang (٢)?',
        options: ['الأَسْوَدِ (Hitam)', 'الأَصْفَرِ (Kuning)', 'البُنِّيِّ (Cokelat)', 'الفِضِّيِّ (Perak)'],
        correctIndex: 1,
        explanation: 'Warna kuning: الأَصْفَرِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Kata seru apakah yang mendeskripsikan indahnya pemandangan pada rumpang (٣)?',
        options: ['قَبِيْحٌ (Jelek)', 'بَدِيْعٌ (Menakjubkan / Indah)', 'مُظْلِمٌ (Gelap)', 'صَغِيْرٌ (Kecil)'],
        correctIndex: 1,
        explanation: 'Pemandangan menakjubkan: مَنْظَرُهُ بَدِيْعٌ.',
      },
    ],
  },

  // ================= TEMA 7: KEGIATAN SEHARI-HARI (2 Cerita) =================
  {
    id: 'ist-keg-1',
    themeId: 'kegiatan',
    title: 'Pagi Penuh Berkah',
    titleArabic: 'صَبَاحٌ مُبَارَكٌ',
    durationSeconds: 32,
    storyArabicFull:
      'يَسْتَيْقِظُ أَحْمَدُ فِي السَّاعَةِ الرَّابِعَةِ صَبَاحًا. يَتَوَضَّأُ أَحْمَدُ وَيُصَلِّيْ الصُّبْحَ فِي المَسْجِدِ، ثُمَّ يَتَنَاوَلُ الفُطُوْرَ مَعَ عَائِلَتِهِ.',
    storyArabicCloze:
      'يَسْتَيْقِظُ أَحْمَدُ فِي السَّاعَةِ [...] (١) صَبَاحًا. يَتَوَضَّأُ أَحْمَدُ وَيُصَلِّيْ [...] (٢) فِي المَسْجِدِ، ثُمَّ يَتَنَاوَلُ [...] (٣) مَعَ عَائِلَتِهِ.',
    storyTranslation:
      'Ahmad bangun tidur pada pukul empat pagi. Ahmad berwudhu dan salat Subuh di masjid, kemudian menyantap sarapan pagi bersama keluarganya.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Pukul berapakah Ahmad bangun pada rumpang (١)?',
        options: ['الثَّالِثَةِ (Pukul Tiga)', 'الرَّابِعَةِ (Pukul Empat)', 'الخَامِسَةِ (Pukul Lima)', 'السَّادِسَةِ (Pukul Enam)'],
        correctIndex: 1,
        explanation: 'Ahmad bangun pukul empat: فِي السَّاعَةِ الرَّابِعَةِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Salat fardhu apakah yang ditunaikan Ahmad di masjid pada rumpang (٢)?',
        options: ['الظُّهْرَ (Dzuhur)', 'الصُّبْحَ (Subuh)', 'العَصْرَ (Ashar)', 'المَغْرِبَ (Maghrib)'],
        correctIndex: 1,
        explanation: 'Salat Subuh berjamaah: يُصَلِّيْ الصُّبْحَ.',
      },
      {
        questionNumber: 3,
        prompt: 'Makanan apakah yang disantap Ahmad bersama keluarga pada rumpang (٣)?',
        options: ['الفُطُوْرَ (Sarapan Pagi)', 'الغَدَاءَ (Makan Siang)', 'العَشَاءَ (Makan Malam)', 'الحَلْوَى (Kue)'],
        correctIndex: 0,
        explanation: 'Sarapan pagi: يَتَنَاوَلُ الفُطُوْرَ.',
      },
    ],
  },
  {
    id: 'ist-keg-2',
    themeId: 'kegiatan',
    title: 'Belajar di Waktu Malam',
    titleArabic: 'المُذَاكَرَةُ فِي اللَّيْلِ',
    durationSeconds: 31,
    storyArabicFull:
      'بَعْدَ صَلَاةِ العِشَاءِ، يَجْلِسُ حَسَنٌ فِي غُرْفَةِ المُذَاكَرَةِ. هُوَ يَعْمَلُ الوَاجِبَ المَنْزِلِيَّ، ثُمَّ يُغْلِقُ الكِتَابَ وَيَنَامُ مُبَكِّرًا.',
    storyArabicCloze:
      'بَعْدَ صَلَاةِ [...] (١)، يَجْلِسُ حَسَنٌ فِي غُرْفَةِ المُذَاكَرَةِ. هُوَ يَعْمَلُ [...] (٢) المَنْزِلِيَّ، ثُمَّ يُغْلِقُ الكِتَابَ وَيَنَامُ [...] (٣).',
    storyTranslation:
      'Setelah salat Isya, Hasan duduk di ruang belajar. Ia mengerjakan pekerjaan rumah (PR), lalu menutup buku dan tidur lebih awal.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Setelah salat fardhu apakah Hasan mulai belajar pada rumpang (١)?',
        options: ['المَغْرِبِ (Maghrib)', 'العِشَاءِ (Isya)', 'العَصْرِ (Ashar)', 'الظُّهْرِ (Dzuhur)'],
        correctIndex: 1,
        explanation: 'Setelah salat Isya: بَعْدَ صَلَاةِ العِشَاءِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Tugas apakah yang dikerjakan oleh Hasan pada rumpang (٢)?',
        options: ['الوَاجِبَ (Pekerjaan Rumah/PR)', 'الاخْتِبَارَ (Ujian)', 'التَّقْرِيْرَ (Laporan)', 'القِرَاءَةَ (Bacaan)'],
        correctIndex: 0,
        explanation: 'Mengerjakan PR: يَعْمَلُ الوَاجِبَ المَنْزِلِيَّ.',
      },
      {
        questionNumber: 3,
        prompt: 'Bagaimanakah waktu tidur Hasan pada rumpang (٣)?',
        options: ['مُتَأَخِّرًا (Larut Malam/Begadang)', 'مُبَكِّرًا (Lebih Awal/Tepat Waktu)', 'نَهَارًا (Siang Hari)', 'صَبَاحًا (Pagi Hari)'],
        correctIndex: 1,
        explanation: 'Hasan tidur lebih awal: يَنَامُ مُبَكِّرًا.',
      },
    ],
  },

  // ================= TEMA 8: ANGGOTA TUBUH (2 Cerita) =================
  {
    id: 'ist-tub-1',
    themeId: 'tubuh',
    title: 'Nikmat Panca Indera',
    titleArabic: 'نِعْمَةُ الحَوَاسِّ الخَمْسِ',
    durationSeconds: 30,
    storyArabicFull:
      'خَلَقَ اللهُ الإِنْسَانَ فِي أَحْسَنِ تَقْوِيْمٍ. بِالعَيْنِ نَنْظُرُ الجَمَالَ، وَبِالأُذُنِ نَسْمَعُ الصَّوْتَ، وَبِاللِّسَانِ نَتَذَوَّقُ الطَّعَامَ اللَّذِيْذَ.',
    storyArabicCloze:
      'خَلَقَ اللهُ الإِنْسَانَ فِي أَحْسَنِ تَقْوِيْمٍ. بِـ [...] (١) نَنْظُرُ الجَمَالَ، وَبِـ [...] (٢) نَسْمَعُ الصَّوْتَ، وَبِـ [...] (٣) نَتَذَوَّقُ الطَّعَامَ اللَّذِيْذَ.',
    storyTranslation:
      'Allah menciptakan manusia dalam bentuk yang sebaik-baiknya. Dengan mata kita memandang keindahan, dengan telinga kita mendengar suara, dan dengan lidah kita mengecap makanan lezat.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Organ tubuh apakah yang kita gunakan untuk memandang keindahan pada rumpang (١)?',
        options: ['العَيْنِ (Mata)', 'الأَنْفِ (Hidung)', 'اليَدِ (Tangan)', 'الرَّأْسِ (Kepala)'],
        correctIndex: 0,
        explanation: 'Dengan mata kita melihat: بِالعَيْنِ نَنْظُرُ.',
      },
      {
        questionNumber: 2,
        prompt: 'Organ tubuh apakah yang kita gunakan untuk mendengar suara pada rumpang (٢)?',
        options: ['الفَمِ (Mulut)', 'الأُذُنِ (Telinga)', 'العُنُقِ (Leher)', 'القَدَمِ (Kaki)'],
        correctIndex: 1,
        explanation: 'Dengan telinga kita mendengar: وَبِالأُذُنِ نَسْمَعُ.',
      },
      {
        questionNumber: 3,
        prompt: 'Organ tubuh apakah yang mengecap rasa makanan pada rumpang (٣)?',
        options: ['اللِّسَانِ (Lidah)', 'الأَسْنَانِ (Gigi)', 'الشَّفَةِ (Bibir)', 'الخَدِّ (Pipi)'],
        correctIndex: 0,
        explanation: 'Dengan lidah kita mengecap: وَبِاللِّسَانِ نَتَذَوَّقُ.',
      },
    ],
  },
  {
    id: 'ist-tub-2',
    themeId: 'tubuh',
    title: 'Menjaga Kebersihan Tubuh',
    titleArabic: 'نَظَافَةُ الجِسْمِ',
    durationSeconds: 29,
    storyArabicFull:
      'المُسْلِمُ يُحَافِظُ عَلَى نَظَافَةِ بَدَنِهِ. نَغْسِلُ الأَيْدِيَ بِالمَاءِ وَالصَّابُوْنِ، وَنُنَظِّفُ الأَسْنَانَ بِالفُرْشَاةِ كُلَّ يَوْمٍ.',
    storyArabicCloze:
      'المُسْلِمُ يُحَافِظُ عَلَى نَظَافَةِ [...] (١). نَغْسِلُ [...] (٢) بِالمَاءِ وَالصَّابُوْنِ، وَنُنَظِّفُ الأَسْنَانَ بِـ [...] (٣) كُلَّ يَوْمٍ.',
    storyTranslation:
      'Seorang muslim senantiasa menjaga kebersihan badannya. Kita mencuci tangan dengan air dan sabun, serta menggosok gigi dengan sikat gigi setiap hari.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Kebersihan apakah yang wajib dijaga pada rumpang (١)?',
        options: ['بَدَنِهِ (Badannya/Tubuhnya)', 'مَلَابِسِهِ (Pakaiannya)', 'بَيْتِهِ (Rumahnya)', 'فَصْلِهِ (Kelasnya)'],
        correctIndex: 0,
        explanation: 'Menjaga kebersihan tubuh: نَظَافَةِ بَدَنِهِ.',
      },
      {
        questionNumber: 2,
        prompt: 'Anggota gerak apakah yang dicuci dengan sabun pada rumpang (٢)?',
        options: ['الأَرْجُلَ (Kaki-kaki)', 'الأَيْدِيَ (Tangan-tangan)', 'الوُجُوْهَ (Wajah-wajah)', 'الرُّؤُوْسَ (Kepala-kepala)'],
        correctIndex: 1,
        explanation: 'Mencuci tangan: نَغْسِلُ الأَيْدِيَ.',
      },
      {
        questionNumber: 3,
        prompt: 'Alat apakah yang dipakai menyikat gigi pada rumpang (٣)?',
        options: ['الفُرْشَاةِ (Sikat Gigi)', 'المِنْشَفَةِ (Handuk)', 'المِمْحَاةِ (Penghapus)', 'المِلْعَقَةِ (Sendok)'],
        correctIndex: 0,
        explanation: 'Menggosok gigi dengan sikat: بِالفُرْشَاةِ.',
      },
    ],
  },

  // ================= TEMA 9: JAM DAN WAKTU (2 Cerita) =================
  {
    id: 'ist-wak-1',
    themeId: 'waktu',
    title: 'Disiplin Waktu Belajar',
    titleArabic: 'تَنْظِيْمُ الوَقْتِ لِلدِّرَاسَةِ',
    durationSeconds: 32,
    storyArabicFull:
      'يَبْدَأُ الدَّرْسُ الأَوَّلُ فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا تَمَامًا. يَحْضُرُ الطُّلَّابُ قَبْلَ المَوْعِدِ، وَتَنْتَهِي الحِصَّةُ فِي السَّاعَةِ الثَّامِنَةِ.',
    storyArabicCloze:
      'يَبْدَأُ الدَّرْسُ الأَوَّلُ فِي السَّاعَةِ [...] (١) صَبَاحًا تَمَامًا. يَحْضُرُ الطُّلَّابُ قَبْلَ [...] (٢)، وَتَنْتَهِي الحِصَّةُ فِي السَّاعَةِ [...] (٣).',
    storyTranslation:
      'Pelajaran pertama dimulai tepat pada pukul tujuh pagi. Para siswa hadir sebelum waktunya, dan sesi jam pelajaran selesai pada pukul delapan.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Pukul berapakah jam pelajaran pertama dimulai pada rumpang (١)?',
        options: ['السَّادِسَةِ (Pukul Enam)', 'السَّابِعَةِ (Pukul Tujuh)', 'الثَّامِنَةِ (Pukul Delapan)', 'التَّاسِعَةِ (Pukul Sembilan)'],
        correctIndex: 1,
        explanation: 'Pukul tujuh pagi tepat: فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا تَمَامًا.',
      },
      {
        questionNumber: 2,
        prompt: 'Kapan siswa hadir di sekolah pada rumpang (٢)?',
        options: ['المَوْعِدِ (Jadwal/Waktu Ditentukan)', 'الامْتِحَانِ (Ujian)', 'اللَّيْلِ (Malam)', 'الظُّهْرِ (Siang)'],
        correctIndex: 0,
        explanation: 'Hadir sebelum waktu masuk: قَبْلَ المَوْعِدِ.',
      },
      {
        questionNumber: 3,
        prompt: 'Pukul berapakah sesi jam pelajaran berakhir pada rumpang (٣)?',
        options: ['السَّابِعَةِ (Pukul Tujuh)', 'الثَّامِنَةِ (Pukul Delapan)', 'التَّاسِعَةِ (Pukul Sembilan)', 'العَاشِرَةِ (Pukul Sepuluh)'],
        correctIndex: 1,
        explanation: 'Berakhir pukul delapan: فِي السَّاعَةِ الثَّامِنَةِ.',
      },
    ],
  },
  {
    id: 'ist-wak-2',
    themeId: 'waktu',
    title: 'Waktu Istirahat Siang',
    titleArabic: 'وَقْتُ الاسْتِرَاحَةِ فِي الظُّهْرِ',
    durationSeconds: 29,
    storyArabicFull:
      'فِي السَّاعَةِ الثَّانِيَةَ عَشْرَةَ نَهَارًا، يَدْقُ جَرَسُ الظُّهْرِ. يُصَلِّيْ التَّلَامِيْذُ صَلَاةَ الظُّهْرِ جَمَاعَةً، ثُمَّ يَتَنَاوَلُوْنَ وَجْبَةَ الغَدَاءِ.',
    storyArabicCloze:
      'فِي السَّاعَةِ [...] (١) عَشْرَةَ نَهَارًا، يَدْقُ جَرَسُ الظُّهْرِ. يُصَلِّيْ التَّلَامِيْذُ صَلَاةَ [...] (٢) جَمَاعَةً، ثُمَّ يَتَنَاوَلُوْنَ وَجْبَةَ [...] (٣).',
    storyTranslation:
      'Pada pukul dua belas siang, bel tanda dzuhur berdering. Para murid menunaikan salat Dzuhur berjamaah, kemudian menikmati hidangan makan siang.',
    questions: [
      {
        questionNumber: 1,
        prompt: 'Pukul berapakah bel siang berbunyi pada rumpang (١)?',
        options: ['الحَادِيَةَ (Sebelas)', 'الثَّانِيَةَ (Dua Belas)', 'العَاشِرَةَ (Sepuluh)', 'التَّاسِعَةَ (Sembilan)'],
        correctIndex: 1,
        explanation: 'Pukul dua belas siang: فِي السَّاعَةِ الثَّانِيَةَ عَشْرَةَ.',
      },
      {
        questionNumber: 2,
        prompt: 'Salat fardhu apakah yang ditunaikan secara berjamaah pada rumpang (٢)?',
        options: ['الصُّبْحِ (Subuh)', 'الظُّهْرِ (Dzuhur)', 'العَصْرِ (Ashar)', 'المَغْرِبِ (Maghrib)'],
        correctIndex: 1,
        explanation: 'Salat Dzuhur berjamaah: صَلَاةَ الظُّهْرِ جَمَاعَةً.',
      },
      {
        questionNumber: 3,
        prompt: 'Waktu makan apakah yang mereka nikmati pada rumpang (٣)?',
        options: ['الفُطُوْرِ (Sarapan)', 'الغَدَاءِ (Makan Siang)', 'العَشَاءِ (Makan Malam)', 'السَّحُوْرِ (Sahur)'],
        correctIndex: 1,
        explanation: 'Makan siang: وَجْبَةَ الغَدَاءِ.',
      },
    ],
  },
];
