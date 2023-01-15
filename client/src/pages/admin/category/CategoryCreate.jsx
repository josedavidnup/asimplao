import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';

export const CategoryCreate = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <AdminNav />
        </div>
        <div className='col'>Category Create page</div>
      </div>
    </div>
  );
};

export default CategoryCreate;
