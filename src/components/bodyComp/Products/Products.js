import React, {useContext} from 'react';
import { GlobalState } from '../../../Globalstate';
import ProductItem from './Item/ProductItem';
import './products.css';
import Loader from '../Loader';



const Products = () => {

    const state = useContext(GlobalState);
    //console.log(state)
    const [products] = state.productsAPI.products;
    //console.log(products)
    const [isAdmin] = state.UserAPI.isAdmin;
    const [token] = state.token;

    return (
    <>
        <div className='products'>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin}/>
                })
            }
        </div>
        {
            products.length === 0 && <Loader />
        }
    </>  
    )
}

export default Products
