import React from 'react';
import { Link } from 'react-router-dom';
import { FaReddit, FaFacebook, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className='bg-white dark:bg-gray-900'>
      <div className='container border-t py-3 mx-auto'>
        <div className='grid grid-cols-1 mx-auto px-4 sm:px-6 lg:px-8 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
          <div className='sm:col-span-2'>
            <h1 className='max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white'>
              Subscribe to our newsletter to get updates.
            </h1>

            <div className='flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row'>
              <input
                id='email'
                type='text'
                className='px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-gray-300'
                placeholder='Email Address'
              />

              <button className='w-full px-4 py-2 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80'>
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <p className='font-semibold text-gray-800 dark:text-white'>
              Quick Links
            </p>

            <div className='flex flex-col items-start mt-5 space-y-2'>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Home
              </Link>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Who We Are
              </Link>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Our Philosophy
              </Link>
            </div>
          </div>

          <div>
            <p className='font-semibold text-gray-800 dark:text-white'>
              Industries
            </p>

            <div className='flex flex-col items-start mt-5 space-y-2'>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Retail & E-Commerce
              </Link>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Information Technology
              </Link>
              <Link
                to='#'
                className='text-sm font-medium text-gray-700 hover:text-gray-800 button transition-colors duration-300 dark:text-gray-300'
              >
                Finance & Insurance
              </Link>
            </div>
          </div>
        </div>

        <hr className='my-6 border-gray-200 md:my-8 dark:border-gray-700' />

        <div className='flex items-center justify-between mx-auto px-4 sm:px-6'>
          <Link to='#'>
            <img src='/src/assets/logo.png' alt='Mihi Book' className='h-20' />
          </Link>

          <div className='flex -mx-2'>
            <Link
              to='#'
              className='mx-2 text-gray-400 hover:text-gray-800  transition-colors duration-300 dark:text-gray-300'
              aria-label='Reddit'
            >
              <FaReddit className='w-5 h-5 fill-current' />
            </Link>

            <Link
              to='#'
              className='mx-2 text-gray-400 hover:text-gray-800  transition-colors duration-300 dark:text-gray-300'
              aria-label='Facebook'
            >
              <FaFacebook className='w-5 h-5 fill-current' />
            </Link>

            <Link
              to='#'
              className='mx-2 text-gray-400 hover:text-gray-800  transition-colors duration-300 dark:text-gray-300'
              aria-label='Github'
            >
              <FaGithub className='w-5 h-5 fill-current' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
