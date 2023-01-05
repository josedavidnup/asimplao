import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { AiOutlineLock } from 'react-icons/ai';
import { Typography } from 'antd';
const { Title } = Typography;
import UserNav from '../../components/nav/UserNav';

const Password = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmedPassword: '',
  });

  const HandleOnChange = (e) => {
    setPasswords((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onFinish = async () => {
    try {
      const user = auth.currentUser;
      await updatePassword(user, passwords.confirmedPassword);
      setPasswords((prev) => {
        return {
          ...prev,
          newPassword: '',
          confirmedPassword: '',
        };
      });
      toast.success('Your password has been updated');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 border-right'>
          <UserNav />
        </div>
        <Title level={3}>Update password</Title>
        <Form name='form-complete-registration' onFinish={onFinish}>
          <Form.Item
            label='New Password'
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please type your new password',
              },
            ]}
            hasFeedback
          >
            <Input
              name='newPassword'
              type='password'
              prefix={<AiOutlineLock />}
              value={passwords.newPassword}
              placeholder='Type your password'
              onChange={HandleOnChange}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            label='Confirm Password'
            name='confirmedPassword'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
            dependencies={['newPassword']}
            hasFeedback
          >
            <Input
              name='confirmedPassword'
              type='password'
              prefix={<AiOutlineLock />}
              value={passwords.confirmedPassword}
              placeholder='Type your password'
              onChange={HandleOnChange}
              autoFocus
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              disabled={!passwords.confirmedPassword}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Password;
