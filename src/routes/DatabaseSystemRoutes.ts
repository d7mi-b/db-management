import express = require('express');
import DatabaseSystemController from "../controllers/DatabaseSystemController";

const router = express.Router();

router.post('/connect', DatabaseSystemController.connect);
router.get('/disconnect', DatabaseSystemController.disconnect);

module.exports = router;