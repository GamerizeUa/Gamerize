import WishList from './WishList.jsx';
import { PersonalOffice } from '@/components/PersonalOfficeTabs/PersonalOffice.jsx';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from '../../hooks/useCheckAuth.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { assignIsDisplayedLoginPopUp } from '../../redux/formsDisplaying.js';

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
            <PersonalOffice />
            <WishList />
        </>
    );
}
