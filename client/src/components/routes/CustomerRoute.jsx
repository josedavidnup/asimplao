import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Account from '../../pages/customer/Account';
import History from '../../pages/customer/History';
import Password from '../../pages/customer/Password';
import Wishlist from '../../pages/customer/Wishlist';
import LoadingToRedirect from './LoadingToRedirect';
import Loader from '../loader/Loader';

const CustomerRoute = () => {
  const { customer } = useSelector((state) => ({ ...state }));

  return customer?.token && customer?.role === 'subscriber' ? (
    <Routes>
      <Route path='account' element={<Account />} />
      <Route path='history' element={<History />} />
      <Route path='password' element={<Password />} />
      <Route path='wishlist' element={<Wishlist />} />
    </Routes>
  ) : (
    <Loader />
  );
};
export default CustomerRoute;
