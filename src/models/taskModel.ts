import db from "../config/db";
import { Task } from '../types/task';


export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const stmt = db.prepare('INSERT INTO Tasks (dealId, description, dueDate, status) VALUES (?, ?, ?, ?)');
    const info = stmt.run(
        task.dealId,
        task.description,
        task.dueDate ?? null,
        task.status ?? 'pending'
    );
    return { id: Number(info.lastInsertRowid), ...task };
};


export const getTaskById = async (id: number): Promise<Task | null> => {
    const stmt = db.prepare('SELECT * FROM Tasks WHERE id = ?');
    const task = stmt.get(id) as Task | undefined;
    return task || null;
};


export const listTasks = async (): Promise<Task[]> => {
    const stmt = db.prepare('SELECT * FROM Tasks');
    return stmt.all() as Task[];
};


export const updateTask = async (
    id: number,
    data: Partial<Omit<Task, 'id'>>
): Promise<Task | null> => {
    const existingTask = await getTaskById(id);
    if (!existingTask) return null;

    const updatedTask: Task = { ...existingTask, ...data };

    const stmt = db.prepare('UPDATE Tasks SET dealId = ?, description = ?, dueDate = ?, status = ? WHERE id = ?');
    stmt.run(
        updatedTask.dealId,
        updatedTask.description,
        updatedTask.dueDate ?? null,
        updatedTask.status ?? 'pending',
        id
    );

    return updatedTask;
};


export const deleteTask = async (id: number): Promise<{ message: string }> => {
    const stmt = db.prepare('DELETE FROM Tasks WHERE id = ?');
    stmt.run(id);
    return { message: "Task was deleted" };
};