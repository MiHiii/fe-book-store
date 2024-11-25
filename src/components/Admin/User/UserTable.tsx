import React, { useEffect, useState } from 'react';
import { Space, Table, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { callGetAllUsers, deleteUser } from '../../../services/api';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface DataType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [user, setUser] = useState([]);

  const { confirm } = Modal;

  const handleEditUser = async () => {};

  const showDeleteConfirm = ($id: any) => {
    confirm({
      title: (
        <>
          <HiOutlineExclamationCircle className='text-red-500 mr-2' />
          fsaf
        </>
      ),
      icon: null,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser($id);
        setUser(user.filter((item: any) => item._id !== $id));
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await callGetAllUsers();
      const newData = data.map((item: any) => ({ ...item, key: item._id }));
      setUser(newData);
    })();
  }, []);
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Fullname',
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
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              console.log(record);
              console.log(_);
            }}
            className='text-blue-500 mr-3 hover:underline hover:text-blue-500  '
          >
            Edit
          </a>
          <a
            onClick={() => showDeleteConfirm(record._id)}
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
      <Table<DataType> columns={columns} dataSource={user} />
    </div>
  );
};

export default UserTable;
