class CartDTO {
    constructor(cartId, id, title, description, code, price, quantity, category, thumbnails) {
      this.cartId = cartId;
      this.id = id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.quantity = quantity;
      this.category = category;
      this.thumbnails = thumbnails;
    }
  }
  
  export default CartDTO;
  