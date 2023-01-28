import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { Menu } from 'antd';
import { VscAccount } from 'react-icons/vsc';
import { FiShoppingCart } from 'react-icons/fi';
import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineOrderedList,
} from 'react-icons/ai';
import {
  MdLogout,
  MdLogin,
  MdOutlineFavorite,
  MdResetTv,
} from 'react-icons/md';
import { logOutCustomer } from '../../redux/slices/customerSlice';

const Header = () => {
  const { customer } = useSelector((state) => ({ ...state }));
  // console.log(customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    signOut(auth);
    dispatch(logOutCustomer());
    navigate('/login');
  };

  const account = [
    {
      label: <Link to={`/`}>Home</Link>,
      key: 'home',
      icon: <AiOutlineHome />,
    },
    {
      key: 'whishlist',
      icon: <MdOutlineFavorite />,
    },
    {
      label: <Link to={`/`}>Cart</Link>,
      key: 'cart',
      icon: <FiShoppingCart />,
    },
    {
      label: (
        <Link to={`/account`}>
          {/* {customer?.name && `Hi, ${customer.name.split(' ')[0]}`} */}
          {customer?.name
            ? `Hi, ${customer.name.split(' ')[0]}`
            : customer?.email
            ? `Hi, ${customer.email.split('@')[0]}`
            : `Hi`}
        </Link>
      ),
      key: 'SubMenu',
      icon: <VscAccount />,
      children: [
        {
          label:
            customer?.role === 'retailer' ? (
              <Link to={`/retailer/account`}>Retailer Account</Link>
            ) : (
              <Link to={`/customer/account`}>Account</Link>
            ),
          key: 'account',
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/customer/password`}>Password</Link>,
          key: 'password',
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/customer/history`}>History</Link>,
          key: 'history',
          icon: <AiOutlineOrderedList />,
        },
        {
          label: <Link to={`/customer/wishlist`}>Wishlist</Link>,
          key: 'wishlist',

          icon: <MdOutlineFavorite />,
        },
        {
          label: 'Log out',
          icon: <MdLogout />,
          onClick: signout,
          danger: true,
        },
      ],
    },
  ];
  const logOut = [
    {
      label: <Link to={`/`}>Home</Link>,
      key: 'home',
      icon: <AiOutlineHome />,
    },
    {
      key: 'wishlist',
      icon: <MdOutlineFavorite />,
    },
    {
      label: <Link to={`/`}>Cart</Link>,
      key: 'cart',
      icon: <FiShoppingCart />,
    },
    {
      label: <Link to={`/account`}>Account</Link>,
      key: 'SubMenu',
      icon: <VscAccount />,
      children: [
        {
          label: <Link to={`/login`}>Login</Link>,
          key: 'login',
          icon: <MdLogin />,
        },
        {
          label: <Link to={`/register`}>Sign Up</Link>,
          key: 'register',
          icon: <AiOutlineUserAdd />,
        },
        {
          label: 'Log out',
          icon: <MdLogout />,
          onClick: signout,
          danger: true,
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        className='header'
        mode='horizontal'
        defaultSelectedKeys={[window.location.pathname]}
        items={!customer?.email ? logOut : account}
      />
    </>
  );
};

export default Header;
