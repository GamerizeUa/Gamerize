import axios from 'axios';

export const getAccountInformation = async () => {
    const res = await axios.get('https://gamerize.ltd.ua/api/Account/profile', {
        withCredentials: true,
    });

    return res.data;
};
