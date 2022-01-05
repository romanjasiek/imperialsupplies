import React, { useEffect } from 'react';
import {
  Link,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
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
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  const productId = id;
  const qty = search ? Number(search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  //   const removeFromCartHandler = (id) => {
  //     dispatch(removeFromCart(id));
  //   };

//   const checkoutHandler = () => {
//     history.push('/login?redirect=shipping');
//   };

  return <div>Cart</div>;
};

export default CartScreen;
