import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ConfirmEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const code = params.get('code');

        if(code && userId){
            axios.get('/api/Register/confirm-email', {
                params: { userId, code }
            })
                .then(() => navigate('/', { state: { showPopup: true } }))
                .catch(() => navigate('/not-found-account'));
        }
    }, [history]);

    return <div>Підтвердження паролю...</div>;
};

export default ConfirmEmailPage;