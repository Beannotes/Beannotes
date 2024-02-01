import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            {user?.displayName ? (
        <Link onClick={handleSignOut}>Logout</Link>
      ) : (
        <Link to='/signin'>Sign in</Link>
      )}
        </nav>
  );
};

export default Navbar;