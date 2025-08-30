// /models/Board.js
import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model("Board", BoardSchema);

export default Board;
