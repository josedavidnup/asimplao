import React from 'react';
import RetailerNav from '../../components/nav/RetailerNav';

export const RetailerAccount = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <RetailerNav />
        </div>
        <div className='col'>Retailer Account page</div>
      </div>
    </div>
  );
};

export default RetailerAccount;
