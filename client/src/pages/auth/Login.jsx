import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { createOrUpdateUser } from '../../functions/auth';
import { useDispatch, useSelector } from 'react-redux';
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
import { LOGGED_IN_USER } from '../../redux/actions/actionTypes';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { user } = useSelector((state) => ({ ...state }));
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

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/history');
    }
  };

  useEffect(() => {
    if (user && user?.token) navigate('/');
  }, [user]);

  const onFinish = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      try {
        const res = await createOrUpdateUser(idTokenResult.token);
        console.log(res);
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: res.data.name,
            token: idTokenResult.token,
            email: res.data.email,
            role: res.data.role,
            _id: res.data._id,
          },
        });
        roleBasedRedirect(res);
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
        const res = await createOrUpdateUser(idTokenResult.token);
        console.log(res);
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            _id: res.data._id,
            token: idTokenResult.token,
          },
        });
        roleBasedRedirect(res);
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
