import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { GlobalState } from '../../../../Globalstate';
import './detail.css';
import ProductItem from '../Item/ProductItem'

const DetailProduct = () => {
    
    const params = useParams(); //getting the id of the product
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products; //list of all the products
    const addCart = state.UserAPI.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) 
                      setDetailProduct(product);
            })
        }
    },[params.id, products]);

    if(detailProduct.length === 0) return null;
    //console.log(detailProduct)
    return (
    <>
        <div className='detail'>
              <img src={detailProduct.images.url} alt="" />
              <div className="box-detail">
                    <div className="row dis">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>Rs. {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart" onClick={
                        ()=> addCart(detailProduct)
                    }>
                        Buy Now
                    </Link>
                </div>
        </div>
         
         <div>
            <h2 style={{textAlign:'center'}}>Related products</h2>
            <div className="products">
                    {
                        products.map(product => {
                            return (product.category === detailProduct.category && product._id!== detailProduct._id)
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
            </div>
        </div>
    </>
    )
}

export default DetailProduct
