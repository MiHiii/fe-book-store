import { Button, Form, Input, Divider, Typography } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IRegisterProps {
  username: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
}

const RegisterPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values: IRegisterProps) => {
    console.log('Received values of form: ', values);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onFinish(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          color: 'rgb(211 151 210)',
          marginBottom: '20px',
        }}
      >
        Register Page
      </h1>
      <Divider />
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          margin: 'auto',
        }}
        scrollToFirstError
      >
        <Form.Item
          name='username'
          label='Username'
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: 'Please input your usname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            onClick={handleSubmit}
            loading={false}
            type='primary'
            htmlType='submit'
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
