import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../functions/auth';
import AdminAccount from '../../pages/admin/AdminAccount';
import CategoryCreate from '../../pages/admin/category/CategoryCreate';
import LoadingToRedirect from './LoadingToRedirect';
import Loader from '../loader/Loader';
import CategoryUpdate from '../../pages/admin/category/CategoryUpdate';
const AdminRoute = () => {
  const { customer } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (customer.token) {
      currentAdmin(customer.token)
        .then((res) => {
          // console.log('Current admin response: ', res);
          setOk(true);
        })
        .catch((err) => {
          // console.log('Admin route error: ', err);
          setOk(false);
        });
    }
  }, [customer]);

  return ok ? (
    <Routes>
      <Route path='account' element={<AdminAccount />} />
      <Route path='category' element={<CategoryCreate />} />
      <Route path='category/:slug' element={<CategoryUpdate />} />
    </Routes>
  ) : (
    <Loader />
  );
};
export default AdminRoute;
