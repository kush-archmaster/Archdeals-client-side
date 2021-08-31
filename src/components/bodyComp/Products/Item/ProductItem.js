import React from 'react';
import './productitem.css';
import ButtonProduct from './ButtonProduct';

const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) => {

    
    return (
      
        <div className='container'>
            <div className="product_card">
            {
                isAdmin && <input type='checkbox' checked={product.checked}
                 onChange={() => handleCheck(product._id)}/>
                /*<img src={product.images.url} alt="" /> */
            }
            
            
            <div className="content">
                <img src={product.images.url} alt="" />

               <div className="product_box">
               <h4 title={product.title} style={{textTransform: "uppercase"}}>{product.title}</h4>
               <h3>$ {product.price}</h3>
               </div>
               <ButtonProduct product={product} deleteProduct={deleteProduct}/>

            </div>

            </div>
            
        {/*buttons to view and buy */}
          
        </div>
    )
}

export default ProductItem
