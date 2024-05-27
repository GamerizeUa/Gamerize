import React, { Suspense, useEffect, useState } from "react";
import Header from "../Header/Header";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import Cart from "../Cart/Cart";
import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";
import {Login} from "../LoginAndRegistration/Login.jsx";
import {ConfirmEmailPopup} from "../LoginAndRegistration/ConfirmEmail/ConfirmEmailPopup.jsx";
import {Registration} from "../LoginAndRegistration/Registration.jsx";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [isDisplayedLoginPopUp, setIsDisplayedLoginPopUp] = useState(false);
  const [isDisplayedRegistrationPopUp, setIsDisplayedRegistrationPopUp] =
      useState(false);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (cartOpen || burgerMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [cartOpen, burgerMenuOpen]);

  function openCart() {
    setCartOpen(true);
  }

  function cartClose() {
    setCartOpen(false);
  }

  function openBurgerMenu() {
    setBurgerMenuOpen(true);
  }

  function burgerMenuClose() {
    setBurgerMenuOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <Header openCart={openCart} openBurgerMenu={openBurgerMenu}
                setIsDisplayedLoginPopUp={setIsDisplayedLoginPopUp} />
        <CategoryHeader />
      </div>
      {burgerMenuOpen && <BurgerMenu burgerMenuClose={burgerMenuClose}
                                     setIsDisplayedLoginPopUp={setIsDisplayedLoginPopUp} />}
      {cartOpen && <Cart cartClose={cartClose} />}
      {isDisplayedLoginPopUp && !isDisplayedRegistrationPopUp && (
          <Login setDisplayedLoginPopUp={setIsDisplayedLoginPopUp}
                 setIsDisplayedRegistrationPopUp={setIsDisplayedRegistrationPopUp}/>
      )}
      {isDisplayedRegistrationPopUp && (
          <Registration
              setIsDisplayedRegistrationPopUp={setIsDisplayedRegistrationPopUp}
              setDisplayedLoginPopUp={setIsDisplayedLoginPopUp}
          />
      )}
      {state?.showPopup &&
          <ConfirmEmailPopup setIsDisplayedLoginPopUp={setIsDisplayedLoginPopUp} />}
      <main className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
