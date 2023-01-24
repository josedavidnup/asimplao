import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/user/account' className='nav-link'>
            Account
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/history' className='nav-link'>
            History
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/password' className='nav-link'>
            Password
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/wishlist' className='nav-link'>
            Whislist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
