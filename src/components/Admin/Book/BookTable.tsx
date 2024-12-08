import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Table, Modal, Pagination, Button } from 'antd';
import { callFetchListUser, deleteUser } from '../../../services/api';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

interface DataType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
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
  const [form] = Form.useForm();

  const location = useLocation();

  const { confirm } = Modal;

  const handleOk = (listUser: any) => {
    setCurrentUser(listUser);
    setOpenModal(true);
  };

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
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    featchUser();
  }, [current, pageSize, location.search, sortQuery]);

  const featchUser = async () => {
    setLoading(true);
    const fullName = new URLSearchParams(location.search).get('fullName') || '';
    console.log(fullName);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (fullName !== '') {
      query += `&fullName=/${fullName}/i`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await callFetchListUser(query);
    console.log(res);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
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
            onClick={() => handleOk(record)}
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

  return (
    <div className='m-4 shadow-lg rounded-lg'>
      <Table<DataType>
        columns={columns}
        onChange={onChange}
        dataSource={listUser}
        rowKey='_id'
        pagination={{
          total: total,
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
        }}
        title={() => (
          <div className='flex justify-end'>
            <Link
              className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
              to='/admin/user/add'
            >
              Add User
            </Link>
            <button
              className='bg-green-500 text-white px-4 py-2 rounded'
              onClick={() => console.log('Export Data')}
            >
              Export Data
            </button>
          </div>
        )}
      />
      <Modal
        title='Update list User'
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setOpenModal(false);
          setCurrentUser(null);
        }}
      >
        <Form form={form} name='basic' autoComplete='off'>
          <Form.Item label='Họ tên' name='fullName'>
            <Input />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='phone'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
