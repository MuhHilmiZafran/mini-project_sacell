import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/auth-context';
import { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const [dataUser, setDataUser] = useState(null); // Initialize dataUser as null

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setDataUser(docSnap.data());
        }
      }
    };

    getUser();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  } else if (dataUser?.role === 'admin' || dataUser?.role === 'user') {
    return children;
  }
};

export default ProtectedRoute;
