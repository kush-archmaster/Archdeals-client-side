import {useState, useEffect} from 'react';
import axios from 'axios';

function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [result, setResult] = useState(0);
 /*   const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1); */
   

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/products`);
             //console.log(res.data.products)
            setProducts(res.data.products);
            setResult(res.data.result);
        }
        getProducts();
    },[])
    
    return {
        products: [products, setProducts],
        result: [result, setResult]
     /*   callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        */
    }
}

export default ProductsAPI;