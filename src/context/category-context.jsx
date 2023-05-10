import { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRef = collection(db, 'categories');
      const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
        const categoryList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      });
      return () => unsubscribe();
    };

    getCategories();
  }, []);

  const addCategory = async (category) => {
    const res = await addDoc(collection(db, 'categories'), {
      ...category,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newCategory = {
      id: res.id,
      ...category,
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = async (categoryId, updateDataCategory) => {
    const categoriesRef = doc(db, 'categories', categoryId);
    await updateDoc(categoriesRef, updateDataCategory);
  };

  const deleteCategory = async (categoryId) => {
    await deleteDoc(doc(db, 'categories', categoryId));
  };

  return <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, updateCategory }}>{children}</CategoryContext.Provider>;
};
