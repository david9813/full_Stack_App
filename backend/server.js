const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle POST request to save user data ......post my sql
app.post('/api/users', (req, res) => {
    const { id, name, email, age, gender } = req.body;
    const query = 'INSERT INTO users (id, name, email, age, gender) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [id, name, email, age, gender], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving user data');
            return;
        }
        res.status(200).send('User data saved successfully');
    });
});


// Endpoint to get all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Error fetching user data');
          return;
      }
      res.status(200).json(results);
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data:', err);
          res.status(500).send('Error deleting user data');
          return;
      }
      res.status(200).send('User data deleted successfully');
  });
});

// edit
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age, gender } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, age = ?, gender = ? WHERE id = ?';
  db.query(query, [name, email, age, gender, id], (err, result) => {
      if (err) {
          console.error('Error updating data:', err);
          res.status(500).send('Error updating user data');
          return;
      }
      res.status(200).send('User data updated successfully');
  });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
