import { Link, useNavigate } from 'react-router-dom';

const BookBestSeller = ({ bestSellerBook }) => {
  const navigate = useNavigate();

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
    <div>
      <h2 className='text-xl font-bold flex items-center'>
        <span className='flex-1 h-[1px] bg-gray-400'></span>
        <span className='px-3'>Tiêu đề</span>
        <span className='flex-1 h-[1px] bg-gray-400'></span>
      </h2>
    </div>
  );
};

export default BookBestSeller;
