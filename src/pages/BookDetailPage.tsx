import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookViewDetail from '../components/BookViewDetail';
import { callFetchBookById, callFetchListBook } from '../services/api';
import BookLoader from '../components/BookLoader';

const BookDetailPage = () => {
  const [dataBook, setDataBook] = useState(null);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const id = params.get('id'); // Lấy book ID từ URL

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    setLoading(true);
    try {
      const res = await callFetchBookById(bookId);
      if (res && res.data) {
        let bookData = res.data;
        bookData.items = getImages(bookData);
        setDataBook(bookData);

        // Gọi API lấy sách liên quan
        fetchRelatedBooks(bookData);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sách:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBooks = async (book: any) => {
    try {
      if (book.category) {
        const categoryQuery = `category=${book.category}&current=1&pageSize=4`;
        const resCategory = await callFetchListBook(categoryQuery);
        if (resCategory?.data?.result) {
          // Lọc bỏ sách hiện tại
          const filteredBooks = resCategory.data.result.filter(
            (b: any) => b._id !== book._id,
          );
          setBooksByCategory(filteredBooks);
        }
      }

      if (book.author) {
        const authorQuery = `author=${book.author}&current=1&pageSize=4`;
        const resAuthor = await callFetchListBook(authorQuery);
        if (resAuthor?.data?.result) {
          // Lọc bỏ sách hiện tại
          const filteredBooks = resAuthor.data.result.filter(
            (b: any) => b._id !== book._id,
          );
          setBooksByAuthor(filteredBooks);
        }
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sách liên quan:', error);
    }
  };

  const getImages = (book: any) => {
    const images = [];

    if (book.thumbnail) {
      images.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          book.thumbnail
        }`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          book.thumbnail
        }`,
      });
    }

    if (book.slider?.length) {
      const sliderImages = book.slider.map((img: string) => ({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${img}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${img}`,
      }));
      images.push(...sliderImages);
    }

    return images;
  };

  return (
    <div className='max-w-6xl mx-auto p-5'>
      {loading ? (
        <BookLoader />
      ) : dataBook ? (
        <>
          <BookViewDetail dataBook={dataBook} />

          {/* Sách cùng danh mục */}
          <div className='mt-5 bg-white rounded-md shadow-md p-5'>
            <h2 className='text-xl font-bold mb-4'>Sách cùng danh mục</h2>
            {booksByCategory && booksByCategory.length > 0 ? (
              <div
                className={`
                ${
                  booksByCategory.length < 4
                    ? 'flex  justify-around items-center '
                    : 'grid gap-4 grid-cols-2 md:grid-cols-4'
                }
              `}
              >
                {booksByCategory.map((book: any) => (
                  <div
                    key={book._id}
                    style={{ width: '256px' }}
                    className='flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'
                  >
                    <div
                      className='relative overflow-hidden'
                      style={{ height: '270px' }}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          book.thumbnail
                        }`}
                        alt={book.mainText}
                        className='w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105'
                        onClick={() => navigate(`/book?id=${book._id}`)}
                      />
                    </div>
                    <div className='p-3 flex-grow bg-gray-50'>
                      <h3
                        className='font-semibold text-sm line-clamp-2 mb-2 cursor-pointer hover:text-blue-600'
                        onClick={() => navigate(`/book?id=${book._id}`)}
                      >
                        {book.mainText}
                      </h3>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='text-xs text-gray-600'>
                          {book.price.toLocaleString()}đ
                        </p>
                        <button
                          onClick={() => navigate(`/book?id=${book._id}`)}
                          className='px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
                        >
                          Xem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-4'>
                <p>Không có sách nào trong danh mục này</p>
              </div>
            )}
          </div>

          {/* Sách cùng tác giả */}
          <div className='mt-5 bg-white rounded-md shadow-md p-5'>
            <h2 className='text-xl font-bold mb-4'>Sách cùng tác giả</h2>
            {booksByAuthor && booksByAuthor.length > 0 ? (
              <div
                className={`
              ${
                booksByCategory.length < 4
                  ? 'flex  justify-around items-center '
                  : 'grid gap-4 grid-cols-2 md:grid-cols-4'
              }
            `}
              >
                {booksByAuthor.map((book: any) => (
                  <div
                    key={book._id}
                    style={{ width: '256px' }}
                    className='flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'
                  >
                    <div
                      className='relative overflow-hidden'
                      style={{ height: '270px' }}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          book.thumbnail
                        }`}
                        alt={book.mainText}
                        className='w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105'
                        onClick={() => navigate(`/book?id=${book._id}`)}
                      />
                    </div>
                    <div className='p-3 flex-grow bg-gray-50'>
                      <h3
                        className='font-semibold text-sm line-clamp-2 mb-2 cursor-pointer hover:text-blue-600'
                        onClick={() => navigate(`/book?id=${book._id}`)}
                      >
                        {book.mainText}
                      </h3>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='text-xs text-gray-600'>
                          {book.price.toLocaleString()}đ
                        </p>
                        <button
                          onClick={() => navigate(`/book?id=${book._id}`)}
                          className='px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors'
                        >
                          Xem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-4'>
                <p>Không có sách nào của tác giả này</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='text-center text-gray-500'>Không tìm thấy sách</div>
      )}
    </div>
  );
};

export default BookDetailPage;
