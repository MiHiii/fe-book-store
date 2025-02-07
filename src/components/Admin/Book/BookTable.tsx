import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Table, Modal, message } from 'antd';
import {
  callFetchListBook,
  deleteBook,
  callUpdateBook,
} from '../../../services/api';
import { TbRefresh } from 'react-icons/tb';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import BookViewDetail from './BookViewDetail';
import BookModalCreate from './BookModalCreate';

interface DataType {
  _id: string;
  thumbnail: string;
  slider: string[];
  mainText: string;
  author: string;
  price: number;
  sold: number;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const BookTable: React.FC = () => {
  const nagivate = useNavigate();

  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<DataType | null>(null);
  const [sortQuery, setSortQuery] = useState('');
  const [dataViewDetail, setDataViewDetail] = useState<DataType | null>(null);
  const [openModalViewDetail, setOpenModalViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();

  const { confirm } = Modal;

  const showDeleteConfirm = (listBook: any) => {
    confirm({
      title: (
        <div className='flex flex-row items-center  justify-items-start'>
          <div className='flex'>
            <HiOutlineExclamationCircle className='justify-items-start text-red-500 mr-2' />
          </div>
          <span>
            Are you sure delete{' '}
            <span className='text-red-500'>{listBook.mainText}</span>?{' '}
          </span>
        </div>
      ),
      icon: null,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteBook(listBook._id);
        setListBook(listBook.filter((item: any) => item._id !== listBook._id));
        message.success('Delete user success!');
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, location.pathname, location.search, sortQuery]);

  const fetchBook = async () => {
    setLoading(true);
    const author = new URLSearchParams(location.search).get('author') || '';
    const category = new URLSearchParams(location.search).get('category') || '';
    const mainText = new URLSearchParams(location.search).get('mainText') || '';
    let query = `current=${current}&pageSize=${pageSize}`;
    if (mainText !== '') {
      query += `&mainText=/${mainText}/i`;
    }
    if (author !== '') {
      query += `&author=/${author}/i`;
    }
    if (category !== '') {
      query += `&category=/${category}/i`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentBook) {
      form.setFieldsValue({
        _id: currentBook._id,
        mainText: currentBook.mainText,
        author: currentBook.author,
        price: currentBook.price,
        category: currentBook.category,
      });
    }
  }, [currentBook]);

  const onChange = (pagination: any, filter: any, sorter: any, extra: any) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === 'ascend'
          ? `&sort=${sorter.field}`
          : `&sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      width: '10%',
      render: (text: any, record, index) => {
        return (
          <a
            className='text-blue-500'
            href='#>'
            onClick={() => {
              setDataViewDetail(record);
              setOpenModalViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: 'Book Name',
      dataIndex: 'mainText',
      width: '28%',
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
      sorter: true,
      render: (text: any, record: any) => {
        return (
          <Link
            className='text-blue-500'
            to={`/admin/book?category=${record.category}`}
          >
            {record.category}
          </Link>
        );
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      width: '15%',
      sorter: true,
      render: (text: any, record: any) => {
        return (
          <Link
            className='text-blue-500'
            to={`/admin/book?author=${record.author}`}
          >
            {record.author}
          </Link>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      sorter: true,
      render: (text: any, record: any) => {
        return `${record.price.toLocaleString('vi-VN')} ₫`;
      },
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      sorter: true,
      width: '9%',
      render: (text: any, record: any) => {
        const date = new Date(record.updatedAt);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: DataType) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setCurrentBook(record);
              setOpenModal(true);
            }}
            className='text-blue-500 mr-3 hover:underline hover:text-blue-500  '
          >
            Edit
          </a>
          <a
            onClick={() => showDeleteConfirm(record)}
            className='text-red-500 hover:underline hover:text-red-500'
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  // const handleExport = async () => {
  //   const res = await callFetchAllUser();
  //   const raw_data = res.data;

  //   /* flatten objects */
  //   const rows = raw_data.map((row) => ({
  //     id: row._id,
  //     name: row.fullName,
  //     email: row.email,
  //     phone: row.phone,
  //     updateAt: row.updatedAt,
  //     createAt: row.createdAt,
  //     role: row.role,
  //   }));

  //   /* generate worksheet and workbook */
  //   const worksheet = utils.json_to_sheet(rows);
  //   const workbook = utils.book_new();
  //   utils.book_append_sheet(workbook, worksheet, 'Dates');

  //   /* fix headers */
  //   utils.sheet_add_aoa(
  //     worksheet,
  //     [['Id', 'Full Name', 'Email', 'Phone', 'Update At', 'Create At', 'Role']],
  //     { origin: 'A1' },
  //   );

  //   /* calculate column width */
  //   const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  //   worksheet['!cols'] = [{ wch: max_width }];

  //   /* create an XLSX file and try to save to Presidents.xlsx */
  //   writeFile(workbook, 'AllUser.csv', { compression: true });
  // };

  const handleUpdateBook = async () => {
    const data = form.getFieldsValue();

    const res = await callUpdateBook(data);
    if (res && res.data) {
      fetchBook();
      setOpenModal(false);
      setCurrentBook(null);
      message.success('Update book success!');
    }
  };

  const refresh = () => {
    nagivate('/admin/book');
  };
  return (
    <div className='m-4 shadow-lg rounded-lg'>
      <Table<DataType>
        columns={columns}
        onChange={onChange}
        dataSource={listBook}
        loading={loading}
        rowKey='_id'
        pagination={{
          total: total,
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          showTotal(total, range) {
            return `${range[0]} - ${range[1]} of ${total} books`;
          },
        }}
        title={() => (
          <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>List book</h1>
            <div className='flex flex-row gap-1'>
              <button
                onClick={() => setOpenModalCreate(true)}
                className='w-full px-4 py-2 mx-auto text-sm font-medium hover:text-white text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 hover:text focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
              >
                Add Book
              </button>
              <button
                className='w-full px-4 py-2 mx-auto text-sm font-medium text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
                onClick={() => {}}
              >
                Export Data
              </button>
              <button
                className='w-full px-4 py-2 mx-auto text-sm font-medium text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
                onClick={() => refresh()}
              >
                <TbRefresh />
              </button>
            </div>
          </div>
        )}
      />
      <Modal
        title='Update Book'
        open={openModal}
        onOk={() => handleUpdateBook()}
        onCancel={() => {
          setOpenModal(false);
          setCurrentBook(null);
        }}
      >
        {/* <Form form={form} name='basic' autoComplete='off'>
          <Form.Item label='Id' name='_id' hidden></Form.Item>
          <Form.Item label='Họ tên' name='fullName'>
            <Input />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='phone'>
            <Input />
          </Form.Item>
        </Form> */}
      </Modal>
      <BookViewDetail
        openModalViewDetail={openModalViewDetail}
        setOpenModalViewDetail={setOpenModalViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
      />
    </div>
  );
};

export default BookTable;
