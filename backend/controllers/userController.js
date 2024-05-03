const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, email });
    await user.save();
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error: error.message });
  }
};
