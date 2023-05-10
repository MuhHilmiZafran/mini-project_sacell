import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/auth-context';

const SignUpPage = () => {
  const { addUser } = useContext(UserContext);
  const [dataUser, setDataUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setDataUser({
      ...dataUser,
      [id]: value,
      role: 'user',
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (dataUser) {
      addUser(dataUser);
      navigate('/login');
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card cascading-right">
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={handleSignUp}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline mb-3">
                      <input type="text" className="form-control" id="firstName" placeholder="First Name" value={dataUser.firstName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline mb-3">
                      <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={dataUser.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-3">
                  <input type="text" className="form-control" id="username" placeholder="Username" value={dataUser.username} onChange={handleInputChange} required />
                </div>

                <div className="form-outline mb-3">
                  <input type="email" className="form-control" id="email" placeholder="Email" value={dataUser.email} onChange={handleInputChange} required />
                </div>

                <div className="form-outline mb-3">
                  <input type="password" className="form-control" id="password" placeholder="Password" value={dataUser.password} onChange={handleInputChange} required />
                </div>

                <div className="form-outline mb-3">
                  <textarea className="form-control" id="address" placeholder="Address" value={dataUser.address} onChange={handleInputChange} required />
                </div>

                <div className="form-outline mb-3">
                  <input type="text" className="form-control" id="phone" placeholder="08xxxxxxxxxx" value={dataUser.phone} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="btn btn-primary btn-block my-2 w-100">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="col mb-5 d-flex flex-column justify-content-center align-items-center">
              <p>Do you have an account?</p>
              <Link className="sign-in" to={'/login'}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-5 mb-lg-0">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
