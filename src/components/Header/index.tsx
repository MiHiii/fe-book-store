import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar';

const menuItems = [
  { key: '1', label: 'Home', path: '/' },
  { key: '2', label: 'Categories', path: '/categories' },
  { key: '3', label: 'Best Sellers', path: '/best-sellers' },
  { key: '4', label: 'New Arrivals', path: '/new-arrivals' },
  { key: '5', label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  return (
    <div className='bg-white'>
      <header className='relative bg-white'>
        <p className='flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <Link
                  to='/'
                  className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                >
                  <img
                    src='src/assets/logo.png'
                    alt='Mihi Book'
                    className='h-20'
                  />
                </Link>
              </div>

              {/* Menu */}
              <div className='ml-10 space-x-8'>
                {menuItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className='button text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
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

                <div className='hidden lg:ml-8 lg:flex'>
                  <a
                    href='#'
                    className='flex items-center text-gray-700 hover:text-gray-800 hover:underline'
                  >
                    <span className='ml-3 block text-sm font-medium'>VN</span>
                  </a>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <SearchBar />
                </div>
                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <a href='#' className='group -m-2 flex items-center p-2'>
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
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
