import CartFactoryDAO from "../dao/cart.factory.dao.js";
import CartMongoDBDAO from "../dao/cart.mongodb.dao.js";
import CartFactory from "../factory/cart.factory.js";

const cartFactory = new CartFactory();

class CartRepository {
  constructor(useFactoryDAO) {
    this.cartDAO = useFactoryDAO ? new CartFactoryDAO() : new CartMongoDBDAO();
  }

  async getCartById(cartId) {
    const product = await this.cartDAO.findById(cartId);
    return cartFactory.createFromModel(product);
  }

  async createCart(productNew) {
    return await this.cartDAO.create(productNew);
  }

  async updateCart(cartId, data) {
    return await this.cartDAO.update(cartId, data);
  }

  async deleteCart(cartId) {
    return await this.cartDAO.delete(cartId);
  }
}

export default CartRepository;

