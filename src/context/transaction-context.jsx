import { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const trasactionRef = collection(db, 'transactions');
      const unsubscribe = onSnapshot(trasactionRef, (snapshot) => {
        const transactionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionList);
      });
      return () => unsubscribe();
    };

    getTransactions();
  }, []);

  const addTransaction = async (transactionId, transaction) => {
    await setDoc(doc(db, 'transactions', transactionId), {
      ...transaction,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newTransaction = {
      id: transactionId,
      ...transaction,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = async (transactionId, updateDataTransaction) => {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, updateDataTransaction);
  };

  return <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction }}>{children}</TransactionContext.Provider>;
};
