import { Drawer, Descriptions } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface DataType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
function BookViewDetail(props: any) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    dataViewDetail,
    setDataViewDetail,
    openModalViewDetail,
    setOpenModalViewDetail,
  } = props;
  useEffect(() => {
    if (dataViewDetail) {
      let imgThumnail: any = {},
        imgSlider: UploadFile[] = [];
      if (dataViewDetail.thumbnail) {
        imgThumnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataViewDetail.thumbnail
          }`,
        };
      }
      if (dataViewDetail.slider && dataViewDetail.slider.length > 0) {
        dataViewDetail.slider.map((item: any, index: number) =>
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: 'done',
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          }),
        );
      }
      setFileList([imgThumnail, ...imgSlider]);
    }
  }, [dataViewDetail]);

  const onClose = () => {
    setDataViewDetail(null);
    setOpenModalViewDetail(false);
  };

  console.log('dataViewDetail', dataViewDetail);
  const handlePreview = async (file: any) => {
    setFileList(dataViewDetail?.thumbnail);
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <Drawer
        closable
        destroyOnClose
        width={'50vw'}
        title={<p>Book details</p>}
        placement='right'
        open={openModalViewDetail}
        onClose={onClose}
      >
        <Descriptions bordered column={2} title='User Info'>
          <Descriptions.Item label='Id'>
            <span className='whitespace-nowrap'>{dataViewDetail?._id}</span>
          </Descriptions.Item>
          <Descriptions.Item label='Book name'>
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label='Author'>
            {dataViewDetail?.author}
          </Descriptions.Item>
          <Descriptions.Item label='Price'>
            {dataViewDetail?.price}
          </Descriptions.Item>
          <Descriptions.Item span={2} label='Category'>
            {dataViewDetail?.category}
          </Descriptions.Item>
          <Descriptions.Item label='Create at'>
            {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label='Update at'>
            {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
          </Descriptions.Item>
          <div>
            <h1 className='font-bold'>Book Images</h1>
            <Upload
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
            ></Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default BookViewDetail;
