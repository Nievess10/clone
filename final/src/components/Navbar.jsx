import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { supabase } from '/home/nievess10/Documents/finalproject2/final-project-Nievess10-1/final/src/client.js';

const Navbar = ({ onReset, searchInput, handleSearch }) => {
  return (
    <header id="navbar">
      <h1>⚽ Football ⚽</h1>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearch}
      ></input>
      <div id="navbar-right" onClick={onReset}>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/create" className="link">
          Create A Post
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
