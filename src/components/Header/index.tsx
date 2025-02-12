import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Avatar, Badge, Dropdown, message } from 'antd';
import SearchBar from '../SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout, callFetchCategory } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
import Slider from '../Slider';
import { FaChevronDown } from 'react-icons/fa';

const menuItems = [
  { key: '1', label: 'Home', path: '/' },
  { key: '2', label: 'Categories', path: '/categories', hasDropDown: true },
  { key: '3', label: 'Best Sellers', path: '/best-sellers' },
  { key: '4', label: 'New Arrivals', path: '/new-arrivals' },
  { key: '5', label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    // Fetch list category
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item: any, i) => ({
          key: i + 1,
          label: item,
          path: `/categories/${item}`,
        }));
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);
  const user = useSelector((state: any) => state.account.user);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction(res.data));
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  let items = [
    {
      label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
      key: 'account',
    },
    {
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: 'logout',
    },
  ];
  if (user?.role === 'ADMIN') {
    items.unshift({
      label: <Link to='/admin'>Trang quản trị</Link>,
      key: 'admin',
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;
  return (
    <div className='fix-nav border-b border-gray-200 bg-white'>
      <div className=' bg-black overflow-hidden '>
        <Slider />
      </div>
      <div className=' container mx-auto'>
        <header className='bg-white'>
          <nav aria-label='Top' className=' px-4 sm:px-6'>
            <div className=''>
              <div className='flex justify-center h-16 items-center'>
                {/* Logo */}
                <div className='ml-4 flex lg:ml-0'>
                  <Link
                    to='/'
                    className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                  >
                    <img
                      src='/src/assets/logo.png'
                      alt='Mihi Book'
                      className='h-20'
                    />
                  </Link>
                </div>

                {/* Menu */}
                <div className='ml-10 space-x-8 relative'>
                  {menuItems.map((item) => (
                    <div
                      key={item.key}
                      className='relative inline-block'
                      onMouseEnter={
                        item.hasDropDown ? handleMouseEnter : undefined
                      }
                      onMouseLeave={
                        item.hasDropDown ? handleMouseLeave : undefined
                      }
                    >
                      <div className='menu-item group relative'>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive
                              ? 'button relative text-sm font-medium text-gray-700 hover:text-gray-800 active'
                              : 'button relative text-sm font-medium text-gray-700 hover:text-gray-800'
                          }
                        >
                          {item.label}
                        </NavLink>
                        {item.hasDropDown && (
                          <div className='dropdown-menu absolute left-0 mt-1 w-96 p-2 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block'>
                            {listCategory.map((category) => (
                              <NavLink
                                key={category.key}
                                to={category.path}
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              >
                                {category.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='ml-auto h-16 flex items-center justify-center'>
                  {user && user.fullName ? (
                    <Dropdown
                      className='text-sm font-bold text-gray-700 hover:text-gray-700'
                      menu={{ items: items }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <div className='mx-5 flex flex-row items-center justify-center'>
                          <Avatar src={urlAvatar} />
                          <span className='button ml-2'>{user?.fullName}</span>
                          <FaChevronDown className='mx-3' />
                        </div>
                      </a>
                    </Dropdown>
                  ) : (
                    <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4'>
                      <Link
                        to={'/login'}
                        className='button text-sm font-medium text-gray-700 hover:text-gray-800'
                      >
                        Sign in
                      </Link>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      ></span>
                      <Link
                        to='/register'
                        className='button text-sm font-medium text-gray-700 hover:text-gray-800'
                      >
                        Create account
                      </Link>
                    </div>
                  )}

                  <div className='hidden lg:ml-4 lg:flex'>
                    <a
                      href='#'
                      className='flex items-center text-gray-700 hover:text-gray-800 hover:underline'
                    >
                      <span className='ml-3 block text-sm font-medium'>VN</span>
                    </a>
                  </div>
                  {/* Search */}
                  <div className='flex'>
                    <SearchBar />
                  </div>
                  {/* Cart */}
                  <div className='ml-4 flow-root lg:ml-4'>
                    <a href='#' className='group -m-2 flex items-center p-2'>
                      <Badge
                        style={{ backgroundColor: '#9ca3af' }}
                        showZero={true}
                        count={2}
                        overflowCount={10}
                      >
                        <svg
                          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-800'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                          />
                        </svg>
                      </Badge>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
