import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { BsPerson } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { createCustomer, getToken } from '../../redux/slices/customerSlice';

const CompleteSignUp = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { customer } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async () => {
    if (!email || !password) {
      toast.error('Email and Password are required');
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

        try {
          dispatch(createCustomer(idTokenResult.token));
          dispatch(getToken(idTokenResult.token));
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
        return navigate('/');
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
  }, [navigate]);

  return (
    <main>
      <h1>Complete Registration</h1>
      <Form form={form} name='form-complete-registration' onFinish={onFinish}>
        <Form.Item name='email' rules={[{ required: true }]}>
          <Input
            name='email'
            prefix={<BsPerson />}
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
            name='password'
            prefix={<CiLock className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Complete Registration
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default CompleteSignUp;
