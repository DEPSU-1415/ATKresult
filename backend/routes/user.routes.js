const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
