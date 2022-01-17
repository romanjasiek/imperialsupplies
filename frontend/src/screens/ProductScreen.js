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
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import ThisIsTheWay from '../sound/cac7f9ab-f6a9-44b3-a37c-abe78d1dbd87.mp3';
import ElectricGlitch from '../sound/mixkit-small-electric-glitch-2595.mp3';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successProductReview, id, product._id]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  let audio = new Audio(TieFighter2);
  let audio2 = new Audio(ThisIsTheWay);
  let audio3 = new Audio(ElectricGlitch);

  const start = () => {
    audio.volume = 0.1;
    audio.play();
  };

  const thisistheway = () => {
    audio2.play();
  };

  const electricGlitch = () => {
    audio3.volume = 0.1;
    audio3.play();
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
        <>
          <Row>
            <Col md={6}>
              <Image
                onMouseEnter={electricGlitch}
                className='img-border'
                src={product.image}
                alt={product.name}
                fluid
              />
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
                  <strong className='categoryColor galacticbasic'>
                    Price:
                  </strong>{' '}
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
                  <strong className='categoryColor galacticbasic'>
                    Rating
                  </strong>{' '}
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              <h6 className='galacticbasic__small'>Reviews</h6>
              {product.reviews.length === 0 && (
                <Message>
                  No Reviews{' '}
                  <span className='galacticbasic__light-darkgrey'>
                    No Reviews
                  </span>
                </Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong className='price-color'>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a Customer Review</h3>
                  <h6 className='galacticbasic__small'>
                    Write a Customer Review
                  </h6>
                  {successProductReview && (
                    <Message variant='secondary'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>
                          Rating{' '}
                          <span className='galacticbasic__small'>Rating</span>
                        </Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>
                          Comment{' '}
                          <span className='galacticbasic__small'>Comment</span>
                        </Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className='d-grid gap-2 py-4'>
                        <Button
                          disabled={loadingProductReview}
                          className='btn btn-danger btn-block'
                          type='submit'
                          variant='danger'
                        >
                          Submit{' '}
                          <span className='galacticbasic__small'>Submit</span>
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
