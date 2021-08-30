import React,{useEffect,useState} from 'react';
import axios from 'axios';

const CategApi = () => {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('/api/category')
            //console.log(res.data);
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategApi
