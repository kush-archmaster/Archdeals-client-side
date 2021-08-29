import React, {useContext, useEffect} from 'react';
import { GlobalState } from '../../../Globalstate';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './history.css';

const Orderhistory = () => {

    const state = useContext(GlobalState);
    const [history, setHistory] = state.UserAPI.history;
    const [isAdmin] = state.UserAPI.isAdmin;
    const [token] = state.token;
    
    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    //show payments history to admin
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    //show user history 
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="history-sect">
            <h2>History</h2>
            { isAdmin ? 
                <h5> <strong>{history.length}</strong> { history.length===1?"order":"orders"} are successfully completed till now 💯</h5>
                 :
                <h5>You have made <strong>{history.length} </strong>{ history.length===1?"order":"orders"} 🗳️</h5>}

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orderhistory
