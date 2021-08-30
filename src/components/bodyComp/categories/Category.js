import React,{useContext,useState} from 'react';
import { GlobalState } from '../../../Globalstate';
import axios from 'axios';
import './category.css';
import { useHistory } from 'react-router-dom';

const Category = () => {
    const history = useHistory();
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories
    const [callback, setCallback] = state.categoriesAPI.callback
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [Edit, setEdit] = useState(false)
    const [id, setID] = useState('')
 
    const createCategory = async (event) =>{
              event.preventDefault();
              try {
                if(Edit){ //if editting then update the category
                    const res = await axios.put(`/api/category/${id}`, {name: category}, {
                        headers: {Authorization: token}
                    })
                    alert(res.data.msg)
                }else{ //if not present then add a new categ
                    const res = await axios.post('/api/category', {name: category}, {
                        headers: {Authorization: token}
                    })
                    alert(res.data.msg)
                }
                setEdit(false)
                setCategory('')
                setCallback(!callback)
                
                history.push('/category')
            } catch (err) {
                alert(err.response.data.msg)
            }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setEdit(true)
    }

    const deleteCategory = async (id) =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
      
            setCallback(!callback);
            history.push('/category');
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
             <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button type="submit">{Edit? "Update" : "Create"}</button>
            </form>
           
            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category
