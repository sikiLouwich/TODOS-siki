import cors from 'cors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { TodoController } from './controllers/todoController';
import { createTodoRouter } from './routes/todoRoutes';
import { TodoService } from './services/todoService';

dotenv.config()

const app = express();
const port = process.env.PORT;

// Add CORS middleware before other middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

//Middleware
app.use(express.json());
app.use(express.static('dist'));

// Initialize services and controllers
const todoService = new TodoService();
const todoController = new TodoController(todoService);
const todoRouter = createTodoRouter(todoController);

// Routes
app.use('/api/todos', todoRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
