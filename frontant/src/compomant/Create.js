import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        age: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        axios.post('http://localhost:5000/api/users', formData)
            .then(response => {
                window.alert('Form submitted successfully!');
                console.log(response.data);
            })
            .catch(error => {
                window.alert('Error submitting form!');
                console.error(error);
            });
    };

    return (
        <div>
            
            <div className="form-container">
            <Link to='/'>Go to home</Link>
                <h2>Create New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
