import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import Header from "./components/layout/Header"
import HomePage from './pages/HomePage';
import Offers from './pages/Offers';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import Createlisting from './pages/Createlisting';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/editlisting/:listingId' element={<EditListing />} />
          <Route path='/signin' element={<Signin />} />

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<Createlisting />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact/:landlordId' element={<Contact />} />


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;