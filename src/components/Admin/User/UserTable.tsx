import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Table, Modal, Pagination } from 'antd';
import { callFetchListUser, deleteUser } from '../../../services/api';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

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
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<DataType | null>(null);
  const [form] = Form.useForm();

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
  }, [current, pageSize]);

  const featchUser = async () => {
    const query = `current=${current}&pageSize=${pageSize}`;
    const res = await callFetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
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

  const onChange = (pagination: any) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    console.log('params', pagination);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
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
      />
      <Modal
        title='Update listUser'
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
