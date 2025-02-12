import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const BookCardComponent = ({ book }) => {
  const navigate = useNavigate();

  // Hàm loại bỏ dấu tiếng Việt
  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD') // Tách dấu khỏi ký tự gốc
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  // Hàm chuyển đổi sang slug
  const convertSlug = (str) => {
    str = removeVietnameseTones(str);
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Thay thế khoảng trắng và ký tự đặc biệt bằng dấu '-'
      .replace(/-+/g, '-'); // Xóa dấu '-' dư thừa
  };

  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/images/book/${
    book.thumbnail
  }`;

  const handleRedirectBook = () => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <Card
      className='w-[300px] shadow-lg rounded-lg overflow-hidden'
      cover={
        <img
          alt={book.mainText}
          src={imageUrl}
          className='h-[300px] object-cover cursor-pointer'
          onClick={handleRedirectBook}
        />
      }
    >
      {/* Thông tin sách */}
      <Meta
        title={
          <span
            className='button text-lg font-bold line-clamp-2 text-gray-700 hover:text-gray-800 cursor-pointer'
            onClick={handleRedirectBook}
          >
            {book.mainText}
          </span>
        }
        description={
          <div className='text-sm text-gray-600 mt-2'>
            <p>
              <strong>Tác giả:</strong> {book.author}
            </p>
            <p>
              <strong>Thể loại:</strong> {book.category}
            </p>
            <p>
              <strong>Giá:</strong> {book.price.toLocaleString()}đ
            </p>
          </div>
        }
      />

      {/* Nút xem chi tiết */}
      <button
        onClick={handleRedirectBook}
        className='w-full px-4 py-2 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80 mt-4'
      >
        Xem chi tiết
      </button>
    </Card>
  );
};

export default BookCardComponent;
