import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import TieFighter from '../sound/d660a0dd-f51a-47e4-9077-6fcc68f17f8b.mp3';

const ShippingScreen = () => {
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    // setTimeout(() => {
    //   history('/payment');
    // }, 1000);
      history('/payment');
  };

    let audio = new Audio(TieFighter);

    const start = () => {
      audio.play();
    };


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <h6 className='galacticbasic'>Shipping</h6>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>
            Address{' '}
            <span className='galacticbasic__light-darkgrey'>Address</span>
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>
            City <span className='galacticbasic__light-darkgrey'>City</span>
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>
            Postal Code{' '}
            <span className='galacticbasic__light-darkgrey'>Postal Code</span>
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>
            Country{' '}
            <span className='galacticbasic__light-darkgrey'>Country</span>
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='d-grid gap-2'>
          {' '}
          <Button
            className='btn btn-danger btn-block my-2'
            type='submit'
            onClick={start}
          >
            Continue{' '}
            <span className='galacticbasic__light-darkgrey'>Continue</span>
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
