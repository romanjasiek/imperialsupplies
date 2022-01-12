import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import ThisIsTheWay from '../sound/cac7f9ab-f6a9-44b3-a37c-abe78d1dbd87.mp3';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const { id } = useParams();
  // const product = products.find((p) => p._id === Number(id));

  //const [product, setProduct] = useState({})

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => { 
    navigate(`/cart/${id}?qty=${qty}`);
  };

        let audio = new Audio(TieFighter2);
        let audio2 = new Audio(ThisIsTheWay);

        const start = () => {
          audio.play();
        };

        const thisistheway = () => {
          audio2.play();
        };

  return (
    <>
      <Link className='btn btn-dark my-3' onClick={start} to='/'>
        <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go back{' '}
        <span className='galacticbasic__light-darkgrey'>Go Back</span>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='price-color'>{product.name}</h3>
                <h6 className='price-color galacticbasic__small'>
                  {product.name}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor'>Brand:</strong>{' '}
                {product.brand}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor'>Category:</strong>{' '}
                {product.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor'>Price /</strong>{' '}
                <strong className='categoryColor galacticbasic'>Price:</strong>{' '}
                <span className='price-color'>{product.price} €</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor'>Description:</strong>{' '}
                {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor galacticbasic'>
                  Description:
                </strong>{' '}
                <span className='galacticbasic__light'>
                  {product.description}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong className='categoryColor'>Rating /</strong>{' '}
                <strong className='categoryColor galacticbasic'>Rating</strong>{' '}
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item className='d-grid gap-2'>
                  <Button
                    onClick={() => {
                      addToCartHandler();
                      thisistheway();
                    }}
                    className='btn btn-danger btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    <i className='fas fa-cart-arrow-down'></i> Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
