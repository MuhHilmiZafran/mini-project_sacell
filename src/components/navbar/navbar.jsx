import { Outlet, useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/auth-context';
import { useContext } from 'react';
import Footer from '../footer/footer';

const NavBar = () => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="navigation-bar fixed-top">
        <nav className="navbar navbar-expand-lg shadow">
          <div className="container">
            <a className="navbar-brand fw-bold" to="/">
              SA <br />
              CELL
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <NavLink className="nav-link active" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/products">
                  Product
                </NavLink>

                <NavLink className="nav-link" to="/history">
                  History
                </NavLink>
              </div>

              <div className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  {user && (
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {user.email}
                    </a>
                  )}

                  <ul className="dropdown-menu px-2 w-100">
                    <li>
                      {user && (
                        <Link className="dropdown-item py-2" to="/profile">
                          Profile
                        </Link>
                      )}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="btn btn-danger w-100" onClick={handleLogout}>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
                {!user && (
                  <button className="btn btn-outline-light w-100" onClick={handleLogin}>
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default NavBar;
