import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addUser = async (user) => {
    const { password, ...userWithoutPassword } = user;
    const res = await createUser(user.email, user.password);

    delete userWithoutPassword.password;

    await setDoc(doc(db, 'users', res.user.uid), {
      ...userWithoutPassword,
      createdAt: serverTimestamp(),
    });
  };

  return <UserContext.Provider value={{ createUser, user, logout, signIn, addUser }}>{children}</UserContext.Provider>;
};
