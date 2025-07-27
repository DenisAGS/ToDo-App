import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Asegura que todas las rutas usen autenticación
router.use(authMiddleware);

// Obtener tareas del usuario
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.user.userId },
  });
  res.json(todos);
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title } = req.body;

  const newTodo = await prisma.todo.create({
    data: {
      title,
      userId: req.user.userId,
    },
  });
  res.status(201).json(newTodo);
});

// Marcar como completada una tarea
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { 
      ...(title !== undefined && {title}),
      ...(completed !== undefined && {completed}),
    },
  });
  res.json(todo);
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Tarea eliminada correctamente" });
});

export default router;
