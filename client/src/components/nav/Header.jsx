import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import '../../assets/styles/header.css';
// const items = ;

const Header = () => {
  const [current, setCurrent] = useState('');

  const handleClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        className='header'
        onClick={handleClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={[
          {
            label: <Link to={`/`}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
          },
          {
            label: <Link to={`/account`}>Account</Link>,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
              {
                label: 'Option 1',
                key: 'setting:1',
              },
              {
                label: 'Option 2',
                key: 'setting:2',
              },
            ],
          },
          {
            label: <Link to={`/register`}>Register</Link>,
            key: 'register',
            icon: <UserAddOutlined />,
          },
          {
            label: <Link to={`/login`}>Login</Link>,
            key: 'login',
            icon: <UserOutlined />,
          },
        ]}
      />
    </>
  );
};

export default Header;
