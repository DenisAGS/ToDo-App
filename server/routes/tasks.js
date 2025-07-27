import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });
    res.json(task);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'No se pudo crear la tarea' });
  }
});

export default router;
