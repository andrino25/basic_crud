import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        email: ''
    });
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(err => console.log(err));
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (formData.id === '' || formData.name === '' || formData.username === '' || formData.email === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.put(`http://localhost:3000/users/${userId}`, formData)
            .then(response => {
                console.log(response.data);
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="form-container">
            <h2>Update User</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>ID:</label>
                    <input type="number" name="id" value={formData.id} onChange={handleChange} disabled/>
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="theButtons">
                    <button type="submit" className="buttons">SUBMIT</button>
                    <button type="button" className="buttons">
                        <Link to="/" className='links'>BACK</Link>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;
