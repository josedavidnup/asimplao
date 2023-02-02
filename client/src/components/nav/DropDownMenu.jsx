import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { MdLogout, MdOutlineFavorite, MdResetTv } from 'react-icons/md';

const DropDownMenu = ({ customer, signout, dropdown }) => {
  const [t, i18n] = useTranslation('global');
  return (
    <ul
      className='fixed bottom-40 bg-slate-200 dark:bg-stone-700 rounded-lg p-2'
      //   onPointerLeaveCapture={!dropdown}
    >
      <li className='md:cursor-pointer hover:bg-slate-600 hover:underline rounded-lg p-2 flex justify-around items-center'>
        {customer?.role === 'retailer' ? (
          <Link to={`/retailer/account`}>Retailer {t('header.account')}</Link>
        ) : customer?.role === 'customer' ? (
          <Link to={`/customer/account`}>{t('header.account')}</Link>
        ) : (
          <Link to={`/login`}>Login</Link>
        )}
      </li>
      <li className='md:cursor-pointer hover:bg-slate-600 hover:underline rounded-lg p-2 flex justify-around items-center'>
        <Link
          to={`/customer/password`}
          className='flex justify-around items-center gap-x-5'
        >
          <MdResetTv />
          <span>Password</span>
        </Link>
      </li>
      <li className='md:cursor-pointer hover:bg-slate-600 rounded-lg p-2 flex justify-around items-center'>
        <Link
          to={`/customer/history`}
          className='flex justify-around items-center gap-x-5'
        >
          <AiOutlineOrderedList />
          <span>History</span>
        </Link>
      </li>
      <li className='md:cursor-pointer hover:bg-slate-600 rounded-lg p-2 flex justify-around items-center'>
        <Link
          to={`/customer/wishlist`}
          className='flex justify-around items-center gap-x-5'
        >
          <MdOutlineFavorite />
          <span>Wishlist</span>
        </Link>
      </li>
      <li
        onClick={signout}
        className='md:cursor-pointer hover:bg-red-600 rounded-lg p-2 flex justify-around items-center'
      >
        <MdLogout />
        <span>Log out</span>
      </li>
    </ul>
  );
};

export default DropDownMenu;
