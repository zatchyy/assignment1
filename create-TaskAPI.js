const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');

const app = express();
app.use(bodyParser.json());


const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;


const users = {
    'user1': {
        'password': 'password',
        'priority': 0
    }
};


const tasks = [];

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

app.post('/create-task', verifyToken, (req, res) => {
    jwt.verify(req.token, jwtSecretKey, (err, authData) => {
        if (err) {
            res.status(403).json({ error: 'Unauthorized' });
        } else {
            const { title, description, due_date } = req.body;

         
            if (!title || !due_date) {
                return res.status(400).json({ error: 'Title and due_date are required' });
            }

            try {
                const dueDateObj = DateTime.fromISO(due_date);
                if (!dueDateObj.isValid) {
                    return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 format' });
                }

               
                const priority = assignPriority(dueDateObj);

                // Create task
                const newTask = {
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
