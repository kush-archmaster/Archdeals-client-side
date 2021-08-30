import React, {createContext,useState, useEffect} from 'react';
import ProductsAPI from './api/ProductApi';
import UserAPI from './api/UserApi';
import CategApi from './api/CategApi';
import axios from 'axios';

//using context API for a global state
export const GlobalState = createContext();

const DataProvider = ({children}) =>{

    //initially when unique token not alloted
    const [token, setToken] = useState(false); 

   //gaining refreshtoken and setting to token state
    useEffect(() =>{
        
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token');
        
                //access token gets assigned to it
                setToken(res.data.accesstoken);
    
                //refresh token generated after a time interval
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            }
            refreshToken(); 
        }
    },[]);

     //getting data from productApi, cateogory and user API and storing it in global list
    //passing this as the global state
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        UserAPI : UserAPI(token),
        categoriesAPI : CategApi()
    }

    return (
        <GlobalState.Provider value={state}> 
            {children}
        </GlobalState.Provider>
    )
}

export default DataProvider;
