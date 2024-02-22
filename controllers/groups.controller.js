const Group = require('../models/groups.models');

const createGroup = async (req, res) => {
  try {
    const { name, owner, onlineUsers } = req.body;
    const newGroup = await Group.create({ name, owner, onlineUsers });
    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};

const getSingleGroup = async (req, res) => {
    const { id } = req.params;
    try {
      const group = await Group.findById(id).populate('owner').populate('onlineUsers');
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.json(group);
    } catch (error) {
      console.error('Error fetching group by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getAllGroups = async (req, res) => {
    try {
      const groups = await Group.find().populate('owner').populate('onlineUsers');
      res.json(groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { onlineUsers } = req.body;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, { onlineUsers }, { new: true });
    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(updatedGroup);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedGroup = await Group.findByIdAndDelete(id);
      if (!deletedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.json(deletedGroup);
    } catch (error) {
      console.error('Error deleting group by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const addUserToGroup = async (req, res) => {
    
  };
  
  const removeUserFromGroup = async (req, res) => {
    
  };
  



module.exports = {
    createGroup,
    getSingleGroup,
    getAllGroups,
    updateGroup,
    deleteGroup,
    addUserToGroup,
    removeUserFromGroup
};