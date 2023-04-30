import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserAuth } from '../../context/auth';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user } = UserAuth();
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

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
      {dataUser && <p>{dataUser.username}</p>}
      {dataUser && <p>{dataUser.firstname}</p>}
      {dataUser && <p>{dataUser.lastname}</p>}
      {dataUser && <p>{dataUser.username}</p>}
      <p></p>
    </div>
  );
};

export default Profile;
