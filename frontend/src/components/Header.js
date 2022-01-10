import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='title'>
              <i className='fab fa-empire categoryColor'></i> Imperial Supplies
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart categoryColor'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={`Welcome, ${userInfo.name}`} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className='fas fa-user-circle categoryColor'></i>{' '}
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {/* <LinkContainer to='/logout'> */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className='fas fa-sign-out-alt categoryColor'></i>{' '}
                      Logout
                    </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fab fa-empire categoryColor'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
