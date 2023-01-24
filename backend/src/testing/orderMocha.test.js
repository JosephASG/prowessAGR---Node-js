import request from "supertest";
import test from "./app-testing.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import HTTP_STATUS from "http-status-codes";

beforeEach(() => {
  jest.setTimeout(10000);
});

describe("Order Controller", () => {
  let product;
  let order;

  beforeEach(async () => {
    // create a product to use in the tests
    product = new Product({
      name: "Product Name",
      slug: "product-slug",
      description: "Product description",
      category: "Product category",
      price: 15,
      image: {
        public_id: "image_public_id",
        secure_url: "image_secure_url",
      },
      sellerId: "seller1",
      seller: "Seller Name",
      sellerImage: "seller_image_url",
    });
    await product.save();

    // Create an order to use in the tests
    order = {
      orderItems: [
        {
          product_id: product._id,
          quantity: 2,
        },
      ],
      name: "Customer Name",
      email: "customer@email.com",
      address: "Customer address",
      phone: "1234567890",
      sellerId: "seller1",
      itemsPrice: 30,
      taxPrice: 0,
      totalPrice: 35,
    };
  });

  afterEach(async () => {
    // delete the product and order after each test
    await Product.deleteMany(product);
    await Order.deleteMany(order);
  });

  it("should create a new order", async () => {
    const res = await request(test)
      .post("/api/orders")
      .send({ ...order, orderItems: [{ product_id: product._id }] });
    expect(res.status).toBe(HTTP_STATUS.OK);
  });

  it("should return a 400 error if orderItems is not provided", async () => {
    delete order.orderItems;

    const res = await request(test).post("/api/orders").send(order);

    expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
  });
});
