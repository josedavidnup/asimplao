import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import CompleteSignUp from './pages/auth/CompleteSignUp';
import { LOGGED_IN_USER } from './Redux/actions/actionTypes';
import ForgotPassword from './pages/auth/ForgotPassword';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log(idTokenResult);
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: user.displayName,
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='forgot/password' element={<ForgotPassword />} />
        <Route path='/register'>
          <Route index={true} element={<Register />} />
          <Route index={false} path='complete' element={<CompleteSignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
