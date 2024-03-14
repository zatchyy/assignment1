let tasks = [
    { id: 1, title: 'Task 1', dueDate: '2024-03-20', status: 'TODO' },
    { id: 2, title: 'Task 2', dueDate: '2024-03-22', status: 'DONE' },
    { id: 3, title: 'Task 3', dueDate: '2024-03-25', status: 'TODO' },
 
];

let subtasks = [
    { id: 1, taskId: 1, title: 'Subtask 1', status: 0 },
    { id: 2, taskId: 1, title: 'Subtask 2', status: 1 },
    { id: 3, taskId: 2, title: 'Subtask 3', status: 0 },
   
];


function updateTask(taskId, updates) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, ...updates };
        }
        return task;
    });
}


function updateSubtask(subtaskId, updates) {
    subtasks = subtasks.map(subtask => {
        if (subtask.id === subtaskId) {
            return { ...subtask, ...updates };
        }
        return subtask;
    });
}

updateTask(1, { dueDate: '2024-03-25', status: 'DONE' });


updateSubtask(1, { status: 1 });

console.log('Updated tasks:', tasks);
console.log('Updated subtasks:', subtasks);
