import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import {Home, Navbar, AdminHome, AddMovie, EditMovie, ManageMovies, PricingPromo, UserPortal, ChangePassword, ForgotPassword,
  Login, Profile, EditProfile, Register, RegisterConfirmation, RegisterEmail} from './index';
{/* These are the imported components from the index.js file so it is neater in the App.js file*/}



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/editmovie' element={<EditMovie />} />
        <Route path='/managemovie' element={<ManageMovies />} />
        <Route path='/pricingpromo' element={<PricingPromo />} />
        <Route path='/userportal' element={<UserPortal />} />

        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />

        <Route path='/profile' element={<Profile />} />
        <Route path='/editprofile' element={<EditProfile />} />

        <Route path='/register' element={<Register />} />
        <Route path='/registerconfirmation' element={<RegisterConfirmation />} />
        <Route path='/registeremail' element={<RegisterEmail />} />

      </Routes>
    </Router>
  
  );
}

export default App;
