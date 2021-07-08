import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './auth.css';

const Login = () => {

    const [user, setUser] = useState({
        email:'',
        password: ''
    });

    const onChangeInput = (event) =>{
        const {name, value} = event.target;
        setUser({...user, [name]:value})
    };

    const userLogin = async (event) =>{
        event.preventDefault()
        try {
            const res = await axios.post('/user/login', {...user});
          
            //console.log(res);
            
            if(res.data.success){
                localStorage.setItem('firstLogin', true); //store data of firstime login in local storage
                window.location.href= '/';
            }
            else if(res.data.msg || res.data.err){
                alert('Invalid Credentials');
            }
            
        } catch (err) {
            alert(err.response.data.msg);
        }

    }

    
    return (
        <div className="login-page">
            <form onSubmit={userLogin}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required 
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row ">
                    <button type="submit">Login</button>
                    <button style={{backgroundColor: 'transparent'}}> <Link to="/register" >Register</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Login;
