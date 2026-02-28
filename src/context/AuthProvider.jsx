import React, { createContext, useState, useEffect } from 'react';
import { initializeFirestore } from '../utils/LocalStorage';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    // 1. One-time check and DB creation if it doesn't exist
    initializeFirestore();

    // 2. Setup real-time listener to Firestore `employees` collection
    const q = query(collection(db, "employees"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEmployees = [];
      snapshot.forEach((doc) => {
        liveEmployees.push({ id: doc.id, ...doc.data() });
      });
      setUserData(liveEmployees);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={[UserData, setUserData]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
