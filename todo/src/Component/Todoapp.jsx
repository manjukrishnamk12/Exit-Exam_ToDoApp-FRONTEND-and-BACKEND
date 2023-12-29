import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  TextField,
  Select,
  Button,
  Typography,
  Box,
  MenuItem
} from '@mui/material';

const Todoapp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [newTodoStatus, setNewTodoStatus] = useState('ongoing');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/Todo/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addTodo = async () => {
        try {
            await axios.post('http://localhost:3000/Todo/todos', {
                description: newTodoDescription,
                completed: newTodoStatus,
            });
            setNewTodoDescription('');
            setNewTodoStatus('ongoing');
            fetchData();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/Todo/todos/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'ongoing' ? 'completed' : 'ongoing';
            await axios.put(`http://localhost:3000/Todo/todos/${id}`, { completed: newStatus });
            fetchData();
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.completed === 'completed';
        } else if (filter === 'incomplete') {
            return todo.completed === 'ongoing';
        } else {
            return true;
        }
    });

    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '600px' },

        }}
        noValidate
        autoComplete="off"
      >
      <div className="Todo">
           <Grid container spacing={2} style={{ width: '100%', maxWidth: '600px' }}>
              <Grid item xs={12} sm={12}>
                <Typography variant='h3' id='head'>To-Do App</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                  <TextField 
                    label='Description:'
                    type="text"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={12}>                    
                <Select
                  label='Status:'
                  id='select'
                  value={newTodoStatus}
                  onChange={(e) => setNewTodoStatus(e.target.value)}
                >
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button id="add" onClick={addTodo}>
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>                    
                <Select 
                  label='Show:'
                  id='select'
                  value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="incomplete">Incomplete</MenuItem>
                </Select>
              </Grid>
           </Grid>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id} className={todo.completed === 'completed' ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed === 'completed'}
              onChange={() => toggleStatus(todo._id, todo.completed)}
            />
            <span>{todo.description}</span>
            <button id="delete" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </Box>
    );
};

export default Todoapp;
