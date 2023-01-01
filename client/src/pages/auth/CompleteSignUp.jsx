import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import {
  signInWithEmailLink,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { LockOutlined } from '@ant-design/icons';
import { CiMail } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

const CompleteSignUp = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [infoUser, setInfoUser] = useState({
    name: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setInfoUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(email, infoUser);
  };
  const onFinish = async () => {
    if (!infoUser.name || !email || !infoUser.password) {
      toast.error('Email, Full Name and Password is required');
      return;
    }

    if (infoUser.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      // console.log(result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await updatePassword(user, infoUser.password);
        await updateProfile(user, {
          displayName: infoUser.name,
        });
        const idTokenResult = await user.getIdTokenResult();

        console.log('user', user, 'Id', idTokenResult);
        toast.success('Signup Completed. Redirecting to Home...');
        setTimeout(() => {
          return navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const emailStorage = window.localStorage.getItem('emailForRegistration');
    if (emailStorage) {
      form.setFieldsValue({
        email: emailStorage,
      });
    }
    if (emailStorage) {
      setEmail(emailStorage);
    }
  }, []);

  return (
    <main>
      <h1>Complete Registration</h1>
      <Form form={form} name='form-complete-registration' onFinish={onFinish}>
        <Form.Item name='email' rules={[{ required: true }]}>
          <Input name='email' prefix={<CiMail />} value={form.email} disabled />
        </Form.Item>
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Please type your Name' }]}
        >
          <Input
            name='name'
            type='text'
            placeholder='Full Name'
            prefix={<BsPerson />}
            value={infoUser.name}
            autoFocus
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            name='password'
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            value={infoUser.password}
            onChange={handleOnChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Complete Registration
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </main>
  );
};

export default CompleteSignUp;
