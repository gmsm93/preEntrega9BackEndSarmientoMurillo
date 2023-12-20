import TicketModel from '../models/ticket.models.js';
import ProductModel from '../models/product.models.js';
import CartModel from '../models/cart.model.js';
import { finalizePurchaseLogic } from './cart.controller.js';
import * as TicketService from '../services/ticket.service.js';

export const generateTicket = async (cart) => {
  const unsuccessfulProductIds = [];

  const ticketData = {
    code: generateUniqueCode(),
    purchaseDatetime: new Date(),
    amount: calculateTotalAmount(cart.products),
    purchaser: cart.userId,
  };

  for (const product of cart.products) {
    try {
      const updatedStock = await processPurchase(product);
      if (!updatedStock) {
        unsuccessfulProductIds.push(product._id);
      }
    } catch (error) {
      console.error(`Error al procesar la compra del producto ${product._id}:`, error);
      unsuccessfulProductIds.push(product._id);
    }
  }

  if (unsuccessfulProductIds.length === 0) {
    try {
      const ticket = await TicketModel.create(ticketData);
      return { ticket, unsuccessfulProductIds: [] };
    } catch (error) {
      console.error('Error al generar el ticket:', error);
      return { ticket: null, unsuccessfulProductIds: cart.products.map(product => product._id) };
    }
  } else {
    return { ticket: null, unsuccessfulProductIds };
  }
};

const calculateTotalAmount = (products) => {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
};

function generateUniqueCode() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return timestamp + randomString;
  }

const processPurchase = async (product) => {
  try {
    const existingProduct = await ProductModel.findById(product._id);

    if (existingProduct && existingProduct.stock >= product.quantity) {
      
      await ProductModel.findByIdAndUpdate(product._id, {
        $inc: { stock: -product.quantity },
      });

      return true;
    } else {
      console.error(`No hay suficiente stock para el producto ${product._id}`);
      return false;
    }
  } catch (error) {
    console.error(`Error al procesar la compra del producto ${product._id}:`, error);
    return false;
  }
};

export const finalizePurchase = async (req, res) => {
    const cartId = req.params.cid;
  
    try {

      const cart = await CartModel.findById(cartId).populate('products.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado.' });
      }
  

      const { successfulPurchase } = await finalizePurchaseLogic(cart);
  

      cart.products = cart.products.filter((product) => !successfulPurchase.includes(product.product._id));
  
      await cart.save();
  
      return res.status(200).json({ message: 'Compra finalizada con éxito.', successfulPurchase });
    } catch (error) {
      console.error(`Error al finalizar la compra: ${error.message}`);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };

  export const getAllTickets = async (req, res, next) => {
    try {
      const tickets = await TicketService.getAllTickets();
      return res.status(200).json(tickets);
    } catch (error) {
      console.error(`Error al obtener los tickets: ${error.message}`);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };