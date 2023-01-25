import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { customer } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const onFinish = async () => {
    try {
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_BASE_URL}/login`,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setEmail('');
      toast.success('Check your email for password reset');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (customer && customer.token) navigate('/');
  }, [customer, navigate]);

  return (
    <main>
      <Title level={3}>Reset password</Title>
      <Form name='form-complete-registration' onFinish={onFinish}>
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
            prefix={<UserOutlined />}
            value={email}
            placeholder='Type your Email'
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            onClick={onFinish}
            icon={<MailOutlined />}
            disabled={!email}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default ForgotPassword;
