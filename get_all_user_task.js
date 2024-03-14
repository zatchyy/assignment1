
const tasks = [
    { id: 1, title: 'Task 1', priority: 'High', dueDate: '2024-03-20' },
    { id: 2, title: 'Task 2', priority: 'Medium', dueDate: '2024-03-22' },
    { id: 3, title: 'Task 3', priority: 'Low', dueDate: '2024-03-25' },
   
];

function filterTasks(tasks, priority, dueDate) {
    return tasks.filter(task => (!priority || task.priority === priority) && (!dueDate || task.dueDate === dueDate));
}

function paginateTasks(tasks, page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return tasks.slice(startIndex, endIndex);
}

// Example usage:
const priorityFilter = 'High'; 
const dueDateFilter = '2024-03-20';
const page = 1; 
const pageSize = 10; 


let filteredTasks = filterTasks(tasks, priorityFilter, dueDateFilter);


let paginatedTasks = paginateTasks(filteredTasks, page, pageSize);

console.log('Filtered and paginated tasks:', paginatedTasks);




