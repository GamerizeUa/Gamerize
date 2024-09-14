import WishList from "../components/WishList/WishList.jsx";
import {NavigationTabs} from "../components/common-components/NavigationTabs/NavigationTabs.jsx";
import {useNavigate} from "react-router-dom";
import useCheckAuth from "../components/hooks/useCheckAuth.js";
import {useEffect} from "react";

export default function WishListPage() {
    const navigate = useNavigate();
    const {checkAuthentication} = useCheckAuth();
    const isAuthenticated = checkAuthentication();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <NavigationTabs/>
            <WishList/>
        </>
    );
}
