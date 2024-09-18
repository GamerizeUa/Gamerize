import React, {Suspense, useEffect, useState} from "react";
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
import {EmailForm} from "../LoginAndRegistration/ForgotPassword/EmailForm.jsx";
import {NewPasswordForm} from "../LoginAndRegistration/ForgotPassword/ NewPasswordForm.jsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsDisplayedEmailForm,
    selectIsDisplayedLoginPopUp,
    selectIsDisplayedRegistrationPopUp
} from "../../redux/selectors.js";
import {
    assignIsDisplayedEmailForm,
    assignIsDisplayedLoginPopUp,
    assignIsDisplayedRegistrationPopUp
} from "../../redux/formsDisplaying.js";

const Layout = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const isDisplayedLoginPopUp = useSelector((state) => selectIsDisplayedLoginPopUp(state));
    const isDisplayedRegistrationPopUp = useSelector((state) => selectIsDisplayedRegistrationPopUp(state));
    const isDisplayedEmailForm = useSelector((state) => selectIsDisplayedEmailForm(state));
    const [isDisplayedNewPasswordForm, setIsDisplayedNewPasswordForm] = useState(false);
    const location = useLocation();
    const {state} = location;
    axios.defaults.withCredentials = true;

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

    useEffect(() => {
        location.pathname.includes("/reset-password")
            ? setIsDisplayedNewPasswordForm(true) : setIsDisplayedNewPasswordForm(false);
    }, []);

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
                <Header openCart={openCart} openBurgerMenu={openBurgerMenu} />
                <CategoryHeader/>
            </div>
            {burgerMenuOpen && <BurgerMenu burgerMenuClose={burgerMenuClose} />}
            {cartOpen && <Cart cartClose={cartClose}/>}
            {isDisplayedLoginPopUp && !isDisplayedRegistrationPopUp && (
                <Login />
            )}
            {isDisplayedRegistrationPopUp && (
                <Registration />
            )}
            {isDisplayedEmailForm && <EmailForm />}
            {state?.showPopup && <ConfirmEmailPopup />}
            {isDisplayedNewPasswordForm &&
                <NewPasswordForm setIsDisplayedNewPasswordForm={setIsDisplayedNewPasswordForm}/>}
            <main className={styles.container}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
