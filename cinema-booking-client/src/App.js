import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

/* These are the imported components from the index.js file so it is neater in the App.js file*/

import Home from '../src/pages/home/Home';
import AdminConsole from './pages/admin/AdminConsole';
import MoviePage from './pages/booking/MoviePage';

import NavigationBar from './components/navbar/NavigationBar.component';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import ForgotPassword from './pages/auth/ForgotPassword';

import AdminPrivateRoute from './features/auth/components/AdminPrivateRoute';
import AuthenticatedUserPrivateRoute from './features/auth/components/AuthenticatedUserPrivateRoute';
import UnauthenticatedUserPrivateRoute from './features/auth/components/UnauthenticatedUserPrivateRoute';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BookingFlow from './pages/booking/BookingFlow';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <NavigationBar />
        <Routes>

          <Route exact path='/' element={ <Home />} />
          <Route path='/movie' element={ <MoviePage /> } />
          <Route path='/movie/book' element={ <AuthenticatedUserPrivateRoute page={<BookingFlow /> } /> } />

          {/* ADMIN */}
          <Route path='/admin' element={ <AdminPrivateRoute page={ <AdminConsole /> } /> } />
          
          {/* PROFILE */}
          <Route path='/profile' element={ <AuthenticatedUserPrivateRoute page={ <Profile /> } /> } />

          {/* AUTH */}
          <Route path='/login' element={ <UnauthenticatedUserPrivateRoute page={ <Login /> } /> } />
          <Route path='/register' element={ <UnauthenticatedUserPrivateRoute page={ <Register /> } /> } />
          <Route path='/confirm-email' element={ <UnauthenticatedUserPrivateRoute page={ <ConfirmEmail /> } /> } />
          <Route path='/forgot-password' element={ <UnauthenticatedUserPrivateRoute page={ <ForgotPassword /> } /> } />

        </Routes>
      </Router>
    </LocalizationProvider>
    
  
  );
}

export default App;
