import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/auth-context';

const SideBarAdmin = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 h-100 bg-dark fixed-top">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/admin" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white">
              <span className="fs-5 d-none d-sm-inline">Admin</span>
            </a>
            <ul className="nav nav-underlined flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
              <li className="nav-item">
                <NavLink to={'/admin'} className="nav-link align-middle px-0">
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/admin/transactions'} className="nav-link align-middle px-0">
                  <span className="ms-1 d-none d-sm-inline">Transaction</span>
                </NavLink>
              </li>
            </ul>

            <hr />
            <div className="dropdown pb-4 text-bottom">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {user && (
                  <a className="nav-link " href="#" role="button">
                    {user.email}
                  </a>
                )}
                <span className="d-none d-sm-inline mx-1">{}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
