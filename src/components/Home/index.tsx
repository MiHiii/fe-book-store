import React from 'react';

const Home = () => {
  return (
    <div className='container mx-auto p-4 mt-2'>
      <h1 className='text-3xl text-cyan-700 font-bold underline mb-4'>
        Welcome to Our Book Store
      </h1>
      <p className='text-lg mb-4'>
        Discover a wide variety of books from different genres. Whether you are
        looking for the latest bestsellers, classic literature, or educational
        books, we have something for everyone.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-4 border rounded shadow'>
          <h2 className='text-xl font-semibold mb-2'>Best Sellers</h2>
          <p>
            Explore our collection of best-selling books that everyone is
            talking about.
          </p>
        </div>
        <div className='p-4 border rounded shadow'>
          <h2 className='text-xl font-semibold mb-2'>New Arrivals</h2>
          <p>
            Check out the latest additions to our store and find your next great
            read.
          </p>
        </div>
        <div className='p-4 border rounded shadow'>
          <h2 className='text-xl font-semibold mb-2'>Categories</h2>
          <p>
            Browse books by categories such as Fiction, Non-Fiction, Mystery,
            Romance, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
