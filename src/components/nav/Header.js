//import React, {useContext, useState} from 'react';
//import {GlobalState} from '../../Globalstate';
import './header.css';
import Close from './headericons/close.svg';
import Cart from './headericons/cart.svg';
import Menu from './headericons/menu.svg';
import {Link} from 'react-router-dom';


const Header = () => {

    //getting value from global state
  //  const contextVar = useContext(GlobalState);

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="menu" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">Arch:Deals</Link>
                </h1>
            </div>

            <ul>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>

            <div className="cart-icon">
                    <span>0</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
            </div>
        </header>
    )
}

export default Header
