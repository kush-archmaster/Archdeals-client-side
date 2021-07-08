import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = (event) =>{
        const {name, value} = event.target;
        setUser({...user, [name]:value})
    }

    const register = async (event) =>{
        event.preventDefault()
        try {
           const res =  await axios.post('/user/register', {...user});

            if(res.data.success){
                localStorage.setItem('firstLogin', true); //store data of firstime login in local storage
                history.push('/');
                alert('Registered Succesfully');
            }
            else if(res.data.msg || res.data.err){
                alert('Invalid Credentials');
            }

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={register}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" >Register</button>
                   <button style={{backgroundColor: 'transparent'}}> <Link to="/login">Login</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Register;
