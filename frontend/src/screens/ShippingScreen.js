import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import TieFighter from '../sound/d660a0dd-f51a-47e4-9077-6fcc68f17f8b.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

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
    let audio2 = new Audio(TieFighter2);

    const start = () => {
      audio.volume = 0.1;
      audio.play();
    };

        const tieFighter = () => {
          audio2.volume = 0.1;
          audio2.play();
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
        <div className='d-grid gap-2'>
          <Link className='btn btn-dark' onClick={tieFighter} to='/'>
            <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go
            back <span className='galacticbasic__light-darkgrey'>Go Back</span>
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
