let tasks = [
    { id: 1, title: 'Task 1', dueDate: '2024-03-20', status: 'TODO', deleted_at: null },
    { id: 2, title: 'Task 2', dueDate: '2024-03-22', status: 'DONE', deleted_at: null },
    { id: 3, title: 'Task 3', dueDate: '2024-03-25', status: 'TODO', deleted_at: null },
    
];


function deleteTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, deleted_at: new Date().toISOString() };
        }
        return task;
    });
}

//expample1
deleteTask(1);

console.log('Updated tasks:', tasks);
