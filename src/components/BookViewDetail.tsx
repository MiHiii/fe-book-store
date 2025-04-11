import { useEffect, useRef, useState } from 'react';
import { Rate, Divider } from 'antd';
import ImageGallery from 'react-image-gallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import ModalGallery from './ModalGallery';
import { useNavigate } from 'react-router-dom';

interface BookViewDetailProps {
  dataBook?: {
    mainText: string;
    author: string;
    price: number;
    sold: number;
    items?: { original: string; thumbnail: string }[];
  };
}

const BookViewDetail = ({ dataBook }) => {
  const navigate = useNavigate();
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const refGallery = useRef<{ getCurrentIndex: () => number } | null>(null);

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };

  if (!dataBook) {
    return (
      <div className='bg-gray-100 py-5 min-h-screen'>
        <div className='max-w-6xl mx-auto p-5 bg-white rounded-md shadow-md'>
          <BookLoader />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-100 py-5 min-h-screen'>
      <div className='bg-gray-100 py-5 min-h-screen'>
        {!dataBook || !dataBook.items || dataBook.items.length === 0 ? (
          <div className='max-w-6xl mx-auto p-5 bg-white rounded-md shadow-md'>
            <BookLoader />
          </div>
        ) : (
          <div className='max-w-6xl mx-auto p-5 bg-white rounded-md shadow-md'>
            <div className='flex'>
              {/* Phần hiển thị hình ảnh */}
              <div className='w-1/2'>
                <ImageGallery
                  ref={refGallery}
                  items={dataBook.items}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  onClick={handleOnClickImage}
                />
              </div>

              {/* Phần thông tin sách */}
              <div className='w-1/2 px-5'>
                <h1 className='text-xl font-bold'>{dataBook.mainText}</h1>
                <p className='text-gray-600'>Tác giả: {dataBook.author}</p>
                <p className='text-red-500 text-lg font-semibold'>
                  {dataBook.price} VND
                </p>
                <p>Đã bán: {dataBook.sold}</p>
                <Divider />
                <div className='flex gap-2'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    <BsCartPlus className='inline-block mr-2' /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chỉ render ModalGallery nếu có dữ liệu */}
      {dataBook.items && dataBook.items.length > 0 && (
        <ModalGallery
          isOpen={isOpenModalGallery}
          setIsOpen={setIsOpenModalGallery}
          currentIndex={currentIndex}
          items={dataBook.items}
          title={dataBook.mainText}
        />
      )}
    </div>
  );
};

export default BookViewDetail;
