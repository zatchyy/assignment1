
const subtasks = [
    { id: 1, task_id: 1, title: 'Subtask 1', priority: 'High', dueDate: '2024-03-18' },
    { id: 2, task_id: 1, title: 'Subtask 2', priority: 'Medium', dueDate: '2024-03-21' },
    { id: 3, task_id: 2, title: 'Subtask 3', priority: 'Low', dueDate: '2024-03-24' },
  
];


function filterSubtasks(subtasks, taskId, priority, dueDate) {
    return subtasks.filter(subtask => 
        (!taskId || subtask.task_id === taskId) && 
        (!priority || subtask.priority === priority) &&
        (!dueDate || subtask.dueDate === dueDate)
    );
}


const taskIdFilter = 1; 
const priorityFilter = 'High'; 
const dueDateFilter = '2024-03-18'; 


const filteredSubtasks = filterSubtasks(subtasks, taskIdFilter, priorityFilter, dueDateFilter);

console.log('Filtered subtasks:', filteredSubtasks);
