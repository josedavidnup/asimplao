import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { LOGGED_OUT_USER } from '../../Redux/actions/actionTypes';
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
// import '../../assets/styles/header.css';

const Header = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    signOut(auth);
    dispatch({
      type: LOGGED_OUT_USER,
      payload: null,
    });
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
          {/* {user?.name && `Hi, ${user.name.split(' ')[0]}`} */}
          {user?.email && `Hi, ${user.email.split('@')[0]}`}
        </Link>
      ),
      key: 'SubMenu',
      icon: <VscAccount />,
      children: [
        {
          label:
            user && user.role === 'admin' ? (
              <Link to={`/admin/account`}>Admin Account</Link>
            ) : (
              <Link to={`/user/account`}>Account</Link>
            ),
          key: 'account',
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/user/password`}>Password</Link>,
          key: 'password',
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/user/history`}>History</Link>,
          key: 'history',
          icon: <AiOutlineOrderedList />,
        },
        {
          label: <Link to={`/user/wishlist`}>Wishlist</Link>,
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
      ],
    },
  ];

  return (
    <>
      <Menu
        className='header'
        mode='horizontal'
        defaultSelectedKeys={[window.location.pathname]}
        items={!user ? logOut : account}
      />
    </>
  );
};

export default Header;
