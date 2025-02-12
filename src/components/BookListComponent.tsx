import { Row, Col, Divider } from 'antd';
import BookCardComponent from './BookCardComponent';

const BookList = ({ listBook }) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-gray-900 text-center mb-8'>
        Danh Sách Sách
      </h2>
      <Row gutter={[16, 32]} justify='center'>
        {listBook.slice(0, 8).map((book) => (
          <Col
            key={book._id}
            xs={24}
            sm={12}
            md={6}
            lg={6}
            className='flex justify-center'
          >
            <BookCardComponent book={book} />
          </Col>
        ))}
        <span className='button relative text-sm font-medium text-gray-700 hover:text-gray-800'>
          View All Books →
        </span>
      </Row>
      <Divider />
    </div>
  );
};

export default BookList;
