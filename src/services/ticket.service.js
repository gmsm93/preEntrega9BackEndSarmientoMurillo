
import TicketModel from '../models/ticket.model.js';
import CartModel from '../models/cart.models.js';


export const generateTicket = async (cart, purchaser) => {
  try {
    const ticketCode = generateUniqueCode();
    const amount = calculateTotalAmount(cart);

    const ticket = new TicketModel({
      code: ticketCode,
      purchase_datetime: new Date(),
      amount,
      purchaser,
      products: cart.products.map((product) => ({
        productId: product.product._id,
        quantity: product.quantity,
      })),
    });

    await ticket.save();

    return ticket;
  } catch (error) {
    console.error(`Error al generar el ticket: ${error.message}`);
    throw error;
  }
};


const generateUniqueCode = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return timestamp + randomString;
  }


const calculateTotalAmount = (cart) => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
};


export const getTicketsByCartId = async (cartId) => {
  try {
    const tickets = await TicketModel.find({ cartId }).exec();
    return tickets;
  } catch (error) {
    console.error(`Error al obtener los tickets: ${error.message}`);
    throw error;
  }
};
