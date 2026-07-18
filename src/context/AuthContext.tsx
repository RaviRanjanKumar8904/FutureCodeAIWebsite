import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider, githubProvider } from '../firebase/config';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'student' | 'admin' | 'institute';
  status?: 'active' | 'pending_verification';
  phone?: string;
  school?: string;
  city?: string;
  degree?: string;
  yearOfStudy?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  nameChanged?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithOAuth: (role: 'student' | 'admin' | 'institute', providerId: 'google' | 'github') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // Clean up any previous Firestore snapshot listener
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);

        // Use onSnapshot for live role updates (promotions/demotions)
        unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data() as User;

            // If institute is still pending, don't log them in fully
            if (userData.role === 'institute' && userData.status === 'pending_verification') {
              auth.signOut();
              setUser(null);
            } else {
              setUser(userData);
            }
          } else {
            // No user doc yet — they're mid-signup; signInWithOAuth will create it
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  const signInWithOAuth = async (role: 'student' | 'admin' | 'institute', providerId: 'google' | 'github') => {
    const provider = providerId === 'google' ? googleProvider : githubProvider;
    
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const existingData = userSnap.data() as User;
      
      // Enforce pending verification
      if (existingData.role === 'institute' && existingData.status === 'pending_verification') {
        await auth.signOut();
        throw new Error('pending_verification');
      }
      
      // onSnapshot will pick up the existing data and call setUser
    } else {
      // --- New user creation ---
      // Check if they've been pre-allow-listed as an admin
      const adminSnap = await getDoc(doc(db, 'admins', firebaseUser.uid));
      const isPreApprovedAdmin = adminSnap.exists() && adminSnap.data()?.pendingRole === 'admin';

      // Hardcode super admin override
      const isSuperAdmin = firebaseUser.email === 'raviranjan8904@gmail.com';

      let finalRole: 'student' | 'admin' | 'institute';

      if (isSuperAdmin || isPreApprovedAdmin) {
        finalRole = 'admin';
      } else if (role === 'admin') {
        // Non-pre-approved user trying to sign up as admin
        await auth.signOut();
        throw new Error('access_denied');
      } else {
        finalRole = role;
      }

      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'New User',
        photoURL: firebaseUser.photoURL || '',
        role: finalRole,
        status: finalRole === 'institute' ? 'pending_verification' : 'active',
      };

      await setDoc(userRef, {
        ...newUser,
        createdAt: serverTimestamp()
      });

      // If they were pre-approved, clear the pendingRole flag from the admins doc
      if (isPreApprovedAdmin) {
        await updateDoc(doc(db, 'admins', firebaseUser.uid), { pendingRole: null });
      }

      if (finalRole === 'institute') {
        await auth.signOut();
        throw new Error('pending_verification');
      }

      // onSnapshot will pick up the newly created doc and call setUser
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await updateDoc(doc(db, 'users', user.uid), data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithOAuth, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
