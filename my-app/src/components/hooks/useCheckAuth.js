import Cookies from "js-cookie";

const useCheckAuth = () => {
    const checkAuthentication = () => {
        const isAuthenticated = Cookies.get("auth");
        return isAuthenticated === 'true';
    }


    return {checkAuthentication};
}

export default useCheckAuth;
