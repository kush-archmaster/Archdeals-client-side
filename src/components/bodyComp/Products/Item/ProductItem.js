import React from 'react';
import { Link } from 'react-router-dom';
import './productitem.css';

const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) => {
    return (
        <div className='product_card'>

             <img src={product.images.url} alt="" />

             <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>Rs.{product.price}</span>
            </div>
        
            <div className='row_btn'>
                <Link id='btn_buy' to='#'>
                    Buy
                </Link>
                <Link id='btn_view' to={`/detail/${product._id}`}>
                    View
                </Link>
            </div>
        </div>
    )
}

export default ProductItem
