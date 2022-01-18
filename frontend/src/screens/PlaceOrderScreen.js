import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAIL_RESET } from '../constants/userConstants';
import RogerRoger from '../sound/fc72e034-de5c-480c-a9f9-4f6338cbc7b5.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

const PlaceOrderScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history('/shipping');
  } else if (!cart.paymentMethod) {
    history('/payment');
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
      dispatch({ type: USER_DETAIL_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  let audio = new Audio(RogerRoger);
  let audio2 = new Audio(TieFighter2);

  const start = () => {
    audio.volume = 0.1;
    audio.play();
  };

  const tieFighter2 = () => {
    audio2.volume = 0.1;
    audio2.play();
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <h6 className='galacticbasic'>Shipping</h6>
              <p>
                <strong className='categoryColor'>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <h6 className='galacticbasic'>Payment Method</h6>
              <strong className='categoryColor'>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              <h6 className='galacticbasic'>Order Items</h6>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            className='img-border'
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className='link-danger'
                            onClick={tieFighter2}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} € =
                          <span className='price-color px-1'>
                            {item.qty * item.price} €
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <h6 className='galacticbasic__darkgrey'>Order Summary</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Items</strong>
                  </Col>
                  <Col>{cart.itemsPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Shipping</strong>
                  </Col>
                  <Col>{cart.shippingPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Tax</strong>
                  </Col>
                  <Col>{cart.taxPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Total</strong>
                  </Col>
                  <Col>
                    <span className='price-color'>{cart.totalPrice} €</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className='d-grid gap-2'>
                <Button
                  type='button'
                  className='btn btn-danger btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={() => {
                    placeOrderHandler();
                    start();
                  }}
                >
                  Place Order{' '}
                  <span className='galacticbasic__light-darkgrey'>
                    Place Order
                  </span>
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <div className='d-grid gap-2'>
            <Link className='btn btn-dark my-3' onClick={tieFighter2} to='/'>
              <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go
              back{' '}
              <span className='galacticbasic__light-darkgrey'>Go Back</span>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
