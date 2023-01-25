import React from 'react';
import CustomerNav from '../../components/nav/CustomerNav';

const Wishlist = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <CustomerNav />
        </div>
        <div className='col'>Customer wishlist page</div>
      </div>
    </div>
  );
};

export default Wishlist;
