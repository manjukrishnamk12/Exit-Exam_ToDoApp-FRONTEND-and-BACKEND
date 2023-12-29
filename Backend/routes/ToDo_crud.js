const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();
const todoappdata= require('../model/todo');


router.get('/todos', async (req, res) => {
    try {
        const todos = await todoappdata.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/todos', async (req, res) => {
    const { description, completed } = req.body;

    try {
        const newTodo = new todoappdata({ description, completed });
        const data= await newTodo.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
       const data= await todoappdata.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        // Find the todo by ID and update the completed status
        const updatedTodo = await todoappdata.findByIdAndUpdate(id, { completed }, { new: true });
        
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;