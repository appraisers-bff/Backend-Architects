const request = require("supertest");
// const Users = require("../users/users-model");
// const Houses = require('../house-info/house-model')
const server = require("./server.js");

const db = require("../data/dbConfig");

describe("Server Connection", () => {
  it("test server is responding", async () => {
    const response = await request(server).get("/api/");
    expect(response.status).toBe(200);
  });
});

describe("Post Route Register", () => {
  afterEach(async () => {
    await db("users").truncate();
  });
  it("responds with 201", async () => {
    const newUser = {
      username: "ryan",
      email: "ryan@gmail.com",
      password: "ryan1"
    };
    const response = await request(server)
      .post("/api/register")
      .send(newUser);
    expect(response.status).toBe(201);
  });
});

describe("Post Route House", () => {
  afterEach(async () => {
    await db("houses").truncate();
  });
  it("responds with 201", async () => {
    const newHouse = {
      address: "333 W Main St",
      city: "Paris",
      state: "FL",
      zip: "88225",
      bed: "4",
      bath: "3",
      sqft: "2224",
      stories: "2",
      garage: "3",
      pool: "true"
    };
    const response = await request(server)
      .post("/api/house")
      .send(newHouse);
    expect(response.status).toBe(201);
  });
});

describe("Get Route for Houses", () => {
  afterEach(async () => {
    await db("houses").truncate();
  });
  it("responds with 201", async () => {
    const response = await request(server).get("/api/house/1");
    expect(response.status).toBe(201);
  });
});

describe("Get Route for Users", () => {
  afterEach(async () => {
    await db("users").truncate();
  });
  it("responds with 200", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
  });
});

  