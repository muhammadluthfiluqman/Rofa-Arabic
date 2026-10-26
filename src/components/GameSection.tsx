import React, { useState, useEffect, useRef } from 'react';
import { MUFRODAT_DATA } from '../data/mufrodatData';
import { speakArabic, playSoundEffect, stopSpeech } from '../utils/speech';
import { useAuth } from '../contexts/AuthContext';
import gameBannerImage from '../assets/images/game_arabic_quiz_1791192682934.jpg';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flame,
  Zap,
  Check,
  X,
} from 'lucide-react';

interface CardItem {
  id: string;
  uniqueId: string;
  content: string;
  type: 'arabic' | 'indonesian';
  matched: boolean;
  audioText?: string;
}

export const GameSection: React.FC = () => {
  const { recordGameScore } = useAuth();
  const [gameMode, setGameMode] = useState<'match' | 'speed'>('match');

  // ================= MATCH GAME STATES =================
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesFound, setMatchesFound] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [streak, setStreak] = useState(0);

  // Match interactive feedback states
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mismatchedPairIds, setMismatchedPairIds] = useState<string[]>([]);
  const [matchFeedback, setMatchFeedback] = useState<{
    text: string;
    type: 'correct' | 'wrong';
  } | null>(null);

  // ================= SPEED QUIZ STATES =================
  const [speedScore, setSpeedScore] = useState(0);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(45);
  const [isSpeedRunning, setIsSpeedRunning] = useState(false);
  const [speedCombo, setSpeedCombo] = useState(0);
  const [currentSpeedQuestion, setCurrentSpeedQuestion] = useState<{
    arabic: string;
    correct: string;
    options: string[];
  } | null>(null);

  // Speed interactive feedback states
  const [speedSelectedOption, setSpeedSelectedOption] = useState<string | null>(null);
  const [speedAnswerStatus, setSpeedAnswerStatus] = useState<'correct' | 'wrong' | null>(null);
  const [speedFeedbackBadge, setSpeedFeedbackBadge] = useState<{
    text: string;
    type: 'correct' | 'wrong';
  } | null>(null);

  // Initialize Memory Match Game
  const initMatchGame = () => {
    // Pick 6 random vocabularies from MUFRODAT_DATA
    const shuffledPool = [...MUFRODAT_DATA].sort(() => 0.5 - Math.random());
    const selectedVocab = shuffledPool.slice(0, 6);

    const generatedCards: CardItem[] = [];
    selectedVocab.forEach((item) => {
      generatedCards.push({
        id: item.id,
        uniqueId: `${item.id}-ar`,
        content: item.arabic,
        type: 'arabic',
        matched: false,
        audioText: item.arabic,
      });
      generatedCards.push({
        id: item.id,
        uniqueId: `${item.id}-id`,
        content: item.indonesian,
        type: 'indonesian',
        matched: false,
      });
    });

    // Shuffle the 12 cards
    setCards(generatedCards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMoves(0);
    setMatchesFound(0);
    setGameWon(false);
    setStreak(0);
    setMatchedPairIds([]);
    setMismatchedPairIds([]);
    setMatchFeedback(null);
  };

  useEffect(() => {
    initMatchGame();
    return () => {
      stopSpeech();
    };
  }, []);

  // Card click handler for match game
  const handleCardClick = (card: CardItem) => {
    if (
      card.matched ||
      selectedCards.length === 2 ||
      matchedPairIds.length > 0 ||
      mismatchedPairIds.length > 0
    ) {
      return;
    }
    if (selectedCards.some((c) => c.uniqueId === card.uniqueId)) return;

    if (card.audioText) {
      speakArabic(card.audioText);
    } else {
      playSoundEffect('click');
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newSelected;

      if (first.id === second.id && first.type !== second.type) {
        // MATCHED! Trigger celebration reactions
        const currentStreak = streak + 1;
        setStreak(currentStreak);
        setMatchedPairIds([first.uniqueId, second.uniqueId]);

        if (currentStreak >= 2) {
          playSoundEffect('streak');
          setMatchFeedback({
            text: `Hebat! Combo Cocok ${currentStreak}x! 🔥 (+15 Poin)`,
            type: 'correct',
          });
        } else {
          playSoundEffect('correct');
          setMatchFeedback({
            text: 'Cocok & Benar! 🎉 (+10 Poin)',
            type: 'correct',
          });
        }

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first.id ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          setMatchedPairIds([]);
          setMatchFeedback(null);

          setMatchesFound((prev) => {
            const next = prev + 1;
            if (next === 6) {
              setGameWon(true);
              playSoundEffect('win');
              recordGameScore(100);
            }
            return next;
          });
        }, 650);
      } else {
        // MISSED! Trigger error reaction
        setStreak(0);
        setMismatchedPairIds([first.uniqueId, second.uniqueId]);
        playSoundEffect('wrong');
        setMatchFeedback({
          text: 'Belum Cocok, Coba Ingat Lagi! ❌',
          type: 'wrong',
        });

        setTimeout(() => {
          setSelectedCards([]);
          setMismatchedPairIds([]);
          setMatchFeedback(null);
        }, 850);
      }
    }
  };

  // Speed Quiz Setup
  const generateSpeedQuestion = () => {
    const shuffled = [...MUFRODAT_DATA].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const wrong1 = shuffled[1].indonesian;
    const wrong2 = shuffled[2].indonesian;
    const wrong3 = shuffled[3].indonesian;

    const options = [target.indonesian, wrong1, wrong2, wrong3].sort(
      () => 0.5 - Math.random()
    );

    setCurrentSpeedQuestion({
      arabic: target.arabic,
      correct: target.indonesian,
      options,
    });
    setSpeedSelectedOption(null);
    setSpeedAnswerStatus(null);
    setSpeedFeedbackBadge(null);
  };

  const startSpeedQuiz = () => {
    setSpeedScore(0);
    setSpeedCombo(0);
    setSpeedTimeLeft(45);
    setIsSpeedRunning(true);
    setSpeedSelectedOption(null);
    setSpeedAnswerStatus(null);
    setSpeedFeedbackBadge(null);
    generateSpeedQuestion();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSpeedRunning && speedTimeLeft > 0) {
      timer = setTimeout(() => {
        setSpeedTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isSpeedRunning && speedTimeLeft === 0) {
      setIsSpeedRunning(false);
      playSoundEffect('win');
      recordGameScore(speedScore);
    }
    return () => clearTimeout(timer);
  }, [isSpeedRunning, speedTimeLeft, isSpeedRunning, speedScore, recordGameScore]);

  const handleSpeedAnswer = (chosen: string) => {
    if (!currentSpeedQuestion || speedSelectedOption !== null || !isSpeedRunning) return;

    setSpeedSelectedOption(chosen);

    if (chosen === currentSpeedQuestion.correct) {
      // CORRECT ANSWER
      const nextCombo = speedCombo + 1;
      setSpeedCombo(nextCombo);
      setSpeedAnswerStatus('correct');

      const isComboHigh = nextCombo >= 3;
      const points = isComboHigh ? 15 : 10;
      setSpeedScore((s) => s + points);

      if (isComboHigh) {
        playSoundEffect('streak');
        setSpeedFeedbackBadge({
          text: `+${points} COMBO ${nextCombo}x! 🔥`,
          type: 'correct',
        });
      } else {
        playSoundEffect('correct');
        setSpeedFeedbackBadge({
          text: `+${points} Jawaban Benar! ✨`,
          type: 'correct',
        });
      }

      setTimeout(() => {
        generateSpeedQuestion();
      }, 550);
    } else {
      // WRONG ANSWER
      setSpeedCombo(0);
      setSpeedAnswerStatus('wrong');
      playSoundEffect('wrong');
      setSpeedScore((s) => Math.max(0, s - 5));

      setSpeedFeedbackBadge({
        text: `-5 Kurang Tepat! ❌`,
        type: 'wrong',
      });

      // Keep screen visible for 700ms so student sees the correct answer highlighted!
      setTimeout(() => {
        generateSpeedQuestion();
      }, 750);
    }
  };

  return (
    <div className="py-6 sm:py-10 space-y-6 sm:space-y-8 w-full max-w-full overflow-x-hidden">
      {/* Game Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#114040] via-[#164e4e] to-[#0a2929] text-white shadow-xl border border-teal-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-5 sm:p-8 lg:p-10">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC853E] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
              <span>Zona Bermain & Gamifikasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight leading-tight">
              Mulai Bermain: Game Edukasi RofaArabic
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Tingkatkan daya ingat kosakata bahasa Arabmu dengan cara yang seru dan interaktif!
              Cocokkan kartu kata atau buktikan kecepatan responmu dalam kuis kilat 45 detik.
            </p>

            {/* Mode Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  setGameMode('match');
                  stopSpeech();
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 ${
                  gameMode === 'match'
                    ? 'bg-white text-[#114040] shadow-md ring-2 ring-[#EC853E]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#EC853E]" />
                <span>Pencocokan Kartu</span>
              </button>

              <button
                onClick={() => {
                  setGameMode('speed');
                  stopSpeech();
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 ${
                  gameMode === 'speed'
                    ? 'bg-white text-[#114040] shadow-md ring-2 ring-[#EC853E]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Clock className="w-4 h-4 text-[#EC853E]" />
                <span>Tantangan Kilat 45 Detik</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <img
                src={gameBannerImage}
                alt="Game Arab RofaArabic"
                referrerPolicy="no-referrer"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODE 1: MEMORY MATCH GAME ================= */}
      {gameMode === 'match' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-md space-y-5 sm:space-y-6 relative overflow-hidden">
          {/* Top Bar Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400">Langkah:</span>{' '}
                <strong className="text-slate-900 font-montserrat text-sm sm:text-base">
                  {moves}
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Pasangan Cocok:</span>{' '}
                <strong className="text-[#114040] font-montserrat text-sm sm:text-base">
                  {matchesFound} / 6
                </strong>
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1 text-[#EC853E] font-bold animate-bounce bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  <Flame className="w-3.5 h-3.5 fill-[#EC853E]" />
                  <span>Streak {streak}x!</span>
                </div>
              )}
            </div>

            <button
              onClick={initMatchGame}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#114040] hover:text-[#EC853E] bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-1.5 focus:outline-hidden active:scale-95 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Acak Ulang Kartu</span>
            </button>
          </div>

          {/* Floating Feedback Alert on Match or Miss */}
          {matchFeedback && (
            <div
              className={`p-3 rounded-2xl text-center text-xs sm:text-sm font-extrabold shadow-lg transition-all animate-in fade-in zoom-in-95 flex items-center justify-center gap-2 ${
                matchFeedback.type === 'correct'
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                  : 'bg-rose-500 text-white ring-4 ring-rose-200 animate-shake'
              }`}
            >
              {matchFeedback.type === 'correct' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{matchFeedback.text}</span>
            </div>
          )}

          {/* Cards Grid: 12 cards (2 cols on mobile, 3 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
            {cards.map((card) => {
              const isSelected = selectedCards.some(
                (c) => c.uniqueId === card.uniqueId
              );
              const isMatched = card.matched;
              const isJustMatched = matchedPairIds.includes(card.uniqueId);
              const isMismatched = mismatchedPairIds.includes(card.uniqueId);

              // Interactive Dynamic Card Styling
              let cardStyle =
                'bg-slate-50 hover:bg-teal-50/50 border-slate-200 hover:border-teal-400 text-slate-800 active:scale-95 shadow-xs';

              if (isMatched) {
                cardStyle =
                  'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80 cursor-default scale-95 shadow-none';
              } else if (isJustMatched) {
                cardStyle =
                  'bg-emerald-500 text-white border-emerald-600 shadow-xl scale-105 ring-4 ring-emerald-300 animate-pop-success';
              } else if (isMismatched) {
                cardStyle =
                  'bg-rose-500 text-white border-rose-600 shadow-xl ring-4 ring-rose-300 animate-shake';
              } else if (isSelected) {
                cardStyle =
                  'bg-[#114040] text-white border-[#114040] shadow-lg scale-102 ring-2 ring-teal-300/40';
              }

              return (
                <button
                  key={card.uniqueId}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched || isJustMatched || isMismatched}
                  className={`min-h-[110px] sm:min-h-[140px] rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all duration-200 relative border-2 focus:outline-hidden ${cardStyle}`}
                >
                  {/* Card Content */}
                  {card.type === 'arabic' ? (
                    <div className="space-y-1">
                      <span
                        className="font-amiri text-2xl sm:text-3xl font-bold block leading-relaxed"
                        dir="rtl"
                      >
                        {card.content}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-75 block">
                        Teks Arab
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-sm sm:text-base md:text-lg font-bold block leading-snug">
                        {card.content}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-75 block">
                        Bahasa Indonesia
                      </span>
                    </div>
                  )}

                  {/* Corner Status Badge */}
                  {isMatched && (
                    <div className="absolute top-2 right-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {isJustMatched && (
                    <div className="absolute top-2 right-2 text-white animate-bounce">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  {isMismatched && (
                    <div className="absolute top-2 right-2 text-white">
                      <X className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Win Modal/Card */}
          {gameWon && (
            <div className="bg-gradient-to-r from-teal-50 to-orange-50 border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#114040] font-montserrat">
                Selamat! Kamu Berhasil Menemukan Semua Pasangan!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Selesai hanya dalam <strong>{moves}</strong> langkah. Ingatan kosakata Arabmu sangat hebat!
              </p>
              <button
                onClick={initMatchGame}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#114040] hover:bg-[#1a5b5b] text-white shadow-md transition-all active:scale-95 flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Mainkan Lagi Dengan Kosakata Baru 🎮</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 2: SPEED QUIZ (45s CHALLENGE) ================= */}
      {gameMode === 'speed' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          {!isSpeedRunning && speedTimeLeft === 45 ? (
            // Start Screen
            <div className="text-center py-8 sm:py-12 space-y-5 max-w-lg mx-auto">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-orange-100 text-[#EC853E] flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-9 h-9 sm:w-10 sm:h-10 animate-spin" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#114040] font-montserrat">
                  Tantangan Kilat 45 Detik
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Tebak sebanyak mungkin arti kata bahasa Arab sebelum waktu habis!
                  Jawaban benar mendapat <strong className="text-emerald-600">+10 poin</strong> dan bonus combo jika menjawab berturut-turut.
                </p>
              </div>

              <button
                onClick={startSpeedQuiz}
                className="px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-lg shadow-orange-500/25 transition-transform active:scale-95 flex items-center gap-2 mx-auto"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Mulai Tantangan Sekarang!</span>
              </button>
            </div>
          ) : isSpeedRunning && currentSpeedQuestion ? (
            // Playing screen
            <div className="space-y-5 sm:space-y-6 max-w-2xl mx-auto">
              {/* Score & Timer Header */}
              <div className="flex items-center justify-between bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-5 h-5 ${
                      speedTimeLeft <= 10
                        ? 'text-rose-600 animate-ping'
                        : 'text-rose-500 animate-pulse'
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    Sisa Waktu:{' '}
                    <strong
                      className={`text-base sm:text-lg font-mono ${
                        speedTimeLeft <= 10 ? 'text-rose-600 font-black' : 'text-slate-900'
                      }`}
                    >
                      {speedTimeLeft}s
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {speedCombo > 1 && (
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-extrabold text-xs animate-bounce border border-orange-300">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                      <span>{speedCombo}x Combo</span>
                    </div>
                  )}

                  <div className="text-xs sm:text-sm font-bold text-[#114040]">
                    Skor:{' '}
                    <strong className="text-[#EC853E] text-lg sm:text-xl font-montserrat">
                      {speedScore}
                    </strong>{' '}
                    Poin
                  </div>
                </div>
              </div>

              {/* Big Word Card */}
              <div className="relative bg-gradient-to-br from-[#114040] to-[#185353] text-white rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-lg overflow-hidden">
                <span className="text-[11px] sm:text-xs text-teal-200 font-semibold uppercase tracking-wider block">
                  Apa arti dari kosakata ini?
                </span>

                <div
                  className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold py-2 select-none"
                  dir="rtl"
                >
                  {currentSpeedQuestion.arabic}
                </div>

                {/* Pronounce Audio Button */}
                <button
                  type="button"
                  onClick={() => speakArabic(currentSpeedQuestion.arabic)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-teal-100 text-xs font-semibold transition-all active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar Suara</span>
                </button>

                {/* Floating Score Reaction Badge */}
                {speedFeedbackBadge && (
                  <div
                    className={`absolute inset-x-4 bottom-3 py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold shadow-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in-95 ${
                      speedFeedbackBadge.type === 'correct'
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-300/40'
                        : 'bg-rose-500 text-white ring-4 ring-rose-300/40 animate-shake'
                    }`}
                  >
                    {speedFeedbackBadge.type === 'correct' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span>{speedFeedbackBadge.text}</span>
                  </div>
                )}
              </div>

              {/* 4 Choices with Interactive Reaction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {currentSpeedQuestion.options.map((opt, idx) => {
                  const isSelected = speedSelectedOption === opt;
                  const isCorrectAnswer = opt === currentSpeedQuestion.correct;
                  const isAnswerChecked = speedSelectedOption !== null;

                  let buttonStyle =
                    'border-slate-200 bg-white hover:bg-orange-50 hover:border-[#EC853E] text-slate-800 shadow-xs active:scale-95';

                  if (isAnswerChecked) {
                    if (isSelected && speedAnswerStatus === 'correct') {
                      buttonStyle =
                        'bg-emerald-500 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-300 animate-pop-success scale-[1.02]';
                    } else if (isSelected && speedAnswerStatus === 'wrong') {
                      buttonStyle =
                        'bg-rose-500 border-rose-600 text-white shadow-lg ring-4 ring-rose-300 animate-shake';
                    } else if (isCorrectAnswer && speedAnswerStatus === 'wrong') {
                      // Reveal correct option when student guessed wrong!
                      buttonStyle =
                        'bg-emerald-100 border-2 border-emerald-500 text-emerald-900 font-black ring-2 ring-emerald-300/50';
                    } else {
                      buttonStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSpeedAnswer(opt)}
                      disabled={isAnswerChecked}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-between gap-2 ${buttonStyle}`}
                    >
                      <span className="flex-1 text-center">{opt}</span>

                      {/* Visual Indicator Icons */}
                      {isAnswerChecked && isSelected && speedAnswerStatus === 'correct' && (
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                      )}
                      {isAnswerChecked && isSelected && speedAnswerStatus === 'wrong' && (
                        <XCircle className="w-5 h-5 text-white shrink-0" />
                      )}
                      {isAnswerChecked && isCorrectAnswer && speedAnswerStatus === 'wrong' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Finished Screen
            <div className="text-center py-8 sm:py-12 space-y-6 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Waktu Habis!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#114040] font-montserrat mt-1">
                  Skor Akhir: {speedScore} Poin
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Luar biasa! Kecepatan membaca dan memahami kosakata Arabmu terus meningkat.
                </p>
              </div>

              <button
                onClick={startSpeedQuiz}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#EC853E] hover:bg-[#d9732d] text-white shadow-md transition-all active:scale-95 flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Coba Lagi & Pecahkan Rekor</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
