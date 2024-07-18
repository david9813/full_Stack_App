// Create.js

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Create() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
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
    axios
      .post("https://studentmanagement2-c661d76ae278.herokuapp.com/api/users", formData)
      .then((response) => {
        alert("User created successfully!");
        console.log(response.data);
        setFormData({
          id: "",
          name: "",
          email: "",
          age: "",
          gender: "",
        });
      })
      .catch((error) => {
        alert("Error creating user.");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <Link to="/">Go back to home</Link>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
