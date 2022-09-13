import axios from "axios";
import { getData } from "./SetGetData";
import { BaseUrl } from "./StoreContext";

export const getBranches = async (type) => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/branches/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    let branches = [];
    data.data.forEach(element => {
        branches.push({
            name: element.BranchName,
            id: `${element.BranchID}`
        });
    });

    if(type = 'dropdown') {
        return branches;
    }
    else {
        return data.data;
    } 
}
