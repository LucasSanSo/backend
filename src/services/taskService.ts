import { DevDataSource } from "../connections/db_devs";
import { Task } from "../models/task";



const cursor = DevDataSource.getRepository(Task)

type newTaskRequest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
}

type updateTaskRequest = {
    id: string,
    description: string,
    date_task: Date
}

export class TaskService {
    async createTask({ description, date_task }: newTaskRequest): Promise<Task | Error> {
        try {
            const task = cursor.create({ description, date_task })
            cursor.save(task)

            return task
        }
        catch (err) {
            return new Error("Unexpected error saving task!")

        }


    }

    async readOneTask({ id }: findTaskRequest): Promise<Task | Error> {

        try {
            const task = await cursor.findOne({ where: { id } })
            if (!task) {
                return new Error("Task not found!")
            }
            return task
        } catch (err) {
            return new Error("Unexpected error reading task!")

        }

    }

    async redAllTask() {
        try {
            const tasks = await cursor.find()

            return tasks
        }
        catch (err) {
            return new Error("Unexpected error reading task!")

        }
    }

    async updateTask({ id, description, date_task }: updateTaskRequest): Promise<Task | Error> {
        try {
            const task = await cursor.findOne({ where: { id, } })
            if (!task) {
                return new Error("Task not found!")
            }

            task.description = description ? description : task.description
            task.date_task = date_task ? date_task : task.date_task

            await cursor.save(task)

            return task
        } catch (err) {
            return new Error("Unexpected error reading task!")

        }

    }

    async deleteTask({ id }: findTaskRequest): Promise<String | Error> {
        try {
            const task = await cursor.findOne({ where: { id, } })
            if (!task) {
                return new Error("Task not found!")
            }
            await cursor.delete(task.id)
            return "Task removed sucessfully!"
        } catch (err) {
            return new Error("Unexpected error reading task!")

        }
    }
} 