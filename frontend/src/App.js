import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import TextScroller from './components/TextScroller';

const App = () => {
  return (
    <Router>
      <Fragment>
        <TextScroller
          text='Please note: This is NOT a real shop. No orders will be processed! Every entered data will be wiped out frequently.
          Copyrighted material is used in solely within the context of the Fair Use policy.'
        />
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/' element={<CartScreen />} />
              <Route path='/cart/:id' element={<CartScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/page/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/productlist/page/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
