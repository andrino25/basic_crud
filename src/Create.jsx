import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';
import { Link, useNavigate} from 'react-router-dom';

function Create() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        if (formData.id === '' || formData.name === '' || formData.username === '' || formData.email === '') {
            alert('Please fill in all fields');
            return;
        }
    
        axios.get('http://localhost:3000/users')
            .then(response => {
                const allUserIds = response.data.map(user => user.id);
                if (allUserIds.includes(formData.id)) {
                    alert('User with this ID already exists');
                } else {
                    axios.post('http://localhost:3000/users', formData)
                        .then(response => {
                            console.log(response.data); 
                            navigate("/");
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };
    
    const handleClear = () => {
        setFormData({
            id: '',
            name: '',
            username: '',
            email: ''
        });
    };


    return (
        <div className="form-container">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID:</label>
                    <input type="number" name="id" value={formData.id} onChange={handleChange} />
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
                <div className="thebuttons">
                    <button type="submit" className="buttons">SUBMIT</button>
                    <button type="button" className="buttons" onClick={handleClear}>CLEAR</button>
                    <button type="button" className="buttons">
                    <Link to="/" className='links'>BACK</Link>
                </button>
                </div>
            </form>
        </div>
    );
}

export default Create;
