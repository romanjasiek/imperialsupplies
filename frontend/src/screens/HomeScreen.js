import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const dispatch = useDispatch();


  const { keyword } = useParams();
    const match = { params: useParams() };
    const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  return (
    <>
      <h1>The Black Series</h1>
      <h6 className='galacticbasic'>The Black Series</h6>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              // className='d-flex align-self-stretch'
              className='d-flex align-items-stretch'
            >
              <Product product={product} />
            </Col>
          ))}
          <Paginate pages={pages} page={page} />
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
