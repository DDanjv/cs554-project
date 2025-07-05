import React from 'react';
import { Link } from 'react-router-dom'; 
const Navbar = () => {
  return (
    <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary transparent-navbar" >
            <div class="container-fluid">
                <a class="navbar-brand" href="#">app</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li class="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li class="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                    </li>
                    
                    
                </ul>
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Navbar;
