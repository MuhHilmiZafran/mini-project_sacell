import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserContext } from '../../context/auth-context';
import { useContext, useEffect, useState } from 'react';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setDataUser(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    getUser();
  }, [user.uid]);

  return (
    <div className="container">
      <h2>Profile</h2>
      {dataUser && <p>{dataUser.username}</p>}
      {dataUser && <p>{dataUser.firstname}</p>}
      {dataUser && <p>{dataUser.lastname}</p>}
      {dataUser && <p>{dataUser.address}</p>}
      {dataUser && <p>{dataUser.email}</p>}
      {dataUser && <p>{dataUser.lastname}</p>}
    </div>
  );
};

export default Profile;
