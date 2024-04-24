const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', // or your database host
  user: 'root',
  password: '',
  database: 'atk'
});

connection.connect();

app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).send('Error hashing password');
      }
  
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      connection.query(query, [username, hash], (error, results) => {
        if (error) {
          return res.status(500).send('Error registering user');
        }
        res.status(201).send({ message: 'User registered successfully', userId: results.insertId });
      });
    });
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
