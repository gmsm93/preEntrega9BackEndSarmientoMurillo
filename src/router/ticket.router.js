// En ticket.router.js

import { Router } from 'express';
import { generateTicket } from '../controllers/ticket.controller.js';
import * as TicketController from '../controllers/ticket.controller.js';


const router = Router();

router.get('/', TicketController.getAllTickets);

router.post('/generate', async (req, res) => {
  
  const cart = req.body.cart;

  const ticket = await generateTicket(cart);

  if (ticket) {
    res.json({ success: true, ticket });
  } else {
    res.status(500).json({ success: false, message: 'Error al generar el ticket' });
  }
});

export default router;
