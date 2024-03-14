class SubTask {
    constructor(id, task_id, status, created_at, updated_at, deleted_at) {
        this.id = id;
        this.task_id = task_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    toString() {
        return `SubTask(id=${this.id}, task_id=${this.task_id}, status=${this.status}, created_at=${this.created_at}, updated_at=${this.updated_at}, deleted_at=${this.deleted_at})`;
    }
}


const subtask1 = new SubTask(1, 101, 0, "2024-03-14", "2024-03-14", null);
console.log(subtask1.toString());





