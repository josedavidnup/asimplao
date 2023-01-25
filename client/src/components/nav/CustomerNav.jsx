import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/customer/account' className='nav-link'>
            Account
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/customer/history' className='nav-link'>
            History
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/customer/password' className='nav-link'>
            Password
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/customer/wishlist' className='nav-link'>
            Whislist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default CustomerNav;
