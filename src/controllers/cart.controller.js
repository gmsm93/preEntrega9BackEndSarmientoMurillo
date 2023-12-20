import CartRepository from "../repository/cart.repository.js";


const useFactoryDAO = process.argv[2] === "--use-factory-dao";

const cartRepository = new CartRepository(useFactoryDAO);

export const getCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productDTO = await cartRepository.getCartById(cartId);
    res.render('one', { product: productDTO });
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
    const result = await cartRepository.createCart(productNew);
    res.redirect('/product');
  } catch (error) {
    res.render('error', { error: 'Error al crear el producto' });
  }
};

export const putCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartRepository.updateCart(cartId, req.body);
    return res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCardID = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartRepository.deleteCart(cartId);
    return res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};
