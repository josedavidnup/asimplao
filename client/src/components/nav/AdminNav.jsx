import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/account' className='nav-link'>
            Account
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/product' className='nav-link'>
            Product
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/products' className='nav-link'>
            Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/category' className='nav-link'>
            Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/subcategory' className='nav-link'>
            Sub Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/coupon' className='nav-link'>
            Coupon
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/password' className='nav-link'>
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
