import React, {createContext,useState} from 'react';
import ProductsAPI from './api/ProductApi';


//using context API for a global state
export const GlobalState = createContext();

const DataProvider = ({children}) =>{

    //initially when unique token not alloted
    const [token, setToken] = useState(false); 

    //getting data from productApi, cateogory and user API and storing it in global list


    //passing this as the global state
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI()
    }

    return (
        <GlobalState.Provider value={state}> 
            {children}
        </GlobalState.Provider>
    )
}

export default DataProvider;
