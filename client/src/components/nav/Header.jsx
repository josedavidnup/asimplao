import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../assets/images/asimplao_logo.png";
import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineOrderedList,
} from "react-icons/ai";
import {
  MdLogout,
  MdLogin,
  MdOutlineFavorite,
  MdResetTv,
  MdLightMode,
  MdNightlight,
  MdOutlineSearch,
} from "react-icons/md";
import spanish from "../../assets/images/spanish.png";
import english from "../../assets/images/english.png";
import { logOutCustomer } from "../../redux/slices/customerSlice";
import DropDownMenu from "./DropDownMenu";

const Header = ({ handleThemeSwitch, theme }) => {
  const [t, i18n] = useTranslation("global");
  const { customer } = useSelector((state) => ({ ...state }));
  const [dropdown, setDropdown] = useState(false);
  const [lan, setLan] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    signOut(auth);
    dispatch(logOutCustomer());
    navigate("/login");
  };

  const handleLanguageSwitch = () => {
    lan === "en-US"
      ? i18n.changeLanguage("es") && setLan("es-ES")
      : i18n.changeLanguage("en") && setLan("en-US");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const account = [
    {
      label: <Link to={`/`}>Home</Link>,
      key: "home",
      icon: <AiOutlineHome />,
    },
    {
      key: "whishlist",
      icon: <MdOutlineFavorite />,
    },
    {
      label: <Link to={`/`}>Cart</Link>,
      key: "cart",
      icon: <FiShoppingCart />,
    },
    {
      label: (
        <Link
          to={
            customer.role === "retailer"
              ? `retailer/account`
              : `customer/account`
          }
        >
          {customer?.name
            ? `Hi, ${customer.name.split(" ")[0]}`
            : customer?.email
            ? `Hi, ${customer.email.split("@")[0]}`
            : `Hi`}
        </Link>
      ),
      key: "SubMenu",
      icon: <VscAccount />,
      children: [
        {
          label:
            customer?.role === "retailer" ? (
              <Link to={`/retailer/account`}>Retailer Account</Link>
            ) : (
              <Link to={`/customer/account`}>Account</Link>
            ),
          key: "account",
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/customer/password`}>Password</Link>,
          key: "password",
          icon: <MdResetTv />,
        },
        {
          label: <Link to={`/customer/history`}>History</Link>,
          key: "history",
          icon: <AiOutlineOrderedList />,
        },
        {
          label: <Link to={`/customer/wishlist`}>Wishlist</Link>,
          key: "wishlist",

          icon: <MdOutlineFavorite />,
        },
        {
          label: "Log out",
          icon: <MdLogout />,
          onClick: signout,
          danger: true,
        },
      ],
    },
  ];
  const logOut = [
    {
      label: <Link to={`/`}>Home</Link>,
      key: "home",
      icon: <AiOutlineHome />,
    },
    {
      key: "wishlist",
      icon: <MdOutlineFavorite />,
    },
    {
      label: <Link to={`/`}>Cart</Link>,
      key: "cart",
      icon: <FiShoppingCart />,
    },
    {
      label: (
        <Link
          to={
            customer.role === "retailer"
              ? `retailer/account`
              : `customer/account`
          }
        >
          Account
        </Link>
      ),
      key: "SubMenu",
      icon: <VscAccount />,
      children: [
        {
          label: <Link to={`/login`}>Login</Link>,
          key: "login",
          icon: <MdLogin />,
        },
        {
          label: <Link to={`/register`}>Sign Up</Link>,
          key: "register",
          icon: <AiOutlineUserAdd />,
        },
        {
          label: "Log out",
          icon: <MdLogout />,
          onClick: signout,
          danger: true,
        },
      ],
    },
  ];

  useEffect(() => {
    setLan(navigator.language || navigator.userLanguage);
  }, []);
  return (
    <>
      <Menu
        className="header bg-green-800 "
        mode="horizontal"
        defaultSelectedKeys={[window.location.pathname]}
        items={!customer?.email ? logOut : account}
      />
      <header className="bg-green-800 text-white pb-2 dark:bg-slate-900 dark:text-gray-100 duration-100 flex flex-col md:flex-row justify-around">
        <figure className="w-20 inline">
          <Link to={"/"}>
            <img src={logo} alt="asimplao-logo" />
          </Link>
        </figure>
        <form
          onSubmit={handleOnSubmit}
          className="order-3 md:order-none bg-slate-200 h-8 flex self-center items-center rounded-lg"
        >
          <input type="text" className="bg-slate-200" />
          <button type="submit">
            <MdOutlineSearch className="fill-slate-800" />
          </button>
        </form>
        <div className="flex flex-col justify-around">
          <div className="flex justify-end gap-2">
            <button onClick={handleLanguageSwitch}>
              {lan === "en-US" ? (
                <img src={spanish} alt="spanish" className=" w-6 h-6" />
              ) : (
                <img src={english} alt="english" className=" w-6 h-6" />
              )}
            </button>
            <button onClick={handleThemeSwitch}>
              {theme === "dark" ? (
                <MdLightMode className="fill-orange-500 w-6 h-6" />
              ) : (
                <MdNightlight className="fill-slate-800 w-6 h-6" />
              )}
            </button>
          </div>
          <nav className="flex justify-end">
            <ul className="flex space-x-7 items-center">
              <li className="flex xs:hidden md:block ">
                <Link to={"/"} className="flex flex-row space-x-1 items-center">
                  <AiOutlineHome />
                  <span>{t("header.home")}</span>
                </Link>
              </li>
              <li className="xs:hidden md:block">
                <MdOutlineFavorite className="md:cursor-pointer" />
              </li>
              <li>
                <FiShoppingCart className="md:cursor-pointer" />
              </li>
              <li
                className="relative flex space-x-5 flex-col"
                onPointerEnter={() => setDropdown(!dropdown)}
              >
                <Link
                  to={
                    customer.role === "retailer"
                      ? `retailer/account`
                        ? customer.role === "customer"
                        : `customer/account`
                      : `/`
                  }
                  className="flex flex-row space-x-1 items-center"
                >
                  <VscAccount />
                  {customer?.name ? (
                    <span className="xs:hidden md:block">
                      {t("header.hi")}, {customer.name.split(" ")[0]}
                    </span>
                  ) : customer?.email ? (
                    <span className="xs:hidden md:block">
                      `${t("header.hi")}, ${customer.email.split("@")[0]}`
                    </span>
                  ) : (
                    `Sign in`
                  )}
                </Link>
                {dropdown && (
                  <DropDownMenu
                    dropdown={dropdown}
                    customer={customer}
                    signout={signout}
                  />
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
