
import express from 'express';
import path from 'path';

import { TodoService } from './services/todoService';
import { TodoController } from './controllers/todoController';
import { createTodoRouter } from './routes/todoRoutes';

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(express.static('dist'));

// Initialize services and controllers
const todoService = new TodoService();
const todoController = new TodoController(todoService);
const todoRouter = createTodoRouter(todoController)

// Routes
app.use("/api/todos", todoRouter);

app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost: ${port}`);
});
