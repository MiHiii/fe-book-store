import React from 'react';
import { Form, Checkbox, InputNumber, Button, Drawer } from 'antd';
import { FilterTwoTone } from '@ant-design/icons';

interface MobileFilterProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleChangeFilter: (changedValues: any, values: any) => void;
  listCategory: Array<{ label: string; value: string }>;
  onFinish: (values: any) => void;
}

const BookMobileFilter: React.FC<MobileFilterProps> = ({
  isOpen,
  setIsOpen,
  handleChangeFilter,
  listCategory,
  onFinish,
}) => {
  const [form] = Form.useForm();

  return (
    <div className='md:hidden'>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm'
      >
        <FilterTwoTone />
        <span className='font-medium'>Bộ lọc</span>
      </button>

      {/* Filter Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white transform transition-transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <h3 className='text-lg font-medium'>Bộ lọc tìm kiếm</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-gray-500 hover:text-gray-700'
            >
              ✕
            </button>
          </div>

          {/* Filter Content */}
          <div className='p-4 h-full overflow-y-auto'>
            <Form
              form={form}
              onFinish={onFinish}
              onValuesChange={handleChangeFilter}
              className='space-y-6'
            >
              {/* Categories */}
              <div>
                <h4 className='font-medium mb-3'>Danh mục sản phẩm</h4>
                <Form.Item name='category'>
                  <Checkbox.Group className='flex flex-col space-y-2'>
                    {listCategory.map((item, index) => (
                      <Checkbox
                        key={index}
                        value={item.value}
                        className='hover:bg-gray-50 p-2 rounded'
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>

              {/* Price Range */}
              <div>
                <h4 className='font-medium mb-3'>Khoảng giá</h4>
                <div className='space-y-3'>
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
                </div>
              </div>
            </Form>
          </div>

          {/* Footer Actions */}
          <div className='border-t p-4 bg-white'>
            <div className='grid grid-cols-2 gap-4'>
              <button
                onClick={() => {
                  form.resetFields();
                  setIsOpen(false);
                }}
                className='px-4 py-2 border rounded-lg hover:bg-gray-50'
              >
                Đặt lại
              </button>
              <button
                onClick={() => {
                  form.submit();
                  setIsOpen(false);
                }}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMobileFilter;
