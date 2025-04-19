import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          Coaching Finder
        </Link>

        {/* Search Bar */}
        <div className="flex items-center bg-white p-2 rounded-md shadow-md w-1/4">
          <input
            type="text"
            placeholder="Search Institutes"
            className="w-full px-2 py-1 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Search</button>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-white">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>

          {/* Show Login and Register if the user is not logged in */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          ) : (
            <>
              {/* Show profile info if logged in */}
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.displayName || 'User'}</span>
                <div className="relative">
                  <img
                    src={user.photoURL || 'default-profile-icon.png'} 
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <div
                    onClick={handleLogout}
                    className="absolute right-0 bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer mt-2"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
