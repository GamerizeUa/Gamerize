import WishList from '../components/WishList/WishList.jsx';
import { NavigationTabs } from '../components/common-components/NavigationTabs/NavigationTabs.jsx';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from '../hooks/useCheckAuth.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { assignIsDisplayedLoginPopUp } from '../redux/formsDisplaying.js';

export default function WishListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkAuthentication } = useCheckAuth();
    const isAuthenticated = checkAuthentication();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            dispatch(assignIsDisplayedLoginPopUp(true));
        }
    }, []);
    return (
        <>
            <NavigationTabs />
            <WishList />
        </>
    );
}
