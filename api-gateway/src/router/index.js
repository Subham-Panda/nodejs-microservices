const express = require('express');

const userRouter = require('./user.router');
const contentRouter = require('./content.router');
const userInteractionRouter = require('./user-interaction.router');

const router = express.Router();

router.use('/content', contentRouter);
router.use('/user', userRouter);
router.use('/user-interaction', userInteractionRouter);

module.exports = router;
