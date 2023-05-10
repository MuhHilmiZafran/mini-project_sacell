import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/auth-context';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, signIn } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await signIn(email, password);
      if (email == 'admin@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mb-3 shadow">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes" className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5 text-center">
              <h2 className="fw-bold mb-5">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <small>
                      Do not have any account?
                      <span>
                        <Link to={'/signup'}>Sign Up</Link>
                      </span>
                    </small>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
