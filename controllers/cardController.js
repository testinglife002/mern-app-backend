// /controllers/cardController.js

import Card from "../models/Card.js";
import List from "../models/List.js";
import Board from "../models/Board.js";
import Activity from "../models/Activity.js";

// Create a new card
export const createCard = async (req, res) => {
  const { title, listId, boardId } = req.body;
  try {
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    const newCard = new Card({ title, list: listId, board: boardId });
    const card = await newCard.save();

    list.cards.push(card._id);
    await list.save();

    const activity = new Activity({
      user: req.user.id,
      action: "created",
      board: boardId,
      entity: "card",
      entityId: card._id,
      details: `card '${card.title}'`,
    });
    await activity.save();

    board.activity.push(activity);
    await board.save();

    res.json(card);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Move a card
export const moveCard = async (req, res) => {
  try {
    const { cardId, fromListId, toListId, toIndex } = req.body;

    if (!cardId || !fromListId || !toListId || typeof toIndex !== "number") {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ msg: "Card not found" });

    const fromList = await List.findById(fromListId);
    const toList = await List.findById(toListId);

    if (!fromList || !toList) {
      return res.status(404).json({ message: "List not found" });
    }

    const board = await Board.findById(card.board);

    // ✅ Remove card from source list
    const cardIndex = fromList.cards.indexOf(cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: "Card not found in source list" });
    }
    fromList.cards.splice(cardIndex, 1);

    // ✅ If moving in the same list, reorder only
    if (fromListId === toListId) {
      fromList.cards.splice(toIndex, 0, cardId);
      await fromList.save();
    } else {
      // ✅ Otherwise, move to destination list
      toList.cards.splice(toIndex, 0, cardId);
      await Promise.all([fromList.save(), toList.save()]);
    }

    // Log activity
    const activity = new Activity({
      user: req.user.id,
      action: "moved",
      board: card.board,
      entity: "card",
      entityId: card._id,
      details: `card '${card.title}' from '${fromList.name}' to '${toList.name}'`,
    });
    await activity.save();

    board.activity.push(activity);
    await board.save();

    res.status(200).json({ message: "Card moved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


