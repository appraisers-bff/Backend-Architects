const request = require("supertest");
// const Users = require("../users/users-model");
// const Houses = require('../house-info/house-model')
const server = require('./server.js');

const db = require("../data/dbConfig");

describe("Server Connection", () => {
    it("test server is responding", async () => {
      const response = await request(server).get("/api/");
      expect(response.status).toBe(200);
    });
    it("sends a response", async () => {
      const response = await request(server).get("/api/");
      expect(response.body).toEqual('Worther Api test');
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
        password: "ryan1",
      };
      const response = await request(server)
        .post("/api/register")
        .send(newUser);
      expect(response.status).toBe(201);
    });
  
    
  
  describe("Get Route", () => {
    afterEach(async () => {
      await db("users").truncate();
    });
    it("responds with 200", async () => {
      const response = await request(server).get("api/users");
      expect(response.status).toBe(200);
    });
})

  })
    
//   describe('Delete route', () => {
//       afterEach(async () => {
//           await db('users').truncate();
//       })
//       it('responds with 204', async () => {
//           const response = await request(server).delete('api/users/1')
//           expect(response.status).toBe(204)
//       })
//       it('responds with 500', async () => {
//           const response = await request(server).delete('api/users/111')
//           expect(response.status).toBe(500)
//       })
  
  