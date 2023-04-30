import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await signIn(email, password);
      navigate('/');
    } catch (e) {
      setErrorMessage(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Login Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group my-2">
                  <label htmlFor="text">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary btn-block my-2">
                  Submit
                </button>
              </form>
              <button className="btn btn-secondary my-2" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
