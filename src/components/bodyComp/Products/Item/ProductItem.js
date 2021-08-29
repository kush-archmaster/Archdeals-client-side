import React from 'react';
import './productitem.css';
import ButtonProduct from './ButtonProduct';

const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) => {
    return (
        <div className='product_card'>
            {
                isAdmin && <input type='checkbox' checked={product.checked} />
            }

             <img src={product.images.url} alt="" />

             <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>$ {product.price}</span>
            </div>
        
        {/*buttons to view and buy */}
           <ButtonProduct product={product}/>

        </div>
    )
}

export default ProductItem
