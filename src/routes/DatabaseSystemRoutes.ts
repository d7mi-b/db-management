import express = require('express');
import DatabaseSystemController from "../controllers/DatabaseSystemController";

const router = express.Router();

router.post('/connect', DatabaseSystemController.connect);

module.exports = router;