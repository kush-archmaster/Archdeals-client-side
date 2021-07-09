import React,{useContext, useState, useEffect} from 'react';
import { GlobalState } from '../../../Globalstate';
import axios from 'axios';
import './cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.UserAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

    


    //if cart is empty
    if(cart.length === 0) 
    return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>Rs {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button > - </button>
                                <span>{product.quantity}</span>
                                <button> + </button>
                            </div>
                            
                            <div className="delete" >
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: Rs 0</h3>
                <Link to='#'>Pay</Link>
            </div>
        </div>
    )
}

export default Cart
