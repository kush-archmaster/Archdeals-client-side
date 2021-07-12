//Master main Page
import React, {useContext} from 'react';
import { GlobalState } from '../../Globalstate';
import { Switch, Route } from 'react-router-dom';

import Products from './Products/Products';
import Cart from './Cart/Cart';
import Login from './userAuth/Login';
import Register from './userAuth/Register';
import DetailProduct from './Products/Details/DetailProduct';
import Errorpage from './Errorpage';


const Pages = () => {

  const state = useContext(GlobalState)
  const [isLogged] = state.UserAPI.isLogged
  //const [isAdmin] = state.UserAPI.isAdmin

    return (
        <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/login" exact component={isLogged ? Errorpage : Login} />
        <Route path="/register" exact component={isLogged ? Errorpage : Register} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/detail/:id" exact component={DetailProduct} />

        
        <Route path="*" exact component={Errorpage} />

  {
      /* 
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
        <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
        <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

        <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
        <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />
        
        isLogged ? NotFound :
      */
  }      
      
    </Switch>
    )
}

export default Pages
