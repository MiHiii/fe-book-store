import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ModalGalleryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentIndex: number;
  items: { original: string; thumbnail: string }[];
  title: string;
}

const ModalGallery: React.FC<ModalGalleryProps> = ({
  isOpen,
  setIsOpen,
  currentIndex,
  items,
  title,
}) => {
  console.log('test', items); // Kiểm tra xem dữ liệu có được truyền đúng không

  const [activeIndex, setActiveIndex] = useState(0);
  const refGallery = useRef<ImageGallery>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  return (
    <Modal
      width={'60vw'}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      closable={false}
      className='p-5 bg-white rounded-lg shadow-lg'
    >
      <div className='flex gap-6'>
        <div className='w-2/3'>
          <ImageGallery
            ref={refGallery}
            items={items} // Đổi từ `images` thành `items`
            showPlayButton={false}
            showFullscreenButton={false}
            startIndex={currentIndex}
            showThumbnails={false}
            onSlide={(i) => setActiveIndex(i)}
            slideDuration={0}
          />
        </div>
        <div className='w-1/3'>
          <div className='text-lg font-semibold mb-4'>{title}</div>
          <div className='grid grid-cols-3 gap-2'>
            {items.map(
              (
                item,
                i, // Đổi từ `images` thành `items`
              ) => (
                <div
                  key={i}
                  className='relative cursor-pointer'
                  onClick={() => refGallery.current?.slideToIndex(i)}
                >
                  <img
                    src={item.original}
                    alt=''
                    className={`w-24 h-24 object-cover rounded-md border ${
                      activeIndex === i ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  />
                  {activeIndex === i && (
                    <div className='absolute inset-0 border-2 border-blue-500 rounded-md'></div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalGallery;
