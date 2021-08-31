import React, {useContext,useState} from 'react';
import { GlobalState } from '../../../Globalstate';
import ProductItem from './Item/ProductItem';
import './products.css';
import Loader from '../Loader';
import Footer from '../../footer/Footer';
import axios from 'axios';
import { SelectAll } from '@material-ui/icons';




const Products = () => {

    const state = useContext(GlobalState);
    //console.log(state)
    const [products, setProducts] = state.productsAPI.products;
    //console.log(products)
    const [isAdmin] = state.UserAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        });
        setProducts([...products]);
    }

    //deleting a product with product id and image id to delete from db and cloudinary
    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true) //buffering
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
            window.location.reload()
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //select all products
    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck;
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    //deleting all products at once
    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loader /></div>
    return (
    <>
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className='products pp'>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                        deleteProduct={deleteProduct} handleCheck={handleCheck}
                    />
                })
            }
        </div>
        {
            products.length === 0 && <Loader />
        }
        <Footer/>
    </>  
    )
}

export default Products
