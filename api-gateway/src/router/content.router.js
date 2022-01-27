const express = require('express');

const { contentController } = require('../controller');

const router = express.Router();

router
    .route('/')
    .get(contentController.getContent)
    .post(contentController.createContent)
    .patch(contentController.updateContent)
    .delete(contentController.deleteContent);

router.get('/new', contentController.getNewContent)
router.get('/top', contentController.getTopContent)

module.exports = router;
