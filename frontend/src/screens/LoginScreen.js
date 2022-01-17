import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import VaderBreathing from '../sound/7164495b-0181-43ce-ac4f-ece09a9b40ea.mp3';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const history = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //   const redirect = location.search.split('=')[1];
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  let audio = new Audio(VaderBreathing);
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
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='d-grid gap-2'>
          {' '}
          <Button
            variant='primary'
            type='submit'
            className='btn btn-danger btn-block my-2'
            onClick={start}
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <Row className='py-3'>
        <Col className='d-flex justify-content-between'>
          New Customer?{' '}
          <Link
            onClick={tieFighter2}
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className='px-2 link-danger'
          >
            <i className='fab fa-empire categoryColor px-1'></i>Sign up here
          </Link>
          <Link className='ms-auto link-secondary' to='/'>
            <i className='fas fa-arrow-alt-circle-left categoryColor px-1'></i>
            Go back
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
