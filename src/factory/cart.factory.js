import CartDTO from "../dto/cart.dto.js";

class CartFactory {
  createFromModel(model) {
    return new CartDTO(model.cartId, model.id, model.title, model.description, model.code, model.price, model.quantity, model.category, model.thumbnails);
  }
}

export default CartFactory;
