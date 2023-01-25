import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer, getToken } from '../../redux/slices/customerSlice';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { customer } = useSelector((state) => ({ ...state }));
  const cus = useSelector((state) => state.customer.role);
  const { loading } = useSelector((state) => ({ ...state }));
  console.log(cus);
  console.log(loading);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const roleBasedRedirect = (cus) => {
    if (cus.role === 'admin') {
      navigate('/admin/account');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (customer?.token) navigate('/');
  }, [customer.token]);

  const onFinish = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      try {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch(createCustomer(idTokenResult.token));
        dispatch(getToken(idTokenResult.token));
        roleBasedRedirect(customer);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      // navigate('/');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      try {
        dispatch(createCustomer(idTokenResult.token));
        dispatch(getToken(idTokenResult.token));
        roleBasedRedirect(customer);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      // navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <main>
      <Title>Sign in</Title>
      <Form name='form-complete-registration'>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please type your Email',
            },
          ]}
        >
          <Input
            name='email'
            prefix={<UserOutlined className='site-form-item-icon' />}
            value={form.email}
            placeholder='Type your Email'
            onChange={handleOnChange}
            autoFocus
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
            type='password'
            prefix={<LockOutlined className='site-form-item-icon' />}
            value={form.password}
            placeholder='Type your Password'
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          Forgot password?
          <Link to={'/forgot/password'}> Reset it</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            onClick={onFinish}
            icon={<MailOutlined />}
            disabled={!form.email || form.password.length < 6}
          >
            Sign in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            danger
            htmlType='submit'
            onClick={googleLogin}
            icon={<GoogleOutlined />}
          >
            Sign in with Google
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Login;
