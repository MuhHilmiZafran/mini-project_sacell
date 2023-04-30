import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/auth';

const NavBar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

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
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="#">
              Surya Abadi Cell
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end align-item-center" id="navbarNav">
              <div className="navbar-nav">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/">
                  Product
                </Link>
                <Link className="nav-link" to="/">
                  About Us
                </Link>
                <Link className="nav-link" to="/">
                  Terms of Service
                </Link>

                {user && (
                  <Link className="nav-link" to="/profile">
                    {user.email}
                  </Link>
                )}

                {user && <button onClick={handleLogout}>Sign Out</button>}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default NavBar;
