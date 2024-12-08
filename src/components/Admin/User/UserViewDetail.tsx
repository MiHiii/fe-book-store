import { Button, Drawer, Descriptions, Badge } from 'antd';
import moment from 'moment';

interface DataType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
function UserViewDetail(props: any) {
  const {
    dataViewDetail,
    setDataViewDetail,
    openModalViewDetail,
    setOpenModalViewDetail,
  } = props;

  const onClose = () => {
    setDataViewDetail(null);
    setOpenModalViewDetail(false);
  };

  return (
    <>
      <Drawer
        closable
        destroyOnClose
        width={'50vw'}
        title={<p>Chi tiết người dùng</p>}
        placement='right'
        open={openModalViewDetail}
        onClose={onClose}
      >
        <Descriptions bordered column={2} title='User Info'>
          <Descriptions.Item label='Id'>
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label='Username'>
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label='Role'>
            <Badge
              className='mr-2'
              size='small'
              status={dataViewDetail?.isActive ? 'processing' : 'default'}
            />{' '}
            {dataViewDetail?.role}
          </Descriptions.Item>
          <Descriptions.Item label='Create at'>
            {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label='Update at'>
            {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default UserViewDetail;
