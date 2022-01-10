import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const { search } = useLocation();
  const history = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  //   const redirect = location.search.split('=')[1];
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
    } else {
        dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='secondary'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter a Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='d-grid gap-2'>
          {' '}
          <Button
            variant='primary'
            type='submit'
            className='btn btn-danger btn-block my-2'
          >
            Register
          </Button>
        </Form.Group>
      </Form>
      <Row className='py-3'>
        <Col className='d-flex justify-content-between'>
          Already a Customer?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className='px-2 link-danger'
          >
            <i className='fab fa-empire categoryColor px-1'></i>Sign in
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

export default RegisterScreen;
