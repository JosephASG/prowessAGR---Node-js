import request from "supertest";
import test from "./app-testing.js";
import HTTP_STATUS from "http-status-codes";
import Orders from "../models/orderModel.js"; 

beforeEach(() => {
  jest.setTimeout(10000);
});

//PRUEBA POSTERIOR AL PEDIDO
describe("POST /api/orders", () => {
  it("Should create a new order", async () => {
    const order = {
      orderItems: [
        {
          slug: "product-slug",
          name: "Product Name",
          quantity: 1,
          image: {
            public_id: "public-id",
            secure_url: "secure-url",
          },
          price: 1000,
          product: "product-id",
          seller: "Seller Name",
          sellerId: "seller-id",
          sellerImage: "seller-image-url",
        },
      ],
      id: "order-id",
      name: "Customer Name",
      email: "customer@email.com",
      address: "Customer Address",
      phone: "123456789",
      sellerId: ["seller-id"],
      itemsPrice: 1000,
      taxPrice: 100,
      totalPrice: 1100,
    };
    const response = await request(test).post("/api/orders").send(order);
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty("message", "New Order Created");

  });
});