import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

const CarouselComponent = ({ listBook }) => {
  const navigate = useNavigate();
  const customDescriptions = [
    'Cuốn sách bán chạy nhất năm nay, không thể bỏ lỡ!',
    'Một câu chuyện hấp dẫn, lôi cuốn ngay từ trang đầu tiên.',
    'Hành trình khám phá tri thức đầy thú vị và ý nghĩa.',
    'Câu chuyện đầy cảm hứng dành cho mọi lứa tuổi.',
  ];

  const convertSlug = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, 'a')
      .replace(/[éèẻẽẹêếềểễệ]/g, 'e')
      .replace(/[íìỉĩị]/g, 'i')
      .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
      .replace(/[úùủũụưứừửữự]/g, 'u')
      .replace(/[ýỳỷỹỵ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleRedirectBook = (book: any): void => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <Carousel className='container mx-auto' autoplay>
      {listBook.slice(0, 4).map((book, index) => {
        const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          book.thumbnail
        }`;
        const bgImage =
          'https://static.vecteezy.com/system/resources/previews/021/999/198/non_2x/hand-drawn-curved-line-shape-curved-line-icon-free-png.png'; // Ảnh nền

        return (
          <div
            key={book._id}
            className='flex items-center justify-center bg-gray-50 px-20 py-16 bg-cover bg-center'
            style={{
              backgroundImage: `url(${bgImage})`, // Đặt ảnh nền
            }}
          >
            <div className='max-w-6xl w-full grid grid-cols-2 gap-12 items-center bg-white/80 p-10 rounded-lg shadow-lg'>
              {/* Phần thông tin sách */}
              <div>
                <h2 className='text-5xl font-bold text-gray-900 leading-tight'>
                  {book.mainText}
                </h2>
                <p className='text-gray-600 mt-4 text-lg'>
                  {customDescriptions[index]}
                </p>
                <button
                  onClick={() => handleRedirectBook(book)}
                  className='mt-6 inline-block border border-gray-800 text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 hover:text-white transition duration-300'
                >
                  READ MORE →
                </button>
              </div>

              {/* Ảnh sách */}
              <div className='flex justify-center'>
                <img
                  src={imageUrl}
                  alt={book.title}
                  className='w-[400px] h-auto shadow-xl rounded-lg'
                />
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
