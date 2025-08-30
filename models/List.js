// /models/List.js
import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const List = mongoose.model("List", ListSchema);

export default List;
