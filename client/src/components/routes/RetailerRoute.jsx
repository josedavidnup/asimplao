import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentRetailer } from '../../functions/auth';
import RetailerAccount from '../../pages/retailer/RetailerAccount';
import CategoryCreate from '../../pages/retailer/category/CategoryCreate';
import LoadingToRedirect from './LoadingToRedirect';
import Loader from '../loader/Loader';
import CategoryUpdate from '../../pages/retailer/category/CategoryUpdate';
import SubCategoryCreate from '../../pages/retailer/subCategory/SubCategoryCreate';
import SubCategoryUpdate from '../../pages/retailer/subCategory/SubCategoryUpdate';

const RetailerRoute = () => {
  const { customer } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (customer.token) {
      currentRetailer(customer.token)
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
      <Route path='account' element={<RetailerAccount />} />
      <Route path='category' element={<CategoryCreate />} />
      <Route path='category/:slug' element={<CategoryUpdate />} />
      <Route path='subcategory' element={<SubCategoryCreate />} />
      <Route path='subcategory/:slug' element={<SubCategoryUpdate />} />
    </Routes>
  ) : (
    <Loader />
  );
};
export default RetailerRoute;
