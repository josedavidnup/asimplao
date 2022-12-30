import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import CompleteSignUp from './pages/auth/CompleteSignUp';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged;
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/register'>
          <Route index={true} element={<Register />} />
          <Route index={false} path='complete' element={<CompleteSignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
