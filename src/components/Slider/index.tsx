import React, { useEffect, useState } from 'react';

const Slider: React.FC = () => {
  const [sliderText, setSliderText] = useState(
    'Get free delivery on orders over $100',
  );
  const [isExiting, setIsExiting] = useState(false);

  const sliderMessages = [
    'Get free delivery on orders over $100',
    '50% off Black Friday Sale',
    'Join our loyalty program for exclusive deals!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setSliderText((prevText) => {
          const currentIndex = sliderMessages.indexOf(prevText);
          return sliderMessages[(currentIndex + 1) % sliderMessages.length];
        });
        setIsExiting(false);
      }, 500); // Thời gian khớp với CSS transition
    }, 10000); // Thời gian đổi thông điệp

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-black overflow-hidden'>
      <p
        className={`flex h-10 items-center justify-center text-sm font-medium text-white sm:px-6 lg:px-8 
        ${isExiting ? 'slider-exit' : 'slider-enter'}`}
      >
        {sliderText}
      </p>
    </div>
  );
};

export default Slider;
