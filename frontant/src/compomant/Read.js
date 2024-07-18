import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const Read = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Get id parameter from URL

  useEffect(() => {
    // Fetch all users initially to find the user by id
    axios.get(`http://localhost:5000/api/users`)
      .then(response => {
        // Find the user with matching id
        const foundUser = response.data.find(user => user.id === parseInt(id));
        setUser(foundUser); // Set found user to state
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, [id]); // Fetch users whenever id changes

  if (!user) {
    return <div className="user-details loading">Loading...</div>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div className="user-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>
      <Link to="/" className="go-back-link">Go Back</Link> {/* Link to navigate back to homepage */}
    </div>
  );
};

export default Read;
