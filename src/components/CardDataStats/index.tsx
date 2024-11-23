import React, { ReactNode } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className='rounded-lg border border-stroke bg-white py-6 px-7 shadow-lg '>
      <div className=''>{children}</div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-xl font-bold text-black'>{total}</h4>
          <span className='text-xs font-semibold text-gray-400'>{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 font-bold mr-5 text-sm ${
            levelUp && ' text-green-500'
          } ${levelDown && ' text-red-500'} `}
        >
          {rate}

          {levelUp && <FaChevronUp className='text-green-500' />}
          {levelDown && <FaChevronDown className='text-red-500' />}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
