import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaDollarSign, FaHeart, FaUser } from 'react-icons/fa';
import {
  AppstoreOutlined,
  ExceptionOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, message, Avatar } from 'antd';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const { Content, Footer, Sider, Header } = Layout;

const items = [
  {
    label: <Link to='/admin'>Dashboard</Link>,
    key: '/admin',
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manage Users</span>,
    icon: <FaUser />,
    children: [
      {
        label: <Link to='/admin/user'>CRUD</Link>,
        key: '/admin/user',
        icon: <TeamOutlined />,
      },
      {
        label: <Link to='/admin/user/add'>Add user</Link>,
        key: '/admin/user/add',
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to='/admin/book'>Manage Books</Link>,
    key: '/admin/book',
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to='/admin/order'>Manage Orders</Link>,
    key: '/admin/order',
    icon: <FaDollarSign />,
  },
];

const LayoutAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowSearchBar = location.pathname !== '/admin';

  const [current, setCurrent] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector((state: any) => state.account.user);

  const handleSearch = (keyword: string) => {
    // console.log('Đã ấn', keyword);
    if (keyword) {
      navigate(`/admin/user?fullName=${keyword}`);
    }
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction(res.data));
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  useEffect(() => {
    setCurrent(location.pathname); // Chỉ cần set trực tiếp
  }, [location.pathname]); // Chỉ theo dõi pathname, không cần `current`

  const itemsDropdown = [
    {
      label: <a style={{ cursor: 'pointer' }}>Quản lý tài khoản</a>,
      key: 'account',
    },
    {
      label: (
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleLogout();
          }}
        >
          Đăng xuất
        </a>
      ),
      key: 'logout',
    },
  ];
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  return (
    <Layout style={{ minHeight: '100vh' }} className='layout-admin'>
      <Sider
        style={{
          // overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: 'thin',
          scrollbarGutter: 'stable',
        }}
        theme='light'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        collapsedWidth={80} // Chiều rộng khi thu nhỏ
      >
        <Link to='/'>
          <img src='/src/assets/logo.png' alt='Logo' className='h-16 mx-auto' />
        </Link>
        <Menu
          defaultSelectedKeys={['/']}
          selectedKeys={[current]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // Điều chỉnh khoảng cách khi Sider thu nhỏ/mở rộng
          transition: 'margin-left 0.3s ease', // Hiệu ứng mượt khi chuyển đổi
        }}
      >
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          className='flex flex-row justify-between items-center h-16 bg-white'
        >
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger  text-xl',
                onClick: () => setCollapsed(!collapsed),
              } as any,
            )}
          </span>
          <div className='items-center justify-between px-4 border-gray-300'>
            <div className='flex flex-row items-center mx-6'>
              {shouldShowSearchBar && (
                <>
                  <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search'
                    className='w-96 border-none outline-none bg-gray-100 text-sm p-2 rounded-md focus:ring-2 focus:ring-gray-400'
                  />
                  <svg
                    className='h-6 w-6 text-gray-400 -ml-8 cursor-pointer'
                    fill='none'
                    onClick={() => handleSearch(searchValue)}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </>
              )}
            </div>
          </div>

          <Dropdown
            className='text-sm font-bold text-gray-700 hover:text-gray-700'
            menu={{ items: itemsDropdown }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div className=' flex flex-row items-center justify-center'>
                <Avatar src={<img src={urlAvatar} alt='avatar' />} />
                <span className='ml-2 button'>{user?.fullName}</span>
                <FaChevronDown className='mx-2' />
              </div>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            padding: '24px',
            flexGrow: 1, // Phần Content tự co dãn
          }}
        >
          <Outlet />
        </Content>
        <Footer
          className='flex flex-row items-center justify-center'
          style={{ padding: 0 }}
        >
          Copyright ©{new Date().getFullYear()} Mihi
          <FaHeart color='' className=' mx-2 text-gray-400' />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
