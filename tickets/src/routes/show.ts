import { NotFoundError, requireAuth } from "@easy-tickets/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingTicket = await Ticket.findById(id);

    if (!existingTicket) {
      throw new NotFoundError();
    }

    res.send(existingTicket);
  }
);

export { router as showTicketRouter };
