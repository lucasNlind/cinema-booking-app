import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/NavbarElements';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
    </Router>
  
  );
}

export default App;
