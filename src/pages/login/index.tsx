import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';
import './login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onFinish = async (values: LoginFormValues) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem('access_token', res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success('Đăng nhập tài khoản thành công!');
      navigate('/');
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
    <div className='login-page'>
      <main className='main'>
        <div className='container'>
          <section className='wrapper'>
            <div className='heading'>
              <h2 className='text text-large'>Đăng Nhập</h2>
              <Divider />
            </div>
            <Form name='basic' onFinish={onFinish} autoComplete='off'>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Email'
                name='username'
                rules={[
                  { required: true, message: 'Email không được để trống!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label='Mật khẩu'
                name='password'
                rules={[
                  { required: true, message: 'Mật khẩu không được để trống!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <button className='w-full px-4 py-2 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80'>
                  Đăng nhập
                </button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className='text text-normal'>
                Chưa có tài khoản?
                <span>
                  <Link className='underline' to='/register'>
                    {' '}
                    Đăng Ký{' '}
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

export default LoginPage;
