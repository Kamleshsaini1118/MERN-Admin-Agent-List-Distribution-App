const mongoose = require('mongoose');
const assignedListSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    firstname: String,
    phone: String,
    notes: String
});
module.exports = mongoose.model('AssignedList', assignedListSchema);