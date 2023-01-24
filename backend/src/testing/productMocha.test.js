import request from "supertest";
import test from "./app-testing.js";
import Products from "../models/productModel.js";
import HTTP_STATUS from "http-status-codes";

beforeEach(() => {
  jest.setTimeout(10000);
});

//POST PRODUCT TEST
describe("POST /api/products/add", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "Product 1",
      slug: "product-1",
      category: "Category 1",
      description: "Description of product 1",
      price: 10,
      image: {
        public_id: "prowess/seller_tlpqnm",
        secure_url: "image.com",
      },
      sellerId: "1234567890",
      seller: "John Doe",
      sellerImage: "image_Seller",
    };

    const response = await request(test)
      .post("/api/products/add")
      .send(newProduct);

    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.body.name).toBe(newProduct.name);

    const product = await Products.findOneAndDelete({ name: newProduct.name });
    expect(product).not.toBeNull();
  });

  it("should return error if fields are missing", async () => {
    const newProduct = {
      name: "Product 1",
    };
    const response = await request(test)
      .post("/api/products/add")
      .send(newProduct);
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body.message).toBe("All fields are required");
    const product = await Products.findOneAndDelete({ name: newProduct.name });
    expect(product).toBeNull();
  });

  it("should upload an image if provided", async () => {
    const image = {
      public_id: "prowess/seller_tlpqnm",
      secure_url: "image.com",
    };
    const newProduct = {
      name: "Product 1",
      slug: "product-1",
      category: "Category 1",
      description: "Description of product 1",
      price: 10,
      sellerId: "1234567890",
      seller: "John Doe",
      sellerImage: "image_Seller",
    };

    const response = await request(test)
      .post("/api/products/add")
      .field("name", newProduct.name)
      .field("slug", newProduct.slug)
      .field("category", newProduct.category)
      .field("description", newProduct.description)
      .field("price", newProduct.price)
      .attach("image", image.tempFilePath, { contentType: image.mimetype })
      .field("sellerId", newProduct.sellerId)
      .field("seller", newProduct.seller)
      .field("sellerImage", newProduct.sellerImage);
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.body.name).toBe(newProduct.name);

    const product = await Products.findOneAndDelete({ name: newProduct.name });
    expect(product).not.toBeNull();
    expect(product.image).toBeDefined();
  });
});

//UPDATE PRODUCT TEST
describe("PUT /api/products/update/:id", () => {
  it("should update a product", async () => {
    const newProduct = {
      name: "Product 1",
      slug: "product-1",
      category: "Category 1",
      description: "Description of product 1",
      price: 10,
      image: {
        public_id: "prowess/seller_tlpqnm",
        secure_url: "image.com",
      },
      sellerId: "1234567890",
      seller: "John Doe",
      sellerImage: "image_Seller",
    };
    const savedProduct = await new Products(newProduct).save();
    const updateData = {
      name: "Product 2",
      slug: "product-2",
      category: "Category 2",
      description: "Description of product 2",
      price: 20,
      image: {
        public_id: "prowess/seller_tlpqnm",
        secure_url: "image.com",
      },
    };

    const response = await request(test)
      .put(`/api/products/update/${savedProduct._id}`)
      .send(updateData);
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body.product.name).toBe(updateData.name);
    expect(response.body.product.slug).toBe(updateData.slug);
    expect(response.body.product.category).toBe(updateData.category);
    expect(response.body.product.description).toBe(updateData.description);
    expect(response.body.product.price).toBe(updateData.price);
    const updateProduct = await Products.findByIdAndDelete(savedProduct._id);
    expect(updateProduct).not.toBeNull();
    expect(updateProduct.name).toBe(updateData.name);
  });

  it("should return error if fields are missing", async () => {
    const newProduct = {
      name: "Product 2",
      slug: "product-2",
      category: "Category 2",
      description: "Description of product 2",
      price: 10,
      image: {
        public_id: "prowess/seller_tlpqnm",
        secure_url: "image.com",
      },
      sellerId: "1234567890",
      seller: "John Doe",
      sellerImage: "image_Seller",
    };
    const savedProduct = await new Products(newProduct).save();
    const updateData = {
      name: "Product 2",
    };
    const response = await request(test)
      .put(`/api/products/update/${savedProduct._id}`)
      .send(updateData);
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body.message).toBe("All fields are required");
    const updatedProduct = await Products.findOneAndDelete({
      name: updateData.name,
    });
    await updatedProduct.deleteOne();
    expect(updatedProduct).not.toBeNull();
  });
});
