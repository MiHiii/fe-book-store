import React, { useState } from 'react';
import { Button, Modal, message, Upload, Table } from 'antd';
import { FaInbox } from 'react-icons/fa';
import type { UploadProps } from 'antd/lib/upload';
import { utils, read } from 'xlsx';

const { Dragger } = Upload;
const ImportUser: React.FC = (props) => {
  interface User {
    Fullname: string;
    Email: string;
    Phone: string;
  }

  const [dataImportUser, setDataImportUser] = useState<User[]>([]);
  const { openModalImportUser, setOpenModalImportUser } = props;

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept:
      '.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();
          reader.readAsArrayBuffer(file!);
          reader.onload = function (e) {
            let data = new Uint8Array(reader.result as ArrayBuffer);
            let workbook = read(data, { type: 'array' });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // convert to json format
            const jsonData = utils.sheet_to_json(worksheet, {
              header: ['fullName', 'email', 'phone'],
              range: 1,
            });
            console.log(jsonData);
            if (jsonData && jsonData.length > 0) {
              setDataImportUser(jsonData as User[]);
            }
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleOk = () => {
    setOpenModalImportUser(false);
  };

  const handleCancel = () => {
    setOpenModalImportUser(false);
  };

  return (
    <>
      <Modal
        title='Import user'
        width={'50vw'}
        open={openModalImportUser}
        onOk={handleOk}
        okText='Import user'
        okButtonProps={{ disabled: true }}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Dragger {...uploadProps}>
          <p className='flex items-center justify-center my-5'>
            <FaInbox size={50} />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <Table
          dataSource={dataImportUser}
          style={{ marginTop: '20px' }}
          caption={
            <span className='flex justify-start my-2 font-semibold'>
              Uploaded user:
            </span>
          }
          columns={[
            { dataIndex: 'fullName', title: 'Full Name' },
            { dataIndex: 'email', title: 'Email' },
            { dataIndex: 'phone', title: 'Phone' },
          ]}
        />
      </Modal>
    </>
  );
};

export default ImportUser;
