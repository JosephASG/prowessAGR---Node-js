import request from "supertest";
import test from "./app-testing.js";
import User from "../models/userModel.js";
import HTTP_STATUS from "http-status-codes"; 

beforeEach(() => {
  jest.setTimeout(10000);
});

//CREAR PRUEBA DE USUARIO
describe("POST /api/users/register", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "John Lee",
      email: "johnlee@example.com",
      password: "password",
      address: "123 Main St",
      phone: "1234567890",
    };
    const response = await request(test)
      .post("/api/users/register")
      .send(newUser);
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.body.name).toBe(newUser.name);
    const user = await User.findOneAndDelete({ email: newUser.email });
    expect(user).not.toBeNull();
  });

  it("should return error if fields are missing", async () => {
    const newUser = {
      name: "John Lee",
    };
    const response = await request(test)
      .post("/api/users/register")
      .send(newUser);
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    const user = await User.findOneAndDelete({ name: newUser.name });
    expect(user).toBeNull();
  });
});

//PRUEBA DE USUARIO DE INICIO DE SESIÓN
describe("POST /api/users/login", () => {
  it("should login a user", async () => {
    const newUser = {
      name: "John Tune",
      email: "johntune@example.com",
      password: "password",
      address: "123 Main St",
      phone: "1234567890",
    };
    const user = await request(test).post("/api/users/register").send(newUser);
    const loginData = {
      email: newUser.email,
      password: newUser.password,
    };

    const response = await request(test)
      .post("/api/users/login")
      .send(loginData);
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty("token");
    const loggedInUser = await User.findOneAndDelete({ email: newUser.email });
    expect(loggedInUser).not.toBeNull();
  });

  it("should return error if email or password is invalid", async () => {
    const loginData = {
      email: "invalid@example.com",
      password: "invalidpassword",
    };
    const response = await request(test)
      .post("/api/users/login")
      .send(loginData);
    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(response.body.message).toBe("Email o Contraseña Inválidos");
  });
});

//ACTUALIZACIÓN DE LA PRUEBA DE USUARIO
describe("PUT /api/users/update/:id", () => {
  it("should update a user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      address: "123 Main St",
      phone: "5555555555",
    };
    const savedUser = await new User(newUser).save();
    const updateData = {
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password124",
      address: "456 Elm St",
      phone: "5555555556",
    };
    const response = await request(test)
      .put(`/api/users/update/${savedUser._id}`)
      .send(updateData);

    expect(response.status).toBe(HTTP_STATUS.OK);
    await User.findOneAndDelete({ name: updateData.name });
  });
});
