const express = require('express');
const router = express.Router();
const { createAgent, getAgents } = require('../controllers/agentController');
const auth = require('../middleware/auth');

router.post('/', auth, createAgent);
router.get('/', auth, getAgents);

module.exports = router;