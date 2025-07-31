const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const Agent = require('../models/Agent');
const AssignedList = require('../models/AssignedList');

exports.uploadList = async (req, res) => {
  const file = req.file;
  if (
    !file ||
    !['.csv', '.xlsx', '.xls'].includes(require('path').extname(file.originalname).toLowerCase())
  ) {
    return res.status(400).json({ msg: 'Invalid file type' });
  }

  const filePath = file.path;

  try {
    const list = await csv().fromFile(filePath);
    const agents = await Agent.find();
    const perAgent = Math.floor(list.length / agents.length);
    let index = 0;

    for (let i = 0; i < agents.length; i++) {
      const toAssign = list.slice(index, index + perAgent);
      for (const item of toAssign) {
        await new AssignedList({
          agentId: agents[i]._id,
          firstname: item.FirstName,
          phone: item.Phone,
          notes: item.Notes
        }).save();
      }
      index += perAgent;
    }

    while (index < list.length) {
      const agent = agents[index % agents.length];
      const item = list[index];
      await new AssignedList({
        agentId: agent._id,
        firstname: item.FirstName,
        phone: item.Phone,
        notes: item.Notes
      }).save();
      index++;
    }

    // Only delete after successful processing
    fs.unlinkSync(filePath);
    res.json({ msg: 'List uploaded and distributed' });
  } catch (err) {
    // Do NOT delete file if error occurs
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getDistributedLists = async (req, res) => {
    try {
        // Sabhi assigned lists fetch karo
        const lists = await AssignedList.find().populate('agentId', 'name email mobile');
        // Group by agent
        const grouped = {};
        lists.forEach(item => {
            const agentId = item.agentId._id;
            if (!grouped[agentId]) {
                grouped[agentId] = {
                    agent: item.agentId,
                    items: []
                };
            }
            grouped[agentId].items.push({
                firstName: item.firstname,
                phone: item.phone,
                notes: item.notes
            });
        });
        res.json(Object.values(grouped));
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};