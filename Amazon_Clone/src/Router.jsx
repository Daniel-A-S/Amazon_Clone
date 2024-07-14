import React from 'react';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripepe} from '@stripe/stripe-js';
import protectedRoute from './Component/protectedroute/protectedRoute';


const stripePromise = loadStripe("pk_test_51PZMtrCa6LYAMmA8wjVRDQKylswXKl28xSPIHUIV6N1oH6Fp3nKF51EkSFSsJ7w3AbOXPSdiQODOdvIeORM6RTVj00K4qrKxIe")


function Routing () {


  return (
      <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/payments' element={
              <protectedRoute msg={"you must log in to pay"} redirect ={"/payments"}>
                <Elements stripe={stripePromise}>
            <Payment/>
            </Elements>
              </protectedRoute>
            }/>
            <Route path='/orders' element={
              <protectedRoute 
              msg={"you must log in to see your orders"}
              redirect= {"/orders"}
              >
              <Orders/>
              

              </protectedRoute>
            }/>
              
              
            <Route Path='/category/:categoryName' element={<Results />}/>
            <Route Path='/products/:productId' element={<ProductDetail />}/>

            <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>
  )
}

export default Routing;
