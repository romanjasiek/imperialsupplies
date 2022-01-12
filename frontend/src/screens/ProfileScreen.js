import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetail, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const history = useNavigate();

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
        if(!user || !user.name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetail('profile'));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user.id, name: name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        <h6 className='galacticbasic'>Profile</h6>
        {message && <Message variant='secondary'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='secondary'>
            Profile updated{' '}
            <i className='fas fa-check-circle categoryColor'></i>
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Name <span className='galacticbasic__light-darkgrey'>Name</span>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>
              Email Address{' '}
              <span className='galacticbasic__light-darkgrey'>
                Email Address
              </span>
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>
              Password{' '}
              <span className='galacticbasic__light-darkgrey'>Password</span>
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter a Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>
              Confirm Password{' '}
              <span className='galacticbasic__light-darkgrey'>Confirm</span>
            </Form.Label>
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
              Update{' '}
              <span className='galacticbasic__light-darkgrey'>Update</span>
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Order History</h2>
        <h6 className='galacticbasic'>Order History</h6>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
