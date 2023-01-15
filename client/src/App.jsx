import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import CompleteSignUp from './pages/auth/CompleteSignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Header from './components/nav/Header';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import { LOGGED_IN_USER } from './Redux/actions/actionTypes';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import './App.css';
import Loader from './components/loader/Loader';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log(idTokenResult);
        try {
          const res = await currentUser(idTokenResult.token);
          console.log(res.data);
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<CompleteSignUp />} />
        <Route path='/forgot/password' element={<ForgotPassword />} />
        <Route path='/user/*' element={<UserRoute />} />
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
