import { DevDataSource } from "../connections/db_devs";
import { Task } from "../models/task";



const cursor = DevDataSource.getRepository(Task)

type newTaskRequest = {
    description: string,
    date_task: Date
}

type findTaskResquest = {
    id: string
}

export class TaskService {
    async createTask({ description, date_task }: newTaskRequest): Promise<Task | Error> {

        const task = cursor.create({ description, date_task })
        cursor.save(task)

        return task
    }

    async readOneTask({ id }: findTaskResquest): Promise<Task | Error> {

        const task = await cursor.findOne({ where: { id } })
        if (!task) {
            return new Error("Task not found!")
        }
        return task

    }

    async redAllTask() {

    }

    async updateTask() {

    }

    async deleteTask() {

    }
}