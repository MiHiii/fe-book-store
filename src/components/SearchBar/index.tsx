import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const popularSearchTerms = [
    'air force 1',
    'jordan',
    'air max',
    'jordan 1 low',
    'basketball shoes',
    'nike dunk low',
    'tennis',
  ];

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleCancelClick = () => {
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  return (
    <div className='w-full bg-white'>
      <div className='flex lg:ml-6'>
        <a
          href='#'
          className='p-2 text-gray-400 hover:text-gray-800'
          onClick={handleSearchFocus}
        >
          <svg
            className='h-6 w-6'
            fill='none'
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
        </a>
      </div>

      {isSearchOpen && (
        <div className='fixed inset-0 z-50  bg-gray-800 bg-opacity-75'>
          <div className='relative w-full flex flex-col items-center justify-center bg-white'>
            <div className='flex flex-row items-center justify-between p-2 border-b-2  w-full max-w-4xl'>
              <img src='src/assets/logo.png' alt='Logo' className='h-20' />
              {/* Search Input */}
              <div className='items-center justify-between px-4 border-gray-300'>
                <div className='flex-1 mx-6'>
                  <input
                    type='text'
                    placeholder='Search'
                    className='w-96  border-none outline-none bg-gray-100 text-sm p-2 rounded-md focus:ring-2 focus:ring-gray-400'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleSearchFocus}
                  />
                </div>
              </div>
              {/* Cancel Button */}
              <button
                onClick={handleCancelClick}
                className='my-3 button text-gray-500 hover:text-gray-800 text-sm mb-4'
              >
                Cancel
              </button>
            </div>
            <div>
              {/* Popular Search Terms */}
              <div className='px-4 py-4'>
                <h2 className='text-sm font-semibold text-gray-600 mb-2'>
                  Popular Search Terms
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {popularSearchTerms.map((term, index) => (
                    <span
                      key={index}
                      onClick={() => setSearchTerm(term)}
                      className='cursor-pointer bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200'
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
