import { getData, removeData } from "./SetGetData";

export const HandleLogout = async (setLoggedIn) => {
    setLoggedIn(false);
    await removeData('user');
    const user = await getData('user');
    if(user != null) {
        console.log(user);
    }
    else {
        console.log('No user');
    }
} 