import React, {useContext} from 'react';
import { GlobalState } from '../../../Globalstate';
import ProductItem from './Item/ProductItem';
import './products.css';



const Products = () => {

    const state = useContext(GlobalState);
    //console.log(state)
    const [products, setProducts] = state.productsAPI.products;
    //console.log(products)

  

    return (
        <div className='products'>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product} />
                })
            }
        </div>
    )
}

export default Products
