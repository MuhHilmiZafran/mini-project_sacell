import React, { useContext } from 'react';
import { CategoryContext } from '../../context/category-context';
import { Outlet } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

const SideBarCategory = () => {
  const { categories } = useContext(CategoryContext);
  return (
    <div className="sidebar-product">
      <div className="container">
        <div className="row d-flex flex-row">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 rounded">
            <div className="left rounded">
              <div className="d-flex flex-column text-left align-items-start align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to={'/products'} className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <h5>All Category</h5>
                </Link>
                <ul className="nav nav-underline flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <li className="nav-item">
                        <NavLink to={`/products/${category.id}`} className="nav-link px-0" aria-current="page">
                          <h6 className="py-0">{category.categoryName}</h6>
                        </NavLink>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarCategory;
