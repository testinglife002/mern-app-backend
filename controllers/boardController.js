//  /controllers/boardController.js

import Board from "../models/Board.js";
import Activity from "../models/Activity.js";

// Get all boards for a user
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user.id }).populate(
      "members",
      "name email"
    );
    res.json(boards);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get a single board by ID
export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("members", "name email")
      .populate({
        path: "lists",
        populate: { path: "cards" },
      })
      .populate("activity");

    res.json(board);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Create a new board
export const createBoard = async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  try {
    const newBoard = new Board({
      name,
      owner: req.user.id,
      members: [req.user.id],
    });
    const board = await newBoard.save();

    // Log activity
    const activity = new Activity({
      user: req.user.id,
      action: "created",
      board: board._id,
      details: `board '${board.name}'`,
    });
    await activity.save();

    board.activity.push(activity);
    await board.save();

    res.json(board);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};



