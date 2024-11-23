import CardDataStats from '../../components/CardDataStats';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import { FaUser } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { PiCurrencyDollarFill } from 'react-icons/pi';

function index() {
  return (
    <div>
      <div className='m-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:grid-cols-2 2xl:gap-7.5'>
        <CardDataStats title='Total Order' total='$3.456K' rate='0.43%' levelUp>
          <div className='text-gray-500 border h-12 w-12 rounded-full flex items-center justify-center '>
            <BsFillCartCheckFill className='h-5 w-5' />
          </div>
        </CardDataStats>
        <CardDataStats title='Total Profit' total='$45,2K' rate='4.35%' levelUp>
          <div className='text-gray-500 border h-12 w-12 rounded-full flex items-center justify-center '>
            <PiCurrencyDollarFill className='h-5 w-5' />
          </div>
        </CardDataStats>
        <CardDataStats title='Total Book' total='2.450' rate='2.59%' levelUp>
          <div className='text-gray-500 border h-12 w-12 rounded-full flex items-center justify-center '>
            <IoBookSharp className='h-5 w-5' />
          </div>
        </CardDataStats>
        <CardDataStats title='Total User' total='3.456' rate='0.95%' levelDown>
          <div className='text-gray-500 border h-12 w-12 rounded-full flex items-center justify-center '>
            <FaUser className='h-5 w-5' />
          </div>
        </CardDataStats>
      </div>
      <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mx-4 my-6 '>
        <Chart />
      </div>
      <Table />
    </div>
  );
}

export default index;
