import CartFactory from "../factory/cart.factory.js";

class CartFactoryDAO {
  constructor() {
    this.cartFactory = new CartFactory();
  }

  async findById(cartId) {

    const fakeData = {
      cartId: "fakeCartId",
      id: "fakeProductId",
      title: "Fake Product",
      description: "This is a fake product",
      code: "FP001",
      price: 19.99,
      quantity: 1,
      category: "Fake Category",
      thumbnails: "fake-thumbnail.jpg"
    };

    return this.cartFactory.createFromModel(fakeData);
  }

  async create(productNew) {

    console.log("Creating product with Factory DAO:", productNew);
    const fakeCreatedProduct = {
      ...productNew,
      cartId: "fakeCartId",
      id: "fakeProductId",
      thumbnails: "fake-thumbnail.jpg"
    };

    return this.cartFactory.createFromModel(fakeCreatedProduct);
  }

  async update(cartId, data) {

    console.log(`Updating product with Factory DAO: ${cartId}`, data);
    const fakeUpdatedProduct = {
      ...data,
      cartId,
      thumbnails: "fake-thumbnail.jpg"
    };

    return this.cartFactory.createFromModel(fakeUpdatedProduct);
  }

  async delete(cartId) {

    console.log(`Deleting product with Factory DAO: ${cartId}`);
    return { status: "success" };
  }
}

export default CartFactoryDAO;
