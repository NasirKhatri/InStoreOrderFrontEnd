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

    if (type = 'dropdown') {
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
    let url;
    if(type === "POS") {
        url = `${BaseUrl}/categories/${user.ClientID}/POS`;

    }
    else {
        url = `${BaseUrl}/categories/${user.ClientID}`;
    }
    console.log(url);
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (type === 'dropdown') {
        let categories = [];
        data.data.forEach(element => {
            categories.push({
                name: element.CategoryName,
                id: `${element.CategoryID}`
            });
        });
        return categories;
    }
    else {
        return data.data;
    }
}


// Get item items of the supplier
export const getItems = async (type) => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/items/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (type === 'dropdown') {
        let items = [];
        data.data.forEach(element => {
            items.push({
                name: element.ItemName,
                id: `${element.ItemID}`
            });
        });
        return items;
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
    return taxtypes;
}

// Get TaxTypeDetail
export const getTaxTypesDetails = async () => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/taxtypes/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return data.data;
}

// Get item items of the supplier
export const getCustomers = async (type) => {
    const user = await getData('user');
    const token = user.Token;
    const url = `${BaseUrl}/customers/${user.ClientID}`;
    const data = await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (type === 'dropdown') {
        let customers = [];
        data.data.forEach(element => {
            customers.push({
                name: element.CustomerName,
                id: `${element.CustomerID}`
            });
        });
        return customers;
    }
    else {
        return data.data;
    }
}


