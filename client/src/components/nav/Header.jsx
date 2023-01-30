import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { VscAccount } from 'react-icons/vsc';
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../assets/images/asimplao_logo.png';
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
  MdLightMode,
  MdNightlight,
} from 'react-icons/md';
import spanish from '../../assets/images/spanish.png';
import english from '../../assets/images/english.png';
import { logOutCustomer } from '../../redux/slices/customerSlice';

const Header = ({ handleThemeSwitch, theme }) => {
  const [t, i18n] = useTranslation('global');
  const { customer } = useSelector((state) => ({ ...state }));
  const [dropdown, setDropdown] = useState(false);
  const [lan, setLan] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    signOut(auth);
    dispatch(logOutCustomer());
    navigate('/login');
  };

  const handleLanguageSwitch = () => {
    console.log(lan);
    lan === 'en-US'
      ? i18n.changeLanguage('es') && setLan('es-ES')
      : i18n.changeLanguage('en') && setLan('en-US');
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
        <Link
          to={
            customer.role === 'retailer'
              ? `retailer/account`
              : `customer/account`
          }
        >
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
      label: (
        <Link
          to={
            customer.role === 'retailer'
              ? `retailer/account`
              : `customer/account`
          }
        >
          Account
        </Link>
      ),
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

  useEffect(() => {
    setLan(navigator.language || navigator.userLanguage);
  }, []);

  return (
    <>
      {/* <Menu
        className='header bg-green-800 '
        mode='horizontal'
        defaultSelectedKeys={[window.location.pathname]}
        items={!customer?.email ? logOut : account}
      /> */}
      <header className='bg-green-800 text-white dark:bg-slate-900 dark:text-gray-100 duration-100 flex justify-around items-center'>
        <figure className='w-20'>
          <img src={logo} alt='asimplao-logo' />
        </figure>
        <div>
          <div className='flex justify-end gap-2'>
            <button onClick={handleLanguageSwitch}>
              {lan === 'en-US' ? (
                <img src={spanish} alt='spanish' className=' w-6 h-6' />
              ) : (
                <img src={english} alt='english' className=' w-6 h-6' />
              )}
            </button>
            <button onClick={handleThemeSwitch}>
              {theme === 'dark' ? (
                <MdLightMode className='fill-orange-500 w-6 h-6' />
              ) : (
                <MdNightlight className='fill-slate-800 w-6 h-6' />
              )}
            </button>
          </div>
          <nav>
            <ul className='flex space-x-5'>
              <li className='flex space-x-5'>
                <AiOutlineHome />
                {t('header.home')}
              </li>
              <li>
                <MdOutlineFavorite />
              </li>
              <li>
                <FiShoppingCart />
              </li>
              <li
                className='flex space-x-5 relative'
                onClick={() => setDropdown(!dropdown)}
              >
                <Link
                  to={
                    customer.role === 'retailer'
                      ? `retailer/account`
                      : `customer/account`
                  }
                  className='flex space-x-5'
                >
                  <VscAccount />
                  {customer?.name
                    ? `${t('header.hi')}, ${customer.name.split(' ')[0]}`
                    : customer?.email
                    ? `${t('header.hi')}, ${customer.email.split('@')[0]}`
                    : `${t('header.hi')}`}
                </Link>
                {dropdown && (
                  <div className='absolute float-left border bg-slate-200 dark:bg-stone-800 '>
                    <button>{t('header.account')}</button>
                    <button>hola3</button>
                    <button>hola4</button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
