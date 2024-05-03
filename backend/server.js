const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userRoutes = require('./routes/user.routes'); // Import user routes

const app = express();
app.use(express.json()); // express.json() can replace bodyParser.json()

require('dotenv').config();

// MongoDB connection
mongoose.connect('mongodb+srv://s6430613015:J6430613015!@cluster0.rzstdpl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas...'))
.catch(err => console.error('Could not connect to MongoDB Atlas...', err));

app.use('/api', userRoutes);
  
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
