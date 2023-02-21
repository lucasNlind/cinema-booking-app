import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home, PreviewMovie, Navbar, AdminHome, AddMovie, EditMovie, AddPromo, ManageMovies, PricingPromo, UserPortal, ChangePassword, ForgotPassword,
  Login, Profile, AddPayment, Register, RegisterConfirmation, RegisterEmail, Checkout, OrderConfirmation, OrderSummary, SeatSelect, TicketSelect} from './index';
/* These are the imported components from the index.js file so it is neater in the App.js file*/



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />

{/*This single page is hard coded at the moment for the demo, since the db isn't set up */}
        <Route path="/single" element={<PreviewMovie />} />

        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/editmovie' element={<EditMovie />} />
        <Route path='/managemovie' element={<ManageMovies />} />
        <Route path='/pricingpromo' element={<PricingPromo />} />
        <Route path='/addpromo' element={<AddPromo />} />
        <Route path='/userportal' element={<UserPortal />} />

        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />

        <Route path='/profile' element={<Profile />} />
        <Route path='/addpayment' element={<AddPayment />} />

        <Route path='/register' element={<Register />} />
        <Route path='/registerconfirmation' element={<RegisterConfirmation />} />
        <Route path='/registeremail' element={<RegisterEmail />} />

        <Route path='/seatselect' element={<SeatSelect />} />
        <Route path='/ticketselect' element={<TicketSelect />} />
        <Route path='/ordersummary' element={<OrderSummary />} />
        <Route path='/checkout' element={<Checkout />} /> 
        <Route path='/orderconfirmation' element={<OrderConfirmation />} />
      </Routes>
    </Router>
  
  );
}

export default App;
