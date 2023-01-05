import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../../assets/styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const onFinish = async () => {
    const actionCodeSettings = {
      url: `${import.meta.env.VITE_BASE_URL}/register/complete`,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    toast.success(
      `Email has been sent ${email}. Click the link to complete your registration`
    );
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error(`Something went wrong. Try again!`);
  };

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);
  return (
    <main className='register'>
      <h1>Sign up</h1>
      <Form
        name='form-registration'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please, type your email',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input
            name='email'
            value={email}
            autoFocus
            placeholder='Type your email Account'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </main>
  );
};

export default Register;
