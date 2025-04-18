import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';
import './register.scss';

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    const { fullName, email, password, phone } = values;
    setIsSubmit(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success('Đăng ký tài khoản thành công!');
      navigate('/login');
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className='register-page'>
      <main className='main'>
        <div className='container'>
          <section className='wrapper'>
            <div className='heading'>
              <h2 className='text text-large'>Đăng Ký Tài Khoản</h2>
              <Divider />
            </div>
            <Form
              name='basic'
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label='Họ tên'
                name='fullName'
                rules={[
                  { required: true, message: 'Họ tên không được để trống!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label='Email'
                name='email'
                rules={[
                  { required: true, message: 'Email không được để trống!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label='Mật khẩu'
                name='password'
                rules={[
                  { required: true, message: 'Mật khẩu không được để trống!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label='Số điện thoại'
                name='phone'
                rules={[
                  {
                    required: true,
                    message: 'Số điện thoại không được để trống!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <button className='w-full px-4 py-2 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto  focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80'>
                  Đăng kí
                </button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className='text text-normal'>
                Đã có tài khoản ?
                <span>
                  <Link className='underline' to='/login'>
                    {' '}
                    Đăng Nhập{' '}
                  </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
