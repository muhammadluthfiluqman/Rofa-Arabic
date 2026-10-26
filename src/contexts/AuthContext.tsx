import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase';
import { UserProfile, UserProgress, ThemeId } from '../types';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';
import { hashPassword } from '../utils/crypto';

const LOCAL_STORAGE_PROGRESS_KEY = 'rofaarabic_user_progress_v2';
const LOCAL_STORAGE_PROFILE_KEY = 'rofaarabic_cached_profile_v2';

const DEFAULT_EMPTY_PROGRESS: UserProgress = {
  userId: 'guest',
  completedThemes: [],
  completedMufrodat: [],
  completedIstima: [],
  completedQiraah: [],
  completedQowaid: [],
  quizEasyScore: 0,
  quizMediumScore: 0,
  quizHardScore: 0,
  gameHighScore: 0,
  totalXp: 0,
  studyStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString(),
};

export type AuthModalMode = 'login' | 'register' | 'setup_profile' | 'forgot_password';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  progress: UserProgress;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  isProgressModalOpen: boolean;
  pendingGoogleUser: User | null;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  openProgressModal: () => void;
  closeProgressModal: () => void;
  signInWithGoogle: () => Promise<void>;
  completeProfileRegistration: (username: string, password: string) => Promise<void>;
  verifyAndResetPasswordWithGoogle: (newPassword: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  markMufrodatLearned: (wordId: string, themeId: ThemeId) => Promise<void>;
  markIstimaCompleted: (storyId: string) => Promise<void>;
  markQiraahCompleted: (itemId: string) => Promise<void>;
  markQowaidCompleted: (topicId: string) => Promise<void>;
  recordQuizScore: (level: 'mudah' | 'sedang' | 'sulit', score: number, total: number) => Promise<void>;
  recordGameScore: (score: number) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
      return saved ? { ...DEFAULT_EMPTY_PROGRESS, ...JSON.parse(saved) } : DEFAULT_EMPTY_PROGRESS;
    } catch {
      return DEFAULT_EMPTY_PROGRESS;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState<boolean>(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState<User | null>(null);

  // Sync progress state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }, [progress]);

  // Load user profile & cloud progress on Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocPath = `users/${currentUser.uid}`;
          let userSnap;
          try {
            userSnap = await getDoc(doc(db, 'users', currentUser.uid));
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, userDocPath);
          }

          if (userSnap && userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setProfile(data);
            localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(data));

            // Load progress from subcollection /users/{uid}/progress/data
            const progressDocPath = `users/${currentUser.uid}/progress/data`;
            let progressSnap;
            try {
              progressSnap = await getDoc(doc(db, 'users', currentUser.uid, 'progress', 'data'));
            } catch (err) {
              handleFirestoreError(err, OperationType.GET, progressDocPath);
            }

            if (progressSnap && progressSnap.exists()) {
              const cloudProgress = progressSnap.data() as UserProgress;
              // Merge local guest progress with cloud progress to preserve guest achievements
              const mergedProgress: UserProgress = {
                userId: currentUser.uid,
                completedThemes: Array.from(
                  new Set([...(cloudProgress.completedThemes || []), ...(progress.completedThemes || [])])
                ),
                completedMufrodat: Array.from(
                  new Set([...(cloudProgress.completedMufrodat || []), ...(progress.completedMufrodat || [])])
                ),
                completedIstima: Array.from(
                  new Set([...(cloudProgress.completedIstima || []), ...(progress.completedIstima || [])])
                ),
                completedQiraah: Array.from(
                  new Set([...(cloudProgress.completedQiraah || []), ...(progress.completedQiraah || [])])
                ),
                completedQowaid: Array.from(
                  new Set([...(cloudProgress.completedQowaid || []), ...(progress.completedQowaid || [])])
                ),
                quizEasyScore: Math.max(cloudProgress.quizEasyScore || 0, progress.quizEasyScore || 0),
                quizMediumScore: Math.max(cloudProgress.quizMediumScore || 0, progress.quizMediumScore || 0),
                quizHardScore: Math.max(cloudProgress.quizHardScore || 0, progress.quizHardScore || 0),
                gameHighScore: Math.max(cloudProgress.gameHighScore || 0, progress.gameHighScore || 0),
                totalXp: Math.max(cloudProgress.totalXp || 0, progress.totalXp || 0),
                studyStreakDays: Math.max(cloudProgress.studyStreakDays || 1, progress.studyStreakDays || 1),
                lastActiveDate: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString(),
              };

              setProgress(mergedProgress);
              localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(mergedProgress));

              // Sync back merged progress to Firestore
              try {
                await setDoc(doc(db, 'users', currentUser.uid, 'progress', 'data'), mergedProgress, {
                  merge: true,
                });
              } catch (err) {
                handleFirestoreError(err, OperationType.WRITE, progressDocPath);
              }
            } else {
              // Create initial cloud progress document
              const initialProgress: UserProgress = {
                ...progress,
                userId: currentUser.uid,
                updatedAt: new Date().toISOString(),
              };
              try {
                await setDoc(doc(db, 'users', currentUser.uid, 'progress', 'data'), initialProgress);
                setProgress(initialProgress);
              } catch (err) {
                handleFirestoreError(err, OperationType.CREATE, progressDocPath);
              }
            }
          } else {
            // New Google user needs to set up their username and password
            setPendingGoogleUser(currentUser);
            setAuthModalMode('setup_profile');
            setIsAuthModalOpen(true);
          }
        } catch (error) {
          console.error('Error fetching user profile/progress:', error);
        }
      } else {
        setProfile(null);
        setPendingGoogleUser(null);
        localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openProgressModal = () => {
    setIsProgressModalOpen(true);
  };

  const closeProgressModal = () => {
    setIsProgressModalOpen(false);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const userDocPath = `users/${googleUser.uid}`;
      let snap;
      try {
        snap = await getDoc(doc(db, 'users', googleUser.uid));
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, userDocPath);
      }

      if (!snap || !snap.exists()) {
        // Needs username & password setup
        setPendingGoogleUser(googleUser);
        setAuthModalMode('setup_profile');
        setIsAuthModalOpen(true);
      } else {
        const userProfile = snap.data() as UserProfile;
        setProfile(userProfile);
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(userProfile));
        setIsAuthModalOpen(false);
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };

  const completeProfileRegistration = async (username: string, password: string) => {
    const targetUser = pendingGoogleUser || user;
    if (!targetUser) {
      throw new Error('Tidak ada akun Google yang terhubung.');
    }

    const trimmedUsername = username.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmedUsername)) {
      throw new Error('Username hanya boleh huruf, angka, dan underscore (3-30 karakter).');
    }

    if (password.length < 6) {
      throw new Error('Kata sandi minimal 6 karakter.');
    }

    const hashedPassword = await hashPassword(password);
    const now = new Date().toISOString();

    const newProfile: UserProfile = {
      uid: targetUser.uid,
      email: targetUser.email || '',
      displayName: targetUser.displayName || trimmedUsername,
      photoURL: targetUser.photoURL || '',
      username: trimmedUsername,
      passwordHash: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };

    const userDocPath = `users/${targetUser.uid}`;
    try {
      await setDoc(doc(db, 'users', targetUser.uid), newProfile);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, userDocPath);
    }

    // Initialize progress document
    const userProgressDocPath = `users/${targetUser.uid}/progress/data`;
    const initialProgress: UserProgress = {
      ...progress,
      userId: targetUser.uid,
      updatedAt: now,
    };

    try {
      await setDoc(doc(db, 'users', targetUser.uid, 'progress', 'data'), initialProgress);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, userProgressDocPath);
    }

    setProfile(newProfile);
    setProgress(initialProgress);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(newProfile));
    setPendingGoogleUser(null);
    setIsAuthModalOpen(false);
  };

  const verifyAndResetPasswordWithGoogle = async (
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    if (newPassword.length < 6) {
      return { success: false, message: 'Kata sandi baru minimal 6 karakter.' };
    }

    try {
      // Re-authenticate / sign in with Google to verify identity
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const userDocPath = `users/${googleUser.uid}`;
      let snap;
      try {
        snap = await getDoc(doc(db, 'users', googleUser.uid));
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, userDocPath);
      }

      if (!snap || !snap.exists()) {
        return {
          success: false,
          message: 'Akun Google ini belum terdaftar di RofaArabic. Silakan lakukan pendaftaran terlebih dahulu.',
        };
      }

      const hashedPassword = await hashPassword(newPassword);
      const now = new Date().toISOString();

      try {
        await updateDoc(doc(db, 'users', googleUser.uid), {
          passwordHash: hashedPassword,
          updatedAt: now,
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, userDocPath);
      }

      const updated = { ...(snap.data() as UserProfile), passwordHash: hashedPassword, updatedAt: now };
      setProfile(updated);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(updated));
      setIsAuthModalOpen(false);

      return {
        success: true,
        message: 'Kata sandi akun RofaArabic berhasil diperbarui menggunakan verifikasi akun Google Anda!',
      };
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, message: 'Verifikasi Google dibatalkan.' };
      }
      return { success: false, message: error.message || 'Terjadi kesalahan saat verifikasi Google.' };
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    if (!user) throw new Error('Harus masuk terlebih dahulu.');
    if (newPassword.length < 6) throw new Error('Kata sandi minimal 6 karakter.');

    const hashedPassword = await hashPassword(newPassword);
    const now = new Date().toISOString();
    const userDocPath = `users/${user.uid}`;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        passwordHash: hashedPassword,
        updatedAt: now,
      });
      if (profile) {
        const updated = { ...profile, passwordHash: hashedPassword, updatedAt: now };
        setProfile(updated);
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, userDocPath);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setProfile(null);
      setPendingGoogleUser(null);
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      // Reset to default empty progress or keep local
      setProgress(DEFAULT_EMPTY_PROGRESS);
      localStorage.removeItem(LOCAL_STORAGE_PROGRESS_KEY);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  // Helper to persist updated progress locally and to Firestore
  const saveProgressUpdates = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(newProgress));

    if (user) {
      const progressDocPath = `users/${user.uid}/progress/data`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'progress', 'data'), newProgress, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, progressDocPath);
      }
    }
  };

  const markMufrodatLearned = async (wordId: string, themeId: ThemeId) => {
    const completedMufrodat = Array.from(new Set([...progress.completedMufrodat, wordId]));
    const isNew = !progress.completedMufrodat.includes(wordId);
    const totalXp = progress.totalXp + (isNew ? 10 : 0);

    const newProgress: UserProgress = {
      ...progress,
      completedMufrodat,
      totalXp,
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(newProgress);
  };

  const markIstimaCompleted = async (storyId: string) => {
    const completedIstima = Array.from(new Set([...progress.completedIstima, storyId]));
    const isNew = !progress.completedIstima.includes(storyId);
    const totalXp = progress.totalXp + (isNew ? 40 : 0);

    const newProgress: UserProgress = {
      ...progress,
      completedIstima,
      totalXp,
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(newProgress);
  };

  const markQiraahCompleted = async (itemId: string) => {
    const completedQiraah = Array.from(new Set([...progress.completedQiraah, itemId]));
    const isNew = !progress.completedQiraah.includes(itemId);
    const totalXp = progress.totalXp + (isNew ? 40 : 0);

    const newProgress: UserProgress = {
      ...progress,
      completedQiraah,
      totalXp,
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(newProgress);
  };

  const markQowaidCompleted = async (topicId: string) => {
    const completedQowaid = Array.from(new Set([...progress.completedQowaid, topicId]));
    const isNew = !progress.completedQowaid.includes(topicId);
    const totalXp = progress.totalXp + (isNew ? 50 : 0);

    const newProgress: UserProgress = {
      ...progress,
      completedQowaid,
      totalXp,
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(newProgress);
  };

  const recordQuizScore = async (
    level: 'mudah' | 'sedang' | 'sulit',
    score: number,
    total: number
  ) => {
    const earnedXp = score * 15;
    const updates: Partial<UserProgress> = {
      totalXp: progress.totalXp + earnedXp,
      updatedAt: new Date().toISOString(),
    };

    if (level === 'mudah') {
      updates.quizEasyScore = Math.max(progress.quizEasyScore, score);
    } else if (level === 'sedang') {
      updates.quizMediumScore = Math.max(progress.quizMediumScore, score);
    } else if (level === 'sulit') {
      updates.quizHardScore = Math.max(progress.quizHardScore, score);
    }

    const newProgress: UserProgress = {
      ...progress,
      ...updates,
    };
    await saveProgressUpdates(newProgress);
  };

  const recordGameScore = async (score: number) => {
    const earnedXp = Math.floor(score / 5);
    const newProgress: UserProgress = {
      ...progress,
      gameHighScore: Math.max(progress.gameHighScore, score),
      totalXp: progress.totalXp + earnedXp,
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(newProgress);
  };

  const resetProgress = async () => {
    const empty: UserProgress = {
      ...DEFAULT_EMPTY_PROGRESS,
      userId: user ? user.uid : 'guest',
      updatedAt: new Date().toISOString(),
    };
    await saveProgressUpdates(empty);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        progress,
        loading,
        isAuthModalOpen,
        authModalMode,
        isProgressModalOpen,
        pendingGoogleUser,
        openAuthModal,
        closeAuthModal,
        openProgressModal,
        closeProgressModal,
        signInWithGoogle,
        completeProfileRegistration,
        verifyAndResetPasswordWithGoogle,
        signOut,
        updateUserPassword,
        markMufrodatLearned,
        markIstimaCompleted,
        markQiraahCompleted,
        markQowaidCompleted,
        recordQuizScore,
        recordGameScore,
        resetProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
