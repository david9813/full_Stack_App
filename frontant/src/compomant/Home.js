import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch users from backend
  const fetchUsers = () => {
    axios.get('https://studentmanagement2-c661d76ae278.herokuapp.com/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle delete
  const handleDelete = (id) => {
    axios.delete(`https://studentmanagement2-c661d76ae278.herokuapp.com/api/users/${id}`)
      .then(response => {
        console.log(response.data);
        fetchUsers(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <div className="table-container">
      <div className="header">
        <h1>User Table</h1>
        <Link to="/create" className="create-button">
          <h3>Create new data</h3>
        </Link>
      </div>

      <table className="table-for-home">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="table-link edit-link">Edit</Link>
                <Link to={`/read/${user.id}`} className="table-link read-link">Read</Link>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
