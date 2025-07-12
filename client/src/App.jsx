import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const isLoggedIn = true;
  const userProfilePic = "https://i.pravatar.cc/150?img=3";  

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
