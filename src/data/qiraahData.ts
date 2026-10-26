import { QiraahItem } from '../types';

export const QIRAAH_DATA: QiraahItem[] = [
  // ================= TEMA 1: KELUARGA =================
  {
    id: 'qir-kel',
    themeId: 'keluarga',
    title: 'Kehidupan Keluargaku',
    titleArabic: 'حَيَاةُ أُسْرَتِيْ المَحْبُوْبَةِ',
    textArabic:
      'اِسْمِيْ فَارُوْقُ. أَنَا تِلْمِيْذٌ فِي المَدْرَسَةِ المُتَوَسِّطَةِ. أَعِيْشُ مَعَ أُسْرَتِيْ فِي مَدِيْنَةِ بَانْدُوْنْج. أَبِيْ اسْمُهُ عُثْمَانُ، وَهُوَ مُعَلِّمٌ مُخْلِصٌ، وَأُمِّيْ اسْمُهَا خَدِيْجَةُ، وَهِيَ رَبَّةُ بَيْتٍ نَشِيْطَةٌ. لِيْ أَخٌ كَبِيْرٌ اسْمُهُ حَسَنٌ، وَأُخْتٌ صَغِيْرَةٌ اسْمُهَا مَرْيَمُ. نَحْنُ نَعِيْشُ فِي مَحَبَّةٍ وَسَعَادَةٍ، وَنَتَعَاوَنُ فِي أَعْمَالِ البَيْتِ كُلَّ يَوْمٍ.',
    textTranslation:
      'Namaku Faruq. Saya adalah murid di sekolah menengah pertama. Saya tinggal bersama keluargaku di kota Bandung. Ayahku bernama Utsman, beliau adalah seorang guru yang ikhlas, dan ibuku bernama Khadijah, beliau adalah seorang ibu rumah tangga yang rajin. Saya mempunyai seorang kakak laki-laki bernama Hasan, dan seorang adik perempuan bernama Maryam. Kami hidup dalam penuh kasih sayang dan kebahagiaan, serta saling membantu dalam pekerjaan rumah setiap hari.',
    glossary: [
      { arabic: 'أُسْرَتِيْ', latin: 'Usratii', meaning: 'Keluargaku' },
      { arabic: 'مُعَلِّمٌ مُخْلِصٌ', latin: "Mu'allimun mukhlishun", meaning: 'Guru yang ikhlas' },
      { arabic: 'رَبَّةُ بَيْتٍ', latin: 'Rabbatul baytin', meaning: 'Ibu rumah tangga' },
      { arabic: 'سَعَادَةٌ', latin: "Sa'aadah", meaning: 'Kebahagiaan' },
      { arabic: 'نَتَعَاوَنُ', latin: "Nata'aawanu", meaning: 'Kami saling tolong-menolong' },
    ],
    questions: [
      {
        question: 'Di kota manakah Faruq tinggal bersama keluarganya?',
        questionArabic: 'أَيْنَ يَعِيْشُ فَارُوْقُ مَعَ أُسْرَتِهِ؟',
        options: ['فِي مَدِيْنَةِ جَاكَرْتَا (Jakarta)', 'فِي مَدِيْنَةِ بَانْدُوْنْج (Bandung)', 'فِي مَدِيْنَةِ سُوْرَابَايَا (Surabaya)', 'فِي مَدِيْنَةِ مَدَان (Medan)'],
        correctIndex: 1,
        explanation: 'Dalam teks tertulis: أَعِيْشُ مَعَ أُسْرَتِيْ فِي مَدِيْنَةِ بَانْدُوْنْج.',
      },
      {
        question: 'Apa profesi ayah Faruq dalam bacaan di atas?',
        questionArabic: 'مَا مِهْنَةُ وَالِدِ فَارُوْقَ؟',
        options: ['طَبِيْبٌ (Dokter)', 'تَاجِرٌ (Pedagang)', 'مُعَلِّمٌ (Guru)', 'مُهَنْدِسٌ (Insinyur)'],
        correctIndex: 2,
        explanation: 'Ayah Faruq adalah seorang guru: وَهُوَ مُعَلِّمٌ مُخْلِصٌ.',
      },
      {
        question: 'Siapakah nama adik perempuan Faruq?',
        questionArabic: 'مَا اسْمُ أُخْتِ فَارُوْقَ الصَّغِيْرَةِ؟',
        options: ['عَائِشَةُ (Aisyah)', 'فَاطِمَةُ (Fatimah)', 'مَرْيَمُ (Maryam)', 'زَيْنَبُ (Zainab)'],
        correctIndex: 2,
        explanation: 'Adik perempuannya bernama Maryam: وَأُخْتٌ صَغِيْرَةٌ اسْمُهَا مَرْيَمُ.',
      },
    ],
  },

  // ================= TEMA 2: MADRASAH =================
  {
    id: 'qir-mad',
    themeId: 'madrasah',
    title: 'Madrasahku yang Bersih dan Nyaman',
    titleArabic: 'مَدْرَسَتِيْ النَّظِيْفَةُ وَالمُرِيْحَةُ',
    textArabic:
      'مَدْرَسَتِيْ جَمِيْلَةٌ وَوَاسِعَةٌ، فِيْهَا ثَلَاثُوْنَ فَصْلاً وَمَكْتَبَةٌ كَبِيْرَةٌ مَلِيْئَةٌ بِالكُتُبِ الدِّيْنِيَّةِ وَالعِلْمِيَّةِ. أَمَامَ الفُصُوْلِ سَاحَةٌ خَضْرَاءُ يَلْعَبُ فِيْهَا الطُّلَّابُ كُرَةَ القَدَمِ فِي وَقْتِ الفَرَاغِ. وَفِي كُلِّ فَصْلٍ سَبُّوْرَةٌ بَيْضَاءُ وَمَكَاتِبُ مُرَتَّبَةٌ. نَحْنُ نُحِبُّ مَدْرَسَتَنَا وَنُحَافِظُ عَلَى نَظَافَتِهَا دَائِمًا.',
    textTranslation:
      'Sekolahku indah dan luas, di dalamnya terdapat tiga puluh ruang kelas dan perpustakaan besar yang penuh dengan buku-buku agama serta ilmu pengetahuan. Di depan ruang kelas terdapat halaman hijau tempat para siswa bermain sepak bola saat waktu luang. Di setiap kelas terdapat papan tulis putih dan meja-meja yang tertata rapi. Kami mencintai sekolah kami dan selalu menjaga kebersihannya.',
    glossary: [
      { arabic: 'وَاسِعَةٌ', latin: 'Waasi-atun', meaning: 'Luas' },
      { arabic: 'مَلِيْئَةٌ', latin: 'Malii-atun', meaning: 'Penuh' },
      { arabic: 'سَاحَةٌ خَضْرَاءُ', latin: 'Saahatun khadhraa-u', meaning: 'Halaman hijau' },
      { arabic: 'مُرَتَّبَةٌ', latin: 'Murattabatun', meaning: 'Tertata rapi' },
      { arabic: 'نُحَافِظُ', latin: 'Nuhaafidhu', meaning: 'Kami senantiasa menjaga' },
    ],
    questions: [
      {
        question: 'Ada berapa banyak ruang kelas yang terdapat di sekolah tersebut?',
        questionArabic: 'كَمْ فَصْلاً فِي المَدْرَسَةِ؟',
        options: ['عِشْرُوْنَ فَصْلاً (20 Kelas)', 'ثَلَاثُوْنَ فَصْلاً (30 Kelas)', 'أَرْبَعُوْنَ فَصْلاً (40 Kelas)', 'عَشَرَةُ فُصُوْلٍ (10 Kelas)'],
        correctIndex: 1,
        explanation: 'Disebutkan pada teks: فِيْهَا ثَلَاثُوْنَ فَصْلاً.',
      },
      {
        question: 'Apa yang dilakukan siswa di halaman hijau saat waktu luang?',
        questionArabic: 'مَاذَا يَفْعَلُ الطُّلَّابُ فِي السَّاحَةِ؟',
        options: ['يَقْرَؤُوْنَ الكُتُبَ (Membaca buku)', 'يَلْعَبُوْنَ كُرَةَ القَدَمِ (Bermain sepak bola)', 'يَأْكُلُوْنَ الغَدَاءَ (Makan siang)', 'يَنَامُوْنَ (Tidur)'],
        correctIndex: 1,
        explanation: 'Siswa bermain sepak bola: يَلْعَبُ فِيْهَا الطُّلَّابُ كُرَةَ القَدَمِ.',
      },
      {
        question: 'Bagaimana kondisi meja-meja di dalam ruang kelas?',
        questionArabic: 'كَيْفَ المَكَاتِبُ فِي الفَصْلِ؟',
        options: ['قَدِيْمَةٌ (Kuno)', 'مَكْسُوْرَةٌ (Rusak/Patah)', 'مُرَتَّبَةٌ (Tertata rapi)', 'مُتَّسِخَةٌ (Kotor)'],
        correctIndex: 2,
        explanation: 'Meja tertata rapi: وَمَكَاتِبُ مُرَتَّبَةٌ.',
      },
    ],
  },

  // ================= TEMA 3: HOBI =================
  {
    id: 'qir-hob',
    themeId: 'hobi',
    title: 'Manfaat Membaca Buku',
    titleArabic: 'فَائِدَةُ القِرَاءَةِ',
    textArabic:
      'القِرَاءَةُ هِوَايَةٌ نَافِعَةٌ جِدًّا تُغَذِّي العَقْلَ وَتَفْتَحُ آفَاقَ المَعْرِفَةِ. يَقْضِي زَيْدٌ سَاعَةً كُلَّ مَسَاءٍ فِي قِرَاءَةِ الكُتُبِ التَّارِيْخِيَّةِ وَالعِلْمِيَّةِ. يَقُوْلُ الحُكَمَاءُ: "خَيْرُ جَلِيْسٍ فِي الزَّمَانِ كِتَابٌ". مَنْ يُكْثِرُ القِرَاءَةَ يَكْتَسِبُ مُفْرَدَاتٍ جَدِيْدَةً وَيَكُوْنُ كَلَامُهُ فَصِيْحًا وَفِكْرُهُ مُسْتَنِيْرًا.',
    textTranslation:
      'Membaca adalah hobi yang sangat bermanfaat yang memberi nutrisi bagi akal dan membuka cakrawala pengetahuan. Zaid menghabiskan waktu satu jam setiap sore untuk membaca buku-buku sejarah dan ilmiah. Para bijak berkata: "Sebaik-baik teman duduk sepanjang zaman adalah buku." Barangsiapa yang gemar membaca, ia akan memperoleh kosakata baru, tutur katanya fasih, dan pemikirannya cerah.',
    glossary: [
      { arabic: 'نَافِعَةٌ', latin: "Naafi'ah", meaning: 'Bermanfaat' },
      { arabic: 'تُغَذِّي العَقْلَ', latin: "Tughadzdzil 'aqla", meaning: 'Menutrisi akal fikiran' },
      { arabic: 'خَيْرُ جَلِيْسٍ', latin: 'Khayru jaliisin', meaning: 'Sebaik-baik kawan duduk' },
      { arabic: 'فَصِيْحًا', latin: 'Fashiihan', meaning: 'Fasih berbicara' },
      { arabic: 'مُسْتَنِيْرًا', latin: 'Mustaniiran', meaning: 'Cerah tercerahkan' },
    ],
    questions: [
      {
        question: 'Berapa lama Zaid membaca buku setiap sore?',
        questionArabic: 'كَمْ سَاعَةً يَقْضِي زَيْدٌ فِي القِرَاءَةِ؟',
        options: ['نِصْفَ سَاعَةٍ (Setengah jam)', 'سَاعَةً وَاحِدَةً (Satu jam)', 'سَاعَتَيْنِ (Dua jam)', 'ثَلَاثَ سَاعَاتٍ (Tiga jam)'],
        correctIndex: 1,
        explanation: 'Zaid membaca satu jam: يَقْضِي زَيْدٌ سَاعَةً كُلَّ مَسَاءٍ.',
      },
      {
        question: 'Menurut kata mutiara, siapakah sebaik-baik teman duduk sepanjang masa?',
        questionArabic: 'مَا هُوَ خَيْرُ جَلِيْسٍ فِي الزَّمَانِ؟',
        options: ['الهَاتِفُ (Handphone)', 'التِّلْفَازُ (Televisi)', 'الكِتَابُ (Buku)', 'الحَاسُوْبُ (Komputer)'],
        correctIndex: 2,
        explanation: 'Kutipan mutiara: خَيْرُ جَلِيْسٍ فِي الزَّمَانِ كِتَابٌ.',
      },
      {
        question: 'Apa manfaat yang didapat seseorang jika sering membaca?',
        questionArabic: 'مَاذَا يَكْتَسِبُ مَنْ يُكْثِرُ القِرَاءَةَ؟',
        options: ['أَمْوَالاً كَثِيْرَةً (Uang melimpah)', 'مُفْرَدَاتٍ جَدِيْدَةً (Kosakata baru)', 'أَلْعَابًا جَدِيْدَةً (Mainan baru)', 'شُهْرَةً (Popularitas)'],
        correctIndex: 1,
        explanation: 'Mendapat kosakata baru dan wawasan: يَكْتَسِبُ مُفْرَدَاتٍ جَدِيْدَةً.',
      },
    ],
  },

  // ================= TEMA 4: PROFESI =================
  {
    id: 'qir-pro',
    themeId: 'profesi',
    title: 'Cita-Cita Menjadi Insinyur',
    titleArabic: 'أَمَلِيْ أَنْ أَكُوْنَ مُهَنْدِسًا',
    textArabic:
      'كُلُّ إِنْسَانٍ لَهُ أَمَلٌ فِي حَيَاتِهِ المُسْتَقْبَلِيَّةِ. أَنَا أَتَمَنَّى أَنْ أَكُوْنَ مُهَنْدِسًا مِعْمَارِيًّا مَاهِرًا. أُرِيْدُ أَنْ أَبْنِيَ مَسَاجِدَ جَمِيْلَةً وَمَدَارِسَ حَدِيْثَةً وَمُسْتَشْفَيَاتٍ وَاسِعَةً لِخِدْمَةِ المُجْتَمَعِ. لِذٰلِكَ، أَنَا أَدْرُسُ الرِّيَاضِيَّاتِ وَالعُلُوْمَ بِجِدٍّ وَاجْتِهَادٍ، وَأَدْعُو اللهَ أَنْ يُوَفِّقَنِيْ.',
    textTranslation:
      'Setiap manusia memiliki cita-cita untuk masa depannya. Saya bercita-cita menjadi insinyur arsitektur yang terampil. Saya ingin membangun masjid-masjid yang indah, sekolah-sekolah modern, dan rumah sakit yang luas untuk mengabdi kepada masyarakat. Oleh karena itu, saya mempelajari matematika dan sains dengan sungguh-sungguh serta berdoa kepada Allah agar diberi kemudahan.',
    glossary: [
      { arabic: 'أَمَلٌ', latin: 'Amalun', meaning: 'Cita-cita / Harapan' },
      { arabic: 'مُهَنْدِسٌ مِعْمَارِيٌّ', latin: "Muhandisun mi'maariyyun", meaning: 'Insinyur Arsitek' },
      { arabic: 'مَاهِرٌ', latin: 'Maahirun', meaning: 'Pintar / Mahir / Terampil' },
      { arabic: 'خِدْمَةِ المُجْتَمَعِ', latin: 'Khidmatil mujtama’', meaning: 'Melayani masyarakat' },
      { arabic: 'اجْتِهَادٌ', latin: 'Ijtahaadun', meaning: 'Ketekunan yang gigih' },
    ],
    questions: [
      {
        question: 'Apakah cita-cita penulis dalam teks bacaan?',
        questionArabic: 'مَا أَمَلُ الكَاتِبِ فِي المُسْتَقْبَلِ؟',
        options: ['طَبِيْبٌ (Dokter)', 'مُهَنْدِسٌ مِعْمَارِيٌّ (Insinyur Arsitek)', 'طَيَّارٌ (Pilot)', 'شُرْطِيٌّ (Polisi)'],
        correctIndex: 1,
        explanation: 'Penulis ingin menjadi insinyur: أَنْ أَكُوْنَ مُهَنْدِسًا مِعْمَارِيًّا.',
      },
      {
        question: 'Bangunan apa saja yang ingin dibangun oleh penulis?',
        questionArabic: 'مَاذَا يُرِيْدُ الكَاتِبُ أَنْ يَبْنِيَ؟',
        options: ['فَنَادِقَ وَمَلَاهِيَ (Hotel dan wahana)', 'مَسَاجِدَ وَمَدَارِسَ وَمُسْتَشْفَيَاتٍ (Masjid, sekolah, RS)', 'مَحَلَّاتٍ تِجَارِيَّةً (Toko-toko)', 'مَطَاعِمَ فَاخِرَةً (Restoran mewah)'],
        correctIndex: 1,
        explanation: 'Membangun masjid, madrasah, dan rumah sakit: مَسَاجِدَ جَمِيْلَةً وَمَدَارِسَ حَدِيْثَةً وَمُسْتَشْفَيَاتٍ.',
      },
      {
        question: 'Pelajaran apa yang dipelajari dengan tekun untuk meraih cita-citanya?',
        questionArabic: 'مَا المَوَادُّ الَّتِي يَدْرُسُهَا بِجِدٍّ؟',
        options: ['الرِّيَاضِيَّاتُ وَالعُلُوْمُ (Matematika dan Sains)', 'الفَنُّ وَالمُوْسِيْقَى (Seni dan Musik)', 'اللُّغَةُ الفَرَنْسِيَّةُ (Bahasa Prancis)', 'الجُغْرَافِيَا (Geografi)'],
        correctIndex: 0,
        explanation: 'Ia belajar matematika dan sains: أَدْرُسُ الرِّيَاضِيَّاتِ وَالعُلُوْمَ بِجِدٍّ.',
      },
    ],
  },

  // ================= TEMA 5: TRANSPORTASI =================
  {
    id: 'qir-tra',
    themeId: 'transportasi',
    title: 'Perjalanan Liburan Bersama Kereta Cepat',
    titleArabic: 'رِحْلَةٌ مُرِيْحَةٌ بِالقِطَارِ السَّرِيْعِ',
    textArabic:
      'فِي الأُسْبُوْعِ المَاضِي، سَافَرْتُ مَعَ أُسْرَتِيْ إِلَى جَاكَرْتَا بِالقِطَارِ السَّرِيْعِ. كَانَتِ الرِّحْلَةُ مُرِيْحَةً وَمُمْتِعَةً جِدًّا. مَقَاعِدُ القِطَارِ نَظِيْفَةٌ، وَنَوَافِذُهُ زُجَاجِيَّةٌ وَاسِعَةٌ نُشَاهِدُ مِنْهَا المَنَاظِرَ الطَّبِيْعِيَّةَ كَالمَزَارِعِ وَالجِبَالِ الخَضْرَاءِ. وَصَلْنَا فِي نِصْفِ سَاعَةٍ فَقَطْ دُوْنَ أَنْ نَشْعُرَ بِالتَّعَبِ.',
    textTranslation:
      'Pada minggu lalu, saya bepergian bersama keluargaku ke Jakarta menggunakan kereta api cepat. Perjalanan tersebut sangat nyaman dan menyenangkan. Kursi-kursi kereta bersih, jendelanya terbuat dari kaca lebar di mana kami dapat memandangi pemandangan alam seperti persawahan dan perbukitan hijau. Kami tiba hanya dalam waktu setengah jam tanpa merasa letih.',
    glossary: [
      { arabic: 'الرِّحْلَةُ', latin: 'Ar-Rihlah', meaning: 'Perjalanan wisata' },
      { arabic: 'مُرِيْحَةٌ', latin: 'Muriihatun', meaning: 'Nyaman / Tenang' },
      { arabic: 'مَقَاعِدُ', latin: "Maqaa'idu", meaning: 'Kursi-kursi tempat duduk' },
      { arabic: 'مَنَاظِرَ طَبِيْعِيَّةً', latin: "Manaadhira thabii'iyyah", meaning: 'Pemandangan alam' },
      { arabic: 'التَّعَبُ', latin: "At-Ta'abu", meaning: 'Rasa lelah / Capek' },
    ],
    questions: [
      {
        question: 'Ke kota manakah perjalanan liburan tersebut dilakukan?',
        questionArabic: 'إِلَى أَيِّ مَدِيْنَةٍ سَافَرَ الكَاتِبُ؟',
        options: ['إِلَى بَانْدُوْنْج (Bandung)', 'إِلَى جَاكَرْتَا (Jakarta)', 'إِلَى سِيْمَارَانْج (Semarang)', 'إِلَى يُوْغْيَاكَارْتَا (Yogyakarta)'],
        correctIndex: 1,
        explanation: 'Tujuan perjalanan adalah Jakarta: سَافَرْتُ مَعَ أُسْرَتِيْ إِلَى جَاكَرْتَا.',
      },
      {
        question: 'Berapa lama waktu tempuh perjalanan kereta cepat tersebut?',
        questionArabic: 'كَمِ الوَقْتُ المُسْتَغْرَقُ فِي الرِّحْلَةِ؟',
        options: ['سَاعَتَانِ (2 Jam)', 'سَاعَةٌ وَاحِدَةٌ (1 Jam)', 'نِصْفُ سَاعَةٍ (Setengah Jam / 30 Menit)', 'عَشْرُ دَقَائِقَ (10 Menit)'],
        correctIndex: 2,
        explanation: 'Sampai dalam setengah jam: وَصَلْنَا فِي نِصْفِ سَاعَةٍ فَقَطْ.',
      },
      {
        question: 'Pemandangan apakah yang disaksikan dari jendela kereta?',
        questionArabic: 'مَاذَا شَاهَدَ الكَاتِبُ مِنَ النَّوَافِذِ؟',
        options: ['المَبَانِيَ العَالِيَةَ (Gedung-gedung tinggi)', 'المَزَارِعَ وَالجِبَالَ الخَضْرَاءَ (Sawah dan bukit hijau)', 'السُّفُنَ فِي البَحْرِ (Kapal di laut)', 'السَّيَّارَاتِ الكَثِيْرَةَ (Banyak mobil)'],
        correctIndex: 1,
        explanation: 'Melihat sawah dan gunung hijau: كَالمَزَارِعِ وَالجِبَالِ الخَضْرَاءِ.',
      },
    ],
  },

  // ================= TEMA 6: WARNA =================
  {
    id: 'qir-war',
    themeId: 'warna',
    title: 'Indahnya Keberagaman Warna',
    titleArabic: 'جَمَالُ الأَلْوَانِ فِي الطَّبِيْعَةِ',
    textArabic:
      'الأَلْوَانُ آيَةٌ مِنْ آيَاتِ اللهِ فِي الكَوْنِ. السَّمَاءُ زَرْقَاءُ صَافِيَةٌ فِي النَّهَارِ، وَالشَّمْسُ صَفْرَاءُ مُشْرِقَةٌ تُنِيْرُ الدُّنْيَا. وَالأَشْجَارُ خَضْرَاءُ تَمْلَأُ الغَابَاتِ، وَالبَحْرُ عَمِيْقٌ لَوْنُهُ كُحْلِيٌّ. كُلُّ هٰذِهِ الأَلْوَانِ تَمْنَحُ النَّفْسَ الرَّاحَةَ وَالسُّرُوْرَ عِنْدَمَا نَتَأَمَّلُهَا.',
    textTranslation:
      'Warna-warni adalah salah satu tanda kebesaran Allah di alam semesta. Langit berwarna biru cerah di siang hari, dan matahari kuning bersinar menyinari dunia. Pohon-pohon hijau memenuhi hutan, dan lautan dalam memiliki warna biru tua nan pekat. Semua warna ini menganugerahkan ketenangan jiwa dan kebahagiaan saat kita merenunginya.',
    glossary: [
      { arabic: 'آيَةٌ', latin: 'Aayatun', meaning: 'Tanda kebesaran / Mukjizat' },
      { arabic: 'صَافِيَةٌ', latin: 'Shaafiyatun', meaning: 'Jernih / Cerah' },
      { arabic: 'تُنِيْرُ الدُّنْيَا', latin: 'Tuniirud dunyaa', meaning: 'Menyinari dunia' },
      { arabic: 'الرَّاحَةُ', latin: 'Ar-Raahah', meaning: 'Ketenangan / Kenyamanan' },
      { arabic: 'نَتَأَمَّلُهَا', latin: "Nata'ammaluhaa", meaning: 'Kita merenungi dan memperhatikannya' },
    ],
    questions: [
      {
        question: 'Apakah warna langit di siang hari menurut teks di atas?',
        questionArabic: 'مَا لَوْنُ السَّمَاءِ فِي النَّهَارِ؟',
        options: ['حَمْرَاءُ (Merah)', 'زَرْقَاءُ (Biru)', 'سَوْدَاءُ (Hitam)', 'بَيْضَاءُ (Putih)'],
        correctIndex: 1,
        explanation: 'Langit biru cerah: السَّمَاءُ زَرْقَاءُ صَافِيَةٌ.',
      },
      {
        question: 'Benda langit apakah yang digambarkan berwarna kuning dan menyinari dunia?',
        questionArabic: 'مَا الشَّيْءُ الأَصْفَرُ الَّذِي يُنِيْرُ الدُّنْيَا؟',
        options: ['القَمَرُ (Bulan)', 'الشَّمْسُ (Matahari)', 'النَّجْمُ (Bintang)', 'السَّحَابُ (Awan)'],
        correctIndex: 1,
        explanation: 'Matahari kuning cerah: وَالشَّمْسُ صَفْرَاءُ مُشْرِقَةٌ.',
      },
      {
        question: 'Apa pengaruh merenungi keindahan aneka warna alam bagi manusia?',
        questionArabic: 'مَاذَا تَمْنَحُ هٰذِهِ الأَلْوَانُ لِلنَّفْسِ؟',
        options: ['الخَوْفَ (Rasa takut)', 'الرَّاحَةَ وَالسُّرُوْرَ (Ketenangan dan kegembiraan)', 'التَّعَبَ (Kelelahan)', 'الغَضَبَ (Kemarahan)'],
        correctIndex: 1,
        explanation: 'Memberikan ketenangan dan kegembiraan: تَمْنَحُ النَّفْسَ الرَّاحَةَ وَالسُّرُوْرَ.',
      },
    ],
  },

  // ================= TEMA 7: KEGIATAN SEHARI-HARI =================
  {
    id: 'qir-keg',
    themeId: 'kegiatan',
    title: 'Rutinitas Siswa yang Disiplin',
    titleArabic: 'يَوْمِيَّاتُ التِّلْمِيْذِ المُنَظَّمِ',
    textArabic:
      'يَبْدَأُ يُوْسُفُ يَوْمَهُ فِي السَّاعَةِ الرَّابِعَةِ وَالنِّصْفِ صَبَاحًا. يُصَلِّيْ الفَجْرَ جَمَاعَةً فِي المَسْجِدِ، ثُمَّ يَتْلُوْ بَعْضَ الآيَاتِ مِنَ القُرْآنِ الكَرِيْمِ. يَتَنَاوَلُ يُوْسُفُ فُطُوْرَهُ فِي السَّادِسَةِ، ثُمَّ يَتَوَجَّهُ إِلَى المَدْرَسَةِ سَيْرًا عَلَى الأَقْدَامِ لِأَنَّهَا قَرِيْبَةٌ مِنْ بَيْتِهِ. وَفِي المَسَاءِ، يُرَاجِعُ دُرُوْسَهُ بِانْتِظَامٍ.',
    textTranslation:
      'Yusuf memulai harinya pada pukul setengah lima pagi. Ia salat Fajar berjamaah di masjid, lalu membaca beberapa ayat dari Al-Qur’an Al-Karim. Yusuf menyantap sarapannya pada pukul enam, lalu menuju ke sekolah dengan berjalan kaki karena jaraknya dekat dari rumahnya. Pada waktu sore, ia mengulang pelajaran-pelajarannya dengan teratur.',
    glossary: [
      { arabic: 'يَبْدَأُ', latin: 'Yabda-u', meaning: 'Memulai' },
      { arabic: 'يَتْلُوْ', latin: 'Yatluu', meaning: 'Membaca / Melantunkan' },
      { arabic: 'سَيْرًا عَلَى الأَقْدَامِ', latin: 'Sayran ‘alal aqdaam', meaning: 'Berjalan kaki' },
      { arabic: 'قَرِيْبَةٌ', latin: 'Qariibatun', meaning: 'Dekat' },
      { arabic: 'بِانْتِظَامٍ', latin: 'Bi-intidhaamin', meaning: 'Secara teratur / Disiplin' },
    ],
    questions: [
      {
        question: 'Pukul berapakah Yusuf bangun dan memulai harinya?',
        questionArabic: 'مَتَى يَبْدَأُ يُوْسُفُ يَوْمَهُ؟',
        options: ['فِي السَّادِسَةِ (Pukul Enam)', 'فِي الرَّابِعَةِ وَالنِّصْفِ (Pukul Setengah Lima)', 'فِي الخَامِسَةِ (Pukul Lima)', 'فِي السَّابِعَةِ (Pukul Tujuh)'],
        correctIndex: 1,
        explanation: 'Yusuf bangun pukul 04.30: فِي السَّاعَةِ الرَّابِعَةِ وَالنِّصْفِ صَبَاحًا.',
      },
      {
        question: 'Bagaimana cara Yusuf berangkat menuju ke sekolah?',
        questionArabic: 'كَيْفَ يَذْهَبُ يُوْسُفُ إِلَى المَدْرَسَةِ؟',
        options: ['بِالحَافِلَةِ (Dengan bus)', 'بِالدَّرَّاجَةِ (Dengan sepeda)', 'سَيْرًا عَلَى الأَقْدَامِ (Jalan kaki)', 'بِالسَّيَّارَةِ (Dengan mobil)'],
        correctIndex: 2,
        explanation: 'Jalan kaki karena dekat: سَيْرًا عَلَى الأَقْدَامِ لِأَنَّهَا قَرِيْبَةٌ.',
      },
      {
        question: 'Apa kegiatan yang dilakukan Yusuf pada waktu sore hari?',
        questionArabic: 'مَاذَا يَفْعَلُ يُوْسُفُ فِي المَسَاءِ؟',
        options: ['يَنَامُ (Tidur)', 'يَلْعَبُ بِالهَاتِفِ (Bermain HP)', 'يُرَاجِعُ دُرُوْسَهُ (Mengulang pelajarannya)', 'يَذْهَبُ لِلسُّوْقِ (Pergi ke pasar)'],
        correctIndex: 2,
        explanation: 'Mengulang pelajaran secara teratur: يُرَاجِعُ دُرُوْسَهُ بِانْتِظَامٍ.',
      },
    ],
  },

  // ================= TEMA 8: ANGGOTA TUBUH =================
  {
    id: 'qir-tub',
    themeId: 'tubuh',
    title: 'Kesehatan Tubuh Adalah Mahkota',
    titleArabic: 'الصِّحَّةُ تَاجٌ عَلَى رُؤُوْسِ الأَصِحَّاءِ',
    textArabic:
      'العَقْلُ السَّلِيْمُ فِي الجِسْمِ السَّلِيْمِ. جِسْمُ الإِنْسَانِ أَمَانَةٌ عَظِيْمَةٌ يَجِبُ أَنْ نَرْعَاهَا. نَأْكُلُ الطَّعَامَ الصِّحِّيَّ بِالفَمِ لِيَقْوَى البَدَنُ، وَنَمْشِيْ بِالأَرْجُلِ لِمُمَارَسَةِ الرِّيَاضَةِ، وَنَسْتَخْدِمُ الأَيْدِيَ فِي مُسَاعَدَةِ المُحْتَاجِيْنَ. وَمَنْ يُحَافِظْ عَلَى نَظَافَةِ أَعْضَائِهِ يَبْتَعِدْ عَنِ الأَمْرَاضِ.',
    textTranslation:
      'Akal yang sehat terdapat pada tubuh yang sehat. Tubuh manusia adalah amanah besar yang wajib kita jaga. Kita memakan makanan bergizi dengan mulut agar badan bertenaga, kita melangkah dengan kaki untuk berolahraga, dan kita memakai tangan untuk membantu sesama yang membutuhkan. Barangsiapa yang merawat kebersihan anggota tubuhnya, ia akan terhindar dari penyakit.',
    glossary: [
      { arabic: 'العَقْلُ السَّلِيْمُ', latin: "Al-'Aqlus saliim", meaning: 'Akal pikiran yang sehat' },
      { arabic: 'أَمَانَةٌ عَظِيْمَةٌ', latin: "Amaanatun 'adhiimah", meaning: 'Amanah yang agung' },
      { arabic: 'نَرْعَاهَا', latin: "Nar'aahaa", meaning: 'Kita merawat dan memeliharanya' },
      { arabic: 'المُحْتَاجِيْنَ', latin: 'Al-Muhtaajiina', meaning: 'Orang-orang yang membutuhkan' },
      { arabic: 'الأَمْرَاضُ', latin: 'Al-Amraadhu', meaning: 'Penyakit-penyakit' },
    ],
    questions: [
      {
        question: 'Di manakah akal yang sehat berada menurut pepatah?',
        questionArabic: 'أَيْنَ يَكُوْنُ العَقْلُ السَّلِيْمُ؟',
        options: ['فِي المَالِ الكَثِيْرِ (Di harta berlimpah)', 'فِي الجِسْمِ السَّلِيْمِ (Di tubuh yang sehat)', 'فِي النَّوْمِ الطَّوِيْلِ (Di tidur panjang)', 'فِي الكَلَامِ الكَثِيْرِ (Di banyak bicara)'],
        correctIndex: 1,
        explanation: 'Pepatah terkenal: العَقْلُ السَّلِيْمُ فِي الجِسْمِ السَّلِيْمِ.',
      },
      {
        question: 'Untuk kebaikan apakah kita dianjurkan menggunakan kedua tangan kita?',
        questionArabic: 'فِيْمَ نَسْتَخْدِمُ الأَيْدِيَ؟',
        options: ['فِي ضَرْبِ الآخَرِيْنَ (Memukul orang lain)', 'فِي مُسَاعَدَةِ المُحْتَاجِيْنَ (Membantu yang butuh bantuan)', 'فِي اللَّعِبِ دَائِمًا (Bermain terus menerus)', 'فِي أَخْذِ حَقِّ النَّاسِ (Mengambil hak orang)'],
        correctIndex: 1,
        explanation: 'Membantu sesama yang membutuhkan: فِي مُسَاعَدَةِ المُحْتَاجِيْنَ.',
      },
      {
        question: 'Apa akibat positif dari menjaga kebersihan anggota badan?',
        questionArabic: 'مَا نَتِيْجَةُ المُحَافَظَةِ عَلَى نَظَافَةِ الجِسْمِ؟',
        options: ['يَجْلِبُ الأَمْرَاضَ (Mendatangkan penyakit)', 'يَبْتَعِدُ عَنِ الأَمْرَاضِ (Terhindar dari penyakit)', 'يَشْعُرُ بِالكَسَلِ (Merasa malas)', 'يَضْعُفُ الجِسْمُ (Tubuh melemah)'],
        correctIndex: 1,
        explanation: 'Terhindar dari penyakit: يَبْتَعِدْ عَنِ الأَمْرَاضِ.',
      },
    ],
  },

  // ================= TEMA 9: JAM DAN WAKTU =================
  {
    id: 'qir-wak',
    themeId: 'waktu',
    title: 'Waktu Adalah Pedang',
    titleArabic: 'الوَقْتُ كَالسَّيْفِ',
    textArabic:
      'الوَقْتُ غَالٍ جِدًّا لَا يُمْكِنُ اسْتِرْجَاعُهُ إِذَا مَضَى. يَقُوْلُ المَثَلُ العَرَبِيُّ الشَّهِيرُ: "الوَقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ". الطَّالِبُ النَّاجِحُ يُنَظِّمُ سَاعَاتِ يَوْمِهِ بَيْنَ الصَّلَاةِ، وَالدِّرَاسَةِ، وَالرِّيَاضَةِ، وَالنَّوْمِ. مَنْ يَحْتَرِمِ الوَقْتَ يَبْلُغْ أَهْدَافَهُ وَيَنَلِ النَّجَاحَ فِي حَيَاتِهِ.',
    textTranslation:
      'Waktu sangatlah berharga dan tak mungkin dapat dikembalikan jika telah berlalu. Pepatah Arab yang mashur mengatakan: "Waktu itu laksana pedang, jika engkau tidak menebasnya, niscaya ia yang akan menebasmu." Siswa yang sukses mengatur jam-jam harinya antara salat, belajar, berolahraga, dan istirahat tidur. Barangsiapa yang menghargai waktu, ia akan mencapai cita-citanya dan meraih kesuksesan hidup.',
    glossary: [
      { arabic: 'غَالٍ جِدًّا', latin: 'Ghaalin jiddan', meaning: 'Sangat berharga / bernilai tinggi' },
      { arabic: 'اسْتِرْجَاعُهُ', latin: "Istirjaa'uhu", meaning: 'Mengembalikannya' },
      { arabic: 'كَالسَّيْفِ', latin: 'Kassayfi', meaning: 'Bagaikan pedang tajam' },
      { arabic: 'يَبْلُغْ أَهْدَافَهُ', latin: 'Yablugh ahdaafahu', meaning: 'Mencapai target dan tujuannya' },
      { arabic: 'النَّجَاحُ', latin: 'An-Najaahu', meaning: 'Kesuksesan' },
    ],
    questions: [
      {
        question: 'Diumpamakan sebagai apakah waktu dalam peribahasa Arab tersebut?',
        questionArabic: 'بِمَاذَا شُبِّهَ الوَقْتُ فِي المَثَلِ العَرَبِيِّ؟',
        options: ['كَالمَاءِ (Laksana air)', 'كَالسَّيْفِ (Laksana pedang)', 'كَالذَّهَبِ (Laksana emas)', 'كَالرِّيْحِ (Laksana angin)'],
        correctIndex: 1,
        explanation: 'Peribahasa mengatakan waktu laksana pedang: الوَقْتُ كَالسَّيْفِ.',
      },
      {
        question: 'Bagaimana cara siswa yang sukses memanfaatkan waktu harinya?',
        questionArabic: 'كَيْفَ يَتَعَامَلُ الطَّالِبُ النَّاجِحُ مَعَ الوَقْتِ؟',
        options: ['يُضَيِّعُهُ فِي اللَّعِبِ (Menyia-nyiakannya dengan bermain)', 'يُنَظِّمُ سَاعَاتِ يَوْمِهِ (Mengatur jam-jam harinya dengan disiplin)', 'يَنَامُ طَوَالَ النَّهَارِ (Tidur seharian)', 'يَتْرُكُ الدِّرَاسَةَ (Meninggalkan belajar)'],
        correctIndex: 1,
        explanation: 'Mengatur jam harinya dengan disiplin: يُنَظِّمُ سَاعَاتِ يَوْمِهِ.',
      },
      {
        question: 'Apa keuntungan bagi orang yang menghormati dan menghargai waktu?',
        questionArabic: 'مَاذَا يَنَالُ مَنْ يَحْتَرِمُ الوَقْتَ؟',
        options: ['النَّجَاحَ فِي حَيَاتِهِ (Kesuksesan dalam hidupnya)', 'الخَسَارَةَ (Kerugian)', 'المَرَضَ (Sakit)', 'النِّسْيَانَ (Lupa)'],
        correctIndex: 0,
        explanation: 'Meraih kesuksesan: وَيَنَلِ النَّجَاحَ فِي حَيَاتِهِ.',
      },
    ],
  },
];
