import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import TieFighter from '../sound/d660a0dd-f51a-47e4-9077-6fcc68f17f8b.mp3';
import Lightsaber from '../sound/eab83056-9940-4be2-a5cd-4d6e2a4dbcd5.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useNavigate();

  // const productId = id;

  // const qty = search ? Number(search.split('=')[1]) : 1;
  // const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history('/login?redirect=/shipping');
  };

      let audio = new Audio(TieFighter);
      let audio2 = new Audio(Lightsaber);
      let audio3 = new Audio(TieFighter2);

      const start = () => {
        audio.volume = 0.1;
        audio.play();
      };

      const lightsaber = () => {
        audio2.volume = 0.3;
        audio2.play();
      };

      const tieFighter2 = () => {
        audio3.volume = 0.1;
        audio3.play();
      };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <h6 className='galacticbasic'>Shopping Cart</h6>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty. </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
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
                  <Col md={3}>
                    <Link
                      className='link-danger'
                      onClick={tieFighter2}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <span className='price-color'>{item.price} €</span>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      className='delete-button'
                      onClick={() => {
                        removeFromCartHandler(item.product);
                        lightsaber();
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>
                Subtotal for{' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                &nbsp;items
              </h5>
              <h3>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}{' '}
                €
              </h3>
            </ListGroup.Item>
            <ListGroup.Item className='d-grid gap-2'>
              <Button
                type='button'
                className='btn btn-danger btn-block'
                disabled={cartItems.length === 0}
                onClick={() => {
                  checkoutHandler();
                  start();
                }}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <div className='d-grid gap-2'>
          <Link className='btn btn-dark my-3' onClick={tieFighter2} to='/'>
            <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go
            back <span className='galacticbasic__light-darkgrey'>Go Back</span>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default CartScreen;
