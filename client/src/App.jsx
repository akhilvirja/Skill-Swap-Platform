import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext'; // <- Import context

function App() {
  const userProfilePic = "https://i.pravatar.cc/150?img=3";

  return (
    <AuthProvider>
      <Router>
        <Navbar userProfilePic={userProfilePic} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;