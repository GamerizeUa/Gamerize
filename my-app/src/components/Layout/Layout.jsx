import { Suspense, useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import Cart from "../Cart/Cart";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function cartClose() {
    setCartOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <Header openCart={openCart} />
      <CategoryHeader />
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
