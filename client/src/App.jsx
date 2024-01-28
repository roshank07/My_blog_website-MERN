import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Component/Header';
import Footer from './Component/Footer';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './Component/PrivateRoute';
import AdminPrivateRoute from './Component/AdminPrivateRoute';
import CreatePost from './Pages/CreatePost';
import UpdatePost from './Pages/UpdatePost';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<AdminPrivateRoute />} >
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/updatepost/:postId" element={<UpdatePost />} />
      </Route>
      <Route path="/project" element={<Project />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}
