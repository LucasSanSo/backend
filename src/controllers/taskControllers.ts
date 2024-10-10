import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const service = new TaskService()


export class TaskController {
    async createTask(req: Request, res: Response) {
        const { description, date_task } = req.body


        const result = await service.createTask({ description, date_task })

        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }

        return res.status(201).json(result)
    }
    async readAllTasks(req: Request, res: Response) {
        const result = await service.redAllTask
        if (result.length == 0) {
            return res.status(200).json("No tasks found")
        }
        return res.status(200).json(result)
    }
    async readOneTasks(req: Request, res: Response) {

        const { id } = req.params
        const result = await service.readOneTask({ id })
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }

        return res.json(result)
    }
    async updateTask(req: Request, res: Response) {
        const { id } = req.params
        const { description, date_task } = req.body
        const result = await service.updateTask({ id, description, date_task })
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }

        return res.json(result)

    }
    async deleteTask(req: Request, res: Response) { 

        const { id } = req.params

    

        const result = await service.deleteTask({ id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }

        return res.json(result)
    }
}