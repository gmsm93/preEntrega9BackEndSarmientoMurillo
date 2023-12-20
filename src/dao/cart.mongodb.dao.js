import cartModel from "../models/cart.models.js";

class CartMongoDBDAO {
  async findById(cartId) {
    return await cartModel.findById(cartId).lean().exec();
  }

  async create(productNew) {
    return await cartModel.create(productNew);
  }

  async update(cartId, data) {
    return await cartModel.findByIdAndUpdate(cartId, data, { new: true });
  }

  async delete(cartId) {
    return await cartModel.findByIdAndDelete(cartId);
  }
}

export default CartMongoDBDAO;
