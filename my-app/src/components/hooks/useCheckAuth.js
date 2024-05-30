import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkAuth} from "../../redux/authorizationSlice.js";

const useCheckAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated} = useSelector((state) => state.authorization);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])

    return isAuthenticated;
}

export default useCheckAuth;