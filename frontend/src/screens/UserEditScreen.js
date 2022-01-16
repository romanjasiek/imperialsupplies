import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetail, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import VaderBreathing from '../sound/7164495b-0181-43ce-ac4f-ece09a9b40ea.mp3';

const UserEditScreen = () => {
        const history = useNavigate();
        const { id } = useParams();

  const userId = id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetail(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

    let audio = new Audio(TieFighter2);
    let audio2 = new Audio(VaderBreathing);

    const tieFighter2 = () => {
      audio.volume = 0.1;
      audio.play();
    };

          const start = () => {
            audio2.volume = 0.3;
            audio2.play();
          };

  return (
    <>
      <Link className='btn btn-dark my-3' onClick={tieFighter2} to='/'>
        <i className='fas fa-arrow-alt-circle-left categoryColor'></i> Go back{' '}
        <span className='galacticbasic__light-darkgrey'>Go Back</span>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

        <Form.Group className='d-grid gap-2'>
          {' '}
          <Button
            variant='primary'
            type='submit'
            className='btn btn-danger btn-block my-2'
            onClick={start}
          >
            Update
          </Button>
        </Form.Group>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
