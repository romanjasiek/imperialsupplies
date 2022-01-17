import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from '../components/SearchBox';
import Binoculars from '../components/Binoculars';
import TieFighter2 from '../sound/c80c41f5-824d-41ea-abea-b9245e5ee8e9.mp3';
import ImperialMarch from '../sound/imperial-march-ringtone.mp3';

const Header = () => {
  
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  let audio = new Audio(TieFighter2);
  let audio2 = new Audio(ImperialMarch);

  const start = () => {
    audio.volume = 0.1;
    audio.play();
  };

  const start2 = () => {
    audio2.volume = 0.1;
    audio2.play();
  };

  return (
    <header>
      <Binoculars />
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='navbar'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='title' onClick={start}>
              <i className='fab fa-empire categoryColor' onClick={start2}></i>{' '}
              Imperial Supplies
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route renderer={(history) => <SearchBox history={history} />} /> */}
            <SearchBox />
            <Nav className='ms-auto'>
              <LinkContainer
                className='ms-2'
                onClick={start}
                to='/cart'
              >
                <Nav.Link>
                  <i className='fas fa-shopping-cart categoryColor'></i>{' '}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  className='link-danger me-n5'
                  title={`Welcome, ${userInfo.name}`}
                  id='username'
                  onClick={start}
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item onClick={start}>
                      <i className='fas fa-user-circle categoryColor'></i>{' '}
                      Profile{' '}
                      <span className='galacticbasic__light-darkgrey'>
                        Profile
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {/* <LinkContainer to='/logout'> */}
                  {/* <NavDropdown.Item onClick={logoutHandler && start}> */}
                  <NavDropdown.Item
                    onClick={() => {
                      logoutHandler();
                      start();
                    }}
                  >
                    <i className='fas fa-sign-out-alt categoryColor'></i> Logout{' '}
                    <span className='galacticbasic__light-darkgrey'>
                      Logout
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer onClick={start} to='/login'>
                  <Nav.Link>
                    <i className='fab fa-empire categoryColor'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
