import { Router } from "express";
import { TodoController } from "../controllers/todoController";


export function createTodoRouter(todoController: TodoController): Router{
    const router = Router();
    router.get("/", todoController.getTodos);
    router.post("/", todoController.createNewTodo);
    router.delete("/all", todoController.clearTodosList)
    router.delete("/:id", todoController.deleteTodo);
    router.patch("/:id", todoController.toggleTodo)
    return router;
}