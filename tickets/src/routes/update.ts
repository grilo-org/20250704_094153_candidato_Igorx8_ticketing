import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@easy-tickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Types } from "mongoose";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const docExists = await Ticket.findOne({ _id: new Types.ObjectId(id) });

    if (!docExists) throw new NotFoundError();

    if (docExists.userId !== req.currentUser!.id)
      throw new NotAuthorizedError();

    docExists.set({
      title: req.body.title,
      price: req.body.price,
    });

    await docExists.save();

    res.send(docExists);
  }
);

export { router as updateTicketRouter };
