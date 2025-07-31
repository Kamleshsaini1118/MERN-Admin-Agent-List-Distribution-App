const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.createAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const newAgent = new Agent({ name, email, mobile, password: hashedPass });
        await newAgent.save();
        res.json({ msg: 'Agent created' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};