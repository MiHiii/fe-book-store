import React, { useState } from 'react';
import { Form, Input, message, notification } from 'antd';
import { addUser } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    const { fullName, password, email, phone } = values;
    try {
      const res = await addUser(fullName, password, email, phone);
      console.log(res);
      if (res.statusCode !== 201) {
        notification.error({
          message: 'Failed to add user',
          description: res.message,
        });
        return; // Không điều hướng nếu thất bại
      }

      // Nếu thành công, hiển thị thông báo và điều hướng
      message.success('User added successfully!');
      navigate('/admin/user'); // Điều hướng đến trang người dùng
      form.resetFields(); // Reset các trường trong form
    } catch (error) {
      notification.error({
        message: 'Failed to add user, please check the input fields!',
      });
    } finally {
      setLoading(false); // Tắt loading sau khi thực hiện xong
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    notification.error({
      message: 'Failed to add user, please check the input fields!',
    });
  };

  return (
    <div className='m-4 bg-white rounded-lg p-6 shadow-lg'>
      <h2 className='text-xl font-bold uppercase text-center pt-6'>Add User</h2>
      <Form
        form={form}
        name='addUserForm'
        layout='horizontal'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete='off'
      >
        {/* Full Name */}
        <Form.Item
          label='Full Name'
          name='fullName'
          rules={[{ required: true, message: 'Please input the full name!' }]}
        >
          <Input placeholder='Enter full name' />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password placeholder='Enter password' />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder='Enter email' />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label='Phone Number'
          name='phone'
          rules={[
            { required: true, message: 'Please input the phone number!' },
            {
              pattern: /^[0-9]{10,11}$/,
              message: 'Phone number must be 10 or 11 digits!',
            },
          ]}
        >
          <Input placeholder='Enter phone number' />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className='flex items-center justify-center w-full'>
          <button
            type='submit'
            disabled={loading}
            className='w-full px-4 py-2 mx-auto text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
          >
            {loading ? 'Adding User...' : 'Add User'}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
