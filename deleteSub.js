let subtasks = [
    { id: 1, taskId: 1, title: 'Subtask 1', status: 0, deleted_at: null },
    { id: 2, taskId: 1, title: 'Subtask 2', status: 1, deleted_at: null },
    { id: 3, taskId: 2, title: 'Subtask 3', status: 0, deleted_at: null },
  
];

function deleteSubtask(subtaskId) {
    subtasks = subtasks.map(subtask => {
        if (subtask.id === subtaskId) {
            return { ...subtask, deleted_at: new Date().toISOString() };
        }
        return subtask;
    });
}

deleteSubtask(1);

console.log('Updated subtasks:', subtasks);
