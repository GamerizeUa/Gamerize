import {Outlet} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import {Header} from "./Header/Header.jsx";
import {NavBar} from "./NavBar/NavBar.jsx";
import styles from "./AdminPage.module.css"
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetchStatuses} from "@/redux/statusesOrderSlice.js";

export const AdminPage = () => {
    const dispatch = useDispatch();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        dispatch(fetchStatuses())
    }, [])

    return (
        <div className={styles.wrapper}>
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
    )
}