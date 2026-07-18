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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user document from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          
          // If institute is still pending, don't log them in fully in context
          if (userData.role === 'institute' && userData.status === 'pending_verification') {
            await auth.signOut();
            setUser(null);
          } else {
            setUser(userData);
          }
        } else {
          // If no doc exists, they might be in the middle of signing up.
          // signInWithOAuth will create the document and call setUser.
          // For now, we do nothing and wait for signInWithOAuth to complete.
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
      
      setUser(existingData);
    } else {
      // User does not exist, creating new user
      if (role === 'admin' && firebaseUser.email !== 'raviranjan8904@gmail.com') {
        await auth.signOut();
        throw new Error('access_denied'); // Admin accounts are invite-only
      }

      // Hardcode super admin override
      const finalRole = firebaseUser.email === 'raviranjan8904@gmail.com' ? 'admin' : role;

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

      if (role === 'institute') {
        await auth.signOut();
        throw new Error('pending_verification');
      }

      setUser(newUser);
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
