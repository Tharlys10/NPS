import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  it("Shoult be able to create a new user", async () => {
    const response = await request(app).post("/users/create")
      .send({
        name: "User Example",
        email: "user@example.com"
      });
    
    expect(response.status).toBe(201);
  });

  it("Shoult not be able to create a user with exist email", async () => {
    const response = await request(app).post("/users/create")
      .send({
        name: "User Example 02",
        email: "user@example.com"
      });
    
    expect(response.status).toBe(409);
  })
})