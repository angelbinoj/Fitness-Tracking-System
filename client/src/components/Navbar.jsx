import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 shadow flex justify-between">
      <h1>Fitness App</h1>

      <ul className="flex gap-6">
        <a href="#hero" className="cursor-pointer">Home</a>
        <a href="#about" className="cursor-pointer">About</a>
        <a href="#features" className="cursor-pointer">Services</a>
        <a href="#contact" className="cursor-pointer">Trainers</a>

        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </ul>
    </nav>
  );
}
