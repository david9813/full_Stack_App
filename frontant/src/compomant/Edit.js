import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    axios.get(`https://studentmanagement2-c661d76ae278.herokuapp.com/api/users/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://studentmanagement2-c661d76ae278.herokuapp.com/api/users/${id}`, formData)
      .then(response => {
        console.log('User data updated:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error updating the user data!', error);
      });
  };

  return (
    <div className="form-container">
      <Link to="/">Go to home</Link>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default Edit;
