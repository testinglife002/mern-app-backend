// /controllers/listController.js

import List from "../models/List.js";
import Board from "../models/Board.js";

// Create a new list
export const createList = async (req, res) => {
  const { name, boardId } = req.body;
  try {
    const board = await Board.findById(boardId);

    const newList = new List({ name, board: boardId });
    const list = await newList.save();

    board.lists.push(list._id);
    await board.save();

    res.json(list);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update a list (e.g., rename)
export const updateList = async (req, res) => {
  try {
    let list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: "List not found" });

    list = await List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(list);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};



