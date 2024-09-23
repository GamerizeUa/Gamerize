import { NavigationTabs } from '../../components/common-components/NavigationTabs/NavigationTabs.jsx';
import { PersonalAccount } from './PersonalAccount/PersonalAccount.jsx';
import useCheckAuth from '../../hooks/useCheckAuth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalAccountPage() {
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
            <NavigationTabs />
            <PersonalAccount />
        </div>
    );
}
