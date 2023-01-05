import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../functions/auth';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log('Current admin response: ', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('Admin route error: ', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Routes>
      <Route path='dashboard' element={<AdminDashboard />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};
export default AdminRoute;
