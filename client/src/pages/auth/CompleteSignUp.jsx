import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

const CompleteSignUp = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };
  const onFinish = async () => {
    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }

    if (password.length < 6) {
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
        await updatePassword(user, password);
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
          <Input
            name='email'
            prefix={<UserOutlined className='site-form-item-icon' />}
            value={form.email}
            disabled
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
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            autoFocus
            value={password}
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
