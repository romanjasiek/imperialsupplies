import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';
// import { USER_DETAIL_RESET } from '../constants/userConstants';
// import RogerRoger from '../sound/fc72e034-de5c-480c-a9f9-4f6338cbc7b5.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import EmpireThankYou from '../components/EmpireThankYou';

const OrderScreen = () => {
    // const orderId = match.params.id;
    const { id } = useParams();
    const orderId = id;


  const history = useNavigate();
  const dispatch = useDispatch();

const orderDetails = useSelector((state) => state.orderDetails);
const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

useEffect(() => {
      if (!userInfo) {
        history('/login');
      }

      if (!order || order._id !== orderId) {
    dispatch(getOrderDetails(orderId));
    // eslint-disable-next-line
      }
}, [ dispatch, history, order, orderId,userInfo ]);


  // let audio = new Audio(RogerRoger);
  let audio2 = new Audio(TieFighter2);

  // const start = () => {
  //   audio.play();
  // };

  const tieFighter2 = () => {
    audio2.volume = 0.1;
    audio2.play();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <EmpireThankYou />
      <h1>Order {order._id}</h1>
      <h6 className='galacticbasic'>Order Confirmation</h6>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <h6 className='galacticbasic'>Shipping</h6>
              <p>
                <strong className='categoryColor'>Name:</strong>{' '}
                {order.user.name}
                <br />
                <strong className='categoryColor'>Email:</strong>{' '}
                <a className='link-danger' href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
                <br />
                <strong className='categoryColor'>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelievered ? (
                <Message varaint='secondary'>Delivered {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <h6 className='galacticbasic'>Payment Method</h6>
              <p>
                <strong className='categoryColor'>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message varaint='secondary'>Paid {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              <h6 className='galacticbasic'>Order Items</h6>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>{order.itemsPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Shipping</strong>
                  </Col>
                  <Col>{order.shippingPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Tax</strong>
                  </Col>
                  <Col>{order.taxPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong className='categoryColor'>Total</strong>
                  </Col>
                  <Col>
                    <span className='price-color'>{order.totalPrice} €</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className='d-grid gap-2'></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}


export default OrderScreen;
