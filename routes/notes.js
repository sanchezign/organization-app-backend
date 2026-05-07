import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/notes — obtener todas las notas del usuario
router.get("/", async (req, res) => {
  try {
    const { boardId } = req.query;
    const filter = { user: req.userId };
    if (boardId) filter.boardId = boardId;

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener notas" });
  }
});

// POST /api/notes — crear nota
router.post("/", async (req, res) => {
  try {
    const { title, content, priority, checklist, boardId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "El título es requerido" });
    }

    const note = new Note({
      title,
      content,
      priority: priority || "ninguna",
      checklist: checklist || [],
      boardId: boardId || null,
      user: req.userId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la nota" });
  }
});

// PUT /api/notes/:id — actualizar nota
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    const { title, content, priority, checklist, boardId } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (priority !== undefined) note.priority = priority;
    if (checklist !== undefined) note.checklist = checklist;
    if (boardId !== undefined) note.boardId = boardId;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
});

// PUT /api/notes/:id/pin — fijar/desfijar nota
router.put("/:id/pin", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.pinned = !note.pinned;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar pin" });
  }
});

// DELETE /api/notes/:id — eliminar nota
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
});

export default router;
