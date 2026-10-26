/**
 * Progress Tracking Utility for RofaArabic
 * Saves completed themes, sub-modules, and quiz scores in browser localStorage.
 */

import { ThemeId } from '../types';

export interface UserProgress {
  // Theme sub-modules: key format "${themeId}_${moduleType}"
  completedModules: Record<string, boolean>;
  // Themes explicitly marked as fully completed
  completedThemes: Record<string, boolean>;
  // Quiz scores per level
  quizScores: {
    mudah?: number;
    sedang?: number;
    sulit?: number;
  };
  // Last visited theme
  lastVisitedTheme?: ThemeId;
  // Total study time or points
  points: number;
}

const STORAGE_KEY = 'rofaarabic_student_progress_v1';

const defaultProgress: UserProgress = {
  completedModules: {},
  completedThemes: {},
  quizScores: {},
  lastVisitedTheme: 'keluarga',
  points: 0,
};

export const getStoredProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      completedModules: parsed.completedModules || {},
      completedThemes: parsed.completedThemes || {},
      quizScores: parsed.quizScores || {},
    };
  } catch (err) {
    console.warn('Failed to read progress from localStorage:', err);
    return defaultProgress;
  }
};

export const saveStoredProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Dispatch custom event so all active components update immediately
    window.dispatchEvent(new Event('rofaarabic_progress_updated'));
  } catch (err) {
    console.warn('Failed to save progress to localStorage:', err);
  }
};

export const toggleModuleCompletion = (
  themeId: ThemeId,
  moduleType: 'mufrodat' | 'istima' | 'qiraah' | 'qowaid'
): boolean => {
  const current = getStoredProgress();
  const key = `${themeId}_${moduleType}`;
  const isNowCompleted = !current.completedModules[key];

  const updatedModules = {
    ...current.completedModules,
    [key]: isNowCompleted,
  };

  // Check if all 4 modules of this theme are completed
  const allFour = ['mufrodat', 'istima', 'qiraah', 'qowaid'].every(
    (m) => updatedModules[`${themeId}_${m}`]
  );

  const updatedThemes = {
    ...current.completedThemes,
    [themeId]: allFour,
  };

  const pointsDelta = isNowCompleted ? 15 : -15;
  const updatedPoints = Math.max(0, (current.points || 0) + pointsDelta);

  saveStoredProgress({
    ...current,
    completedModules: updatedModules,
    completedThemes: updatedThemes,
    points: updatedPoints,
  });

  return isNowCompleted;
};

export const markModuleCompleted = (
  themeId: ThemeId,
  moduleType: 'mufrodat' | 'istima' | 'qiraah' | 'qowaid'
): void => {
  const current = getStoredProgress();
  const key = `${themeId}_${moduleType}`;
  if (current.completedModules[key]) return; // already done

  const updatedModules = {
    ...current.completedModules,
    [key]: true,
  };

  const allFour = ['mufrodat', 'istima', 'qiraah', 'qowaid'].every(
    (m) => updatedModules[`${themeId}_${m}`]
  );

  saveStoredProgress({
    ...current,
    completedModules: updatedModules,
    completedThemes: {
      ...current.completedThemes,
      [themeId]: allFour,
    },
    points: (current.points || 0) + 15,
  });
};

export const toggleThemeCompletion = (themeId: ThemeId): boolean => {
  const current = getStoredProgress();
  const isNowCompleted = !current.completedThemes[themeId];

  // Also toggle all 4 submodules to match
  const updatedModules = { ...current.completedModules };
  ['mufrodat', 'istima', 'qiraah', 'qowaid'].forEach((m) => {
    updatedModules[`${themeId}_${m}`] = isNowCompleted;
  });

  const updatedThemes = {
    ...current.completedThemes,
    [themeId]: isNowCompleted,
  };

  saveStoredProgress({
    ...current,
    completedModules: updatedModules,
    completedThemes: updatedThemes,
  });

  return isNowCompleted;
};

export const recordQuizScore = (
  level: 'mudah' | 'sedang' | 'sulit',
  score: number
): void => {
  const current = getStoredProgress();
  const currentHighest = current.quizScores[level] || 0;
  const newHighest = Math.max(currentHighest, score);

  saveStoredProgress({
    ...current,
    quizScores: {
      ...current.quizScores,
      [level]: newHighest,
    },
    points: (current.points || 0) + (score >= 60 ? 25 : 10),
  });
};

export const resetAllProgress = (): void => {
  saveStoredProgress({
    completedModules: {},
    completedThemes: {},
    quizScores: {},
    lastVisitedTheme: 'keluarga',
    points: 0,
  });
};

export const calculateOverallProgress = (
  allThemeIds: ThemeId[]
): {
  completedModulesCount: number;
  totalModulesCount: number;
  percentage: number;
  completedThemesCount: number;
  totalThemesCount: number;
} => {
  const current = getStoredProgress();
  const totalThemesCount = allThemeIds.length;
  const totalModulesCount = totalThemesCount * 4; // 4 modules per theme

  let completedModulesCount = 0;
  let completedThemesCount = 0;

  allThemeIds.forEach((tId) => {
    if (current.completedThemes[tId]) {
      completedThemesCount++;
    }
    ['mufrodat', 'istima', 'qiraah', 'qowaid'].forEach((m) => {
      if (current.completedModules[`${tId}_${m}`]) {
        completedModulesCount++;
      }
    });
  });

  const percentage =
    totalModulesCount > 0
      ? Math.round((completedModulesCount / totalModulesCount) * 100)
      : 0;

  return {
    completedModulesCount,
    totalModulesCount,
    percentage,
    completedThemesCount,
    totalThemesCount,
  };
};
