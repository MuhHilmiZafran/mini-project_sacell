import './App.css';
import LoginPage from './pages/User/login';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/User/signup';
import { AuthContextProvider } from './context/auth';
import ProtectedRoute from './components/layout/protected-route';
import LandingPage from './pages/User/landing-page';
import NavBar from './components/navbar/navbar';
import Profile from './pages/User/profile';

function App() {
  return (
    <div className="container-fluid">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
