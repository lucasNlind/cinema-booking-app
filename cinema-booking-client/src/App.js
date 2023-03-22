import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import { PreviewMovie, Navbar, AdminHome, AddMovie, EditMovie, AddPromo, PricingPromo, UserPortal, Checkout, OrderConfirmation, OrderSummary, SeatSelect, TicketSelect} from './index';
/* These are the imported components from the index.js file so it is neater in the App.js file*/

import Home from '../src/pages/home/Home';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import ForgotPassword from './pages/auth/ForgotPassword';

import AdminPrivateRoute from './features/auth/components/AdminPrivateRoute';
import AuthenticatedUserPrivateRoute from './features/auth/components/AuthenticatedUserPrivateRoute';
import UnauthenticatedUserPrivateRoute from './features/auth/components/UnauthenticatedUserPrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path="/single" element={<PreviewMovie />} />

        {/* ADMIN */}
        <Route path='/adminhome' element={<AdminPrivateRoute component={<AdminHome /> } /> } />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/editmovie' element={<EditMovie />} />
        <Route path='/pricingpromo' element={<PricingPromo />} />
        <Route path='/addpromo' element={<AddPromo />} />
        <Route path='/userportal' element={<UserPortal />} />
        
        {/* PROFILE */}
        <Route path='/profile' element={<AuthenticatedUserPrivateRoute page={<Profile /> } /> } />

        {/* AUTH */}
        <Route path='/login' element={<UnauthenticatedUserPrivateRoute page={ <Login /> } /> } />
        <Route path='/register' element={<UnauthenticatedUserPrivateRoute page={ <Register /> } /> } />
        <Route path='/confirm-email' element={<UnauthenticatedUserPrivateRoute page={ <ConfirmEmail /> } /> } />
        <Route path='/forgot-password' element={<UnauthenticatedUserPrivateRoute page={ <ForgotPassword /> } /> } />

        <Route path='/seatselect' element={<SeatSelect />} />
        <Route path='/ticketselect' element={<TicketSelect />} />
        <Route path='/ordersummary' element={<OrderSummary />} />
        <Route path='/checkout' element={<Checkout />} /> 
        <Route path='/orderconfirmation' element={<OrderConfirmation />} />
        <Route path='*' element={ <Navigate to='/' /> } />
      </Routes>
    </Router>
  
  );
}

export default App;
