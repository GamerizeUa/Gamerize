import Axios from "axios";

export const sendRequestWithLoading =
    async(data, link, setLoading, toDoInTimeout, toDoInCatch) => {
    let success = false;
    try {
        await Axios.post(link, data)
        success = true;
    } catch (err) {
        toDoInCatch(err.response.data);
    } finally {
        if (success) {
            setLoading(true);
            setTimeout(() => {
                toDoInTimeout();
            }, 1000);
        } else {
            setLoading(false);
        }
    }
}