import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ConfirmEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const code = params.get('code');

        console.log(userId, code)

        axios.post('/api/Register/confirm-email', { userId, code })
            .then(response => {
                if (response.data.success) {
                    navigate('/', { state: { showPopup: true } });
                } else {
                    navigate('/not-found-account')
                }
            })
            .catch(error => {
                console.error('Error confirming email', error);
            });
    }, [history]);

    return <div>Підтвердження паролю...</div>;
};

export default ConfirmEmailPage;