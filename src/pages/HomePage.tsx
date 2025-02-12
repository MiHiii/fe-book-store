import { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import { callFetchListBook } from '../services/api';
import BookList from '../components/BookListComponent';
import {
  AiFillTrophy,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
} from 'react-icons/ai';
import { FaMedal, FaAward } from 'react-icons/fa';

const HomePage = () => {
  const [listBook, setListBook] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBook = async () => {
      const res = await callFetchListBook('');
      if (res && res.data) {
        setListBook(res.data);
      }
    };
    fetchBook();
  }, []);

  return (
    <>
      <CarouselComponent listBook={listBook} />
      <div className='flex justify-center gap-20 p-9 text-gray-600 bg-gray-200'>
        <AiFillTrophy className='text-7xl' />
        <AiOutlineSafetyCertificate className='text-7xl' />
        <FaMedal className='text-7xl' />
        <FaAward className='text-7xl' />
        <AiOutlineStar className='text-7xl' />
      </div>
      <BookList listBook={listBook} />

      <div className='container mx-auto p-4 mt-2'>
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
              Check out the latest additions to our store and find your next
              great read.
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
    </>
  );
};

export default HomePage;
