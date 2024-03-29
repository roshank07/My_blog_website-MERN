import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Component/Header';
import Footer from './Component/Footer';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './Component/PrivateRoute';
import AdminPrivateRoute from './Component/AdminPrivateRoute';
import CreatePost from './Pages/CreatePost';
import UpdatePost from './Pages/UpdatePost';
import PostPage from './Pages/PostPage';
import ScrollToTop from './Component/ScrollToTop';
import Search from './Pages/Search';
import Portfolio from './Pages/Portfolio';
import ForgetPassword from './Pages/Forget-Password';
import ResetPassword from './Pages/Reset-Password';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
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
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
      <Route path="/forget-password" element={<ForgetPassword/>} />
      <Route path="/reset-password/:userId/:token" element={<ResetPassword/>} />
      <Route path="/post/:postSlug" element={<PostPage />} />

    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}
