import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Table, Modal, message } from 'antd';
import {
  callFetchListUser,
  deleteUser,
  callFetchAllUser,
  callUpdateUser,
} from '../../../services/api';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import UserViewDetail from './UserViewDetail';
import ImportUser from './ImportUser';
import { utils, writeFile } from 'xlsx';

interface DataType {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  updatedAt: string;
}

const UserTable: React.FC = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<DataType | null>(null);
  const [sortQuery, setSortQuery] = useState('');
  const [dataViewDetail, setDataViewDetail] = useState<DataType | null>(null);
  const [openModalViewDetail, setOpenModalViewDetail] = useState(false);
  const [openModalImportUser, setOpenModalImportUser] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();

  const { confirm } = Modal;

  const showDeleteConfirm = ($listUser: any) => {
    confirm({
      title: (
        <div className='flex flex-row items-center justify-space '>
          <HiOutlineExclamationCircle className='text-red-500 mr-2' />
          <span>
            Are you sure delete{' '}
            <span className='text-red-500'>{$listUser.fullName}</span>?{' '}
          </span>
        </div>
      ),
      icon: null,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser($listUser._id);
        setListUser(listUser.filter((item: any) => item._id !== $listUser._id));
        message.success('Delete user success!');
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, location.pathname, location.search, sortQuery]);

  const fetchUser = async () => {
    setLoading(true);
    const fullName = new URLSearchParams(location.search).get('fullName') || '';
    let query = `current=${current}&pageSize=${pageSize}`;
    if (fullName !== '') {
      query += `&fullName=/${fullName}/i`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await callFetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        _id: currentUser._id,
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
        updateAt: currentUser.updatedAt,
      });
    }
  }, [currentUser]);

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
      title: 'Name',
      dataIndex: 'fullName',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      sorter: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: DataType) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setCurrentUser(record);
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

  const handleExport = async () => {
    const res = await callFetchAllUser();
    const raw_data = res.data;

    /* flatten objects */
    const rows = raw_data.map((row) => ({
      id: row._id,
      name: row.fullName,
      email: row.email,
      phone: row.phone,
      updateAt: row.updatedAt,
      createAt: row.createdAt,
      role: row.role,
    }));

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [['Id', 'Full Name', 'Email', 'Phone', 'Update At', 'Create At', 'Role']],
      { origin: 'A1' },
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, 'AllUser.csv', { compression: true });
  };

  const handleUpdateUser = async () => {
    const data = form.getFieldsValue();

    const res = await callUpdateUser(data);
    if (res && res.data) {
      fetchUser();
      setOpenModal(false);
      setCurrentUser(null);
      message.success('Update user success!');
    }
  };

  return (
    <div className='m-4 shadow-lg rounded-lg'>
      <Table<DataType>
        columns={columns}
        onChange={onChange}
        dataSource={listUser}
        loading={loading}
        rowKey='_id'
        pagination={{
          total: total,
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          showTotal(total, range) {
            return `${range[0]} - ${range[1]} of ${total} users`;
          },
        }}
        title={() => (
          <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>List user</h1>
            <div className='flex flex-row gap-1'>
              <Link
                className='w-full px-4 py-2 mx-auto text-sm font-medium hover:text-white text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 hover:text focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
                to='/admin/user/add'
              >
                Add User
              </Link>
              <button
                className='w-full px-4 py-2 mx-auto text-sm font-medium text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
                onClick={() => setOpenModalImportUser(true)}
              >
                Import User
              </button>
              <button
                className='w-full px-4 py-2 mx-auto text-sm font-medium text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 flex justify-center items-center whitespace-nowrap'
                onClick={() => handleExport()}
              >
                Export Data
              </button>
            </div>
          </div>
        )}
      />
      <Modal
        title='Update User'
        open={openModal}
        onOk={() => handleUpdateUser()}
        onCancel={() => {
          setOpenModal(false);
          setCurrentUser(null);
        }}
      >
        <Form form={form} name='basic' autoComplete='off'>
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
        </Form>
      </Modal>
      <UserViewDetail
        openModalViewDetail={openModalViewDetail}
        setOpenModalViewDetail={setOpenModalViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <ImportUser
        openModalImportUser={openModalImportUser}
        setOpenModalImportUser={setOpenModalImportUser}
        fetchUser={fetchUser}
      />
    </div>
  );
};

export default UserTable;
