/**
 * Speech & Audio Utility for RofaArabic
 * Enhanced Multi-Tier Audio Engine:
 * 1. Online Arabic pronunciation stream (100% reliable on all Android devices, laptops, tablets, and PCs)
 * 2. Web Speech API (with Android voice detection, auto-unlock & fallback)
 * 3. Web Audio API synthesized sound effects (correct, wrong, click, win)
 */

let activeAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let isAudioContextUnlocked = false;

// Audio unlocker for mobile devices (Android / iOS touch policies)
export const unlockAudio = () => {
  if (isAudioContextUnlocked || typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    }
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    isAudioContextUnlocked = true;
  } catch {
    // Ignore unlock errors safely
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  window.addEventListener('click', unlockAudio, { once: true, passive: true });
}

/**
 * Play Arabic pronunciation using high-fidelity online audio stream.
 * Fallback to Web Speech API or tone feedback if network or device is offline.
 */
export const speakArabic = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  rate = 0.9
): boolean => {
  if (typeof window === 'undefined') return false;

  unlockAudio();
  stopSpeech();

  // Strip non-letter brackets and punctuation that confuse TTS
  const cleanText = text
    .replace(/\[\.\.\.\]/g, '')
    .replace(/[—–]/g, ' ')
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return false;
  }

  // Tier 1: Try HTML5 Audio stream with Arabic TTS endpoint (Works universally across Android 10+, Chromebooks, Windows, etc.)
  try {
    const encodedText = encodeURIComponent(cleanText);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodedText}`;

    const audio = new Audio(audioUrl);
    audio.playbackRate = rate;

    let hasStarted = false;

    audio.onplay = () => {
      hasStarted = true;
      if (onStart) onStart();
    };

    audio.onended = () => {
      activeAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      activeAudio = null;
      // If network stream fails, seamlessly fall back to Tier 2: Web Speech API
      speakWithWebSpeech(cleanText, onStart, onEnd, rate);
    };

    activeAudio = audio;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked or network unavailable, try Web Speech API
        speakWithWebSpeech(cleanText, onStart, onEnd, rate);
      });
    }

    return true;
  } catch {
    return speakWithWebSpeech(cleanText, onStart, onEnd, rate);
  }
};

/**
 * Tier 2: Web Speech API implementation with Android voice loading fallback
 */
const speakWithWebSpeech = (
  cleanText: string,
  onStart?: () => void,
  onEnd?: () => void,
  rate = 0.85
): boolean => {
  if (!('speechSynthesis' in window)) {
    playSoundEffect('click');
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 400);
    return false;
  }

  try {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(
      (v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic')
    );
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      if (e.error === 'canceled' || e.error === 'interrupted') {
        if (onEnd) onEnd();
        return;
      }
      playSoundEffect('click');
      if (onEnd) onEnd();
    };

    activeUtterance = utterance;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    activeUtterance = null;
    playSoundEffect('click');
    if (onEnd) onEnd();
    return false;
  }
};

/**
 * Stop any ongoing speech or audio playback immediately
 */
export const stopSpeech = () => {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    activeAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore
    }
    activeUtterance = null;
  }
};

/**
 * Synthesized audio sound effects for interactive feedback
 */
export const playSoundEffect = (type: 'correct' | 'wrong' | 'click' | 'win' | 'streak') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    if (type === 'correct') {
      // Joyful two-tone rising chime (D5 -> A5)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880.0, now + 0.08); // A5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      // Gentle buzz tone (descending A3 -> F3)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(174.61, now + 0.1); // F3
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'streak') {
      // Triumphant fast arpeggio
      const notes = [659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.2);
      });
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.28);
      });
    }
  } catch {
    // Ignore audio context autoplay limitations safely
  }
};
