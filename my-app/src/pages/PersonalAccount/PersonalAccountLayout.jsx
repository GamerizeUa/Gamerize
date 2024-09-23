import { PersonalOffice } from '@/components/PersonalOfficeTabs/PersonalOffice.jsx';
import { PersonalAccount } from './PersonalAccount.jsx';
import useCheckAuth from '../../hooks/useCheckAuth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalAccountLayout() {
    const { checkAuthentication } = useCheckAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = checkAuthentication();
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);

    return (
        <div>
            <PersonalOffice />
            <PersonalAccount />
        </div>
    );
}
