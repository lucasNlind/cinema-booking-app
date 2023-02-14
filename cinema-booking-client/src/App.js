import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes} from 'react-router-dom';
import Navbar from './components/navbar/NavbarElements';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
{/* ADD this once we start on the profile pages
import Profile from './pages/profile/Profile';
import
*/}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
  {/*   <Route path='/profile' element={<Profile />} />
        This is the navigation bar at the top of the page, we will
        have to set it up later on how to swap the login page with
        the profile page later / remove the registered page once you
        sign in. 
  */}
      </Routes>
    </Router>
  
  );
}

export default App;
