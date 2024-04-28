import { Suspense, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import Cart from "../Cart/Cart";
import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

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
        <Header openCart={openCart} openBurgerMenu={openBurgerMenu} />
        <CategoryHeader />
      </div>
      {burgerMenuOpen && <BurgerMenu burgerMenuClose={burgerMenuClose} />}
      {cartOpen && <Cart cartClose={cartClose} />}
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
