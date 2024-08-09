import {Outlet} from "react-router-dom";
import React, {Suspense} from "react";
import {Header} from "./Header/Header.jsx";
import {NavBar} from "./NavBar/NavBar.jsx";
import styles from "./AdminPage.module.css"


export const AdminPage = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header/>
                <div className={styles.main_section}>
                    <NavBar/>
                    <main>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet/>
                        </Suspense>
                    </main>
                </div>
            </div>
        </div>
    )
}