import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import TieFighter from '../sound/d660a0dd-f51a-47e4-9077-6fcc68f17f8b.mp3';

const PaymentScreen = () => {
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
    history('/shipping');
    }

const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    history('/placeorder');
  };

      let audio = new Audio(TieFighter);

      const tieFighter = () => {
        audio.play();
      };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
        </Form.Group>
        <Form.Group>
          <Row>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Row>
        </Form.Group>
        <Form.Group className='d-grid gap-2'>
          {' '}
          <Button
            className='btn btn-danger btn-block my-2'
            type='submit'
            onClick={tieFighter}
          >
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
