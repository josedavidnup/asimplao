import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

export const AdminAccount = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <AdminNav />
        </div>
        <div className='col'>Admin Account page</div>
      </div>
    </div>
  );
};

export default AdminAccount;
