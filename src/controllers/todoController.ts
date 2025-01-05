import { TodoService } from "../services/todoService";
import { Request, Response } from "express";

export class TodoController {
    constructor(private todoService: TodoService) {}

    getTodos = (req: Request, res: Response) =>{
        const todos = this.todoService.read();
        res.status(200).json(todos);   
    }

    createNewTodo = (req: Request, res: Response) =>{
        const {name, date} = req.body;
        if(!name || !date){
            res.status(400).json({error:'Mission and Date are required!!'});
            return;
        }
        if(isNaN(Date.parse(date))){
            res.status(400).json({error:"Date is invalid! try again"});
            return;
        }
        const dateInDateFormat = new Date(date);
        dateInDateFormat.setHours(12, 0, 0, 0)
        const itemToReturn = this.todoService.add(name, dateInDateFormat);
        res.status(201).json(itemToReturn);
    }

    deleteTodo = (req: Request, res: Response) =>{
        const missionIdToDelete = req.params.id;
        const itemToReturn = this.todoService.delete(missionIdToDelete);
        res.status(204).json(itemToReturn);
    }

    toggleTodo = (req: Request, res: Response) =>{
        const id = req.params.id;
        const itemToReturn = this.todoService.toggle(id);
        res.status(200).json(itemToReturn);
    }

    clearTodosList = (req: Request, res:Response) => {
        const todos = this.todoService.clear();
        res.status(204).json(todos)
    }
}