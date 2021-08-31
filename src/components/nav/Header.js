import React, {useContext, useState} from 'react';
import { GlobalState } from '../../Globalstate';
import './header.css';
import Close from './headericons/close.svg';
import Cart from './headericons/cart.svg';
import Menu from './headericons/menu.svg';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';


const Header = () => {

    //getting value from global state
    const state = useContext(GlobalState);
   // console.log(state);
    const history = useHistory();
    const [isLogged,setIsLogged] = state.UserAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
    const [menu, setMenu] = useState(false);
    const [cart] = state.UserAPI.cart;

    //logout
    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin');
        
        //reloads the window 
        window.location.href = '/';
        
    }

    //admin navbar
    const adminRoute = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    //logged in navbar
    const loggedInRoute = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser} >Logout</Link></li>
            </>
        )
    }



    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="menu" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">
                    { //different for admin
                        isAdmin ? 'Admin' : 'archdeals ✔'
                    }
                    </Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">
                {isAdmin ? 'Products' : 'Shop'}
                </Link></li>

                {isAdmin && adminRoute()}
                 {
                    isLogged ? loggedInRoute() 
                    :
                    <>
                    <li><Link to='/login'>Login</Link></li>
                   <li><Link to='/register'>Register</Link></li>
                   </>
                 }
               
                <li>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>

            {
                isAdmin ? null
                 :
                 <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                 </div>
            }
          
        </header>
    )
}

export default Header
