import {useEffect, useState} from "react";
import axios from "axios";

const useCheckAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                const response = await axios.get("https://gamerize.ltd.ua/api/Account/IsAdmin");
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error("Error checking admin status", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkIsAdmin();
    }, []);

    return { isAdmin, loading };
}

export default useCheckAdmin;