import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../functions/auth';
import AdminAccount from '../../pages/admin/AdminAccount';
// import ProductCreate from '../../pages/admin/category/ProductCreate';
// import Products from '../../pages/admin/category/Products';
import CategoryCreate from '../../pages/admin/category/CategoryCreate';
// import SubCategoryCreate from '../../pages/admin/category/SubCategoryCreate';
// import CreateCoupon from '../../pages/admin/category/CreateCoupon';
// import AdminPassword from '../../pages/admin/category/AdminPassword';
import LoadingToRedirect from './LoadingToRedirect';
import Loader from '../loader/Loader';
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
      <Route path='account' element={<AdminAccount />} />
      {/* <Route path='product' element={<ProductCreate />} />
      <Route path='products' element={<Products />} /> */}
      <Route path='category' element={<CategoryCreate />} />
      {/* <Route path='subcategory' element={<SubCategoryCreate />} />
      <Route path='coupon' element={<CreateCoupon />} />
      <Route path='password' element={<AdminPassword />} /> */}
    </Routes>
  ) : (
    <Loader />
  );
};
export default AdminRoute;
