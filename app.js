const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const users = {
    'user1': {
        'password': 'password',
        'priority': 0
    }
};

let tasks = [
    { id: 1, title: 'Task 1', priority: 'High', dueDate: '2024-03-20' },
    { id: 2, title: 'Task 2', priority: 'Medium', dueDate: '2024-03-22' },
    { id: 3, title: 'Task 3', priority: 'Low', dueDate: '2024-03-25' },
   
];

let subtasks = [
    { id: 1, task_id: 1, title: 'Subtask 1', priority: 'High', dueDate: '2024-03-18' },
    { id: 2, task_id: 1, title: 'Subtask 2', priority: 'Medium', dueDate: '2024-03-21' },
    { id: 3, task_id: 2, title: 'Subtask 3', priority: 'Low', dueDate: '2024-03-24' },

];


const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

function assignPriority(dueDate) {
    const today = DateTime.now().startOf('day');
    const daysUntilDue = dueDate.diff(today, 'days').days;

    if (daysUntilDue === 0) {
        return 0;
    } else if (daysUntilDue >= 1 && daysUntilDue <= 2) {
        return 1;
    } else if (daysUntilDue >= 3 && daysUntilDue <= 4) {
        return 2;
    } else {
        return 3;
    }
}

// Task creation API endpoint
app.post('/create-task', verifyToken, (req, res) => {
    jwt.verify(req.token, jwtSecretKey, (err, authData) => {
        if (err) {
            res.status(403).json({ error: 'Unauthorized' });
        } else {
            const { title, description, due_date } = req.body;

            // Validate input
            if (!title || !due_date) {
                return res.status(400).json({ error: 'Title and due_date are required' });
            }

            try {
                const dueDateObj = DateTime.fromISO(due_date);
                if (!dueDateObj.isValid) {
                    return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 format' });
                }

                // Assign priority based on due date
                const priority = assignPriority(dueDateObj);

                // task create 
                const newTask = {
                    id: tasks.length + 1,
                    title,
                    description: description || '',
                    due_date,
                    priority,
                    status: 'TODO', 
                    created_by: authData.user.id
                };

                tasks.push(newTask);

                res.status(201).json(newTask);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    });
});

// for delete tasks 
function deleteTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, deleted_at: new Date().toISOString() };
        }
        return task;
    });
}

// function to stop sub tasks 
function deleteSubtask(subtaskId) {
    subtasks = subtasks.map(subtask => {
        if (subtask.id === subtaskId) {
            return { ...subtask, deleted_at: new Date().toISOString() };
        }
        return subtask;
    });
}

// Verify JWT token middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
