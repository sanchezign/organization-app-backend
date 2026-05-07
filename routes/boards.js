import express from "express";
import Board from "../models/Board.js";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// GET /api/boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tableros" });
  }
});

// POST /api/boards
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "El nombre es requerido" });

    const board = new Board({ name, description, user: req.userId });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: "Error al crear tablero" });
  }
});

// PUT /api/boards/:id
router.put("/:id", async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!board) return res.status(404).json({ message: "Tablero no encontrado" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tablero" });
  }
});

// DELETE /api/boards/:id
router.delete("/:id", async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!board) return res.status(404).json({ message: "Tablero no encontrado" });

    // Eliminar notas del tablero también
    await Note.deleteMany({ boardId: req.params.id, user: req.userId });
    res.json({ message: "Tablero eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tablero" });
  }
});

export default router;
