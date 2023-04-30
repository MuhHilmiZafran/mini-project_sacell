import { useEffect } from 'react';
import { UserAuth } from '../../context/auth';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log(user);
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user && user.email}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default LandingPage;
