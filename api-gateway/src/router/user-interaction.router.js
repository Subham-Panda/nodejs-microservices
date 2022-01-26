const express = require('express');

const { interactionController } = require('../controller');

const router = express.Router();

router.post('/like', interactionController.likeInteraction);
router.post('/unlike', interactionController.unlikeInteraction);
router.post('/read', interactionController.readInteraction);

module.exports = router;
