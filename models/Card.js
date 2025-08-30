// /models/Card.js
import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", CardSchema);

export default Card;
