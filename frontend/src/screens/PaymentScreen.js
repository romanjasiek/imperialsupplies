import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import TieFighter from '../sound/d660a0dd-f51a-47e4-9077-6fcc68f17f8b.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

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
      let audio2 = new Audio(TieFighter2);

      const tieFighter = () => {
        audio.volume = 0.1;
        audio.play();
      };

            const tieFighter2 = () => {
              audio2.volume = 0.1;
              audio2.play();
            };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <h6 className='galacticbasic'>Payment Method</h6>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>
            Select Payment Method{' '}
            <span className='galacticbasic__darkgrey'>Payment Method</span>
          </Form.Label>
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
            Continue{' '}
            <span className='galacticbasic__light-darkgrey'>Continue</span>
          </Button>
        </Form.Group>
        <div className='d-grid gap-2'>
          <Link className='btn btn-dark' onClick={tieFighter2} to='/'>
            <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go
            back <span className='galacticbasic__light-darkgrey'>Go Back</span>
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
