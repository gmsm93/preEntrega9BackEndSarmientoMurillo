import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchaseDatetime: { type: Date, default: Date.now },
  amount: { type: Number },
  purchaser: { type: String }
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
