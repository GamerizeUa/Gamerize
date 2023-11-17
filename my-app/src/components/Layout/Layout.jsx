import { Suspense } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import CategoryHeader from "../CategoryHeader/CategoryHeader";

const Layout = () => {
  return (
    <div>
      <Header />
      <CategoryHeader />
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
