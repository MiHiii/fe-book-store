export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};

const productData: Product[] = [
  {
    image: '',
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: '',
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: '',
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: '',
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const Table = () => {
  return (
    <div className='m-4 rounded-lg border bg-white px-5 pb-5 shadow-lg'>
      <div className='py-6 px-4 md:px-6 xl:px-7'>
        <h4 className='text-xl font-semibold text-black dark:text-white'>
          Top Books
        </h4>
      </div>

      <div className='grid grid-cols-6 border-t py-4 px-4 sm:grid-cols-8 md:px-6 2xl:px-7'>
        <div className='col-span-3 flex items-center'>
          <p className='font-medium'>Product Name</p>
        </div>
        <div className='col-span-2 hidden items-center sm:flex'>
          <p className='font-medium'>Category</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Price</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Sold</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Profit</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className='grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7'
          key={key}
        >
          <div className='col-span-3 flex items-center'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='h-12 w-12 rounded-md'>
                <img src={product.image} alt='Product' />
              </div>
              <p className='text-sm text-black dark:text-white'>
                {product.name}
              </p>
            </div>
          </div>
          <div className='col-span-2 hidden items-center sm:flex'>
            <p className='text-sm text-black dark:text-white'>
              {product.category}
            </p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-black dark:text-white'>
              ${product.price}
            </p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-black dark:text-white'>{product.sold}</p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-green-500'>${product.profit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
