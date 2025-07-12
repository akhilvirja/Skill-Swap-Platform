import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userProfilePic = "https://i.pravatar.cc/150?img=3";

  useEffect(() =>{
    if (localStorage.getItem("token")){
      setIsLoggedIn(true)
    }
  }, [])
  return (
      <>
    <Router>
        <Navbar isLoggedIn={isLoggedIn} userProfilePic={userProfilePic} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
      </>
  );
}

export default App;
