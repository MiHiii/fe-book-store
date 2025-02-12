import { FilterTwoTone, ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import {
  Form,
  Checkbox,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Spin,
  Empty,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { callFetchCategory, callFetchListBook } from '../services/api';
import BookMobileFilter from '../components/BookMobileFilter';

interface Book {
  _id: string;
  mainText: string;
  thumbnail: string;
  price: number;
  sold: number;
  category: string[];
}

interface Category {
  label: string;
  value: string;
}

interface RangeType {
  from: number;
  to: number;
}

interface FormValues {
  category?: string[];
  range?: RangeType;
}

interface PaginationType {
  current?: number;
  pageSize?: number;
}

const BookPage = () => {
  const { searchTerm } = useContext(SearchContext);
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [listBook, setListBook] = useState<Book[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [sortQuery, setSortQuery] = useState<string>('sort=-sold');
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    const initCategory = async (): Promise<void> => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d: Category[] = res.data.map((item: string) => ({
          label: item,
          value: item,
        }));
        setListCategory(d);
      }
    };
    initCategory();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery, searchTerm]);

  const fetchBook = async (): Promise<void> => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) query += `&${filter}`;
    if (sortQuery) query += `&${sortQuery}`;
    if (searchTerm) query += `&mainText=/${searchTerm}/i`;

    try {
      const res = await callFetchListBook(query);
      if (res?.data) {
        setListBook(res.data.result);
        setTotal(res.data.meta.total);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnchangePage = (pagination: PaginationType): void => {
    if (pagination?.current !== current) {
      setCurrent(pagination.current ?? 1);
    }
    if (pagination?.pageSize !== pageSize) {
      setPageSize(pagination.pageSize ?? 5);
      setCurrent(1);
    }
  };

  const handleChangeFilter = (
    _changedValues: any,
    values: FormValues,
  ): void => {
    if (_changedValues.category) {
      const cate = values.category;
      if (cate && cate.length > 0) {
        setFilter(`category=${cate.join(',')}`);
      } else {
        setFilter('');
      }
    }
  };

  const onFinish = (values: FormValues): void => {
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let f = `price>=${values.range.from}&price<=${values.range.to}`;
      if (values?.category?.length) {
        f += `&category=${values.category.join(',')}`;
      }
      setFilter(f);
    }
  };

  const items = [
    { key: 'sort=-sold', label: 'Phổ biến', children: <></> },
    { key: 'sort=-updatedAt', label: 'Hàng Mới', children: <></> },
    { key: 'sort=price', label: 'Giá Thấp Đến Cao', children: <></> },
    { key: 'sort=-price', label: 'Giá Cao Đến Thấp', children: <></> },
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

  const handleRedirectBook = (book: Book): void => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <div className='bg-gray-100 py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Breadcrumb */}
        <nav className='flex mb-4'>
          <Link to='/' className='flex items-center text-gray-600'>
            <HomeOutlined className='mr-2' />
            <span>Trang Chủ</span>
          </Link>
        </nav>

        <div className='flex flex-col md:flex-row gap-5'>
          {/* Sidebar Filter */}
          <div className='hidden md:block w-full md:w-1/4 lg:w-1/5'>
            <div className='bg-white rounded-lg p-4'>
              <div className='flex justify-between items-center mb-4'>
                <span className='flex items-center font-medium'>
                  <FilterTwoTone className='mr-2' />
                  Bộ lọc tìm kiếm
                </span>
                <ReloadOutlined
                  className='cursor-pointer'
                  onClick={() => {
                    form.resetFields();
                    setFilter('');
                    setSearchTerm('');
                  }}
                />
              </div>

              <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={handleChangeFilter}
                className='space-y-4'
              >
                {/* Category Filter */}
                <div className='border-t pt-4'>
                  <h3 className='font-medium mb-3'>Danh mục sản phẩm</h3>
                  <Form.Item name='category'>
                    <Checkbox.Group className='flex flex-col gap-2'>
                      {listCategory.map((item, index) => (
                        <Checkbox key={index} value={item.value}>
                          {item.label}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </div>

                {/* Price Range Filter */}
                <div className='border-t pt-4'>
                  <h3 className='font-medium mb-3'>Khoảng giá</h3>
                  <div className='space-y-2'>
                    <Form.Item name={['range', 'from']}>
                      <InputNumber
                        className='w-full'
                        min={0}
                        placeholder='đ TỪ'
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    </Form.Item>
                    <Form.Item name={['range', 'to']}>
                      <InputNumber
                        className='w-full'
                        min={0}
                        placeholder='đ ĐẾN'
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    </Form.Item>
                    <Button
                      type='primary'
                      onClick={() => form.submit()}
                      className='w-full'
                    >
                      Áp dụng
                    </Button>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className='border-t pt-4'>
                  <h3 className='font-medium mb-3'>Đánh giá</h3>
                  <div className='space-y-2'>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className='flex items-center'>
                        <Rate
                          value={rating}
                          disabled
                          className='text-yellow-400 text-sm'
                        />
                        {rating < 5 && (
                          <span className='ml-2 text-sm'>trở lên</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Form>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            <div className='bg-white rounded-lg p-4'>
              <Spin spinning={isLoading}>
                {/* Sort Tabs */}
                <div className='mb-4'>
                  <Tabs
                    defaultActiveKey='sort=-sold'
                    items={items}
                    onChange={setSortQuery}
                    className='overflow-x-auto'
                  />
                  <button
                    className='md:hidden flex items-center mt-4'
                    onClick={() => setShowMobileFilter(true)}
                  >
                    <FilterTwoTone className='mr-2' />
                    <span className='font-medium'>Lọc</span>
                  </button>
                </div>

                {/* Book Grid */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                  {listBook.map((book, index) => (
                    <div
                      key={index}
                      className='cursor-pointer hover:shadow-sm rounded-lg transition-shadow duration-200'
                      onClick={() => handleRedirectBook(book)}
                    >
                      <div className='bg-white rounded-lg overflow-hidden'>
                        <div className='aspect-w-1 aspect-h-1'>
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${book.thumbnail}`}
                            alt={book.mainText}
                            className=' hover:scale-110 ease-in duration-100 overflow-hidden w-full h-[170px] object-cover'
                          />
                        </div>
                        <div className='p-3'>
                          <h3 className='text-sm font-medium line-clamp-2 mb-2'>
                            {book.mainText}
                          </h3>
                          <div className='text-red-600 font-bold mb-2'>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(book.price)}
                          </div>
                          <div className='flex items-center text-sm'>
                            <Rate
                              value={5}
                              disabled
                              className='text-yellow-400 text-xs whitespace-nowrap'
                            />
                            <span className='ml-2 text-xs text-gray-500 whitespace-nowrap'>
                              Đã bán {book.sold}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {listBook.length === 0 && (
                    <div className='col-span-full'>
                      <Empty description='Không có dữ liệu' />
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className='flex justify-center mt-8'>
                  <Pagination
                    current={current}
                    total={total}
                    pageSize={pageSize}
                    onChange={(p, s) =>
                      handleOnchangePage({ current: p, pageSize: s })
                    }
                  />
                </div>
              </Spin>
            </div>
          </div>
        </div>

        {/* Mobile Filter */}
        <BookMobileFilter
          isOpen={showMobileFilter}
          setIsOpen={setShowMobileFilter}
          handleChangeFilter={handleChangeFilter}
          listCategory={listCategory}
          onFinish={onFinish}
        />
      </div>
    </div>
  );
};

export default BookPage;
