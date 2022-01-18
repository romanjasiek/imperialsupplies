import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

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

  let audio = new Audio(TieFighter2);

        const tieFighter2 = () => {
          audio.volume = 0.1;
          audio.play();
        };


  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className='btn btn-dark my-3' onClick={tieFighter2} to='/'>
          <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go back{' '}
          <span className='galacticbasic__light-darkgrey'>Go Back</span>
        </Link>
      )}
      <h1 className='h1__centered'>The Black Series</h1>
      <h6 className='h1__centered galacticbasic'>The Black Series</h6>
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
