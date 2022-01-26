const express = require('express');

const { userController } = require('../controller');

const router = express.Router();

router
    .route('/')
    .get(userController.getUser)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
