import React from 'react';
import UserNav from '../../components/nav/UserNav';

const Account = () => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-md-2 border-right'>
        <UserNav />
      </div>
      <div className='col'>User Account page</div>
    </div>
  </div>
);

export default Account;
