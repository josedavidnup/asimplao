import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { useTranslation } from "react-i18next";
import CompleteSignUp from "./pages/auth/CompleteSignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Header from "./components/nav/Header";
import CustomerRoute from "./components/routes/CustomerRoute";
import RetailerRoute from "./components/routes/RetailerRoute";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { getCurrentCustomer } from "./redux/slices/customerSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(null);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        try {
          dispatch(getCurrentCustomer(idTokenResult.token));
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    navigator.language || navigator.userLanguage === "en-US"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("es");
  }, []);

  return (
    <>
      <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<CompleteSignUp />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/customer/*" element={<CustomerRoute />} />
        <Route path="/retailer/*" element={<RetailerRoute />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
