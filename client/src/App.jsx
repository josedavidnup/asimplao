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
import CustomerRoute from './components/routes/CustomerRoute';
import AdminRoute from './components/routes/AdminRoute';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import './App.css';
import Loader from './components/loader/Loader';
import { getCurrentCustomer, getToken } from './redux/slices/customerSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        try {
          dispatch(getCurrentCustomer(idTokenResult.token));
          dispatch(getToken(idTokenResult.token));
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
        <Route path='/customer/*' element={<CustomerRoute />} />
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
