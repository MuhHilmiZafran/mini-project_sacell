import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const SignUpPage = () => {
  const [dataUser, setDataUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
    address: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleInputChange = (event) => {
    setDataUser({
      ...dataUser,
      [event.target.id]: event.target.value,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const res = await createUser(dataUser.email, dataUser.password);
      await setDoc(doc(db, 'users', res.user.uid), {
        ...dataUser,
        createdAt: serverTimestamp(),
      });
      //navigate('/');
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
              <h4 className="text-center">Sign Up Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSignUp}>
                <div className="form-group my-2">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" className="form-control" id="firstname" placeholder="First Name" value={dataUser.firstname} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={dataUser.lastname} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="text">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="email" value={dataUser.email} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" value={dataUser.password} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Username" value={dataUser.username} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="address">Address</label>
                  <textarea className="form-control" id="address" placeholder="Address" value={dataUser.address} onChange={handleInputChange} />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" className="form-control" id="phone" placeholder="08xxxxxxxxxx" value={dataUser.phone} onChange={handleInputChange} />
                </div>

                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary btn-block my-2 ">
                  Submit
                </button>
              </form>
              <p>Do you have an account?</p>
              <NavLink className="sign-in" to={'/login'}>
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
