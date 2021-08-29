import React,{useContext, useState, useEffect} from 'react';
import { GlobalState } from '../../../Globalstate';
import axios from 'axios';
import './cart.css';
import PaypalButton from './PaypalButton';
import { useHistory } from 'react-router';

const Cart = () => {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.UserAPI.cart;
    const [token] = state.token;  //for authorization
    const [total, setTotal] = useState(0);

    //calculating total as the cart modifies
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            },0)

            setTotal(total);
        }

        getTotal();

    },[cart])

    

    //updating cart
    const updateCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    //increment quantity
    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1;
            }
        })

        setCart([...cart]);
        updateCart(cart);
    }

    //decrement quantity
    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart]);
        updateCart(cart);
    }


    //remove item
    const removeProduct = id =>{
        //deleting that particular product
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1);
                }
            })

            setCart([...cart]);
            updateCart(cart);
        }
    }


    //only after transaction is succesfull
    const paymentSuccess = async (payment) =>{
        // console.log(payment); --> gives back all the data after payment succesfull
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([]);
        updateCart([]);
        alert("You have successfully placed an order.");
        window.location.href = '/';
    }




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

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete"  onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                   total={total}
                   paymentSuccess={paymentSuccess} 
                   />
            </div>
        </div>
    )
}

export default Cart;
