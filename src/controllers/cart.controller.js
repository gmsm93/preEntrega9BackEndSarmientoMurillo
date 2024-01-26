import TicketModel from '../models/ticket.model.js';
import prdModel from '../models/prd.models.js';
import cartModel from '../models/cart.models.js';
import { generateTicket } from './ticket.controller.js';
import * as TicketService from '../services/ticket.service.js';
import { createRequire } from "module";
import CartFactoryDAO from '../dao/cart.factory.dao.js';
import CartMongoDBDAO from '../dao/cart.mongodb.dao.js';

const useFactoryDAO = process.argv.includes("--use-factory-dao");

const cartDAO = useFactoryDAO
  ? CartFactoryDAO
  : CartMongoDBDAO;

export const getCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const product = await cartDAO.findById(cartId);
    res.render('one', { product });
  } catch (error) {
    res.render('error', { error: 'Error al buscar el producto' });
  }
};

export const createCardID = async (req, res) => {
  res.render('create', {});
};

export const postCardID = async (req, res) => {
  try {
    const productNew = req.body;
    const result = await cartDAO.create(productNew);
    res.redirect('/product');
  } catch (error) {
    res.render('error', { error: 'Error al crear el producto' });
  }
};

export const putCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartDAO.findByIdAndUpdate(cartId, req.body);
    return res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartDAO.findById(cartId);
    cart.id = [];
    await cart.save();
    return res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const finalizePurchase = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const cart = await CartModel.findById(cid).populate('products.product').exec();

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const result = await TicketService.finalizePurchaseLogic(cart, req.user.email);

    return res.status(200).json({ message: 'Compra finalizada con éxito', result });
  } catch (error) {
    console.error(`Error al finalizar la compra: ${error.message}`);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const finalizePurchaseLogic = async (cart) => {
  const successfulPurchase = [];

  for (const product of cart.products) {
    try {

      if (product.stock >= product.quantity) {

        product.stock -= product.quantity;

        product.purchaseDate = new Date();

        const ticketProduct = {
          productId: product._id,
          productName: product.title,
          quantity: product.quantity,
          price: product.price,
        };

        successfulPurchase.push(product._id);

        const ticket = new TicketModel({
          code: generateUniqueTicketCode(),
          purchaseDatetime: new Date(),
          amount: product.price * product.quantity,
          purchaser: cart.user.email,
          products: [ticketProduct],
        });

        await ticket.save();
      }
    } catch (error) {
      console.error(`Error al procesar el producto ${product._id}: ${error.message}`);
    }
  }

  return { successfulPurchase };
};

const generateUniqueTicketCode = () => {
  return 'TICKET_' + Math.floor(Math.random() * 10000);
};
