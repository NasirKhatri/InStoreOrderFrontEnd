import { getData } from './SetGetData';
import { BaseUrl } from './StoreContext';
import axios from 'axios';

export const addRequest = async (values, url) => {
    try {
        const user = await getData('user');
        if (user != null) {
            const token = user.Token;
            const requestBody = { ...values, clientID: user.ClientID, userID: user.UserID, roleID: user.RoleID };
            const result = await axios.post(`${BaseUrl}/${url}`, requestBody, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return {
                msg: result.data.msg,
                status: result.status
            };
        }
        else {
            return;
        }
    }

    catch (err) {
        return {
            msg: err.response.data.msg ? err.response.data.msg : "Something went wrong, Try Again",
            status: err.response.status ? err.response.status : 500
        };
    }

}