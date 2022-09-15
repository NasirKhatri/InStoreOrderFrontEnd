import axios from "axios";
import { getData } from "./SetGetData";
import { BaseUrl } from "./StoreContext";


// Get Branches of The supplier
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

// Get item categories of the supplier
export const getCategories = async (type) => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/categories/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    let categories = [];
    data.data.forEach(element => {
        categories.push({
            name: element.CategoryName,
            id: `${element.CategoryID}`
        });
    });

    if(type = 'dropdown') {
        return categories;
    }
    else {
        return data.data;
    } 
}

//Get TaxTypes of the supplier
export const getTaxTypes = async (type) => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/taxtypes/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    let taxtypes = [];
    data.data.forEach(element => {
        taxtypes.push({
            name: element.TaxName,
            id: `${element.TaxTypeID}`
        });
    });

    if(type = 'dropdown') {
        return taxtypes;
    }
    else {
        return data.data;
    } 
}

