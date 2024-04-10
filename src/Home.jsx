import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        const confirmMessage = window.confirm("Are you sure you want to delete this data?");
        if (confirmMessage) {
            axios.delete(`http://localhost:3000/users/${id}`)
                .then(() => {
                    fetchData(); // Refresh data after successful deletion
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <h2>SIMPLE CRUD adding USERS</h2>
            <p>Note: Listed below are already in the database which is in the file database.json</p>
            <p>Before running the program execeute this two first to make the database available 
            <strong>(Set-ExecutionPolicy RemoteSigned -Scope Process) </strong> 
            <strong>(json-server --watch database.json)</strong>'ang kanang database.json mao na ang file'
            </p>
            <p>Needs to be installed first before making the project: 
            <strong>(npm install react-router-dom) </strong> 
            <strong>(npm install axios) </strong> 
            <strong>(npm install -g json-server) </strong> </p>
            <button className="buttons"><Link to="/create" className='links'>Add Users</Link></button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="buttons">
                                    <Link to={`/read/${user.id}`} className="links">READ</Link>
                                </button>
                                <button className="buttons">
                                    <Link to={`/update/${user.id}`} className="links">UPDATE</Link>
                                </button>
                                <button className="buttons" onClick={() => handleDelete(user.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
