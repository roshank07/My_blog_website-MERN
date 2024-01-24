import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Component/Header';

export default function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project" element={<Project />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </>
  )
}
