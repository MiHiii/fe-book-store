import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';
import { RcFile, UploadFile } from 'antd/es/upload/interface';
import { callFetchCategory } from '../../../services/api';

interface BookModalCreateProps {
  openModalCreate: boolean;
  setOpenModalCreate: (open: boolean) => void;
  fetchBook: () => Promise<void>;
}

interface Category {
  label: string;
  value: string;
}

const BookModalCreate: React.FC<BookModalCreateProps> = (props) => {
  const { openModalCreate, setOpenModalCreate, fetchBook } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSlider, setLoadingSlider] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const categories = res.data.map((item: string) => ({
          label: item,
          value: item,
        }));
        setListCategory(categories);
      }
    };
    fetchCategory();
  }, []);

  const onFinish = async (values: any) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateAUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success('Tạo mới user thành công');
      form.resetFields();
      setOpenModalCreate(false);
      await fetchBook();
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>, type?: string) => {
    if (info.file.status === 'uploading') {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFile = ({
    file,
    onSuccess,
    onError,
  }: {
    file: RcFile;
    onSuccess: (response: string) => void;
    onError: (error: Error) => void;
  }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 1000);
  };

  return (
    <>
      <Modal
        title='Thêm mới book'
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText='Tạo mới'
        cancelText='Hủy'
        confirmLoading={isSubmit}
        width='50vw'
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Tên sách'
                name='mainText'
                rules={[
                  { required: true, message: 'Vui lòng nhập tên hiển thị!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Tác giả'
                name='author'
                rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Giá tiền'
                name='price'
                rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  addonAfter='VND'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Thể loại'
                name='category'
                rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
              >
                <Select
                  defaultValue={null}
                  showSearch
                  allowClear
                  options={listCategory}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Số lượng'
                name='quantity'
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Đã bán'
                name='sold'
                rules={[
                  { required: true, message: 'Vui lòng nhập số lượng đã bán!' },
                ]}
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Ảnh Thumbnail'
                name='thumbnail'
              >
                <Upload
                  name='thumbnail'
                  listType='picture-card'
                  className='avatar-uploader'
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFile}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Ảnh Slider'
                name='slider'
              >
                <Upload
                  multiple
                  name='slider'
                  listType='picture-card'
                  className='avatar-uploader'
                  customRequest={handleUploadFile}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, 'slider')}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default BookModalCreate;
