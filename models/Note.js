import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["ninguna", "baja", "media", "alta"],
      default: "ninguna",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    checklist: {
      type: [checklistItemSchema],
      default: [],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
