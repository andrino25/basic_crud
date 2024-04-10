// Read.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom';

function Read() {
    const [data, setData] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`) 
            .then(response => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    }, [userId]); 

    return (
        <div>
            <div className="form-group">
                <h2>{data.name}'s Details</h2>
                <strong>{data.name}</strong> <br/>  
                <strong>{data.username}</strong> <br/> 
                <strong>{data.email}</strong> <br/> 
            </div>

            <button className = "buttons"><Link to="/" className='links'>BACK</Link></button>
        </div>
    );
}

export default Read;
