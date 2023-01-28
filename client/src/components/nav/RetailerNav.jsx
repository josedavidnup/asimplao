import React from 'react';
import { Link } from 'react-router-dom';

const RetailerNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/retailer/account' className='nav-link'>
            Account
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/product' className='nav-link'>
            Product
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/products' className='nav-link'>
            Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/category' className='nav-link'>
            Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/subcategory' className='nav-link'>
            Sub Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/coupon' className='nav-link'>
            Coupon
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/retailer/password' className='nav-link'>
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default RetailerNav;
