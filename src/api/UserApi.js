import {useState, useEffect} from 'react';
import axios from 'axios';

const UserAPI = (token) =>{

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);


    //if the user has token then he has access 
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/info', {
                        headers: {Authorization: token}
                    })

                   // console.log(res);
                    setIsLogged(true);
                    //whether the user has admin access
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(res.data.cart);

                } catch (err) {
                    alert(err.response.data.msg);
                }
            }

            getUser();
            
        }
    },[token]);

    //for fetching history of user payments


    //add to cart after logged in
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying");

        //check whether this product is already added to cart or not 
        //return a boolean value
        const check = cart.every(item =>{
            return item._id !== product._id;
        });

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            //updating cart if any product added
            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        }
        //if same product was there
        else{
            alert("This product has been added to cart.")
        }
    }



return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        addCart: addCart,
        cart: [cart, setCart],
        history: [history, setHistory]
    }
}


export default UserAPI;